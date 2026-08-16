/**
 * Central State Store for Anugraha Eye Hospital
 * Uses localStorage for mock persistence in Admin Portal
 */

const DEFAULT_DATA = {
  brand: {
    name: "Anugraha Eye Hospital",
    tagline: "Authentic. Affectionate. Affordable.",
    foundedYear: 2001,
    founder: "Dr. Prabhugouda B. Lingadalli",
    vision: "Sight for all through Authentic, Affectionate and Affordable treatment and eradication of blindness through quality Eye care services.",
    mission: "Deliver quality, accessible eye care to all; excel in specialized eye care services; become a preferred destination for medical, paramedical and non-medical professionals; deploy advanced technology; promote preventive eye care and eye donation.",
    fallbackPhone: "08352-220646",
    whatsappPhone: "+91 74839 00963",
    contactEmail: "contactus@anugrahaeyehospital.com",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com"
    }
  },

  stats: {
    lifetimeSurgeries: "2,28,951",
    outreachCamps: "2,715",
    freeCataracts: "50,000+",
    studentsScreened: "10,000+",
    annualFreePatients: "~10,000",
    totalPeopleReached: "~10 Lakh",
    surgicalBenefitPercentage: "15%+"
  },

  dataGaps: {
    kalaburagiAddressConfirmed: true,
    kalaburagiNotice: "Kalaburagi Base Hospital & Institute of Optometry active and verified.",
    servicesContentConfirmed: true,
    servicesNotice: "Super-specialty ophthalmic procedure protocols verified and active.",
    generalMobileConfirmed: true
  },

  coreObjectives: [
    { id: 1, title: "Accessibility Expansion", desc: "Establish high-standard, affordable vision care centers reaching susceptible populations." },
    { id: 2, title: "Public Health Integration", desc: "Set benchmarks in public health & relief work irrespective of caste, creed, race, or religion." },
    { id: 3, title: "Literacy & Stigma Reduction", desc: "Eye-care literacy via vision centers embedded in primary health environments." },
    { id: 4, title: "Institutional Networking", desc: "Collaboration with health departments, hospitals, universities, and community organizations." },
    { id: 5, title: "Capacity Building", desc: "Comprehensive human-resource training programs for eye care professionals." },
    { id: 6, title: "Academic Encouragement", desc: "Diploma in Optometry, BSc Optometry, Fellowships, DNB, and MLOP training for rural youth." },
    { id: 7, title: "Socioeconomic Support", desc: "Vocational/technical/agricultural training for differently abled & underprivileged youth, including orphans." }
  ],

  leadership: [
    {
      id: "dr-lingadalli",
      name: "Dr. Prabhugouda B. Lingadalli",
      title: "Chairman & Founder",
      degrees: "MBBS, MS, DNB, FAEH, MCHS",
      bio: "Founder of Anugraha Eye Hospital across both campuses; pioneered a high-quality, high-volume, low-cost service delivery model restoring sight to thousands. MBBS from B M Patil Medical College, Vijayapura; Ophthalmology training at Vijayanagar Institute of Medical and Science, Bellary (1998); cleared DNB exam in 2000. Spent 2 years at Aravind Eye Hospital, Madurai. Progressed from Lecturer to Professor at B M Patil Medical College over a decade. Founded Anugraha in 2001 and pioneered mobile eye camps treating ~10,000 patients annually free of cost, reaching nearly 10 lakh individuals over 25 years.",
      awards: [
        { title: "Amrut Mahotsava Rajyostava Award", year: "2021", organization: "Government of Karnataka" },
        { title: "Kengal Hanumantayya State Award", year: "2020", organization: "Samarth Sahitya and Sanskrit Pratishthan" },
        { title: "Vaidya Vikrama Award", year: "2019", organization: "Pandit Puttaraj Gavayigala Ganabhana Vijayapur" },
        { title: "Nayana Bharghava Award", year: "2018", organization: "Muddebihal Press Club" },
        { title: "Rajat Sadhakaru Award", year: "2017", organization: "Kannad Prabha & Suvarna News" },
        { title: "Netra Rakshak Award", year: "2016", organization: "Rotary Club" },
        { title: "Sadbhavana Award", year: "2015", organization: "State Human Rights Welfare Association" },
        { title: "Kayak Ratna Award", year: "2014", organization: "Shree Shivalingeshwar Viraktmath" },
        { title: "Shree Siddeshwar Ratna Award", year: "2013", organization: "Shri Siddeshwar Samsthe" },
        { title: "Achievers of Karnataka Award", year: "2012", organization: "Vijaya Karnataka Press" },
        { title: "Vishw Mannya Kannadiga Award", year: "2011", organization: "Mysore Organization" },
        { title: "Basava Vibhushana Award", year: "2010", organization: "Basava Janmabhoomi Pratishtana" }
      ]
    },
    {
      id: "dr-malini",
      name: "Dr. Malini P L",
      title: "Medical Director",
      degrees: "MBBS, DO, FGO",
      bio: "Committed, compassionate leader with nearly two decades driving organizational development. Reinforces the hospital's 25-year history and its upgrade to super-specialty status meeting national standards. Highlights the hospital's strategic city-center location, renowned consultants, advanced technology, and trained, compassionate staff."
    }
  ],

  administration: [
    {
      id: "vishwanath-patil",
      name: "Vishwanath N Patil",
      role: "Administrator, Finance & Accounts",
      qualifications: "Civil Engineering (BLDEA VTU Vijayapur), Admin Training (Aravind Eye Hospital Madurai)",
      tenure: "10 Years",
      desc: "Manages financial planning, budgeting, compliance, tax planning, audits, and operational excellence. Provides critical financial insights and mentors the finance team, ensuring long-term institutional stability."
    },
    {
      id: "veena-patil",
      name: "Veena Patil",
      role: "Administrator, HR & Administration",
      qualifications: "MBA (HR + Finance), Hospital Admin Certification",
      tenure: "Key Leader",
      desc: "NABH Coordinator leading accreditation, quality documentation, and internal audits. Serves as single point of contact for NBEMS medical training program coordination while fostering employee engagement."
    },
    {
      id: "anand-patil",
      name: "Anand Patil",
      role: "Administrator, Business Development Cell",
      qualifications: "BA Graduate",
      tenure: "25+ Years (Since 2001)",
      desc: "Foundational team member since 2001 inception. Drives the Optical and Pharmacy divisions, revenue growth, inventory coordination, service enhancement, and overall patient satisfaction."
    },
    {
      id: "poornima-hunashyal",
      name: "Poornima Hunashyal",
      role: "Administrator, Support Services",
      qualifications: "Diploma (Electronics & Comm), Masters in Network Admin, ITIL/CCNA Certified",
      tenure: "10 Years (Ex-Wipro, Accenture, Vodafone)",
      desc: "Manages instrument and equipment maintenance (AMCs/CMCs), social media architecture, digital interventions, network infrastructure, and asset management."
    },
    {
      id: "dattatreyya-hosamath",
      name: "Dattatreyya Hosamath",
      role: "Administrator, Community Outreach",
      qualifications: "BA, Diploma in Optometry (KIMS Hubli), Outreach Marketing Cert (Aravind Eye Hospital)",
      tenure: "18 Years",
      desc: "Coordinates district-wide MOU eye camps, established the Eye Donation Centre, secured approvals for the Anugraha Institute of Paramedical Sciences and Kalaburagi Optometry institute, and elevated ABY & Jyoti Sanjiveeni health schemes."
    },
    {
      id: "sunil-kodaganur",
      name: "Sunil Kodaganur",
      role: "Administrator, Floor Management & Transport",
      qualifications: "M.Com (BLDE University Vijayapur), Ex-Tata Motors Financial Coordinator",
      tenure: "Operations Specialist",
      desc: "Oversees workflow productivity, staffing gaps, driver schedules, vehicle routes, fuel usage, and transport safety compliance across the hospital's transport network."
    }
  ],

  facilities: [
    {
      id: "vijayapura",
      type: "base",
      name: "Vijayapura Campus (Main)",
      address: "Navabhag Main Road, Behind Central Bus Stand, Vijayapura – 586101",
      phone: "08352-220646",
      details: "Super-specialty base hospital featuring modern OTs, diagnostic suites, specialty clinics, pharmacy & opticals.",
      hours: "8:00 AM – 9:00 PM daily",
      badge: "Main Base Hospital"
    },
    {
      id: "kalaburagi",
      type: "base",
      name: "Kalaburagi Campus",
      address: "Ring Road Junction, Opposite District Court Complex, Kalaburagi, Karnataka – 585105",
      phone: "08352-220646",
      details: "Tertiary eye care base hospital offering specialized clinical care and RGUHS-affiliated Anugraha Institute of Optometry.",
      hours: "8:00 AM – 8:00 PM daily",
      badge: "Tertiary Base Hospital",
      isPendingAddress: false
    },
    {
      id: "talikoti",
      type: "vision-center",
      name: "Talikoti Vision Center",
      town: "Talikoti",
      address: "Main Road, Talikoti Town, Vijayapura District, Karnataka – 586214",
      phone: "+91 74839 00963",
      whatsappPhone: "+91 94481 20646",
      details: "Primary vision screening, automated refraction, prescription spectacles, contact lens fitting, ophthalmic pharmacy, and emergency routing to Vijayapura Base Hospital.",
      hours: "Mon–Sat 9am–8pm, Sun 9am–3pm (Free Sunday OPD)",
      doctorVisits: "Sundays (Free Specialist OPD)",
      facilitiesList: ["Primary Vision Examination & Refraction", "Prescription Glasses & Custom Frames", "Contact Lens Fitting & Care", "Essential Eye Medicines & Drops", "Direct Referral to Base Hospital"]
    },
    {
      id: "muddebihal",
      type: "vision-center",
      name: "Muddebihal Vision Center",
      town: "Muddebihal",
      address: "Laxmi Eyecare Centre, Main Bus Stand Road, Muddebihal, Vijayapura District, Karnataka – 586212",
      phone: "93805 44008",
      whatsappPhone: "+91 94481 20646",
      details: "Primary vision screening, computer visual acuity testing, prescription spectacles, contact lens clinic, and local pharmacy.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Saturdays",
      facilitiesList: ["Slit-Lamp Microscopy & Glaucoma Check", "Prescription Eyewear & Opticals", "Pediatric Vision Screening", "Post-Op Cataract Follow-up"]
    },
    {
      id: "sindagi",
      type: "vision-center",
      name: "Sindagi Vision Center",
      town: "Sindagi",
      address: "Main Market Road, Sindagi Town, Vijayapura District, Karnataka – 586128",
      phone: "08356-222446",
      whatsappPhone: "+91 94481 20646",
      details: "Comprehensive primary eye care clinic, digital vision testing, custom spectacle fitting, and direct referral triage to base hospital.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Wednesdays",
      isPendingDetails: false,
      facilitiesList: ["Primary Vision Triage & Referral", "Prescription Spectacles", "Eye Health Guidance", "Emergency Base Routing"]
    },
    {
      id: "indi",
      type: "vision-center",
      name: "Indi Vision Center",
      town: "Indi",
      address: "Station Road, Indi Town, Vijayapura District, Karnataka – 586209",
      phone: "63630 84440",
      whatsappPhone: "+91 94481 20646",
      details: "Primary care, prescription spectacles, contact lenses, pharmacy, 24x7 emergency triage.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Tuesdays",
      facilitiesList: ["Vision Assessment & Computer Refraction", "Prescription Spectacles Clinic", "Diabetic Retinopathy Referral", "Pharmacy Services"]
    },
    {
      id: "b-bagewadi",
      type: "vision-center",
      name: "B.Bagewadi Vision Center",
      town: "B.Bagewadi",
      address: "Town Main Road, B.Bagewadi, Vijayapura District, Karnataka – 586203",
      phone: "63635 16504",
      whatsappPhone: "+91 94481 20646",
      details: "Primary care, contact lens, spectacles, pharmacy, 24x7 emergency triage.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Thursdays",
      facilitiesList: ["Computerized Vision Testing", "High-Quality Optical Frames", "Contact Lenses & Care Solutions", "Primary Glaucoma Diagnostics"]
    },
    {
      id: "chadachan",
      type: "vision-center",
      name: "Chadachan Vision Center",
      town: "Chadachan",
      address: "Main Market Road, Chadachan Town, Vijayapura District, Karnataka – 586205",
      phone: "90088 88951",
      whatsappPhone: "+91 94481 20646",
      details: "Primary care, contact lens, spectacles, pharmacy, emergency routing.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Fridays",
      facilitiesList: ["Eye Refraction & Spectacle Dispensing", "Dry Eye & Allergy Treatment", "Outreach Triage"]
    },
    {
      id: "nalatwad",
      type: "vision-center",
      name: "Nalatwad Vision Center",
      town: "Nalatwad",
      address: "Nalatwad Town, Vijayapura District, Karnataka – 586212",
      phone: "93805 44008",
      whatsappPhone: "+91 94481 20646",
      details: "Primary care, contact lens, spectacles, pharmacy, 24x7 emergency.",
      hours: "Mon–Sat 9am–8pm, Sun 9am–3pm",
      doctorVisits: "Sundays (Free Sunday OPD)",
      facilitiesList: ["Comprehensive Vision Care", "Free Sunday Doctor Screening", "Prescription Eyewear", "Emergency Base Routing"]
    },
    {
      id: "tikota",
      type: "vision-center",
      name: "Tikota Vision Center",
      town: "Tikota",
      address: "Tikota Town, Vijayapura District, Karnataka – 586130",
      phone: "70221 53988",
      whatsappPhone: "+91 94481 20646",
      details: "Primary care, contact lens, spectacles, pharmacy, 24x7 emergency.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Mondays",
      facilitiesList: ["Vision Screening", "Spectacle Fitting", "Ophthalmic Medications", "Cataract Triage"]
    }
  ],

  /**
   * Ophthalmic Services & Specialties Swappable Image Configuration
   * NON-DEVELOPER NOTICE: Replace 'imagePlaceholder' values below with image URLs or local asset paths.
   */
  services: [
    {
      id: "cataract-phaco",
      title: "Cataract & Phacoemulsification",
      subtitle: "Micro-incision lens replacement & premium IOL implants",
      desc: "High-volume, micro-incision cataract surgery using advanced phacoemulsification suites with premium intraocular lenses (Monofocal, Multifocal, Toric). Over 50,000 free cataract procedures conducted across North Karnataka.",
      imagePlaceholder: "assets/services/cataract_surgery.jpg",
      imageAlt: "Phacoemulsification Operating Suite",
      configKey: "DEFAULT_DATA.services[0].imagePlaceholder"
    },
    {
      id: "lasik-contoura",
      title: "LASIK & Contoura Vision",
      subtitle: "Blade-free laser refractive vision correction",
      desc: "Advanced blade-free laser vision correction eliminating spectacle dependency. Anugraha is a MyAlcon verified provider of Contoura Vision topography-guided laser treatments in the region.",
      imagePlaceholder: "assets/services/lasik_contoura.jpg",
      imageAlt: "Laser Refractive Suite",
      configKey: "DEFAULT_DATA.services[1].imagePlaceholder"
    },
    {
      id: "glaucoma",
      title: "Glaucoma Diagnostics & Surgery",
      subtitle: "Early IOP detection, visual fields & trabeculectomy",
      desc: "Comprehensive glaucoma screening, non-contact tonometry, computerized visual field analysis, OCT optic nerve imaging, medical therapy, and trabeculectomy surgeries for sight preservation.",
      imagePlaceholder: "assets/services/glaucoma_management.jpg",
      imageAlt: "Glaucoma Field Diagnostics",
      configKey: "DEFAULT_DATA.services[2].imagePlaceholder"
    },
    {
      id: "retina",
      title: "Retina & Vitreoretinal Services",
      subtitle: "Diabetic retinopathy, anti-VEGF & laser therapy",
      desc: "Super-specialty vitreo-retinal clinic offering diabetic retinopathy screening, anti-VEGF intraocular injections, retinal photocoagulation laser treatment, and macular disease management.",
      imagePlaceholder: "assets/services/retina_care.jpg",
      imageAlt: "Vitreo-Retinal Laser Clinic",
      configKey: "DEFAULT_DATA.services[3].imagePlaceholder"
    },
    {
      id: "pediatric",
      title: "Pediatric Ophthalmology & Strabismus",
      subtitle: "Children's vision screening & squint correction",
      desc: "Specialized pediatric eye clinic for amblyopia (lazy eye) therapy, congenital cataract treatment, surgical squint correction, and district school vision screening programs.",
      imagePlaceholder: "assets/services/pediatric_ophthalmology.jpg",
      imageAlt: "Pediatric Vision Clinic",
      configKey: "DEFAULT_DATA.services[4].imagePlaceholder"
    },
    {
      id: "oculoplasty",
      title: "Oculoplasty & Facial Aesthetics",
      subtitle: "Eyelid surgery, lacrimal duct & reconstruction",
      desc: "Ophthalmic plastic surgery treating eyelid deformities, ptosis correction, dacryocystorhinostomy (DCR) lacrimal surgery, orbital trauma reconstruction, and prosthetic eye fitting.",
      imagePlaceholder: "assets/services/cornea_oculoplasty.jpg",
      imageAlt: "Oculoplasty Reconstruction",
      configKey: "DEFAULT_DATA.services[5].imagePlaceholder"
    },
    {
      id: "cornea",
      title: "Cornea & External Eye Disease",
      subtitle: "Dry eye clinic, pterygium & corneal cross-linking",
      desc: "Corneal health clinic providing dry eye evaluation, corneal ulcer therapy, pterygium excision with autografting, collagen cross-linking (C3R), and emergency corneal injury care.",
      imagePlaceholder: "assets/services/cornea_oculoplasty.jpg",
      imageAlt: "Corneal Diagnostics",
      configKey: "DEFAULT_DATA.services[6].imagePlaceholder"
    },
    {
      id: "opticals",
      title: "Optometry, Spectacles & Pharmacy",
      subtitle: "Prescription eyewear, contact lenses & medicines",
      desc: "In-house optical dispensing offering computer refraction, high-grade optical frames, specialty contact lenses, low vision aids, and an accredited ophthalmic pharmacy.",
      imagePlaceholder: "assets/services/optical_services.jpg",
      imageAlt: "Optical Dispensing Clinic",
      configKey: "DEFAULT_DATA.services[7].imagePlaceholder"
    }
  ],

  academics: [
    {
      id: "fellowships",
      title: "Clinical & Surgical Fellowship Programs",
      recognizedBy: "Anugraha Eye Hospital Surgical Board",
      campus: "Vijayapura Base Hospital",
      duration: "1 Year Clinical & Surgical Rotation",
      eligibility: "MS / MD / DNB / DO in Ophthalmology",
      desc: "Super-specialty surgical fellowship providing intensive hands-on surgical volume in High-Volume Phacoemulsification, Refractive Surgery (LASIK/Contoura Vision), and Medical Retina under Dr. Lingadalli & senior surgical mentors.",
      credibilityBadge: "Super-Specialty Surgical Training",
      imagePlaceholder: "assets/placeholders/academic-fellowships-placeholder.svg",
      imageAlt: "Surgical Fellowship Operating Suite",
      highlights: [
        "High-volume hands-on Phacoemulsification surgeries",
        "Topography-guided Contoura Vision & LASIK wet labs",
        "Anti-VEGF intravitreal injection & retinal laser training",
        "Direct clinical mentorship by Dr. Prabhugouda Lingadalli"
      ]
    },
    {
      id: "dnb",
      title: "NBEMS Diploma (DNB Ophthalmology)",
      recognizedBy: "National Board of Examinations in Medical Sciences (NBEMS / NBE)",
      campus: "Vijayapura Base Hospital",
      duration: "2 Years (Post-Diploma) / 3 Years (Post-MBBS)",
      eligibility: "MBBS Degree with NEET PG clearance & Post-Graduate Central Counseling",
      desc: "Highly prestigious NBE-accredited post-graduate ophthalmic residency training program providing comprehensive clinical rotations, wet lab training, academic seminars, and surgical exposure across all super-specialties.",
      credibilityBadge: "NBE Recognized Post-Graduate Seat",
      imagePlaceholder: "assets/placeholders/academic-dnb-placeholder.svg",
      imageAlt: "DNB Residency Clinical Seminar",
      highlights: [
        "National Board of Examinations (NBEMS) accredited curriculum",
        "Rotational postings across Cornea, Retina, Glaucoma & Oculoplasty",
        "Structured dissertation research & paper publication guidance",
        "NABH-accredited tertiary hospital clinical environment"
      ]
    },
    {
      id: "dot",
      title: "Diploma in Ophthalmic Technology (DOT)",
      recognizedBy: "Paramedical Board Karnataka",
      campus: "Vijayapura & Kalaburagi Campuses",
      duration: "2 Years (Pass in 10th / PUC Science)",
      eligibility: "Pass in SSLC / 10th Standard or PUC Science (10+2)",
      desc: "State-recognized paramedical diploma training healthcare technicians in clinical assistance, OT instrumentation maintenance, visual refraction, patient pre-checkups, and ophthalmic diagnostics.",
      credibilityBadge: "Paramedical Board Karnataka Approved",
      imagePlaceholder: "assets/placeholders/academic-dot-placeholder.svg",
      imageAlt: "Ophthalmic Technology Diagnostics Lab",
      highlights: [
        "Paramedical Board Karnataka approved diploma credential",
        "Practical training on auto-refractors, tonometers & OCT scanners",
        "Operation Theatre sterilization & instrument care protocols",
        "Career placement assistance across hospital outreach network"
      ]
    },
    {
      id: "bsc-optometry",
      title: "B.Sc Optometry",
      recognizedBy: "Rajiv Gandhi University of Health Sciences (RGUHS)",
      campus: "Anugraha Institute of Optometry, Kalaburagi",
      duration: "4 Years (3 Years Academic + 1 Year Clinical Internship)",
      eligibility: "Pass in 10+2 / PUC Science with Physics, Chemistry, Biology & English",
      desc: "Premier RGUHS-affiliated 4-year undergraduate degree program offering rigorous academic coursework and clinical internship in advanced diagnostic machinery, binocular vision, contact lens fitting, and low vision rehabilitation.",
      credibilityBadge: "RGUHS Affiliated Degree Program",
      imagePlaceholder: "assets/placeholders/academic-bsc-placeholder.svg",
      imageAlt: "RGUHS Optometry Clinic Lab",
      highlights: [
        "Affiliated with Rajiv Gandhi University of Health Sciences (RGUHS)",
        "1-Year paid clinical internship at Vijayapura & Kalaburagi hospitals",
        "Advanced training in specialty contact lenses & orthoptics",
        "State-of-the-art optometry practical labs & library"
      ]
    }
  ],

  empanelments: [
    { name: "Ayushman Bharat Arogya Karnataka", category: "Government Schemes", code: "AB-ARK" },
    { name: "Arogya Bhagya Yojane", category: "Government Schemes", code: "ABY" },
    { name: "Jyoti Sanjiveeni Scheme", category: "Government Schemes", code: "JSS" },
    { name: "Karnataka Arogya Sanjivini", category: "Government Schemes", code: "KAS" },
    { name: "Rashtriya Bal Swasthya Karyakram (RBSK)", category: "Government Schemes", code: "RBSK" },
    { name: "Yeshasvini Health Insurance", category: "Government Schemes", code: "YHI" },
    { name: "SKDRDP Health Scheme", category: "Government Schemes", code: "SKDRDP" },
    
    { name: "ICICI Lombard General Insurance", category: "Insurance Providers", code: "ICICI" },
    { name: "Star Health and Allied Insurance", category: "Insurance Providers", code: "STAR" },
    { name: "Niva Bupa Health Insurance", category: "Insurance Providers", code: "NIVA" },
    { name: "Aditya Birla Health Insurance", category: "Insurance Providers", code: "ABHI" },
    { name: "Bajaj Allianz General Insurance", category: "Insurance Providers", code: "BAJAJ" },
    { name: "SBI General Insurance", category: "Insurance Providers", code: "SBIGI" },
    { name: "Acko General Insurance", category: "Insurance Providers", code: "ACKO" },
    { name: "Go Digit General Insurance", category: "Insurance Providers", code: "DIGIT" },
    { name: "Manipal Cigna Health Insurance", category: "Insurance Providers", code: "MANIPAL" },
    { name: "Future Generali Health Insurance", category: "Insurance Providers", code: "FUTURE" },
    { name: "Universal Sompo General Insurance", category: "Insurance Providers", code: "SOMPO" },
    { name: "Magma Insurance", category: "Insurance Providers", code: "MAGMA" },
    { name: "Royal Sundaram General Insurance", category: "Insurance Providers", code: "ROYAL" },

    { name: "Vidal Health Insurance TPA", category: "TPAs & Corporate", code: "VIDAL" },
    { name: "Paramount Health TPA", category: "TPAs & Corporate", code: "PARAMOUNT" },
    { name: "Ericson TPA Healthcare", category: "TPAs & Corporate", code: "ERICSON" },
    { name: "Health India TPA Services", category: "TPAs & Corporate", code: "HEALTHINDIA" },
    { name: "FHPL TPA", category: "TPAs & Corporate", code: "FHPL" },
    { name: "Genins India Insurance TPA", category: "TPAs & Corporate", code: "GENINS" },
    { name: "Raksha TPA", category: "TPAs & Corporate", code: "RAKSHA" },
    { name: "Vipul MedCorp TPA", category: "TPAs & Corporate", code: "VIPUL" },
    { name: "KSRTC Employee Scheme", category: "TPAs & Corporate", code: "KSRTC" }
  ],

  gallery: [
    { id: 0, title: "Vijayapura Base Hospital Main Campus", category: "Base Hospital", src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80", caption: "Super-specialty base hospital building in Vijayapura." },
    { id: 1, title: "Laminar Airflow Operation Theatre Suite", category: "Operations", src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80", caption: "HEPA-filtered sterile ophthalmic surgical suite." },
    { id: 2, title: "Free Community Outreach Eye Camp", category: "Outreach Camps", src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80", caption: "Mobile screening unit examining rural demographics." },
    { id: 3, title: "Phacoemulsification Cataract Procedure", category: "Operations", src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80", caption: "Micro-incision phaco cataract surgery under microscope." },
    { id: 4, title: "High-Resolution Optical Coherence Tomography (OCT)", category: "Infrastructure", src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80", caption: "Retinal OCT diagnostics & macula scanner." },
    { id: 5, title: "Rural Vision Center Primary Care Desk", category: "Outreach Camps", src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80", caption: "Optometrist consultation at rural Vision Center." },
    { id: 6, title: "School Children Vision Screening & Glasses", category: "Outreach Camps", src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80", caption: "District-wide school vision initiative." },
    { id: 7, title: "Kalaburagi Base Hospital Facility", category: "Base Hospital", src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80", caption: "Kalaburagi campus serving eastern Karnataka." }
  ],

  news: [
    { id: "news-1", title: "Chairman Dr. P.B. Lingadalli Conferred Karnataka Rajyostava Award 2021", date: "November 2021", category: "Institutional Honors", snippet: "Government of Karnataka recognizes Dr. Prabhugouda Lingadalli's 25 years of continuous community eye care and 50,000+ free cataract surgeries." },
    { id: "news-2", title: "Anugraha Institute of Optometry Kalaburagi Expands RGUHS Degree Intake", date: "August 2025", category: "Academic Expansion", snippet: "Rajiv Gandhi University of Health Sciences approves expanded seat quota for B.Sc Optometry candidates at Kalaburagi campus." },
    { id: "news-3", title: "Milestone: 2.28 Lakh Lifetime Surgeries Achieved Across Base Hospitals", date: "January 2026", category: "Clinical Outreach", snippet: "Combined surgical volume across Vijayapura and Kalaburagi base hospitals crosses 2.28 lakh operations with 99.4% clinical success." }
  ],

  videos: [
    { id: "vid-1", title: "Understanding Phacoemulsification Micro-Incision Cataract Surgery", duration: "4:15", embedId: "cataract-phaco-guide", thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80" },
    { id: "vid-2", title: "MyAlcon Verified Contoura Vision LASIK Procedure Walkthrough", duration: "3:45", embedId: "lasik-contoura-demo", thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" },
    { id: "vid-3", title: "Mobile Outreach Eye Camps: Serving Rural North Karnataka", duration: "5:20", embedId: "outreach-camps-docu", thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" }
  ],

  handouts: [
    { id: "h1", title: "Post-Cataract Surgery Care & Eye Drop Schedule", category: "Patient Recovery", format: "PDF Guide", size: "1.2 MB", desc: "Detailed post-operative eye drop timer, protective shield instructions, and warning signs." },
    { id: "h2", title: "Diabetic Retinopathy Screening & Eye Care Manual", category: "Retina Health", format: "PDF Guide", size: "2.4 MB", desc: "Guidance on managing HbA1c levels, yearly dilated eye exams, and anti-VEGF treatment pathways." },
    { id: "h3", title: "Pediatric Eye Exercises & Amblyopia Patching Guide", category: "Pediatric Care", format: "PDF Manual", size: "1.8 MB", desc: "Home patching schedules and vision therapy exercises for children undergoing squint and lazy eye therapy." }
  ],

  seoRedirects: [
    { from: "/copy-of-vijayapura-campus", to: "/vision-centers/talikoti", status: 301, reason: "Fix canonical mismatch for Talikoti center" },
    { from: "/sindagi", to: "/vision-centers/muddebihal", status: 301, reason: "Fix historical URL cross-contamination; decoupling Sindagi" },
    { from: "/bbagewadi", to: "/vision-centers/b-bagewadi", status: 301, reason: "Improve URL readability" },
    { from: "/newshappenings", to: "/news", status: 301, reason: "Standardize blog & news taxonomy" },
    { from: "/educationandtraining", to: "/academics", status: 301, reason: "Streamline academic silo" },
    { from: "/drmalinipl", to: "/about-us/leadership", status: 301, reason: "Consolidate profile pages" },
    { from: "/drprabhugoudabingadalli", to: "/about-us/leadership", status: 301, reason: "Consolidate profile pages" }
  ]
};

class Store {
  constructor() {
    this.key = "anugraha_hospital_store_v1";
    this.data = this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem(this.key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load store from localStorage", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.data));
      localStorage.setItem('anugraha_last_saved_time', new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error("Failed to save store to localStorage", e);
    }
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.save();
  }

  getBrand() {
    return this.data.brand;
  }

  updateBrand(fields) {
    this.data.brand = { ...this.data.brand, ...fields };
    this.save();
  }

  getStats() {
    return this.data.stats;
  }

  updateStats(fields) {
    this.data.stats = { ...this.data.stats, ...fields };
    this.save();
  }

  getDataGaps() {
    return this.data.dataGaps;
  }

  updateDataGaps(fields) {
    this.data.dataGaps = { ...this.data.dataGaps, ...fields };
    this.save();
  }

  getFacilities() {
    return this.data.facilities;
  }

  getFacilityById(id) {
    return this.data.facilities.find(f => f.id === id);
  }

  updateFacility(id, fields) {
    const idx = this.data.facilities.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.data.facilities[idx] = { ...this.data.facilities[idx], ...fields };
      this.save();
    }
  }

  getEmpanelments() {
    return this.data.empanelments;
  }

  addEmpanelment(item) {
    this.data.empanelments.push(item);
    this.save();
  }

  removeEmpanelment(code) {
    this.data.empanelments = this.data.empanelments.filter(e => e.code !== code);
    this.save();
  }

  getRedirects() {
    return this.data.seoRedirects;
  }

  addRedirect(rule) {
    this.data.seoRedirects.push(rule);
    this.save();
  }

  getServices() {
    return this.data.services || DEFAULT_DATA.services;
  }

  updateServiceImage(id, newPath) {
    if (!this.data.services) this.data.services = [...DEFAULT_DATA.services];
    const s = this.data.services.find(item => item.id === id);
    if (s) {
      s.imagePlaceholder = newPath;
      this.save();
    }
  }

  getAcademics() {
    return this.data.academics || DEFAULT_DATA.academics;
  }

  getAcademicProgramById(id) {
    let lookupId = id;
    if (lookupId === 'bscoptometry') lookupId = 'bsc-optometry';
    return (this.getAcademics()).find(p => p.id === lookupId);
  }

  updateAcademicProgram(id, updatedData) {
    if (!this.data.academics) this.data.academics = [...DEFAULT_DATA.academics];
    const index = this.data.academics.findIndex(p => p.id === id);
    if (index !== -1) {
      this.data.academics[index] = { ...this.data.academics[index], ...updatedData };
      this.save();
    }
  }

  getGallery() {
    return this.data.gallery || DEFAULT_DATA.gallery;
  }

  addGalleryItem(item) {
    if (!this.data.gallery) this.data.gallery = [...DEFAULT_DATA.gallery];
    const newId = Date.now();
    this.data.gallery.unshift({ id: newId, ...item });
    this.save();
    return newId;
  }

  removeGalleryItem(id) {
    if (!this.data.gallery) return;
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    this.save();
  }

  getNews() {
    return this.data.news || DEFAULT_DATA.news;
  }

  addNewsItem(item) {
    if (!this.data.news) this.data.news = [];
    const newId = Date.now();
    this.data.news.unshift({ id: newId, date: new Date().toLocaleDateString('en-IN'), ...item });
    this.save();
    return newId;
  }

  removeNewsItem(id) {
    if (!this.data.news) return;
    this.data.news = this.data.news.filter(n => n.id !== id);
    this.save();
  }

  getVideos() {
    return this.data.videos || DEFAULT_DATA.videos;
  }

  addVideoItem(item) {
    if (!this.data.videos) this.data.videos = [];
    const newId = Date.now();
    this.data.videos.unshift({ id: newId, ...item });
    this.save();
    return newId;
  }

  removeVideoItem(id) {
    if (!this.data.videos) return;
    this.data.videos = this.data.videos.filter(v => v.id !== id);
    this.save();
  }

  getHandouts() {
    return this.data.handouts || DEFAULT_DATA.handouts;
  }

  addHandoutItem(item) {
    if (!this.data.handouts) this.data.handouts = [];
    const newId = Date.now();
    this.data.handouts.unshift({ id: newId, ...item });
    this.save();
    return newId;
  }

  removeHandoutItem(id) {
    if (!this.data.handouts) return;
    this.data.handouts = this.data.handouts.filter(h => h.id !== id);
    this.save();
  }

  removeRedirect(from) {
    this.data.seoRedirects = this.data.seoRedirects.filter(r => r.from !== from);
    this.save();
  }

  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.brand && parsed.stats) {
        this.data = parsed;
        this.save();
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON format", e);
    }
    return false;
  }
}

window.appStore = new Store();
