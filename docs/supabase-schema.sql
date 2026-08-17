-- =========================================================================
-- ANUGRAHA EYE HOSPITAL - SUPABASE POSTGRESQL PRODUCTION SCHEMA & SEED
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SCHEMA DDL

-- 2.1 Site Settings (Singleton objects: brand, homepage, about, stats, patientResources, dataGaps, coreObjectives)
CREATE TABLE IF NOT EXISTS public.cms_site_settings (
    id TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by TEXT
);

-- 2.2 Doctors & Clinical Leadership
CREATE TABLE IF NOT EXISTS public.cms_doctors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    degrees TEXT,
    specialization TEXT,
    experience TEXT,
    bio TEXT,
    photo TEXT,
    awards TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 Administration Leadership
CREATE TABLE IF NOT EXISTS public.cms_administration (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    degrees TEXT,
    department TEXT,
    bio TEXT,
    photo TEXT,
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 Facilities (Base Hospitals & Vision Centers)
CREATE TABLE IF NOT EXISTS public.cms_facilities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'base' or 'vision-center'
    address TEXT,
    city TEXT,
    district TEXT,
    pincode TEXT,
    phone TEXT,
    email TEXT,
    hours TEXT,
    emergency TEXT,
    map_url TEXT,
    hero_image TEXT,
    services JSONB,
    facilities JSONB,
    doctors_schedule JSONB,
    stats JSONB,
    coordinates JSONB,
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 Clinical Services & Specialties
CREATE TABLE IF NOT EXISTS public.cms_services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    short_desc TEXT,
    hero_image TEXT,
    benefits TEXT[],
    symptoms TEXT[],
    who_needs_it TEXT[],
    procedures TEXT[],
    faq_list JSONB,
    clinical_details JSONB,
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6 Advanced Ophthalmic Equipment (23 Items)
CREATE TABLE IF NOT EXISTS public.cms_equipment (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    alt_text TEXT,
    category TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.7 Partnerships & Manufacturers
CREATE TABLE IF NOT EXISTS public.cms_partnerships (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    alt TEXT,
    category TEXT,
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.8 Academics & Education Programs
CREATE TABLE IF NOT EXISTS public.cms_academics (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    degree TEXT,
    affiliation TEXT,
    duration TEXT,
    eligibility TEXT,
    description TEXT,
    highlights TEXT[],
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.9 Empanelments & Insurance TPAs
CREATE TABLE IF NOT EXISTS public.cms_empanelments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Government Schemes' or 'Private Insurance TPAs'
    code TEXT,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.10 Patient FAQs
CREATE TABLE IF NOT EXISTS public.cms_faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    display_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.11 News & Press Releases
CREATE TABLE IF NOT EXISTS public.cms_news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    category TEXT,
    short_desc TEXT,
    content TEXT,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.12 Media Library Gallery
CREATE TABLE IF NOT EXISTS public.cms_gallery (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    src TEXT NOT NULL,
    filename TEXT,
    type TEXT,
    size TEXT,
    dimensions TEXT,
    upload_date TEXT,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.13 Admin Audit Logs
CREATE TABLE IF NOT EXISTS public.cms_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS across all tables
ALTER TABLE public.cms_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_administration ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_academics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_empanelments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_audit_logs ENABLE ROW LEVEL SECURITY;

-- 3.1 Public Read-Only Policies (Anon Access for Website Visitors)
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public Read Site Settings" ON public.cms_site_settings;
    CREATE POLICY "Public Read Site Settings" ON public.cms_site_settings FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public Read Doctors" ON public.cms_doctors;
    CREATE POLICY "Public Read Doctors" ON public.cms_doctors FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read Admin Leadership" ON public.cms_administration;
    CREATE POLICY "Public Read Admin Leadership" ON public.cms_administration FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read Facilities" ON public.cms_facilities;
    CREATE POLICY "Public Read Facilities" ON public.cms_facilities FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read Services" ON public.cms_services;
    CREATE POLICY "Public Read Services" ON public.cms_services FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read Equipment" ON public.cms_equipment;
    CREATE POLICY "Public Read Equipment" ON public.cms_equipment FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read Partnerships" ON public.cms_partnerships;
    CREATE POLICY "Public Read Partnerships" ON public.cms_partnerships FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read Academics" ON public.cms_academics;
    CREATE POLICY "Public Read Academics" ON public.cms_academics FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read Empanelments" ON public.cms_empanelments;
    CREATE POLICY "Public Read Empanelments" ON public.cms_empanelments FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read FAQs" ON public.cms_faqs;
    CREATE POLICY "Public Read FAQs" ON public.cms_faqs FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read News" ON public.cms_news;
    CREATE POLICY "Public Read News" ON public.cms_news FOR SELECT USING (published = true);

    DROP POLICY IF EXISTS "Public Read Gallery" ON public.cms_gallery;
    CREATE POLICY "Public Read Gallery" ON public.cms_gallery FOR SELECT USING (published = true);
END $$;

-- 3.2 Authenticated Admin Full CRUD Policies
DO $$
BEGIN
    DROP POLICY IF EXISTS "Admin Full Access Site Settings" ON public.cms_site_settings;
    CREATE POLICY "Admin Full Access Site Settings" ON public.cms_site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Doctors" ON public.cms_doctors;
    CREATE POLICY "Admin Full Access Doctors" ON public.cms_doctors FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Admin Leadership" ON public.cms_administration;
    CREATE POLICY "Admin Full Access Admin Leadership" ON public.cms_administration FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Facilities" ON public.cms_facilities;
    CREATE POLICY "Admin Full Access Facilities" ON public.cms_facilities FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Services" ON public.cms_services;
    CREATE POLICY "Admin Full Access Services" ON public.cms_services FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Equipment" ON public.cms_equipment;
    CREATE POLICY "Admin Full Access Equipment" ON public.cms_equipment FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Partnerships" ON public.cms_partnerships;
    CREATE POLICY "Admin Full Access Partnerships" ON public.cms_partnerships FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Academics" ON public.cms_academics;
    CREATE POLICY "Admin Full Access Academics" ON public.cms_academics FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Empanelments" ON public.cms_empanelments;
    CREATE POLICY "Admin Full Access Empanelments" ON public.cms_empanelments FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access FAQs" ON public.cms_faqs;
    CREATE POLICY "Admin Full Access FAQs" ON public.cms_faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access News" ON public.cms_news;
    CREATE POLICY "Admin Full Access News" ON public.cms_news FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Gallery" ON public.cms_gallery;
    CREATE POLICY "Admin Full Access Gallery" ON public.cms_gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Admin Full Access Audit Logs" ON public.cms_audit_logs;
    CREATE POLICY "Admin Full Access Audit Logs" ON public.cms_audit_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

-- =========================================================================
-- 4. SUPABASE STORAGE BUCKET CONFIGURATION ('hospital-media')
-- =========================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'hospital-media',
    'hospital-media',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/jpg'];

-- Storage Access Policies
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public Media Read Access" ON storage.objects;
    CREATE POLICY "Public Media Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'hospital-media');

    DROP POLICY IF EXISTS "Admin Media Insert Access" ON storage.objects;
    CREATE POLICY "Admin Media Insert Access" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hospital-media');

    DROP POLICY IF EXISTS "Admin Media Update Access" ON storage.objects;
    CREATE POLICY "Admin Media Update Access" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'hospital-media');

    DROP POLICY IF EXISTS "Admin Media Delete Access" ON storage.objects;
    CREATE POLICY "Admin Media Delete Access" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'hospital-media');
END $$;

-- =========================================================================
-- 5. REALTIME PUBLICATION ENABLEMENT
-- =========================================================================
-- Ensure Supabase Realtime listens to table changes for instantaneous multi-device updates
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE 
        public.cms_site_settings,
        public.cms_doctors,
        public.cms_administration,
        public.cms_facilities,
        public.cms_services,
        public.cms_equipment,
        public.cms_partnerships,
        public.cms_academics,
        public.cms_empanelments,
        public.cms_faqs,
        public.cms_news,
        public.cms_gallery;
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN others THEN NULL;
END $$;
