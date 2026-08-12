/**
 * Anugraha Eye Hospital — Admin CMS Data Layer Client
 * Location: /lib/cms-client.ts
 * 
 * Manages Content Drafts, Published States, Repeatable Items, and Site Settings.
 */

export type ContentStatus = "draft" | "published";

export interface CMSContentRecord {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  altText?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: ContentStatus;
  lastSaved?: number;
  lastPublished?: number;
}

export interface SiteSettings {
  logo: string;
  logoAlt: string;
  primaryPhone: string;
  footerText: string;
  socialLinks: Array<{ platform: string; url: string; enabled: boolean }>;
}

class CMSClient {
  private get store(): any {
    return (typeof window !== "undefined") ? (window as any).appStore : null;
  }

  public getContent(sectionKey: string): CMSContentRecord {
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

    // Default record fallback
    return {
      id: sectionKey,
      title: sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1),
      content: "",
      status: "published",
      lastSaved: Date.now(),
      lastPublished: Date.now()
    };
  }

  public saveDraft(sectionKey: string, data: Partial<CMSContentRecord>): CMSContentRecord {
    const s = this.store;
    if (!s) throw new Error("AppStore unavailable");

    if (!s.data.cmsDrafts) s.data.cmsDrafts = {};
    const current = this.getContent(sectionKey);

    const updated: CMSContentRecord = {
      ...current,
      ...data,
      status: "draft",
      lastSaved: Date.now()
    };

    s.data.cmsDrafts[sectionKey] = updated;
    s.save();
    return updated;
  }

  public publishContent(sectionKey: string, data?: Partial<CMSContentRecord>): CMSContentRecord {
    const s = this.store;
    if (!s) throw new Error("AppStore unavailable");

    const current = data ? { ...this.getContent(sectionKey), ...data } : this.getContent(sectionKey);

    // Image Alt Text Mandatory Check
    if (current.image && (!current.altText || current.altText.trim() === "")) {
      throw new Error("Alt text is required for accessibility.");
    }

    const publishedRecord: CMSContentRecord = {
      ...current,
      status: "published",
      lastPublished: Date.now(),
      lastSaved: Date.now()
    };

    if (!s.data.cmsPublished) s.data.cmsPublished = {};
    s.data.cmsPublished[sectionKey] = publishedRecord;

    // Clear active draft for section
    if (s.data.cmsDrafts && s.data.cmsDrafts[sectionKey]) {
      delete s.data.cmsDrafts[sectionKey];
    }

    s.save();
    return publishedRecord;
  }

  public getPublishedContent(sectionKey: string): CMSContentRecord | null {
    const s = this.store;
    if (!s) return null;
    return (s.data.cmsPublished && s.data.cmsPublished[sectionKey]) || null;
  }

  public getSiteSettings(): SiteSettings {
    const s = this.store;
    const defaultSettings: SiteSettings = {
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

  public updateSiteSettings(newSettings: Partial<SiteSettings>): SiteSettings {
    const s = this.store;
    if (!s) throw new Error("AppStore unavailable");

    const current = this.getSiteSettings();
    const updated = { ...current, ...newSettings };

    s.data.siteSettings = updated;
    s.save();
    return updated;
  }
}

export const cmsClient = new CMSClient();
if (typeof window !== "undefined") {
  (window as any).cmsClient = cmsClient;
}
