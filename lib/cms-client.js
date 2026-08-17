// =========================================================================
// ANUGRAHA EYE HOSPITAL - SUPABASE CMS DATA & CLOUD STORAGE CLIENT
// =========================================================================

(function() {
  'use strict';

  const cmsClient = {
    /**
     * Upload an image file directly to Supabase Cloud Storage
     * Returns the permanent public CDN URL
     */
    async uploadToCloudStorage(file, folder = 'general') {
      const client = window.getSupabaseClient();
      if (!client) {
        throw new Error("Supabase is not configured. Configure js/config.js to enable cloud storage.");
      }

      // Strict validation for allowed formats
      const validExtensions = /\.(jpg|jpeg|png)$/i;
      const validMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/pjpeg', 'image/x-png'];

      if (!validExtensions.test(file.name) || (file.type && !validMimes.includes(file.type.toLowerCase()))) {
        throw new Error("Invalid format. Only JPG, JPEG, and PNG images are allowed.");
      }

      const maxMB = 10;
      if (file.size > maxMB * 1024 * 1024) {
        throw new Error(`File exceeds the ${maxMB}MB size limit.`);
      }

      const bucketName = window.SUPABASE_CONFIG?.storageBucket || 'hospital-media';
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
      const filePath = `${folder}/${Date.now()}_${cleanName}`;

      const { data, error } = await client.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'image/jpeg'
        });

      if (error) {
        console.error("[Storage] Upload error:", error);
        throw error;
      }

      const { data: publicUrlData } = client.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      return {
        url: publicUrlData.publicUrl,
        path: data.path,
        filename: cleanName,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type || 'image/jpeg'
      };
    },

    /**
     * Fetch all CMS data from Supabase PostgreSQL
     */
    async fetchAllCMSData() {
      const client = window.getSupabaseClient();
      if (!client) return null;

      try {
        const [
          settingsRes,
          doctorsRes,
          adminRes,
          facilitiesRes,
          servicesRes,
          equipmentRes,
          partnersRes,
          academicsRes,
          empanelmentsRes,
          faqsRes,
          newsRes,
          galleryRes
        ] = await Promise.all([
          client.from('cms_site_settings').select('*'),
          client.from('cms_doctors').select('*').order('display_order', { ascending: true }),
          client.from('cms_administration').select('*').order('display_order', { ascending: true }),
          client.from('cms_facilities').select('*').order('display_order', { ascending: true }),
          client.from('cms_services').select('*').order('display_order', { ascending: true }),
          client.from('cms_equipment').select('*').order('display_order', { ascending: true }),
          client.from('cms_partnerships').select('*').order('display_order', { ascending: true }),
          client.from('cms_academics').select('*'),
          client.from('cms_empanelments').select('*'),
          client.from('cms_faqs').select('*').order('display_order', { ascending: true }),
          client.from('cms_news').select('*').order('created_at', { ascending: false }),
          client.from('cms_gallery').select('*').order('created_at', { ascending: false })
        ]);

        const result = {};

        // Parse Site Settings
        if (settingsRes.data && settingsRes.data.length > 0) {
          settingsRes.data.forEach(s => {
            result[s.id] = s.value;
          });
        }

        // Map Collections
        if (doctorsRes.data && doctorsRes.data.length > 0) {
          result.leadership = doctorsRes.data.map(d => ({
            id: d.id,
            name: d.name,
            title: d.title,
            degrees: d.degrees,
            spec: d.specialization,
            specialization: d.specialization,
            experience: d.experience,
            bio: d.bio,
            photo: d.photo,
            awards: d.awards || [],
            isActive: d.is_active,
            displayOrder: d.display_order,
            published: d.published
          }));
        }

        if (adminRes.data && adminRes.data.length > 0) {
          result.administration = adminRes.data.map(a => ({
            id: a.id,
            name: a.name,
            role: a.role,
            degrees: a.degrees,
            department: a.department,
            bio: a.bio,
            photo: a.photo,
            displayOrder: a.display_order,
            published: a.published
          }));
        }

        if (facilitiesRes.data && facilitiesRes.data.length > 0) {
          result.facilities = facilitiesRes.data.map(f => ({
            id: f.id,
            name: f.name,
            type: f.type,
            address: f.address,
            city: f.city,
            district: f.district,
            pincode: f.pincode,
            phone: f.phone,
            email: f.email,
            hours: f.hours,
            emergency: f.emergency,
            mapUrl: f.map_url,
            heroImage: f.hero_image,
            services: f.services || [],
            facilities: f.facilities || [],
            doctorsSchedule: f.doctors_schedule || [],
            stats: f.stats || {},
            coordinates: f.coordinates || {},
            displayOrder: f.display_order,
            published: f.published
          }));
        }

        if (servicesRes.data && servicesRes.data.length > 0) {
          result.services = servicesRes.data.map(s => ({
            id: s.id,
            name: s.name,
            title: s.title,
            shortDesc: s.short_desc,
            heroImage: s.hero_image,
            benefits: s.benefits || [],
            symptoms: s.symptoms || [],
            whoNeedsIt: s.who_needs_it || [],
            procedures: s.procedures || [],
            faqList: s.faq_list || [],
            clinicalDetails: s.clinical_details || {},
            displayOrder: s.display_order,
            published: s.published
          }));
        }

        if (equipmentRes.data && equipmentRes.data.length > 0) {
          result.equipment = equipmentRes.data.map(e => ({
            id: e.id,
            name: e.name,
            image: e.image,
            altText: e.alt_text,
            category: e.category,
            displayOrder: e.display_order,
            isActive: e.is_active,
            published: e.published
          }));
        }

        if (partnersRes.data && partnersRes.data.length > 0) {
          result.partnerships = partnersRes.data.map(p => ({
            id: p.id,
            name: p.name,
            logo: p.logo,
            alt: p.alt,
            category: p.category,
            displayOrder: p.display_order,
            published: p.published
          }));
        }

        if (academicsRes.data && academicsRes.data.length > 0) {
          result.academics = academicsRes.data.map(ac => ({
            id: ac.id,
            name: ac.name,
            title: ac.title,
            degree: ac.degree,
            affiliation: ac.affiliation,
            duration: ac.duration,
            eligibility: ac.eligibility,
            description: ac.description,
            highlights: ac.highlights || [],
            published: ac.published
          }));
        }

        if (empanelmentsRes.data && empanelmentsRes.data.length > 0) {
          result.empanelments = empanelmentsRes.data.map(emp => ({
            id: emp.id,
            name: emp.name,
            category: emp.category,
            code: emp.code,
            published: emp.published
          }));
        }

        if (faqsRes.data && faqsRes.data.length > 0) {
          result.faqs = faqsRes.data.map(faq => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
            displayOrder: faq.display_order,
            published: faq.published
          }));
        }

        if (newsRes.data && newsRes.data.length > 0) {
          result.news = newsRes.data.map(n => ({
            id: n.id,
            title: n.title,
            date: n.date,
            category: n.category,
            shortDesc: n.short_desc,
            content: n.content,
            published: n.published
          }));
        }

        if (galleryRes.data && galleryRes.data.length > 0) {
          result.gallery = galleryRes.data.map(g => ({
            id: g.id,
            title: g.title,
            category: g.category,
            src: g.src,
            filename: g.filename,
            type: g.type,
            size: g.size,
            dimensions: g.dimensions,
            uploadDate: g.upload_date,
            published: g.published
          }));
        }

        return Object.keys(result).length > 0 ? result : null;
      } catch (err) {
        console.warn("[CMSClient] Error fetching from Supabase:", err);
        return null;
      }
    },

    /**
     * Persist setting object (brand, homepage, about, stats, etc.)
     */
    async saveSetting(settingKey, settingValue) {
      const client = window.getSupabaseClient();
      if (!client) return false;

      try {
        const { error } = await client
          .from('cms_site_settings')
          .upsert({
            id: settingKey,
            value: settingValue,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        this.logAuditEvent('UPDATE_SETTING', settingKey, { key: settingKey });
        return true;
      } catch (e) {
        console.error(`[CMSClient] Failed to save setting ${settingKey}:`, e);
        return false;
      }
    },

    /**
     * Persist equipment item
     */
    async saveEquipment(item) {
      const client = window.getSupabaseClient();
      if (!client) return false;

      try {
        const { error } = await client
          .from('cms_equipment')
          .upsert({
            id: item.id,
            name: item.name,
            image: item.image,
            alt_text: item.altText || item.name,
            category: item.category || 'Diagnostic',
            display_order: item.displayOrder || 0,
            is_active: item.isActive !== false,
            published: item.published !== false,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        this.logAuditEvent('UPSERT_EQUIPMENT', item.name, { id: item.id });
        return true;
      } catch (e) {
        console.error("[CMSClient] Failed to save equipment:", e);
        return false;
      }
    },

    /**
     * Delete equipment item
     */
    async deleteEquipment(id) {
      const client = window.getSupabaseClient();
      if (!client) return false;

      try {
        const { error } = await client.from('cms_equipment').delete().eq('id', id);
        if (error) throw error;
        this.logAuditEvent('DELETE_EQUIPMENT', id, { id });
        return true;
      } catch (e) {
        console.error("[CMSClient] Failed to delete equipment:", e);
        return false;
      }
    },

    /**
     * Subscribe to Realtime PostgreSQL database changes
     */
    subscribeToCMSChanges(onUpdateCallback) {
      const client = window.getSupabaseClient();
      if (!client || typeof client.channel !== 'function') return null;

      try {
        const channel = client
          .channel('public:cms_realtime_changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public' },
            (payload) => {
              console.log("[Supabase Realtime] Database change event:", payload.table, payload.eventType);
              if (typeof onUpdateCallback === 'function') {
                onUpdateCallback(payload);
              }
            }
          )
          .subscribe();

        return channel;
      } catch (e) {
        console.warn("[CMSClient] Realtime subscription error:", e);
        return null;
      }
    },

    /**
     * Log audit action
     */
    async logAuditEvent(action, resource, details = {}) {
      const client = window.getSupabaseClient();
      if (!client) return;

      try {
        const user = await window.authClient?.getCurrentUser();
        await client.from('cms_audit_logs').insert({
          user_email: user?.email || 'authenticated-admin',
          action,
          resource,
          details
        });
      } catch (e) {
        // non-blocking
      }
    }
  };

  window.cmsClient = cmsClient;
  window.uploadToCloudStorage = cmsClient.uploadToCloudStorage.bind(cmsClient);
  window.logAuditEvent = cmsClient.logAuditEvent.bind(cmsClient);
})();
