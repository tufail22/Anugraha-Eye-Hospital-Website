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
    logo: "assets/official_logo.jpg",
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

  homepage: {
    heroEyebrow: "Authentic. Affectionate. Affordable. Eye Care",
    heroHeading: "Restoring Sight, Enriching Lives Across North Karnataka",
    heroDescription: "Founded in 2001 by Dr. Prabhugouda B. Lingadalli, Anugraha Eye Hospital delivers advanced, super-specialty ophthalmic care across tertiary base hospitals in Vijayapura & Kalaburagi and a network of 8 rural Vision Centers.",
    primaryCta: { text: "Book an Appointment", link: "#/contact" },
    secondaryCta: { text: "Explore Specialties", link: "#/services" },
    heroImage: "assets/services/cataract_surgery.jpg",
    trustStats: {
      surgeries: "2,28,951+",
      camps: "2,715",
      freeCataracts: "50,000+",
      rating: "4.8 ★"
    },
    sections: {
      whyAnugraha: true,
      services: true,
      featuredDoctors: true,
      hospitals: true,
      visionCenters: true,
      technology: true,
      communityImpact: true,
      academics: true,
      insurance: true,
      faqs: true,
      finalCta: true
    }
  },

  about: {
    story: "Founded in 2001 in Vijayapura by Dr. Prabhugouda B. Lingadalli, Anugraha Eye Hospital has evolved into North Karnataka's preeminent ophthalmic institution. Guided by the core tenets of Authentic, Affectionate, and Affordable eye care, the hospital has restored sight to over 2.28 lakh patients and screened millions across rural communities.",
    history: "In 2001, Dr. Lingadalli established Anugraha Eye Hospital with a vision to eliminate preventable blindness in North Karnataka. Beginning as a specialized eye clinic in Vijayapura, the institution pioneered mobile outreach eye camps, reaching remote villages with free surgical care. Today, the hospital encompasses 2 super-specialty tertiary base hospitals in Vijayapura and Kalaburagi, 8 rural Vision Centers, and RGUHS-affiliated optometry and DNB residency academic programs.",
    vision: "Sight for all through Authentic, Affectionate and Affordable treatment and eradication of blindness through quality Eye care services.",
    mission: "Deliver quality, accessible eye care to all; excel in specialized eye care services; become a preferred destination for medical, paramedical and non-medical professionals; deploy advanced technology; promote preventive eye care and eye donation.",
    coreValues: [
      { title: "Authentic Clinical Integrity", desc: "Evidence-based, ethical ophthalmic treatments without commercial compromises." },
      { title: "Affectionate Compassion", desc: "Treating every patient with warmth, empathy, and personalized clinical attention." },
      { title: "Affordable Accessibility", desc: "High-volume, subsidized and free surgical programs ensuring no patient is denied sight." },
      { title: "Technological Excellence", desc: "State-of-the-art micro-incision phaco, Contoura Vision LASIK, and digital OCT diagnostics." }
    ],
    communityImpact: "Over 25 years, Anugraha has conducted 2,715+ free outreach camps, performed 50,000+ free cataract surgeries for underprivileged patients, and screened 10,000+ school children across Vijayapura, Kalaburagi, and neighboring districts.",
    milestones: [
      { year: "2001", title: "Foundation in Vijayapura", desc: "Inception of Anugraha Eye Hospital by Dr. Prabhugouda B. Lingadalli." },
      { year: "2005", title: "Mobile Rural Outreach Camps", desc: "Initiation of free district-wide eye screening camps." },
      { year: "2010", title: "Vision Centers Network", desc: "Establishment of the first rural Vision Centers in Talikoti and Muddebihal." },
      { year: "2015", title: "Super-Specialty Expansion", desc: "Launch of dedicated Vitreo-Retina, Glaucoma, and Pediatric clinics." },
      { year: "2020", title: "Kalaburagi Base Hospital", desc: "Inauguration of the Kalaburagi Tertiary Base Hospital & Institute of Optometry." },
      { year: "2021", title: "Karnataka Rajyostava Award", desc: "State honor conferred upon Chairman Dr. Lingadalli for rural blindness eradication." },
      { year: "2026", title: "2.28 Lakh Surgeries Milestone", desc: "Celebrated 25 years of sight restoration with 2,28,951+ successful surgeries." }
    ]
  },

  stats: {
    lifetimeSurgeries: "2,28,951+",
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
      designation: "Chairman & Senior Chief Ophthalmic Surgeon",
      specialization: "Cataract (Phaco), Refractive Surgery (LASIK) & Anterior Segment",
      degrees: "MBBS, MS, DNB, FAEH, MCHS",
      experience: "25+ Years Experience",
      hospital: "Vijayapura & Kalaburagi Campuses",
      location: "Vijayapura / Kalaburagi",
      areasOfExpertise: "Micro-incision Phacoemulsification, Premium IOL Implantation, Contoura Vision LASIK, Community Ophthalmology",
      languages: "Kannada, English, Hindi, Marathi",
      photo: "dr_lingadalli_portrait_1786794914757.jpg",
      displayOrder: 1,
      published: true,
      seoTitle: "Dr. Prabhugouda B. Lingadalli | Chairman & Founder | Anugraha Eye Hospital",
      seoDesc: "Profile and clinical leadership of Dr. Prabhugouda B. Lingadalli, Chairman & Founder of Anugraha Eye Hospital with 25+ years experience.",
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
      designation: "Medical Director & Senior Ophthalmic Consultant",
      specialization: "General Ophthalmology, Glaucoma & Medical Retina",
      degrees: "MBBS, DO, FGO",
      experience: "20+ Years Experience",
      hospital: "Vijayapura Campus",
      location: "Vijayapura",
      areasOfExpertise: "Comprehensive Eye Care, Glaucoma Diagnostics, Medical Retina, Ophthalmic Administration",
      languages: "Kannada, English, Hindi",
      photo: "dr_malini_portrait_1786794961083.jpg",
      displayOrder: 2,
      published: true,
      seoTitle: "Dr. Malini P L | Medical Director | Anugraha Eye Hospital",
      seoDesc: "Profile and medical leadership of Dr. Malini P L, Medical Director of Anugraha Eye Hospital with two decades of clinical leadership.",
      bio: "Committed, compassionate leader with nearly two decades driving organizational development. Reinforces the hospital's 25-year history and its upgrade to super-specialty status meeting national standards. Highlights the hospital's strategic city-center location, renowned consultants, advanced technology, and trained, compassionate staff.",
      awards: [
        { title: "Distinguished Medical Service Citation", year: "2019", organization: "Karnataka Ophthalmic Society" },
        { title: "Exemplary Women Healthcare Leader Award", year: "2017", organization: "District Medical Forum" }
      ]
    },
    {
      id: "dr-poornima-patil",
      name: "Dr. Poornima Patil",
      title: "Comprehensive Ophthalmologist & Phaco Surgeon",
      designation: "Comprehensive Ophthalmologist & Phaco Surgeon",
      specialization: "Cataract Services & Comprehensive Ophthalmology",
      degrees: "M.B.B.S, D.O, FGO",
      experience: "12+ Years Experience",
      hospital: "Vijayapura Base Hospital",
      location: "Vijayapura",
      areasOfExpertise: "Micro-incision Cataract Surgery, Phacoemulsification, Premium Monofocal/Multifocal IOLs",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_rashmi_biradar.jpg",
      displayOrder: 3,
      published: true,
      bio: "Senior cataract and comprehensive ophthalmologist specializing in sutureless micro-incision phacoemulsification, intraocular lens implantation, and anterior segment diagnostics."
    },
    {
      id: "dr-arunkumar-desai",
      name: "Dr. Arunkumar B. Desai",
      title: "Comprehensive Ophthalmologist & Phaco Surgeon",
      designation: "Comprehensive Ophthalmologist & Phaco Surgeon",
      specialization: "Cataract Services & Anterior Segment Surgery",
      degrees: "M.B.B.S, M.S, FICO",
      experience: "14+ Years Experience",
      hospital: "Vijayapura Base Hospital",
      location: "Vijayapura",
      areasOfExpertise: "Advanced Phacoemulsification, Toric & Multifocal IOL Implants, Anterior Segment Trauma",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_anuj_vora.jpg",
      displayOrder: 4,
      published: true,
      bio: "Fellow of the International Council of Ophthalmology (FICO) with deep clinical expertise in complex cataract cases, premium lens power calculations, and anterior segment reconstruction."
    },
    {
      id: "dr-santoshgouda-patil",
      name: "Dr. Santoshgouda. B. Patil",
      title: "Head of Phacorefractive",
      designation: "Head of Phacorefractive",
      specialization: "Phaco and Refractive & Paediatric Squint",
      degrees: "MBBS, DO, FAEH",
      experience: "15+ Years Experience",
      hospital: "Vijayapura & Kalaburagi Campuses",
      location: "Vijayapura / Kalaburagi",
      areasOfExpertise: "Phacorefractive Surgery, Presbyopia Correction, Clear Lens Extraction, Pediatric Strabismus",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_prashant.jpg",
      displayOrder: 5,
      published: true,
      bio: "Head of Phacorefractive Department with extensive fellowship training from Aravind Eye Hospital (FAEH). Renowned for advanced presbyopia treatments, refractive lens exchange, and pediatric eye alignment."
    },
    {
      id: "dr-anand-gannur",
      name: "Dr. Anand G. Gannur",
      title: "Head of Vitreo Retina Department",
      designation: "Head of Vitreo Retina Department",
      specialization: "Vitreo Retinal Surgery & Medical Retina",
      degrees: "MBBS, MS, FIPS, FVRS",
      experience: "16+ Years Experience",
      hospital: "Vijayapura Base Hospital",
      location: "Vijayapura",
      areasOfExpertise: "Micro-incision Vitrectomy Surgery (MIVS), Retinal Detachment Repair, Macular Hole Surgery, Diabetic Retinopathy",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_anand_baligar.jpg",
      displayOrder: 6,
      published: true,
      bio: "Fellow in Vitreoretinal Surgery (FVRS) leading complex surgical vitrectomies, sutureless membrane peeling, retinal detachment repair, and intraocular anti-VEGF therapy."
    },
    {
      id: "dr-rohini-patil",
      name: "Dr. Rohini. S. Patil",
      title: "Oculoplasty, Paediatric & Phaco Surgeon",
      designation: "Oculoplasty, Paediatric & Phaco Surgeon",
      specialization: "Oculoplasty Surgery, Paediatric Squint & Ocular Trauma",
      degrees: "MBBS, DO, FGO",
      experience: "12+ Years Experience",
      hospital: "Vijayapura Base Hospital",
      location: "Vijayapura",
      areasOfExpertise: "Ptosis Repair, Blepharoplasty, Lacrimal DCR, Pediatric Strabismus, Emergency Ocular Trauma",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_shridevi.jpg",
      displayOrder: 7,
      published: true,
      bio: "Specialist in ophthalmic plastic surgery, pediatric strabismus realignment, lacrimal drainage DCR, aesthetic blepharoplasty, and 24/7 emergency ocular trauma repair."
    },
    {
      id: "dr-cauvery-shethe",
      name: "Dr. Cauvery Shethe",
      title: "Glaucoma Consultant & Phaco Surgeon",
      designation: "Glaucoma Consultant & Phaco Surgeon",
      specialization: "Glaucoma Diagnostics & Microsurgery",
      degrees: "M.B.B.S, D.O, FGO",
      experience: "10+ Years Experience",
      hospital: "Vijayapura & Kalaburagi Campuses",
      location: "Vijayapura / Kalaburagi",
      areasOfExpertise: "Automated Perimetry, Cirrus OCT RNFL Analysis, Laser SLT, Trabeculectomy Filtration Surgery",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_soundarya_patil.jpg",
      displayOrder: 8,
      published: true,
      bio: "Glaucoma consultant dedicated to early IOP detection, computerized visual fields, optic nerve OCT imaging, topical therapy optimization, and advanced filtration surgery."
    },
    {
      id: "dr-madhu-gannur",
      name: "Dr. Madhu A. Gannur",
      title: "Cornea, Refractive & Phaco Surgeon",
      designation: "Cornea, Refractive & Phaco Surgeon",
      specialization: "Cornea, LASIK & Eye Bank",
      degrees: "MBBS, MS, FGO",
      experience: "11+ Years Experience",
      hospital: "Vijayapura Base Hospital",
      location: "Vijayapura",
      areasOfExpertise: "Corneal Transplantation, Eye Banking & Tissue Harvesting, C3R Cross-Linking, Blade-Free LASIK",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_sunanda.jpg",
      displayOrder: 9,
      published: true,
      bio: "Cornea and Refractive specialist overseeing donor cornea harvesting, pterygium autografting, corneal cross-linking (C3R), and Contoura Vision laser refractive treatments."
    }
  ],

  administration: [
    {
      id: "vishwanath-patil",
      name: "Vishwanath N Patil",
      role: "Administrator, Finance & Accounts",
      position: "Administrator, Finance & Accounts",
      department: "Finance & Accounts",
      qualifications: "Civil Engineering (BLDEA VTU Vijayapur), Admin Training (Aravind Eye Hospital Madurai)",
      tenure: "10 Years",
      displayOrder: 1,
      published: true,
      desc: "Manages financial planning, budgeting, compliance, tax planning, audits, and operational excellence. Provides critical financial insights and mentors the finance team, ensuring long-term institutional stability."
    },
    {
      id: "veena-patil",
      name: "Veena Patil",
      role: "Administrator, HR & Administration",
      position: "Administrator, HR & Administration",
      department: "Human Resources & Quality",
      qualifications: "MBA (HR + Finance), Hospital Admin Certification",
      tenure: "Key Leader",
      displayOrder: 2,
      published: true,
      desc: "NABH Coordinator leading accreditation, quality documentation, and internal audits. Serves as single point of contact for NBEMS medical training program coordination while fostering employee engagement."
    },
    {
      id: "anand-patil",
      name: "Anand Patil",
      role: "Administrator, Business Development Cell",
      position: "Administrator, Business Development Cell",
      department: "Business Development & Opticals",
      qualifications: "BA Graduate",
      tenure: "25+ Years (Since 2001)",
      displayOrder: 3,
      published: true,
      desc: "Foundational team member since 2001 inception. Drives the Optical and Pharmacy divisions, revenue growth, inventory coordination, service enhancement, and overall patient satisfaction."
    },
    {
      id: "poornima-hunashyal",
      name: "Poornima Hunashyal",
      role: "Administrator, Support Services",
      position: "Administrator, Support Services",
      department: "IT, Equipment & Support Services",
      qualifications: "Diploma (Electronics & Comm), Masters in Network Admin, ITIL/CCNA Certified",
      tenure: "10 Years (Ex-Wipro, Accenture, Vodafone)",
      displayOrder: 4,
      published: true,
      desc: "Manages instrument and equipment maintenance (AMCs/CMCs), social media architecture, digital interventions, network infrastructure, and asset management."
    },
    {
      id: "dattatreyya-hosamath",
      name: "Dattatreyya Hosamath",
      role: "Administrator, Community Outreach",
      position: "Administrator, Community Outreach",
      department: "Community Outreach & Government Schemes",
      qualifications: "BA, Diploma in Optometry (KIMS Hubli), Outreach Marketing Cert (Aravind Eye Hospital)",
      tenure: "18 Years",
      displayOrder: 5,
      published: true,
      desc: "Coordinates district-wide MOU eye camps, established the Eye Donation Centre, secured approvals for the Anugraha Institute of Paramedical Sciences and Kalaburagi Optometry institute, and elevated ABY & Jyoti Sanjiveeni health schemes."
    },
    {
      id: "sunil-kodaganur",
      name: "Sunil Kodaganur",
      role: "Administrator, Floor Management & Transport",
      position: "Administrator, Floor Management & Transport",
      department: "Operations & Transport Logistics",
      qualifications: "M.Com (BLDE University Vijayapur), Ex-Tata Motors Financial Coordinator",
      tenure: "Operations Specialist",
      displayOrder: 6,
      published: true,
      desc: "Oversees workflow productivity, staffing gaps, driver schedules, vehicle routes, fuel usage, and transport safety compliance across the hospital's transport network."
    }
  ],

  facilities: [
    {
      id: "vijayapura",
      type: "base",
      name: "Vijayapura Campus (Main)",
      description: "Premier super-specialty tertiary eye hospital featuring laminar airflow modular OTs, laser refractive suite, and diagnostic imaging.",
      address: "Navabhag Main Road, Behind Central Bus Stand, Vijayapura – 586101",
      phone: "08352-220646",
      email: "vijayapura@anugrahaeyehospital.com",
      hours: "8:00 AM – 9:00 PM daily",
      emergencyInfo: "24x7 Ophthalmic Emergency & Trauma Desk available.",
      googleMapsUrl: "https://maps.google.com/?q=Anugraha+Eye+Hospital+Vijayapura",
      heroImage: "assets/services/cataract_surgery.jpg",
      galleryImages: ["assets/services/cataract_surgery.jpg", "assets/services/lasik_contoura.jpg"],
      facilitiesList: ["Modular HEPA OTs", "Contoura Vision LASIK Suite", "Retina Laser Clinic", "In-House Opticals & Pharmacy", "Emergency Ophthalmic Trauma"],
      servicesList: ["Cataract & Phaco", "LASIK & Contoura Vision", "Glaucoma", "Retina", "Pediatric Ophthalmology", "Oculoplasty", "Cornea Clinic"],
      doctorsList: ["Dr. Prabhugouda B. Lingadalli", "Dr. Malini P L"],
      published: true,
      displayOrder: 1,
      badge: "Main Base Hospital"
    },
    {
      id: "kalaburagi",
      type: "base",
      name: "Kalaburagi Campus",
      description: "Tertiary eye care base hospital offering specialized clinical care and the RGUHS-affiliated Anugraha Institute of Optometry.",
      address: "Ring Road Junction, Opposite District Court Complex, Kalaburagi, Karnataka – 585105",
      phone: "08472-245646",
      email: "kalaburagi@anugrahaeyehospital.com",
      hours: "8:00 AM – 8:00 PM daily",
      emergencyInfo: "24x7 Emergency Ophthalmic Care Service.",
      googleMapsUrl: "https://maps.google.com/?q=Anugraha+Eye+Hospital+Kalaburagi",
      heroImage: "assets/services/glaucoma_management.jpg",
      galleryImages: ["assets/services/glaucoma_management.jpg", "assets/services/retina_care.jpg"],
      facilitiesList: ["Modular Operating Theatres", "Anugraha Institute of Optometry", "Medical Retina Suite", "In-House Pharmacy & Optical Dispensing"],
      servicesList: ["Cataract & Phaco", "Glaucoma Clinic", "Medical Retina", "Cornea Clinic", "Optometry & Optical"],
      doctorsList: ["Dr. Prabhugouda B. Lingadalli"],
      published: true,
      displayOrder: 2,
      badge: "Tertiary Base Hospital"
    },
    {
      id: "talikoti",
      type: "vision-center",
      name: "Talikoti Vision Center",
      town: "Talikoti",
      address: "Main Road, Talikoti Town, Vijayapura District, Karnataka – 586214",
      phone: "+91 74839 00963",
      whatsappPhone: "+91 94481 20646",
      description: "Primary vision screening, automated refraction, prescription spectacles, contact lens fitting, ophthalmic pharmacy, and emergency routing to Vijayapura Base Hospital.",
      hours: "Mon–Sat 9am–8pm, Sun 9am–3pm (Free Sunday OPD)",
      doctorVisits: "Sundays (Free Specialist OPD)",
      googleMapsUrl: "https://maps.google.com/?q=Talikoti+Vision+Center",
      mainImage: "assets/services/optical_services.jpg",
      facilitiesList: ["Primary Vision Examination & Refraction", "Prescription Glasses & Custom Frames", "Contact Lens Fitting & Care", "Essential Eye Medicines & Drops", "Direct Referral to Base Hospital"],
      displayOrder: 1,
      published: true
    },
    {
      id: "muddebihal",
      type: "vision-center",
      name: "Muddebihal Vision Center",
      town: "Muddebihal",
      address: "Laxmi Eyecare Centre, Main Bus Stand Road, Muddebihal, Vijayapura District, Karnataka – 586212",
      phone: "93805 44008",
      whatsappPhone: "+91 94481 20646",
      description: "Primary vision screening, computer visual acuity testing, prescription spectacles, contact lens clinic, and local pharmacy.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Saturdays",
      googleMapsUrl: "https://maps.google.com/?q=Muddebihal+Vision+Center",
      mainImage: "assets/services/optical_services.jpg",
      facilitiesList: ["Slit-Lamp Microscopy & Glaucoma Check", "Prescription Eyewear & Opticals", "Pediatric Vision Screening", "Post-Op Cataract Follow-up"],
      displayOrder: 2,
      published: true
    },
    {
      id: "sindagi",
      type: "vision-center",
      name: "Sindagi Vision Center",
      town: "Sindagi",
      address: "Main Market Road, Sindagi Town, Vijayapura District, Karnataka – 586128",
      phone: "08356-222446",
      whatsappPhone: "+91 94481 20646",
      description: "Comprehensive primary eye care clinic, digital vision testing, custom spectacle fitting, and direct referral triage to base hospital.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Wednesdays",
      googleMapsUrl: "https://maps.google.com/?q=Sindagi+Vision+Center",
      mainImage: "assets/services/optical_services.jpg",
      facilitiesList: ["Primary Vision Triage & Referral", "Prescription Spectacles", "Eye Health Guidance", "Emergency Base Routing"],
      displayOrder: 3,
      published: true
    },
    {
      id: "indi",
      type: "vision-center",
      name: "Indi Vision Center",
      town: "Indi",
      address: "Station Road, Indi Town, Vijayapura District, Karnataka – 586209",
      phone: "63630 84440",
      whatsappPhone: "+91 94481 20646",
      description: "Primary care, prescription spectacles, contact lenses, pharmacy, 24x7 emergency triage.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Tuesdays",
      googleMapsUrl: "https://maps.google.com/?q=Indi+Vision+Center",
      mainImage: "assets/services/optical_services.jpg",
      facilitiesList: ["Vision Assessment & Computer Refraction", "Prescription Spectacles Clinic", "Diabetic Retinopathy Referral", "Pharmacy Services"],
      displayOrder: 4,
      published: true
    },
    {
      id: "b-bagewadi",
      type: "vision-center",
      name: "B.Bagewadi Vision Center",
      town: "B.Bagewadi",
      address: "Town Main Road, B.Bagewadi, Vijayapura District, Karnataka – 586203",
      phone: "63635 16504",
      whatsappPhone: "+91 94481 20646",
      description: "Primary care, contact lens, spectacles, pharmacy, 24x7 emergency triage.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Thursdays",
      googleMapsUrl: "https://maps.google.com/?q=BBagewadi+Vision+Center",
      mainImage: "assets/services/optical_services.jpg",
      facilitiesList: ["Computerized Vision Testing", "High-Quality Optical Frames", "Contact Lenses & Care Solutions", "Primary Glaucoma Diagnostics"],
      displayOrder: 5,
      published: true
    },
    {
      id: "chadachan",
      type: "vision-center",
      name: "Chadachan Vision Center",
      town: "Chadachan",
      address: "Main Market Road, Chadachan Town, Vijayapura District, Karnataka – 586205",
      phone: "90088 88951",
      whatsappPhone: "+91 94481 20646",
      description: "Primary care, contact lens, spectacles, pharmacy, emergency routing.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Fridays",
      googleMapsUrl: "https://maps.google.com/?q=Chadachan+Vision+Center",
      mainImage: "assets/services/optical_services.jpg",
      facilitiesList: ["Eye Refraction & Spectacle Dispensing", "Dry Eye & Allergy Treatment", "Outreach Triage"],
      displayOrder: 6,
      published: true
    },
    {
      id: "nalatwad",
      type: "vision-center",
      name: "Nalatwad Vision Center",
      town: "Nalatwad",
      address: "Nalatwad Town, Vijayapura District, Karnataka – 586212",
      phone: "93805 44008",
      whatsappPhone: "+91 94481 20646",
      description: "Primary care, contact lens, spectacles, pharmacy, 24x7 emergency.",
      hours: "Mon–Sat 9am–8pm, Sun 9am–3pm",
      doctorVisits: "Sundays (Free Sunday OPD)",
      googleMapsUrl: "https://maps.google.com/?q=Nalatwad+Vision+Center",
      mainImage: "assets/services/optical_services.jpg",
      facilitiesList: ["Comprehensive Vision Care", "Free Sunday Doctor Screening", "Prescription Eyewear", "Emergency Base Routing"],
      displayOrder: 7,
      published: true
    },
    {
      id: "tikota",
      type: "vision-center",
      name: "Tikota Vision Center",
      town: "Tikota",
      address: "Tikota Town, Vijayapura District, Karnataka – 586130",
      phone: "70221 53988",
      whatsappPhone: "+91 94481 20646",
      description: "Primary care, contact lens, spectacles, pharmacy, 24x7 emergency.",
      hours: "Mon–Sat 9am–5pm, Sun closed",
      doctorVisits: "Mondays",
      googleMapsUrl: "https://maps.google.com/?q=Tikota+Vision+Center",
      mainImage: "assets/services/optical_services.jpg",
      facilitiesList: ["Vision Screening", "Spectacle Fitting", "Ophthalmic Medications", "Cataract Triage"],
      displayOrder: 8,
      published: true
    }
  ],

  services: [
    {
      id: "cataract",
      slug: "cataract",
      title: "Cataract Services",
      subtitle: "Micro-Incision Phacoemulsification & Premium IOL Implantation",
      category: "Surgical Ophthalmology",
      shortDesc: "Cataract surgery is the only way to remove cataracts and restore your eye vision. During cataract surgery an ophthalmologist removes your clouded natural lens and replaces it with an intraocular lens (IOL). An IOL is an artificial lens that permanently stays in your eye.",
      fullDesc: "Cataract surgery is the only way to remove cataracts and restore your eye vision. During cataract surgery an ophthalmologist removes your clouded natural lens and replaces it with an intraocular lens (IOL). An IOL is an artificial lens that permanently stays in your eye, providing lifelong crisp and natural vision.",
      desc: "Cataract surgery is the only way to remove cataracts and restore your eye vision. During cataract surgery an ophthalmologist removes your clouded natural lens and replaces it with an intraocular lens (IOL). An IOL is an artificial lens that permanently stays in your eye.",
      imagePlaceholder: "assets/services/cataract_surgery.jpg",
      heroImage: "assets/services/cataract_surgery.jpg",
      serviceImage: "assets/services/cataract_surgery.jpg",
      relatedDoctorIds: ["dr-poornima-patil", "dr-arunkumar-desai", "dr-lingadalli"],
      relatedDoctors: ["Dr. Poornima Patil", "Dr. Arunkumar B. Desai", "Dr. Prabhugouda B. Lingadalli"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      clinicalDetails: {
        overview: "Cataract surgery is the only definitive clinical method to eliminate lens opacity and restore crisp vision. The clouded natural lens is gently dissolved using advanced ultrasonic micro-vibrations and replaced with a biocompatible foldable intraocular lens (IOL) that remains permanently in place.",
        conditions: [
          "Age-related nuclear, cortical, and subcapsular cataracts",
          "Congenital and pediatric cataracts requiring micro-aspiration",
          "Traumatic cataracts resulting from blunt or penetrating eye injury",
          "Secondary cataracts induced by diabetes, uveitis, or long-term steroid therapy"
        ],
        symptoms: [
          "Progressive clouding, blurring, or dimming of vision",
          "Difficulty driving at night due to severe glare and halos around headlights",
          "Colors appearing faded, washed out, or yellowish",
          "Frequent changes in eyeglass or contact lens prescription",
          "Double vision or ghost images in a single eye"
        ],
        diagnosis: [
          "Dilated Slit-Lamp Biomicroscopy for cataract grading and nuclear density mapping",
          "High-precision Optical Biometry (IOLMaster 700) for exact IOL power calculation",
          "Specular Microscopy to evaluate corneal endothelial cell count and health",
          "Non-Contact Tonometry (NCT) to record baseline intraocular pressure",
          "High-Resolution Macular OCT to verify retinal health prior to surgery"
        ],
        treatment: [
          "Blade-free micro-incision phacoemulsification (MIPS) through sub-2.2mm ports",
          "Custom Monofocal, Multifocal, Trifocal, and Toric Intraocular Lens Implantation",
          "Sutureless, stitchless self-sealing clear corneal architectural incisions"
        ],
        procedure: [
          "1. Topical anesthetic eye drops applied — zero painful needle injections.",
          "2. Sub-2.2mm micro-incision created at the clear corneal margin.",
          "3. Ultrasonic micro-probe gently breaks down and aspirates the opacified natural lens.",
          "4. Foldable custom intraocular lens (IOL) is injected into the natural capsular bag.",
          "5. Incision self-seals with water-tight closure without requiring stitches."
        ],
        benefits: [
          "Rapid visual recovery with functional clarity within 24 to 48 hours",
          "Permanent freedom from thick glasses using advanced multifocal/toric IOLs",
          "Painless day-care procedure taking only 10-15 minutes per eye",
          "Proven track record of over 50,000 free and subsidized cataract procedures across North Karnataka"
        ],
        preparation: [
          "Pre-operative biometry and customized intraocular lens selection",
          "Discontinue contact lenses 3 to 5 days prior to biometric mapping",
          "Instill prescribed prophylactic antibiotic eye drops 1 day prior",
          "Arrange for an accompanying family member for same-day discharge"
        ],
        recovery: [
          "Same-day discharge with protective eye shield after 1-2 hours of recovery",
          "Avoid rubbing eyes, swimming, or heavy lifting for 2 weeks",
          "Instill prescribed anti-inflammatory drops as scheduled",
          "Routine follow-up clinical reviews scheduled on Day 1, Week 1, and Month 1"
        ],
        whenToConsult: [
          "When cloudy vision begins interfering with reading, driving, or daily work",
          "When oncoming headlights cause blinding glare during evening driving",
          "When updating your spectacle prescription no longer improves visual clarity"
        ]
      },
      faqs: [
        { q: "Is cataract surgery painful?", a: "No. Advanced phacoemulsification uses topical anesthetic eye drops, ensuring a completely painless experience without needle injections." },
        { q: "How long does an intraocular lens (IOL) last?", a: "The artificial intraocular lens is permanent and biocompatible; it never degrades or requires replacement, lasting a lifetime." },
        { q: "Can both eyes be operated on the same day?", a: "Typically, surgeries are scheduled a few days to a week apart to allow the first eye to settle comfortably." }
      ],
      displayOrder: 1,
      published: true,
      seoTitle: "Cataract Services & Phacoemulsification | Anugraha Eye Hospital",
      seoDesc: "Advanced micro-incision phacoemulsification cataract surgery with premium Monofocal, Multifocal, and Toric IOL implants in Vijayapura and Kalaburagi."
    },
    {
      id: "phaco-refractive",
      slug: "phaco-refractive",
      title: "Phaco and Refractive",
      subtitle: "Advanced Presbyopia Correction & Refractive Lens Surgery",
      category: "Refractive & Phaco Surgery",
      shortDesc: "Photorefractive surgery is generally used to treat cases of presbyopia, an age-related pathology defined by the decline in accommodation of the lens. Refractive surgery can correct refractive errors like nearsightedness, farsightedness, astigmatism and presbyopia. Some of these surgeries reduce the cornea. Others implant a lens in your eye. Either way, the goal is the same. These surgeries focus light correctly on the retina so you can see more clearly.",
      fullDesc: "Photorefractive surgery is generally used to treat cases of presbyopia, an age-related pathology defined by the decline in accommodation of the lens. Refractive surgery can correct refractive errors like nearsightedness, farsightedness, astigmatism and presbyopia. Some of these surgeries reduce the cornea. Others implant a lens in your eye. Either way, the goal is the same. These surgeries focus light correctly on the retina so you can see more clearly.",
      desc: "Photorefractive surgery is generally used to treat cases of presbyopia, an age-related pathology defined by the decline in accommodation of the lens. Refractive surgery can correct refractive errors like nearsightedness, farsightedness, astigmatism and presbyopia. Some of these surgeries reduce the cornea. Others implant a lens in your eye. Either way, the goal is the same. These surgeries focus light correctly on the retina so you can see more clearly.",
      imagePlaceholder: "assets/services/lasik_contoura.jpg",
      heroImage: "assets/services/lasik_contoura.jpg",
      serviceImage: "assets/services/lasik_contoura.jpg",
      relatedDoctorIds: ["dr-santoshgouda-patil"],
      relatedDoctors: ["Dr. Santoshgouda. B. Patil"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      clinicalDetails: {
        overview: "Refractive phacoemulsification and photorefractive surgery provide permanent solutions for presbyopia, myopia, hyperopia, and astigmatism. By reshaping the corneal surface or implanting multifocal/EDOF lenses, light rays are precisely focused onto the retina, restoring sharp near, intermediate, and distance vision.",
        conditions: [
          "Presbyopia (age-related loss of near focusing accommodation)",
          "Myopia (nearsightedness) and Hyperopia (farsightedness)",
          "Corneal and lenticular astigmatism",
          "High refractive errors unsuitable for standard surface laser ablation"
        ],
        symptoms: [
          "Difficulty reading fine print or using mobile screens without reading glasses",
          "Eye fatigue, strain, and brow-ache after close-up computer work",
          "Blurred distance vision accompanied by night-time glare",
          "Inconvenience of juggling multiple pairs of reading and distance glasses"
        ],
        diagnosis: [
          "Corneal Topography & Wavefront Aberrometry (Pentacam HR Mapping)",
          "Central and peripheral corneal pachymetry",
          "Manifest and Cycloplegic Subjective Refraction",
          "High-Precision Optical Biometry for ICL/IOL sizing"
        ],
        treatment: [
          "Refractive Lens Exchange (RLE) with Multifocal/Extended Depth of Focus (EDOF) IOLs",
          "Implantable Collamer Lens (ICL / Phakic IOL) for high refractive powers",
          "Customized corneal surface ablation and photorefractive correction"
        ],
        procedure: [
          "1. Custom optical mapping creates a high-precision wavefront ablation profile.",
          "2. Numbing drops ensure zero discomfort during treatment.",
          "3. Micro-incision phaco or laser delivery reshapes the optical pathway.",
          "4. Custom IOL or ICL positioned in the optical axis.",
          "5. Visual focus recalibrated for clear multi-distance sight."
        ],
        benefits: [
          "Permanent freedom from bifocal, progressive, or reading spectacles",
          "High-definition contrast sensitivity under varied lighting conditions",
          "Quick, painless outpatient procedure with rapid stabilization",
          "Long-term visual stability for active professional lifestyles"
        ],
        preparation: [
          "Refrain from wearing soft contact lenses 1 week prior to consultation",
          "Undergo thorough dilated retinal examination",
          "Review medication history and lifestyle visual requirements"
        ],
        recovery: [
          "Rapid visual adaptation within 24 to 48 hours",
          "Avoid rubbing the eyes or swimming for 2 weeks",
          "Follow-up examinations on Day 1, Month 1, and Month 3"
        ],
        whenToConsult: [
          "When arm-length reading becomes difficult due to presbyopia",
          "When glasses or contact lenses cause chronic dry eyes and discomfort",
          "When seeking active, spectacle-free lifestyle solutions"
        ]
      },
      faqs: [
        { q: "What is the difference between phaco and standard refractive surgery?", a: "Phaco refractive surgery replaces the natural aging lens with a customized multi-focal lens, while laser refractive surgery reshapes the outer corneal surface." },
        { q: "Can presbyopia return after phaco refractive surgery?", a: "No. Because the natural lens is replaced with a permanent multi-focal IOL, presbyopia cannot recur." }
      ],
      displayOrder: 2,
      published: true,
      seoTitle: "Phaco and Refractive Surgery | Anugraha Eye Hospital",
      seoDesc: "Specialized photorefractive and phaco surgery correcting presbyopia, myopia, and astigmatism at Anugraha Eye Hospital."
    },
    {
      id: "vitreo-retinal-surgery",
      slug: "vitreo-retinal-surgery",
      title: "Vitreo Retinal Surgery",
      subtitle: "Micro-Incision Vitrectomy, Retinal Detachment & Macular Hole Care",
      category: "Vitreoretinal Super-Specialty",
      shortDesc: "The only treatment option is a surgery called vitrectomy and that surgery is undertaken to help restore your eye to close the retinal hole. The success of the operation involves careful removal of membranes around the hole and maintaining face down posture for up to 2 weeks on a very strict basis to allow the gas to close that hole.",
      fullDesc: "The only treatment option is a surgery called vitrectomy and that surgery is undertaken to help restore your eye to close the retinal hole. The success of the operation involves careful removal of membranes around the hole and maintaining face down posture for up to 2 weeks on a very strict basis to allow the gas to close that hole.",
      desc: "The only treatment option is a surgery called vitrectomy and that surgery is undertaken to help restore your eye to close the retinal hole. The success of the operation involves careful removal of membranes around the hole and maintaining face down posture for up to 2 weeks on a very strict basis to allow the gas to close that hole.",
      imagePlaceholder: "assets/services/retina_care.jpg",
      heroImage: "assets/services/retina_care.jpg",
      serviceImage: "assets/services/retina_care.jpg",
      relatedDoctorIds: ["dr-anand-gannur"],
      relatedDoctors: ["Dr. Anand G. Gannur"],
      availableHospitals: ["Vijayapura Main Campus"],
      clinicalDetails: {
        overview: "Vitreo-retinal surgery addresses complex disorders of the vitreous humor and neurosensory retina. Advanced micro-incision sutureless vitrectomy (MIVS) repairs retinal tears, diabetic vitreous hemorrhages, tractional detachments, and macular holes using state-of-the-art gas/silicone oil tamponade.",
        conditions: [
          "Full-thickness macular holes and epiretinal membranes (macular pucker)",
          "Rhegmatogenous, tractional, and exudative retinal detachments",
          "Proliferative diabetic retinopathy and non-clearing vitreous hemorrhage",
          "Retinal vein occlusions (CRVO/BRVO), retinal tears, and macular edema"
        ],
        symptoms: [
          "Sudden shower of dark floaters or cobweb-like specks across vision",
          "Flashes of light (photopsia) in the peripheral field of vision",
          "A dark curtain or shadow descending over part of your visual field",
          "Distorted, wavy straight lines (metamorphopsia) and central blind spots"
        ],
        diagnosis: [
          "High-Definition Macular Optical Coherence Tomography (Spectral Domain OCT)",
          "Fundus Fluorescein Angiography (FFA) to map retinal vascular perfusion",
          "Ophthalmic B-Scan Ultrasound for dense vitreous hemorrhages",
          "Ultra-widefield Indirect Ophthalmoscopy under full pupillary dilation"
        ],
        treatment: [
          "23G / 25G / 27G Micro-Incision Pars Plana Vitrectomy (MIVS)",
          "Internal Limiting Membrane (ILM) peeling using biocompatible vital dyes",
          "Endolaser retinal photocoagulation and trans-scleral cryopexy",
          "Intraocular Gas (C3F8 / SF6) or Medical-Grade Silicone Oil tamponade",
          "Intravitreal anti-VEGF (Accentrix, Lucentis, Eylea) and steroid implants"
        ],
        procedure: [
          "• Laser surgery can repair a retinal tear or hole.",
          "• Shrinking irregular blood vessels via green laser photocoagulation.",
          "• Freezing (cryopexy) to secure torn retinal margins.",
          "• Injecting air or gas into your eye to tamponade the hole.",
          "• Indenting the surface of your eye (scleral buckling).",
          "• Evacuating and replacing the fluid in the eye (vitrectomy).",
          "• Implanting medicine (anti-VEGF/steroids) into the eye.",
          "• Implanting a retinal prosthesis where clinically indicated."
        ],
        benefits: [
          "Preserves sight and prevents irreversible neurosensory blindness",
          "Repairs anatomical tears and reattaches separated retina",
          "Minimally invasive sutureless vitrectomy ports for faster comfort",
          "Comprehensive diabetic eye care safeguarding rural populations"
        ],
        preparation: [
          "Comprehensive dilated vitreoretinal mapping and systemic sugar control",
          "Discontinue blood thinners under physician supervision if advised",
          "Prepare home accommodations for face-down positioning if required"
        ],
        recovery: [
          "Strict face-down positioning for up to 2 weeks if gas tamponade is used",
          "Do not travel by air or ascend high altitudes while intraocular gas is present",
          "Apply prescribed antibiotic and cycloplegic eye drops diligently",
          "Regular milestone check-ups to verify complete hole closure"
        ],
        whenToConsult: [
          "Sudden onset of flashes and floaters (Immediate Emergency)",
          "Dark shadow or curtain covering any part of your vision",
          "Sudden blurring of central vision in diabetic or high-myopia patients"
        ]
      },
      faqs: [
        { q: "Why is face-down positioning required after macular hole surgery?", a: "The gas bubble floats upward inside the eye. Maintaining a face-down posture ensures the bubble presses directly against the macular hole, sealing it securely." },
        { q: "Can vitrectomy be performed under local anesthesia?", a: "Yes. Most micro-incision vitrectomies are performed comfortably under local peribulbar block anesthesia with same-day recovery." }
      ],
      displayOrder: 3,
      published: true,
      seoTitle: "Vitreo Retinal Surgery | Anugraha Eye Hospital",
      seoDesc: "Specialized vitrectomy surgery, retinal detachment repair, and macular hole treatment by Head of Vitreo Retina Dr. Anand G. Gannur."
    },
    {
      id: "paediatric-squint",
      slug: "paediatric-squint",
      title: "Paediatric Squint",
      subtitle: "Children's Strabismus Correction, Amblyopia & Binocular Alignment",
      category: "Pediatric Ophthalmology",
      shortDesc: "The main treatment for a squint is glasses – these can help if a squint is caused by a problem with your child’s eyesight, such as large-angle hyperopia. Eye exercises – exercises for the muscles that control eye movement may sometimes help the eyes work together better. There is no specific age limit for squint eye surgery but surgery before six years of age is important to get the best desired results. For this treatment, doctors may perform surgical correction or exercises to help properly align your eyes.",
      fullDesc: "The main treatment for a squint is glasses – these can help if a squint is caused by a problem with your child’s eyesight, such as large-angle hyperopia. Eye exercises – exercises for the muscles that control eye movement may sometimes help the eyes work together better. There is no specific age limit for squint eye surgery but surgery before six years of age is important to get the best desired results. For this treatment, doctors may perform surgical correction or exercises to help properly align your eyes.",
      desc: "The main treatment for a squint is glasses – these can help if a squint is caused by a problem with your child’s eyesight, such as large-angle hyperopia. Eye exercises – exercises for the muscles that control eye movement may sometimes help the eyes work together better. There is no specific age limit for squint eye surgery but surgery before six years of age is important to get the best desired results. For this treatment, doctors may perform surgical correction or exercises to help properly align your eyes.",
      imagePlaceholder: "assets/services/pediatric_ophthalmology.jpg",
      heroImage: "assets/services/pediatric_ophthalmology.jpg",
      serviceImage: "assets/services/pediatric_ophthalmology.jpg",
      relatedDoctorIds: ["dr-santoshgouda-patil", "dr-rohini-patil"],
      relatedDoctors: ["Dr. Santoshgouda. B. Patil", "Dr. Rohini. S. Patil"],
      availableHospitals: ["Vijayapura Main Campus"],
      clinicalDetails: {
        overview: "Pediatric squint (strabismus) and amblyopia (lazy eye) require specialized, compassionate clinical intervention during early childhood. Corrective spectacles, occlusion therapy, orthoptic exercises, and precise extraocular muscle microsurgery restore proper eye alignment, depth perception, and binocular single vision.",
        conditions: [
          "Esotropia (inward turning) and Exotropia (outward turning eyes)",
          "Amblyopia ('Lazy Eye') caused by refractive asymmetry or strabismus",
          "Accommodative squints caused by uncorrected hyperopia",
          "Congenital nystagmus, ocular torticollis (head tilt), and diplopia"
        ],
        symptoms: [
          "Crossed, drifting, or misaligned eyes in photos or daily gaze",
          "Child closing one eye in bright sunlight or tilting the head",
          "Poor 3D depth perception, stumbling or difficulty catching balls",
          "Holding books or screens unusually close to the face"
        ],
        diagnosis: [
          "Cycloplegic Refraction with child-friendly retinoscopy",
          "Prism Cover Test and Hirschberg Corneal Reflex evaluation",
          "Synoptophore Orthoptic Assessment for binocular fusion",
          "Dilated Fundus Examination to rule out organic pathology"
        ],
        treatment: [
          "Prescription corrective spectacles for refractive squints",
          "Occlusion (patching) therapy to strengthen the lazy eye",
          "Orthoptic synoptophore exercises to build fusion reserve",
          "Extraocular muscle recession, resection, or plication microsurgery"
        ],
        procedure: [
          "1. Comprehensive orthoptic measurement establishes the deviation angle in prism diopters.",
          "2. Child-safe general anesthesia administered by pediatric anesthetists.",
          "3. Tiny incisions made in the conjunctiva to access extraocular muscles.",
          "4. Muscle attachments carefully adjusted (weakened or tightened) to balance alignment.",
          "5. Absorbable sutures placed with no requirement for suture removal."
        ],
        benefits: [
          "Restores normal ocular alignment and balanced appearance",
          "Enables development of 3D stereoscopic depth perception",
          "Critical developmental treatment before age 6 optimizes visual acuity",
          "Eliminates abnormal compensatory head tilt and neck strain"
        ],
        preparation: [
          "Pediatric pre-anesthetic medical check-up",
          "Fasting guidelines explained clearly for child safety",
          "Explain the procedure gently to build comfort and confidence"
        ],
        recovery: [
          "Same-day or overnight discharge with child-safe eye dressing",
          "Mild redness settles comfortably within 1-2 weeks",
          "Resume school and non-contact activities within 7-10 days",
          "Post-operative orthoptic check-up at 1 week, 1 month, and 3 months"
        ],
        whenToConsult: [
          "Any noticeable eye turn or misalignment observed in infants or toddlers",
          "Child consistently tilts head to one side while watching television",
          "Difficulty focusing on toys or tracking moving objects smoothly"
        ]
      },
      faqs: [
        { q: "Why is surgery recommended before 6 years of age?", a: "The visual centers in the child's brain develop rapidly up to age 6. Aligning the eyes early allows the brain to develop normal 3D binocular vision." },
        { q: "Will squint surgery improve eyesight?", a: "Squint surgery aligns the eyes physically. If a lazy eye (amblyopia) is present, occlusion patching therapy and spectacles are used alongside surgery to improve visual acuity." }
      ],
      displayOrder: 4,
      published: true,
      seoTitle: "Paediatric Squint & Strabismus Care | Anugraha Eye Hospital",
      seoDesc: "Expert pediatric squint alignment, amblyopia therapy, and strabismus microsurgery by Dr. Santoshgouda Patil and Dr. Rohini Patil."
    },
    {
      id: "glaucoma",
      slug: "glaucoma",
      title: "Glaucoma",
      subtitle: "Early IOP Detection, Selective Laser SLT & Filtration Surgery",
      category: "Glaucoma Management",
      shortDesc: "Glaucoma is treated often starts with prescription eye drops. Some may decrease eye pressure by improving how fluid drains from your eye. Others decrease the amount of fluid your eye makes. Depending on how low your eye pressure needs to be, you may be prescribed more than one eye drop, selective laser therapy, or microsurgery.",
      fullDesc: "Glaucoma is treated often starts with prescription eye drops. Some may decrease eye pressure by improving how fluid drains from your eye. Others decrease the amount of fluid your eye makes. Depending on how low your eye pressure needs to be, you may be prescribed more than one eye drop, selective laser therapy, or microsurgery.",
      desc: "Glaucoma is treated often starts with prescription eye drops. Some may decrease eye pressure by improving how fluid drains from your eye. Others decrease the amount of fluid your eye makes. Depending on how low your eye pressure needs to be, you may be prescribed more than one eye drop, selective laser therapy, or microsurgery.",
      imagePlaceholder: "assets/services/glaucoma_management.jpg",
      heroImage: "assets/services/glaucoma_management.jpg",
      serviceImage: "assets/services/glaucoma_management.jpg",
      relatedDoctorIds: ["dr-cauvery-shethe", "dr-malini"],
      relatedDoctors: ["Dr. Cauvery Shethe", "Dr. Malini P L"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      clinicalDetails: {
        overview: "Glaucoma, often known as the 'silent thief of sight', damages the optic nerve through elevated intraocular pressure. Early detection using computerized visual fields and OCT scans, coupled with medical drops, Selective Laser Trabeculoplasty (SLT), and filtering trabeculectomy, prevents irreversible vision loss.",
        conditions: [
          "Primary Open-Angle Glaucoma (POAG)",
          "Angle-Closure Glaucoma (Acute & Chronic)",
          "Normal-Tension Glaucoma (NTG)",
          "Secondary Glaucoma (Pseudoexfoliation, Pigmentary, Steroid-Induced)"
        ],
        symptoms: [
          "Gradual, painless loss of peripheral (side) vision",
          "Tunnel vision in advanced, undetected stages",
          "Severe eye ache, headache, redness, and colored halos (in acute angle-closure)",
          "Difficulty adjusting to dark rooms or evening light"
        ],
        diagnosis: [
          "Goldmann Applanation Tonometry for precise IOP measurement",
          "Humphrey Automated Visual Field Perimetry (HVF 24-2/30-2)",
          "High-Definition Cirrus OCT scans of the Retinal Nerve Fiber Layer (RNFL)",
          "Gonioscopy to assess open vs. narrow drainage angles",
          "Central Corneal Thickness (CCT) Pachymetry"
        ],
        treatment: [
          "Topical pressure-lowering eye drops (Prostaglandins, Beta-blockers, Carbonic anhydrase inhibitors)",
          "Selective Laser Trabeculoplasty (SLT) and Nd:YAG Laser Peripheral Iridotomy (LPI)",
          "Trabeculectomy microsurgery with anti-metabolite (Mitomycin-C)",
          "Glaucoma Drainage Device (Ahmed Valve) implantation"
        ],
        procedure: [
          "1. Target pressure calibrated based on baseline RNFL thickness and field loss.",
          "2. Initial therapy begins with targeted drainage/production eye drop drops.",
          "3. If medications are insufficient, non-invasive laser (SLT/YAG) is delivered in OPD.",
          "4. For progressive cases, guarded filtration trabeculectomy creates a safe drainage bleb.",
          "5. Long-term IOP monitoring ensures lifelong optic nerve protection."
        ],
        benefits: [
          "Halts progressive optic nerve damage and preserves remaining vision",
          "Customized target IOP protocols personalized to individual risk factors",
          "Quick in-clinic laser treatments without surgical incisions",
          "Routine monitoring prevents silent progression to blindness"
        ],
        preparation: [
          "Continue all prescribed glaucoma eye drops up to the morning of evaluation",
          "Bring current medication bottles and previous visual field reports",
          "Avoid excessive caffeine or fluid intake immediately before pressure checks"
        ],
        recovery: [
          "Eye drop therapy requires lifelong regular application at fixed times",
          "Post-laser patients resume normal activities the same day",
          "Post-trabeculectomy patients avoid rubbing the eye and strenuous work for 4 weeks",
          "Visual field and OCT tests repeated every 6-12 months"
        ],
        whenToConsult: [
          "Family history of glaucoma, diabetes, or hypertension (Annual screening)",
          "Over age 40 (Essential annual eye pressure check)",
          "Sudden severe eye pain accompanied by blurred vision and halos around lights"
        ]
      },
      faqs: [
        { q: "Can vision lost to glaucoma be restored?", a: "No. Vision lost to optic nerve damage cannot be recovered, which is why early detection and pressure control are vital." },
        { q: "How often should eye pressure be checked?", a: "Glaucoma patients should be evaluated every 3 to 6 months to ensure eye pressure remains at the safe target level." }
      ],
      displayOrder: 5,
      published: true,
      seoTitle: "Glaucoma Diagnostics & Surgery | Anugraha Eye Hospital",
      seoDesc: "Specialized glaucoma screening, optic nerve OCT, laser SLT, and trabeculectomy surgery by Dr. Cauvery Shethe."
    },
    {
      id: "cornea-lasik-eye-bank",
      slug: "cornea-lasik-eye-bank",
      title: "Cornea, LASIK & Eye Bank",
      subtitle: "Corneal Grafting, Donor Preservation, Keratoconus & LASIK Surgery",
      category: "Cornea & Eye Banking",
      shortDesc: "During LASIK eye services, an eye surgeon creates a flap in the cornea, dome-shaped surface of the eye that accounts for a large part of the eye’s bending or refracting power. The flap allows the surgeon to reshape the cornea, which corrects the refractive problems in the eye. Eye Bank: The Hospital is responsible for cornea harvesting or harvesting and preserving donor corneas, and making available to trained corneal graft surgeons. Eye Bank is an integral part of the local health system; they may be attached to a hospital or located in a separate building.",
      fullDesc: "During LASIK eye services, an eye surgeon creates a flap in the cornea, dome-shaped surface of the eye that accounts for a large part of the eye’s bending or refracting power. The flap allows the surgeon to reshape the cornea, which corrects the refractive problems in the eye. Eye Bank: The Hospital is responsible for cornea harvesting or harvesting and preserving donor corneas, and making available to trained corneal graft surgeons. Eye Bank is an integral part of the local health system; they may be attached to a hospital or located in a separate building.",
      desc: "During LASIK eye services, an eye surgeon creates a flap in the cornea, dome-shaped surface of the eye that accounts for a large part of the eye’s bending or refracting power. The flap allows the surgeon to reshape the cornea, which corrects the refractive problems in the eye. Eye Bank: The Hospital is responsible for cornea harvesting or harvesting and preserving donor corneas, and making available to trained corneal graft surgeons. Eye Bank is an integral part of the local health system; they may be attached to a hospital or located in a separate building.",
      imagePlaceholder: "assets/services/cornea_oculoplasty.jpg",
      heroImage: "assets/services/cornea_oculoplasty.jpg",
      serviceImage: "assets/services/cornea_oculoplasty.jpg",
      relatedDoctorIds: ["dr-malini", "dr-madhu-gannur"],
      relatedDoctors: ["Dr. Malini P L", "Dr. Madhu A. Gannur"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      clinicalDetails: {
        overview: "Our Cornea and Eye Bank unit integrates advanced refractive corneal remodeling with community eye banking and sight-restoring corneal transplantation. We harvest, evaluate, and preserve donor corneas according to international standards, supplying healthy tissue for full-thickness (PKP) and lamellar (DSEK/DALK) keratoplasty.",
        conditions: [
          "Corneal opacity, scars, and post-infectious leukomas",
          "Keratoconus and corneal ectasia",
          "Bullous keratopathy and endothelial dystrophy",
          "Pterygium, recurrent corneal erosions, and dry eye disease",
          "Refractive myopia, hyperopia, and astigmatism"
        ],
        symptoms: [
          "Severe reduction in vision due to cloudy or hazy cornea",
          "Extreme sensitivity to light (photophobia) and foreign body sensation",
          "Painful, watering red eye from corneal ulcers or abrasions",
          "Progressive irregular astigmatism requiring frequent glass changes"
        ],
        diagnosis: [
          "Slit-Lamp Biomicroscopy with Fluorescein & Rose Bengal staining",
          "Corneal Topography & Pachymetry (Pentacam Mapping)",
          "Specular Microscopy for Donor and Patient Endothelial Density",
          "Microbiological Culture & Sensitivity of corneal scrapings"
        ],
        treatment: [
          "Penetrating Keratoplasty (PKP) full-thickness corneal transplantation",
          "Lamellar Keratoplasty (DSEK, DMEK, DALK) for selective layer replacement",
          "Corneal Collagen Cross-Linking (C3R / CXL) for Keratoconus",
          "Pterygium excision with conjunctival autograft and fibrin glue (sutureless)",
          "24/7 Community Eye Donation Harvesting & Tissue Preservation"
        ],
        procedure: [
          "1. Donor cornea harvested with strict serological screening and tissue preservation.",
          "2. Patient's damaged corneal tissue precisely excised using micro-trephines.",
          "3. Donor graft button placed and secured with microscopic 10-0 nylon sutures.",
          "4. Anti-rejection regimens initiated immediately.",
          "5. Regular follow-up ensures graft clarity and visual rehabilitation."
        ],
        benefits: [
          "Restores eyesight to patients with corneal blindness",
          "Active Eye Bank serves the entire North Karnataka healthcare network",
          "Advanced lamellar techniques significantly reduce graft rejection risks",
          "Sutureless pterygium surgery prevents recurrence with rapid healing"
        ],
        preparation: [
          "Donor corneas matched according to strict medical quality protocols",
          "Patients with active infections treated with antimicrobial therapy prior to surgery",
          "Counseling provided regarding long-term graft care and eye protection"
        ],
        recovery: [
          "Protective eye shield worn continuously for the initial weeks",
          "Strict compliance with immunosuppressive and lubricant eye drops",
          "Suture adjustment or selective removal performed over 6-12 months",
          "Regular lifelong follow-ups to maintain graft transparency"
        ],
        whenToConsult: [
          "Cloudy white patch developing on the clear part of your eye",
          "Sudden painful red eye with light sensitivity (Urgent Corneal Ulcer)",
          "Pledge eye donation in honor of loved ones or report a death for harvesting"
        ]
      },
      faqs: [
        { q: "How can someone pledge their eyes for donation?", a: "You can pledge by signing an eye donation form at Anugraha Eye Hospital. In the event of a death, family members can contact our 24/7 Eye Bank helpline." },
        { q: "How soon after death must corneas be harvested?", a: "Corneal harvesting should ideally be completed within 6 hours after death to ensure optimal tissue viability." }
      ],
      displayOrder: 6,
      published: true,
      seoTitle: "Cornea, LASIK & Eye Bank | Anugraha Eye Hospital",
      seoDesc: "Corneal transplantation, keratoconus C3R cross-linking, and community Eye Bank services led by Dr. Malini and Dr. Madhu Gannur."
    },
    {
      id: "oculoplasty",
      slug: "oculoplasty",
      title: "Oculoplasty Surgery",
      subtitle: "Blepharoplasty, Eyelid Ptosis, Orbit Reconstruction & Lacrimal DCR",
      category: "Oculoplastic & Orbital Surgery",
      shortDesc: "The most common procedures we perform include: Blepharoplasty and eyelid ptosis surgery, lacrimal and orbit. Supported by Advanced Computer Theatres, Special Rooms and Wards, Medical Laboratories, and In-House Optical and Pharmacy services.",
      fullDesc: "The most common procedures we perform include: Blepharoplasty and eyelid ptosis surgery, lacrimal and orbit. Supported by Advanced Computer Theatres, Special Rooms and Wards, Medical Laboratories, and In-House Optical and Pharmacy services.",
      desc: "The most common procedures we perform include: Blepharoplasty and eyelid ptosis surgery, lacrimal and orbit. Supported by Advanced Computer Theatres, Special Rooms and Wards, Medical Laboratories, and In-House Optical and Pharmacy services.",
      imagePlaceholder: "assets/services/cornea_oculoplasty.jpg",
      heroImage: "assets/services/cornea_oculoplasty.jpg",
      serviceImage: "assets/services/cornea_oculoplasty.jpg",
      relatedDoctorIds: ["dr-rohini-patil"],
      relatedDoctors: ["Dr. Rohini. S. Patil"],
      availableHospitals: ["Vijayapura Main Campus"],
      clinicalDetails: {
        overview: "Oculoplasty is the super-specialty that combines ophthalmic microsurgery with facial plastic surgery. Treating disorders of the eyelids, tear drainage channels (lacrimal system), and eye socket (orbit), our specialists restore both vital ocular protective function and refined aesthetic symmetry.",
        conditions: [
          "Ptosis (drooping of the upper eyelid restricting visual field)",
          "Entropion (inward turned lid) and Ectropion (outward turned lid)",
          "Dacryocystitis and blocked tear ducts causing constant tearing",
          "Eyelid tumors, cysts, xanthelasma, and chalazions",
          "Orbital fractures, trauma, and anophthalmic socket for custom prosthetic eyes"
        ],
        symptoms: [
          "Eyelid drooping down over the pupil, causing visual blockage and tired look",
          "Constant overflow of tears (epiphora) down the cheek",
          "Inward turning eyelashes scratching the cornea with redness and pain",
          "Lumps or swelling on the eyelids or at the inner corner of the eye"
        ],
        diagnosis: [
          "Margin Reflex Distance (MRD-1, MRD-2) and Levator Muscle Excursion testing",
          "Lacrimal Syringing & Probing to pinpoint drainage blockage",
          "Exophthalmometry to measure eyeball protrusion",
          "CT / MRI Orbit scans for traumatic injuries and orbital tumors"
        ],
        treatment: [
          "Levator Palpebrae Superioris (LPS) Resection or Frontalis Sling for Ptosis",
          "Endonasal or External Dacryocystorhinostomy (DCR) for blocked tear ducts",
          "Cosmetic and Functional Blepharoplasty for excess eyelid skin",
          "Custom-crafted ocular prosthetic artificial eye fitting"
        ],
        procedure: [
          "1. High-resolution anatomical measurement of eyelid crease and tear pathways.",
          "2. Local or general anesthesia administered depending on case complexity.",
          "3. Precise microsurgical adjustment of eyelid levator muscles or tear channels.",
          "4. Fine cosmetic micro-suturing aligned along natural skin creases.",
          "5. Same-day recovery with minimal periocular bruising."
        ],
        benefits: [
          "Restores full, unobstructed field of vision",
          "Resolves chronic, embarrassing watering and tear duct infections",
          "Natural, rejuvenated aesthetic appearance with hidden incision lines",
          "Equipped with Advanced Computer Theatres and Special Recovery Rooms"
        ],
        preparation: [
          "Avoid aspirin or anticoagulant medications for 5 days prior to surgery",
          "Clean eyelid margins with warm compresses if chronic blepharitis is present",
          "Arrange transportation home after the day-care procedure"
        ],
        recovery: [
          "Apply cold compresses for 48 hours to minimize minor swelling",
          "Keep incision lines dry for 5 days until stitch removal",
          "Normal social activities resumed within 7 to 10 days",
          "Routine post-op assessment on Day 7 and Month 1"
        ],
        whenToConsult: [
          "Drooping upper eyelid obstructing reading or driving vision",
          "Persistent watery eye requiring constant wiping with handkerchief",
          "Eyelashes rubbing directly against the eye causing irritation"
        ]
      },
      faqs: [
        { q: "Will ptosis surgery leave visible scars on the eyelid?", a: "Incisions are placed discreetly within the natural upper eyelid crease, making surgical lines virtually invisible once healed." },
        { q: "How is a blocked tear duct (DCR) treated?", a: "DCR creates a new, direct bypass channel between the lacrimal sac and nasal cavity, permanently resolving watery eyes." }
      ],
      displayOrder: 7,
      published: true,
      seoTitle: "Oculoplasty Surgery & Eyelid Ptosis | Anugraha Eye Hospital",
      seoDesc: "Specialized blepharoplasty, ptosis correction, orbital reconstruction, and lacrimal DCR surgery by Dr. Rohini S. Patil."
    },
    {
      id: "lasik",
      slug: "lasik",
      title: "LASIK Service",
      subtitle: "Blade-Free Contoura Vision Laser Vision Correction",
      category: "Laser Vision Correction",
      shortDesc: "During LASIK eye services, an eye surgeon creates a flap in the cornea, dome-shaped surface of the eye that accounts for a large part of the eye’s bending or refracting power. The flap allows the surgeon to reshape the cornea, which corrects the refractive problems in the eye.",
      fullDesc: "During LASIK eye services, an eye surgeon creates a flap in the cornea, dome-shaped surface of the eye that accounts for a large part of the eye’s bending or refracting power. The flap allows the surgeon to reshape the cornea, which corrects the refractive problems in the eye.",
      desc: "During LASIK eye services, an eye surgeon creates a flap in the cornea, dome-shaped surface of the eye that accounts for a large part of the eye’s bending or refracting power. The flap allows the surgeon to reshape the cornea, which corrects the refractive problems in the eye.",
      imagePlaceholder: "assets/services/lasik_contoura.jpg",
      heroImage: "assets/services/lasik_contoura.jpg",
      serviceImage: "assets/services/lasik_contoura.jpg",
      relatedDoctorIds: ["dr-malini", "dr-madhu-gannur", "dr-lingadalli"],
      relatedDoctors: ["Dr. Malini P L", "Dr. Madhu A. Gannur", "Dr. Prabhugouda B. Lingadalli"],
      availableHospitals: ["Vijayapura Main Campus"],
      clinicalDetails: {
        overview: "LASIK (Laser-Assisted in Situ Keratomileusis) and Topography-Guided Contoura Vision offer the ultimate freedom from spectacles and contact lenses. By creating an ultra-thin corneal flap and utilizing cool ultraviolet excimer laser beams, corneal curvature is recontoured to deliver sharp, uncompromised 20/20 vision.",
        conditions: [
          "Myopia (Nearsightedness) up to -10.0 Diopters",
          "Hyperopia (Farsightedness) up to +4.0 Diopters",
          "Astigmatism (Cylindrical power) up to 5.0 Diopters",
          "Spectacle intolerance in athletes, pilots, and military aspirants"
        ],
        symptoms: [
          "Dependence on glasses or contact lenses for daily tasks",
          "Eyestrain, headaches, and dry eyes from long contact lens wear",
          "Difficulty participating in swimming, sports, and outdoor activities with glasses",
          "Distorted night vision and halos around lights"
        ],
        diagnosis: [
          "Corneal Topography & Elevation Mapping (Pentacam HR)",
          "Corneal Pachymetry to ensure safe stromal bed thickness",
          "Dry Eye Evaluation (TBUT & Schirmer Test)",
          "Pupillometry and Dilated Peripheral Retina Screening"
        ],
        treatment: [
          "Topography-Guided Contoura Vision LASIK",
          "Blade-Free Femto-LASIK with customized flap creation",
          "Advanced Surface Ablation (Customized PRK) for thinner corneas"
        ],
        procedure: [
          "1. Anesthetic numbing drops placed in both eyes — zero pain.",
          "2. Femtosecond laser creates a uniform, microscopically thin corneal flap.",
          "3. Flap is gently lifted, exposing the underlying stromal bed.",
          "4. Excimer laser reshapes the cornea in less than 30 seconds per eye.",
          "5. Flap is repositioned, adhering securely without stitches within 2 minutes."
        ],
        benefits: [
          "Clear vision without glasses achieved within 24 hours",
          "Quick 10-minute painless outpatient procedure for both eyes",
          "MyAlcon verified high-precision topography-guided laser platform",
          "Long-term visual stability and confidence for active lifestyles"
        ],
        preparation: [
          "Stop wearing soft contact lenses 5-7 days before evaluation",
          "Avoid applying eye makeup or perfumes on the day of surgery",
          "Have a light meal prior to coming for your laser procedure"
        ],
        recovery: [
          "Rest eyes for 4-6 hours following surgery",
          "Wear protective goggles while sleeping for 1 week",
          "Avoid swimming, eye rubbing, and makeup for 2 weeks",
          "Follow-up visits on Day 1, Week 1, and Month 1"
        ],
        whenToConsult: [
          "Age 18+ with stable spectacle prescription for at least 1 year",
          "Looking for permanent freedom from reading and distance glasses",
          "Preparing for police, defense, aviation, or competitive fitness careers"
        ]
      },
      faqs: [
        { q: "Is LASIK permanent?", a: "Yes. The laser permanently reshapes the corneal curvature, providing lasting vision correction." },
        { q: "How soon can I return to work after LASIK?", a: "Most patients return to office and screen work within 24 to 48 hours post-procedure." }
      ],
      displayOrder: 8,
      published: true,
      seoTitle: "LASIK Service & Contoura Vision | Anugraha Eye Hospital",
      seoDesc: "Topography-guided Contoura Vision and blade-free LASIK laser eye surgery in Vijayapura."
    },
    {
      id: "ocular-trauma",
      slug: "ocular-trauma",
      title: "Ocular Trauma",
      subtitle: "24/7 Emergency Ophthalmic Care, Perforating Injury & Reconstruction",
      category: "Emergency & Trauma Care",
      shortDesc: "Ocular trauma is one of the most under-recognized causes of vision loss in the developing world. Blunt or penetrating ocular trauma can lead to vision loss through cataract or glaucoma, hyphema and retinal damage. Our dedicated emergency trauma service provides immediate microsurgical repair and prevention guidance to safeguard sight.",
      fullDesc: "Ocular trauma is one of the most under-recognized causes of vision loss in the developing world. Blunt or penetrating ocular trauma can lead to vision loss through cataract or glaucoma, hyphema and retinal damage. Our dedicated emergency trauma service provides immediate microsurgical repair and prevention guidance to safeguard sight.",
      desc: "Ocular trauma is one of the most under-recognized causes of vision loss in the developing world. Blunt or penetrating ocular trauma can lead to vision loss through cataract or glaucoma, hyphema and retinal damage. Our dedicated emergency trauma service provides immediate microsurgical repair and prevention guidance to safeguard sight.",
      imagePlaceholder: "assets/services/community_screening.jpg",
      heroImage: "assets/services/community_screening.jpg",
      serviceImage: "assets/services/community_screening.jpg",
      relatedDoctorIds: ["dr-rohini-patil"],
      relatedDoctors: ["Dr. Rohini. S. Patil"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      clinicalDetails: {
        overview: "Ocular trauma requires urgent, specialized ophthalmic management to prevent permanent blindness. Our round-the-clock emergency team provides rapid triage, primary corneal/scleral laceration repair, traumatic cataract extraction, hyphema drainage, and intraocular foreign body removal.",
        conditions: [
          "Open Globe Injuries (corneal and scleral lacerations/ruptures)",
          "Closed Globe Injuries (contusion, hyphema, traumatic iridodialysis)",
          "Intraocular Foreign Bodies (metallic/wood fragments)",
          "Chemical Burns (acid and alkali splash injuries)",
          "Traumatic cataract, secondary glaucoma, and orbital blow-out fractures"
        ],
        symptoms: [
          "Severe eye pain, sudden vision loss, or blackout following injury",
          "Visible bleeding in the front of the eye (hyphema) or leaking fluid",
          "Deformed pupil or visible foreign object embedded in the eye",
          "Inability to open the eyelid or move the eye in all directions"
        ],
        diagnosis: [
          "Emergency Slit-Lamp Biomicroscopy with Seidel test for leak detection",
          "Non-Contact Ocular B-Scan Ultrasound (avoiding pressure on open globe)",
          "High-Resolution CT Scan of Orbit for foreign body localization",
          "Continuous pH monitoring and copious lavage for chemical burns"
        ],
        treatment: [
          "Primary micro-surgical corneal/scleral wound repair with 10-0 nylon",
          "Emergency anterior chamber wash for total hyphema",
          "Intraocular foreign body (IOFB) removal via micro-vitrectomy",
          "Immediate copious chemical neutralization and amniotic membrane grafting",
          "Broad-spectrum intravitreal and systemic antibiotic prophylaxis"
        ],
        procedure: [
          "1. Immediate emergency stabilization — DO NOT press or rub the injured eye.",
          "2. Rigid protective eye shield placed without pressure on the globe.",
          "3. Emergency imaging confirms absence/presence of foreign bodies.",
          "4. Under emergency micro-surgical conditions, globe integrity is restored.",
          "5. Intensive post-operative anti-inflammatory and antibiotic therapy initiated."
        ],
        benefits: [
          "24/7 Emergency trauma triage team ready for instant intervention",
          "Preserves globe integrity and salvages maximum potential vision",
          "State-of-the-art modular operating theatres with HEPA laminar air flow",
          "Epidemiological preventive counseling for agricultural & industrial workers"
        ],
        preparation: [
          "In case of injury: DO NOT rub the eye, DO NOT apply home remedies",
          "In chemical injury: Flush immediately with clean tap water for 15 minutes",
          "Rush directly to Anugraha Eye Hospital emergency desk without delay"
        ],
        recovery: [
          "Protective eye shield worn continuously during healing",
          "Strict bed rest with head elevation for hyphema cases",
          "Avoid heavy lifting, bending forward, or straining",
          "Daily clinical monitoring during early post-operative phase"
        ],
        whenToConsult: [
          "ANY sharp, blunt, or chemical injury to the eye (IMMEDIATE 24/7 EMERGENCY)",
          "Sudden loss of vision following a blow to the face or eye",
          "Suspected foreign body entry while welding, grinding, or farming"
        ]
      },
      faqs: [
        { q: "What should I do immediately after an eye injury?", a: "Do NOT rub or wash the eye if it is a cut or puncture. Place a rigid cup or shield over the eye without pressing on it and come immediately to our 24/7 Emergency Desk." },
        { q: "What is the first-aid for a chemical splash in the eye?", a: "Flush the eye immediately and continuously with clean running water for 15 minutes, keeping the eyelids open, and rush to the hospital immediately." }
      ],
      displayOrder: 9,
      published: true,
      seoTitle: "24/7 Emergency Ocular Trauma Care | Anugraha Eye Hospital",
      seoDesc: "Round-the-clock emergency eye trauma repair, corneal tear closure, and ocular reconstruction by Dr. Rohini S. Patil."
    }
  ],

  academics: [
    {
      id: "fellowships",
      title: "Clinical & Surgical Fellowship Programs",
      name: "Clinical & Surgical Fellowship Programs",
      recognizedBy: "Anugraha Eye Hospital Surgical Board",
      affiliation: "Anugraha Eye Hospital Surgical Board",
      campus: "Vijayapura Base Hospital",
      duration: "1 Year Clinical & Surgical Rotation",
      eligibility: "MS / MD / DNB / DO in Ophthalmology",
      applicationInfo: "Submit CV and surgical logbook to academic desk at contactus@anugrahaeyehospital.com",
      desc: "Super-specialty surgical fellowship providing intensive hands-on surgical volume in High-Volume Phacoemulsification, Refractive Surgery (LASIK/Contoura Vision), and Medical Retina under Dr. Lingadalli & senior surgical mentors.",
      credibilityBadge: "Super-Specialty Surgical Training",
      imagePlaceholder: "assets/placeholders/academic-fellowships-placeholder.svg",
      image: "assets/placeholders/academic-fellowships-placeholder.svg",
      brochureLink: "#/academics",
      applyLink: "#/contact",
      published: true,
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
      name: "NBEMS Diploma (DNB Ophthalmology)",
      recognizedBy: "National Board of Examinations in Medical Sciences (NBEMS / NBE)",
      affiliation: "National Board of Examinations in Medical Sciences (NBEMS / NBE)",
      campus: "Vijayapura Base Hospital",
      duration: "2 Years (Post-Diploma) / 3 Years (Post-MBBS)",
      eligibility: "MBBS Degree with NEET PG clearance & Post-Graduate Central Counseling",
      applicationInfo: "Centralized merit counseling through National Board of Examinations (NBEMS)",
      desc: "Highly prestigious NBE-accredited post-graduate ophthalmic residency training program providing comprehensive clinical rotations, wet lab training, academic seminars, and surgical exposure across all super-specialties.",
      credibilityBadge: "NBE Recognized Post-Graduate Seat",
      imagePlaceholder: "assets/placeholders/academic-dnb-placeholder.svg",
      image: "assets/placeholders/academic-dnb-placeholder.svg",
      brochureLink: "#/academics",
      applyLink: "#/contact",
      published: true,
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
      name: "Diploma in Ophthalmic Technology (DOT)",
      recognizedBy: "Paramedical Board Karnataka",
      affiliation: "Paramedical Board Karnataka",
      campus: "Vijayapura & Kalaburagi Campuses",
      duration: "2 Years (Pass in 10th / PUC Science)",
      eligibility: "Pass in SSLC / 10th Standard or PUC Science (10+2)",
      applicationInfo: "Direct admission via State Paramedical Board counseling and institutional quota",
      desc: "State-recognized paramedical diploma training healthcare technicians in clinical assistance, OT instrumentation maintenance, visual refraction, patient pre-checkups, and ophthalmic diagnostics.",
      credibilityBadge: "Paramedical Board Karnataka Approved",
      imagePlaceholder: "assets/placeholders/academic-dot-placeholder.svg",
      image: "assets/placeholders/academic-dot-placeholder.svg",
      brochureLink: "#/academics",
      applyLink: "#/contact",
      published: true,
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
      name: "B.Sc Optometry (RGUHS)",
      recognizedBy: "Rajiv Gandhi University of Health Sciences (RGUHS)",
      affiliation: "Rajiv Gandhi University of Health Sciences (RGUHS)",
      campus: "Anugraha Institute of Optometry, Kalaburagi",
      duration: "4 Years (3 Years Academic + 1 Year Clinical Internship)",
      eligibility: "Pass in 10+2 / PUC Science with Physics, Chemistry, Biology & English",
      applicationInfo: "Admission through RGUHS Allied Health Sciences portal or direct campus office application",
      desc: "Premier RGUHS-affiliated 4-year undergraduate degree program offering rigorous academic coursework and clinical internship in advanced diagnostic machinery, binocular vision, contact lens fitting, and low vision rehabilitation.",
      credibilityBadge: "RGUHS Affiliated Degree Program",
      imagePlaceholder: "assets/placeholders/academic-bsc-placeholder.svg",
      image: "assets/placeholders/academic-bsc-placeholder.svg",
      brochureLink: "#/academics",
      applyLink: "#/contact",
      published: true,
      highlights: [
        "Affiliated with Rajiv Gandhi University of Health Sciences (RGUHS)",
        "1-Year paid clinical internship at Vijayapura & Kalaburagi hospitals",
        "Advanced training in specialty contact lenses & orthoptics",
        "State-of-the-art optometry practical labs & library"
      ]
    }
  ],

  patientResources: {
    patientInfo: "Anugraha Eye Hospital welcomes patients for both routine visual evaluations and advanced surgical consultations. Please bring any existing spectacle prescriptions, medical records, and government ID/health insurance cards to facilitate cashless registration.",
    education: "Regular eye examinations prevent asymptomatic conditions such as glaucoma, diabetic retinopathy, and age-related macular degeneration. Protect your eyes with UV-blocking sunglasses, take frequent screen breaks using the 20-20-20 rule, and maintain healthy glycemic levels.",
    appointmentInfo: "OPD appointments are available Monday through Saturday from 8:00 AM to 8:00 PM. Walk-in patients are registered on a first-come, first-served basis, with priority triage for emergency eye trauma and elderly patients.",
    emergencyInfo: "24/7 emergency ophthalmic services are active at our Vijayapura Main Campus and Kalaburagi Base Hospital for chemical burns, severe ocular trauma, acute angle-closure glaucoma, and sudden vision loss. Helpline: 08352-220646.",
    insuranceInfo: "Cashless hospitalization is available under Ayushman Bharat Arogya Karnataka (AB-ARK), Arogya Bhagya Yojane, Star Health, ICICI Lombard, and over 20 leading insurance providers and TPAs."
  },

  faqs: [
    {
      id: "faq-1",
      question: "How do I book a consultation or appointment at Anugraha Eye Hospital?",
      answer: "You can book an appointment online via our Contact Page, call our hospital helpline at 08352-220646, reach us via WhatsApp at +91 74839 00963, or visit the OPD registration desk directly at Vijayapura or Kalaburagi campuses.",
      category: "Appointments & Registration",
      displayOrder: 1,
      published: true
    },
    {
      id: "faq-2",
      question: "Where are your main base hospitals and Vision Centers located?",
      answer: "Our tertiary base hospitals are located in Vijayapura (Navabhag Main Road) and Kalaburagi (Ring Road Junction). We also operate 8 rural Vision Centers in Talikoti, Muddebihal, Sindagi, Indi, B.Bagewadi, Chadachan, Nalatwad, and Tikota.",
      category: "Locations & Network",
      displayOrder: 2,
      published: true
    },
    {
      id: "faq-3",
      question: "What government health schemes and insurance policies are accepted for cashless treatment?",
      answer: "We accept Ayushman Bharat Arogya Karnataka (AB-ARK), Arogya Bhagya Yojane (ABY), Jyoti Sanjiveeni Scheme (JSS), Yeshasvini, Star Health, ICICI Lombard, Niva Bupa, Bajaj Allianz, and all major TPAs for cashless hospitalization.",
      category: "Insurance & Schemes",
      displayOrder: 3,
      published: true
    },
    {
      id: "faq-4",
      question: "Is cataract surgery painful, how long does phacoemulsification take, and what is the recovery period?",
      answer: "Cataract surgery is completely painless, performed under topical eye drop anesthesia without painful injections. The micro-incision phacoemulsification procedure takes only 10-15 minutes, with normal activities resumed within 2-3 days.",
      category: "Cataract Care",
      displayOrder: 4,
      published: true
    },
    {
      id: "faq-5",
      question: "What is the difference between standard Monofocal IOL and premium Multifocal / Toric IOL implants?",
      answer: "Standard Monofocal IOLs provide crisp distance vision, requiring reading glasses for near tasks. Premium Multifocal and Trifocal IOLs offer clear vision at all distances (near, intermediate, distance), reducing spectacle dependency. Toric IOLs correct pre-existing astigmatism.",
      category: "Cataract Care",
      displayOrder: 5,
      published: true
    },
    {
      id: "faq-6",
      question: "Am I eligible for Contoura Vision LASIK laser eye surgery to remove my glasses?",
      answer: "Candidates aged 18+ with stable eye power for at least one year and healthy corneal thickness are generally eligible. A comprehensive pre-LASIK Pentacam corneal topography evaluation at our hospital determines your exact suitability.",
      category: "LASIK & Refractive",
      displayOrder: 6,
      published: true
    },
    {
      id: "faq-7",
      question: "How frequently should diabetic patients undergo retinal eye screening?",
      answer: "All diabetic individuals must undergo a dilated fundus retinal examination at least once every year, or every 3-6 months if early diabetic retinopathy changes are detected, to prevent permanent vision loss.",
      category: "Retina & Diabetes",
      displayOrder: 7,
      published: true
    },
    {
      id: "faq-8",
      question: "What services and doctor visit schedules are available at rural Vision Centers?",
      answer: "Our Vision Centers offer automated computerized refraction, prescription glasses, contact lenses, ophthalmic pharmacy, and direct referral triage. Visiting doctors conduct specialist clinics on designated weekly days.",
      category: "Vision Centers",
      displayOrder: 8,
      published: true
    },
    {
      id: "faq-9",
      question: "Are free cataract surgeries provided at Anugraha Eye Hospital for underprivileged patients?",
      answer: "Yes. In keeping with our founder's mission, over 50,000 free cataract surgeries have been performed for underprivileged patients identified during our rural outreach camps and community screening drives.",
      category: "Community Outreach",
      displayOrder: 9,
      published: true
    },
    {
      id: "faq-10",
      question: "How can students apply for academic programs, RGUHS B.Sc Optometry, and DNB residency?",
      answer: "Interested candidates can apply by visiting our Academics page, calling our administrative desk, or visiting our Kalaburagi and Vijayapura campuses during admission cycles.",
      category: "Academics & Training",
      displayOrder: 10,
      published: true
    }
  ],

  empanelments: [
    { name: "Ayushman Bharat Arogya Karnataka", category: "Government Schemes", code: "AB-ARK", websiteUrl: "https://arogya.karnataka.gov.in", displayOrder: 1, published: true },
    { name: "Arogya Bhagya Yojane", category: "Government Schemes", code: "ABY", websiteUrl: "", displayOrder: 2, published: true },
    { name: "Jyoti Sanjiveeni Scheme", category: "Government Schemes", code: "JSS", websiteUrl: "", displayOrder: 3, published: true },
    { name: "Karnataka Arogya Sanjivini", category: "Government Schemes", code: "KAS", websiteUrl: "", displayOrder: 4, published: true },
    { name: "Rashtriya Bal Swasthya Karyakram (RBSK)", category: "Government Schemes", code: "RBSK", websiteUrl: "", displayOrder: 5, published: true },
    { name: "Yeshasvini Health Insurance", category: "Government Schemes", code: "YHI", websiteUrl: "", displayOrder: 6, published: true },
    { name: "SKDRDP Health Scheme", category: "Government Schemes", code: "SKDRDP", websiteUrl: "", displayOrder: 7, published: true },
    
    { name: "ICICI Lombard General Insurance", category: "Insurance Providers", code: "ICICI", websiteUrl: "https://icicilombard.com", displayOrder: 8, published: true },
    { name: "Star Health and Allied Insurance", category: "Insurance Providers", code: "STAR", websiteUrl: "https://starhealth.in", displayOrder: 9, published: true },
    { name: "Niva Bupa Health Insurance", category: "Insurance Providers", code: "NIVA", websiteUrl: "https://nivabupa.com", displayOrder: 10, published: true },
    { name: "Aditya Birla Health Insurance", category: "Insurance Providers", code: "ABHI", websiteUrl: "", displayOrder: 11, published: true },
    { name: "Bajaj Allianz General Insurance", category: "Insurance Providers", code: "BAJAJ", websiteUrl: "", displayOrder: 12, published: true },
    { name: "SBI General Insurance", category: "Insurance Providers", code: "SBIGI", websiteUrl: "", displayOrder: 13, published: true },
    { name: "Acko General Insurance", category: "Insurance Providers", code: "ACKO", websiteUrl: "", displayOrder: 14, published: true },
    { name: "Go Digit General Insurance", category: "Insurance Providers", code: "DIGIT", websiteUrl: "", displayOrder: 15, published: true },
    { name: "Manipal Cigna Health Insurance", category: "Insurance Providers", code: "MANIPAL", websiteUrl: "", displayOrder: 16, published: true },
    { name: "Future Generali Health Insurance", category: "Insurance Providers", code: "FUTURE", websiteUrl: "", displayOrder: 17, published: true },
    { name: "Universal Sompo General Insurance", category: "Insurance Providers", code: "SOMPO", websiteUrl: "", displayOrder: 18, published: true },
    { name: "Magma Insurance", category: "Insurance Providers", code: "MAGMA", websiteUrl: "", displayOrder: 19, published: true },
    { name: "Royal Sundaram General Insurance", category: "Insurance Providers", code: "ROYAL", websiteUrl: "", displayOrder: 20, published: true },

    { name: "Vidal Health Insurance TPA", category: "TPAs & Corporate", code: "VIDAL", websiteUrl: "", displayOrder: 21, published: true },
    { name: "Paramount Health TPA", category: "TPAs & Corporate", code: "PARAMOUNT", websiteUrl: "", displayOrder: 22, published: true },
    { name: "Ericson TPA Healthcare", category: "TPAs & Corporate", code: "ERICSON", websiteUrl: "", displayOrder: 23, published: true },
    { name: "Health India TPA Services", category: "TPAs & Corporate", code: "HEALTHINDIA", websiteUrl: "", displayOrder: 24, published: true },
    { name: "FHPL TPA", category: "TPAs & Corporate", code: "FHPL", websiteUrl: "", displayOrder: 25, published: true },
    { name: "Genins India Insurance TPA", category: "TPAs & Corporate", code: "GENINS", websiteUrl: "", displayOrder: 26, published: true },
    { name: "Raksha TPA", category: "TPAs & Corporate", code: "RAKSHA", websiteUrl: "", displayOrder: 27, published: true },
    { name: "Vipul MedCorp TPA", category: "TPAs & Corporate", code: "VIPUL", websiteUrl: "", displayOrder: 28, published: true },
    { name: "KSRTC Employee Scheme", category: "TPAs & Corporate", code: "KSRTC", websiteUrl: "", displayOrder: 29, published: true }
  ],

  gallery: [
    { id: 0, title: "Vijayapura Base Hospital Main Campus", category: "Base Hospital", src: "assets/services/cataract_surgery.jpg", caption: "Super-specialty base hospital building in Vijayapura.", filename: "cataract_surgery.jpg", type: "image/jpeg", size: "320 KB", dimensions: "1200 × 800", usedOn: "Vijayapura Campus Hero", uploadDate: "15 Aug 2026" },
    { id: 1, title: "Laminar Airflow Operation Theatre Suite", category: "Operations", src: "assets/services/lasik_contoura.jpg", caption: "HEPA-filtered sterile ophthalmic surgical suite.", filename: "lasik_contoura.jpg", type: "image/jpeg", size: "290 KB", dimensions: "1200 × 800", usedOn: "LASIK Service", uploadDate: "15 Aug 2026" },
    { id: 2, title: "Free Community Outreach Eye Camp", category: "Outreach Camps", src: "assets/services/community_eye_screening.jpg", caption: "Mobile screening unit examining rural demographics.", filename: "community_eye_screening.jpg", type: "image/jpeg", size: "310 KB", dimensions: "1200 × 800", usedOn: "About Us & Outreach", uploadDate: "15 Aug 2026" },
    { id: 3, title: "Glaucoma Diagnostics Clinic", category: "Infrastructure", src: "assets/services/glaucoma_management.jpg", caption: "Humphrey perimetry visual fields suite.", filename: "glaucoma_management.jpg", type: "image/jpeg", size: "280 KB", dimensions: "1200 × 800", usedOn: "Glaucoma Specialty", uploadDate: "15 Aug 2026" },
    { id: 4, title: "High-Resolution Retinal OCT Imaging", category: "Infrastructure", src: "assets/services/retina_care.jpg", caption: "Retinal OCT diagnostics & macula scanner.", filename: "retina_care.jpg", type: "image/jpeg", size: "340 KB", dimensions: "1200 × 800", usedOn: "Retina Specialty", uploadDate: "15 Aug 2026" },
    { id: 5, title: "Pediatric Vision Screening Desk", category: "Pediatric Care", src: "assets/services/pediatric_ophthalmology.jpg", caption: "Specialized children's vision suite.", filename: "pediatric_ophthalmology.jpg", type: "image/jpeg", size: "270 KB", dimensions: "1200 × 800", usedOn: "Pediatric Specialty", uploadDate: "15 Aug 2026" },
    { id: 6, title: "Cornea & Oculoplasty Clinic", category: "Operations", src: "assets/services/cornea_oculoplasty.jpg", caption: "Corneal cross-linking and eyelid suite.", filename: "cornea_oculoplasty.jpg", type: "image/jpeg", size: "315 KB", dimensions: "1200 × 800", usedOn: "Cornea & Oculoplasty", uploadDate: "15 Aug 2026" },
    { id: 7, title: "In-House Optical Dispensing Clinic", category: "Opticals", src: "assets/services/optical_services.jpg", caption: "Prescription eyewear and optical dispensary.", filename: "optical_services.jpg", type: "image/jpeg", size: "305 KB", dimensions: "1200 × 800", usedOn: "Opticals & Vision Centers", uploadDate: "15 Aug 2026" }
  ],

  news: [
    { id: "news-1", title: "Chairman Dr. P.B. Lingadalli Conferred Karnataka Rajyostava Award", shortDesc: "Government of Karnataka recognizes Dr. Prabhugouda Lingadalli's 25 years of continuous community eye care and 50,000+ free cataract surgeries.", content: "The Government of Karnataka has officially conferred the prestigious Karnataka Rajyostava Award upon Dr. Prabhugouda B. Lingadalli in recognition of his selfless contribution to eradicating preventable blindness across rural North Karnataka through Anugraha Eye Hospital.", date: "15 November 2021", category: "Institutional Honors", image: "assets/services/community_eye_screening.jpg", published: true },
    { id: "news-2", title: "Anugraha Institute of Optometry Kalaburagi Expands RGUHS Degree Intake", shortDesc: "Rajiv Gandhi University of Health Sciences approves expanded seat quota for B.Sc Optometry candidates at Kalaburagi campus.", content: "Rajiv Gandhi University of Health Sciences (RGUHS) has sanctioned additional seat capacity for the B.Sc Optometry degree program at Anugraha Institute of Optometry, Kalaburagi, enabling more students to pursue professional eye care careers.", date: "20 August 2025", category: "Academic Expansion", image: "assets/services/optical_services.jpg", published: true },
    { id: "news-3", title: "Milestone: 2.28 Lakh Lifetime Surgeries Achieved Across Base Hospitals", shortDesc: "Combined surgical volume across Vijayapura and Kalaburagi base hospitals crosses 2.28 lakh operations with 99.4% clinical success.", content: "Anugraha Eye Hospital has surpassed 2,28,951 lifetime micro-incision surgeries across its Vijayapura and Kalaburagi base hospitals, maintaining exceptional clinical safety standards and comprehensive patient satisfaction.", date: "10 January 2026", category: "Clinical Outreach", image: "assets/services/cataract_surgery.jpg", published: true }
  ],

  videos: [
    { id: "vid-1", title: "Understanding Phacoemulsification Micro-Incision Cataract Surgery", duration: "4:15", embedId: "cataract-phaco-guide", thumbnail: "assets/services/cataract_surgery.jpg" },
    { id: "vid-2", title: "MyAlcon Verified Contoura Vision LASIK Procedure Walkthrough", duration: "3:45", embedId: "lasik-contoura-demo", thumbnail: "assets/services/lasik_contoura.jpg" },
    { id: "vid-3", title: "Mobile Outreach Eye Camps: Serving Rural North Karnataka", duration: "5:20", embedId: "outreach-camps-docu", thumbnail: "assets/services/community_eye_screening.jpg" }
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
  ],

  partnerships: [
    {
      id: "zeiss",
      name: "ZEISS",
      category: "Precision Optics & Visual Diagnostics",
      logo: "assets/partners/zeiss.svg",
      tagline: "Carl Zeiss Meditec",
      displayOrder: 1,
      published: true
    },
    {
      id: "healthskape",
      name: "HEALTHSKAPE MEDICALS PVT. LTD.",
      category: "Surgical Equipment & Medical Devices",
      logo: "assets/partners/healthskape.svg",
      tagline: "Healthskape Medicals Pvt. Ltd.",
      displayOrder: 2,
      published: true
    },
    {
      id: "aurolab",
      name: "AUROLAB",
      category: "Intraocular Lenses & Consumables",
      logo: "assets/partners/aurolab.svg",
      tagline: "SEE NEW POSSIBILITIES",
      displayOrder: 3,
      published: true
    },
    {
      id: "alcon",
      name: "Alcon",
      category: "Phacoemulsification & Vitrectomy Platforms",
      logo: "assets/partners/alcon.svg",
      tagline: "Alcon Laboratories",
      displayOrder: 4,
      published: true
    },
    {
      id: "appasamy",
      name: "APPASAMY ASSOCIATES",
      category: "Ophthalmic Instruments & Microscopes",
      logo: "assets/partners/appasamy.svg",
      tagline: "Empowering Vision*",
      displayOrder: 5,
      published: true
    },
    {
      id: "caregroups",
      name: "care groups",
      category: "Sight Solutions & Hydrophobic IOLs",
      logo: "assets/partners/caregroups.svg",
      tagline: "Care Group Sight Solutions",
      displayOrder: 6,
      published: true
    }
  ],

  equipment: [
    {
      id: "reichert-7-nct",
      name: "Reichert 7 NCT",
      image: "assets/equipment/reichert_7_nct.jpg",
      altText: "Reichert 7 NCT",
      category: "Diagnostic & Tonometry",
      displayOrder: 1,
      isActive: true,
      published: true
    },
    {
      id: "rebound-tonometer",
      name: "Rebound Tonometer",
      image: "assets/equipment/rebound_tonometer.jpg",
      altText: "Rebound Tonometer",
      category: "Tonometry & IOP Diagnostics",
      displayOrder: 2,
      isActive: true,
      published: true
    },
    {
      id: "poket-7000-ark",
      name: "Poket 7000 ARK",
      image: "assets/equipment/poket_7000_ark.jpg",
      altText: "Poket 7000 ARK",
      category: "Refraction & Keratometry",
      displayOrder: 3,
      isActive: true,
      published: true
    },
    {
      id: "potec-plm-8000pd",
      name: "Auto-refractometer POTEC PLM-8000PD",
      image: "assets/equipment/potec_plm_8000pd.jpg",
      altText: "Auto-refractometer POTEC PLM-8000PD",
      category: "Digital Refractometry",
      displayOrder: 4,
      isActive: true,
      published: true
    },
    {
      id: "ophthalmic-ultrasound-scanner",
      name: "Ophthalmic Ultrasound Scanner",
      image: "assets/equipment/ophthalmic_ultrasound_scanner.jpg",
      altText: "Ophthalmic Ultrasound Scanner",
      category: "Ocular Ultrasonography",
      displayOrder: 5,
      isActive: true,
      published: true
    },
    {
      id: "marvel-b-scan",
      name: "Marvel B Scan",
      image: "assets/equipment/marvel_b_scan.jpg",
      altText: "Marvel B Scan",
      category: "Posterior Segment Ultrasound",
      displayOrder: 6,
      isActive: true,
      published: true
    },
    {
      id: "digital-slit-lamp-imaging",
      name: "Ophthalmic-Digital-Slit-Lamp-with-Camera-Imaging",
      image: "assets/equipment/digital_slit_lamp_imaging.jpg",
      altText: "Ophthalmic-Digital-Slit-Lamp-with-Camera-Imaging",
      category: "Digital Slit Lamp Imaging",
      displayOrder: 7,
      isActive: true,
      published: true
    },
    {
      id: "wavelight-ex-500",
      name: "WaveLight EX 500",
      image: "assets/equipment/wavelight_ex_500.jpg",
      altText: "WaveLight EX 500",
      category: "Corneal Refractive Laser",
      displayOrder: 8,
      isActive: true,
      published: true
    },
    {
      id: "alcon-infiniti-phaco",
      name: "Alcon Infiniti Phaco",
      image: "assets/equipment/alcon_infiniti_phaco.jpg",
      altText: "Alcon Infiniti Phaco",
      category: "Cataract Phacoemulsification",
      displayOrder: 9,
      isActive: true,
      published: true
    },
    {
      id: "alcon-constellation",
      name: "Alcon Constellation Machine",
      image: "assets/equipment/alcon_constellation.jpg",
      altText: "Alcon Constellation Machine",
      category: "Vitreo-Retinal Surgical Platform",
      displayOrder: 10,
      isActive: true,
      published: true
    },
    {
      id: "mel-80-excimer",
      name: "MEL 80 Excimer Laser/Lasik",
      image: "assets/equipment/mel_80_excimer_laser.jpg",
      altText: "MEL 80 Excimer Laser/Lasik",
      category: "Carl Zeiss Refractive Suite",
      displayOrder: 11,
      isActive: true,
      published: true
    },
    {
      id: "yag-laser",
      name: "YAG Laser",
      image: "assets/equipment/yag_laser.jpg",
      altText: "YAG Laser",
      category: "Capsulotomy & Iridotomy Laser",
      displayOrder: 12,
      isActive: true,
      published: true
    },
    {
      id: "canon-fundus-camera",
      name: "Canon Fundus Camera",
      image: "assets/equipment/canon_fundus_camera.jpg",
      altText: "Canon Fundus Camera",
      category: "Digital Retinal Imaging",
      displayOrder: 13,
      isActive: true,
      published: true
    },
    {
      id: "vertical-autoclave",
      name: "VERTICAL AUTOCLAVE- LAB MODEL",
      image: "assets/equipment/vertical_autoclave.jpg",
      altText: "VERTICAL AUTOCLAVE- LAB MODEL",
      category: "Sterilization & Infection Control",
      displayOrder: 14,
      isActive: true,
      published: true
    },
    {
      id: "a-scan",
      name: "A-Scan",
      image: "assets/equipment/a_scan.jpg",
      altText: "A-Scan",
      category: "Ocular Biometry & IOL Power",
      displayOrder: 15,
      isActive: true,
      published: true
    },
    {
      id: "eto-sterilizer-ka2",
      name: "ETO Sterilizer KA2 Model",
      image: "assets/equipment/eto_sterilizer_ka2.jpg",
      altText: "ETO Sterilizer KA2 Model",
      category: "Modular OT Gas Sterilization",
      displayOrder: 16,
      isActive: true,
      published: true
    },
    {
      id: "eto-sterilizer-printer-ka2",
      name: "Fully Automatic Ethylene Oxide Sterilizer Model With Inbuilt Printer, KA-2 Series",
      image: "assets/equipment/eto_sterilizer_printer_ka2.jpg",
      altText: "Fully Automatic Ethylene Oxide Sterilizer Model With Inbuilt Printer, KA-2 Series",
      category: "Automated Sterilization Record",
      displayOrder: 17,
      isActive: true,
      published: true
    },
    {
      id: "oct-scanner",
      name: "OCT",
      image: "assets/equipment/oct_scanner.jpg",
      altText: "OCT",
      category: "Optical Coherence Tomography",
      displayOrder: 18,
      isActive: true,
      published: true
    },
    {
      id: "multispot-green-laser-1",
      name: "Multispot Green Laser",
      image: "assets/equipment/multispot_green_laser_1.jpg",
      altText: "Multispot Green Laser",
      category: "532nm Retinal Photocoagulator",
      displayOrder: 19,
      isActive: true,
      published: true
    },
    {
      id: "slit-lamp-imaging",
      name: "SLIT LAMP IMAGING",
      image: "assets/equipment/slit_lamp_imaging.jpg",
      altText: "SLIT LAMP IMAGING",
      category: "High Resolution Anterior Imaging",
      displayOrder: 20,
      isActive: true,
      published: true
    },
    {
      id: "multispot-green-laser-2",
      name: "Multispot Green Laser",
      image: "assets/equipment/multispot_green_laser_2.jpg",
      altText: "Multispot Green Laser",
      category: "Pattern Scanning Laser",
      displayOrder: 21,
      isActive: true,
      published: true
    },
    {
      id: "lumera-i-zeiss",
      name: "Lumera i Zeiss Surgical Microscope",
      image: "assets/equipment/lumera_i_zeiss_microscope.jpg",
      altText: "Lumera i Zeiss Surgical Microscope",
      category: "Carl Zeiss Microsurgical Suite",
      displayOrder: 22,
      isActive: true,
      published: true
    },
    {
      id: "luxor-ophthalmic-microscope",
      name: "LuxOR Surgical Ophthalmic Microscope",
      image: "assets/equipment/luxor_ophthalmic_microscope.jpg",
      altText: "LuxOR Surgical Ophthalmic Microscope",
      category: "Alcon Red-Reflex Surgical Microscope",
      displayOrder: 23,
      isActive: true,
      published: true
    }
  ]
};

class Store {
  constructor() {
    this.key = "anugraha_hospital_store_v1";
    this.data = this.load();
    this.initRealtimeSync();
  }

  load() {
    try {
      const saved = localStorage.getItem(this.key);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with defaults to ensure all fields exist safely and modifications are retained
        return {
          ...DEFAULT_DATA,
          ...parsed,
          brand: { ...DEFAULT_DATA.brand, ...(parsed.brand || {}) },
          homepage: { 
            ...DEFAULT_DATA.homepage, 
            ...(parsed.homepage || {}),
            primaryCta: { ...DEFAULT_DATA.homepage.primaryCta, ...(parsed.homepage?.primaryCta || {}) },
            secondaryCta: { ...DEFAULT_DATA.homepage.secondaryCta, ...(parsed.homepage?.secondaryCta || {}) },
            trustStats: { ...DEFAULT_DATA.homepage.trustStats, ...(parsed.homepage?.trustStats || {}) },
            sections: { ...DEFAULT_DATA.homepage.sections, ...(parsed.homepage?.sections || {}) }
          },
          about: { 
            ...DEFAULT_DATA.about, 
            ...(parsed.about || {}),
            coreValues: parsed.about?.coreValues || DEFAULT_DATA.about.coreValues,
            milestones: parsed.about?.milestones || DEFAULT_DATA.about.milestones
          },
          stats: { ...DEFAULT_DATA.stats, ...(parsed.stats || {}) },
          patientResources: { ...DEFAULT_DATA.patientResources, ...(parsed.patientResources || {}) },
          facilities: parsed.facilities || DEFAULT_DATA.facilities,
          services: (() => {
            const current = parsed.services || [];
            if (!current.length || current.length < DEFAULT_DATA.services.length || !current.find(s => s.id === 'cataract')) {
              const map = new Map();
              DEFAULT_DATA.services.forEach(s => map.set(s.id, s));
              current.forEach(s => {
                if (map.has(s.id)) {
                  map.set(s.id, { ...map.get(s.id), ...s, clinicalDetails: { ...map.get(s.id).clinicalDetails, ...(s.clinicalDetails || {}) } });
                } else {
                  map.set(s.id, s);
                }
              });
              return Array.from(map.values());
            }
            return current;
          })(),
          leadership: (() => {
            const current = parsed.leadership || [];
            if (!current.length || current.length < DEFAULT_DATA.leadership.length || !current.find(l => l.id === 'dr-poornima-patil')) {
              const map = new Map();
              DEFAULT_DATA.leadership.forEach(d => map.set(d.id, d));
              current.forEach(d => {
                if (map.has(d.id)) {
                  map.set(d.id, { ...map.get(d.id), ...d });
                } else {
                  map.set(d.id, d);
                }
              });
              return Array.from(map.values());
            }
            return current;
          })(),
          administration: parsed.administration || DEFAULT_DATA.administration,
          equipment: (() => {
            const current = parsed.equipment || [];
            if (!current.length || current.length < DEFAULT_DATA.equipment.length || !current.find(e => e.id === 'wavelight-ex-500')) {
              return DEFAULT_DATA.equipment;
            }
            const map = new Map();
            DEFAULT_DATA.equipment.forEach(e => map.set(e.id, e));
            current.forEach(e => {
              if (map.has(e.id)) {
                map.set(e.id, { ...map.get(e.id), ...e });
              } else {
                map.set(e.id, e);
              }
            });
            return Array.from(map.values());
          })(),
          partnerships: parsed.partnerships || DEFAULT_DATA.partnerships,
          academics: parsed.academics || DEFAULT_DATA.academics,
          faqs: parsed.faqs || DEFAULT_DATA.faqs,
          empanelments: parsed.empanelments || DEFAULT_DATA.empanelments,
          news: parsed.news || DEFAULT_DATA.news,
          gallery: parsed.gallery || DEFAULT_DATA.gallery
        };
      }
    } catch (e) {
      console.warn("Failed to load store from localStorage", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  sync() {
    this.data = this.load();
    return this.data;
  }

  initRealtimeSync() {
    if (typeof window === 'undefined') return;

    // 1. Initial remote fetch on page load from Supabase Cloud / API
    this.fetchRemoteData();

    // 2. Connect to Supabase Realtime WebSocket for live cross-device sync
    if (window.cmsClient && typeof window.cmsClient.subscribeToCMSChanges === 'function') {
      window.cmsClient.subscribeToCMSChanges(() => {
        this.fetchRemoteData(true);
      });
    }

    // 3. Listen to BroadcastChannel for real-time cross-tab sync
    if ('BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('anugraha_store_channel');
        this.channel.onmessage = (event) => {
          if (event.data && event.data.type === 'STORE_UPDATED') {
            this.data = this.load();
            window.dispatchEvent(new CustomEvent('anugraha-store-updated', { detail: this.data }));
          }
        };
      } catch (e) {
        // fallback
      }
    }

    // 4. Listen to window storage events (cross-tab sync fallback)
    window.addEventListener('storage', (e) => {
      if (e.key === this.key && e.newValue) {
        this.data = this.load();
        window.dispatchEvent(new CustomEvent('anugraha-store-updated', { detail: this.data }));
      }
    });

    // 5. Background safety polling sync (every 15s) to detect updates if WebSocket drops
    setInterval(() => {
      this.fetchRemoteData(true);
    }, 15000);

    // 6. Re-check on tab focus / visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.fetchRemoteData(true);
      }
    });
  }

  async fetchRemoteData(silent = false) {
    if (typeof window === 'undefined') return;
    try {
      let remoteData = null;

      // 1. Try Supabase Cloud PostgreSQL First
      if (window.cmsClient && typeof window.cmsClient.fetchAllCMSData === 'function') {
        try {
          const supabaseData = await window.cmsClient.fetchAllCMSData();
          if (supabaseData && (supabaseData.brand || supabaseData.homepage || supabaseData.equipment)) {
            remoteData = supabaseData;
          }
        } catch (e) {
          // fallback to rest
        }
      }

      // 2. Fallback to /api/store or data/store.json if Supabase not configured
      if (!remoteData) {
        const endpoints = ['/api/store', 'data/store.json'];
        for (const endpoint of endpoints) {
          try {
            const res = await fetch(`${endpoint}?t=${Date.now()}`, {
              headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
            });
            if (res.ok) {
              remoteData = await res.json();
              if (remoteData && remoteData.brand) break;
            }
          } catch (err) {
            // try next endpoint
          }
        }
      }

      if (remoteData && (remoteData.brand || remoteData.homepage)) {
        const remoteTime = remoteData._lastUpdatedEpoch || remoteData.lastUpdatedEpoch || 0;
        
        const merged = {
          ...DEFAULT_DATA,
          ...remoteData,
          brand: { ...DEFAULT_DATA.brand, ...(remoteData.brand || {}) },
          homepage: { ...DEFAULT_DATA.homepage, ...(remoteData.homepage || {}) },
          stats: { ...DEFAULT_DATA.stats, ...(remoteData.stats || {}) },
          about: { ...DEFAULT_DATA.about, ...(remoteData.about || {}) },
          facilities: remoteData.facilities || DEFAULT_DATA.facilities,
          services: remoteData.services || DEFAULT_DATA.services,
          leadership: remoteData.leadership || DEFAULT_DATA.leadership,
          administration: remoteData.administration || DEFAULT_DATA.administration,
          equipment: remoteData.equipment || DEFAULT_DATA.equipment,
          partnerships: remoteData.partnerships || DEFAULT_DATA.partnerships
        };

        const currentLocalStr = localStorage.getItem(this.key);
        const mergedJsonStr = JSON.stringify(merged);

        // Only dispatch update if the actual merged data content has genuinely changed
        if (!currentLocalStr || mergedJsonStr !== currentLocalStr) {
          this.data = merged;
          localStorage.setItem(this.key, mergedJsonStr);
          if (remoteTime) {
            localStorage.setItem('anugraha_last_saved_time_epoch', String(remoteTime));
          }
          
          window.dispatchEvent(new CustomEvent('anugraha-store-updated', { detail: this.data }));
        }
      }
    } catch (e) {
      if (!silent) console.warn("Remote store sync skipped:", e);
    }
  }

  save() {
    try {
      const nowEpoch = Date.now();
      this.data._lastUpdatedEpoch = nowEpoch;

      const jsonStr = JSON.stringify(this.data);
      localStorage.setItem(this.key, jsonStr);
      localStorage.setItem('anugraha_last_saved_time_epoch', String(nowEpoch));
      
      const timestamp = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem('anugraha_last_saved_time', timestamp);
      
      if (typeof window !== 'undefined') {
        // 1. Dispatch local event for active view
        window.dispatchEvent(new CustomEvent('anugraha-store-updated', { detail: this.data }));

        // 2. Broadcast to all open tabs
        if (this.channel) {
          this.channel.postMessage({ type: 'STORE_UPDATED', epoch: nowEpoch });
        }

        // 3. Persist to Supabase Cloud PostgreSQL
        if (window.cmsClient) {
          if (this.data.brand) window.cmsClient.saveSetting('brand', this.data.brand);
          if (this.data.homepage) window.cmsClient.saveSetting('homepage', this.data.homepage);
          if (this.data.about) window.cmsClient.saveSetting('about', this.data.about);
          if (this.data.stats) window.cmsClient.saveSetting('stats', this.data.stats);
          if (this.data.patientResources) window.cmsClient.saveSetting('patientResources', this.data.patientResources);
        }

        // 4. Post to Server API / disk backup for multi-device sync
        fetch('/api/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: jsonStr
        }).catch(err => {
          console.log("Server API sync:", err.message);
        });
      }
    } catch (e) {
      console.error("Failed to save store to localStorage", e);
    }
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.save();
  }

  // BRAND & GENERAL
  getBrand() {
    return this.data.brand || DEFAULT_DATA.brand;
  }

  updateBrand(fields) {
    this.data.brand = { ...this.getBrand(), ...fields };
    this.save();
  }

  // HOMEPAGE
  getHomepage() {
    return this.data.homepage || DEFAULT_DATA.homepage;
  }

  updateHomepage(fields) {
    this.data.homepage = { ...this.getHomepage(), ...fields };
    this.save();
  }

  // ABOUT US
  getAbout() {
    return this.data.about || DEFAULT_DATA.about;
  }

  updateAbout(fields) {
    this.data.about = { ...this.getAbout(), ...fields };
    this.save();
  }

  // STATS
  getStats() {
    return this.data.stats || DEFAULT_DATA.stats;
  }

  updateStats(fields) {
    this.data.stats = { ...this.getStats(), ...fields };
    this.save();
  }

  // LEADERSHIP
  getLeadership() {
    return this.data.leadership || DEFAULT_DATA.leadership;
  }

  getLeaderById(id) {
    return this.getLeadership().find(l => l.id === id);
  }

  updateLeadership(id, fields) {
    if (!this.data.leadership) this.data.leadership = [...DEFAULT_DATA.leadership];
    const idx = this.data.leadership.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.data.leadership[idx] = { ...this.data.leadership[idx], ...fields };
      this.save();
      if (window.cmsClient && typeof window.cmsClient.saveDoctor === 'function') {
        window.cmsClient.saveDoctor(this.data.leadership[idx]);
      }
    }
  }

  addLeadership(leader) {
    if (!this.data.leadership) this.data.leadership = [...DEFAULT_DATA.leadership];
    const newId = leader.id || ('doc-' + Date.now());
    this.data.leadership.push({ id: newId, displayOrder: this.data.leadership.length + 1, published: true, ...leader });
    this.save();
    return newId;
  }

  deleteLeadership(id) {
    if (!this.data.leadership) return;
    this.data.leadership = this.data.leadership.filter(l => l.id !== id);
    this.save();
  }

  // ADMINISTRATION TEAM
  getAdministration() {
    return this.data.administration || DEFAULT_DATA.administration;
  }

  updateAdminMember(id, fields) {
    if (!this.data.administration) this.data.administration = [...DEFAULT_DATA.administration];
    const idx = this.data.administration.findIndex(m => m.id === id);
    if (idx !== -1) {
      this.data.administration[idx] = { ...this.data.administration[idx], ...fields };
      this.save();
      if (window.cmsClient && typeof window.cmsClient.saveAdministration === 'function') {
        window.cmsClient.saveAdministration(this.data.administration[idx]);
      }
    }
  }

  addAdminMember(member) {
    if (!this.data.administration) this.data.administration = [...DEFAULT_DATA.administration];
    const newId = member.id || ('admin-' + Date.now());
    this.data.administration.push({ id: newId, displayOrder: this.data.administration.length + 1, published: true, ...member });
    this.save();
    return newId;
  }

  deleteAdminMember(id) {
    if (!this.data.administration) return;
    this.data.administration = this.data.administration.filter(m => m.id !== id);
    this.save();
  }

  // FACILITIES (Hospitals & Vision Centers)
  getFacilities() {
    return this.data.facilities || DEFAULT_DATA.facilities;
  }

  getFacilityById(id) {
    return this.getFacilities().find(f => f.id === id);
  }

  updateFacility(id, fields) {
    if (!this.data.facilities) this.data.facilities = [...DEFAULT_DATA.facilities];
    const idx = this.data.facilities.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.data.facilities[idx] = { ...this.data.facilities[idx], ...fields };
      this.save();
      if (window.cmsClient && typeof window.cmsClient.saveFacility === 'function') {
        window.cmsClient.saveFacility(this.data.facilities[idx]);
      }
    }
  }

  addFacility(fac) {
    if (!this.data.facilities) this.data.facilities = [...DEFAULT_DATA.facilities];
    const newId = fac.id || ('fac-' + Date.now());
    this.data.facilities.push({ id: newId, displayOrder: this.data.facilities.length + 1, published: true, ...fac });
    this.save();
    return newId;
  }

  deleteFacility(id) {
    if (!this.data.facilities) return;
    this.data.facilities = this.data.facilities.filter(f => f.id !== id);
    this.save();
  }

  // SERVICES
  getServices() {
    return this.data.services || DEFAULT_DATA.services;
  }

  getServiceById(idOrSlug) {
    if (!idOrSlug) return null;
    const clean = String(idOrSlug).toLowerCase().trim();
    const list = this.getServices();
    return list.find(s => 
      (s.id && s.id.toLowerCase() === clean) || 
      (s.slug && s.slug.toLowerCase() === clean) ||
      (s.id === 'cataract' && clean === 'cataract-phaco') ||
      (s.id === 'cataract-phaco' && clean === 'cataract') ||
      (s.id === 'vitreo-retinal-surgery' && (clean === 'retina' || clean === 'vitreoretinal')) ||
      (s.id === 'paediatric-squint' && (clean === 'pediatric' || clean === 'pediatric-squint' || clean === 'squint')) ||
      (s.id === 'cornea-lasik-eye-bank' && (clean === 'cornea' || clean === 'cornea-lasik' || clean === 'eye-bank')) ||
      (s.id === 'oculoplasty' && (clean === 'oculoplasty-surgery' || clean === 'oculoplastic')) ||
      (s.id === 'lasik' && (clean === 'lasik-service' || clean === 'lasik-contoura')) ||
      (s.id === 'ocular-trauma' && (clean === 'trauma' || clean === 'emergency-trauma'))
    );
  }

  updateService(id, fields) {
    if (!this.data.services) this.data.services = [...DEFAULT_DATA.services];
    const idx = this.data.services.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.data.services[idx] = { ...this.data.services[idx], ...fields };
      this.save();
      if (window.cmsClient && typeof window.cmsClient.saveService === 'function') {
        window.cmsClient.saveService(this.data.services[idx]);
      }
    }
  }

  updateServiceImage(id, newPath) {
    this.updateService(id, { imagePlaceholder: newPath, heroImage: newPath });
  }

  // ACADEMICS
  getAcademics() {
    return this.data.academics || DEFAULT_DATA.academics;
  }

  getAcademicProgramById(id) {
    let lookupId = id;
    if (lookupId === 'bscoptometry') lookupId = 'bsc-optometry';
    return this.getAcademics().find(p => p.id === lookupId);
  }

  updateAcademicProgram(id, updatedData) {
    if (!this.data.academics) this.data.academics = [...DEFAULT_DATA.academics];
    const index = this.data.academics.findIndex(p => p.id === id);
    if (index !== -1) {
      this.data.academics[index] = { ...this.data.academics[index], ...updatedData };
      this.save();
    }
  }

  // PATIENT RESOURCES
  getPatientResources() {
    return this.data.patientResources || DEFAULT_DATA.patientResources;
  }

  updatePatientResources(fields) {
    this.data.patientResources = { ...this.getPatientResources(), ...fields };
    this.save();
  }

  // FAQS
  getFaqs() {
    return this.data.faqs || DEFAULT_DATA.faqs;
  }

  getFaqById(id) {
    return this.getFaqs().find(f => f.id === id);
  }

  updateFaq(id, fields) {
    if (!this.data.faqs) this.data.faqs = [...DEFAULT_DATA.faqs];
    const idx = this.data.faqs.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.data.faqs[idx] = { ...this.data.faqs[idx], ...fields };
      this.save();
    }
  }

  addFaq(faq) {
    if (!this.data.faqs) this.data.faqs = [...DEFAULT_DATA.faqs];
    const newId = faq.id || ('faq-' + Date.now());
    this.data.faqs.push({ id: newId, displayOrder: this.data.faqs.length + 1, published: true, ...faq });
    this.save();
    return newId;
  }

  deleteFaq(id) {
    if (!this.data.faqs) return;
    this.data.faqs = this.data.faqs.filter(f => f.id !== id);
    this.save();
  }

  // EMPANELMENTS / INSURANCE
  getEmpanelments() {
    return this.data.empanelments || DEFAULT_DATA.empanelments;
  }

  addEmpanelment(item) {
    if (!this.data.empanelments) this.data.empanelments = [...DEFAULT_DATA.empanelments];
    this.data.empanelments.push({ displayOrder: this.data.empanelments.length + 1, published: true, ...item });
    this.save();
  }

  updateEmpanelment(code, fields) {
    if (!this.data.empanelments) this.data.empanelments = [...DEFAULT_DATA.empanelments];
    const idx = this.data.empanelments.findIndex(e => e.code === code);
    if (idx !== -1) {
      this.data.empanelments[idx] = { ...this.data.empanelments[idx], ...fields };
      this.save();
    }
  }

  removeEmpanelment(code) {
    if (!this.data.empanelments) return;
    this.data.empanelments = this.data.empanelments.filter(e => e.code !== code);
    this.save();
  }

  // NEWS
  getNews() {
    return this.data.news || DEFAULT_DATA.news;
  }

  addNewsItem(item) {
    if (!this.data.news) this.data.news = [...DEFAULT_DATA.news];
    const newId = 'news-' + Date.now();
    this.data.news.unshift({ id: newId, date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), published: true, ...item });
    this.save();
    return newId;
  }

  updateNewsItem(id, fields) {
    if (!this.data.news) this.data.news = [...DEFAULT_DATA.news];
    const idx = this.data.news.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.data.news[idx] = { ...this.data.news[idx], ...fields };
      this.save();
    }
  }

  removeNewsItem(id) {
    if (!this.data.news) return;
    this.data.news = this.data.news.filter(n => n.id !== id);
    this.save();
  }

  // MEDIA & GALLERY
  getGallery() {
    return this.data.gallery || DEFAULT_DATA.gallery;
  }

  addGalleryItem(item) {
    if (!this.data.gallery) this.data.gallery = [...DEFAULT_DATA.gallery];
    const newId = item.id || `gal_${Date.now()}`;
    const galleryEntry = { 
      id: newId, 
      uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), 
      ...item 
    };
    this.data.gallery.unshift(galleryEntry);
    this.save();
    if (window.cmsClient && typeof window.cmsClient.saveGalleryItem === 'function') {
      window.cmsClient.saveGalleryItem(galleryEntry);
    }
    return newId;
  }

  updateGalleryItem(id, fields) {
    if (!this.data.gallery) this.data.gallery = [...DEFAULT_DATA.gallery];
    const idx = this.data.gallery.findIndex(g => g.id === id);
    if (idx !== -1) {
      this.data.gallery[idx] = { ...this.data.gallery[idx], ...fields };
      this.save();
    }
  }

  removeGalleryItem(id) {
    if (!this.data.gallery) return;
    const item = this.data.gallery.find(g => g.id === id);
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    this.save();
    if (window.cmsClient && typeof window.cmsClient.deleteGalleryItem === 'function') {
      window.cmsClient.deleteGalleryItem(id);
    }
    if (item && item.src && window.cmsClient && typeof window.cmsClient.deleteFromCloudStorage === 'function') {
      window.cmsClient.deleteFromCloudStorage(item.src);
    }
  }

  // Real Dynamic Image Usage Tracker
  getImageUsage(src) {
    if (!src) return [];
    const usedOn = [];
    const clean = s => (s || '').trim();

    // Check Brand Logo
    if (clean(this.data.brand?.logo) === clean(src)) {
      usedOn.push("Official Website Logo (Header & Footer)");
    }

    // Check Homepage Hero
    if (clean(this.data.homepage?.heroImage) === clean(src)) {
      usedOn.push("Homepage Hero Background Banner");
    }

    // Check Doctor / Leadership Profiles
    (this.data.leadership || []).forEach(doc => {
      if (clean(doc.photo) === clean(src)) {
        usedOn.push(`${doc.name} (Doctor Profile Photo)`);
      }
    });

    // Check Administration Team Member Profiles
    (this.data.administration || []).forEach(member => {
      if (clean(member.photo) === clean(src)) {
        usedOn.push(`${member.name} (Admin Team Portrait)`);
      }
    });

    // Check Base Hospitals & Vision Centers
    (this.data.facilities || []).forEach(fac => {
      if (clean(fac.heroImage) === clean(src) || clean(fac.mainImage) === clean(src) || (fac.galleryImages || []).includes(src)) {
        usedOn.push(`${fac.name} (${fac.type === 'base' ? 'Hospital' : 'Vision Center'} Page)`);
      }
    });

    // Check Services & Specialties
    (this.data.services || []).forEach(srv => {
      if (clean(srv.heroImage) === clean(src) || clean(srv.imagePlaceholder) === clean(src)) {
        usedOn.push(`${srv.title} (Specialty Hero Banner)`);
      }
    });

    // Check News Articles
    (this.data.news || []).forEach(newsItem => {
      if (clean(newsItem.image) === clean(src)) {
        usedOn.push(`News: "${newsItem.title.slice(0, 32)}..."`);
      }
    });

    // Check Video Thumbnails
    (this.data.videos || []).forEach(v => {
      if (clean(v.thumbnail) === clean(src)) {
        usedOn.push(`Video: "${v.title.slice(0, 32)}..."`);
      }
    });

    return usedOn;
  }

  getAuditInfo() {
    return {
      lastModified: localStorage.getItem('anugraha_last_saved_time') || 'Active Session (Synced)',
      lastModifiedBy: 'web@admin (Super Admin)',
      createdDate: '15 Aug 2001 (25-Year Foundation)',
      status: 'Live & Synchronized (Frontend Prototype Store)'
    };
  }

  getDataGaps() {
    return this.data.dataGaps || DEFAULT_DATA.dataGaps || {};
  }

  getVideos() {
    return this.data.videos || DEFAULT_DATA.videos;
  }

  getHandouts() {
    return this.data.handouts || DEFAULT_DATA.handouts;
  }

  getRedirects() {
    return this.data.seoRedirects || DEFAULT_DATA.seoRedirects;
  }

  getPartnerships() {
    return (this.data.partnerships || DEFAULT_DATA.partnerships || []).filter(p => p.published !== false);
  }

  getPartnershipById(id) {
    return this.getPartnerships().find(p => p.id === id);
  }

  getEquipment() {
    return (this.data.equipment || DEFAULT_DATA.equipment || []).filter(e => e.published !== false && e.isActive !== false);
  }

  getAllEquipment() {
    return this.data.equipment || DEFAULT_DATA.equipment || [];
  }

  getEquipmentById(id) {
    return this.getAllEquipment().find(e => e.id === id);
  }

  updateEquipment(id, fields) {
    if (!this.data.equipment) this.data.equipment = [...DEFAULT_DATA.equipment];
    const idx = this.data.equipment.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.data.equipment[idx] = { ...this.data.equipment[idx], ...fields };
      this.save();
      if (window.cmsClient && typeof window.cmsClient.saveEquipment === 'function') {
        window.cmsClient.saveEquipment(this.data.equipment[idx]);
      }
    }
  }

  addEquipment(item) {
    if (!this.data.equipment) this.data.equipment = [...DEFAULT_DATA.equipment];
    const newId = item.id || ('eq-' + Date.now());
    this.data.equipment.push({
      id: newId,
      displayOrder: this.data.equipment.length + 1,
      isActive: true,
      published: true,
      ...item
    });
    this.save();
    return newId;
  }

  deleteEquipment(id) {
    if (!this.data.equipment) return;
    this.data.equipment = this.data.equipment.filter(e => e.id !== id);
    this.save();
    if (window.cmsClient && typeof window.cmsClient.deleteEquipment === 'function') {
      window.cmsClient.deleteEquipment(id);
    }
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
