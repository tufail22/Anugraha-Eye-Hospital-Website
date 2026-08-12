/**
 * Anugraha Eye Hospital — Admin Authentication Client Abstraction
 * Location: /lib/auth-client.ts
 * 
 * FRONTEND PROTOTYPE NOTICE:
 * This local session & credential checking mechanism is a frontend-only prototype.
 * It must be replaced with server-side authentication (e.g. Firebase, Supabase, Auth.js) before production deployment.
 */

/* BACKEND INTEGRATION PLACEHOLDER: Role-Based Access Control (RBAC) System */
export type UserRole = "SuperAdmin" | "Admin" | "Editor";

export interface AdminSession {
  authenticated: boolean;
  username: string;
  role: UserRole;
  loginTime: number;
  token?: string; // BACKEND INTEGRATION PLACEHOLDER: JWT / Bearer Token
}

export interface AuthResult {
  success: boolean;
  session?: AdminSession;
  error?: string;
}

/* BACKEND INTEGRATION PLACEHOLDER: Security Audit Logging System */
export interface AuditLogEvent {
  id: string;
  userId: string;
  role: UserRole;
  action: string;
  resource: string;
  timestamp: number;
  ipAddress?: string;
  userAgent?: string;
}

class AuthClient {
  private STORAGE_KEY = "admin_session";
  private session: AdminSession | null = null;

  constructor() {
    this.session = this.loadSession();
  }

  private loadSession(): AdminSession | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AdminSession;
        if (parsed && parsed.authenticated) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to load admin session from localStorage", e);
    }
    return null;
  }

  public isAuthenticated(): boolean {
    const s = this.getCurrentSession();
    return !!(s && s.authenticated);
  }

  public getCurrentSession(): AdminSession | null {
    if (!this.session) {
      this.session = this.loadSession();
    }
    return this.session;
  }

  public async login(usernameInput: string, passwordInput: string): Promise<AuthResult> {
    const trimmedUsername = (usernameInput || "").trim();
    const password = passwordInput || "";

    // Prototype Credential Validation: web@admin / Admin@2001
    if (trimmedUsername === "web@admin" && password === "Admin@2001") {
      const session: AdminSession = {
        authenticated: true,
        username: trimmedUsername,
        loginTime: Date.now(),
      };

      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
      } catch (e) {
        console.error("Failed to persist admin session", e);
      }

      this.session = session;
      return { success: true, session };
    }

    return { success: false, error: "Invalid username or password." };
  }

  public logout(): void {
    this.session = null;
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear admin session", e);
    }
  }
}

export const authClient = new AuthClient();
if (typeof window !== "undefined") {
  (window as any).authClient = authClient;
}
