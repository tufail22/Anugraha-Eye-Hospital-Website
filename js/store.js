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
      designation: "Founder, Chairman & Chief Ophthalmic Surgeon",
      specialization: "Cataract (Phaco), Refractive Surgery (LASIK) & Anterior Segment",
      degrees: "MBBS, MS, FCRS, FAICO",
      experience: "25+ Years Experience",
      hospital: "Vijayapura & Kalaburagi Campuses",
      location: "Vijayapura / Kalaburagi",
      areasOfExpertise: "Micro-incision Phacoemulsification, Premium IOL Implantation, Contoura Vision LASIK, Community Ophthalmology",
      languages: "Kannada, English, Hindi, Marathi",
      photo: "assets/doctors/dr_lingadalli.jpg",
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
      designation: "Medical Director & Senior Glaucoma Specialist",
      specialization: "General Ophthalmology, Glaucoma & Medical Retina",
      degrees: "MBBS, DOMS, FGEI",
      experience: "20+ Years Experience",
      hospital: "Vijayapura Campus",
      location: "Vijayapura",
      areasOfExpertise: "Comprehensive Eye Care, Glaucoma Diagnostics, Medical Retina, Ophthalmic Administration",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_malini.jpg",
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
      id: "dr-rashmi-biradar",
      name: "Dr. Rashmi Biradar",
      title: "Senior Consultant",
      designation: "Senior Consultant Phaco Surgeon & Cornea Specialist",
      specialization: "Cataract Surgery, Cornea, LASIK & Eye Bank Services",
      degrees: "MBBS, DOMS, DNB (Ophthalmology)",
      experience: "15+ Years Experience",
      hospital: "Vijayapura Base Hospital",
      location: "Vijayapura",
      areasOfExpertise: "Micro-incision Phacoemulsification, Premium IOL Implantation, Corneal Disorders, Refractive Procedures, Eye Banking",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_rashmi_biradar.jpg",
      displayOrder: 3,
      published: true,
      seoTitle: "Dr. Rashmi Biradar | Senior Consultant Phaco & Cornea | Anugraha Eye Hospital",
      seoDesc: "Profile of Dr. Rashmi Biradar, Senior Consultant Phaco Surgeon and Cornea Specialist at Anugraha Eye Hospital.",
      bio: "Accomplished consultant ophthalmologist specializing in advanced sutureless cataract surgery, phacoemulsification, premium intraocular lens implantation, corneal dystrophies, and eye bank operations.",
      awards: [
        { title: "Clinical Excellence in Cataract Care", year: "2020", organization: "State Ophthalmic Society" }
      ]
    },
    {
      id: "dr-ravikumar-goud",
      name: "Dr. Ravikumar B. Goud",
      title: "Consultant Surgeon",
      designation: "Consultant Phaco, Refractive Surgeon & Cornea Specialist",
      specialization: "Cataract Surgery, Cornea, Refractive LASIK & Eye Bank",
      degrees: "MBBS, MS (Ophthalmology), FCRS",
      experience: "12+ Years Experience",
      hospital: "Vijayapura & Kalaburagi Campuses",
      location: "Vijayapura / Kalaburagi",
      areasOfExpertise: "Phacoemulsification, Contoura Vision LASIK, Corneal Collagen Cross-Linking (C3R), Pterygium Autografting",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_ravikumar_goud.jpg",
      displayOrder: 4,
      published: true,
      seoTitle: "Dr. Ravikumar B. Goud | Phaco & Refractive Consultant | Anugraha Eye Hospital",
      seoDesc: "Profile of Dr. Ravikumar B. Goud, Consultant Phaco, Refractive Surgeon and Cornea Specialist at Anugraha Eye Hospital.",
      bio: "High-volume refractive and phacoemulsification surgeon delivering top-tier visual outcomes in cataract extractions, blade-free laser vision correction, and corneal preservation procedures.",
      awards: [
        { title: "Young Ophthalmic Achiever Award", year: "2019", organization: "Karnataka Ophthalmic Forum" }
      ]
    },
    {
      id: "dr-anand-baligar",
      name: "Dr. Anand Baligar",
      title: "Vitreo-Retinal Surgeon",
      designation: "Consultant Vitreo-Retinal Surgeon",
      specialization: "Vitreo-Retinal Surgery, Diabetic Retinopathy & Macular Diseases",
      degrees: "MBBS, MS (Ophthalmology), FVRS, FAICO",
      experience: "14+ Years Experience",
      hospital: "Vijayapura & Kalaburagi Campuses",
      location: "Vijayapura / Kalaburagi",
      areasOfExpertise: "Pars Plana Vitrectomy, Retinal Detachment Repair, Diabetic Retinopathy Laser, Anti-VEGF Injections, Macular Hole Surgery",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_anand_baligar.jpg",
      displayOrder: 5,
      published: true,
      seoTitle: "Dr. Anand Baligar | Vitreo-Retinal Surgeon | Anugraha Eye Hospital",
      seoDesc: "Expert vitreo-retinal surgical care by Dr. Anand Baligar at Anugraha Eye Hospital.",
      bio: "Fellowship-trained Vitreo-Retinal surgeon with extensive expertise in complex retinal detachments, diabetic eye disease interventions, micro-incision vitrectomy surgery (MIVS), and macular laser photocoagulation.",
      awards: [
        { title: "Distinguished Vitreo-Retina Fellowship Citation", year: "2018", organization: "All India Ophthalmological Society" }
      ]
    },
    {
      id: "dr-soundarya-patil",
      name: "Dr. Soundarya Patil",
      title: "Paediatric Ophthalmologist",
      designation: "Consultant Paediatric Ophthalmologist, Squint & Ocular Trauma Specialist",
      specialization: "Pediatric Ophthalmology, Strabismus & Emergency Ocular Trauma",
      degrees: "MBBS, MS (Ophthalmology), FPOS",
      experience: "10+ Years Experience",
      hospital: "Vijayapura Base Hospital",
      location: "Vijayapura",
      areasOfExpertise: "Paediatric Vision Screening, Squint (Strabismus) Surgery, Amblyopia (Lazy Eye) Therapy, Emergency Ocular Trauma",
      languages: "Kannada, English, Hindi",
      photo: "assets/doctors/dr_soundarya_patil.jpg",
      displayOrder: 6,
      published: true,
      seoTitle: "Dr. Soundarya Patil | Paediatric Ophthalmologist & Squint Surgeon | Anugraha Eye Hospital",
      seoDesc: "Expert paediatric ophthalmology, lazy eye therapy, and squint correction by Dr. Soundarya Patil.",
      bio: "Dedicated paediatric ophthalmologist and strabismus specialist providing child-friendly visual evaluations, non-surgical and surgical squint correction, amblyopia rehabilitation, and emergency trauma management.",
      awards: [
        { title: "Excellence in Paediatric Eye Care Award", year: "2021", organization: "Child Health Ophthalmic Initiative" }
      ]
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
      id: "cataract-services",
      title: "Cataract Services & Phacoemulsification",
      shortDesc: "Sutureless micro-incision cataract surgery with premium foldable intraocular lens implantation.",
      fullDesc: "Cataract surgery is the removal of the natural lens of the eye that has developed an opacification, which is referred to as a cataract. Metabolic changes of the crystalline lens fibers over time lead to the development of the cataract and loss of optical transparency. Many people develop cataracts as a result of aging, diabetes, or trauma. At Anugraha Eye Hospital, we perform high-volume, sutureless micro-incision cataract surgery using world-class phacoemulsification systems with custom monofocal, toric, and multifocal IOLs.",
      category: "Surgical Ophthalmology",
      desc: "High-volume, micro-incision cataract surgery using advanced phacoemulsification suites with premium intraocular lenses. Over 50,000 free cataract procedures conducted across North Karnataka.",
      imagePlaceholder: "assets/services/cataract_surgery.jpg",
      heroImage: "assets/services/cataract_surgery.jpg",
      bulletPoints: [
        "Sutureless Micro-Incision Phacoemulsification (MICS)",
        "Premium Monofocal, Multifocal, and Toric IOL Implants",
        "Topical drop anesthesia with zero injection pain",
        "Same-day daycare discharge with rapid visual recovery"
      ],
      symptoms: "Cloudy or blurry vision, colors appearing faded, glare and halos around lights, difficulty driving at night, frequent changes in eyeglass prescription.",
      diagnosis: "Dilated Slit-Lamp Biomicroscopy, Optical Biometry (IOL Master 700), Non-Contact Tonometry, Specular Microscopy.",
      treatment: "Blade-free micro-incision phacoemulsification, ultrasonic lens emulsification, Foldable Hydrophobic Monofocal/Multifocal/Toric IOL implantation.",
      technology: "Alcon Centurion & Infiniti Vision Systems, Zeiss Lumera Surgical Microscopes, IOLMaster 700.",
      relatedDoctorIds: ["dr-rashmi-biradar", "dr-ravikumar-goud", "dr-lingadalli"],
      relatedDoctors: ["Dr. Rashmi Biradar", "Dr. Ravikumar B. Goud", "Dr. Prabhugouda B. Lingadalli"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      faq: "Cataract surgery takes approximately 10 to 15 minutes per eye under topical eye drop anesthesia with zero pain and same-day discharge.",
      displayOrder: 1,
      published: true
    },
    {
      id: "phaco-refractive",
      title: "Phaco and Refractive Surgery",
      shortDesc: "Ultrasonic cataract emulsification and advanced astigmatic / refractive correction.",
      fullDesc: "Phacoemulsification is a modern cataract surgery method in which the eye's internal lens is emulsified with an ultrasonic handpiece and aspirated from the eye. Aspirated fluids are replaced with irrigation of balanced salt solution, thus maintaining the anterior chamber depth and intraocular architecture. This allows surgeons to correct pre-existing corneal astigmatism and refractive errors simultaneously during cataract extraction.",
      category: "Refractive Cataract Surgery",
      desc: "Modern phacoemulsification cataract surgery combined with customized intraocular refractive correction.",
      imagePlaceholder: "assets/services/cataract_surgery.jpg",
      heroImage: "assets/services/cataract_surgery.jpg",
      bulletPoints: [
        "Ultrasonic Cold Phaco Handpiece Technology",
        "Continuous anterior chamber depth stabilization",
        "Custom Toric IOL calculation for astigmatism",
        "Aspheric optical design for enhanced contrast sensitivity"
      ],
      symptoms: "Progressive blurriness, reduced contrast sensitivity, double vision in one eye, difficulty reading in dim light.",
      diagnosis: "Wavefront Aberrometry, Corneal Topography, IOLMaster Optical Biometry, Endothelial Cell Count.",
      treatment: "Phacoemulsification with in-the-bag foldable IOL placement, limbal relaxing incisions for minor astigmatism.",
      technology: "Alcon Centurion Active Sentry, Zeiss OPMI Lumera 700.",
      relatedDoctorIds: ["dr-lingadalli", "dr-ravikumar-goud"],
      relatedDoctors: ["Dr. Prabhugouda B. Lingadalli", "Dr. Ravikumar B. Goud"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      displayOrder: 2,
      published: true
    },
    {
      id: "vitreo-retinal",
      title: "Vitreo Retinal Surgery",
      shortDesc: "Advanced pars plana vitrectomy, retinal detachment surgery & diabetic retinopathy management.",
      fullDesc: "The vitreo-retinal system is designed to perform safe and effective treatment for a variety of conditions affecting the back of the eye. Vitrectomy is surgery to remove some or all of the vitreous humor from the eye. Our dedicated retina wing provides advanced medical and surgical retinal care with modern 25G micro-incision vitrectomy and high-precision laser photocoagulation.",
      category: "Vitreo-Retinal Surgery",
      desc: "Comprehensive vitreo-retinal department treating diabetic retinopathy, retinal detachments, macular holes, and ocular trauma.",
      imagePlaceholder: "assets/services/retina_care.jpg",
      heroImage: "assets/services/retina_care.jpg",
      bulletPoints: [
        "Diabetic Retinopathy Management & Laser Photocoagulation",
        "Retinal Detachment Repair & Scleral Buckling",
        "Macular Hole and Epiretinal Membrane Peeling",
        "Intravitreal Anti-VEGF Injections (Lucentis, Eylea, Accentrix)",
        "Opening anterior and posterior vitreous opacifications",
        "Micro-Incision Vitrectomy Surgery (25G MIVS)"
      ],
      symptoms: "Sudden appearance of floaters or flashes of light, a dark shadow or curtain falling over the field of vision, blurred central vision, distorted straight lines.",
      diagnosis: "High-Definition Macular OCT, Fundus Fluorescein Angiography (FFA), B-Scan Ultrasound, Dilated Indirect Ophthalmoscopy.",
      treatment: "25-Gauge Pars Plana Vitrectomy, Endolaser Photocoagulation, Gas/Silicone Oil Tamponade, Scleral Buckling.",
      technology: "Alcon Constellation Vision System, Zeiss Cirrus HD-OCT, 532nm Green Retinal Laser.",
      relatedDoctorIds: ["dr-anand-baligar"],
      relatedDoctors: ["Dr. Anand Baligar"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      displayOrder: 3,
      published: true
    },
    {
      id: "paediatric-squint",
      title: "Paediatric Squint & Amblyopia",
      shortDesc: "Specialized child eye care, strabismus muscle surgery, amblyopia patching & school vision screening.",
      fullDesc: "Paediatric ophthalmology focuses on the unique eye problems that affect children. Strabismus (squint) is a condition in which the eyes do not properly align with each other when looking at an object. Amblyopia (lazy eye) is a disorder of sight in which the brain fails to process inputs from one eye and over time favors the other eye. Early diagnosis and timely intervention prevent permanent vision loss in young children.",
      category: "Paediatric Ophthalmology",
      desc: "Dedicated paediatric eye care, surgical squint correction, lazy eye rehabilitation, and pediatric opticals.",
      imagePlaceholder: "assets/services/pediatric_ophthalmology.jpg",
      heroImage: "assets/services/pediatric_ophthalmology.jpg",
      bulletPoints: [
        "Comprehensive Infant & Paediatric Vision Screening",
        "Strabismus (Squint) Surgical Muscle Realignment",
        "Amblyopia (Lazy Eye) Occlusion / Patching Therapy",
        "Congenital Cataract Extraction with IOL Implantation",
        "Paediatric Refraction & Custom Child-Friendly Eyewear"
      ],
      symptoms: "Misaligned or crossed eyes, child holding objects very close, frequent head tilting or squinting, lack of eye contact, white reflex in pupil.",
      diagnosis: "Cycloplegic Refraction with Atropine/Homatropine, Synoptophore Binocular Vision Assessment, Orthoptic Evaluation.",
      treatment: "Prism glasses, patching therapy, extraocular muscle resection/recession surgery, congenital cataract removal.",
      technology: "Clement Clarke Synoptophore, Retinomax Handheld Autorefractor, Pediatric Trial Frame Sets.",
      relatedDoctorIds: ["dr-lingadalli", "dr-soundarya-patil"],
      relatedDoctors: ["Dr. Prabhugouda B. Lingadalli", "Dr. Soundarya Patil"],
      availableHospitals: ["Vijayapura Main Campus"],
      displayOrder: 4,
      published: true
    },
    {
      id: "glaucoma",
      title: "Glaucoma Care & Surgery",
      shortDesc: "Early intraocular pressure detection, visual fields perimetry & trabeculectomy surgery.",
      fullDesc: "Glaucoma is a group of eye conditions that damage the optic nerve, the health of which is vital for good vision. This damage is often caused by an abnormally high pressure in your eye. Glaucoma is one of the leading causes of irreversible blindness for people over the age of 60. Early detection through routine comprehensive eye exams is crucial because vision loss from glaucoma cannot be reversed once it occurs.",
      category: "Glaucoma Management",
      desc: "Super-specialty glaucoma diagnostics, computerized perimetry, optic nerve OCT imaging, and surgical filtration.",
      imagePlaceholder: "assets/services/glaucoma_management.jpg",
      heroImage: "assets/services/glaucoma_management.jpg",
      bulletPoints: [
        "Computerized Humphrey Visual Field (HVF) Perimetry",
        "OCT Retinal Nerve Fiber Layer (RNFL) Analysis",
        "Selective Laser Trabeculoplasty (SLT) & Nd:YAG Iridotomy",
        "Trabeculectomy Filtering Surgery with Mitomycin-C",
        "Glaucoma Drainage Device Implantation for Refractory Cases"
      ],
      symptoms: "Gradual loss of peripheral vision (tunnel vision), severe throbbing eye pain, headaches, halos around lights, redness.",
      diagnosis: "Goldmann Applanation Tonometry, Gonioscopy, Humphrey Field Analyzer 3, Zeiss Cirrus HD-OCT RNFL scan.",
      treatment: "Pressure-lowering eye drops, Laser Peripheral Iridotomy (LPI), Trabeculectomy, Ahmed Glaucoma Valve (AGV).",
      technology: "Humphrey Field Analyzer 3, Zeiss Cirrus HD-OCT, Lumenis SLT/YAG Laser System.",
      relatedDoctorIds: ["dr-malini"],
      relatedDoctors: ["Dr. Malini P L"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      displayOrder: 5,
      published: true
    },
    {
      id: "cornea-lasik-eyebank",
      title: "Cornea, LASIK & Eye Bank",
      shortDesc: "Corneal dystrophies, keratoconus cross-linking, refractive surgery & 24x7 eye banking.",
      fullDesc: "Our Cornea, LASIK & Eye Bank service offers advanced diagnosis and treatment for all disorders of the cornea and anterior segment of the eye. This includes medical management of infectious keratitis, corneal dystrophies, keratoconus cross-linking (C3R), pterygium excision with conjunctival autograft, and full eye banking facilities for corneal transplantation (Keratoplasty).",
      category: "Cornea & Eye Banking",
      desc: "Comprehensive anterior segment care, keratoconus C3R cross-linking, pterygium autografting, and accredited eye bank donor retrieval.",
      imagePlaceholder: "assets/services/cornea_oculoplasty.jpg",
      heroImage: "assets/services/cornea_oculoplasty.jpg",
      bulletPoints: [
        "Corneal Collagen Cross-Linking (C3R) for Keratoconus",
        "Pterygium Excision with Sutureless Fibrin Glue Autograft",
        "Full-Service Eye Bank Donor Retrieval & Tissue Processing",
        "Therapeutic & Optical Penetrating / Lamellar Keratoplasty",
        "Dry Eye & Ocular Surface Disease Management"
      ],
      symptoms: "Severe foreign body sensation, ocular redness, corneal white opacity, light sensitivity (photophobia), burning and tearing.",
      diagnosis: "Slit-Lamp Fluorescein Staining, Pentacam Corneal Topography, Pachymetry, Specular Microscopy, Corneal Scraping & Culture.",
      treatment: "C3R UVA Cross-Linking, Autologous Conjunctival Grafting, Corneal Transplantation, Intensive Antimicrobial Therapy.",
      technology: "Pentacam HR Corneal Tomographer, UVA C3R Cross-Linking System, Specular Microscope.",
      relatedDoctorIds: ["dr-ravikumar-goud", "dr-rashmi-biradar"],
      relatedDoctors: ["Dr. Ravikumar B. Goud", "Dr. Rashmi Biradar"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      displayOrder: 6,
      published: true
    },
    {
      id: "oculoplasty-surgery",
      title: "Oculoplasty Surgery",
      shortDesc: "Reconstructive eyelid surgery, ptosis correction, lacrimal DCR & prosthetic eye fitting.",
      fullDesc: "Oculoplastic surgery encompasses a wide variety of surgical procedures that deal with the orbit (eye socket), eyelids, tear ducts, and the face. It also involves the surgical treatment of disorders of the lacrimal system and reconstruction of the eye and associated structures.",
      category: "Oculoplastic & Facial Surgery",
      desc: "Specialized eyelid plastic surgery, ptosis correction, tear duct DCR, and orbital prosthetic rehabilitation.",
      imagePlaceholder: "assets/services/cornea_oculoplasty.jpg",
      heroImage: "assets/services/cornea_oculoplasty.jpg",
      bulletPoints: [
        "Blepharoplasty & Ptosis (Drooping Eyelid) Repair",
        "Entropion & Ectropion Eyelid Realignment",
        "Dacryocystorhinostomy (DCR) for Blocked Tear Ducts",
        "Evisceration & Enucleation with Custom Ocular Prosthesis",
        "Orbital Fracture & Trauma Reconstruction"
      ],
      symptoms: "Drooping eyelids obstructing visual field, constant watering and tearing of eyes, inward/outward turned eyelid margins, eyelid lumps.",
      diagnosis: "Lacrimal Syringing and Probing, Exophthalmometry, Margin Reflex Distance (MRD) Measurement, CT Orbit Review.",
      treatment: "LPS Resection / Frontalis Sling for Ptosis, Endonasal / External DCR, Custom Handcrafted Ocular Prosthetic Fitting.",
      technology: "Radiofrequency Electrosurgery Unit, High-Precision Micro-Oculoplastic Surgical Sets.",
      relatedDoctorIds: ["dr-malini", "dr-soundarya-patil"],
      relatedDoctors: ["Dr. Malini P L", "Dr. Soundarya Patil"],
      availableHospitals: ["Vijayapura Main Campus"],
      displayOrder: 7,
      published: true
    },
    {
      id: "lasik-service",
      title: "Laser Vision Correction (LASIK)",
      shortDesc: "Blade-free waveguided customized laser vision correction to permanently eliminate spectacles.",
      fullDesc: "Customized laser vision correction using blade-free waveguided technology to free patients from spectacles and contact lenses. Contoura Vision is a topography-guided LASIK treatment that maps 22,000 elevation points on the cornea, delivering personalized corrections that frequently result in better-than-20/20 visual acuity with sharper contrast.",
      category: "Laser Refractive Surgery",
      desc: "Topography-guided Contoura Vision and blade-free LASIK laser eye surgery to permanently remove glasses.",
      imagePlaceholder: "assets/services/lasik_contoura.jpg",
      heroImage: "assets/services/lasik_contoura.jpg",
      bulletPoints: [
        "Topography-Guided Contoura Vision (22,000 Cornea Elevation Points)",
        "Blade-Free Femtosecond Flap Creation",
        "Customized Wavefront PRK / Surface Ablation",
        "Painless procedure completed in under 10 minutes per eye",
        "Rapid visual recovery within 24 hours"
      ],
      symptoms: "Nearsightedness (Myopia), Farsightedness (Hyperopia), Astigmatism, contact lens intolerance, desire for spectacle freedom.",
      diagnosis: "Pentacam Corneal Topography, Pachymetry, Wavefront Aberrometry, Tear Film Osmolarity Test, Dilated Retina Check.",
      treatment: "Excimer Laser Photoablation, Femtosecond Laser Flap, Customized Topography-Guided Reshaping.",
      technology: "Wavelight EX500 Excimer Laser, FS200 Femtosecond Laser, Topolyzer Vario Diagnostic Suite.",
      relatedDoctorIds: ["dr-ravikumar-goud", "dr-rashmi-biradar", "dr-lingadalli"],
      relatedDoctors: ["Dr. Ravikumar B. Goud", "Dr. Rashmi Biradar", "Dr. Prabhugouda B. Lingadalli"],
      availableHospitals: ["Vijayapura Main Campus"],
      displayOrder: 8,
      published: true
    },
    {
      id: "ocular-trauma",
      title: "Ocular Trauma & Emergency",
      shortDesc: "24x7 emergency casualty desk with immediate surgical intervention for ocular injuries.",
      fullDesc: "24x7 Emergency ocular trauma and emergency casualty desk providing immediate surgical intervention for penetrating eye injuries, chemical burns, foreign bodies, and blunt trauma. Our specialized emergency ophthalmology team is on standby around the clock to restore structural integrity and preserve eyesight.",
      category: "Emergency Trauma Care",
      desc: "24x7 emergency ophthalmic trauma desk for perforating injuries, intraocular foreign bodies, and chemical burns.",
      imagePlaceholder: "assets/services/community_eye_screening.png",
      heroImage: "assets/services/community_eye_screening.png",
      bulletPoints: [
        "24x7 Ophthalmic Trauma & Emergency Casualty Desk",
        "Micro-Surgical Repair of Corneal & Scleral Perforations",
        "Intraocular Foreign Body (IOFB) Magnetic Extraction",
        "Immediate Chemical Burn Copious Irrigation & Amniotic Membrane Grafting",
        "Direct Emergency Ambulance & Referral Triage from Vision Centers"
      ],
      symptoms: "Sudden severe pain, chemical splash, visible puncture or bleeding in eye, sudden severe loss of vision after injury.",
      diagnosis: "Immediate Emergency Slit-Lamp Exam, Fluorescein Leakage Test (Seidel's Test), Non-Contact CT Orbit Imaging.",
      treatment: "Immediate micro-surgical globe closure, anterior chamber wash, topical & systemic antibiotics, amniotic membrane patching.",
      technology: "Emergency Dedicated Laminar Flow Operating Theatres, Specialized Microsurgical Trauma Sets.",
      relatedDoctorIds: ["dr-soundarya-patil", "dr-lingadalli"],
      relatedDoctors: ["Dr. Soundarya Patil", "Dr. Prabhugouda B. Lingadalli"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital"],
      displayOrder: 9,
      published: true
    },
    {
      id: "opticals",
      title: "Optometry, Spectacles & Pharmacy",
      shortDesc: "Computerized eye refraction, prescription glasses, contact lenses & eye drops.",
      fullDesc: "In-house optical dispensing offering computer refraction, high-grade optical frames, specialty contact lenses, low vision aids, and an accredited ophthalmic pharmacy.",
      category: "Optometry & Pharmacy",
      desc: "In-house optical dispensing offering computer refraction, high-grade optical frames, specialty contact lenses, low vision aids, and an accredited ophthalmic pharmacy.",
      imagePlaceholder: "assets/services/optical_contact_lenses.png",
      heroImage: "assets/services/optical_contact_lenses.png",
      bulletPoints: [
        "Computerized Automated Refraction & Visual Acuity Testing",
        "Custom Progressive, Bifocal, and Blue-Cut Anti-Glare Lenses",
        "Soft, Toric, and RGP Specialty Contact Lens Fitting",
        "In-House Certified Ophthalmic Pharmacy & Drops Dispensing"
      ],
      symptoms: "Eye strain, frequent headaches, difficulty focusing on reading or digital screens, night driving glare.",
      diagnosis: "Automated & Manifest Subjective Refraction, Keratometry, Contrast Sensitivity Assessment, Contact Lens Trial Fitting.",
      treatment: "Custom Progressive / Bifocal / Anti-Glare Lenses, Toric & Soft Contact Lenses, Certified Ophthalmic Drops & Lubricants.",
      technology: "Digital Auto-Refractor-Keratometer, Automated Lensmeter, Contrast Sensitivity Charts.",
      relatedDoctorIds: ["dr-malini"],
      relatedDoctors: ["Dr. Malini P L"],
      availableHospitals: ["Vijayapura Main Campus", "Kalaburagi Base Hospital", "All 8 Vision Centers"],
      displayOrder: 10,
      published: true
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
          services: parsed.services || DEFAULT_DATA.services,
          leadership: parsed.leadership || DEFAULT_DATA.leadership,
          administration: parsed.administration || DEFAULT_DATA.administration,
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

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.data));
      const timestamp = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem('anugraha_last_saved_time', timestamp);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('anugraha-store-updated', { detail: this.data }));
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

  getServiceById(id) {
    return this.getServices().find(s => s.id === id);
  }

  updateService(id, fields) {
    if (!this.data.services) this.data.services = [...DEFAULT_DATA.services];
    const idx = this.data.services.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.data.services[idx] = { ...this.data.services[idx], ...fields };
      this.save();
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
    const newId = Date.now();
    this.data.gallery.unshift({ 
      id: newId, 
      uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), 
      ...item 
    });
    this.save();
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
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    this.save();
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
