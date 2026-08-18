// =========================================================================
// ANUGRAHA EYE HOSPITAL - SUPABASE CMS DATA & CLOUD STORAGE CLIENT
// =========================================================================

(function() {
  'use strict';

  /**
   * Convert a base64 / data URL string to a binary Blob
   */
  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const cmsClient = {
    /**
     * Upload an image (File, Blob, or base64 dataUrl) directly to Supabase Cloud Storage
     * Returns permanent public CDN URL
     */
    async uploadToCloudStorage(fileOrDataUrl, folder = 'general', customFilename = null) {
      const client = window.getSupabaseClient();
      if (!client) {
        throw new Error("Supabase is not configured. Configure js/config.js to enable cloud storage.");
      }

      let blob;
      let filename;
      let mimeType;

      if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:')) {
        blob = dataURLtoBlob(fileOrDataUrl);
        mimeType = blob.type || 'image/webp';
        const ext = mimeType.includes('webp') ? 'webp' : (mimeType.includes('png') ? 'png' : 'jpg');
        filename = customFilename ? (customFilename.includes('.') ? customFilename : `${customFilename}.${ext}`) : `image_${Date.now()}.${ext}`;
      } else if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {
        blob = fileOrDataUrl;
        mimeType = fileOrDataUrl.type || 'image/webp';
        filename = fileOrDataUrl.name || customFilename || `image_${Date.now()}.webp`;
      } else {
        throw new Error("Invalid image input. Expected File, Blob, or Data URL.");
      }

      // Format & MIME validation
      const validMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/pjpeg', 'image/x-png', 'image/webp'];
      if (mimeType && !validMimes.includes(mimeType.toLowerCase())) {
        throw new Error("Unsupported file format. Please upload JPG, JPEG, PNG, or WebP.");
      }

      const maxMB = 10;
      if (blob.size > maxMB * 1024 * 1024) {
        throw new Error(`Image is too large. Please select an image under ${maxMB} MB.`);
      }

      const bucketName = window.SUPABASE_CONFIG?.storageBucket || 'hospital-media';
      
      // Clean, safe unique filename generation
      let baseName = filename.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-+/g, '-').toLowerCase();
      if (!baseName) baseName = 'asset';
      const fileExt = mimeType.includes('webp') ? 'webp' : (mimeType.includes('png') ? 'png' : 'jpg');
      const uniqueName = `${baseName}-${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${uniqueName}`;

      const { data, error } = await client.storage
        .from(bucketName)
        .upload(filePath, blob, {
          cacheControl: '31536000',
          upsert: true,
          contentType: mimeType
        });

      if (error) {
        console.error("[Storage] Upload error:", error);
        throw error;
      }

      const { data: publicUrlData } = client.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      const result = {
        url: publicUrlData.publicUrl,
        path: data.path,
        filename: uniqueName,
        size: (blob.size / 1024).toFixed(1) + ' KB',
        sizeBytes: blob.size,
        type: mimeType
      };

      console.log(`[Storage] Uploaded optimized image successfully: ${result.url}`);
      return result;
    },

    /**
     * Delete an asset from Supabase Storage
     */
    async deleteFromCloudStorage(pathOrUrl) {
      const client = window.getSupabaseClient();
      if (!client || !pathOrUrl) return false;

      const bucketName = window.SUPABASE_CONFIG?.storageBucket || 'hospital-media';
      let filePath = pathOrUrl;

      // If full URL is passed, extract relative storage path
      if (pathOrUrl.includes(bucketName)) {
        filePath = pathOrUrl.split(`${bucketName}/`)[1];
      }

      try {
        const { error } = await client.storage.from(bucketName).remove([filePath]);
        if (error) throw error;
        return true;
      } catch (e) {
        console.warn("[Storage] Remove error:", e);
        return false;
      }
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
     * Persist doctor profile
     */
    async saveDoctor(doc) {
      const client = window.getSupabaseClient();
      if (!client || !doc) return false;

      try {
        const { error } = await client
          .from('cms_doctors')
          .upsert({
            id: doc.id,
            name: doc.name,
            title: doc.title || doc.designation,
            degrees: doc.degrees,
            specialization: doc.specialization || doc.spec,
            experience: doc.experience || '15+ Years',
            bio: doc.bio,
            photo: doc.photo,
            awards: doc.awards || [],
            is_active: doc.isActive !== false,
            display_order: doc.displayOrder || 0,
            published: doc.published !== false,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        this.logAuditEvent('UPSERT_DOCTOR', doc.name, { id: doc.id });
        return true;
      } catch (e) {
        console.error("[CMSClient] Failed to save doctor:", e);
        return false;
      }
    },

    /**
     * Persist administration staff member
     */
    async saveAdministration(member) {
      const client = window.getSupabaseClient();
      if (!client || !member) return false;

      try {
        const { error } = await client
          .from('cms_administration')
          .upsert({
            id: member.id,
            name: member.name,
            role: member.role || member.position,
            degrees: member.degrees || member.qualifications,
            department: member.department,
            bio: member.bio || member.desc,
            photo: member.photo,
            display_order: member.displayOrder || 0,
            published: member.published !== false,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        this.logAuditEvent('UPSERT_ADMIN_MEMBER', member.name, { id: member.id });
        return true;
      } catch (e) {
        console.error("[CMSClient] Failed to save admin member:", e);
        return false;
      }
    },

    /**
     * Persist hospital facility / vision center
     */
    async saveFacility(fac) {
      const client = window.getSupabaseClient();
      if (!client || !fac) return false;

      try {
        const { error } = await client
          .from('cms_facilities')
          .upsert({
            id: fac.id,
            name: fac.name,
            type: fac.type,
            address: fac.address,
            city: fac.city || fac.town,
            district: fac.district || 'Vijayapura',
            pincode: fac.pincode,
            phone: fac.phone,
            email: fac.email,
            hours: fac.hours,
            emergency: fac.emergency || fac.emergencyInfo,
            map_url: fac.map_url || fac.googleMapsUrl,
            hero_image: fac.hero_image || fac.heroImage,
            services: fac.services || [],
            facilities: fac.facilities || [],
            doctors_schedule: fac.doctors_schedule || fac.doctorsSchedule || [],
            stats: fac.stats || {},
            coordinates: fac.coordinates || {},
            display_order: fac.display_order || fac.displayOrder || 0,
            published: fac.published !== false,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        this.logAuditEvent('UPSERT_FACILITY', fac.name, { id: fac.id });
        return true;
      } catch (e) {
        console.error("[CMSClient] Failed to save facility:", e);
        return false;
      }
    },

    /**
     * Persist service item
     */
    async saveService(service) {
      const client = window.getSupabaseClient();
      if (!client || !service) return false;

      try {
        const { error } = await client
          .from('cms_services')
          .upsert({
            id: service.id,
            name: service.name,
            title: service.title,
            short_desc: service.short_desc || service.shortDesc,
            hero_image: service.hero_image || service.heroImage,
            benefits: service.benefits || [],
            symptoms: service.symptoms || [],
            who_needs_it: service.who_needs_it || service.whoNeedsIt || [],
            procedures: service.procedures || [],
            faq_list: service.faq_list || service.faqList || [],
            clinical_details: service.clinical_details || service.clinicalDetails || {},
            display_order: service.display_order || service.displayOrder || 0,
            published: service.published !== false,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        this.logAuditEvent('UPSERT_SERVICE', service.name, { id: service.id });
        return true;
      } catch (e) {
        console.error("[CMSClient] Failed to save service:", e);
        return false;
      }
    },

    /**
     * Save Gallery item
     */
    async saveGalleryItem(item) {
      const client = window.getSupabaseClient();
      if (!client) return false;

      try {
        const { error } = await client
          .from('cms_gallery')
          .upsert({
            id: item.id || `gal_${Date.now()}`,
            title: item.title || item.filename || 'Uploaded Image',
            category: item.category || 'General',
            src: item.src,
            filename: item.filename,
            type: item.type || 'image/jpeg',
            size: item.size,
            dimensions: item.dimensions,
            upload_date: item.uploadDate || new Date().toLocaleDateString('en-IN'),
            published: true,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        return true;
      } catch (e) {
        console.warn("[CMSClient] Save gallery error:", e);
        return false;
      }
    },

    /**
     * Delete Gallery item
     */
    async deleteGalleryItem(id) {
      const client = window.getSupabaseClient();
      if (!client) return false;

      try {
        const { error } = await client.from('cms_gallery').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (e) {
        console.warn("[CMSClient] Delete gallery error:", e);
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
  window.deleteFromCloudStorage = cmsClient.deleteFromCloudStorage.bind(cmsClient);
  window.logAuditEvent = cmsClient.logAuditEvent.bind(cmsClient);
})();
