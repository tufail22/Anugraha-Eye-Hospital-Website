# Anugraha Eye Hospital — Web Application & Admin CMS

A premium, responsive, accessible, and SEO-optimized web application and frontend-only Admin CMS for **Anugraha Eye Hospital** (founded in 2001 by Dr. Prabhugouda B. Lingadalli).

> **Authentic. Affectionate. Affordable.**

---

## 🚀 How to Run Locally

### Option 1: PowerShell Live Server Script (Recommended)
Run the built-in PowerShell script to launch the local web server on port `8080`:
```powershell
.\serve.ps1
```
Then open your browser to: **[http://localhost:8080/](http://localhost:8080/)**

### Option 2: Python Simple HTTP Server
```bash
python -m http.server 8080
```
Then open your browser to: **[http://localhost:8080/](http://localhost:8080/)**

### Option 3: Node.js `npx serve`
```bash
npx serve -p 8080 .
```

---

## 🗺️ Complete Route Map

| Route Path | Description | Access Level |
| :--- | :--- | :--- |
| `/#/` | **Homepage**: Hero, Trust Metrics, Base Hospitals, Vision Centers, Service Preview, Leadership, Academics, Contact Strip | Public |
| `/#/about-us` | **About Us**: Institutional 25-Year Legacy, Vision & Mission, Strategic Objectives | Public |
| `/#/about-us/leadership` | **Leadership**: Founder Dr. P.B. Lingadalli (Rajyostava Awardee) & Medical Director Dr. Malini P L | Public |
| `/#/about-us/administration` | **Administration**: Executive Team (Finance, HR, BD, Support, Outreach, Transport) | Public |
| `/#/hospitals/vijayapura` | **Vijayapura Base Hospital**: Main Campus details, HEPA OTs, Address, Helpline | Public |
| `/#/hospitals/kalaburagi` | **Kalaburagi Base Hospital**: Tertiary Campus details & Optometry Institute | Public |
| `/#/vision-centers` | **Vision Centers Hub**: Directory of all 8 rural vision centers | Public |
| `/#/vision-centers/talikoti` | **Talikoti Vision Center**: Details, phone, hours, doctor visit schedule | Public |
| `/#/vision-centers/muddebihal` | **Muddebihal Vision Center**: Details, phone, hours, doctor visit schedule | Public |
| `/#/vision-centers/sindagi` | **Sindagi Vision Center**: Details, phone, hours, doctor visit schedule | Public |
| `/#/vision-centers/indi` | **Indi Vision Center**: Details, phone, hours, doctor visit schedule | Public |
| `/#/vision-centers/bbagewadi` | **B. Bagewadi Vision Center**: Details, phone, hours, doctor visit schedule | Public |
| `/#/vision-centers/chadachan` | **Chadachan Vision Center**: Details, phone, hours, doctor visit schedule | Public |
| `/#/vision-centers/nalatwad` | **Nalatwad Vision Center**: Details, phone, hours, doctor visit schedule | Public |
| `/#/vision-centers/tikota` | **Tikota Vision Center**: Details, phone, hours, doctor visit schedule | Public |
| `/#/services` | **Ophthalmic Services & Specialties**: Cataract Phaco, LASIK, Retina, Glaucoma, Pediatric, Oculoplasty, Cornea, Opticals | Public |
| `/#/academics` | **Academics Hub**: Fellowships, NBEMS DNB, Diploma Optometry, B.Sc Optometry | Public |
| `/#/academics/fellowships` | **Clinical Fellowship**: Super-Specialty Surgical Training | Public |
| `/#/academics/dnb` | **NBEMS DNB Ophthalmology**: NBE-Accredited Post-Graduate Residency | Public |
| `/#/academics/dot` | **Diploma in Ophthalmic Technology**: Paramedical Training | Public |
| `/#/academics/bsc-optometry` | **B.Sc Optometry**: RGUHS Affiliated Optometry Institute | Public |
| `/#/patient-resources/empanelments-and-insurance` | **Empanelments & Insurance**: Government Schemes (AB-ARK) & Cashless TPAs | Public |
| `/#/patient-resources/handouts` | **Patient Handouts**: Downloadable resources template (Honest Empty-State) | Public |
| `/#/gallery` | **Photo Gallery**: Hospital & Outreach photo grid with Lightbox modal | Public |
| `/#/news` | **Press & Updates**: News card list template (Honest Empty-State) | Public |
| `/#/videos` | **Video Desk**: Embed-ready surgical video grid (Honest Empty-State) | Public |
| `/#/careers` | **Careers**: Honest Empty-State with direct contact fallback | Public |
| `/#/contact` | **Contact & Helplines**: Location maps, phone numbers, email client mailto form | Public |
| `/#/admin` | **Admin Portal Login**: Gated sign-in page (`web@admin` / `Admin@2001`) | Footer Link |
| `/#/admin/dashboard` | **Admin CMS Console**: Full No-Code Content Management Shell | Authenticated Gated |

---

## 🔒 Security & Supabase Cloud Architecture

- **Supabase PostgreSQL Cloud Database**: All website entities (Homepage, Brand, Doctors, Base Hospitals, Vision Centers, Equipment, Services, News, FAQs, Empanelments, Gallery) are persisted in PostgreSQL.
- **Row-Level Security (RLS)**:
  - **Public Visitors (Anon)**: Read-only access (`SELECT`) to published hospital content.
  - **Hospital Administrators (Auth)**: Full write permissions (`INSERT`, `UPDATE`, `DELETE`) protected by Supabase JWT authentication.
- **Supabase Cloud Storage (`hospital-media`)**:
  - Image files uploaded via the Admin CMS are stored permanently in the Supabase Cloud Storage bucket (`hospital-media`) and served over high-speed CDN URLs.
- **Realtime Multi-Device Synchronization**:
  - Uses Supabase Realtime WebSocket listeners (`postgres_changes`) alongside BroadcastChannel and REST API fallback, ensuring that whenever an administrator publishes changes on one device, all open browsers, mobile phones, and tablets globally receive and render the updates immediately.
- **Setup & Migration**:
  - Run [`docs/supabase-schema.sql`](docs/supabase-schema.sql) in the Supabase SQL Editor.
  - Add your Supabase URL & Anon Key to [`js/config.js`](js/config.js) or Vercel Environment Variables.

---

## ♿ Accessibility (WCAG 2.2 AA Compliance)

- **Touch Target Sizes**: All interactive buttons, links, inputs, selects, and toggles enforce a minimum **44px x 44px touch target**.
- **Keyboard Navigation & Visible Focus**: High-contrast green focus ring (`outline: 3px solid #059669; outline-offset: 3px;`) across all keyboard focusable controls.
- **Modal Focus Lock & Escape Handlers**: Lightbox modal, Mobile drawer, and Admin dialogs listen to `Escape` key close triggers.
- **Landmarks & Heading Hierarchy**: Strictly **one `<h1>` per page view**, wrapped in semantic `<header>`, `<nav>`, `<main>`, and `<footer>` elements.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` preference across keyframe animations, smooth scroll engines, and stat counters.

---

## 🔍 SEO & JSON-LD Schemas

- **Dynamic Page Titles & Meta Descriptions**: Custom `<title>` and `<meta name="description">` per route.
- **Dynamic `<link rel="canonical">` Tag**: Injects clean canonical URL matching active route.
- **JSON-LD Schemas**:
  - `MedicalOrganization` schema on Homepage.
  - `Hospital` / `MedicalClinic` schemas on Base Hospitals and Vision Center pages.
  - `BreadcrumbList` schema on nested pages (`Home > Vision Centers > Talikoti`).
- **Production 301 Redirects**:
  - `/copy-of-vijayapura-campus` -> `/vision-centers/talikoti`
  - `/sindagi` -> `/vision-centers/muddebihal`
  - `/bbagewadi` -> `/vision-centers/b-bagewadi`
  - `/newshappenings` -> `/news`

---

## ✅ Final Verification Checklist

- [x] **No Booking Page Exists**: Replaced with direct call/WhatsApp/mailto fallbacks.
- [x] **No "Book Now" Button Exists**: CTAs state "Call Helpline" or "Enquire via Email".
- [x] **No Patient Portal Exists**: Public patient resources focused on insurance & handouts.
- [x] **Admin Portal Link is Footer-Only**: Located in footer bottom navigation (`/#/admin`).
- [x] **Admin Upload Validation**: Accepts `.jpg`, `.jpeg`, `.png` only; enforces 5MB limit.
- [x] **Hospital Helplines Visible**: `08352-220646` and `+91 74839 00963` displayed prominently.
- [x] **Placeholder Wix Copy Removed**: Zero instances of Ashley Jones, Don Francis, Alexa Young.
- [x] **Services Copy Safe & Non-Guarantee**: Clinical procedure descriptions use safe non-promotional text.
- [x] **All Locations Present**: Main Vijayapura Base Hospital, Kalaburagi Base Hospital, and 8 Vision Centers (Talikoti, Muddebihal, Sindagi, Indi, B. Bagewadi, Chadachan, Nalatwad, Tikota).
- [x] **Mobile Responsiveness**: Verified down to 360px width with no horizontal overflow (`overflow-x: hidden`).
- [x] **Keyboard Navigation**: Full focus ring coverage and modal escape key handling.
- [x] **Reduced Motion**: All animations fallback to simple 150ms opacity fades.

---

## 📌 Items Requiring Hospital Administration Confirmation

1. **Kalaburagi Base Hospital Address & Operating Hours**:
   - Currently set to pending confirmation notice: *"Kalaburagi Base Hospital exact campus address & operating hours are awaiting final hospital administration verification. Contact Vijayapura Main Branch."*
2. **Clinical Procedure Copy & Batch Seat Availability**:
   - Academic program durations and fellowship seat allocations marked as `[CONFIRM WITH HOSPITAL]`.
