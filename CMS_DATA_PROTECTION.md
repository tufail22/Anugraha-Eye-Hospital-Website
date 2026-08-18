# CMS DATA PROTECTION & PERSISTENCE ARCHITECTURE
**Anugraha Eye Hospital Web Platform**

---

## CRITICAL RULE FOR DEVELOPERS & AI AGENTS

> **ABSOLUTE MANDATE**: 
> 1. **CODE CHANGES = CODE ONLY**. 
> 2. **ADMIN CMS CHANGES = CONTENT ONLY**.
> 
> **NEVER** overwrite, reset, reseed, delete, regenerate, or replace runtime CMS data during code changes, bug fixes, UI enhancements, or deployments.
> **NEVER** run automated test scripts that mutate, post dummy text, or overwrite production Supabase tables (`cms_site_settings`, `cms_doctors`, `cms_facilities`, etc.).

---

## 1. Architectural Separation of Concerns

```
+-------------------------------------------------------------------------+
|                           APPLICATION CODE                              |
|  - HTML structure & CSS styles                                          |
|  - UI Components, Navigation Drawers & Modals                           |
|  - Hash Routing & View Controllers                                      |
|  - Admin Dashboard UI & Form Validators                                 |
|  - Supabase & Auth Client APIs                                          |
+-------------------------------------------------------------------------+
                                    │ (Reads & Renders)
                                    ▼
+-------------------------------------------------------------------------+
|                  RUNTIME CMS CONTENT (SUPABASE SSOT)                    |
|  - Homepage Headings, Descriptions, CTA Links                           |
|  - Hero Background Assets & Official Brand Logos                        |
|  - Clinical Doctors, Experience, Qualifications, Portraits              |
|  - Hospital Facilities, Vision Centers, Operating Hours                 |
|  - Surgical Specialties, Diagnostic Equipment, Patient Guides           |
|  - Media Library Uploaded Images & Gallery Assets                       |
+-------------------------------------------------------------------------+
```

---

## 2. Priority Hierarchy for Data Hydration

When loading and rendering content on any page:

1. **Priority 1 (Authoritative)**: **Live Supabase PostgreSQL & Cloud Storage Database**
2. **Priority 2 (Fast Cache)**: **Validated local cache** (updated automatically via Realtime WebSockets and BroadcastChannel)
3. **Priority 3 (Fallback Only)**: **`DEFAULT_DATA`** in `js/store.js` is strictly used only when creating a brand-new installation where no CMS records exist, or to supply initial default values for genuinely new additive schema fields.

---

## 3. Rules for Modifying Frontend Features & UI Components

1. **Adding a New UI Section / Component**:
   - Create the component in `js/app.js`.
   - If new dynamic fields are required, define default fallback properties additively in `DEFAULT_DATA`.
   - Read from `store.getHomepage()`, `store.getBrand()`, etc.
   - Never reset or overwrite existing stored objects.

2. **Removing / Redesigning a Component**:
   - Modifying or removing a UI element in the frontend must **NEVER** delete the underlying CMS records from Supabase.
   - UI Visibility $\neq$ Data Deletion.

3. **Writing Automated Tests**:
   - All regression test scripts (`audit-errors.ps1`, `test-*.ps1`) must be **100% READ-ONLY** against production Supabase endpoints.
   - Testing write flows must only be performed through mock local endpoints or dedicated staging tables with automatic cleanup.

4. **Schema Migrations**:
   - Any schema changes must be **additive only** (`{ ...existingRecord, newField: newFieldDefault }`).
   - Never drop tables or execute destructive truncate/re-seed operations on production databases.

---

## 4. Emergency Backup & Restore Procedures

To take a complete snapshot of all live production CMS data:
```powershell
powershell -ExecutionPolicy Bypass -File .\backup-production-cms.ps1
```
Backups are automatically timestamped and stored in `d:\New folder\backups\cms_snapshot_YYYYMMDD_HHMMSS.json`.
