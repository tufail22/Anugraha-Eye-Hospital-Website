/**
 * Anugraha Eye Hospital — Admin Authentication Client (Browser Vanilla JS)
 * Location: /js/auth-client.js
 * 
 * FRONTEND PROTOTYPE NOTICE:
 * This local session & credential checking mechanism is a frontend-only prototype.
 * Must be replaced with server-side authentication before production deployment.
 */

(function() {
  const STORAGE_KEY = "admin_session";

  class AuthClient {
    constructor() {
      this.session = this.loadSession();
    }

    loadSession() {
      if (typeof window === "undefined") return null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.authenticated) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn("Failed to load admin session from localStorage", e);
      }
      return null;
    }

    isAuthenticated() {
      const s = this.getCurrentSession();
      return !!(s && s.authenticated);
    }

    getCurrentSession() {
      if (!this.session) {
        this.session = this.loadSession();
      }
      return this.session;
    }

    async login(usernameInput, passwordInput) {
      const trimmedUsername = (usernameInput || "").trim();
      const password = passwordInput || "";

      // Prototype Credential Validation: web@admin / Admin@2001
      if (trimmedUsername === "web@admin" && password === "Admin@2001") {
        const session = {
          authenticated: true,
          username: trimmedUsername,
          role: "SuperAdmin", // BACKEND INTEGRATION PLACEHOLDER: Role-Based Access Control
          loginTime: Date.now()
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        } catch (e) {
          console.error("Failed to persist admin session", e);
        }

        this.session = session;
        this.logAuditEvent("LOGIN_SUCCESS", "/admin");
        return { success: true, session };
      }

      this.logAuditEvent("LOGIN_FAILED", "/admin");
      return { success: false, error: "Invalid username or password." };
    }

    /* BACKEND INTEGRATION PLACEHOLDER: Audit Logging Service (User, Action, Resource, Timestamp) */
    logAuditEvent(action, resource) {
      const session = this.getCurrentSession();
      const event = {
        id: "audit_" + Date.now(),
        userId: session ? session.username : "anonymous",
        role: session ? session.role : "Guest",
        action: action,
        resource: resource,
        timestamp: Date.now()
      };
      console.info("🔒 AUDIT LOG EVENT:", event);
      return event;
    }

    logout() {
      this.logAuditEvent("LOGOUT", "/admin/dashboard");
      this.session = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("Failed to clear admin session", e);
      }
    }
  }

  window.authClient = new AuthClient();
})();
