/**
 * Anugraha Eye Hospital — Admin CMS Data Client (Browser Vanilla JS)
 * Location: /js/cms-client.js
 * 
 * Manages Content Drafts, Published States, Repeatable Items, and Site Settings.
 */

(function() {
  class CMSClient {
    get store() {
      return (typeof window !== "undefined") ? window.appStore : null;
    }

    getContent(sectionKey) {
      const s = this.store;
      if (!s) {
        return { id: sectionKey, title: "", content: "", status: "published" };
      }

      const drafts = s.data.cmsDrafts || {};
      const published = s.data.cmsPublished || {};

      if (drafts[sectionKey]) {
        return drafts[sectionKey];
      }
      if (published[sectionKey]) {
        return published[sectionKey];
      }

      return {
        id: sectionKey,
        title: sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1),
        content: "",
        seoTitle: "",
        seoDescription: "",
        status: "published",
        lastSaved: Date.now(),
        lastPublished: Date.now()
      };
    }

    saveDraft(sectionKey, data) {
      const s = this.store;
      if (!s) throw new Error("AppStore unavailable");

      if (!s.data.cmsDrafts) s.data.cmsDrafts = {};
      const current = this.getContent(sectionKey);

      const updated = {
        ...current,
        ...data,
        status: "draft",
        lastSaved: Date.now()
      };

      s.data.cmsDrafts[sectionKey] = updated;
      s.save();
      return updated;
    }

    publishContent(sectionKey, data) {
      const s = this.store;
      if (!s) throw new Error("AppStore unavailable");

      const current = data ? { ...this.getContent(sectionKey), ...data } : this.getContent(sectionKey);

      // Image Alt Text Mandatory Check
      if (current.image && (!current.altText || current.altText.trim() === "")) {
        throw new Error("Alt text is required for accessibility.");
      }

      const publishedRecord = {
        ...current,
        status: "published",
        lastPublished: Date.now(),
        lastSaved: Date.now()
      };

      if (!s.data.cmsPublished) s.data.cmsPublished = {};
      s.data.cmsPublished[sectionKey] = publishedRecord;

      if (s.data.cmsDrafts && s.data.cmsDrafts[sectionKey]) {
        delete s.data.cmsDrafts[sectionKey];
      }

      s.save();
      return publishedRecord;
    }

    getPublishedContent(sectionKey) {
      const s = this.store;
      if (!s) return null;
      return (s.data.cmsPublished && s.data.cmsPublished[sectionKey]) || null;
    }

    getSiteSettings() {
      const s = this.store;
      const defaultSettings = {
        logo: "assets/official_logo.jpg",
        logoAlt: "Anugraha Eye Hospital Official Logo",
        primaryPhone: "08352-220646",
        footerText: "North Karnataka's Premier Super-Specialty Eye Network.",
        socialLinks: [
          { platform: "Facebook", url: "https://facebook.com", enabled: true },
          { platform: "Instagram", url: "https://instagram.com", enabled: true },
          { platform: "YouTube", url: "https://youtube.com", enabled: true },
          { platform: "LinkedIn", url: "https://linkedin.com", enabled: true },
          { platform: "Twitter/X", url: "https://x.com", enabled: true }
        ]
      };

      if (!s || !s.data.siteSettings) return defaultSettings;
      return { ...defaultSettings, ...s.data.siteSettings };
    }

    /* BACKEND INTEGRATION PLACEHOLDER: Secure Cloud Object Storage (AWS S3 / Azure Blob / GCS) */
    async uploadToCloudStorage(file, metadata) {
      console.info("☁️ BACKEND CLOUD STORAGE PLACEHOLDER: Preparing upload for file", file.name, metadata);
      // In production with backend, returns cloud CDN URL: https://cdn.anugrahaeyehospital.com/uploads/...
      return Promise.resolve({
        url: URL.createObjectURL(file),
        key: `uploads/${Date.now()}_${file.name}`,
        size: file.size,
        mimeType: file.type
      });
    }

    updateSiteSettings(newSettings) {
      const s = this.store;
      if (!s) throw new Error("AppStore unavailable");

      const current = this.getSiteSettings();
      const updated = { ...current, ...newSettings };

      s.data.siteSettings = updated;
      s.save();
      return updated;
    }
  }

  window.cmsClient = new CMSClient();
})();
