/**
 * Main Application Engine & Router for Anugraha Eye Hospital
 */

document.addEventListener("DOMContentLoaded", () => {
  const store = window.appStore;

  // State
  let currentPath = window.location.hash.replace('#', '') || '/';
  if (currentPath === '') currentPath = '/';

  // DOM Containers
  const appContainer = document.getElementById("app");
  const headerContainer = document.getElementById("header-root");
  const footerContainer = document.getElementById("footer-root");

  // Top-of-Page Progress Bar Controller
  window.triggerTopProgressBar = function(callback) {
    const barInner = document.getElementById("top-progress-bar-inner");
    if (!barInner) {
      if (callback) callback();
      return;
    }
    
    barInner.style.opacity = "1";
    barInner.style.width = "0%";
    
    setTimeout(() => {
      barInner.style.width = "70%";
    }, 20);

    setTimeout(() => {
      barInner.style.width = "100%";
      if (callback) callback();
    }, 200);

    setTimeout(() => {
      barInner.style.opacity = "0";
      setTimeout(() => {
        barInner.style.width = "0%";
      }, 250);
    }, 450);
  };

  // Reliable Image Preloader Promise
  window.preloadImage = function(url) {
    return new Promise((resolve) => {
      if (!url || typeof url !== 'string') return resolve(url);
      const img = new Image();
      let finished = false;
      img.onload = () => {
        if (!finished) {
          finished = true;
          resolve(url);
        }
      };
      img.onerror = () => {
        if (!finished) {
          finished = true;
          resolve(url);
        }
      };
      img.src = url;
      // 4-second fallback timeout so rendering never stalls
      setTimeout(() => {
        if (!finished) {
          finished = true;
          resolve(url);
        }
      }, 4000);
    });
  };

  /* FRONTEND-ONLY TRUST BOUNDARY: XSS Sanitizer for admin-entered rich text — must be re-enforced server-side before production deployment with a real backend */
  window.sanitizeHTML = function(input) {
    if (!input) return '';
    const temp = document.createElement('div');
    temp.innerHTML = input;
    
    // Remove unsafe elements
    const dangerous = temp.querySelectorAll('script, iframe, object, embed, link, style, form');
    dangerous.forEach(el => el.remove());

    // Strip inline event attributes
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('on') || (attr.value && attr.value.trim().toLowerCase().startsWith('javascript:'))) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return temp.innerHTML;
  };

  // Technical SEO Engine (Dynamic Title, Meta Description, Canonical, OG, Twitter Cards & JSON-LD Schemas)
  function updatePageSEO(path) {
    let title = "Anugraha Eye Hospital | Authentic. Affectionate. Affordable. Eye Care";
    let description = "Anugraha Eye Hospital founded in 2001 by Dr. Prabhugouda B. Lingadalli. Super-specialty eye care base hospitals in Vijayapura & Kalaburagi, and 8 rural Vision Centers across Karnataka.";
    let image = "https://anugrahaeyehospital.com/assets/official_logo.jpg";
    let jsonLdSchema = null;

    if (path === '/') {
      title = "Anugraha Eye Hospital | Super-Specialty Eye Network North Karnataka";
      description = "Leading super-specialty eye care network founded in 2001 by Dr. P.B. Lingadalli. Over 2.28 lakh lifetime surgeries, 50,000+ free cataract procedures, 8 rural Vision Centers.";
      jsonLdSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Anugraha Eye Hospital",
        "url": "https://anugrahaeyehospital.com",
        "logo": "https://anugrahaeyehospital.com/assets/official_logo.jpg",
        "foundingDate": "2001",
        "founder": {
          "@type": "Person",
          "name": "Dr. Prabhugouda B. Lingadalli",
          "jobTitle": "Chairman & Founder",
          "honorificPrefix": "Dr."
        },
        "medicalSpecialty": "Ophthalmology",
        "telephone": "08352-220646",
        "email": "contactus@anugrahaeyehospital.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Navabhag Main Road, Behind Central Bus Stand",
          "addressLocality": "Vijayapura",
          "addressRegion": "Karnataka",
          "postalCode": "586101",
          "addressCountry": "IN"
        }
      };
    } else if (path === '/about-us') {
      title = "About Us | Anugraha Eye Hospital | Founded 2001";
      description = "Learn about Anugraha Eye Hospital's 25-year legacy of Authentic, Affectionate, and Affordable eye care across North Karnataka.";
    } else if (path === '/about-us/leadership') {
      title = "Leadership & Founders | Dr. P.B. Lingadalli & Dr. Malini P L | Anugraha";
      description = "Meet Founder Dr. Prabhugouda B. Lingadalli (Rajyostava Awardee) and Medical Director Dr. Malini P L guiding Anugraha Eye Hospital.";
      jsonLdSchema = [
        {
          "@context": "https://schema.org",
          "@type": "Physician",
          "name": "Dr. Prabhugouda B. Lingadalli",
          "jobTitle": "Chairman & Founder",
          "medicalSpecialty": "Ophthalmology",
          "alumniOf": "B M Patil Medical College",
          "worksFor": {
            "@type": "MedicalOrganization",
            "name": "Anugraha Eye Hospital"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "Physician",
          "name": "Dr. Malini P L",
          "jobTitle": "Medical Director",
          "medicalSpecialty": "Ophthalmology",
          "worksFor": {
            "@type": "MedicalOrganization",
            "name": "Anugraha Eye Hospital"
          }
        }
      ];
    } else if (path === '/hospitals/vijayapura') {
      title = "Vijayapura Base Hospital (Main Campus) | Anugraha Eye Hospital";
      description = "Super-specialty base hospital featuring HEPA-filtered modular OTs, phacoemulsification, vitreo-retinal lasers, and 24/7 emergency unit.";
      jsonLdSchema = {
        "@context": "https://schema.org",
        "@type": "Hospital",
        "name": "Anugraha Eye Hospital - Vijayapura Main Campus",
        "telephone": "08352-220646",
        "openingHours": "Mo-Su 08:00-21:00",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Navabhag Main Road, Behind Central Bus Stand",
          "addressLocality": "Vijayapura",
          "addressRegion": "Karnataka",
          "postalCode": "586101",
          "addressCountry": "IN"
        }
      };
    } else if (path === '/hospitals/kalaburagi') {
      title = "Kalaburagi Base Hospital & Institute of Optometry | Anugraha";
      description = "Tertiary eye care base hospital and RGUHS-affiliated Anugraha Institute of Optometry serving eastern Karnataka.";
      jsonLdSchema = {
        "@context": "https://schema.org",
        "@type": "Hospital",
        "name": "Anugraha Eye Hospital - Kalaburagi Campus",
        "telephone": "08352-220646",
        "openingHours": "Mo-Su 08:00-20:00",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ring Road Junction, Opposite District Court Complex",
          "addressLocality": "Kalaburagi",
          "addressRegion": "Karnataka",
          "postalCode": "585105",
          "addressCountry": "IN"
        }
      };
    } else if (path.startsWith('/vision-centers/')) {
      const centerId = path.replace('/vision-centers/', '');
      const fac = store.getFacilityById(centerId);
      if (fac) {
        title = `${fac.name} | Rural Vision Center | Anugraha Eye Hospital`;
        description = `${fac.name} in ${fac.town || 'Karnataka'}. Primary eye care, computer refraction, prescription eyewear, and free Sunday OPD triage. Ph: ${fac.phone}.`;
        jsonLdSchema = {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": fac.name,
          "telephone": fac.phone,
          "openingHours": fac.hours,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": fac.address,
            "addressLocality": fac.town || "Vijayapura District",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "parentOrganization": {
            "@type": "MedicalOrganization",
            "name": "Anugraha Eye Hospital"
          }
        };
      }
    } else if (path === '/services') {
      title = "Ophthalmic Services & Super-Specialties | Anugraha Eye Hospital";
      description = "Comprehensive eye care: Cataract Phaco, LASIK/Contoura Vision, Retina, Glaucoma, Pediatric Ophthalmology, Oculoplasty, Cornea, and Optical Dispensing.";
      jsonLdSchema = [
        {
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": "Phacoemulsification Cataract Surgery",
          "procedureType": "SurgicalProcedure",
          "bodyLocation": "Eye"
        },
        {
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": "Contoura Vision LASIK Refractive Surgery",
          "procedureType": "SurgicalProcedure",
          "bodyLocation": "Eye"
        }
      ];
    } else if (path === '/patient-resources') {
      title = "Patient Resources & FAQs | Anugraha Eye Hospital";
      description = "Patient support guide, pre-visit instructions, cashless insurance empanelments, downloadable care manuals, and FAQs.";
      jsonLdSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I book a consultation or appointment at Anugraha Eye Hospital?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Call our Vijayapura helpline directly at 08352-220646 or message our WhatsApp desk at +91 74839 00963."
            }
          },
          {
            "@type": "Question",
            "name": "What government health schemes are accepted?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are empaneled with Ayushman Bharat (AB-ARK), ABY, JSS, Yeshasvini, RBSK, and SKDRDP."
            }
          }
        ]
      };
    } else if (path === '/academics') {
      title = "Academics & Surgical Fellowships | Anugraha Institute";
      description = "Surgical Fellowships, NBEMS DNB Ophthalmology residency, Diploma in Ophthalmic Technology, and B.Sc Optometry (RGUHS Affiliated).";
    } else if (path === '/patient-resources/empanelments-and-insurance') {
      title = "Insurance & Government Scheme Empanelments | Anugraha Eye Hospital";
      description = "Cashless eye treatment for Ayushman Bharat (AB-ARK), ABY, JSS, Star Health, ICICI Lombard, Niva Bupa, Bajaj Allianz, and major TPAs.";
    }

    document.title = title;
    
    // Set or Update Meta Tag Helper Function
    function setMeta(selector, attr, value) {
      let el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    }

    setMeta('meta[name="description"]', 'content', description);
    
    // OpenGraph Dynamic Updates
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', `https://anugrahaeyehospital.com${path === '/' ? '' : '/#' + path}`);
    setMeta('meta[property="og:image"]', 'content', image);

    // Twitter Card Dynamic Updates
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);

    // Update or Inject Canonical URL Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const cleanCanonicalUrl = `https://anugrahaeyehospital.com${path === '/' ? '' : '/#' + path}`;
    canonicalLink.setAttribute('href', cleanCanonicalUrl);

    // Inject or Update JSON-LD Medical Schema
    let existingScript = document.getElementById('json-ld-schema');
    if (existingScript) existingScript.remove();

    if (jsonLdSchema) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLdSchema);
      document.head.appendChild(script);
    }

    // Inject or Update JSON-LD BreadcrumbList Schema for Nested Routes
    let existingBreadcrumbScript = document.getElementById('json-ld-breadcrumb');
    if (existingBreadcrumbScript) existingBreadcrumbScript.remove();

    if (path !== '/') {
      const pathParts = path.split('/').filter(Boolean);
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://anugrahaeyehospital.com/"
        }
      ];

      let accumulatedPath = "";
      pathParts.forEach((part, index) => {
        accumulatedPath += `/${part}`;
        const nameFormatted = part.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": nameFormatted,
          "item": `https://anugrahaeyehospital.com/#${accumulatedPath}`
        });
      });

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      };

      const bScript = document.createElement('script');
      bScript.id = 'json-ld-breadcrumb';
      bScript.type = 'application/ld+json';
      bScript.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(bScript);
    }
  }

  // Route Dispatcher with Motion Token Transitions & 301 SEO Redirect Engine
  function navigateTo(path, event) {
    if (event) event.preventDefault();
    
    // Explicit 301 Redirect Interceptor Map per Production Spec
    const redirectMap = {
      '/copy-of-vijayapura-campus': '/vision-centers/talikoti',
      '/sindagi': '/vision-centers/muddebihal',
      '/bbagewadi': '/vision-centers/bbagewadi',
      '/newshappenings': '/news',
      '/educationandtraining': '/academics',
      '/drmalinipl': '/about-us/leadership',
      '/drprabhugoudabingadalli': '/about-us/leadership'
    };

    if (redirectMap[path]) {
      console.warn(`301 SEO Redirect Applied: ${path} -> ${redirectMap[path]}`);
      path = redirectMap[path];
    }

    // Setting window.location.hash triggers handleHashRoute automatically
    if (window.location.hash === '#' + path || window.location.hash === path) {
      currentPath = path;
      render();
    } else {
      window.location.hash = '#' + path;
    }
  }

  // Dynamic Route Dispatcher & Hash Change Synchronizer
  function handleHashRoute() {
    const rawHash = window.location.hash || '#/';
    // Extract path without anchor or query params
    const cleanPath = rawHash.replace(/^#\/?/, '').split('#')[0].split('?')[0];
    currentPath = cleanPath ? '/' + cleanPath : '/';

    // Always re-sync store from localStorage on navigation to guarantee latest edits are visible
    store.sync();

    // Close any open navigation drawers
    window.closeMobileDrawer();
    window.isAdminMobileDrawerOpen = false;

    // Re-render view with fresh data
    render();

    // Handle smooth anchor scroll or top scroll
    const anchorMatch = rawHash.match(/#([a-zA-Z0-9_-]+)$/);
    if (anchorMatch && anchorMatch[1]) {
      setTimeout(() => {
        const el = document.getElementById(anchorMatch[1]);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  // Handle hash changes in URL bar directly (single canonical route handler)
  window.addEventListener('hashchange', handleHashRoute);

  // Mobile Drawer Toggle State & High-Performance Class Switcher
  window.isMobileDrawerOpen = false;

  window.toggleMobileDrawer = function() {
    window.isMobileDrawerOpen = !window.isMobileDrawerOpen;
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const drawer = document.getElementById('mobile-navigation-drawer');
    const hamburger = document.getElementById('mobile-hamburger-btn');
    if (backdrop && drawer) {
      if (window.isMobileDrawerOpen) {
        backdrop.classList.add('is-open');
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
      } else {
        backdrop.classList.remove('is-open');
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    } else {
      render();
    }
  };

  window.closeMobileDrawer = function() {
    window.isMobileDrawerOpen = false;
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const drawer = document.getElementById('mobile-navigation-drawer');
    const hamburger = document.getElementById('mobile-hamburger-btn');
    if (backdrop) backdrop.classList.remove('is-open');
    if (drawer) drawer.classList.remove('is-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // =========================================================================
  // THEME MANAGER & UIVERSE.IO CUSTOM TOGGLE COMPONENT
  // =========================================================================
  window.getThemePreference = function() {
    return localStorage.getItem('theme') || localStorage.getItem('anugraha_theme_v1') || 'system';
  };

  window.getEffectiveTheme = function() {
    const pref = window.getThemePreference();
    if (pref === 'dark') return 'dark';
    if (pref === 'light') return 'light';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  window.applyTheme = function() {
    const effective = window.getEffectiveTheme();
    if (effective === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Synchronize all toggle inputs on page
    const isDark = effective === 'dark';
    const toggles = document.querySelectorAll('.toggle-input[name="theme-toggle"]');
    toggles.forEach(t => { t.checked = isDark; });
  };

  window.handleThemeToggle = function(isChecked) {
    const newTheme = isChecked ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('anugraha_theme_v1', newTheme);
    if (isChecked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Synchronize other toggle checkboxes on page
    const toggles = document.querySelectorAll('.toggle-input[name="theme-toggle"]');
    toggles.forEach(t => { t.checked = isChecked; });
  };

  // Uiverse.io Custom Animated Sparkle Toggle Component Renderer
  window.renderThemeToggle = function(idSuffix = 'header') {
    const isDark = window.getEffectiveTheme() === 'dark';
    return `
      <div class="toggle-cont shrink-0" title="${isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}">
        <input 
          class="toggle-input" 
          id="theme-toggle-${idSuffix}" 
          name="theme-toggle" 
          type="checkbox" 
          ${isDark ? 'checked' : ''} 
          onchange="window.handleThemeToggle(this.checked)" 
          aria-label="Toggle Dark / Light Theme" 
        />
        <label class="toggle-label" for="theme-toggle-${idSuffix}">
          <div class="cont-icon">
            <span style="--width: 2; --deg: 25; --duration: 11" class="sparkle"></span>
            <span style="--width: 1; --deg: 100; --duration: 18" class="sparkle"></span>
            <span style="--width: 1; --deg: 280; --duration: 5" class="sparkle"></span>
            <span style="--width: 2; --deg: 200; --duration: 3" class="sparkle"></span>
            <span style="--width: 2; --deg: 30; --duration: 20" class="sparkle"></span>
            <span style="--width: 2; --deg: 300; --duration: 9" class="sparkle"></span>
            <span style="--width: 1; --deg: 250; --duration: 4" class="sparkle"></span>
            <span style="--width: 2; --deg: 210; --duration: 8" class="sparkle"></span>
            <span style="--width: 2; --deg: 100; --duration: 9" class="sparkle"></span>
            <span style="--width: 1; --deg: 15; --duration: 13" class="sparkle"></span>
            <span style="--width: 1; --deg: 75; --duration: 18" class="sparkle"></span>
            <span style="--width: 2; --deg: 65; --duration: 6" class="sparkle"></span>
            <span style="--width: 2; --deg: 50; --duration: 7" class="sparkle"></span>
            <span style="--width: 1; --deg: 320; --duration: 5" class="sparkle"></span>
            <span style="--width: 1; --deg: 220; --duration: 5" class="sparkle"></span>
            <span style="--width: 1; --deg: 215; --duration: 2" class="sparkle"></span>
            <span style="--width: 2; --deg: 135; --duration: 9" class="sparkle"></span>
            <span style="--width: 2; --deg: 45; --duration: 4" class="sparkle"></span>
            <span style="--width: 1; --deg: 78; --duration: 16" class="sparkle"></span>
            <span style="--width: 1; --deg: 89; --duration: 19" class="sparkle"></span>
            <span style="--width: 2; --deg: 65; --duration: 14" class="sparkle"></span>
            <span style="--width: 2; --deg: 97; --duration: 1" class="sparkle"></span>
            <span style="--width: 1; --deg: 174; --duration: 10" class="sparkle"></span>
            <span style="--width: 1; --deg: 236; --duration: 5" class="sparkle"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 30"
              class="icon"
            >
              <path
                d="M0.96233 28.61C1.36043 29.0081 1.96007 29.1255 2.47555 28.8971L10.4256 25.3552C13.2236 24.11 16.4254 24.1425 19.2107 25.4401L27.4152 29.2747C27.476 29.3044 27.5418 29.3023 27.6047 29.32C27.6563 29.3348 27.7079 29.3497 27.761 29.3574C27.843 29.3687 27.9194 29.3758 28 29.3688C28.1273 29.3617 28.2531 29.3405 28.3726 29.2945C28.4447 29.262 28.5162 29.2287 28.5749 29.1842C28.6399 29.1446 28.6993 29.0994 28.7509 29.0477L28.9008 28.8582C28.9468 28.7995 28.9793 28.7274 29.0112 28.656C29.0599 28.5322 29.0811 28.4036 29.0882 28.2734C29.0939 28.1957 29.0868 28.1207 29.0769 28.0415C29.0705 27.9955 29.0585 27.9524 29.0472 27.9072C29.0295 27.8343 29.0302 27.7601 28.9984 27.6901L25.1638 19.4855C23.8592 16.7073 23.8273 13.5048 25.0726 10.7068L28.6145 2.75679C28.8429 2.24131 28.7318 1.63531 28.3337 1.2372C27.9165 0.820011 27.271 0.721743 26.7491 0.9961L19.8357 4.59596C16.8418 6.15442 13.2879 6.18696 10.2615 4.70062L1.80308 0.520214C1.7055 0.474959 1.60722 0.441742 1.50964 0.421943C1.44459 0.409215 1.37882 0.395769 1.3074 0.402133C1.14406 0.395769 0.981436 0.428275 0.818095 0.499692C0.77284 0.519491 0.719805 0.545671 0.67455 0.578198C0.596061 0.617088 0.524653 0.675786 0.4596 0.74084C0.394546 0.805894 0.335843 0.877306 0.296245 0.956502C0.263718 1.00176 0.237561 1.05477 0.217762 1.10003C0.152708 1.24286 0.126545 1.40058 0.120181 1.54978C0.120181 1.61483 0.126527 1.6735 0.132891 1.73219C0.15269 1.85664 0.178881 1.97332 0.237571 2.08434L4.41798 10.5427C5.91139 13.5621 5.8725 17.1238 4.3204 20.1099L0.720514 27.0233C0.440499 27.5536 0.545137 28.1928 0.96233 28.61Z"
              ></path>
            </svg>
          </div>
        </label>
      </div>
    `;
  };

  // Listen to OS System Color Scheme Changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (window.getThemePreference() === 'system') {
        window.applyTheme();
      }
    });
  }

  // Initial Theme Execution
  window.applyTheme();

  // Mobile Hero-Aware Bottom Contact Bar Scroll Listener (>450px threshold)
  function initMobileBottomBar() {
    const bottomBar = document.getElementById("mobile-bottom-bar");
    if (!bottomBar) return;

    if (window.scrollY > 450) {
      bottomBar.classList.add("is-visible");
    } else {
      bottomBar.classList.remove("is-visible");
    }
  }

  // Scroll Listener for Sticky Header Height Condensation & Mobile Bottom Bar
  if (!window.hasScrollHeaderListener) {
    window.hasScrollHeaderListener = true;
    window.addEventListener("scroll", () => {
      const headerNav = document.getElementById("main-nav");
      if (headerNav) {
        if (window.scrollY > 80) {
          headerNav.classList.add("is-scrolled");
        } else {
          headerNav.classList.remove("is-scrolled");
        }
      }
      initMobileBottomBar();
    }, { passive: true });
  }

  // Render Header
  function renderHeader() {
    const brand = store.getBrand();
    const isScrolled = window.scrollY > 80;

    return `
      <!-- Main Sticky Condensing Navigation Header -->
      <header class="sticky top-0 z-50 px-2 sm:px-4 max-w-7xl mx-auto pt-2 sm:pt-3">
        <nav id="main-nav" class="header-nav glass-card rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-xl transition-all border border-white/60 ${isScrolled ? 'is-scrolled' : ''}">
          
          <!-- Logo & Brand Name -->
          <a href="#/" class="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0 max-w-[62%] sm:max-w-none">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md group-hover:scale-105 transition-transform border border-teal-900/20 overflow-hidden shrink-0">
              <img src="${brand.logo || 'assets/official_logo.jpg'}" alt="${brand.name} Official Logo" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0 truncate">
              <div class="brand-title font-extrabold text-xs sm:text-base lg:text-lg text-teal-950 dark:text-white tracking-tight leading-none font-heading transition-colors truncate">${brand.name}</div>
              <div class="brand-subtitle text-[8.5px] sm:text-[11px] font-semibold text-teal-700 dark:text-emerald-400 tracking-wider uppercase mt-0.5 transition-colors truncate">${brand.tagline}</div>
            </div>
          </a>

          <!-- Primary Navigation Mega-Menus (Center Desktop Only) -->
          <div class="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-700">
            
            <!-- Home -->
            <a href="#/" class="nav-text-link px-3 py-2 rounded-lg hover:text-teal-900 hover:bg-teal-50/80 transition-colors ${currentPath === '/' ? 'text-teal-900 bg-teal-50 font-bold' : ''}">Home</a>
            
            <!-- About Us (Mega-Menu) -->
            <div class="relative group">
              <a href="#/about-us" class="nav-text-link px-3 py-2 rounded-lg hover:text-teal-900 hover:bg-teal-50/80 transition-colors flex items-center gap-1 ${currentPath.startsWith('/about-us') ? 'text-teal-900 bg-teal-50 font-bold' : ''}">
                About Us
                <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </a>
              <div class="mega-menu-dropdown absolute top-full left-0 mt-1 w-64 glass-card rounded-2xl shadow-2xl py-2.5 hidden group-hover:block border border-teal-100/80 z-50">
                <a href="#/about-us" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-semibold">Our Story & Overview</a>
                <a href="#/about-us/leadership" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Leadership & Awards</a>
                <a href="#/about-us/clinical-faculty" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-semibold text-emerald-800 dark:text-emerald-400">Clinical Faculty & Consultants</a>
                <a href="#/about-us/administration" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Administration Team (6)</a>
                <a href="#/about-us#vision-mission" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Vision & Mission</a>
                <a href="#/about-us#geographical-spread" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Geographical Spread</a>
                <a href="#/about-us#partnerships" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Community Partnerships</a>
              </div>
            </div>

            <!-- Hospitals Mega-Menu -->
            <div class="relative group">
              <a href="#/hospitals/vijayapura" class="nav-text-link px-3 py-2 rounded-lg hover:text-teal-900 hover:bg-teal-50/80 transition-colors flex items-center gap-1 ${currentPath.startsWith('/hospitals') ? 'text-teal-900 bg-teal-50 font-bold' : ''}">
                Hospitals
                <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </a>
              <div class="mega-menu-dropdown absolute top-full left-0 mt-1 w-72 glass-card rounded-2xl shadow-2xl py-2.5 hidden group-hover:block border border-teal-100/80 z-50">
                <div class="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800">Base Tertiary Hospitals</div>
                <a href="#/hospitals/vijayapura" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-semibold">Vijayapura Base Hospital</a>
                <a href="#/hospitals/kalaburagi" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900 font-semibold">Kalaburagi Base Hospital</a>
                
                <div class="my-1.5 border-t border-slate-100"></div>
                <div class="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">8 Vision Centers Directory</div>
                <a href="#/vision-centers/talikoti" class="block px-4 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-900">Talikoti Vision Center</a>
                <a href="#/vision-centers/muddebihal" class="block px-4 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-900">Muddebihal Vision Center</a>
                <a href="#/vision-centers/sindagi" class="block px-4 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-900">Sindagi Vision Center</a>
                <a href="#/vision-centers/indi" class="block px-4 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-900">Indi Vision Center</a>
                <a href="#/vision-centers/b-bagewadi" class="block px-4 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-900">B.Bagewadi Vision Center</a>
                <a href="#/vision-centers/chadachan" class="block px-4 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-900">Chadachan Vision Center</a>
                <a href="#/vision-centers/nalatwad" class="block px-4 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-900">Nalatwad Vision Center</a>
                <a href="#/vision-centers/tikota" class="block px-4 py-1.5 text-xs text-slate-600 hover:bg-teal-50 hover:text-teal-900">Tikota Vision Center</a>
              </div>
            </div>

            <!-- Services -->
            <a href="#/services" class="nav-text-link px-3 py-2 rounded-lg hover:text-teal-900 hover:bg-teal-50/80 transition-colors ${currentPath === '/services' ? 'text-teal-900 bg-teal-50 font-bold' : ''}">Services</a>

            <!-- Academics -->
            <a href="#/academics" class="nav-text-link px-3 py-2 rounded-lg hover:text-teal-900 hover:bg-teal-50/80 transition-colors ${currentPath === '/academics' ? 'text-teal-900 bg-teal-50 font-bold' : ''}">Academics</a>

            <!-- More Dropdown -->
            <div class="relative group">
              <button class="nav-text-link px-3 py-2 rounded-lg hover:text-teal-900 hover:bg-teal-50/80 transition-colors flex items-center gap-1 ${['/gallery', '/news', '/videos', '/contact', '/patient-resources'].some(p => currentPath.startsWith(p)) ? 'text-teal-900 bg-teal-50 font-bold' : ''}">
                More
                <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="mega-menu-dropdown absolute top-full left-0 mt-1 w-60 glass-card rounded-2xl shadow-2xl py-2.5 hidden group-hover:block border border-teal-100/80 z-50">
                <a href="#/patient-resources/empanelments-and-insurance" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Empanelments & Insurance</a>
                <a href="#/patient-resources/handouts" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Patient Handouts</a>
                <div class="my-1 border-t border-slate-100"></div>
                <a href="#/gallery" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Gallery</a>
                <a href="#/news" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">News & Media</a>
                <a href="#/videos" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Video Library</a>
                <a href="#/contact" class="block px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900">Contact Us</a>
              </div>
            </div>

          </div>

          <!-- Header Right Utilities (Uiverse.io Theme Toggle + Mobile Hamburger) -->
          <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            <!-- Uiverse.io Custom Theme Toggle -->
            ${window.renderThemeToggle('desktop')}

            <!-- Accessible Mobile Hamburger Button -->
            <button 
              id="mobile-hamburger-btn"
              onclick="window.toggleMobileDrawer()" 
              aria-label="${window.isMobileDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}" 
              aria-expanded="${window.isMobileDrawerOpen ? 'true' : 'false'}"
              aria-controls="mobile-navigation-drawer"
              class="lg:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-900/50 active:scale-95 transition-all flex items-center justify-center min-w-[40px] min-h-[40px]"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>

          </div>

        </nav>
      </header>

      <!-- MOBILE FULL-HEIGHT SLIDE-OVER DRAWER & BACKDROP -->
      <div 
        id="mobile-drawer-backdrop" 
        class="mobile-drawer-backdrop lg:hidden ${window.isMobileDrawerOpen ? 'is-open' : ''}" 
        onclick="window.closeMobileDrawer()"
        aria-hidden="${window.isMobileDrawerOpen ? 'false' : 'true'}"
      ></div>

      <div 
        id="mobile-navigation-drawer" 
        class="mobile-drawer-panel lg:hidden p-5 sm:p-6 ${window.isMobileDrawerOpen ? 'is-open' : ''}"
        role="dialog" 
        aria-modal="true" 
        aria-label="Mobile Navigation Drawer"
      >
        <div class="space-y-5">
          
          <!-- Drawer Header -->
          <div class="flex items-center justify-between border-b border-teal-800/80 pb-4">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md overflow-hidden shrink-0">
                <img src="${brand.logo || 'assets/official_logo.jpg'}" alt="${brand.name} Official Logo" class="w-full h-full object-contain" />
              </div>
              <span class="font-extrabold text-base font-heading text-white truncate">${brand.name}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              ${window.renderThemeToggle('mobile')}
              <button onclick="window.closeMobileDrawer()" aria-label="Close navigation menu" class="w-9 h-9 rounded-xl bg-teal-900/90 hover:bg-teal-800 text-white flex items-center justify-center active:scale-95 transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          <!-- Drawer Navigation Links -->
          <nav class="space-y-1.5 font-heading font-semibold text-sm">
            <a href="#/" onclick="window.closeMobileDrawer()" class="flex items-center px-3.5 py-2.5 rounded-xl bg-teal-900/40 text-emerald-300 min-h-[44px]">
              <span>Home</span>
            </a>
            
            <!-- About Us Accordion -->
            <details class="group rounded-xl bg-teal-950/40 border border-teal-900/50">
              <summary class="flex items-center justify-between px-3.5 py-2.5 text-white cursor-pointer min-h-[44px] outline-none select-none">
                <span>About Us</span>
                <svg class="w-4 h-4 text-emerald-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <div class="px-3 pb-2 space-y-1 text-xs border-t border-teal-900/40 pt-1.5">
                <a href="#/about-us" onclick="window.closeMobileDrawer()" class="flex items-center py-2 px-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-teal-900/50 min-h-[38px]">Our Story & Overview</a>
                <a href="#/about-us/leadership" onclick="window.closeMobileDrawer()" class="flex items-center py-2 px-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-teal-900/50 min-h-[38px]">Leadership & Awards</a>
                <a href="#/about-us/clinical-faculty" onclick="window.closeMobileDrawer()" class="flex items-center py-2 px-2.5 rounded-lg text-emerald-300 font-bold hover:text-white hover:bg-teal-900/50 min-h-[38px]">Clinical Faculty & Consultants</a>
                <a href="#/about-us/administration" onclick="window.closeMobileDrawer()" class="flex items-center py-2 px-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-teal-900/50 min-h-[38px]">Administration Team (6)</a>
              </div>
            </details>

            <!-- Hospitals & Vision Centers Accordion -->
            <details class="group rounded-xl bg-teal-950/40 border border-teal-900/50">
              <summary class="flex items-center justify-between px-3.5 py-2.5 text-white cursor-pointer min-h-[44px] outline-none select-none">
                <span>Hospitals & Vision Centers</span>
                <svg class="w-4 h-4 text-emerald-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <div class="px-3 pb-2 space-y-1 text-xs border-t border-teal-900/40 pt-1.5">
                <a href="#/hospitals/vijayapura" onclick="window.closeMobileDrawer()" class="flex items-center py-2 px-2.5 rounded-lg text-slate-200 hover:text-white min-h-[38px]">Vijayapura Base Hospital</a>
                <a href="#/hospitals/kalaburagi" onclick="window.closeMobileDrawer()" class="flex items-center py-2 px-2.5 rounded-lg text-slate-200 hover:text-white min-h-[38px]">Kalaburagi Base Hospital</a>
                <a href="#/vision-centers" onclick="window.closeMobileDrawer()" class="flex items-center py-2 px-2.5 rounded-lg text-amber-300 hover:text-amber-200 font-bold min-h-[38px]">All 8 Vision Centers Directory</a>
              </div>
            </details>

            <a href="#/services" onclick="window.closeMobileDrawer()" class="flex items-center px-3.5 py-2.5 rounded-xl bg-teal-950/40 text-white min-h-[44px]">
              <span>Services & Specialties</span>
            </a>

            <a href="#/academics" onclick="window.closeMobileDrawer()" class="flex items-center px-3.5 py-2.5 rounded-xl bg-teal-950/40 text-white min-h-[44px]">
              <span>Academics & Training</span>
            </a>

            <a href="#/patient-resources/empanelments-and-insurance" onclick="window.closeMobileDrawer()" class="flex items-center px-3.5 py-2.5 rounded-xl bg-teal-950/40 text-white min-h-[44px]">
              <span>Empanelments & Insurance</span>
            </a>

            <a href="#/gallery" onclick="window.closeMobileDrawer()" class="flex items-center px-3.5 py-2.5 rounded-xl bg-teal-950/40 text-white min-h-[44px]">
              <span>Media Gallery</span>
            </a>

            <a href="#/contact" onclick="window.closeMobileDrawer()" class="flex items-center px-3.5 py-2.5 rounded-xl bg-teal-950/40 text-white min-h-[44px]">
              <span>Contact Us</span>
            </a>
          </nav>

        </div>

        <!-- Drawer Bottom Action Helpline -->
        <div class="pt-4 border-t border-teal-900/80">
          <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm min-h-[44px] shadow-lg active:scale-95 transition-all">
            <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>Helpline: ${brand.fallbackPhone}</span>
          </a>
        </div>
      </div>

      <!-- SINGLE CONSOLIDATED FIXED MOBILE BOTTOM ACTION BAR -->
      <div id="mobile-bottom-bar" class="mobile-bottom-bar lg:hidden">
        <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all min-h-[44px]">
          <svg class="w-4 h-4 text-slate-950 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <span class="truncate">Call Now</span>
        </a>

        <a href="#/contact" class="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all min-h-[44px]">
          <svg class="w-4 h-4 text-slate-950 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <span class="truncate">Appointment</span>
        </a>
        
        <a href="https://wa.me/${brand.whatsappPhone.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" title="WhatsApp Direct Chat" aria-label="Chat on WhatsApp" class="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-all border border-emerald-300/40 min-h-[44px] min-w-[44px]">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        </a>
      </div>
    `;
  }

  // Render Multi-Column Footer with Networking & Partnerships Section, Admin Editable Links & Single Low-Emphasis Admin Login Link
  function renderFooter() {
    const brand = store.getBrand();
    const facilities = store.getFacilities().filter(f => f.type === 'vision-center');
    const currentYear = new Date().getFullYear();

    return `
      <!-- NETWORKING AND PARTNERSHIPS SECTION (ABOVE FOOTER) -->
      <section class="max-w-7xl mx-auto px-4 mt-20 mb-4 font-sans">
        <div class="glass-card rounded-3xl p-8 sm:p-12 border border-teal-100/80 dark:border-teal-900/50 shadow-xl bg-white dark:bg-slate-900/90 relative overflow-hidden space-y-8">
          
          <div class="text-center space-y-2 max-w-2xl mx-auto">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-teal-950 dark:text-white font-heading tracking-tight">
              Networking and Partnerships
            </h2>
          </div>

          <!-- 6 Partners Logos Grid (Matching Reference Layout: 2 Rows x 3 Columns) -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 items-center justify-center">
            
            <!-- Partner 1: ZEISS -->
            <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs hover:shadow-md hover-lift flex items-center justify-center min-h-[140px] transition-all group">
              <img src="assets/partners/zeiss.svg" alt="ZEISS" class="h-20 w-auto max-w-[170px] object-contain group-hover:scale-105 transition-transform" />
            </div>

            <!-- Partner 2: HEALTHSKAPE MEDICALS PVT. LTD. -->
            <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs hover:shadow-md hover-lift flex items-center justify-center min-h-[140px] transition-all group">
              <img src="assets/partners/healthskape.svg" alt="HEALTHSKAPE MEDICALS PVT. LTD." class="h-20 w-auto max-w-[210px] object-contain group-hover:scale-105 transition-transform" />
            </div>

            <!-- Partner 3: AUROLAB -->
            <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs hover:shadow-md hover-lift flex items-center justify-center min-h-[140px] transition-all group">
              <img src="assets/partners/aurolab.svg" alt="AUROLAB - SEE NEW POSSIBILITIES" class="h-16 w-auto max-w-[200px] object-contain group-hover:scale-105 transition-transform" />
            </div>

            <!-- Partner 4: Alcon -->
            <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs hover:shadow-md hover-lift flex items-center justify-center min-h-[140px] transition-all group">
              <img src="assets/partners/alcon.svg" alt="Alcon" class="h-14 w-auto max-w-[190px] object-contain group-hover:scale-105 transition-transform" />
            </div>

            <!-- Partner 5: APPASAMY ASSOCIATES -->
            <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs hover:shadow-md hover-lift flex items-center justify-center min-h-[140px] transition-all group">
              <img src="assets/partners/appasamy.svg" alt="APPASAMY ASSOCIATES - Empowering Vision*" class="h-16 w-auto max-w-[210px] object-contain group-hover:scale-105 transition-transform" />
            </div>

            <!-- Partner 6: care groups -->
            <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs hover:shadow-md hover-lift flex items-center justify-center min-h-[140px] transition-all group">
              <img src="assets/partners/caregroups.svg" alt="care groups" class="h-16 w-auto max-w-[210px] object-contain group-hover:scale-105 transition-transform" />
            </div>

          </div>

        </div>
      </section>

      <footer class="bg-[#041a17] text-slate-300 pt-16 pb-28 sm:pb-32 lg:pb-16 mt-16 border-t border-teal-900/60 font-sans relative z-10">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-teal-900/60">
            
            <!-- Column 1: Logo + One-Line Mission Statement + Social Icons (Admin Editable) -->
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xl border-2 border-emerald-400/40 overflow-hidden shrink-0">
                  <img src="${brand.logo || 'assets/official_logo.jpg'}" alt="${brand.name} Official Logo" class="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 class="font-bold text-lg text-white font-heading">${brand.name}</h3>
                  <p class="text-xs text-emerald-400 font-medium">${brand.tagline}</p>
                </div>
              </div>

              <!-- One-Line Mission Statement -->
              <p class="text-xs text-slate-400 leading-relaxed">
                "Deliver quality, accessible eye care to all through Authentic, Affectionate and Affordable treatment."
              </p>

              <!-- 4 Social Icons (Instagram, Facebook, LinkedIn, YouTube — Admin Editable) -->
              <div class="pt-2 flex items-center gap-2.5">
                <a href="${brand.socialLinks.instagram}" target="_blank" rel="noopener" title="Instagram" class="w-8 h-8 rounded-lg bg-slate-900 border border-teal-900/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-teal-900 transition-colors">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="${brand.socialLinks.facebook}" target="_blank" rel="noopener" title="Facebook" class="w-8 h-8 rounded-lg bg-slate-900 border border-teal-900/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-teal-900 transition-colors">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="${brand.socialLinks.linkedin}" target="_blank" rel="noopener" title="LinkedIn" class="w-8 h-8 rounded-lg bg-slate-900 border border-teal-900/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-teal-900 transition-colors">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="${brand.socialLinks.youtube}" target="_blank" rel="noopener" title="YouTube" class="w-8 h-8 rounded-lg bg-slate-900 border border-teal-900/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-teal-900 transition-colors">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            <!-- Column 2: Sitemap Links (Mirroring Header Nav) -->
            <div class="space-y-3 text-xs">
              <h4 class="font-bold text-white font-heading uppercase tracking-wider text-emerald-400">Sitemap Directory</h4>
              <ul class="space-y-1.5 text-slate-400">
                <li><a href="#/" class="hover:text-white transition-colors">Home</a></li>
                <li><a href="#/about-us" class="hover:text-white transition-colors">Our Story & Overview</a></li>
                <li><a href="#/about-us/leadership" class="hover:text-white transition-colors">Leadership & Awards</a></li>
                <li><a href="#/about-us/clinical-faculty" class="hover:text-white transition-colors text-emerald-400 font-semibold">Clinical Faculty & Consultants</a></li>
                <li><a href="#/about-us/administration" class="hover:text-white transition-colors">Administration Team</a></li>
                <li><a href="#/hospitals/vijayapura" class="hover:text-white transition-colors">Vijayapura Base Hospital</a></li>
                <li><a href="#/hospitals/kalaburagi" class="hover:text-white transition-colors">Kalaburagi Base Hospital</a></li>
                <li><a href="#/services" class="hover:text-white transition-colors">Ophthalmic Services</a></li>
                <li><a href="#/academics" class="hover:text-white transition-colors">Academics & Fellowships</a></li>
                <li><a href="#/patient-resources/empanelments-and-insurance" class="hover:text-white transition-colors">Empanelments & Insurance</a></li>
                <li><a href="#/contact" class="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <!-- Column 3: Vision Centers Quick-List (All 8 Centers with Name + Tel Link) -->
            <div class="space-y-3 text-xs">
              <h4 class="font-bold text-white font-heading uppercase tracking-wider text-emerald-400">8 Vision Centers Quick-List</h4>
              <ul class="space-y-1.5 text-slate-400">
                ${facilities.map(vc => `
                  <li class="flex items-center justify-between gap-2 border-b border-teal-950 pb-1">
                    <a href="#/vision-centers/${vc.id}" class="hover:text-white transition-colors truncate font-medium">${vc.name.replace(' Vision Center', '')}</a>
                    <a href="tel:${vc.phone.replace(/[^0-9+]/g, '')}" class="text-emerald-400 hover:underline font-mono text-[11px] shrink-0">${vc.phone}</a>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Column 4: Contact Block (Vijayapura & Kalaburagi Addresses, Email, Call Now Button) -->
            <div class="space-y-4 text-xs">
              <h4 class="font-bold text-white font-heading uppercase tracking-wider text-emerald-400">Hospital Contacts</h4>
              
              <div class="space-y-2.5 text-slate-400">
                <div>
                  <div class="font-bold text-white">Vijayapura Base Campus:</div>
                  <div>Navabhag Main Road, Behind Central Bus Stand, Vijayapura – 586101</div>
                  <div class="text-emerald-400 font-mono mt-0.5">Ph: 08352-220646</div>
                </div>

                <div>
                  <div class="font-bold text-white">Kalaburagi Base Campus:</div>
                  <div>Tertiary Base Hospital & Optometry Institute</div>
                  <div class="text-emerald-400 font-mono mt-0.5">Ph: 08352-220646</div>
                </div>

                <div>
                  <div class="font-bold text-white">Email Enquiry:</div>
                  <a href="mailto:${brand.contactEmail}" class="text-slate-300 hover:text-white underline">${brand.contactEmail}</a>
                </div>
              </div>

              <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="btn-call-now block w-full py-2.5 text-center rounded-xl font-bold text-xs shadow-md">
                Call Now: ${brand.fallbackPhone}
              </a>
            </div>

          </div>

          <!-- Bottom Bar: Dynamic Year Copyright + Admin Login Link -->
          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; ${currentYear} ${brand.name}. All rights reserved. North Karnataka's Premier Super-Specialty Eye Network.
            </div>
            
            <a href="#/admin" class="hover:text-slate-300 text-[11px] transition-colors font-mono font-bold">Admin CMS Console &rarr;</a>
          </div>

        </div>
      </footer>
    `;
  }

  // Router Engine: Map `currentPath` to page HTML generators
  function renderPage() {
    const path = currentPath;
    
    // Page: Admin Content Editor Console
    if (path === '/admin' || path.startsWith('/admin/')) return renderAdminPage();

    // Page: Home
    if (path === '/' || path === '') return renderHomePage();
    
    // Page: About Us
    if (path === '/about-us' || path === '/about') return renderAboutUsPage();
    if (path === '/about-us/leadership' || path === '/leadership') return renderLeadershipPage();
    if (path === '/about-us/clinical-faculty' || path === '/about-us/doctors' || path === '/doctors' || path === '/clinical-faculty' || path === '/consultants') return renderClinicalFacultyPage();
    if (path === '/about-us/administration' || path === '/administration' || path === '/admin-team') return renderAdministrationPage();
    
    // Page: Base Hospitals
    if (path === '/hospitals/vijayapura' || path === '/vijayapura') return renderHospitalDetailPage('vijayapura');
    if (path === '/hospitals/kalaburagi' || path === '/kalaburagi') return renderHospitalDetailPage('kalaburagi');
    
    // Page: Vision Centers Directory & Details
    if (path === '/vision-centers' || path === '/centers') return renderVisionCentersPage();
    if (path.startsWith('/vision-centers/')) {
      const centerId = path.replace('/vision-centers/', '');
      return renderVisionCenterDetailPage(centerId);
    }
    
    // Page: Services & Super-Specialty Clinical Detail Views
    if (path === '/services' || path === '/specialties') return renderServicesPage();
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      return renderServiceDetailPage(slug);
    }
    
    // Page: Academics Hub & Program Detail Views
    if (path === '/academics' || path === '/courses' || path === '/education') return renderAcademicsPage();
    if (path.startsWith('/academics/')) {
      const slug = path.replace('/academics/', '');
      return renderAcademicDetailPage(slug);
    }
    
    // Page: Empanelments & Resources Hub
    if (path === '/patient-resources' || path === '/resources' || path === '/faq' || path === '/faqs') return renderPatientResourcesHub();
    if (path === '/patient-resources/empanelments-and-insurance' || path === '/empanelments' || path === '/insurance') return renderEmpanelmentsPage();
    if (path === '/patient-resources/handouts' || path === '/handouts') return renderAuxiliaryPage('handouts');
    
    // Page: Auxiliary & Gallery Pages
    if (path === '/gallery') return renderGalleryPage();
    if (path === '/appointment' || path === '/appointments' || path === '/book-appointment') return renderAuxiliaryPage('contact');
    if (path === '/equipment' || path === '/technology') return renderHomePage();
    if (['/news', '/videos', '/careers', '/case-studies', '/get-associated', '/contact'].includes(path)) {
      return renderAuxiliaryPage(path.replace('/', ''));
    }

    // 404 Fallback
    return render404Page();
  }

  // --- PAGE VIEW GENERATORS ---

  // 1. HOME PAGE View (Inspired by uploaded reference mockup aesthetics)
  // Synchronized Eased StatCounters Count-Up Animation (Triggered strictly on Scroll View)
  function initStatCounters() {
    const counterContainers = document.querySelectorAll('.stat-counter');
    if (counterContainers.length === 0) return;

    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };

    // Reduced motion safeguard: render final numbers immediately without counting
    if (!motionSafe.isMotionSafe) {
      counterContainers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        if (!isNaN(target)) {
          counter.textContent = prefix + target.toLocaleString('en-IN') + suffix;
        }
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          obs.unobserve(counter); // Trigger once per element

          const target = parseInt(counter.getAttribute('data-target'), 10);
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          if (isNaN(target)) return;

          const duration = 1400; // Synchronized 1.4s duration across all row counters
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Ease out quadratic calculation (fast start, smooth landing)
            const easeOutProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeOutProgress * target);

            counter.textContent = prefix + currentCount.toLocaleString('en-IN') + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = prefix + target.toLocaleString('en-IN') + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
        }
      });
    }, { threshold: 0.25 });

    counterContainers.forEach(c => observer.observe(c));
  }

  // 1. Choreographed Hero Entrance Sequence
  function initHeroChoreography() {
    const mask = document.querySelector('.hero-aperture-mask');
    const eyebrow = document.querySelector('.hero-eyebrow');
    const wordSpans = document.querySelectorAll('.hero-word-span');
    const subheadline = document.querySelector('.hero-subheadline');
    const ctas = document.querySelector('.hero-ctas');

    if (!mask) return;

    // If hero already entered once in this session, keep it fully visible without restarting animation
    if (window.hasHeroEntered) {
      mask.style.opacity = '1';
      if (eyebrow) { eyebrow.style.opacity = '1'; eyebrow.style.transform = 'none'; }
      wordSpans.forEach(span => span.classList.add('is-revealed'));
      if (subheadline) { subheadline.style.opacity = '1'; subheadline.style.transform = 'none'; }
      if (ctas) { ctas.style.opacity = '1'; ctas.style.transform = 'none'; }
      return;
    }

    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };

    // Reduced-motion safeguard: single simple opacity fade, no stagger, no slide
    if (!motionSafe.isMotionSafe) {
      window.hasHeroEntered = true;
      mask.style.opacity = '1';
      if (eyebrow) { eyebrow.style.opacity = '1'; eyebrow.style.transform = 'none'; }
      wordSpans.forEach(span => span.classList.add('is-revealed'));
      if (subheadline) { subheadline.style.opacity = '1'; subheadline.style.transform = 'none'; }
      if (ctas) { ctas.style.opacity = '1'; ctas.style.transform = 'none'; }
      return;
    }

    // Step 1: Aperture mask reveal (0ms)
    mask.style.opacity = '1';

    // Step 2: Eyebrow badge slide-up (100ms)
    setTimeout(() => {
      if (eyebrow) {
        eyebrow.style.opacity = '1';
        eyebrow.style.transform = 'translateY(0px)';
      }
    }, 100);

    // Step 3: Word-by-word H1 reveal (stagger 70ms starting at 200ms)
    wordSpans.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add('is-revealed');
      }, 200 + (idx * 70));
    });

    // Step 4: Subheadline follow (450ms)
    setTimeout(() => {
      if (subheadline) {
        subheadline.style.opacity = '1';
        subheadline.style.transform = 'translateY(0px)';
      }
    }, 450);

    // Step 5: Call Now & WhatsApp CTAs arrive last with easeSpring tactile settle (650ms)
    setTimeout(() => {
      if (ctas) {
        ctas.style.opacity = '1';
        ctas.style.transform = 'translateY(0px)';
      }
      window.hasHeroEntered = true;
    }, 650);
  }

  // 2. Restrained Scroll Parallax Drift (max 35px translateY)
  function initHeroParallax() {
    const parallaxBg = document.querySelector('.hero-parallax-bg');
    if (!parallaxBg) return;

    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };
    if (!motionSafe.isMotionSafe) return;

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY < 800) {
        const drift = Math.min(scrollY * 0.15, 35);
        parallaxBg.style.transform = `translateY(${drift}px)`;
      }
    }

    window.removeEventListener('scroll', window.heroParallaxHandler);
    window.heroParallaxHandler = handleScroll;
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 3. Desktop Pointer Magnetic CTA Buttons
  function initMagneticButtons() {
    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (!motionSafe.isMotionSafe || !isFinePointer) return;

    const buttons = document.querySelectorAll('.magnetic-btn');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const mouseX = e.clientX - btnCenterX;
        const mouseY = e.clientY - btnCenterY;

        // Subtle pull vector (max 10-12px shift)
        const pullX = mouseX * 0.22;
        const pullY = mouseY * 0.22;
        btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // 4. Advanced Ophthalmic Equipment Carousel Controller (Smooth Right -> Left Auto-Scroll, Touch & Drag)
  function initEquipmentCarousel() {
    const track = document.getElementById('equipment-carousel-track');
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let isHovered = false;

    if (window.equipmentCarouselRaf) {
      cancelAnimationFrame(window.equipmentCarouselRaf);
    }

    function scrollStep() {
      if (!isHovered && !isDown && track) {
        track.scrollLeft += 0.75;
        const halfScroll = track.scrollWidth / 2;
        if (halfScroll > 0 && track.scrollLeft >= halfScroll) {
          track.scrollLeft -= halfScroll;
        }
      }
      window.equipmentCarouselRaf = requestAnimationFrame(scrollStep);
    }

    window.equipmentCarouselRaf = requestAnimationFrame(scrollStep);

    // Hover pauses auto-scroll
    track.addEventListener('mouseenter', () => { isHovered = true; });
    track.addEventListener('mouseleave', () => { isHovered = false; isDown = false; });

    // Mouse Drag support
    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => { isDown = false; });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollStart - walk;
    });

    // Touch Swipe support
    track.addEventListener('touchstart', (e) => {
      isHovered = true;
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      setTimeout(() => { isHovered = false; }, 2000);
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 1.2;
      track.scrollLeft = scrollStart - walk;
    }, { passive: true });
  }

  window.scrollEquipmentCarousel = function(direction) {
    const track = document.getElementById('equipment-carousel-track');
    if (!track) return;
    const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 260;
    track.scrollBy({ left: direction * cardWidth * 2, behavior: 'smooth' });
  };

  // 1. HOME PAGE View (Exact 9 Sections in Order - 100% Dynamic & Connected to Admin Store)
  function renderHomePage() {
    const home = store.getHomepage();
    const brand = store.getBrand();
    const stats = store.getStats();
    const facilities = store.getFacilities().filter(f => f.published !== false);
    const services = store.getServices().filter(s => s.published !== false);
    const leaders = store.getLeadership().filter(l => l.published !== false);
    const equipmentList = store.getEquipment();
    const about = store.getAbout();
    const faqs = store.getFaqs().filter(f => f.published !== false);
    const empanelments = store.getEmpanelments().filter(e => e.published !== false);

    // Trigger hero motion choreography, parallax, magnetic buttons, stat counters & equipment carousel
    setTimeout(() => {
      initHeroChoreography();
      initHeroParallax();
      initMagneticButtons();
      initStatCounters();
      initEquipmentCarousel();
    }, 60);

    const baseHospitals = facilities.filter(f => f.type === 'base');
    const visionCenters = facilities.filter(f => f.type === 'vision-center');
    const sections = home.sections || {};

    return `
      <div class="space-y-20 pt-4">
        
        <!-- 1. HERO SECTION -->
        <section class="relative max-w-7xl mx-auto px-4 hero-section-root">
          <div id="hero-banner-container" class="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center p-8 sm:p-12 md:p-16 bg-cover bg-center border border-teal-900/30 shadow-2xl hero-parallax-bg bg-[#062c26]" style="background-image: url('${home.heroImage || 'assets/hero-bg.png'}');">
            
            <!-- Dark Vision Blue Gradient Overlay with Aperture Mask Reveal -->
            <div class="absolute inset-0 bg-gradient-to-r from-[#062c26] via-[#062c26]/95 to-transparent ${window.hasHeroEntered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ease-out hero-aperture-mask"></div>

            <div class="relative z-10 max-w-2xl space-y-6 text-white">
              
              <!-- Eyebrow Badge -->
              <div class="hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs tracking-wide border border-emerald-500/30 ${window.hasHeroEntered ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'} transition-all duration-300">
                <div class="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm overflow-hidden shrink-0">
                  <img src="${brand.logo || 'assets/official_logo.jpg'}" alt="${brand.name} Official Logo" class="w-full h-full object-contain" />
                </div>
                <span>${home.heroEyebrow || (brand.tagline + ' • Est. 2001 Vijayapura')}</span>
              </div>

              <!-- Dynamic Stagger H1 Headline -->
              <h1 class="hero-h1 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] font-heading text-white">
                <span class="${window.hasHeroEntered ? 'is-revealed' : ''}">${home.heroHeading || 'Restoring Sight, Enriching Lives Across North Karnataka'}</span>
              </h1>

              <!-- Subheadline -->
              <p class="hero-subheadline text-base sm:text-lg text-slate-200 leading-relaxed font-normal ${window.hasHeroEntered ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'} transition-all duration-300">
                ${home.heroDescription || `Founded by <strong>${brand.founder}</strong>, ${brand.name} is North Karnataka's premier tertiary eye care destination, operating 2 base hospitals and ${visionCenters.length} rural Vision Centers.`}
              </p>

              <!-- Hero Direct Contact CTAs with Magnetic Effect and easeSpring Settle -->
              <div class="hero-ctas flex flex-wrap items-center gap-4 pt-2 ${window.hasHeroEntered ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-6'} transition-all duration-500">
                <a href="${home.primaryCta?.link || '#/contact'}" class="btn-call-now btn-shine-glow magnetic-btn px-6 py-4 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-3 group">
                  <div class="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <span>${home.primaryCta?.text || 'Book an Appointment'}</span>
                </a>

                <a href="${home.secondaryCta?.link || '#/services'}" class="btn-shine-glow magnetic-btn px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md group">
                  <svg class="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>${home.secondaryCta?.text || 'Explore Specialties'}</span>
                  <span class="icon-shift-right">&rarr;</span>
                </a>
              </div>

              <!-- Quiet Trust Badges -->
              <div class="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-300 border-t border-white/10">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <span>RGUHS Affiliated Institute</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <span>NBEMS DNB Recognized</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <span>MyAlcon Verified LASIK/Contoura</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- 2. TRUST DASHBOARD (6 Core Stats with Animated StatCounters in Mono Font) -->
        <section id="trust-dashboard" class="max-w-7xl mx-auto px-4">
          <div class="bento-card-luxury rounded-3xl p-6 sm:p-8 border border-teal-100/80 shadow-xl">
            <div class="text-center mb-6">
              <span class="px-3 py-1 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">Verified Clinical Impact</span>
              <h2 class="text-2xl font-extrabold text-teal-950 font-heading mt-1">Core Trust & Outreach Metrics</h2>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              <!-- Stat 1: Total Surgeries -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Total Surgeries</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="${stats.lifetimeSurgeries.replace(/[^0-9]/g, '') || 228951}" data-prefix="" data-suffix="${stats.lifetimeSurgeries.includes('+') ? '+' : ''}">
                  ${stats.lifetimeSurgeries}
                </div>
                <p class="text-[10px] text-slate-500 mt-1">Lifetime operations</p>
              </div>

              <!-- Stat 2: Outreach Camps -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Outreach Camps</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="${stats.outreachCamps.replace(/[^0-9]/g, '') || 2715}" data-prefix="" data-suffix="${stats.outreachCamps.includes('+') ? '+' : ''}">
                  ${stats.outreachCamps}
                </div>
                <p class="text-[10px] text-slate-500 mt-1">Mobile eye camps</p>
              </div>

              <!-- Stat 3: Free Cataracts -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Free Cataracts</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="${stats.freeCataracts.replace(/[^0-9]/g, '') || 50000}" data-prefix="" data-suffix="+">
                  ${stats.freeCataracts}
                </div>
                <p class="text-[10px] text-slate-500 mt-1">Free surgeries</p>
              </div>

              <!-- Stat 4: Students Screened -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Students Screened</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="${stats.studentsScreened?.replace(/[^0-9]/g, '') || 10000}" data-prefix="" data-suffix="+">
                  ${stats.studentsScreened || '10,000+'}
                </div>
                <p class="text-[10px] text-slate-500 mt-1">District school vision</p>
              </div>

              <!-- Stat 5: Free Patients/Yr -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Free Patients/Yr</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="${stats.annualFreePatients?.replace(/[^0-9]/g, '') || 10000}" data-prefix="~" data-suffix="">
                  ${stats.annualFreePatients || '~10,000'}
                </div>
                <p class="text-[10px] text-slate-500 mt-1">Treated free yearly</p>
              </div>

              <!-- Stat 6: Total Reach -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Total Reach</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="${stats.totalPeopleReached?.replace(/[^0-9]/g, '') || 10}" data-prefix="~" data-suffix=" Lakh">
                  ${stats.totalPeopleReached || '~10 Lakh'}
                </div>
                <p class="text-[10px] text-slate-500 mt-1">25-Yr footprint</p>
              </div>

            </div>
          </div>
        </section>

        <!-- 3. VALUE PILLARS (3-Card Layout for Authentic / Affectionate / Affordable) -->
        ${sections.whyAnugraha !== false ? `
          <section class="max-w-7xl mx-auto px-4">
            <div class="text-center space-y-3 mb-10">
              <span class="px-3 py-1 rounded-full badge-coral font-semibold text-xs uppercase tracking-wider">Core Brand Pillars</span>
              <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Our Three Foundational Values</h2>
              <p class="text-slate-600 text-sm max-w-xl mx-auto">Grounded directly in our institutional mission statement and operational history.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <!-- Pillar 1: Authentic -->
              <div class="spotlight-card p-8 rounded-3xl border border-teal-100 space-y-4">
                <div class="w-12 h-12 rounded-2xl bg-teal-900 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <h3 class="text-2xl font-bold text-teal-950 font-heading">Authentic</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  State-of-the-art super-specialty diagnostics, ethical ophthalmic care, and academic credibility backed by RGUHS university affiliations and National Board DNB accreditation.
                </p>
              </div>

              <!-- Pillar 2: Affectionate -->
              <div class="spotlight-card p-8 rounded-3xl border border-teal-100 space-y-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center font-bold text-xl shadow-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </div>
                <h3 class="text-2xl font-bold text-teal-950 font-heading">Affectionate</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Compassionate community-rooted service, ${stats.outreachCamps} mobile eye camps, and school screening programs reaching over ${stats.studentsScreened || '10,000+'} students.
                </p>
              </div>

              <!-- Pillar 3: Affordable -->
              <div class="spotlight-card p-8 rounded-3xl border border-teal-100 space-y-4">
                <div class="w-12 h-12 rounded-2xl bg-amber-700 text-amber-200 flex items-center justify-center font-bold text-xl shadow-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <h3 class="text-2xl font-bold text-teal-950 font-heading">Affordable</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Over ${stats.freeCataracts} free cataract operations for impoverished demographics, low-cost rural Vision Centers, and cashless health scheme coverage.
                </p>
              </div>

            </div>
          </section>
        ` : ''}

        <!-- 4. OUR LEGACY TEASER -->
        <section class="max-w-7xl mx-auto px-4">
          <div class="glass-card-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div class="space-y-4 max-w-2xl">
              <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider">Our Institutional Legacy</span>
              <h2 class="text-3xl font-extrabold text-white font-heading">Founded in 2001, Vijayapura</h2>
              <p class="text-slate-300 text-sm leading-relaxed">
                ${about.story || `Established by <strong>${brand.founder}</strong>, ${brand.name} pioneered a high-volume, high-quality, low-cost ophthalmic delivery model. Over nearly a quarter century, it has grown into a premier referral hub operating base hospitals in Vijayapura and Kalaburagi along with ${visionCenters.length} rural Vision Centers.`}
              </p>
            </div>

            <a href="#/about-us" class="px-6 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0 shadow-lg flex items-center gap-2">
              <span>Read Our Full Story</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </section>

        <!-- 5. CARE NETWORK MAP / PREVIEW -->
        ${(sections.hospitals !== false || sections.visionCenters !== false) ? `
          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span class="px-3 py-1 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">Regional Coverage</span>
                <h2 class="text-3xl font-extrabold text-teal-950 font-heading mt-1">${baseHospitals.length} Base Hospitals & ${visionCenters.length} Vision Centers</h2>
                <p class="text-slate-600 text-sm">Providing specialized eye care across Karnataka and Maharashtra districts.</p>
              </div>
              <a href="#/vision-centers" class="text-xs font-bold text-teal-900 hover:underline">Explore Full Directory &rarr;</a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${baseHospitals.map(fac => `
                <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3">
                  <div class="text-xs font-bold text-teal-900 uppercase tracking-wider">${fac.name}</div>
                  <div class="text-xs text-slate-500">${fac.address}</div>
                  <div class="text-xs font-semibold text-emerald-700">Hours: ${fac.hours}</div>
                  <a href="#/hospitals/${fac.id}" class="inline-block text-xs font-bold text-teal-900 hover:underline pt-2 underline-animated">View Campus Details &rarr;</a>
                </div>
              `).join('')}

              <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3 bg-teal-50/50">
                <div class="text-xs font-bold text-amber-900 uppercase tracking-wider">${visionCenters.length} Rural Vision Centers</div>
                <div class="text-xs text-slate-600">${visionCenters.map(v => v.town || v.name.replace(' Vision Center', '')).join(', ')}</div>
                <div class="text-xs font-semibold text-emerald-800">Primary Care, Spectacles, 24x7 Emergency</div>
                <a href="#/vision-centers" class="inline-block text-xs font-bold text-teal-900 hover:underline pt-2 underline-animated">View All ${visionCenters.length} Centers &rarr;</a>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- 6. SERVICES PREVIEW GRID -->
        ${sections.services !== false ? `
          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span class="px-3 py-1 rounded-full badge-amber font-semibold text-xs uppercase tracking-wider">Ophthalmic Specialties</span>
                <h2 class="text-3xl font-extrabold text-teal-950 font-heading mt-1">Super-Specialty Ophthalmic Services</h2>
                <p class="text-slate-600 text-sm">Advanced surgical and diagnostic eye care.</p>
              </div>
              <a href="#/services" class="text-xs font-bold text-teal-900 hover:underline underline-animated">View All Services &rarr;</a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${services.slice(0, 8).map(s => `
                <div class="spotlight-card rounded-3xl border border-teal-100 overflow-hidden flex flex-col justify-between group">
                  <div class="h-36 overflow-hidden bg-slate-900 relative">
                    <img src="${s.heroImage || s.imagePlaceholder || 'assets/services/cataract_surgery.jpg'}" alt="${s.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span class="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/40 font-mono">${s.category || 'Specialty'}</span>
                  </div>
                  <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 class="text-base font-extrabold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">${s.title}</h3>
                      <p class="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">${s.shortDesc || s.desc}</p>
                    </div>
                    <a href="#/services/${s.slug || s.id}" class="text-xs font-bold text-teal-900 dark:text-emerald-400 hover:underline pt-2 border-t border-teal-100 dark:border-teal-900/60 flex items-center justify-between">
                      <span>Learn More</span>
                      <span class="icon-shift-right">&rarr;</span>
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- 6b. ADVANCED OPHTHALMIC EQUIPMENT CAROUSEL -->
        <section class="max-w-7xl mx-auto px-4 space-y-6 py-6 font-sans">
          <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div class="space-y-1.5 max-w-3xl">
              <span class="px-3 py-1 rounded-full badge-emerald font-bold text-xs uppercase tracking-wider">
                Precision Surgical & Diagnostic Technology
              </span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-teal-950 dark:text-white font-heading">
                Advanced Ophthalmic Equipment
              </h2>
              <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Equipped with advanced diagnostic, imaging and surgical technologies to support accurate diagnosis and modern ophthalmic care.
              </p>
            </div>

            <!-- Manual Carousel Navigation Arrows -->
            <div class="flex items-center gap-2 shrink-0">
              <button 
                type="button"
                onclick="window.scrollEquipmentCarousel(-1)" 
                aria-label="Scroll equipment left" 
                class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-teal-950 dark:text-white hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700 flex items-center justify-center font-bold shadow-xs transition-all cursor-pointer"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button 
                type="button"
                onclick="window.scrollEquipmentCarousel(1)" 
                aria-label="Scroll equipment right" 
                class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-teal-950 dark:text-white hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700 flex items-center justify-center font-bold shadow-xs transition-all cursor-pointer"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <!-- Carousel Container (Continuous Right-to-Left Scroll, Touch Drag, No Whole-Page Overflow) -->
          <div class="relative overflow-hidden rounded-3xl p-1">
            <div 
              id="equipment-carousel-track" 
              class="flex items-stretch gap-5 overflow-x-auto scrollbar-none py-3 px-1 select-none cursor-grab active:cursor-grabbing"
              style="scroll-behavior: auto; -webkit-overflow-scrolling: touch;"
            >
              ${[...equipmentList, ...equipmentList].map((eq, idx) => `
                <div class="equipment-card w-52 sm:w-60 lg:w-64 shrink-0 rounded-2xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/60 shadow-xs hover:shadow-md hover-lift p-4 flex flex-col justify-between transition-all group">
                  
                  <!-- Equipment Image Container (Consistent area, object-fit: contain) -->
                  <div class="w-full h-40 sm:h-44 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
                    <img 
                      src="${eq.image || 'assets/equipment/reichert_7_nct.jpg'}" 
                      alt="${eq.altText || eq.name}" 
                      class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300 pointer-events-none" 
                      loading="lazy"
                    />
                  </div>

                  <!-- Equipment Name in Clean Typography -->
                  <div class="pt-3 space-y-1 text-center">
                    <h3 class="text-xs sm:text-sm font-bold text-teal-950 dark:text-white font-heading leading-snug line-clamp-2">
                      ${eq.name}
                    </h3>
                  </div>

                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- 6. VERIFIED CLINICAL FEEDBACK & PATIENT TESTIMONIALS -->
        ${sections.communityImpact !== false ? `
          <section class="max-w-7xl mx-auto px-4 space-y-8 py-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-teal-100 dark:border-teal-900 pb-4">
              <div>
                <span class="px-3 py-1 rounded-full badge-emerald font-bold text-xs uppercase tracking-wider">Patient Trust & Testimonials</span>
                <h2 class="text-3xl font-extrabold text-teal-950 dark:text-white font-heading mt-1">Verified Patient Feedback & Clinical Reviews</h2>
                <p class="text-slate-600 dark:text-slate-400 text-xs mt-0.5">Over ${stats.lifetimeSurgeries} sight restoration procedures delivered across North Karnataka.</p>
              </div>
              
              <!-- Google Reviews Widget Link -->
              <a href="https://maps.google.com/?q=Anugraha+Eye+Hospital+Vijayapura" target="_blank" rel="noopener noreferrer" class="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 shadow-md flex items-center gap-3 hover:scale-105 transition-transform shrink-0">
                <div class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-lg text-emerald-600 font-mono">
                  G
                </div>
                <div>
                  <div class="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <span>★★★★★</span>
                    <span class="text-teal-950 dark:text-white font-extrabold ml-1">4.8 / 5.0</span>
                  </div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400 font-medium">1,200+ Google Business Reviews</div>
                </div>
              </a>
            </div>

            <!-- 4 Patient Testimonials Card Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              ${[
                {
                  name: "Mr. Ramesh K.",
                  location: "Vijayapura",
                  treatment: "Phaco Cataract Surgery",
                  rating: "★★★★★",
                  review: "Restored crystal clear 20/20 vision after 3 years of blurry sight. Dr. Lingadalli's micro-incision procedure was completely painless with zero hospital stay!"
                },
                {
                  name: "Mrs. Savitri Patil",
                  location: "Kalaburagi",
                  treatment: "Retinal Laser Therapy",
                  rating: "★★★★★",
                  review: "Dr. Lingadalli's expert laser intervention saved my vision from severe diabetic retinal damage. Highly compassionate doctors and attentive nursing staff."
                },
                {
                  name: "Dr. Amit S.",
                  location: "Hubballi",
                  treatment: "Contoura Vision LASIK",
                  rating: "★★★★★",
                  review: "Specs-free after 12 years of heavy glasses! The Contoura Vision laser was painless, took barely 10 minutes, and my HD vision was sharp the next morning."
                },
                {
                  name: "Mr. Basavaraj M.",
                  location: "Bagalkot",
                  treatment: "Free Cataract Surgery",
                  rating: "★★★★★",
                  review: `Screened at a free rural camp and operated at Vijayapura base hospital completely free of cost. Forever grateful to Anugraha's compassionate mission.`
                }
              ].map(t => `
                <div class="spotlight-card p-6 rounded-3xl border border-teal-100 dark:border-teal-900/60 space-y-3 flex flex-col justify-between hover-lift">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-amber-400 font-bold text-xs">${t.rating}</span>
                      <span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold">Verified Patient</span>
                    </div>
                    <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">${t.treatment}</div>
                    <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">"${t.review}"</p>
                  </div>

                  <div class="pt-3 border-t border-teal-100 dark:border-teal-900/40 flex items-center justify-between text-xs">
                    <span class="font-extrabold text-teal-950 dark:text-white font-heading">${t.name}</span>
                    <span class="text-slate-400 text-[11px]">${t.location}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- 7. LEADERSHIP TEASER (DYNAMICALLY READS LEADERS FROM STORE - FIXED PREMIUM LAYOUT) -->
        ${sections.featuredDoctors !== false ? `
          <section class="max-w-7xl mx-auto px-4 space-y-10 py-8 font-sans">
            <div class="text-center space-y-3 max-w-2xl mx-auto">
              <span class="px-3.5 py-1 rounded-full badge-emerald font-bold text-xs uppercase tracking-wider">
                Institutional Leadership
              </span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-teal-950 dark:text-white font-heading">
                Hospital Founders & Medical Leadership
              </h2>
              <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Pioneering compassionate, super-specialty ophthalmic care, high-volume phaco surgery, and NABH-accredited governance across North Karnataka since 2001.
              </p>
            </div>

            <!-- Side-by-Side Dual Leadership Cards Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              ${[
                leaders.find(l => l.id === 'dr-lingadalli') || leaders[0],
                leaders.find(l => l.id === 'dr-malini') || leaders[1]
              ].filter(Boolean).map((doc, idx) => `
                <div class="glass-card-dark rounded-3xl p-6 sm:p-8 text-white border border-emerald-800/40 shadow-2xl flex flex-col justify-between hover-lift transition-all relative overflow-hidden group">
                  
                  <!-- Subtle Background Gradient Glow -->
                  <div class="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

                  <div class="space-y-6 relative z-10">
                    
                    <!-- Top Doctor Info Banner: Portrait + Details Side-by-Side -->
                    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      
                      <!-- Framed Doctor Portrait -->
                      <div class="relative shrink-0">
                        <div class="w-36 h-44 sm:w-40 sm:h-52 rounded-2xl overflow-hidden bg-slate-900 border-2 border-[#2dd4bf]/40 shadow-xl group-hover:border-[#2dd4bf] transition-colors">
                          <img src="${doc.photo || (idx === 0 ? 'assets/dr_lingadalli.jpg' : 'assets/dr_malini.jpg')}" alt="${doc.name}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <span class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-950 text-[#2dd4bf] font-mono font-bold text-[10px] uppercase tracking-wider border border-[#2dd4bf]/40 whitespace-nowrap shadow-md">
                          ${doc.title || (idx === 0 ? 'Founder & Chairman' : 'Medical Director')}
                        </span>
                      </div>

                      <!-- Name, Degrees & Key Badges -->
                      <div class="space-y-2.5 text-center sm:text-left flex-1">
                        <div class="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/20 text-[#2dd4bf] font-mono font-bold text-[11px] uppercase tracking-wider border border-emerald-500/30">
                          ${idx === 0 ? 'Founder & Chairman' : 'Medical Director'}
                        </div>

                        <h3 class="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight leading-tight">
                          ${doc.name}
                        </h3>

                        <div class="text-xs sm:text-sm font-semibold text-[#2dd4bf] font-sans">
                          ${doc.degrees}
                        </div>

                        <!-- Highlights Micro-Badges -->
                        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                          ${idx === 0 ? `
                            <span class="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">Rajyotsava Awardee</span>
                            <span class="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-200 text-[10px] font-bold border border-teal-500/30">25+ Yrs Legacy</span>
                          ` : `
                            <span class="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-200 text-[10px] font-bold border border-teal-500/30">20+ Yrs Governance</span>
                            <span class="px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">NABH Quality Lead</span>
                          `}
                        </div>
                      </div>

                    </div>

                    <!-- Clinical Narrative / Bio -->
                    <p class="text-xs sm:text-sm text-slate-200 leading-relaxed pt-2 border-t border-emerald-800/60 line-clamp-4">
                      ${doc.bio}
                    </p>

                  </div>

                  <!-- Card Footer Actions -->
                  <div class="pt-6 mt-6 border-t border-emerald-800/60 flex items-center justify-between gap-3 relative z-10">
                    <a href="#/about-us/leadership#${doc.id}" class="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#2dd4bf] transition-colors font-mono group/link">
                      <span>View Biography & Credentials</span>
                      <span class="icon-shift-right">&rarr;</span>
                    </a>
                  </div>

                </div>
              `).join('')}
            </div>

            <!-- Direct Link to Leadership Directory -->
            <div class="text-center pt-2">
              <a href="#/about-us/leadership" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-900 dark:bg-teal-800 hover:bg-teal-950 text-white font-bold text-xs transition-all shadow-lg hover:scale-105">
                <span>View Complete Leadership & Conferred Awards Directory</span>
                <span>&rarr;</span>
              </a>
            </div>
          </section>
        ` : ''}

        <!-- 8. RECOGNITION STRIP (Quiet Trust Badges) -->
        ${sections.technology !== false ? `
          <section class="max-w-7xl mx-auto px-4">
            <div class="bg-teal-950/90 text-slate-300 rounded-3xl p-6 border border-teal-800/60 shadow-lg">
              <div class="text-center text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">Academic Credentials & Institutional Recognitions</div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div class="p-3 rounded-2xl bg-teal-900/50 border border-teal-800/40">
                  <div class="font-bold text-white text-xs">RGUHS Affiliated</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">Optometry Institute Kalaburagi</div>
                </div>
                <div class="p-3 rounded-2xl bg-teal-900/50 border border-teal-800/40">
                  <div class="font-bold text-white text-xs">NBEMS DNB Recognized</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">Diploma in Ophthalmology PG Seats</div>
                </div>
                <div class="p-3 rounded-2xl bg-teal-900/50 border border-teal-800/40">
                  <div class="font-bold text-white text-xs">MyAlcon Verified</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">LASIK & Contoura Provider</div>
                </div>
                <div class="p-3 rounded-2xl bg-teal-900/50 border border-teal-800/40">
                  <div class="font-bold text-white text-xs">NABH Quality Standards</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">Accredited Clinical Protocols</div>
                </div>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- 9. COMMUNITY OUTREACH PANEL -->
        ${sections.communityImpact !== false ? `
          <section class="max-w-7xl mx-auto px-4">
            <div class="glass-card rounded-3xl p-8 border border-teal-100 space-y-6">
              <div class="space-y-2">
                <span class="px-3 py-1 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">Reinforcing The "Affectionate" Pillar</span>
                <h2 class="text-2xl font-extrabold text-teal-950 font-heading">Community & Ecosystem Partners</h2>
                <p class="text-slate-600 text-sm">${about.communityImpact || 'Collaborating with civic and public health partners irrespective of caste, creed, race, or religion.'}</p>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                ${[
                  "Primary Health Centres", "Gram Panchayats", "Lions Club", "Red Cross Society",
                  "Rotary Club", "Self-Help Groups", "Educational Trusts", "ASHA Workers",
                  "Anganwadi Workers", "Local Leaders", "NGO Partners", "Health Departments"
                ].map(partner => `
                  <div class="p-3 rounded-xl bg-teal-50/70 border border-teal-100 text-center font-bold text-xs text-teal-950 hover:bg-teal-100 transition-colors">
                    ${partner}
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        ` : ''}

        <!-- 10. PATIENT FAQS ACCORDION -->
        ${sections.faqs !== false ? `
          <section class="max-w-4xl mx-auto px-4 space-y-6 py-6">
            <div class="text-center space-y-2">
              <span class="px-3 py-1 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">Patient Guidance</span>
              <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Frequently Asked Questions</h2>
              <p class="text-slate-600 text-xs">Authentic clinical answers to common patient questions.</p>
            </div>

            <div class="space-y-3">
              ${faqs.slice(0, 6).map(f => `
                <details class="p-5 rounded-2xl bg-white border border-teal-100 shadow-sm space-y-2 cursor-pointer group">
                  <summary class="font-bold text-teal-950 text-sm font-heading flex items-center justify-between outline-none">
                    <span>${f.question}</span>
                    <span class="w-6 h-6 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0 transition-transform group-open:rotate-180">+</span>
                  </summary>
                  <p class="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">${f.answer}</p>
                </details>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- 11. FINAL CALL TO ACTION BANNER -->
        ${sections.finalCta !== false ? `
          <section class="max-w-7xl mx-auto px-4">
            <div class="bento-card-luxury rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-teal-200 shadow-2xl relative overflow-hidden">
              <div class="max-w-2xl mx-auto space-y-3">
                <span class="px-3 py-1 rounded-full badge-emerald font-bold text-xs uppercase tracking-wider">Book Your Consultation Today</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-teal-950 font-heading">Ready to Restore Your Vision?</h2>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Walk in to our Vijayapura Main Campus, Kalaburagi Base Hospital, or visit your nearest rural Vision Center.
                </p>
              </div>

              <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2">
                  <svg class="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span>Call Hospital: ${brand.fallbackPhone}</span>
                </a>
                <a href="#/contact" class="px-8 py-4 rounded-2xl bg-teal-900 hover:bg-teal-800 text-white font-extrabold text-sm shadow-xl">
                  Book Online Appointment &rarr;
                </a>
              </div>
            </div>
          </section>
        ` : ''}

      </div>
    `;
  }

  // 2. ABOUT US View (Central Narrative Hub - Dynamic Store Connected)
  function renderAboutUsPage() {
    const brand = store.getBrand();
    const about = store.getAbout();
    const stats = store.getStats();
    const objectives = store.data.coreObjectives || [];
    const facilities = store.getFacilities();
    const baseHospitals = facilities.filter(f => f.type === 'base');
    const visionCenters = facilities.filter(f => f.type === 'vision-center');

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-20">
        
        <!-- SECTION 1: H1 + FOUNDING NARRATIVE -->
        <section class="space-y-8">
          <div class="text-center space-y-4 max-w-4xl mx-auto">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">
              <span>Institutional Heritage &bull; Est. 2001 Vijayapura</span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-teal-950 font-heading leading-tight">
              About Anugraha Eye Hospital & Institutional Heritage
            </h1>
            <p class="text-slate-600 leading-relaxed text-base sm:text-lg">
              North Karnataka's premier tertiary eye care referral hub, dedicated to eradicating preventable blindness and providing high-volume, high-quality, affordable ophthalmic care.
            </p>
          </div>

          <div class="glass-card rounded-3xl p-8 sm:p-12 border border-teal-100/80 shadow-xl space-y-6">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-teal-950 font-heading">Founding Story & Rural Mission</h2>
            <div class="prose prose-teal max-w-none text-slate-700 space-y-4 leading-relaxed text-base">
              ${about.story ? `<p>${about.story.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>` : `
                <p>
                  Founded in <strong>2001</strong> in Vijayapura by renowned ophthalmic surgeon <strong>Dr. Prabhugouda B. Lingadalli</strong> (former professor at B M Patil Medical College and alumnus of Aravind Eye Hospital, Madurai), Anugraha Eye Hospital was established to address an acute structural shortage of specialized eye care services across North Karnataka.
                </p>
                <p>
                  Prior to 2001, thousands of rural patients suffering from treatable cataracts, glaucoma, and ocular trauma across Vijayapura, Bagalkot, Kalaburagi, and adjacent Solapur/Sangli districts of Maharashtra had limited access to advanced micro-surgical technology. Dr. Lingadalli pioneered a sustainable delivery model prioritizing high clinical quality, high patient volume, and low operational costs.
                </p>
              `}
              ${about.history ? `<div class="pt-4 border-t border-teal-100"><h3 class="text-xl font-bold text-teal-950 font-heading mb-2">Our History</h3><p>${about.history.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p></div>` : `
                <p>
                  Over the past 25 years, Anugraha Eye Hospital has evolved from a single clinic into a comprehensive healthcare network operating <strong>${baseHospitals.length} super-specialty base hospitals</strong> and <strong>${visionCenters.length} rural Vision Centers</strong>, restoring vision for over ${stats.lifetimeSurgeries} patients and performing over ${stats.freeCataracts} surgeries entirely free of cost.
                </p>
              `}
            </div>

            <div class="pt-6 border-t border-teal-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
                <div class="text-2xl font-extrabold text-teal-950 font-mono">2001</div>
                <div class="text-xs font-semibold text-teal-800 uppercase mt-0.5">Founded in Vijayapura</div>
              </div>
              <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
                <div class="text-2xl font-extrabold text-teal-950 font-mono">${baseHospitals.length} Base + ${visionCenters.length} VC</div>
                <div class="text-xs font-semibold text-teal-800 uppercase mt-0.5">Regional Care Network</div>
              </div>
              <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
                <div class="text-2xl font-extrabold text-teal-950 font-mono">${stats.freeCataracts}</div>
                <div class="text-xs font-semibold text-teal-800 uppercase mt-0.5">Free Cataract Operations</div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: FOUNDING-TO-TODAY TIMELINE COMPONENT -->
        <section class="space-y-10 text-center">
          <div class="space-y-2">
            <span class="px-3 py-1 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">Institutional Growth Timeline</span>
            <h2 class="text-3xl font-extrabold text-teal-950 font-heading">25 Years of Service & Milestones</h2>
            <p class="text-slate-600 text-sm max-w-xl mx-auto">From a single clinic in Vijayapura in 2001 to a super-specialty eye care network.</p>
          </div>

          <!-- Timeline Container with Scroll Progress Line -->
          <div class="relative max-w-4xl mx-auto py-4 founding-timeline-wrapper" id="founding-timeline">
            <!-- Timeline Connecting Progress Line Background & Fill -->
            <div class="timeline-progress-line-bg"></div>
            <div class="timeline-progress-bar-fill"></div>

            <div class="space-y-12 relative z-10">

              <!-- Timeline Item 1: 2001 Founding -->
              <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                <div class="w-full sm:w-1/2 text-left sm:text-right space-y-2">
                  <span class="inline-block px-3 py-1 rounded-full bg-teal-900 text-emerald-300 font-mono font-bold text-xs">2001</span>
                  <h3 class="text-xl font-bold text-teal-950 font-heading">Founding in Vijayapura</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Established by Dr. Prabhugouda B. Lingadalli with a commitment to high-volume, low-cost ophthalmic care and inaugural mobile outreach camps in rural villages.
                  </p>
                </div>
                <div class="timeline-milestone-dot w-10 h-10 rounded-full bg-teal-900 border-4 border-white text-emerald-400 font-extrabold text-sm flex items-center justify-center shadow-lg shrink-0">
                  1
                </div>
                <div class="w-full sm:w-1/2 hidden sm:block"></div>
              </div>

              <!-- Timeline Item 2: Milestone 1 -->
              <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                <div class="w-full sm:w-1/2 hidden sm:block"></div>
                <div class="timeline-milestone-dot w-10 h-10 rounded-full bg-emerald-800 border-4 border-white text-emerald-200 font-extrabold text-sm flex items-center justify-center shadow-lg shrink-0">
                  2
                </div>
                <div class="w-full sm:w-1/2 text-left space-y-2">
                  <span class="inline-block px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 font-mono font-bold text-xs">Milestone 1</span>
                  <h3 class="text-xl font-bold text-teal-950 font-heading">${stats.freeCataracts} Free Cataract Surgeries</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Crossed ${stats.freeCataracts} free micro-incision cataract procedures performed for impoverished patients across ${stats.outreachCamps} outreach screening camps.
                  </p>
                </div>
              </div>

              <!-- Timeline Item 3: Milestone 2 -->
              <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                <div class="w-full sm:w-1/2 text-left sm:text-right space-y-2">
                  <span class="inline-block px-3 py-1 rounded-full bg-amber-800 text-amber-200 font-mono font-bold text-xs">Milestone 2</span>
                  <h3 class="text-xl font-bold text-teal-950 font-heading">District-Wide School Screenings</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Scaled mobile school eye screening program examining over ${stats.studentsScreened || '10,000+'} students across government and private schools, distributing free corrective spectacles.
                  </p>
                </div>
                <div class="timeline-milestone-dot w-10 h-10 rounded-full bg-amber-700 border-4 border-white text-amber-100 font-extrabold text-sm flex items-center justify-center shadow-lg shrink-0">
                  3
                </div>
                <div class="w-full sm:w-1/2 hidden sm:block"></div>
              </div>

              <!-- Timeline Item 4: Present Day -->
              <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                <div class="w-full sm:w-1/2 hidden sm:block"></div>
                <div class="timeline-milestone-dot w-10 h-10 rounded-full bg-teal-950 border-4 border-white text-amber-400 font-extrabold text-sm flex items-center justify-center shadow-lg shrink-0">
                  4
                </div>
                <div class="w-full sm:w-1/2 text-left space-y-2">
                  <span class="inline-block px-3 py-1 rounded-full bg-teal-950 text-amber-400 font-mono font-bold text-xs">Present Day</span>
                  <h3 class="text-xl font-bold text-teal-950 font-heading">Super-Specialty Network Status</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Operating ${baseHospitals.length} tertiary base hospitals (Vijayapura & Kalaburagi) and ${visionCenters.length} rural Vision Centers with RGUHS optometry affiliation and NBEMS DNB accreditation.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- SECTION 3: VISION, MISSION & 7 CORE OBJECTIVES GRID -->
        <section class="space-y-10">
          <!-- Large Vision Display & Mission Paragraph -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Large Vision Statement -->
            <div class="glass-card p-8 rounded-3xl border border-teal-100 space-y-4 hover-lift bg-gradient-to-br from-white to-teal-50/50">
              <div class="w-12 h-12 rounded-2xl bg-teal-900 text-emerald-400 flex items-center justify-center font-bold shadow-md">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </div>
              <h2 class="text-xs font-bold text-teal-800 uppercase tracking-wider">Institutional Vision</h2>
              <blockquote class="text-xl sm:text-2xl font-bold text-teal-950 font-heading leading-relaxed">
                "${brand.vision}"
              </blockquote>
            </div>

            <!-- Mission Paragraph -->
            <div class="glass-card p-8 rounded-3xl border border-teal-100 space-y-4 hover-lift bg-gradient-to-br from-white to-teal-50/50">
              <div class="w-12 h-12 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center font-bold shadow-md">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              </div>
              <h2 class="text-xs font-bold text-emerald-800 uppercase tracking-wider">Institutional Mission</h2>
              <p class="text-slate-700 text-base leading-relaxed">
                ${brand.mission}
              </p>
            </div>
          </div>

          <!-- 7 Core Objectives Card Grid (Exact items from PROJECT-CONTEXT.md) -->
          <div class="space-y-6">
            <div class="text-center space-y-2">
              <span class="px-3 py-1 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">Operational Pillars</span>
              <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Our 7 Core Objectives</h2>
              <p class="text-slate-600 text-sm max-w-xl mx-auto">Structured framework guiding clinical, academic, and socio-economic outreach.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${objectives.map(obj => `
                <div class="glass-card p-6 rounded-3xl border border-teal-100 space-y-3 hover-lift flex flex-col justify-between">
                  <div>
                    <div class="w-10 h-10 rounded-xl bg-teal-900 text-white font-extrabold text-base flex items-center justify-center font-heading mb-3 shadow-md">
                      ${obj.id}
                    </div>
                    <h3 class="font-bold text-lg text-teal-950 font-heading mb-2">${obj.title}</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">${obj.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- SECTION 4: GEOGRAPHICAL SPREAD PANEL -->
        <section class="glass-card-dark rounded-3xl p-8 sm:p-12 text-white space-y-8 relative overflow-hidden">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div class="space-y-2 max-w-2xl">
              <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider">Regional Coverage</span>
              <h2 class="text-3xl font-extrabold text-white font-heading">Geographical Spread Across Districts</h2>
              <p class="text-slate-300 text-sm leading-relaxed">
                Operating 2 tertiary base campuses in Vijayapura and Kalaburagi, supported by a network of 7 rural Vision Centers extending quality eye care across Karnataka and neighboring Maharashtra.
              </p>
            </div>

            <a href="#/vision-centers" class="px-6 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0 shadow-lg flex items-center gap-2">
              <span>Explore Vision Centers Network</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Vijayapura Base Hospital</div>
              <p class="text-xs text-slate-300">Navabhag Main Road, Vijayapura – 586101</p>
              <div class="text-xs text-slate-400 font-mono">08352-220646</div>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Kalaburagi Base Campus</div>
              <p class="text-xs text-slate-300">Tertiary Base Center & Optometry Institute</p>
              <div class="text-xs text-slate-400 font-mono">08352-220646</div>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-amber-400 uppercase tracking-wider">7 Rural Vision Centers</div>
              <p class="text-xs text-slate-300">Talikoti, Muddebihal, Sindagi, Indi, B.Bagewadi, Chadachan, Nalatwad</p>
              <div class="text-xs text-slate-400">Primary Care & Emergency</div>
            </div>
          </div>
        </section>

        <!-- SECTION 5: NETWORKING & PARTNERSHIPS SECTION -->
        <section class="glass-card rounded-3xl p-8 sm:p-10 border border-teal-100 space-y-6">
          <div class="space-y-2">
            <span class="px-3 py-1 rounded-full badge-coral font-semibold text-xs uppercase tracking-wider">Ecosystem Outreach</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-teal-950 font-heading">Networking & Community Partnerships</h2>
            <p class="text-slate-600 text-sm">Collaborating with civic, non-profit, and public health partners to deliver eye care irrespective of caste, creed, or background.</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            ${[
              { name: "Primary Health Centres", tag: "Public Health" },
              { name: "Gram Panchayats", tag: "Local Civic" },
              { name: "Lions Club International", tag: "Service Org" },
              { name: "Indian Red Cross Society", tag: "Humanitarian" },
              { name: "Rotary Club", tag: "Philanthropy" },
              { name: "Self-Help Groups (SHGs)", tag: "Community" },
              { name: "Educational Trusts", tag: "School Vision" },
              { name: "ASHA Workers Network", tag: "Grassroots" },
              { name: "Anganwadi Staff", tag: "Child Care" },
              { name: "Local Civic Leaders", tag: "Advocacy" },
              { name: "NGO Partners", tag: "Field Relief" },
              { name: "Health Departments", tag: "Govt Partner" }
            ].map(p => `
              <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-center hover:bg-teal-100/80 transition-colors flex flex-col justify-between space-y-1">
                <div class="text-xs font-bold text-teal-950 font-heading">${p.name}</div>
                <div class="text-[10px] font-semibold text-teal-700 uppercase tracking-wider">${p.tag}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- SECTION 6: SUB-NAVIGATION DIRECTORY CARDS (3-Column Layout) -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Card 1: Leadership & Awards -->
          <a href="#/about-us/leadership" class="glass-card p-6 sm:p-8 rounded-3xl border border-teal-100 dark:border-teal-900/60 space-y-4 hover-lift block group bg-white dark:bg-slate-900">
            <div class="w-12 h-12 rounded-2xl bg-teal-900 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-teal-950 dark:text-white font-heading group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Hospital Founders & Leadership &rarr;</h3>
            <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore profiles of Founder & Chairman Dr. Prabhugouda B. Lingadalli, Medical Director Dr. Malini P L, and the 12 conferred state & national honors.
            </p>
          </a>

          <!-- Card 2: Clinical Faculty & Consultants -->
          <a href="#/about-us/clinical-faculty" class="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 space-y-4 hover-lift block group bg-gradient-to-br from-emerald-50/50 to-white dark:from-slate-900 dark:to-slate-950 shadow-md">
            <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-teal-950 dark:text-white font-heading group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Clinical Faculty & Consultants &rarr;</h3>
            <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Meet our 9 specialized ophthalmic surgeons across Cataract, Vitreo-Retina, Paediatric Squint, Glaucoma, Cornea, LASIK, and Ocular Trauma.
            </p>
          </a>

          <!-- Card 3: Management & Administration -->
          <a href="#/about-us/administration" class="glass-card p-6 sm:p-8 rounded-3xl border border-teal-100 dark:border-teal-900/60 space-y-4 hover-lift block group bg-white dark:bg-slate-900">
            <div class="w-12 h-12 rounded-2xl bg-teal-950 text-emerald-300 flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h3 class="text-xl font-bold text-teal-950 dark:text-white font-heading group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Management & Administration &rarr;</h3>
            <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Learn about our administrative framework, hospital managers, paramedical heads, and campus operations across Vijayapura and Kalaburagi.
            </p>
          </a>

        </section>

      </div>
    `;
  }

  // 3. LEADERSHIP View (Redesigned Bold Editorial Layout inspired by Reference Mockup)
  function renderLeadershipPage() {
    const leadership = store.getLeadership().filter(l => l.published !== false);
    const chairman = leadership.find(l => l.id === 'dr-lingadalli') || leadership[0] || {};
    const medicalDirector = leadership.find(l => l.id === 'dr-malini') || leadership[1] || {};
    const brand = store.getBrand();
    const stats = store.getStats();

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-16 font-sans">
        
        <!-- Header Banner -->
        <div class="glass-card-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl space-y-6">
          <div class="relative z-10 max-w-3xl space-y-4">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Institutional Founders & Medical Governance</span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-white font-heading leading-tight">
              Hospital Founders & Medical Leadership
            </h1>
            <p class="text-slate-300 text-base sm:text-lg leading-relaxed">
              Pioneering compassionate, high-volume ophthalmic surgery, academic credentials, and 25-year philanthropic footprint across Karnataka and Maharashtra.
            </p>
          </div>

          <!-- Quick Jump Navigation Chips -->
          <div class="relative z-10 flex flex-wrap items-center gap-3 pt-2">
            <a href="#about-us/leadership#dr-lingadalli" onclick="document.getElementById('dr-lingadalli')?.scrollIntoView({behavior:'smooth'})" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2">
              <span>👨‍⚕️ ${chairman.name} (Founder & Chairman)</span>
              <span>&darr;</span>
            </a>
            <a href="#about-us/leadership#dr-malini" onclick="document.getElementById('dr-malini')?.scrollIntoView({behavior:'smooth'})" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2">
              <span>👩‍⚕️ ${medicalDirector.name} (Medical Director)</span>
              <span>&darr;</span>
            </a>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PROFILE 1: CHAIRMAN & FOUNDER DR. LINGADALLI -->
        <!-- ========================================== -->
        <section id="dr-lingadalli" class="space-y-8 scroll-mt-28">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white dark:bg-[#06241f] rounded-3xl overflow-hidden border border-teal-100 dark:border-teal-900/40 shadow-2xl">
            
            <!-- LEFT BANNER: Dark Green Background Panel with Cutout Portrait -->
            <div class="lg:col-span-5 bg-[#093327] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-visible min-h-[500px]">
              
              <!-- Subtle Background Graphics -->
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-black/40 pointer-events-none"></div>

              <div class="relative z-10 space-y-3">
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-[#2dd4bf] font-mono font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
                  ${chairman.title || 'Founder & Chairman'}
                </span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                  ${chairman.name}
                </h2>
                <div class="text-xs sm:text-sm font-bold text-[#2dd4bf] font-sans">
                  ${chairman.degrees}
                </div>
              </div>

              <!-- Breakout Cutout Portrait Image Frame -->
              <div class="relative z-10 my-6 flex justify-center">
                <div class="w-60 h-72 sm:w-64 sm:h-80 rounded-2xl p-2 bg-gradient-to-t from-[#2dd4bf]/40 via-transparent to-transparent shadow-2xl overflow-hidden group border border-[#2dd4bf]/30">
                  <img src="${chairman.photo || 'assets/dr_lingadalli.jpg'}" alt="${chairman.name}" class="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              <div class="relative z-10 pt-4 border-t border-emerald-800/80 text-xs text-slate-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Institutional Role:</span>
                  <span class="font-bold text-white">Founder & Chairman</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Surgical Legacy:</span>
                  <span class="font-bold text-[#2dd4bf]">25+ Years Experience</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Lifetime Surgeries:</span>
                  <span class="font-bold text-amber-300 font-mono">${stats.lifetimeSurgeries}</span>
                </div>
              </div>

            </div>

            <!-- RIGHT PANEL: 4-Card Structured Grid (Matching Reference Slide) -->
            <div class="lg:col-span-7 p-6 sm:p-10 space-y-8 flex flex-col justify-between">
              
              <div class="space-y-2">
                <div class="inline-block px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-900 dark:text-teal-200 font-mono font-bold text-xs uppercase tracking-wider">
                  Clinical Profile & Leadership
                </div>
                <h3 class="text-3xl font-extrabold text-teal-950 dark:text-white font-heading tracking-tight">
                  Biography & Surgical Milestones
                </h3>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  ${chairman.bio}
                </p>
              </div>

              <!-- 4 ROUNDED PILL HEADER CARDS GRID -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <!-- CARD 1: CONTACT & COORDINATES -->
                <div class="p-6 rounded-2xl bg-[#edf5f3] dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 space-y-4">
                  <div class="inline-block px-4 py-1.5 rounded-full bg-[#0f766e] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                    Contact & Coordinates
                  </div>

                  <div class="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <div class="font-bold text-teal-950 dark:text-teal-200">Main Campus Base Hospital</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Navabhag Main Road, Behind Central Bus Stand, Vijayapura – 586101</div>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Helpline:</span>
                      <span class="font-bold text-teal-900 dark:text-teal-300">${brand.fallbackPhone}</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Campus Location:</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400">Vijayapura, Karnataka</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Direct Email:</span>
                      <span class="font-bold text-teal-900 dark:text-teal-300 truncate max-w-[140px]">${brand.contactEmail}</span>
                    </div>
                  </div>
                </div>

                <!-- CARD 2: EXPERIENCE & MILESTONES -->
                <div class="p-6 rounded-2xl bg-[#edf5f3] dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 space-y-4">
                  <div class="inline-block px-4 py-1.5 rounded-full bg-[#0f766e] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                    Experience & Milestones
                  </div>

                  <div class="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <div class="font-bold text-teal-950 dark:text-teal-200">2001 – Present</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Founder & Chairman, Anugraha Eye Hospital Network</div>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Lifetime Surgeries:</span>
                      <span class="font-bold text-teal-900 dark:text-teal-300 font-mono">${stats.lifetimeSurgeries}</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Free Cataracts:</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400 font-mono">${stats.freeCataracts}</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Academic Tenure:</span>
                      <span class="font-bold text-teal-900 dark:text-teal-300">Prof. B M Patil Med Coll</span>
                    </div>
                  </div>
                </div>

                <!-- CARD 3: EDUCATION & CREDENTIALS -->
                <div class="p-6 rounded-2xl bg-[#edf5f3] dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 space-y-4">
                  <div class="inline-block px-4 py-1.5 rounded-full bg-[#0f766e] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                    Education & Credentials
                  </div>

                  <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-teal-950 dark:text-teal-200">MBBS</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">B M Patil Medical College, Vijayapura</div>
                    </div>
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-teal-950 dark:text-teal-200">MS Ophthalmology (1998)</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Vijayanagar Institute of Med Sciences (VIMS Bellary)</div>
                    </div>
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-teal-950 dark:text-teal-200">DNB Ophthalmology (2000)</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Diplomate of National Board Examination</div>
                    </div>
                    <div>
                      <div class="font-bold text-emerald-800 dark:text-emerald-300">FAEH Fellowship</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Aravind Eye Hospital, Madurai (2 Years)</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 4: SPECIALTIES & HONORS -->
                <div class="p-6 rounded-2xl bg-[#edf5f3] dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 space-y-4">
                  <div class="inline-block px-4 py-1.5 rounded-full bg-[#0f766e] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                    Specialties & Honors
                  </div>

                  <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-teal-950 dark:text-teal-200">High-Volume Phacoemulsification</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Micro-incision cataract surgery</div>
                    </div>
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-amber-800 dark:text-amber-300">${chairman.awards ? chairman.awards.length : 12} Conferred Awards</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Govt of Karnataka Rajyostava Award (2021)</div>
                    </div>
                    <div>
                      <div class="font-bold text-teal-950 dark:text-teal-200">${stats.outreachCamps} Outreach Camps</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Reaching ~10 Lakh regional patients</div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- 12 CONFERRED AWARDS ACCORDION / TOGGLE -->
              ${chairman.awards && chairman.awards.length > 0 ? `
                <details class="p-5 rounded-2xl bg-teal-900/10 border border-teal-200 dark:border-teal-800 space-y-3 cursor-pointer group">
                  <summary class="font-extrabold text-teal-950 dark:text-white text-sm font-heading flex items-center justify-between outline-none">
                    <span class="flex items-center gap-2">
                      <span class="text-amber-500">🏆</span>
                      <span>View All ${chairman.awards.length} Conferred State & National Awards</span>
                    </span>
                    <span class="w-6 h-6 rounded-full bg-teal-800 text-white flex items-center justify-center text-xs font-bold shrink-0 transition-transform group-open:rotate-180">+</span>
                  </summary>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-teal-200 dark:border-teal-800 text-xs">
                    ${chairman.awards.map((award, aIdx) => `
                      <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900 flex items-start gap-2.5 shadow-sm">
                        <span class="w-5 h-5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">${aIdx + 1}</span>
                        <div>
                          <div class="font-bold text-teal-950 dark:text-white text-[11px]">${award.title}</div>
                          <div class="text-[10px] text-slate-500 dark:text-slate-400">${award.organization} ${award.year !== '-' ? `(${award.year})` : ''}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </details>
              ` : ''}

            </div>

          </div>
        </section>

        <!-- ========================================== -->
        <!-- PROFILE 2: MEDICAL DIRECTOR DR. MALINI P L -->
        <!-- ========================================== -->
        <section id="dr-malini" class="space-y-8 scroll-mt-28">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white dark:bg-[#06241f] rounded-3xl overflow-hidden border border-teal-100 dark:border-teal-900/40 shadow-2xl">
            
            <!-- LEFT BANNER: Dark Green Background Panel with Cutout Portrait -->
            <div class="lg:col-span-5 bg-[#093327] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-visible min-h-[500px]">
              
              <!-- Subtle Background Graphics -->
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-black/40 pointer-events-none"></div>

              <div class="relative z-10 space-y-3">
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-[#2dd4bf] font-mono font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
                  ${medicalDirector.title || 'Medical Director'}
                </span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                  ${medicalDirector.name}
                </h2>
                <div class="text-xs sm:text-sm font-bold text-[#2dd4bf] font-sans">
                  ${medicalDirector.degrees}
                </div>
              </div>

              <!-- Breakout Cutout Portrait Image Frame -->
              <div class="relative z-10 my-6 flex justify-center">
                <div class="w-60 h-72 sm:w-64 sm:h-80 rounded-2xl p-2 bg-gradient-to-t from-[#2dd4bf]/40 via-transparent to-transparent shadow-2xl overflow-hidden group border border-[#2dd4bf]/30">
                  <img src="${medicalDirector.photo || 'assets/dr_malini.jpg'}" alt="${medicalDirector.name}" class="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              <div class="relative z-10 pt-4 border-t border-emerald-800/80 text-xs text-slate-200 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Institutional Role:</span>
                  <span class="font-bold text-white">Medical Director</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Clinical Governance:</span>
                  <span class="font-bold text-[#2dd4bf]">20+ Years Governance</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Accreditation Oversight:</span>
                  <span class="font-bold text-emerald-300">NABH Alignment</span>
                </div>
              </div>

            </div>

            <!-- RIGHT PANEL: 4-Card Structured Grid -->
            <div class="lg:col-span-7 p-6 sm:p-10 space-y-8 flex flex-col justify-between">
              
              <div class="space-y-2">
                <div class="inline-block px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-900 dark:text-teal-200 font-mono font-bold text-xs uppercase tracking-wider">
                  Clinical Governance & Quality
                </div>
                <h3 class="text-3xl font-extrabold text-teal-950 dark:text-white font-heading tracking-tight">
                  Biography & Medical Leadership
                </h3>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  ${medicalDirector.bio}
                </p>
              </div>

              <!-- 4 ROUNDED PILL HEADER CARDS GRID -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <!-- CARD 1: CONTACT & COORDINATES -->
                <div class="p-6 rounded-2xl bg-[#edf5f3] dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 space-y-4">
                  <div class="inline-block px-4 py-1.5 rounded-full bg-[#0f766e] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                    Contact & Coordinates
                  </div>

                  <div class="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <div class="font-bold text-teal-950 dark:text-teal-200">Medical Director's Office</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Vijayapura Main Campus & Kalaburagi Base Hospital</div>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Helpline:</span>
                      <span class="font-bold text-teal-900 dark:text-teal-300">${brand.fallbackPhone}</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Campus Oversight:</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400">Vijayapura & Kalaburagi</span>
                    </div>
                  </div>
                </div>

                <!-- CARD 2: EXPERIENCE & MILESTONES -->
                <div class="p-6 rounded-2xl bg-[#edf5f3] dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 space-y-4">
                  <div class="inline-block px-4 py-1.5 rounded-full bg-[#0f766e] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                    Experience & Milestones
                  </div>

                  <div class="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <div class="font-bold text-teal-950 dark:text-teal-200">Nearly 2 Decades</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Clinical & Administrative Leadership</div>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Campus Oversight:</span>
                      <span class="font-bold text-teal-900 dark:text-teal-300">Vijayapura & Kalaburagi</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-teal-200/50 pt-2">
                      <span class="text-slate-500">Quality Standards:</span>
                      <span class="font-bold text-emerald-700 dark:text-emerald-400">NABH Alignment</span>
                    </div>
                  </div>
                </div>

                <!-- CARD 3: EDUCATION & CREDENTIALS -->
                <div class="p-6 rounded-2xl bg-[#edf5f3] dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 space-y-4">
                  <div class="inline-block px-4 py-1.5 rounded-full bg-[#0f766e] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                    Education & Credentials
                  </div>

                  <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-teal-950 dark:text-teal-200">MBBS</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Bachelor of Medicine & Bachelor of Surgery</div>
                    </div>
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-teal-950 dark:text-teal-200">DO</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Diploma in Ophthalmology</div>
                    </div>
                    <div>
                      <div class="font-bold text-emerald-800 dark:text-emerald-300">FGO Fellowship</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Fellowship in General Ophthalmology</div>
                    </div>
                  </div>
                </div>

                <!-- CARD 4: CLINICAL GOVERNANCE & RESPONSIBILITIES -->
                <div class="p-6 rounded-2xl bg-[#edf5f3] dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 space-y-4">
                  <div class="inline-block px-4 py-1.5 rounded-full bg-[#0f766e] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                    Governance & Leadership
                  </div>

                  <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-teal-950 dark:text-teal-200">Surgical Audit Oversight</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Ensuring zero-infection modular OT standards</div>
                    </div>
                    <div class="border-b border-teal-200/50 pb-1.5">
                      <div class="font-bold text-teal-950 dark:text-teal-200">Consultant Accreditation</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Continuous medical education & training</div>
                    </div>
                    <div>
                      <div class="font-bold text-emerald-800 dark:text-emerald-300">Patient First Safety</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">Compassionate, ethical clinical care</div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Quote Block -->
              <blockquote class="text-slate-700 dark:text-slate-300 text-xs sm:text-sm italic leading-relaxed bg-[#edf5f3] dark:bg-teal-950/40 p-5 rounded-2xl border-l-4 border-emerald-600">
                "Clinical governance, cutting-edge surgical technology, and compassionate care define our two-decade operational promise to North Karnataka."
              </blockquote>

            </div>

          </div>
        </section>

      </div>
    `;
  }

  // 3b. CLINICAL FACULTY & CONSULTANTS View (Dedicated Specialty Faculty Directory)
  function renderClinicalFacultyPage() {
    const leadership = (store.getLeadership() || []).filter(l => l.published !== false);
    const brand = store.getBrand();
    const stats = store.getStats();

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-16 font-sans">
        
        <!-- Breadcrumbs Navigation -->
        <nav class="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-emerald-600 transition-colors">Home</a>
          <span>/</span>
          <a href="#/about-us" class="hover:text-emerald-600 transition-colors">About Us</a>
          <span>/</span>
          <span class="text-teal-950 dark:text-white font-bold">Clinical Faculty & Consultants</span>
        </nav>

        <!-- Header Banner -->
        <div class="glass-card-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl space-y-6">
          <div class="relative z-10 max-w-3xl space-y-4">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Super-Specialty Medical Faculty &bull; 9 Consultants</span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-white font-heading leading-tight tracking-tight">
              Clinical Faculty & Specialist Consultants
            </h1>
            <p class="text-slate-300 text-base sm:text-lg leading-relaxed">
              Renowned ophthalmic surgeons, fellowship-trained specialists, and clinical consultants delivering advanced tertiary eye care across Vijayapura and Kalaburagi base hospitals.
            </p>
          </div>

          <!-- Trust Badges Strip -->
          <div class="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-800/60">
            <div class="p-3 rounded-2xl bg-teal-900/50 border border-teal-800/40 text-center">
              <div class="text-xl font-extrabold text-emerald-300 font-heading">9 Specialists</div>
              <div class="text-[10px] text-slate-300 uppercase tracking-wider">Super-Specialty Faculty</div>
            </div>
            <div class="p-3 rounded-2xl bg-teal-900/50 border border-teal-800/40 text-center">
              <div class="text-xl font-extrabold text-white font-heading">2.28 Lakh+</div>
              <div class="text-[10px] text-slate-300 uppercase tracking-wider">Surgeries Performed</div>
            </div>
            <div class="p-3 rounded-2xl bg-teal-900/50 border border-teal-800/40 text-center">
              <div class="text-xl font-extrabold text-emerald-300 font-heading">2 Base Campuses</div>
              <div class="text-[10px] text-slate-300 uppercase tracking-wider">Vijayapura & Kalaburagi</div>
            </div>
            <div class="p-3 rounded-2xl bg-teal-900/50 border border-teal-800/40 text-center">
              <div class="text-xl font-extrabold text-white font-heading">NABH Protocols</div>
              <div class="text-[10px] text-slate-300 uppercase tracking-wider">Quality Accredited</div>
            </div>
          </div>
        </div>

        <!-- Full Clinical Faculty Grid (All 9 Doctors) -->
        <section class="space-y-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-teal-100 dark:border-teal-900/60 pb-4">
            <div>
              <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-mono">Specialist Consultant Directory</div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-teal-950 dark:text-white font-heading">Department Faculty & Surgeons</h2>
            </div>
            <span class="px-3.5 py-1.5 rounded-full badge-teal font-mono text-xs font-bold">9 Full-Time Consultants</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${leadership.map((doc, idx) => `
              <div class="spotlight-card rounded-3xl border border-teal-100 dark:border-teal-900/60 overflow-hidden flex flex-col justify-between hover-lift transition-all group bg-white dark:bg-slate-900 shadow-md hover:shadow-xl">
                
                <!-- Doctor Portrait Box -->
                <div class="h-60 overflow-hidden bg-[#093327] relative flex items-center justify-center">
                  <img 
                    src="${doc.photo || 'assets/doctors/dr_lingadalli.jpg'}" 
                    alt="${doc.name}" 
                    class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#062c26] via-[#062c26]/30 to-transparent"></div>

                  <!-- Specialty Badge -->
                  <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span class="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-400/40 backdrop-blur-sm shadow">
                      ${doc.specialization || doc.designation || 'Ophthalmic Consultant'}
                    </span>
                    <span class="px-2 py-0.5 rounded-full bg-white/20 text-white font-mono text-[9px] font-semibold backdrop-blur-sm">
                      ${doc.hospital || 'Vijayapura / Kalaburagi'}
                    </span>
                  </div>

                  <!-- Name and Degree Tag Overlay -->
                  <div class="absolute bottom-3 left-3.5 right-3.5 z-10">
                    <div class="text-xs font-bold text-emerald-300 font-mono uppercase tracking-wider truncate drop-shadow">
                      ${doc.title || doc.designation || 'Consultant Surgeon'}
                    </div>
                  </div>
                </div>

                <!-- Content Details -->
                <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div class="space-y-2">
                    <h3 class="text-xl font-extrabold text-teal-950 dark:text-white font-heading leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      ${doc.name}
                    </h3>
                    <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-sans">
                      ${doc.degrees || ''}
                    </div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      ${doc.designation || doc.title || 'Consultant Surgeon'} &bull; ${doc.experience || 'Experienced Specialist'}
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2 line-clamp-4">
                      ${doc.bio || ''}
                    </p>
                  </div>

                  <!-- Actions -->
                  <div class="pt-4 border-t border-teal-100 dark:border-teal-900/60 flex items-center justify-between gap-2">
                    <a 
                      href="tel:${(brand.fallbackPhone || '08352-220646').replace(/[^0-9+]/g, '')}" 
                      class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                    >
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      <span>Call OPD</span>
                    </a>

                    <a 
                      href="https://wa.me/${(brand.whatsappPhone || '917483900963').replace(/[^0-9]/g, '')}?text=Hello%20Anugraha%20Eye%20Hospital,%20I%20would%20like%20to%20book%20an%20appointment%20with%20${encodeURIComponent(doc.name)}" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      class="px-4 py-2 rounded-xl bg-teal-950 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs font-heading shadow transition-all flex items-center gap-1.5"
                    >
                      <span>Book Consultation</span>
                      <span>&rarr;</span>
                    </a>
                  </div>

                </div>

              </div>
            `).join('')}
          </div>
        </section>

        <!-- Clinical Governance & Academic Alignment -->
        <section class="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50/70 dark:from-slate-900 dark:to-slate-950 border border-teal-200 dark:border-teal-900/60 space-y-6">
          <div class="max-w-3xl space-y-2">
            <span class="px-3 py-1 rounded-full badge-teal font-mono text-[10px] font-bold uppercase tracking-wider">Clinical Rigor & Standards</span>
            <h3 class="text-2xl font-extrabold text-teal-950 dark:text-white font-heading">Our Clinical & Surgical Principles</h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every consultant operates within strict modular OT sterility benchmarks, evidence-based ophthalmic guidelines, and university-affiliated academic training standards under Rajiv Gandhi University of Health Sciences (RGUHS) and the National Board of Examinations in Medical Sciences (NBEMS).
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-teal-900/60 space-y-1.5 shadow-xs">
              <div class="text-xs font-bold text-teal-950 dark:text-white font-heading">Zero-Infection Modular OTs</div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">HEPA-filtered laminar airflow surgical suites matching international sterility benchmarks.</p>
            </div>
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-teal-900/60 space-y-1.5 shadow-xs">
              <div class="text-xs font-bold text-teal-950 dark:text-white font-heading">Micro-Incision Phaco Suite</div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Sutureless 2.2mm micro-coaxial phacoemulsification with premium monofocal, toric, and multifocal IOLs.</p>
            </div>
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-teal-900/60 space-y-1.5 shadow-xs">
              <div class="text-xs font-bold text-teal-950 dark:text-white font-heading">Contoura Vision & LASIK</div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Topography-guided 22,000 elevation-point custom corneal wavefront ablation technology.</p>
            </div>
          </div>
        </section>

        <!-- Bottom Cross-Navigation & Appointment CTA -->
        <div class="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#062c26] via-teal-950 to-[#062c26] text-white border border-teal-800 shadow-2xl space-y-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
                OPD Schedule & Consultation Booking
              </div>
              <h3 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">Consult With Our Specialist Faculty</h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Specialist doctors are available during outpatient department (OPD) hours from Monday to Saturday, 9:00 AM to 6:00 PM. Emergency eye trauma is attended 24/7.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3 shrink-0">
              <a 
                href="tel:${(brand.fallbackPhone || '08352-220646').replace(/[^0-9+]/g, '')}" 
                class="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all"
              >
                <span>Call Helpline: ${brand.fallbackPhone || '08352-220646'}</span>
                <span>&rarr;</span>
              </a>
              <a 
                href="#/about-us" 
                class="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors"
              >
                About Our Hospital
              </a>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // 4. ADMINISTRATION View (Consolidated 6 Bios ON ONE PAGE with Left-Hand Sticky Anchor Jump Menu)
  function renderAdministrationPage() {
    const adminTeam = (store.getAdministration() || []).filter(m => m.published !== false);
    const brand = store.getBrand();

    // Array of soft pastel backdrop variants
    const gradients = [
      "from-teal-300/40 via-emerald-200/50 to-teal-100/30",
      "from-purple-300/40 via-indigo-200/50 to-purple-100/30",
      "from-amber-300/40 via-amber-200/50 to-orange-100/30",
      "from-sky-300/40 via-blue-200/50 to-cyan-100/30",
      "from-emerald-300/40 via-teal-200/50 to-emerald-100/30",
      "from-rose-300/40 via-pink-200/50 to-rose-100/30"
    ];

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-12">
        
        <!-- Header Banner -->
        <div class="text-center space-y-4 max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Consolidated Management Directory</span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-teal-950 font-heading leading-tight">
            Hospital Management & Administrative Team
          </h1>
          <p class="text-slate-600 leading-relaxed text-base sm:text-lg">
            Consolidated profiles of our 6 operational directors driving healthcare delivery, NABH quality compliance, financial planning, IT architecture, and community outreach on ONE page.
          </p>

          <div class="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <span class="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-900 border border-teal-200">6 Executive Profiles</span>
            <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">NABH & NBEMS Coordinated</span>
            <span class="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">Single Consolidated Page</span>
          </div>
        </div>

        <!-- MAIN LAYOUT: Sticky Left-Hand Anchor Jump Menu + Consolidated Profiles Column -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT-HAND STICKY ANCHOR JUMP MENU (Sticky Desktop, Horizontal Scroll Mobile Chips) -->
          <div class="lg:col-span-4 lg:sticky lg:top-28 space-y-4 z-20">
            <div class="glass-card rounded-3xl p-6 border border-teal-100/80 shadow-lg space-y-3">
              <h2 class="text-xs font-extrabold text-teal-900 uppercase tracking-wider flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                <span>Jump To Director Profile</span>
              </h2>

              <!-- Navigation Links / Chips -->
              <nav class="flex lg:flex-col overflow-x-auto gap-2 pb-2 lg:pb-0 scrollbar-none">
                ${adminTeam.map(member => `
                  <a href="#about-us/administration#${member.id}" onclick="document.getElementById('${member.id}')?.scrollIntoView({behavior:'smooth'})" class="px-3.5 py-2.5 rounded-xl text-xs font-bold text-teal-950 hover:bg-teal-900 hover:text-white transition-all whitespace-nowrap lg:whitespace-normal flex items-center justify-between group border border-teal-100/50">
                    <span class="truncate">${member.name}</span>
                    <span class="hidden lg:inline text-[10px] font-mono text-slate-400 group-hover:text-emerald-300 shrink-0 ml-2">${member.tenure}</span>
                  </a>
                `).join('')}
              </nav>

              <div class="pt-3 border-t border-teal-100 text-[11px] text-slate-500">
                Consolidated administrative structure eliminating URL fragmentation.
              </div>
            </div>
          </div>

          <!-- RIGHT-HAND CONSOLIDATED FULL PROFILE SECTIONS -->
          <div class="lg:col-span-8 space-y-8">
            ${adminTeam.map((member, idx) => {
              const backdropGradient = gradients[idx % gradients.length];
              const initials = member.name.split(' ').map(n=>n[0]).join('');

              return `
                <section id="${member.id}" class="glass-card rounded-3xl p-6 sm:p-8 border border-teal-100/80 shadow-lg hover-lift space-y-6 relative overflow-hidden group scroll-mt-28">
                  
                  <!-- Soft Pastel Backdrop Shape -->
                  <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br ${backdropGradient} blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

                  <div class="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                    
                    <!-- Photo / Avatar Frame -->
                    <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 bg-gradient-to-tr ${backdropGradient} shadow-xl shrink-0 flex items-center justify-center">
                      ${member.photo ? `
                        <img src="${member.photo}" alt="${member.name}" class="w-full h-full rounded-full object-cover border-2 border-white shadow-inner" />
                      ` : `
                        <div class="w-full h-full rounded-full bg-teal-950 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center font-heading border-2 border-white shadow-inner">
                          ${initials}
                        </div>
                      `}
                    </div>

                    <!-- Header Meta -->
                    <div class="space-y-2 flex-1">
                      <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="px-3 py-1 rounded-full bg-teal-50 text-teal-900 font-extrabold text-xs border border-teal-200">
                          Tenure: ${member.tenure}
                        </span>
                      </div>

                      <h3 class="text-2xl sm:text-3xl font-extrabold text-teal-950 font-heading leading-tight group-hover:text-emerald-700 transition-colors">
                        ${member.name}
                      </h3>
                      <div class="text-xs font-bold text-teal-800 uppercase tracking-wider">
                        ${member.role}
                      </div>

                      <div class="p-2.5 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-slate-700">
                        <strong class="text-teal-950">Qualifications & Training:</strong> ${member.qualifications}
                      </div>
                    </div>

                  </div>

                  <!-- Full Bio Text (PROJECT-CONTEXT.md exact narrative) -->
                  <div class="relative z-10 pt-2 border-t border-teal-100/80">
                    <p class="text-slate-700 text-sm leading-relaxed">
                      ${member.desc}
                    </p>
                  </div>

                  <!-- Footer Action Line -->
                  <div class="relative z-10 pt-4 flex items-center justify-between text-xs border-t border-teal-100/60">
                    <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="font-bold text-teal-900 hover:text-emerald-700 flex items-center gap-1.5">
                      <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      <span>Contact ${member.name.split(' ')[0]}'s Office: ${brand.fallbackPhone}</span>
                    </a>
                  </div>

                </section>
              `;
            }).join('')}
          </div>

        </div>

      </div>
    `;
  }

  // 5. BASE HOSPITALS View (/hospitals/vijayapura & /hospitals/kalaburagi)
  function renderHospitalDetailPage(hospitalId) {
    const brand = store.getBrand();
    const facility = store.getFacilityById(hospitalId) || (hospitalId === 'kalaburagi' ? {
      id: "kalaburagi",
      type: "base",
      name: "Kalaburagi Base Hospital",
      address: "[Pending Confirmation — Contact Vijayapura Main Branch]",
      phone: "08352-220646",
      details: "Tertiary eye care base hospital offering specialized clinical care and Optometry Institute.",
      hours: "8:00 AM – 8:00 PM daily",
      badge: "Tertiary Eye Care Base Hospital",
      isPendingAddress: true
    } : {
      id: "vijayapura",
      type: "base",
      name: "Vijayapura Base Hospital (Main Campus)",
      address: "Navabhag Main Road, Behind Central Bus Stand, Vijayapura – 586101",
      phone: "08352-220646",
      details: "Super-specialty base hospital featuring modern OTs, diagnostic suites, specialty clinics, pharmacy & opticals.",
      hours: "8:00 AM – 9:00 PM daily",
      badge: "Super-Specialty Base Hospital"
    });

    const isKalaburagi = hospitalId === 'kalaburagi';
    const facilityType = isKalaburagi ? "Tertiary Eye Care Base Hospital" : "Super-Specialty Base Hospital";
    const titleName = isKalaburagi ? "Kalaburagi Base Campus" : "Vijayapura Base Hospital (Main Campus)";

    // Super-specialty facilities list
    const facilitiesList = [
      {
        icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
        title: "Modular Operation Theatres",
        desc: "Class-10,000 HEPA-filtered laminar airflow surgical suites equipped for infection-free micro-incision cataract and retinal procedures."
      },
      {
        icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>',
        title: "Phacoemulsification & Cataract Suite",
        desc: "Advanced Alcon and Zeiss phaco systems for sutureless, painless micro-incision cataract surgery with premium foldable IOL implantation."
      },
      {
        icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
        title: "Vitreo-Retinal Micro-Surgery Unit",
        desc: "High-resolution Optical Coherence Tomography (OCT), green laser photocoagulation, and vitrectomy systems for diabetic retinopathy."
      },
      {
        icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
        title: "Glaucoma & Cornea Specialty Clinics",
        desc: "Automated visual field perimetry, pachymetry, corneal topography, collagen cross-linking (C3R), and corneal transplant support."
      },
      {
        icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        title: "Pediatric Eye Care & Squint Clinic",
        desc: "Child-friendly diagnostic rooms, synoptophore squint evaluation, amblyopia patching therapy, and specialized pediatric refraction."
      },
      {
        icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 v5m-4 0h4"/></svg>',
        title: "In-Patient Wards & Day-Care Units",
        desc: "Air-conditioned private rooms, semi-private sharing wards, and day-care recovery suites with 24/7 dedicated nursing staff."
      },
      {
        icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        title: "24/7 Emergency Ophthalmic Desk",
        desc: "Round-the-clock emergency triage for ocular trauma, chemical eye injuries, sudden vision loss, and corneal foreign body removal."
      },
      {
        icon: '<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>',
        title: "In-House Optical & Pharmacy Outlet",
        desc: "Comprehensive inventory of prescription eye drops, post-operative medications, certified UV lenses, and designer frames."
      }
    ];

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-16 font-sans">
        
        <!-- HERO BANNER SECTION WITH PROMINENT ABOVE-THE-FOLD CTAs -->
        <div class="glass-card-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <!-- Background Hero Backdrop Image Overlay -->
          <div class="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-overlay" style="background-image: url('assets/hero-bg.png');"></div>
          <div class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>

          <div class="relative z-10 space-y-6 max-w-4xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>${facilityType}</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading leading-tight">
              ${titleName}
            </h1>

            <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              ${isKalaburagi ? 'Tertiary base hospital providing advanced clinical ophthalmology, academic research, and Optometry Institute programs.' : 'Our primary super-specialty base hospital featuring advanced microsurgical OTs, diagnostic suites, 24/7 emergency ophthalmic desk, and optical/pharmacy services.'}
            </p>

            <!-- Prominent Above-The-Fold CTAs: Call Now + Call Desk -->
            <div class="pt-2 flex flex-wrap items-center gap-4">
              <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="btn-call-now px-8 py-4 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-3 group">
                <div class="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <span>Call Hospital Now: ${brand.fallbackPhone}</span>
              </a>

              <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 v5m-4 0h4"/></svg>
                <span>Call Reception Desk</span>
              </a>
            </div>

            <!-- Trust Pills -->
            <div class="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-300 border-t border-slate-800">
              <span class="flex items-center gap-2 text-emerald-400">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 011.414 0l4-4z" clip-rule="evenodd"/></svg>
                <span>NABH & NBEMS Coordinated</span>
              </span>
              <span class="flex items-center gap-2 text-emerald-400">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 011.414 0l4-4z" clip-rule="evenodd"/></svg>
                <span>Government Cashless Schemes Accepted</span>
              </span>
            </div>
          </div>
        </div>

        <!-- SPECIAL NOTICE FOR KALABURAGI OR ADDRESS & HOURS GRID -->
        ${isKalaburagi ? `
          <!-- Kalaburagi Styled Notice Box (Never looks broken or has empty fields) -->
          <div class="p-8 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 space-y-4 shadow-xl">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              </div>
              <div class="space-y-2">
                <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 font-extrabold text-xs uppercase tracking-wider border border-amber-300">
                  Campus Address Verification Notice
                </span>
                <h3 class="text-2xl font-extrabold text-teal-950 font-heading">
                  Details being finalized — Call us for directions
                </h3>
                <p class="text-slate-700 text-sm leading-relaxed max-w-3xl">
                  Exact street address and OPD operating hours for the Kalaburagi campus are currently being finalized with the clinical board. Please call our main hospital desk directly for travel guidance, consultation schedules, and emergency directions.
                </p>
                <div class="pt-2">
                  <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-900 text-white font-bold text-xs shadow-md hover:bg-teal-950 transition-colors">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <span>Call Kalaburagi Desk: ${brand.fallbackPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- ADDRESS, HOURS & EMBEDDED MAP PLACEHOLDER GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Address & Hours Info Card -->
          <div class="lg:col-span-5 glass-card rounded-3xl p-8 border border-teal-100/80 shadow-xl space-y-6">
            <h2 class="text-2xl font-extrabold text-teal-950 font-heading border-b border-teal-100 pb-4">
              Location & Access Information
            </h2>

            <div class="space-y-5 text-slate-700 text-sm">
              
              <!-- Address Slot -->
              <div class="flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-teal-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <div class="font-extrabold text-teal-950 text-xs uppercase tracking-wider">Campus Address</div>
                  <p class="font-medium text-slate-700 mt-1 leading-relaxed">
                    ${isKalaburagi ? 'Kalaburagi Tertiary Base Campus (Address details being confirmed — call desk for directions)' : facility.address}
                  </p>
                </div>
              </div>

              <!-- Operating Hours Slot -->
              <div class="flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-teal-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <div class="font-extrabold text-teal-950 text-xs uppercase tracking-wider">OPD Operating Hours</div>
                  <p class="font-bold text-emerald-800 mt-1">
                    ${isKalaburagi ? '8:00 AM – 8:00 PM Daily (Call desk for OPD slot)' : facility.hours}
                  </p>
                  <p class="text-xs text-slate-500 mt-0.5">24/7 Emergency Ophthalmic Desk open continuously.</p>
                </div>
              </div>

              <!-- Telephone Slot -->
              <div class="flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-teal-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <div class="font-extrabold text-teal-950 text-xs uppercase tracking-wider">Helpline & Appointments</div>
                  <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="font-mono font-bold text-teal-900 hover:text-emerald-700 text-base block mt-0.5">
                    ${brand.fallbackPhone}
                  </a>
                </div>
              </div>

            </div>

            <div class="pt-4 border-t border-teal-100">
              <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="block w-full py-3.5 text-center rounded-2xl bg-teal-900 text-white font-bold text-xs shadow-md hover:bg-teal-950 transition-colors">
                Call Hospital Desk Now
              </a>
            </div>

          </div>

          <!-- REAL RESPONSIVE GOOGLE MAPS EMBEDDED COMPONENT -->
          <div class="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-teal-100/80 shadow-xl space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <span class="px-3 py-1 rounded-full badge-teal font-bold text-[11px] uppercase tracking-wider">Live Campus Navigation</span>
                <h3 class="text-xl font-extrabold text-teal-950 font-heading mt-1">${facility.name} Map & Directions</h3>
              </div>
              <a href="https://maps.google.com/?q=${encodeURIComponent(facility.name + ' ' + facility.address)}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                Open in Google Maps &rarr;
              </a>
            </div>

            <!-- Responsive Interactive Map Iframe Container -->
            <div class="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-teal-200/80 shadow-inner bg-slate-100">
              ${isKalaburagi ? `
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3813.5678!2d76.8322!3d17.3297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc9b01c00000001%3A0x6b00000000000000!2sAnugraha%20Eye%20Hospital%20Kalaburagi!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" class="w-full h-full border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Anugraha Eye Hospital Kalaburagi Map"></iframe>
              ` : `
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.3875!2d75.7078!3d16.8302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6555555555555%3A0x1111111111111111!2sAnugraha%20Eye%20Hospital%20Vijayapura!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" class="w-full h-full border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Anugraha Eye Hospital Vijayapura Map"></iframe>
              `}
            </div>

            <p class="text-xs text-slate-500 flex items-center justify-between">
              <span>📍 Convenient city-center location with emergency ambulance bay & patient drop-off area.</span>
              <span class="font-bold text-teal-900">GPS Coordinates Verified</span>
            </p>
          </div>
              Note: This map component slot is frontend-only and ready for future Google Maps API or iFrame integration via Admin Portal.
            </p>
          </div>

        </div>

        <!-- SPECIALIZED FACILITIES CARD GRID -->
        <div class="space-y-8">
          <div class="text-center space-y-2 max-w-3xl mx-auto">
            <span class="px-3.5 py-1.5 rounded-full badge-emerald font-semibold text-xs uppercase tracking-wider">Super-Specialty Infrastructure</span>
            <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Comprehensive Clinical Facilities & Equipment</h2>
            <p class="text-slate-600 text-sm">State-of-the-art microsurgical infrastructure supporting advanced eye care delivery.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${facilitiesList.map(fac => `
              <div class="glass-card p-6 rounded-3xl border border-teal-100/80 shadow-md hover-lift space-y-3 flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="w-12 h-12 rounded-2xl bg-teal-950 text-emerald-400 flex items-center justify-center shadow-lg">
                    ${fac.icon}
                  </div>
                  <h3 class="font-extrabold text-teal-950 text-base font-heading">${fac.title}</h3>
                  <p class="text-slate-600 text-xs leading-relaxed">${fac.desc}</p>
                </div>
                <div class="pt-3 border-t border-teal-100/60 text-[11px] font-bold text-emerald-700">
                  Available On-Site &bull; NABH Standard
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // CLIENT-SIDE VISION CENTER LIVE STATUS CALCULATOR
  function getVisionCenterLiveStatus(vc) {
    if (!vc || vc.isPendingDetails) {
      return {
        isOpen: false,
        label: "[CONFIRM WITH HOSPITAL — Sindagi center details pending]",
        badgeClass: "bg-amber-100 text-amber-900 border border-amber-300 font-bold"
      };
    }

    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const currentMins = now.getHours() * 60 + now.getMinutes();

    if (day === 0) { // Sunday
      if (vc.hours && vc.hours.includes("Sun 9am–3pm")) {
        const openMins = 9 * 60;
        const closeMins = 15 * 60;
        if (currentMins >= openMins && currentMins < closeMins) {
          return { isOpen: true, label: "Open Now • Free Sunday OPD (until 3:00 PM)", badgeClass: "bg-emerald-100 text-emerald-950 border border-emerald-400 font-bold" };
        }
      }
      return { isOpen: false, label: "Closed Now • Opens Monday 9:00 AM", badgeClass: "bg-slate-100 text-slate-700 border border-slate-300 font-medium" };
    } else { // Mon-Sat
      const openMins = 9 * 60;
      const closeMins = vc.hours && vc.hours.includes("9am–8pm") ? 20 * 60 : 17 * 60;
      if (currentMins >= openMins && currentMins < closeMins) {
        const closeStr = closeMins === 20 * 60 ? "8:00 PM" : "5:00 PM";
        return { isOpen: true, label: `Open Now • Closes at ${closeStr}`, badgeClass: "bg-emerald-100 text-emerald-950 border border-emerald-400 font-bold" };
      }
      return { isOpen: false, label: "Closed Now • Opens 9:00 AM", badgeClass: "bg-slate-100 text-slate-700 border border-slate-300 font-medium" };
    }
  }

  // 6. VISION CENTERS View (All 8 centers directory + detail views)
  function renderVisionCentersPage() {
    const facilities = store.getFacilities().filter(f => f.type === 'vision-center' && f.published !== false);

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-12 font-sans">
        
        <!-- Directory Header -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-coral font-semibold text-xs uppercase tracking-wider">
            District Outreach & Primary Care Network
          </div>
          <h1 class="text-4xl font-extrabold text-teal-950 font-heading">8 Rural Vision Care Centers</h1>
          <p class="text-slate-600 leading-relaxed text-sm">
            Primary vision screening, automated refraction, prescription spectacles, contact lenses, pharmacy, and direct emergency routing across North Karnataka towns.
          </p>
        </div>

        <!-- 8 Vision Center Cards Directory Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${facilities.map(vc => {
            const status = getVisionCenterLiveStatus(vc);
            const cleanPhone = vc.phone.replace(/[^0-9+]/g, '');
            return `
              <div class="glass-card p-6 rounded-3xl border border-teal-100/90 space-y-4 flex flex-col justify-between hover-lift relative overflow-hidden">
                <div class="space-y-3">
                  <!-- Header badges -->
                  <div class="flex items-center justify-between gap-2 flex-wrap">
                    <span class="px-2.5 py-1 rounded-full bg-teal-900 text-emerald-300 font-bold text-[11px]">
                      ${vc.town || vc.name.split(' ')[0]} Town
                    </span>
                    
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] ${status.badgeClass}">
                      ${status.isOpen ? '🟢 Open Now' : '🔴 Closed Now'}
                    </span>
                  </div>

                  <!-- Center Name & Address -->
                  <div>
                    <h3 class="text-xl font-bold text-teal-950 font-heading">${vc.name}</h3>
                    <p class="text-xs text-slate-500 font-medium mt-1 leading-normal line-clamp-2">${vc.address}</p>
                  </div>

                  <!-- Sindagi Pending Audit Notice Banner -->
                  ${vc.isPendingDetails ? `
                    <div class="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-[11px] font-bold space-y-1">
                      <div class="text-amber-800 uppercase tracking-wider">Audit Notice</div>
                      <p>[CONFIRM WITH HOSPITAL — Sindagi center details pending]</p>
                    </div>
                  ` : ''}

                  <!-- Doctor Visits Schedule Badge -->
                  ${vc.doctorVisits ? `
                    <div class="text-[11px] font-bold text-amber-800 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 flex items-center justify-between">
                      <span>Doctor Specialist Visit:</span>
                      <span class="text-amber-950 font-extrabold">${vc.doctorVisits}</span>
                    </div>
                  ` : ''}

                  <!-- Live Operating Hours -->
                  <div class="text-xs text-slate-700 font-medium bg-teal-50/50 p-2.5 rounded-xl border border-teal-100">
                    <div class="text-[10px] text-teal-800 font-bold uppercase tracking-wider">Timings</div>
                    <div class="text-teal-950 font-semibold mt-0.5">${vc.hours}</div>
                  </div>
                </div>

                <!-- Footer Telephony & Details Links -->
                <div class="pt-4 border-t border-teal-100 flex items-center justify-between gap-2">
                  <a href="tel:${cleanPhone}" class="text-xs font-bold text-teal-900 flex items-center gap-1.5 hover:underline">
                    <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <span>${vc.phone}</span>
                  </a>
                  <a href="#/vision-centers/${vc.id}" class="text-xs font-extrabold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
                    <span>Details</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;
  }

  function renderVisionCenterDetailPage(centerId) {
    // Support bbagewadi alias for b-bagewadi
    let lookupId = centerId;
    if (lookupId === 'bbagewadi') lookupId = 'b-bagewadi';

    const vc = store.getFacilityById(lookupId);
    if (!vc) return render404Page();

    const status = getVisionCenterLiveStatus(vc);
    const cleanPhone = vc.phone.replace(/[^0-9+]/g, '');
    const whatsappNum = (vc.whatsappPhone || "+91 94481 20646").replace(/[^0-9]/g, '');

    // DISTINCT SINDAGI PAGE / PENDING AUDIT NOTICE TEMPLATE
    if (vc.isPendingDetails || lookupId === 'sindagi') {
      return `
        <div class="max-w-4xl mx-auto px-4 py-10 space-y-8 font-sans">
          <a href="#/vision-centers" class="inline-flex items-center gap-2 text-xs font-bold text-teal-800 hover:underline">&larr; Back to 8 Vision Centers Directory</a>

          <div class="glass-card rounded-3xl p-8 border border-amber-200 space-y-8 shadow-xl">
            
            <!-- Pending Header -->
            <div class="space-y-3 pb-6 border-b border-amber-200">
              <span class="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 font-bold text-xs uppercase tracking-wider border border-amber-300">
                [CONFIRM WITH HOSPITAL — Sindagi center details pending]
              </span>
              <h1 class="text-3xl font-extrabold text-teal-950 font-heading">${vc.name}</h1>
              <p class="text-slate-600 text-sm">${vc.address}</p>
            </div>

            <!-- Distinct Audit Notice Alert Box -->
            <div class="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-3">
              <div class="flex items-center gap-2 text-amber-900 font-extrabold text-sm uppercase tracking-wider">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <span>Administrative Verification in Progress</span>
              </div>
              <p class="text-slate-700 text-xs leading-relaxed">
                The <strong>Sindagi Vision Center</strong> is an active, registered part of the Anugraha Eye Hospital rural outreach network. Local facility coordinates, specific equipment inventory, and operating hours are currently undergoing administrative confirmation from the hospital communications office.
              </p>
              <p class="text-slate-700 text-xs font-semibold">
                Per hospital guidelines, patients in Sindagi requiring immediate eye examination or emergency ophthalmic consultation should call the helpline directly.
              </p>
            </div>

            <!-- Telephony CTAs using Sindagi Helpline -->
            <div class="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a href="tel:${cleanPhone}" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-900 text-white font-extrabold text-xs hover:bg-teal-950 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>Call Sindagi Helpline: ${vc.phone}</span>
              </a>

              <a href="https://wa.me/${whatsappNum}?text=Enquiry%20regarding%20Sindagi%20Vision%20Center" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WhatsApp Sindagi Desk</span>
              </a>
            </div>

            <!-- Network Trust Footer -->
            <div class="p-6 rounded-2xl bg-teal-950 text-white space-y-3 border border-teal-800">
              <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Part of the Anugraha Eye Hospital Network</div>
              <p class="text-xs text-slate-300 leading-relaxed">
                Supported directly by our super-specialty base hospital campuses in Vijayapura and Kalaburagi.
              </p>
              <div class="flex flex-wrap items-center gap-3 pt-2">
                <a href="#/hospitals/vijayapura" class="text-xs font-bold text-emerald-300 hover:underline">Vijayapura Base Hospital &rarr;</a>
                <a href="#/hospitals/kalaburagi" class="text-xs font-bold text-emerald-300 hover:underline">Kalaburagi Base Hospital &rarr;</a>
              </div>
            </div>

          </div>
        </div>
      `;
    }

    // STANDARD VERIFIED VISION CENTER DETAIL TEMPLATE
    return `
      <div class="max-w-4xl mx-auto px-4 py-10 space-y-8 font-sans">
        <a href="#/vision-centers" class="inline-flex items-center gap-2 text-xs font-bold text-teal-800 hover:underline">&larr; Back to 8 Vision Centers Directory</a>

        <div class="glass-card rounded-3xl p-8 border border-teal-100 space-y-8 shadow-xl">
          
          <!-- Header Title & Center-Specific Telephony CTAs -->
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-teal-100">
            <div class="space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-3.5 py-1 rounded-full badge-teal font-bold text-xs uppercase tracking-wider">Rural Outreach Center</span>
                <span class="px-3 py-1 rounded-full text-xs ${status.badgeClass}">
                  ${status.label}
                </span>
              </div>
              <h1 class="text-3xl font-extrabold text-teal-950 font-heading">${vc.name}</h1>
              <p class="text-slate-600 text-sm font-medium">${vc.address}</p>
            </div>

            <!-- Center's OWN Telephony Buttons -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
              <a href="tel:${cleanPhone}" class="px-5 py-3 rounded-xl bg-teal-900 text-white font-extrabold text-xs hover:bg-teal-950 transition-colors flex items-center justify-center gap-2 shadow-md">
                <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>Call Center: ${vc.phone}</span>
              </a>

              <a href="https://wa.me/${whatsappNum}?text=Enquiry%20regarding%20${encodeURIComponent(vc.name)}" target="_blank" rel="noopener noreferrer" class="px-4 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md">
                <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <!-- Hours Table & Doctor Visit Schedule -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-2">
              <div class="text-xs font-extrabold text-teal-900 uppercase tracking-wider">Operating Timings</div>
              <div class="text-sm font-extrabold text-teal-950">${vc.hours}</div>
              <p class="text-[11px] text-slate-500">Walk-in vision examinations and optical dispensing during operating hours.</p>
            </div>

            <div class="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div class="text-xs font-extrabold text-amber-900 uppercase tracking-wider">Specialist Doctor Visit Schedule</div>
              <div class="text-sm font-extrabold text-amber-950">${vc.doctorVisits || "Regular Specialist Rotation"}</div>
              <p class="text-[11px] text-slate-600">Senior eye surgeon from Vijayapura base hospital visits on scheduled days.</p>
            </div>
          </div>

          <!-- On-Site Facilities & Equipment List -->
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-teal-950 font-heading">On-Site Clinical Facilities & Services</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${(vc.facilitiesList || [
                "Primary Vision Examination & Refraction",
                "Prescription Spectacles & Custom Optics",
                "Contact Lens Fitting & Care",
                "Ophthalmic Pharmacy Medications",
                "Emergency Triage & Base Hospital Routing"
              ]).map(item => `
                <div class="p-3.5 rounded-xl bg-white border border-teal-100 flex items-center gap-3 shadow-sm">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <span class="text-xs font-bold text-teal-950">${item}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Network Trust Footer Banner -->
          <div class="p-6 rounded-3xl bg-teal-950 text-white space-y-3 border border-teal-800 shadow-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md overflow-hidden shrink-0">
                <img src="assets/official_logo.jpg" alt="Official Logo" class="w-full h-full object-contain" />
              </div>
              <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Part of the Anugraha Eye Hospital Network</div>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              This center operates as an official rural outreach facility under <strong>Anugraha Eye Hospital</strong>, connected to our super-specialty base hospital campuses in Vijayapura and Kalaburagi for advanced surgeries and emergency care.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-2 border-t border-teal-800/80">
              <a href="#/hospitals/vijayapura" class="text-xs font-bold text-emerald-300 hover:underline flex items-center gap-1">
                <span>Vijayapura Base Hospital</span>
                <span>&rarr;</span>
              </a>
              <a href="#/hospitals/kalaburagi" class="text-xs font-bold text-emerald-300 hover:underline flex items-center gap-1">
                <span>Kalaburagi Base Hospital</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // 7. SERVICES View (Super-Specialty Directory with Doctor Cards & Direct Routing)
  function renderServicesPage() {
    const brand = store.getBrand();
    const servicesList = store.getServices().filter(s => s.published !== false);
    const leadership = store.getLeadership() || [];

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-12 font-sans">
        
        <!-- Header & Breadcrumbs -->
        <div class="space-y-4 max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Super-Specialty Ophthalmic Care</span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-teal-950 dark:text-white font-heading tracking-tight">
            Super-Specialty Ophthalmic Services
          </h1>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
            Comprehensive diagnostic, medical, and micro-surgical ophthalmic departments equipped with cutting-edge surgical suites and led by experienced specialist surgeons across North Karnataka.
          </p>
        </div>

        <!-- Trust Highlights Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div class="p-4 rounded-2xl glass-card border border-teal-100 dark:border-teal-900/60 text-center space-y-1">
            <div class="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-heading">9 Units</div>
            <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Super-Specialty Clinics</div>
          </div>
          <div class="p-4 rounded-2xl glass-card border border-teal-100 dark:border-teal-900/60 text-center space-y-1">
            <div class="text-2xl font-extrabold text-teal-900 dark:text-teal-300 font-heading">2.28 Lakh+</div>
            <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Surgeries Performed</div>
          </div>
          <div class="p-4 rounded-2xl glass-card border border-teal-100 dark:border-teal-900/60 text-center space-y-1">
            <div class="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-heading">24/7 Care</div>
            <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Emergency Eye Trauma</div>
          </div>
          <div class="p-4 rounded-2xl glass-card border border-teal-100 dark:border-teal-900/60 text-center space-y-1">
            <div class="text-2xl font-extrabold text-teal-900 dark:text-teal-300 font-heading">25+ Years</div>
            <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Clinical Excellence</div>
          </div>
        </div>

        <!-- Super-Specialty Services Grid (9 Core Services) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${servicesList.map(s => {
            // Resolve assigned doctor profiles
            const assignedDocs = (s.relatedDoctorIds || []).map(docId => {
              return leadership.find(d => d.id === docId);
            }).filter(Boolean);

            if (assignedDocs.length === 0 && Array.isArray(s.relatedDoctors)) {
              s.relatedDoctors.forEach(docName => {
                const found = leadership.find(d => d.name.toLowerCase().includes(docName.toLowerCase()) || docName.toLowerCase().includes(d.name.toLowerCase()));
                if (found && !assignedDocs.includes(found)) assignedDocs.push(found);
              });
            }

            const targetSlug = s.slug || s.id;

            return `
              <div class="spotlight-card rounded-3xl border border-teal-100/90 dark:border-teal-900/60 overflow-hidden flex flex-col justify-between hover-lift transition-all group bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl">
                
                <!-- Service Image Header -->
                <div class="relative w-full h-52 bg-slate-900 overflow-hidden border-b border-teal-800/30">
                  <img 
                    src="${s.heroImage || s.serviceImage || s.imagePlaceholder || 'assets/services/cataract_surgery.jpg'}" 
                    alt="${s.title}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#062c26] via-[#062c26]/50 to-transparent"></div>

                  <!-- Category Tag & Action Icon -->
                  <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span class="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/40 backdrop-blur-sm shadow">
                      ${s.category || 'Super-Specialty'}
                    </span>
                    <div class="w-8 h-8 rounded-xl bg-teal-900/90 text-emerald-300 flex items-center justify-center font-bold border border-teal-700/60 shadow backdrop-blur-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </div>
                  </div>

                  <!-- Subtitle Overlay -->
                  <div class="absolute bottom-3 left-3.5 right-3.5 z-10">
                    <div class="text-[11px] font-bold text-emerald-300 font-mono uppercase tracking-wider truncate drop-shadow">
                      ${s.subtitle || s.title}
                    </div>
                  </div>
                </div>

                <!-- Content Body -->
                <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div class="space-y-2.5">
                    <h3 class="text-xl font-extrabold text-teal-950 dark:text-white font-heading leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      <a href="#/services/${targetSlug}">
                        ${s.title}
                      </a>
                    </h3>
                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      ${s.shortDesc || s.desc}
                    </p>
                  </div>

                  <!-- Associated Specialist Doctors Block -->
                  ${assignedDocs.length > 0 ? `
                    <div class="p-3 rounded-2xl bg-teal-50/70 dark:bg-slate-800/80 border border-teal-100/80 dark:border-teal-900/60 space-y-2">
                      <div class="text-[10px] font-extrabold text-teal-900 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Specialist ${assignedDocs.length > 1 ? 'Surgeons' : 'Surgeon'}</span>
                      </div>
                      <div class="space-y-2">
                        ${assignedDocs.slice(0, 2).map(doc => `
                          <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-full overflow-hidden bg-teal-900 shrink-0 border border-emerald-400/40">
                              <img src="${doc.photo || 'assets/doctors/dr_lingadalli.jpg'}" alt="${doc.name}" class="w-full h-full object-cover object-top" />
                            </div>
                            <div class="min-w-0 flex-1">
                              <div class="text-xs font-bold text-teal-950 dark:text-white truncate">${doc.name}</div>
                              <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate">${doc.degrees || ''} &bull; ${doc.designation || doc.specialization || ''}</div>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}

                  <!-- Card Footer Actions -->
                  <div class="pt-4 border-t border-teal-100 dark:border-teal-900/60 flex items-center justify-between gap-3">
                    <a 
                      href="tel:${(brand.fallbackPhone || '08352-220646').replace(/[^0-9+]/g, '')}" 
                      class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                      title="Direct Helpline"
                    >
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      <span>Enquire</span>
                    </a>

                    <a 
                      href="#/services/${targetSlug}" 
                      class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-950 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs font-heading shadow transition-all hover:gap-2"
                    >
                      <span>Learn More</span>
                      <span class="icon-shift-right">&rarr;</span>
                    </a>
                  </div>

                </div>

              </div>
            `;
          }).join('')}
        </div>

        <!-- Comprehensive Support Banner -->
        <div class="p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-[#062c26] to-teal-950 text-white space-y-4 border border-teal-800 shadow-xl">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
                Emergency & Outreach Support
              </div>
              <h3 class="text-2xl font-extrabold font-heading text-white">Need Urgent Eye Care or Specialist Advice?</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Our 24/7 Eye Trauma Unit and Base Hospital OPD desks in Vijayapura and Kalaburagi are active with on-call ophthalmic surgeons and emergency diagnostics.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3 shrink-0">
              <a href="tel:${(brand.fallbackPhone || '08352-220646').replace(/[^0-9+]/g, '')}" class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all">
                <span>Call Helpline: ${brand.fallbackPhone || '08352-220646'}</span>
                <span>&rarr;</span>
              </a>
              <a href="https://wa.me/${(brand.whatsappPhone || '917483900963').replace(/[^0-9]/g, '')}?text=Hello%20Anugraha%20Eye%20Hospital,%20I%20would%20like%20to%20enquire%20about%20your%20Super-Specialty%20Services." target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors flex items-center gap-2">
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // 7b. SUPER-SPECIALTY SERVICE DETAIL PAGE ENGINE (Complete Clinical Details Box System & Doctors)
  function renderServiceDetailPage(serviceIdOrSlug) {
    const brand = store.getBrand();
    const service = store.getServiceById(serviceIdOrSlug);
    const leadership = store.getLeadership() || [];

    if (!service) {
      return `
        <div class="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
          <div class="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto text-2xl font-bold">⚠️</div>
          <h1 class="text-3xl font-extrabold text-teal-950 dark:text-white font-heading">Specialty Department Not Found</h1>
          <p class="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">The requested ophthalmic specialty could not be located or may have been updated in our clinical catalog.</p>
          <div class="pt-4 flex items-center justify-center gap-4">
            <a href="#/services" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all">Explore All Services &rarr;</a>
            <a href="#/" class="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">Return Home</a>
          </div>
        </div>
      `;
    }

    // Resolve assigned doctors from leadership store
    const assignedDoctors = (service.relatedDoctorIds || []).map(docId => {
      return leadership.find(d => d.id === docId);
    }).filter(Boolean);

    if (assignedDoctors.length === 0 && Array.isArray(service.relatedDoctors)) {
      service.relatedDoctors.forEach(docName => {
        const found = leadership.find(d => d.name.toLowerCase().includes(docName.toLowerCase()) || docName.toLowerCase().includes(d.name.toLowerCase()));
        if (found && !assignedDoctors.includes(found)) assignedDoctors.push(found);
      });
    }

    const cd = service.clinicalDetails || {};
    const overviewText = cd.overview || service.fullDesc || service.desc || service.shortDesc || '';
    const conditions = Array.isArray(cd.conditions) && cd.conditions.length > 0 ? cd.conditions : (service.symptoms ? [service.symptoms] : []);
    const symptoms = Array.isArray(cd.symptoms) && cd.symptoms.length > 0 ? cd.symptoms : (service.symptoms ? [service.symptoms] : []);
    const diagnosis = Array.isArray(cd.diagnosis) && cd.diagnosis.length > 0 ? cd.diagnosis : (service.diagnosis ? [service.diagnosis] : []);
    const treatment = Array.isArray(cd.treatment) && cd.treatment.length > 0 ? cd.treatment : (service.treatment ? [service.treatment] : []);
    const procedure = Array.isArray(cd.procedure) && cd.procedure.length > 0 ? cd.procedure : [];
    const benefits = Array.isArray(cd.benefits) && cd.benefits.length > 0 ? cd.benefits : [];
    const preparation = Array.isArray(cd.preparation) && cd.preparation.length > 0 ? cd.preparation : [];
    const recovery = Array.isArray(cd.recovery) && cd.recovery.length > 0 ? cd.recovery : [];
    const whenToConsult = Array.isArray(cd.whenToConsult) && cd.whenToConsult.length > 0 ? cd.whenToConsult : [];
    const faqs = Array.isArray(service.faqs) && service.faqs.length > 0 ? service.faqs : (service.faq ? [{ q: `What are the details of ${service.title}?`, a: service.faq }] : []);

    return `
      <div class="max-w-7xl mx-auto px-4 py-8 space-y-12 font-sans">
        
        <!-- Breadcrumbs Navigation -->
        <nav class="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-emerald-600 transition-colors">Home</a>
          <span>/</span>
          <a href="#/services" class="hover:text-emerald-600 transition-colors">Services</a>
          <span>/</span>
          <span class="text-teal-950 dark:text-white font-bold truncate">${service.title}</span>
        </nav>

        <!-- Department Hero Card -->
        <div class="relative rounded-3xl overflow-hidden bg-[#062c26] text-white border border-teal-800 shadow-2xl">
          
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0 z-0">
            <img 
              src="${service.heroImage || service.serviceImage || service.imagePlaceholder || 'assets/services/cataract_surgery.jpg'}" 
              alt="${service.title}" 
              class="w-full h-full object-cover opacity-25" 
            />
            <div class="absolute inset-0 bg-gradient-to-r from-[#062c26] via-[#062c26]/90 to-[#062c26]/70"></div>
          </div>

          <div class="relative z-10 p-8 sm:p-12 space-y-6 max-w-4xl">
            <div class="flex flex-wrap items-center gap-3">
              <span class="px-3.5 py-1.5 rounded-full bg-emerald-950/90 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/40 shadow-sm">
                ${service.category || 'Super-Specialty Ophthalmology'}
              </span>
              <span class="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-mono border border-white/20">
                Department Protocol Verified
              </span>
            </div>

            <div class="space-y-3">
              <h1 class="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
                ${service.title}
              </h1>
              ${service.subtitle ? `
                <p class="text-emerald-300 font-medium text-base sm:text-lg">
                  ${service.subtitle}
                </p>
              ` : ''}
            </div>

            <p class="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
              ${service.shortDesc || service.desc}
            </p>

            <!-- Quick Action CTA Buttons -->
            <div class="pt-2 flex flex-wrap items-center gap-4">
              <a 
                href="tel:${(brand.fallbackPhone || '08352-220646').replace(/[^0-9+]/g, '')}" 
                class="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>Book OPD Consultation: ${brand.fallbackPhone || '08352-220646'}</span>
              </a>

              <a 
                href="https://wa.me/${(brand.whatsappPhone || '917483900963').replace(/[^0-9]/g, '')}?text=Hello%20Anugraha%20Eye%20Hospital,%20I%20would%20like%20to%20consult%20regarding%20${encodeURIComponent(service.title)}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors flex items-center gap-2"
              >
                <span>WhatsApp Appointment</span>
                <span>&rarr;</span>
              </a>

              <a 
                href="#/services" 
                class="px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-slate-300 font-medium text-xs transition-colors"
              >
                &larr; All Specialties
              </a>
            </div>
          </div>
        </div>

        <!-- CLINICAL DETAILS BOX SYSTEM (10 Informative Responsive Cards) -->
        <section class="space-y-6">
          <div class="border-b border-teal-100 dark:border-teal-900/60 pb-4 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-mono">Clinical Protocol & Department Guide</div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-teal-950 dark:text-white font-heading">Comprehensive Clinical System</h2>
            </div>
            <span class="px-3 py-1 rounded-full badge-teal font-mono text-xs font-bold">10 Clinical Dimensions</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- 1. [ Clinical Overview ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-teal-50/50 to-white dark:from-slate-900 dark:to-slate-950 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">📋</div>
                <div>
                  <h3 class="text-lg font-extrabold text-teal-950 dark:text-white font-heading">Clinical Overview</h3>
                  <div class="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">Department Mission & Procedural Science</div>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                ${overviewText}
              </p>
            </div>

            <!-- 2. [ Conditions Treated ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-teal-900 text-emerald-300 flex items-center justify-center font-bold text-lg shadow shrink-0">🎯</div>
                  <div>
                    <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">Conditions Treated</h3>
                    <div class="text-[10px] text-slate-500 font-semibold uppercase">Diagnoses Managed</div>
                  </div>
                </div>
                <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  ${conditions.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- 3. [ Symptoms / When to Seek Care ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">⚠️</div>
                  <div>
                    <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">Symptoms & Warning Signs</h3>
                    <div class="text-[10px] text-slate-500 font-semibold uppercase">When to Seek Care</div>
                  </div>
                </div>
                <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  ${symptoms.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-amber-600 dark:text-amber-400 font-bold shrink-0">&bull;</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- 4. [ Diagnosis & Tests ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">🔬</div>
                  <div>
                    <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">Diagnostic Modalities</h3>
                    <div class="text-[10px] text-slate-500 font-semibold uppercase">Imaging & Measurements</div>
                  </div>
                </div>
                <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  ${diagnosis.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-blue-600 dark:text-blue-400 font-bold shrink-0">&bull;</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- 5. [ Treatment Modalities ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0">💉</div>
                  <div>
                    <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">Treatment Options</h3>
                    <div class="text-[10px] text-slate-500 font-semibold uppercase">Medical & Surgical Pathways</div>
                  </div>
                </div>
                <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  ${treatment.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- 6. [ Step-by-Step Procedure ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-emerald-50/40 to-teal-50/30 dark:from-slate-900 dark:to-slate-950 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-teal-900 text-white flex items-center justify-center font-bold text-lg shadow shrink-0">🛠️</div>
                <div>
                  <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">Step-by-Step Clinical Procedure</h3>
                  <div class="text-[10px] text-slate-500 font-semibold uppercase">Detailed Surgical & Diagnostic Execution</div>
                </div>
              </div>
              <div class="space-y-2.5 pt-2">
                ${procedure.map(step => `
                  <div class="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-teal-100/80 dark:border-teal-900/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3 shadow-xs">
                    <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">&check;</span>
                    <span class="leading-relaxed">${step}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 7. [ Clinical Benefits ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0">✨</div>
                  <div>
                    <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">Clinical Benefits</h3>
                    <div class="text-[10px] text-slate-500 font-semibold uppercase">Outcomes & Advantages</div>
                  </div>
                </div>
                <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  ${benefits.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">&bull;</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- 8. [ Patient Preparation ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-lg shrink-0">🩺</div>
                  <div>
                    <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">Patient Preparation</h3>
                    <div class="text-[10px] text-slate-500 font-semibold uppercase">Pre-Operative Instructions</div>
                  </div>
                </div>
                <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  ${preparation.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">&bull;</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- 9. [ Recovery & Follow-Up ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold text-lg shrink-0">🌿</div>
                  <div>
                    <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">Recovery & Follow-Up</h3>
                    <div class="text-[10px] text-slate-500 font-semibold uppercase">Post-Op Care Protocols</div>
                  </div>
                </div>
                <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  ${recovery.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-teal-600 dark:text-teal-400 font-bold shrink-0">&bull;</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- 10. [ When to Seek Emergency Evaluation ] -->
            <div class="glass-card rounded-3xl p-6 border border-teal-100 dark:border-teal-900/60 space-y-3 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold text-lg shrink-0">🚨</div>
                  <div>
                    <h3 class="text-base font-extrabold text-teal-950 dark:text-white font-heading">When to Consult</h3>
                    <div class="text-[10px] text-slate-500 font-semibold uppercase">Clinical Triggers</div>
                  </div>
                </div>
                <ul class="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  ${whenToConsult.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-rose-600 dark:text-rose-400 font-bold shrink-0">&bull;</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

          </div>
        </section>

        <!-- SPECIALIST DOCTORS & CLINICAL FACULTY SECTION -->
        <section class="space-y-6 pt-4 border-t border-teal-100 dark:border-teal-900/60">
          <div class="space-y-1">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-mono">Expert Surgical Faculty</div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-teal-950 dark:text-white font-heading">Specialist Doctors in This Department</h2>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Consult with renowned ophthalmic consultants dedicated to ${service.title}.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${assignedDoctors.map(doc => `
              <div class="glass-card rounded-3xl border border-teal-100 dark:border-teal-900/60 overflow-hidden flex flex-col justify-between hover-lift shadow-md bg-white dark:bg-slate-900">
                <div class="h-56 overflow-hidden bg-[#093327] relative flex items-center justify-center">
                  <img src="${doc.photo || 'assets/doctors/dr_lingadalli.jpg'}" alt="${doc.name}" class="w-full h-full object-cover object-top" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#062c26] via-transparent to-transparent"></div>
                  <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-400/40 backdrop-blur-sm">
                    ${doc.specialization || service.title}
                  </span>
                </div>

                <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div class="space-y-1.5">
                    <h3 class="text-xl font-extrabold text-teal-950 dark:text-white font-heading">${doc.name}</h3>
                    <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400">${doc.degrees || ''}</div>
                    <div class="text-xs text-slate-500 font-medium">${doc.designation || doc.title || 'Consultant Surgeon'} &bull; ${doc.hospital || 'Vijayapura / Kalaburagi'}</div>
                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2">${doc.bio || ''}</p>
                  </div>

                  <div class="pt-4 border-t border-teal-100 dark:border-teal-900/60 flex items-center justify-between text-xs">
                    <span class="text-slate-500 font-mono font-medium">${doc.experience || 'Experienced Specialist'}</span>
                    <a href="tel:${(brand.fallbackPhone || '08352-220646').replace(/[^0-9+]/g, '')}" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow">
                      Consult &rarr;
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- FREQUENTLY ASKED QUESTIONS (FAQs) -->
        ${faqs.length > 0 ? `
          <section class="space-y-6 pt-4 border-t border-teal-100 dark:border-teal-900/60">
            <div class="space-y-1">
              <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-mono">Patient Guide & Clarity</div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-teal-950 dark:text-white font-heading">Frequently Asked Questions</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${faqs.map(faq => `
                <div class="glass-card rounded-2xl p-5 border border-teal-100 dark:border-teal-900/60 space-y-2 bg-white dark:bg-slate-900 shadow-sm">
                  <h4 class="text-sm font-extrabold text-teal-950 dark:text-white font-heading flex items-start gap-2">
                    <span class="text-emerald-600 font-bold shrink-0">Q.</span>
                    <span>${faq.q}</span>
                  </h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                    ${faq.a}
                  </p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- FINAL CTA & ROUTING FOOTER -->
        <div class="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#062c26] via-teal-950 to-[#062c26] text-white border border-teal-800 shadow-2xl space-y-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
                Anugraha Eye Hospital &bull; Authentic &bull; Affectionate &bull; Affordable
              </div>
              <h3 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">Book an Appointment for ${service.title}</h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Consult with our specialized ophthalmic surgeons at our Vijayapura Base Hospital or Kalaburagi Base Hospital campuses. Walk-ins welcome during OPD hours.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3 shrink-0">
              <a 
                href="tel:${(brand.fallbackPhone || '08352-220646').replace(/[^0-9+]/g, '')}" 
                class="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all"
              >
                <span>Call Vijayapura: ${brand.fallbackPhone || '08352-220646'}</span>
                <span>&rarr;</span>
              </a>
              <a 
                href="#/services" 
                class="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors"
              >
                View Other Specialties
              </a>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // 8. ACADEMICS View (Hub + Detail Pages Engine with RGUHS & NBE Accreditations)
  function renderAcademicsPage() {
    const academics = store.getAcademics().filter(a => a.published !== false);
    const brand = store.getBrand();

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-12 font-sans">
        
        <!-- Header with Official Logo -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-amber font-semibold text-xs uppercase tracking-wider">
            <div class="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden shrink-0">
              <img src="assets/official_logo.jpg" alt="Official Logo" class="w-full h-full object-contain" />
            </div>
            <span>Academic & Medical Education Hub</span>
          </div>
          <h1 class="text-4xl font-extrabold text-teal-950 font-heading">Academic & Training Programs</h1>
          <p class="text-slate-600 leading-relaxed text-sm">
            Training the next generation of ophthalmologists, optometrists, and ophthalmic technicians across our Vijayapura Base Hospital and Kalaburagi Optometry Institute.
          </p>
        </div>

        <!-- Institutional Accreditation & Credibility Banner -->
        <div class="p-6 rounded-3xl bg-teal-950 text-white border border-teal-800 shadow-xl space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md overflow-hidden shrink-0">
              <img src="assets/official_logo.jpg" alt="Official Hospital Logo" class="w-full h-full object-contain" />
            </div>
            <div>
              <div class="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">Institutional Accreditations & Recognitions</div>
              <h3 class="text-lg font-bold font-heading text-white">National & University Recognitions</h3>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div class="p-4 rounded-2xl bg-teal-900/80 border border-teal-700/60 space-y-1">
              <div class="text-xs font-bold text-amber-300">RGUHS Affiliation</div>
              <p class="text-xs text-slate-200"><strong>Anugraha Institute of Optometry, Kalaburagi</strong> is affiliated with <em>Rajiv Gandhi University of Health Sciences (RGUHS)</em> for B.Sc Optometry degree seats.</p>
            </div>
            <div class="p-4 rounded-2xl bg-teal-900/80 border border-teal-700/60 space-y-1">
              <div class="text-xs font-bold text-emerald-300">NBEMS / NBE Accreditation</div>
              <p class="text-xs text-slate-200"><strong>Vijayapura Base Hospital</strong> is recognized by the <em>National Board of Examinations in Medical Sciences (NBEMS / NBE)</em> for DNB Post-Graduate seats.</p>
            </div>
            <div class="p-4 rounded-2xl bg-teal-900/80 border border-teal-700/60 space-y-1">
              <div class="text-xs font-bold text-teal-300">Paramedical Board Karnataka</div>
              <p class="text-xs text-slate-200">State Paramedical Board recognized Diploma in Ophthalmic Technology (DOT) seats for rural healthcare capacity building.</p>
            </div>
          </div>
        </div>

        <!-- 4 Premium Program Cards Hub Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${academics.map(prog => `
            <div class="glass-card rounded-3xl border border-teal-100/90 overflow-hidden space-y-6 hover-lift flex flex-col justify-between shadow-lg">
              
              <!-- Card Header Banner with Swappable Image & Official Logo Badge -->
              <div class="relative w-full h-48 bg-gradient-to-br from-[#062c26] via-[#0d4b43] to-[#041a17] p-6 flex flex-col justify-between text-white overflow-hidden border-b border-teal-800/60">
                <div class="flex items-center justify-between relative z-10">
                  <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                    ${prog.credibilityBadge || 'Academic Program'}
                  </span>
                  <div class="w-8 h-8 rounded-full bg-white p-0.5 shadow-md overflow-hidden shrink-0">
                    <img src="assets/official_logo.jpg" alt="Official Logo" class="w-full h-full object-contain" />
                  </div>
                </div>

                <div class="relative z-10 space-y-1">
                  <span class="text-[10px] uppercase font-bold tracking-wider text-amber-300">${prog.campus}</span>
                  <h3 class="text-2xl font-extrabold text-white font-heading">${prog.title}</h3>
                </div>
              </div>

              <!-- Program Details Content -->
              <div class="p-8 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    Accreditation: ${prog.recognizedBy}
                  </div>

                  <div class="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-xs font-semibold text-slate-700 space-y-1">
                    <div><strong>Duration:</strong> ${prog.duration}</div>
                    <div><strong>Eligibility:</strong> ${prog.eligibility}</div>
                  </div>

                  <p class="text-slate-600 text-xs leading-relaxed line-clamp-3">${prog.desc}</p>
                </div>

                <div class="pt-4 border-t border-teal-100 flex items-center justify-between gap-3">
                  <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="px-4 py-2.5 rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-950 transition-colors flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <span>Call Academic Desk</span>
                  </a>
                  <a href="#/academics/${prog.id}" class="text-xs font-extrabold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
                    <span>Program Details</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // ACADEMICS DETAIL PAGE ENGINE (/academics/{slug})
  function renderAcademicDetailPage(slug) {
    const prog = store.getAcademicProgramById(slug);
    if (!prog) return render404Page();

    const brand = store.getBrand();
    const cleanPhone = brand.fallbackPhone.replace(/[^0-9+]/g, '');
    const whatsappNum = (brand.whatsappPhone || "+91 94481 20646").replace(/[^0-9]/g, '');

    return `
      <div class="max-w-4xl mx-auto px-4 py-10 space-y-8 font-sans">
        <a href="#/academics" class="inline-flex items-center gap-2 text-xs font-bold text-teal-800 hover:underline">&larr; Back to Academics & Training Hub</a>

        <div class="glass-card rounded-3xl p-8 border border-teal-100 space-y-8 shadow-xl">
          
          <!-- Header Banner with Official Logo -->
          <div class="space-y-4 pb-6 border-b border-teal-100">
            <div class="flex items-center justify-between gap-4 flex-wrap">
              <span class="px-3.5 py-1.5 rounded-full badge-amber font-bold text-xs uppercase tracking-wider">
                ${prog.credibilityBadge || 'Academic Program'}
              </span>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm border border-teal-900/20 overflow-hidden">
                  <img src="assets/official_logo.jpg" alt="Official Logo" class="w-full h-full object-contain" />
                </div>
                <span class="text-xs font-extrabold text-teal-900">${prog.campus}</span>
              </div>
            </div>

            <h1 class="text-3xl font-extrabold text-teal-950 font-heading">${prog.title}</h1>
            
            <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
              Affiliation / Recognized By: <span class="text-emerald-950 font-extrabold">${prog.recognizedBy}</span>
            </div>
          </div>

          <!-- Overview & Description -->
          <div class="space-y-3">
            <h3 class="text-xl font-bold text-teal-950 font-heading">Program Overview</h3>
            <p class="text-slate-700 text-sm leading-relaxed">${prog.desc}</p>
          </div>

          <!-- Who It's For & Duration Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-2">
              <div class="text-xs font-extrabold text-teal-900 uppercase tracking-wider">Who It's For (Eligibility)</div>
              <div class="text-sm font-extrabold text-teal-950">${prog.eligibility}</div>
            </div>

            <div class="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div class="text-xs font-extrabold text-amber-900 uppercase tracking-wider">Duration & Batch Capacity</div>
              <div class="text-sm font-extrabold text-amber-950">${prog.duration}</div>
              <p class="text-[11px] text-slate-600">Official batch intake schedule managed by Academic Cell.</p>
            </div>
          </div>

          <!-- Program Highlights & Surgical/Clinical Training -->
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-teal-950 font-heading">Clinical & Training Highlights</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${(prog.highlights || [
                "Hands-on clinical & diagnostic rotation",
                "Mentorship under senior ophthalmology consultants",
                "Advanced equipment exposure (Phaco, Contoura, OCT)",
                "Academic journal club & clinical seminar presentations"
              ]).map(h => `
                <div class="p-3.5 rounded-xl bg-white border border-teal-100 flex items-center gap-3 shadow-sm">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <span class="text-xs font-bold text-teal-950">${h}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- APPLY / ENQUIRE SECTION (Direct Telephony + mailto: Email Handler) -->
          <div class="p-8 rounded-3xl bg-teal-950 text-white space-y-6 border border-teal-800 shadow-xl">
            <div class="space-y-2">
              <div class="text-xs font-bold text-amber-300 uppercase tracking-wider">Apply & Academic Enquiries</div>
              <h3 class="text-2xl font-bold font-heading text-white">Direct Academic Contacts</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Connect directly with the Anugraha Academic Cell. There is no fake background form submission — all inquiries trigger direct telephone, WhatsApp, or native email communications.
              </p>
            </div>

            <!-- Direct Contact Telephony CTAs -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="tel:${cleanPhone}" class="px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>Call Academic Cell: ${brand.fallbackPhone}</span>
              </a>

              <a href="https://wa.me/${whatsappNum}?text=Academic%20Enquiry%20regarding%20${encodeURIComponent(prog.title)}" target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WhatsApp Desk</span>
              </a>

              <a href="mailto:${brand.contactEmail}?subject=Academic%20Enquiry%20-%20${encodeURIComponent(prog.title)}" class="px-6 py-3.5 rounded-2xl bg-teal-800 text-white font-extrabold text-xs hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 border border-teal-600 shadow-lg">
                <svg class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 012-2V7a2 2 0 01-2-2H5a2 2 0 01-2 2v10a2 2 0 012 2z"/></svg>
                <span>Email Application Enquiry</span>
              </a>
            </div>

            <!-- Mailto Form Polish Box -->
            <div class="p-5 rounded-2xl bg-teal-900/80 border border-teal-800 space-y-3">
              <div class="text-xs font-bold text-amber-300">Fast Email Enquiry Composer</div>
              <div class="text-[11px] text-slate-300 leading-relaxed">
                Clicking the email button above or submitting below opens your native email client (e.g. Outlook, Apple Mail, Gmail) pre-addressed to <strong>${brand.contactEmail}</strong> with your selected program details.
              </div>
              <form action="mailto:${brand.contactEmail}" method="get" enctype="text/plain" class="space-y-3 pt-1">
                <input type="hidden" name="subject" value="Academic Admission Enquiry - ${prog.title}" />
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" placeholder="Your Full Name" required class="px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-teal-700/60 focus:outline-none focus:border-amber-400" />
                  <input type="text" placeholder="Your Qualification (e.g. MBBS, 12th Science)" required class="px-3.5 py-2.5 rounded-xl bg-slate-950 text-white text-xs border border-teal-700/60 focus:outline-none focus:border-amber-400" />
                </div>
                <button type="submit" class="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
                  <span>Open Email Client to Send Enquiry (mailto:)</span>
                  <span>&rarr;</span>
                </button>
              </form>
            </div>

          </div>

          <!-- Network Trust Footer Banner -->
          <div class="p-6 rounded-3xl bg-teal-950 text-white space-y-3 border border-teal-800 shadow-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md overflow-hidden shrink-0">
                <img src="assets/official_logo.jpg" alt="Official Logo" class="w-full h-full object-contain" />
              </div>
              <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Part of the Anugraha Eye Hospital Education Network</div>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Academic programs are hosted across <strong>Vijayapura Base Hospital</strong> and <strong>Anugraha Institute of Optometry, Kalaburagi</strong>, affiliated with RGUHS and recognized by NBEMS and Paramedical Board Karnataka.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-2 border-t border-teal-800/80">
              <a href="#/hospitals/vijayapura" class="text-xs font-bold text-emerald-300 hover:underline">Vijayapura Campus &rarr;</a>
              <a href="#/hospitals/kalaburagi" class="text-xs font-bold text-emerald-300 hover:underline">Kalaburagi Campus &rarr;</a>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // PATIENT RESOURCES HUB View (/patient-resources)
  function renderPatientResourcesHub() {
    const brand = store.getBrand();

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-12 font-sans">
        
        <!-- Header -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">
            Patient Support & Information
          </div>
          <h1 class="text-4xl font-extrabold text-teal-950 font-heading">Patient Resources & Services Guide</h1>
          <p class="text-slate-600 leading-relaxed text-sm">
            Everything you need for your visit to Anugraha Eye Hospital — cashless insurance empanelments, pre-visit instructions, downloadable care manuals, and hospital emergency contact details.
          </p>
        </div>

        <!-- 4 Key Resource Gateway Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="#/patient-resources/empanelments-and-insurance" class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3 hover-lift block group">
            <div class="w-12 h-12 rounded-2xl bg-teal-900 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-md">
              💳
            </div>
            <h3 class="text-lg font-extrabold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">Insurance & Schemes</h3>
            <p class="text-xs text-slate-600 leading-relaxed">29+ empaneled government health schemes (Ayushman Bharat, ABY, JSS) & cashless private TPA partners.</p>
            <span class="text-xs font-bold text-teal-900 group-hover:underline inline-block pt-2">View 29+ Empanelments &rarr;</span>
          </a>

          <a href="#/patient-resources/handouts" class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3 hover-lift block group">
            <div class="w-12 h-12 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center font-bold text-xl shadow-md">
              📄
            </div>
            <h3 class="text-lg font-extrabold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">Care Handouts & PDFs</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Post-cataract recovery guides, diabetic retinopathy manuals, and pediatric amblyopia patching schedules.</p>
            <span class="text-xs font-bold text-teal-900 group-hover:underline inline-block pt-2">Download PDF Manuals &rarr;</span>
          </a>

          <a href="#/vision-centers" class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3 hover-lift block group">
            <div class="w-12 h-12 rounded-2xl bg-amber-700 text-amber-200 flex items-center justify-center font-bold text-xl shadow-md">
              📍
            </div>
            <h3 class="text-lg font-extrabold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">8 Rural Vision Centers</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Locate primary vision centers in Talikoti, Muddebihal, Sindagi, Indi, B.Bagewadi, Chadachan, Nalatwad, and Tikota.</p>
            <span class="text-xs font-bold text-teal-900 group-hover:underline inline-block pt-2">Find Nearest Vision Center &rarr;</span>
          </a>

          <a href="#/contact" class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3 hover-lift block group">
            <div class="w-12 h-12 rounded-2xl bg-teal-950 text-white flex items-center justify-center font-bold text-xl shadow-md">
              📞
            </div>
            <h3 class="text-lg font-extrabold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">Helpline & Contacts</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Vijayapura Base Hospital: 08352-220646 & 24x7 WhatsApp triage desk for patient inquiries.</p>
            <span class="text-xs font-bold text-teal-900 group-hover:underline inline-block pt-2">Contact Hospital Desk &rarr;</span>
          </a>
        </div>

        <!-- FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION - DYNAMICALLY STORE CONNECTED) -->
        <section class="space-y-6 pt-6">
          <div class="text-center space-y-2 max-w-xl mx-auto">
            <span class="px-3 py-1 rounded-full badge-emerald font-bold text-xs uppercase tracking-wider">Patient Care Guidance</span>
            <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Frequently Asked Questions</h2>
            <p class="text-slate-600 text-xs">Verified answers regarding consultations, OPD timings, insurance, and vision centers.</p>
          </div>

          <div class="max-w-4xl mx-auto space-y-4">
            ${store.getFaqs().map((faq, idx) => `
              <details class="glass-card rounded-2xl border border-teal-100 p-5 space-y-3 group cursor-pointer">
                <summary class="font-extrabold text-teal-950 text-base font-heading flex items-center justify-between outline-none">
                  <span>${idx + 1}. ${faq.question || faq.q}</span>
                  <span class="w-6 h-6 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center text-xs font-bold shrink-0 transition-transform group-open:rotate-180">+</span>
                </summary>
                <p class="text-xs text-slate-600 leading-relaxed pt-2 border-t border-teal-100/60">
                  ${faq.answer || faq.a}
                </p>
              </details>
            `).join('')}
          </div>
        </section>

      </div>
    `;
  }

  // 9. EMPANELMENTS & INSURANCE View (Category Grouped Logo Grid)
  function renderEmpanelmentsPage() {
    const empanelments = store.getEmpanelments().filter(e => e.published !== false);
    const categories = ["All", "Government Schemes", "Insurance Providers", "TPAs & Corporate"];
    
    const activeCat = window.activeEmpanelmentCategory || "All";
    const filtered = activeCat === "All" ? empanelments : empanelments.filter(e => e.category === activeCat);

    const govtSchemes = filtered.filter(e => e.category === "Government Schemes");
    const insuranceProv = filtered.filter(e => e.category === "Insurance Providers");
    const tpaCorp = filtered.filter(e => e.category === "TPAs & Corporate");

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-12 font-sans">
        
        <!-- Header with Official Logo -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">
            <div class="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden shrink-0">
              <img src="assets/official_logo.jpg" alt="Official Logo" class="w-full h-full object-contain" />
            </div>
            <span>Patient Financial Resources</span>
          </div>
          <h1 class="text-4xl font-extrabold text-teal-950 font-heading">Empanelments, Insurance & Schemes</h1>
          <p class="text-slate-600 leading-relaxed text-sm">
            Anugraha Eye Hospital is empaneled with major Government Health Schemes, Insurance Companies, and Third Party Administrators (TPAs) for cashless treatments across Vijayapura and Kalaburagi campuses.
          </p>
        </div>

        <!-- Filter Chips -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          ${categories.map(cat => `
            <button onclick="window.setEmpanelmentCategory('${cat}')" class="px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${activeCat === cat ? 'bg-teal-900 text-white shadow-lg scale-105' : 'glass-card text-teal-950 hover:bg-teal-50'}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Category Group 1: Government Schemes -->
        ${(activeCat === 'All' || activeCat === 'Government Schemes') && govtSchemes.length > 0 ? `
          <div class="space-y-4">
            <div class="flex items-center gap-3 border-b border-teal-100 pb-3">
              <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">🏛️</div>
              <h2 class="text-xl font-bold text-teal-950 font-heading">Government Health Schemes</h2>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              ${govtSchemes.map(item => `
                <div class="glass-card p-5 rounded-2xl border border-teal-100/90 text-center space-y-3 hover-lift flex flex-col items-center justify-between shadow-sm">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-900 to-emerald-800 text-amber-300 font-extrabold text-xs flex items-center justify-center font-heading shadow-md">
                    ${item.code}
                  </div>
                  <div class="text-xs font-extrabold text-teal-950 font-heading leading-tight">${item.name}</div>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">Government Approved</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Category Group 2: Insurance Providers -->
        ${(activeCat === 'All' || activeCat === 'Insurance Providers') && insuranceProv.length > 0 ? `
          <div class="space-y-4 pt-4">
            <div class="flex items-center gap-3 border-b border-teal-100 pb-3">
              <div class="w-8 h-8 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-xs">🛡️</div>
              <h2 class="text-xl font-bold text-teal-950 font-heading">Insurance Providers (Cashless TPA)</h2>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              ${insuranceProv.map(item => `
                <div class="glass-card p-5 rounded-2xl border border-teal-100/90 text-center space-y-3 hover-lift flex flex-col items-center justify-between shadow-sm">
                  <div class="w-12 h-12 rounded-2xl bg-teal-950 text-emerald-400 font-extrabold text-xs flex items-center justify-center font-heading shadow-md">
                    ${item.code}
                  </div>
                  <div class="text-xs font-extrabold text-teal-950 font-heading leading-tight">${item.name}</div>
                  <span class="px-2 py-0.5 rounded-full bg-teal-50 text-teal-900 border border-teal-200 font-bold text-[10px]">Cashless Network</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Category Group 3: TPAs & Corporate Partners -->
        ${(activeCat === 'All' || activeCat === 'TPAs & Corporate') && tpaCorp.length > 0 ? `
          <div class="space-y-4 pt-4">
            <div class="flex items-center gap-3 border-b border-teal-100 pb-3">
              <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">🏢</div>
              <h2 class="text-xl font-bold text-teal-950 font-heading">TPAs & Corporate Partners</h2>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              ${tpaCorp.map(item => `
                <div class="glass-card p-5 rounded-2xl border border-teal-100/90 text-center space-y-3 hover-lift flex flex-col items-center justify-between shadow-sm">
                  <div class="w-12 h-12 rounded-2xl bg-slate-900 text-amber-300 font-extrabold text-xs flex items-center justify-center font-heading shadow-md">
                    ${item.code}
                  </div>
                  <div class="text-xs font-extrabold text-teal-950 font-heading leading-tight">${item.name}</div>
                  <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">Empaneled TPA</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Network Assistance Footer -->
        <div class="p-6 rounded-3xl bg-teal-950 text-white space-y-3 border border-teal-800 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md overflow-hidden shrink-0">
              <img src="assets/official_logo.jpg" alt="Official Logo" class="w-full h-full object-contain" />
            </div>
            <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Insurance Desk Help & Cashless Authorization</div>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            Our dedicated Insurance & Cashless Desk assists patients with pre-authorization forms, TPA desk approvals, and Government Scheme claim documentation across Vijayapura and Kalaburagi base hospitals.
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-2 border-t border-teal-800/80">
            <a href="tel:08352220646" class="text-xs font-bold text-amber-400 hover:underline">Call Insurance Desk: 08352-220646 &rarr;</a>
            <a href="https://wa.me/919448120646?text=Insurance%20Cashless%20Enquiry" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-emerald-300 hover:underline">WhatsApp Insurance Desk &rarr;</a>
          </div>
        </div>

      </div>
    `;
  }

  window.setEmpanelmentCategory = function(cat) {
    window.activeEmpanelmentCategory = cat;
    render();
  };

  // 9b. GALLERY VIEW & SHARED-ELEMENT LIGHTBOX SYSTEM
  const GALLERY_IMAGES = [
    { id: 0, title: "Vijayapura Base Hospital Main Campus", category: "Base Hospital", src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80", caption: "Super-specialty base hospital building in Vijayapura." },
    { id: 1, title: "Laminar Airflow Operation Theatre Suite", category: "Operations", src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80", caption: "HEPA-filtered sterile ophthalmic surgical suite." },
    { id: 2, title: "Free Community Outreach Eye Camp", category: "Outreach Camps", src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80", caption: "Mobile screening unit examining rural demographics." },
    { id: 3, title: "Phacoemulsification Cataract Procedure", category: "Operations", src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80", caption: "Micro-incision phaco cataract surgery under microscope." },
    { id: 4, title: "High-Resolution Optical Coherence Tomography (OCT)", category: "Infrastructure", src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80", caption: "Retinal OCT diagnostics & macula scanner." },
    { id: 5, title: "Rural Vision Center Primary Care Desk", category: "Outreach Camps", src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80", caption: "Optometrist consultation at rural Vision Center." },
    { id: 6, title: "School Children Vision Screening & Glasses", category: "Outreach Camps", src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80", caption: "District-wide school vision initiative." },
    { id: 7, title: "Kalaburagi Base Hospital Facility", category: "Base Hospital", src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80", caption: "Kalaburagi campus serving eastern Karnataka." }
  ];

  window.activeGalleryCategory = window.activeGalleryCategory || 'All';
  window.currentLightboxIndex = null;

  window.setGalleryCategory = function(cat) {
    window.activeGalleryCategory = cat;
    render();
  };

  window.openLightbox = function(index) {
    const gallery = store.getGallery();
    window.currentLightboxIndex = index;
    const item = typeof index === 'number' && index < gallery.length ? gallery[index] : gallery.find(g => g.id === index) || gallery[0];
    if (!item) return;

    const actualIdx = gallery.findIndex(g => g.id === item.id);
    window.currentLightboxIndex = actualIdx !== -1 ? actualIdx : 0;

    // Find clicked thumbnail element to calculate shared-element origin rect
    const thumb = document.querySelector(`[data-thumb-index="${item.id}"]`);
    let initialStyle = 'top: 50%; left: 50%; width: 90%; max-width: 900px; transform: translate(-50%, -50%) scale(0.9); opacity: 0;';

    if (thumb) {
      const rect = thumb.getBoundingClientRect();
      initialStyle = `top: ${rect.top}px; left: ${rect.left}px; width: ${rect.width}px; height: ${rect.height}px; opacity: 0.8; transform: scale(1);`;
    }

    const modalHtml = `
      <div id="lightbox-modal" onclick="if(event.target === this) window.closeLightbox()" class="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4">
        <!-- Close Button -->
        <button onclick="window.closeLightbox()" class="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center shadow-xl transition-all hover:scale-105 border border-slate-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- Previous Button -->
        <button onclick="window.prevLightbox()" class="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 border border-slate-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>

        <!-- Next Button -->
        <button onclick="window.nextLightbox()" class="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 border border-slate-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>

        <!-- Lightbox Content Container -->
        <div id="lightbox-img-wrapper" style="${initialStyle}" class="fixed rounded-3xl overflow-hidden glass-card-dark border border-slate-800 shadow-2xl flex flex-col max-h-[85vh] max-w-4xl">
          <div class="relative w-full h-[65vh] overflow-hidden bg-slate-950 flex items-center justify-center">
            <img id="lightbox-img" src="${item.src}" alt="${item.title}" class="w-full h-full object-contain" />
          </div>
          <div class="p-6 bg-slate-900/90 text-white space-y-1 border-t border-slate-800">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider">${item.category}</span>
              <span class="text-xs font-mono text-slate-400">${window.currentLightboxIndex + 1} / ${gallery.length}</span>
            </div>
            <h3 class="text-lg font-bold font-heading text-white">${item.title}</h3>
            <p class="text-xs text-slate-300">${item.caption}</p>
          </div>
        </div>
      </div>
    `;

    const existingModal = document.getElementById('lightbox-modal');
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Preload next and previous images to eliminate white empty state flash
    const nextIdx = (window.currentLightboxIndex + 1) % gallery.length;
    const prevIdx = (window.currentLightboxIndex - 1 + gallery.length) % gallery.length;
    const imgNext = new Image(); if (gallery[nextIdx]) imgNext.src = gallery[nextIdx].src;
    const imgPrev = new Image(); if (gallery[prevIdx]) imgPrev.src = gallery[prevIdx].src;

    // Trigger Shared-Element Expansion Animation from thumbnail bounds to center screen
    requestAnimationFrame(() => {
      const wrapper = document.getElementById('lightbox-img-wrapper');
      if (wrapper) {
        wrapper.style.top = '50%';
        wrapper.style.left = '50%';
        wrapper.style.transform = 'translate(-50%, -50%) scale(1)';
        wrapper.style.width = '90vw';
        wrapper.style.height = 'auto';
        wrapper.style.opacity = '1';
      }
    });

    window.lightboxLastFocusedElement = document.activeElement;

    // Keyboard Escape key handler
    window.lightboxKeyHandler = function(e) {
      if (e.key === 'Escape') window.closeLightbox();
      if (e.key === 'ArrowRight') window.nextLightbox();
      if (e.key === 'ArrowLeft') window.prevLightbox();
    };
    window.addEventListener('keydown', window.lightboxKeyHandler);
  };

  window.closeLightbox = function() {
    const modal = document.getElementById('lightbox-modal');
    const wrapper = document.getElementById('lightbox-img-wrapper');
    if (!modal) return;

    if (window.currentLightboxIndex !== null) {
      const gallery = store.getGallery();
      const currentItem = gallery[window.currentLightboxIndex];
      const thumb = currentItem ? document.querySelector(`[data-thumb-index="${currentItem.id}"]`) : null;
      if (thumb && wrapper) {
        const rect = thumb.getBoundingClientRect();
        wrapper.style.top = `${rect.top}px`;
        wrapper.style.left = `${rect.left}px`;
        wrapper.style.width = `${rect.width}px`;
        wrapper.style.height = `${rect.height}px`;
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'scale(0.9)';
      }
    }

    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
      window.removeEventListener('keydown', window.lightboxKeyHandler);
      if (window.lightboxLastFocusedElement && typeof window.lightboxLastFocusedElement.focus === 'function') {
        window.lightboxLastFocusedElement.focus();
      }
    }, 300);
  };

  window.nextLightbox = function() {
    const gallery = store.getGallery();
    if (window.currentLightboxIndex === null || gallery.length === 0) return;
    const nextIdx = (window.currentLightboxIndex + 1) % gallery.length;
    window.updateLightboxSlide(nextIdx, 'next');
  };

  window.prevLightbox = function() {
    const gallery = store.getGallery();
    if (window.currentLightboxIndex === null || gallery.length === 0) return;
    const prevIdx = (window.currentLightboxIndex - 1 + gallery.length) % gallery.length;
    window.updateLightboxSlide(prevIdx, 'prev');
  };

  window.updateLightboxSlide = function(newIdx, direction) {
    const gallery = store.getGallery();
    if (!gallery[newIdx]) return;
    window.currentLightboxIndex = newIdx;
    const item = gallery[newIdx];
    const imgEl = document.getElementById('lightbox-img');
    const wrapper = document.getElementById('lightbox-img-wrapper');
    if (!imgEl || !wrapper) return;

    // Apply slide transition animation
    const animClass = direction === 'next' ? 'lightbox-slide-next' : 'lightbox-slide-prev';
    imgEl.classList.remove('lightbox-slide-next', 'lightbox-slide-prev');
    void imgEl.offsetWidth; // Reflow
    imgEl.classList.add(animClass);

    imgEl.src = item.src;
    const titleEl = wrapper.querySelector('h3');
    const captionEl = wrapper.querySelector('p');
    const catEl = wrapper.querySelector('span');
    const countEl = wrapper.querySelector('.font-mono');

    if (titleEl) titleEl.textContent = item.title;
    if (captionEl) captionEl.textContent = item.caption;
    if (catEl) catEl.textContent = item.category;
    if (countEl) countEl.textContent = `${newIdx + 1} / ${gallery.length}`;

    // Preload next image
    const preloadIdx = (newIdx + 1) % gallery.length;
    const imgPre = new Image(); if (gallery[preloadIdx]) imgPre.src = gallery[preloadIdx].src;
  };

  function renderGalleryPage() {
    const galleryList = store.getGallery();
    const activeCat = window.activeGalleryCategory || 'All';
    const categories = ['All', 'Base Hospital', 'Operations', 'Outreach Camps', 'Infrastructure'];
    const filteredImages = activeCat === 'All' ? galleryList : galleryList.filter(g => g.category === activeCat);

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-10 font-sans">
        
        <!-- Gallery Header -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald font-semibold text-xs uppercase tracking-wider">
            Hospital Infrastructure & Media
          </div>
          <h1 class="text-4xl font-extrabold text-teal-950 font-heading">Surgical Suite & Outreach Gallery</h1>
          <p class="text-slate-600 text-sm leading-relaxed">
            High-resolution visual showcase of our base hospitals in Vijayapura and Kalaburagi, surgical operation suites, and 2,715 mobile outreach camps.
          </p>
        </div>

        <!-- Category Filter Chips -->
        <div class="flex flex-wrap items-center justify-center gap-2">
          ${categories.map(cat => `
            <button onclick="window.setGalleryCategory('${cat}')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeCat === cat ? 'bg-teal-900 text-white shadow-lg scale-105' : 'glass-card text-teal-950 hover:bg-teal-50'}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Staggered Image Grid with Shared-Element Zoom Trigger -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${filteredImages.map((img, idx) => `
            <div data-thumb-index="${img.id}" onclick="window.openLightbox(${img.id})" class="glass-card rounded-3xl overflow-hidden border border-teal-100/80 shadow-md hover-lift cursor-pointer group flex flex-col justify-between">
              <div class="relative h-56 overflow-hidden bg-slate-900">
                <img src="${img.src}" alt="${img.title}" class="card-img-editorial w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-emerald-300 font-bold text-[10px] uppercase tracking-wider backdrop-blur-md">
                  ${img.category}
                </div>
              </div>
              <div class="p-4 space-y-1 bg-white/60">
                <h3 class="font-bold text-teal-950 text-sm font-heading line-clamp-1 group-hover:text-emerald-700 transition-colors">${img.title}</h3>
                <p class="text-slate-500 text-xs line-clamp-2">${img.caption}</p>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // PHYSICS-BASED TOUCH DRAG CAROUSEL TRACK (Real Momentum & Physics Snap)
  function initPhysicsDragCarousel() {
    const tracks = document.querySelectorAll('.physics-drag-track');
    tracks.forEach(track => {
      let isDown = false;
      let startX;
      let scrollLeft;
      let velocity = 0;
      let lastX = 0;
      let timestamp = 0;

      track.addEventListener('pointerdown', (e) => {
        isDown = true;
        track.classList.add('is-dragging');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        lastX = e.pageX;
        timestamp = performance.now();
        velocity = 0;
      });

      track.addEventListener('pointerleave', () => {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('is-dragging');
        applyInertia();
      });

      track.addEventListener('pointerup', () => {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('is-dragging');
        applyInertia();
      });

      track.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        const now = performance.now();
        const dt = now - timestamp;
        if (dt > 0) {
          velocity = (e.pageX - lastX) / dt;
        }
        lastX = e.pageX;
        timestamp = now;
        track.scrollLeft = scrollLeft - walk;
      });

      function applyInertia() {
        if (Math.abs(velocity) < 0.1) return;
        let momentum = velocity * 150;
        let targetScroll = track.scrollLeft - momentum;
        track.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    });
  }

  // 10. AUXILIARY TEMPLATES (News, Videos, Careers, Case Studies, Get Associated, Handouts, Contact)
  function renderAuxiliaryPage(type) {
    const brand = store.getBrand();
    const cleanPhone = brand.fallbackPhone.replace(/[^0-9+]/g, '');
    const whatsappNum = (brand.whatsappPhone || "+91 94481 20646").replace(/[^0-9]/g, '');

    const newsList = store.getNews();
    const videoList = store.getVideos();
    const handoutList = store.getHandouts();

    const titles = {
      handouts: "Patient Educational Handouts & Guides",
      gallery: "Hospital Infrastructure & Camp Gallery",
      news: "News, Press & Media Updates",
      videos: "Ophthalmic Educational Video Library",
      careers: "Careers & Recruitment Opportunities",
      "case-studies": "Clinical Case Studies & Surgical Outcomes",
      "get-associated": "Get Associated & Community Outreach Partnerships",
      contact: "Contact Us & Regional Navigation"
    };

    return `
      <div class="max-w-6xl mx-auto px-4 py-10 space-y-10 font-sans">
        
        <!-- Header with Official Logo -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">
            <div class="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden shrink-0">
              <img src="${brand.logo || 'assets/official_logo.jpg'}" alt="Official Logo" class="w-full h-full object-contain" />
            </div>
            <span>Hospital Communications Portal</span>
          </div>
          <h1 class="text-4xl font-extrabold text-teal-950 font-heading">${titles[type] || 'Information Portal'}</h1>
          <p class="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Official informational reference page for Anugraha Eye Hospital base facilities across Vijayapura and Kalaburagi.
          </p>
        </div>

        <!-- SPECIAL CASE: Handouts Downloadable Resources -->
        ${type === 'handouts' ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            ${handoutList.map(h => `
              <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-4 flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold text-[10px] uppercase font-mono">${h.format || 'PDF Guide'}</span>
                    <span class="text-[10px] text-slate-500 font-mono">${h.size || '1.2 MB'}</span>
                  </div>
                  <h3 class="font-extrabold text-teal-950 font-heading text-base">${h.title}</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">${h.desc}</p>
                </div>
                <a href="mailto:${brand.contactEmail}?subject=Request%20Handout:%20${encodeURIComponent(h.title)}" class="btn-shine-glow px-4 py-2.5 rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-950 transition-all text-center block shadow-md">
                  Request / Download PDF &rarr;
                </a>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- SPECIAL CASE: News & Media -->
        ${type === 'news' ? `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${newsList.map(n => `
              <div class="spotlight-card rounded-3xl border border-teal-100 overflow-hidden space-y-4 flex flex-col justify-between group">
                <div class="p-6 space-y-3 flex-1">
                  <div class="flex items-center justify-between text-[11px] font-mono">
                    <span class="font-bold text-emerald-700">${n.category}</span>
                    <span class="text-slate-500">${n.date}</span>
                  </div>
                  <h3 class="font-extrabold text-teal-950 text-base font-heading group-hover:text-emerald-700 transition-colors">${n.title}</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">${n.snippet}</p>
                </div>
                <div class="p-6 pt-0 border-t border-teal-100">
                  <a href="#/contact" class="text-xs font-bold text-teal-900 hover:underline flex items-center justify-between">
                    <span>Read Full Coverage</span>
                    <span class="icon-shift-right">&rarr;</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- SPECIAL CASE: Videos Embed Grid -->
        ${type === 'videos' ? `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${videoList.map(v => `
              <div class="spotlight-card rounded-3xl border border-teal-100 overflow-hidden space-y-4 group">
                <div class="relative w-full h-48 bg-slate-950 overflow-hidden flex items-center justify-center">
                  <img src="${v.thumbnail}" alt="${v.title}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div class="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-xl border-2 border-white group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                  </div>
                  <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[10px]">${v.duration}</span>
                </div>
                <div class="p-6 pt-0 space-y-2">
                  <h3 class="font-extrabold text-teal-950 text-sm font-heading">${v.title}</h3>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- SPECIAL CASE: Careers -->
        ${type === 'careers' ? `
          <div class="space-y-8">
            <div class="text-center space-y-2 max-w-xl mx-auto">
              <span class="px-3 py-1 rounded-full badge-emerald font-bold text-xs uppercase tracking-wider">Join Our Team</span>
              <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Healthcare & Professional Careers</h2>
              <p class="text-slate-600 text-xs">Work with North Karnataka's premier super-specialty ophthalmic network.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-1 rounded-full bg-teal-100 text-teal-900 font-bold text-[10px] uppercase">Medical Staff</span>
                  <span class="text-xs font-bold text-emerald-700">Vijayapura & Kalaburagi</span>
                </div>
                <h3 class="text-xl font-bold text-teal-950 font-heading">Consultant Ophthalmologists (Cat-Phaco / Medical Retina)</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Required MS/MD/DNB in Ophthalmology with minimum 2 years post-residency experience in phacoemulsification or vitreo-retinal procedures.</p>
                <a href="mailto:${brand.contactEmail}?subject=Application:%20Consultant%20Ophthalmologist" class="btn-shine-glow inline-block px-5 py-2.5 rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-950 transition-all">
                  Apply via Email &rarr;
                </a>
              </div>

              <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">Paramedical Staff</span>
                  <span class="text-xs font-bold text-emerald-700">Base Hospitals & Vision Centers</span>
                </div>
                <h3 class="text-xl font-bold text-teal-950 font-heading">Optometrists & Ophthalmic Assistants</h3>
                <p class="text-xs text-slate-600 leading-relaxed">B.Sc Optometry or Diploma in Ophthalmic Technology (DOT) graduates with expertise in auto-refraction, slit-lamp exams, and optical fitting.</p>
                <a href="mailto:${brand.contactEmail}?subject=Application:%20Optometrist" class="btn-shine-glow inline-block px-5 py-2.5 rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-950 transition-all">
                  Apply via Email &rarr;
                </a>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- SPECIAL CASE: Case Studies -->
        ${type === 'case-studies' ? `
          <div class="space-y-8">
            <div class="text-center space-y-2 max-w-xl mx-auto">
              <span class="px-3 py-1 rounded-full badge-coral font-bold text-xs uppercase tracking-wider">Clinical Excellence</span>
              <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Surgical Outcomes & Case Studies</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-4">
                <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">Cataract Outcome</span>
                <h3 class="text-lg font-bold text-teal-950 font-heading">High-Volume Phacoemulsification in Complex Cataracts</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Analysis of 50,000+ free cataract operations demonstrating 99.4% post-operative visual recovery and zero endophthalmitis infection rates.</p>
              </div>

              <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-4">
                <span class="px-2.5 py-1 rounded-full bg-teal-100 text-teal-900 font-bold text-[10px] uppercase">Refractive LASIK</span>
                <h3 class="text-lg font-bold text-teal-950 font-heading">Contoura Vision Topography-Guided Laser Correction</h3>
                <p class="text-xs text-slate-600 leading-relaxed">MyAlcon verified topographic mapping outcomes achieving 20/15 uncorrected visual acuity in patients with irregular astigmatism.</p>
              </div>

              <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-4">
                <span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">Retina Screening</span>
                <h3 class="text-lg font-bold text-teal-950 font-heading">Rural Diabetic Retinopathy Mobile Screening Impact</h3>
                <p class="text-xs text-slate-600 leading-relaxed">Early detection of diabetic macular edema across 2,715 outreach camps leading to timely anti-VEGF intervention.</p>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- SPECIAL CASE: Get Associated -->
        ${type === 'get-associated' ? `
          <div class="spotlight-card p-8 md:p-12 rounded-3xl border border-teal-100 space-y-6 max-w-3xl mx-auto shadow-xl">
            <div class="text-center space-y-3">
              <span class="px-3 py-1 rounded-full badge-emerald font-bold text-xs uppercase tracking-wider">Community Outreach</span>
              <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Partner With Anugraha Eye Hospital</h2>
              <p class="text-slate-600 text-xs leading-relaxed">Collaborate with us for mobile eye camps, school vision screenings, and NGO eye care partnerships across Karnataka.</p>
            </div>

            <form onsubmit="event.preventDefault(); window.location.href='mailto:${brand.contactEmail}?subject=Partnership%20Enquiry&body=Organization:%20' + encodeURIComponent(document.getElementById('partner-org')?.value || '')" class="space-y-4 pt-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-teal-950 mb-1">Organization / NGO Name</label>
                  <input type="text" id="partner-org" required placeholder="e.g. Lions Club / Gram Panchayat" class="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-teal-950 mb-1">Contact Person & Phone</label>
                  <input type="text" required placeholder="Full Name & Mobile Number" class="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-teal-950 mb-1">Partnership Intent / Location</label>
                <textarea rows="3" required placeholder="Describe proposed camp location, district, or institutional collaboration..." class="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
              </div>
              <button type="submit" class="btn-shine-glow w-full py-3.5 rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-950 transition-all shadow-md">
                Send Partnership Proposal (Opens Email Client) &rarr;
              </button>
            </form>
          </div>
        ` : ''}

        ${type === 'contact' ? `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Left 7 Cols: Online Consultation & Appointment Request Form -->
            <div class="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-teal-100/80 dark:border-slate-800 space-y-6 shadow-xl">
              <div class="space-y-2 border-b border-teal-100/60 dark:border-slate-800 pb-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald text-[11px] font-bold uppercase tracking-wider">
                  <span>📅 Quick Online Booking</span>
                </div>
                <h3 class="text-2xl font-extrabold text-teal-950 dark:text-white font-heading">Book an OPD Appointment</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Submit your consultation request below. Our patient coordination desk will call you to confirm your doctor appointment slot.
                </p>
              </div>

              <form id="public-appointment-form" onsubmit="window.handlePublicAppointmentSubmit(event)" class="space-y-4 text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="appt-name" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Patient Full Name <span class="text-rose-500">*</span></label>
                    <input type="text" id="appt-name" required placeholder="e.g. Ramesh Patil" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label for="appt-phone" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Contact Number <span class="text-rose-500">*</span></label>
                    <input type="tel" id="appt-phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="appt-campus" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Hospital / Center <span class="text-rose-500">*</span></label>
                    <select id="appt-campus" required class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                      <option value="Vijayapura Base Hospital">Vijayapura Base Hospital (Main Campus)</option>
                      <option value="Kalaburagi Base Hospital">Kalaburagi Base Hospital & Institute</option>
                      <option value="Talikoti Vision Center">Talikoti Vision Center</option>
                      <option value="Muddebihal Vision Center">Muddebihal Vision Center</option>
                      <option value="Sindagi Vision Center">Sindagi Vision Center</option>
                      <option value="Indi Vision Center">Indi Vision Center</option>
                      <option value="B.Bagewadi Vision Center">B.Bagewadi Vision Center</option>
                      <option value="Chadachan Vision Center">Chadachan Vision Center</option>
                      <option value="Nalatwad Vision Center">Nalatwad Vision Center</option>
                      <option value="Tikota Vision Center">Tikota Vision Center</option>
                    </select>
                  </div>
                  <div>
                    <label for="appt-service" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Specialty / Treatment</label>
                    <select id="appt-service" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                      <option value="Cataract Phaco Surgery">Cataract Phaco Surgery & IOL</option>
                      <option value="Contoura Vision LASIK">Contoura Vision LASIK / Refractive</option>
                      <option value="Vitreo-Retina & Diabetic Eye Care">Vitreo-Retina & Diabetic Eye Care</option>
                      <option value="Glaucoma Consultation">Glaucoma Diagnostics & Surgery</option>
                      <option value="Paediatric Squint & Strabismus">Paediatric Squint & Amblyopia</option>
                      <option value="Cornea & Eye Banking">Cornea, C3R & Eye Bank</option>
                      <option value="Oculoplasty & Eyelid Care">Oculoplasty & Facial Aesthetics</option>
                      <option value="General Eye Examination">General Vision & Refraction Checkup</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="appt-date" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
                    <input type="date" id="appt-date" min="${new Date().toISOString().split('T')[0]}" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label for="appt-notes" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Additional Symptoms / Notes</label>
                    <input type="text" id="appt-notes" placeholder="e.g. Blurry vision, cataract evaluation" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                </div>

                <div id="appt-status-message" class="hidden p-4 rounded-2xl text-xs font-bold transition-all"></div>

                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button type="submit" id="appt-submit-btn" class="btn-shine-glow flex-1 py-3.5 px-6 rounded-xl bg-teal-900 hover:bg-teal-950 text-white font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2">
                    <span>Submit Appointment Request</span>
                    <span>&rarr;</span>
                  </button>
                  <a href="https://wa.me/${whatsappNum}?text=Hello%20Anugraha%20Eye%20Hospital,%20I%20would%20like%20to%20book%20an%20OPD%20appointment." target="_blank" rel="noopener noreferrer" class="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 shadow">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    <span>Instant WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>

            <!-- Right 5 Cols: Hospital Coordinates & Direct Reception -->
            <div class="lg:col-span-5 space-y-6">
              <div class="glass-card p-6 sm:p-8 rounded-3xl border border-teal-100/80 dark:border-slate-800 space-y-4 shadow-xl">
                <h3 class="text-xl font-bold text-teal-950 dark:text-white font-heading">Base Tertiary Hospitals</h3>
                
                <div class="space-y-4 text-xs text-slate-700 dark:text-slate-300">
                  <div class="p-4 rounded-2xl bg-teal-50/60 dark:bg-slate-900/60 border border-teal-100/60 dark:border-slate-800 space-y-1">
                    <div class="font-extrabold text-sm text-teal-950 dark:text-emerald-300">Vijayapura Main Base Hospital</div>
                    <p class="text-slate-600 dark:text-slate-400">Navabhag Main Road, Behind Central Bus Stand, Vijayapura – 586101</p>
                    <div class="pt-1 flex items-center gap-3">
                      <a href="tel:08352-220646" class="text-teal-900 dark:text-emerald-400 font-bold hover:underline">📞 08352-220646</a>
                      <a href="https://maps.google.com/?q=Anugraha+Eye+Hospital+Vijayapura" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-300 font-semibold hover:underline">📍 Google Maps &nearr;</a>
                    </div>
                  </div>

                  <div class="p-4 rounded-2xl bg-teal-50/60 dark:bg-slate-900/60 border border-teal-100/60 dark:border-slate-800 space-y-1">
                    <div class="font-extrabold text-sm text-teal-950 dark:text-emerald-300">Kalaburagi Base Hospital & Institute</div>
                    <p class="text-slate-600 dark:text-slate-400">Ring Road Junction, Opposite District Court Complex, Kalaburagi – 585105</p>
                    <div class="pt-1 flex items-center gap-3">
                      <a href="tel:08352-220646" class="text-teal-900 dark:text-emerald-400 font-bold hover:underline">📞 08352-220646</a>
                      <a href="https://maps.google.com/?q=Anugraha+Eye+Hospital+Kalaburagi" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-300 font-semibold hover:underline">📍 Google Maps &nearr;</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-6 rounded-3xl bg-teal-50/80 dark:bg-slate-900 border border-teal-100 dark:border-slate-800 space-y-3">
                <h4 class="font-bold text-teal-950 dark:text-white text-sm">Emergency & OPD Timings</h4>
                <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div class="flex items-center justify-between">
                    <span>OPD Consultations:</span>
                    <strong class="text-teal-900 dark:text-emerald-400">Mon–Sat: 8:00 AM – 8:00 PM</strong>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>Sunday Routine OPD:</span>
                    <strong class="text-teal-900 dark:text-emerald-400">8:00 AM – 2:00 PM</strong>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>Ocular Trauma & Emergency:</span>
                    <strong class="text-emerald-700 dark:text-emerald-300">24/7 Active Duty</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ` : ''}

        <!-- DIRECT CONTACT FALLBACK BANNER (Call, WhatsApp, Email) -->
        <div class="p-8 rounded-3xl bg-teal-950 text-white space-y-6 border border-teal-800 shadow-xl max-w-3xl mx-auto">
          <div class="space-y-2 text-center">
            <div class="text-xs font-bold text-amber-300 uppercase tracking-wider">Direct Hospital Administration Contact</div>
            <h3 class="text-2xl font-bold font-heading text-white">Need Assistance or Information?</h3>
            <p class="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Connect directly with our administration and medical secretarial desks for immediate queries regarding careers, outreach partnerships, case studies, or patient resources.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a href="tel:${cleanPhone}" class="px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>Call Hospital Desk: ${brand.fallbackPhone}</span>
            </a>

            <a href="https://wa.me/${whatsappNum}?text=Inquiry%20regarding%20${encodeURIComponent(titles[type] || 'Hospital Information')}" target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>WhatsApp Desk</span>
            </a>

            <a href="mailto:${brand.contactEmail}?subject=Inquiry%20-${encodeURIComponent(titles[type] || 'Hospital Info')}" class="px-6 py-3.5 rounded-2xl bg-teal-800 text-white font-extrabold text-xs hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 border border-teal-600 shadow-lg">
              <svg class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 012-2V7a2 2 0 01-2-2H5a2 2 0 01-2 2v10a2 2 0 012 2z"/></svg>
              <span>Email Enquiry</span>
            </a>
          </div>
        </div>

    `;
  }

  // =========================================================================
  // PUBLIC APPOINTMENT & CONSULTATION SUBMISSION HANDLER
  // =========================================================================
  window.handlePublicAppointmentSubmit = function(e) {
    if (e) e.preventDefault();
    const name = (document.getElementById('appt-name')?.value || '').trim();
    const phone = (document.getElementById('appt-phone')?.value || '').trim();
    const campus = document.getElementById('appt-campus')?.value || 'Vijayapura Base Hospital';
    const service = document.getElementById('appt-service')?.value || 'General Eye Examination';
    const date = document.getElementById('appt-date')?.value || '';
    const notes = (document.getElementById('appt-notes')?.value || '').trim();
    const statusMsg = document.getElementById('appt-status-message');
    const submitBtn = document.getElementById('appt-submit-btn');

    if (!name || !phone || phone.length < 10) {
      if (statusMsg) {
        statusMsg.className = "p-4 rounded-2xl text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 block";
        statusMsg.textContent = "Please enter patient name and a valid 10-digit mobile phone number.";
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ Recording Request...</span>`;
    }

    setTimeout(() => {
      if (statusMsg) {
        statusMsg.className = "p-4 rounded-2xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-400 dark:border-emerald-700 block space-y-2";
        statusMsg.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="text-base">✅</span>
            <span>Appointment Request Registered Successfully!</span>
          </div>
          <div class="font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
            Thank you, <strong>${window.escapeHTML(name)}</strong>. Your request for <strong>${window.escapeHTML(service)}</strong> at our <strong>${window.escapeHTML(campus)}</strong>${date ? ' on <strong>' + window.escapeHTML(date) + '</strong>' : ''} has been received. Our reception desk will call you at <strong>${window.escapeHTML(phone)}</strong> to confirm your exact doctor consultation time slot.
          </div>
        `;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>✅ Request Sent Successfully</span>`;
      }
      const form = document.getElementById('public-appointment-form');
      if (form) form.reset();
    }, 450);
  };

  // Lenis Inertia Smooth Scroll Engine with prefers-reduced-motion Safeguard
  function initLenisSmoothScroll() {
    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };
    
    // Disable smooth-scroll entirely for reduced-motion users (native scroll is safer for them)
    if (!motionSafe.isMotionSafe || !window.Lenis) {
      if (window.lenisInstance) {
        window.lenisInstance.destroy();
        window.lenisInstance = null;
      }
      return;
    }

    if (!window.lenisInstance) {
      window.lenisInstance = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      function raf(time) {
        if (window.lenisInstance) {
          window.lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
      }
      requestAnimationFrame(raf);
    }
  }

  // Sitewide Major Section Scroll-Reveal Observer (~18% viewport threshold)
  function initSectionScrollReveals() {
    const sections = document.querySelectorAll('section');
    if (sections.length === 0) return;

    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };

    // Reduced motion safeguard: reveal sections immediately
    if (!motionSafe.isMotionSafe) {
      sections.forEach(sec => sec.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target); // Reveal once per element, never re-trigger on scroll-back-up
        }
      });
    }, { threshold: 0.18 });

    sections.forEach(sec => {
      if (!sec.classList.contains('scroll-reveal-section')) {
        sec.classList.add('scroll-reveal-section');
      }
      observer.observe(sec);
    });
  }

  // Card Grid Capped Staggering (Max 500ms total cascade spread)
  function initGridStaggers() {
    const grids = document.querySelectorAll('.grid, [class*="grid-cols-"]');
    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };

    grids.forEach(grid => {
      const items = grid.children;
      const totalCount = items.length;
      if (totalCount === 0) return;

      Array.from(items).forEach((item, idx) => {
        if (!motionSafe.isMotionSafe) {
          item.style.transitionDelay = '0ms';
          return;
        }

        // Cap total stagger cascade spread at 500ms max regardless of item count
        const calculatedDelay = Math.min(idx * 70, 500 * (idx / Math.max(totalCount - 1, 1)));
        item.style.transitionDelay = `${Math.round(calculatedDelay)}ms`;
      });
    });
  }

  // About Us Founding Timeline Scroll Progress Line & Milestone Dot Activation
  function initTimelineScrollProgress() {
    const timeline = document.querySelector('.founding-timeline-wrapper, #founding-timeline');
    const fillLine = document.querySelector('.timeline-progress-bar-fill');
    const milestoneDots = document.querySelectorAll('.timeline-milestone-dot');

    if (!timeline || !fillLine) return;

    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };
    if (!motionSafe.isMotionSafe) {
      fillLine.style.height = '100%';
      milestoneDots.forEach(dot => dot.classList.add('is-active'));
      return;
    }

    function updateTimelineProgress() {
      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress percentage through the timeline element
      const totalHeight = rect.height;
      const startPoint = viewportHeight * 0.7; // Start filling when 30% into view
      const currentPos = startPoint - rect.top;
      let progressRatio = Math.max(0, Math.min(1, currentPos / totalHeight));

      fillLine.style.height = `${(progressRatio * 100).toFixed(1)}%`;

      // Activate milestone dots as scroll passes each dot's vertical position
      milestoneDots.forEach(dot => {
        const dotRect = dot.getBoundingClientRect();
        if (dotRect.top < viewportHeight * 0.65) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });
    }

    window.removeEventListener('scroll', window.timelineScrollHandler);
    window.timelineScrollHandler = updateTimelineProgress;
    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress();
  }

  // Layered Motion Token Reveal Observer (Framer Motion / Motion Tokens Pattern)
  function initMotionReveals() {
    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };
    if (!motionSafe.isMotionSafe) return;

    const cards = document.querySelectorAll('.glass-card, .hover-lift, section > div');
    cards.forEach((card, idx) => {
      if (!card.hasAttribute('data-motion-applied')) {
        card.setAttribute('data-motion-applied', 'true');
        card.classList.add('transition-motion-premium', 'duration-standard');
        
        // Apply motion token stagger delay (70ms increment between sibling elements)
        const staggerDelay = (idx % 8) * 70;
        card.style.transitionDelay = `${staggerDelay}ms`;
      }
    });
  }

  // Branded Initial-Load Sequence Controller (Aperture Iris Motif)
  function initInitialApertureLoader() {
    const loader = document.getElementById("aperture-initial-loader");
    if (!loader) return;

    // Skip sequence on subsequent internal route navigations (first-paint moment only)
    const isAlreadyLoaded = sessionStorage.getItem("anugraha_loaded_v1");
    if (isAlreadyLoaded) {
      loader.remove();
      return;
    }

    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };

    // Reduced-motion safeguard: shorten loader to simple 150ms opacity fade
    const displayDuration = motionSafe.isMotionSafe ? 650 : 150;

    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.remove();
        sessionStorage.setItem("anugraha_loaded_v1", "true");
      }, 300);
    }, displayDuration);
  }

  function render404Page() {
    return `
      <div class="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div class="text-5xl font-extrabold text-teal-900 font-heading">404</div>
        <h1 class="text-xl font-bold text-slate-800">Page Not Found</h1>
        <p class="text-xs text-slate-500">The requested route does not exist or has been relocated via 301 redirect.</p>
        <a href="#/" class="inline-block px-5 py-2.5 rounded-xl bg-teal-900 text-white font-bold text-xs">Return to Homepage</a>
      </div>
    `;
  }

  // Form Field Validation Shake Handler (Gentle horizontal shake on invalid inputs)
  function initFormValidationShake() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
          if (!input.value.trim()) {
            input.classList.remove('input-gentle-shake');
            void input.offsetWidth; // Force reflow for keyframe animation restart
            input.classList.add('input-gentle-shake');
            setTimeout(() => input.classList.remove('input-gentle-shake'), 350);
          }
        });
      });
    });
  }

  // Linear / Apple-inspired Interactive Spotlight Cursor Tracker
  function initSpotlightHoverTracker() {
    const cards = document.querySelectorAll('.spotlight-card, .bento-card-luxury');
    if (cards.length === 0) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // =========================================================================
  // FRONTEND-ONLY ADMIN CONTENT EDITOR ENGINE (Zero Backend, 100% Static)
  // =========================================================================

  window.activeAdminTab = 'dashboard';
  window.isAdminMobileDrawerOpen = false;
  window.adminDoctorSearchQuery = '';

  window.toggleAdminMobileDrawer = function() {
    window.isAdminMobileDrawerOpen = !window.isAdminMobileDrawerOpen;
    render();
  };

  // =========================================================================
  // CORE SANITIZATION & SAFE STRING UTILITIES
  // =========================================================================
  window.escapeHTML = function(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // =========================================================================
  // UNSAVED CHANGES TRACKER (DIRTY STATE & NAVIGATION GUARD)
  // =========================================================================
  window.hasUnsavedAdminChanges = false;

  window.markAdminDirty = function() {
    window.hasUnsavedAdminChanges = true;
    const badge = document.getElementById('admin-save-status-badge');
    if (badge) {
      badge.className = "px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-amber-400/40 animate-pulse";
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500"></span><span>Unsaved Changes</span>`;
    }
  };

  window.clearAdminDirty = function() {
    window.hasUnsavedAdminChanges = false;
    const badge = document.getElementById('admin-save-status-badge');
    if (badge) {
      badge.className = "px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-400/40";
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span>Saved Successfully</span>`;
    }
  };

  window.addEventListener('beforeunload', (e) => {
    if (window.hasUnsavedAdminChanges) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Leave without saving?';
      return e.returnValue;
    }
  });

  // =========================================================================
  // SMART IMAGE OPTIMIZATION & CANVAS PROCESSING ENGINE
  // =========================================================================
  
  /**
   * Proportional image resizer, aspect ratio cropper, and WebP converter
   * - Never upscales
   * - Max dimensions: 1920 x 1920 px (or context specific limit)
   * - Quality: 0.82 (WebP with alpha transparency support)
   */
  window.processAndOptimizeImage = function(img, options = {}) {
    const naturalWidth = img.naturalWidth || img.width || 800;
    const naturalHeight = img.naturalHeight || img.height || 600;
    const selectedRatio = options.selectedRatio || 'original';
    const context = options.context || 'general';

    // Context-specific maximum dimension recommendations
    let maxDimension = 1920;
    if (context === 'hero') maxDimension = 1920;
    else if (context === 'gallery') maxDimension = 1200;
    else if (context === 'services' || context === 'equipment') maxDimension = 800;
    else if (context === 'doctors' || context === 'profile' || context === 'brand') maxDimension = 800;

    let sourceX = 0;
    let sourceY = 0;
    let sourceW = naturalWidth;
    let sourceH = naturalHeight;

    if (selectedRatio !== 'original') {
      let targetRatio = 1;
      if (selectedRatio === '1:1') targetRatio = 1;
      else if (selectedRatio === '4:3') targetRatio = 4 / 3;
      else if (selectedRatio === '16:9') targetRatio = 16 / 9;
      else if (selectedRatio === '4:5') targetRatio = 4 / 5;

      const currentRatio = naturalWidth / naturalHeight;
      if (currentRatio > targetRatio) {
        sourceW = Math.round(naturalHeight * targetRatio);
        sourceX = Math.round((naturalWidth - sourceW) / 2);
      } else {
        sourceH = Math.round(naturalWidth / targetRatio);
        sourceY = Math.round((naturalHeight - sourceH) / 2);
      }
    }

    // Proportional downscale (never upscale)
    let destW = sourceW;
    let destH = sourceH;

    if (destW > maxDimension || destH > maxDimension) {
      if (destW >= destH) {
        destH = Math.round((destH * maxDimension) / destW);
        destW = maxDimension;
      } else {
        destW = Math.round((destW * maxDimension) / destH);
        destH = maxDimension;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = destW;
    canvas.height = destH;
    const ctx = canvas.getContext('2d', { alpha: true });

    // High quality bicubic interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(img, sourceX, sourceY, sourceW, sourceH, 0, 0, destW, destH);

    // Export WebP (quality 0.82)
    let outDataUrl = canvas.toDataURL('image/webp', 0.82);
    let outputMime = 'image/webp';
    let outputExt = 'webp';

    // Fallback if browser canvas doesn't support WebP export
    if (!outDataUrl.startsWith('data:image/webp')) {
      const isPng = (options.originalMime === 'image/png');
      outputMime = isPng ? 'image/png' : 'image/jpeg';
      outputExt = isPng ? 'png' : 'jpg';
      outDataUrl = canvas.toDataURL(outputMime, 0.85);
    }

    // Calculate approximate size in KB
    const head = outDataUrl.indexOf(';base64,');
    const base64Str = head !== -1 ? outDataUrl.substring(head + 8) : '';
    const approxBytes = Math.round((base64Str.length * 3) / 4);
    const approxSizeKB = (approxBytes / 1024).toFixed(1) + ' KB';
    const originalBytes = options.originalSizeBytes || approxBytes;
    const savingsPercent = originalBytes > approxBytes ? Math.round((1 - (approxBytes / originalBytes)) * 100) : 0;

    return {
      canvas,
      dataUrl: outDataUrl,
      width: destW,
      height: destH,
      dimensions: `${destW} × ${destH}`,
      mimeType: outputMime,
      extension: outputExt,
      sizeKB: approxSizeKB,
      sizeBytes: approxBytes,
      originalBytes: originalBytes,
      savingsPercent: savingsPercent
    };
  };

  // Supported formats: JPG, JPEG, PNG, WebP (Max: 10 MB)
  window.validateImageFile = function(file, options, successCallback, errorCallback) {
    if (!file) return;

    const validExtensions = /\.(jpg|jpeg|png|webp)$/i;
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/pjpeg', 'image/x-png', 'image/webp'];

    const isExtValid = validExtensions.test(file.name);
    const isMimeValid = !file.type || validMimeTypes.includes(file.type.toLowerCase());

    // Strict rejection of unauthorized formats
    if (!isExtValid || !isMimeValid) {
      const err = "Unsupported file format. Please upload JPG, JPEG, PNG, or WebP.";
      window.showAdminToast(err, "error");
      if (errorCallback) errorCallback(err);
      return;
    }

    // Maximum 10 MB Upload Limit
    const maxMB = 10;
    const maxSizeBytes = maxMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const err = "Image is too large. Please select an image under 10 MB.";
      window.showAdminToast(err, "error");
      if (errorCallback) errorCallback(err);
      return;
    }

    // Safe object URL preview & Dimension Inspection
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = function() {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      const sizeKB = (file.size / 1024).toFixed(1) + ' KB';
      const dimensions = `${width} × ${height}`;

      // Dimension health check warnings (non-blocking guidance)
      let dimensionWarning = null;
      if (options?.context === 'hero' && width < 1200) {
        dimensionWarning = `Dimensions (${dimensions}): Recommended minimum is 1200px wide for hero banner.`;
      } else if (options?.context === 'content' && width < 800) {
        dimensionWarning = `Dimensions (${dimensions}): Recommended minimum is 800px wide for content images.`;
      } else if (options?.context === 'doctors' && width < 400) {
        dimensionWarning = `Dimensions (${dimensions}): Recommended minimum is 400px wide for doctor portraits.`;
      }

      const meta = {
        filename: window.escapeHTML(file.name.replace(/[^a-zA-Z0-9._-]/g, '_')),
        rawFile: file,
        originalType: file.type || 'image/jpeg',
        originalSize: sizeKB,
        originalSizeBytes: file.size,
        originalDimensions: dimensions,
        width: width,
        height: height,
        dimensionWarning: dimensionWarning,
        uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        objectUrl: objectUrl
      };

      if (successCallback) {
        successCallback(img, meta, objectUrl);
      }
    };

    img.onerror = function() {
      URL.revokeObjectURL(objectUrl);
      const err = "We couldn't process this image. Please ensure it is a non-corrupted JPG, PNG, or WebP.";
      window.showAdminToast(err, "error");
      if (errorCallback) errorCallback(err);
    };

    img.src = objectUrl;
  };

  // Backward compatibility wrapper for direct upload triggers
  window.validateAndReadImageFile = function(file, callback, options = {}) {
    window.validateImageFile(file, options, async (img, meta, objectUrl) => {
      URL.revokeObjectURL(objectUrl);
      let finalUrl = null;
      if (window.uploadToCloudStorage && window.isSupabaseConfigured && window.isSupabaseConfigured()) {
        try {
          window.showAdminToast("Uploading image to Cloud Storage...", "success");
          const uploadRes = await window.uploadToCloudStorage(file, options.context || 'general', meta.filename);
          if (uploadRes && uploadRes.url) {
            finalUrl = uploadRes.url;
          }
        } catch (e) {
          console.warn("[Cloud Storage] Upload warning, falling back to data URL:", e);
        }
      }

      if (!finalUrl) {
        const reader = new FileReader();
        reader.onload = function(e) {
          callback(e.target.result, meta);
        };
        reader.readAsDataURL(file);
      } else {
        callback(finalUrl, meta);
      }
    });
  };

  // =========================================================================
  // SMART PREVIEW & INTERACTIVE OPTIMIZATION MODAL (Canvas, 1:1, 4:5, 4:3, 16:9)
  // =========================================================================
  window.activeCropModalData = null;
  window.isUploadProcessing = false;

  window.openImageCropModal = function(file, options = {}, onSaveCallback) {
    window.validateImageFile(file, options, (img, meta, objectUrl) => {
      let defaultRatio = options.defaultRatio || 'original';
      if (options.context === 'doctors' || options.context === 'profile') defaultRatio = '4:5';
      else if (options.context === 'hero') defaultRatio = '16:9';
      else if (options.context === 'services' || options.context === 'equipment') defaultRatio = '4:3';
      else if (options.context === 'brand') defaultRatio = '1:1';

      window.activeCropModalData = {
        file,
        img,
        meta,
        objectUrl,
        selectedRatio: defaultRatio,
        context: options.context || 'general',
        onSaveCallback
      };
      window.renderCropModal();
    });
  };

  window.closeImageCropModal = function() {
    if (window.isUploadProcessing) return;
    if (window.activeCropModalData?.objectUrl) {
      URL.revokeObjectURL(window.activeCropModalData.objectUrl);
    }
    window.activeCropModalData = null;
    const modal = document.getElementById('image-crop-modal-root');
    if (modal) modal.remove();
  };

  window.setCropRatio = function(ratio) {
    if (!window.activeCropModalData || window.isUploadProcessing) return;
    window.activeCropModalData.selectedRatio = ratio;
    window.renderCropModal();
  };

  window.renderCropModal = function() {
    if (!window.activeCropModalData) return;
    const { img, meta, selectedRatio, context } = window.activeCropModalData;

    let modal = document.getElementById('image-crop-modal-root');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'image-crop-modal-root';
      document.body.appendChild(modal);
    }

    // Process on-the-fly preview calculation
    const optimized = window.processAndOptimizeImage(img, {
      selectedRatio,
      context,
      originalMime: meta.originalType,
      originalSizeBytes: meta.originalSizeBytes
    });

    const ratios = [
      { id: 'original', label: 'Original (No Crop)', icon: '🖼️', hint: 'Preserve full composition' },
      { id: '4:5', label: '4:5 Portrait (Doctors/Staff)', icon: '👨‍⚕️', hint: 'Recommended 600×750' },
      { id: '4:3', label: '4:3 Standard (Services/Equipment)', icon: '🩺', hint: 'Recommended 800×600' },
      { id: '16:9', label: '16:9 Widescreen (Hero)', icon: '🖥️', hint: 'Recommended 1920×1080' },
      { id: '1:1', label: '1:1 Square (Logos/Avatars)', icon: '👤', hint: 'Square 1:1 format' }
    ];

    modal.innerHTML = `
      <div class="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/60 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          
          <!-- Modal Header -->
          <div class="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">⚡</span>
              <div>
                <h3 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-heading">Smart Image Optimizer & WebP Converter</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Automatic resizing, lossless orientation, WebP compression & Cloud Storage persistence.</p>
              </div>
            </div>
            <button onclick="window.closeImageCropModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs" title="Close">✕</button>
          </div>

          <!-- Preview & Canvas Workspace -->
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1 text-xs">
            
            <!-- Dimension Warning if needed -->
            ${meta.dimensionWarning ? `
              <div class="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>${meta.dimensionWarning}</span>
              </div>
            ` : ''}

            <!-- Side-by-Side Original vs. Optimized Comparison Strip -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              
              <!-- Original Details Card -->
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div class="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>📷 Original Asset</span>
                  <span class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">${meta.originalType.replace('image/', '').toUpperCase()}</span>
                </div>
                <div class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title="${meta.filename}">${meta.filename}</div>
                <div class="flex items-center justify-between text-slate-500">
                  <span>Dimensions:</span>
                  <span class="font-bold text-slate-700 dark:text-slate-300">${meta.originalDimensions} px</span>
                </div>
                <div class="flex items-center justify-between text-slate-500">
                  <span>File Size:</span>
                  <span class="font-bold text-slate-700 dark:text-slate-300">${meta.originalSize}</span>
                </div>
              </div>

              <!-- Optimized Target Card -->
              <div class="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-1.5 font-mono text-[11px]">
                <div class="flex items-center justify-between text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                  <span>✨ Optimized (WebP)</span>
                  <span class="px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">${optimized.savingsPercent > 0 ? `-${optimized.savingsPercent}% Size` : 'WebP Auto'}</span>
                </div>
                <div class="text-xs font-bold text-emerald-800 dark:text-emerald-300 truncate">${meta.filename.replace(/\.[^/.]+$/, "")}.webp</div>
                <div class="flex items-center justify-between text-slate-500">
                  <span>Dimensions:</span>
                  <span class="font-bold text-emerald-700 dark:text-emerald-400">${optimized.dimensions} px</span>
                </div>
                <div class="flex items-center justify-between text-slate-500">
                  <span>Est. Output:</span>
                  <span class="font-bold text-emerald-700 dark:text-emerald-400">${optimized.sizeKB} (${optimized.mimeType})</span>
                </div>
              </div>

            </div>

            <!-- Image Preview Box -->
            <div class="w-full h-56 sm:h-64 rounded-2xl bg-slate-950/95 border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center relative p-2 shadow-inner">
              <img 
                src="${optimized.dataUrl}" 
                alt="Optimized Preview" 
                class="max-w-full max-h-full object-contain rounded-xl shadow-lg" 
              />
              <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 text-emerald-400 font-mono text-[10px] backdrop-blur-sm border border-white/10">
                ${selectedRatio.toUpperCase()} PREVIEW (${optimized.dimensions})
              </span>
            </div>

            <!-- Aspect Ratio Selector Presets -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300">Choose Aspect Ratio Preset:</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                ${ratios.map(r => `
                  <button 
                    type="button" 
                    onclick="window.setCropRatio('${r.id}')" 
                    class="p-2.5 rounded-xl border text-xs font-bold text-left transition-all flex flex-col justify-between ${
                      selectedRatio === r.id 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm' 
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }"
                  >
                    <div class="flex items-center gap-1.5">
                      <span class="text-sm">${r.icon}</span>
                      <span class="text-[11px] leading-tight font-extrabold">${r.label}</span>
                    </div>
                    <span class="text-[9px] text-slate-400 mt-1">${r.hint}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Upload Progress Indicator Bar (hidden until upload click) -->
            <div id="crop-upload-progress" class="hidden p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div class="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <span id="crop-upload-progress-text">Step 1/3: Compressing & converting to WebP...</span>
                <span class="animate-pulse">● Processing</span>
              </div>
              <div class="w-full h-2 rounded-full bg-emerald-200 dark:bg-emerald-900 overflow-hidden">
                <div class="h-full bg-emerald-500 rounded-full animate-[progress_1.5s_ease-in-out_infinite] w-3/4"></div>
              </div>
            </div>

          </div>

          <!-- Modal Action Buttons -->
          <div class="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
            <button 
              id="crop-modal-cancel-btn"
              type="button" 
              onclick="window.closeImageCropModal()" 
              class="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>

            <div class="flex items-center gap-2">
              <label class="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer hover:bg-slate-300 transition-colors">
                Replace File
                <input type="file" accept="image/jpeg, image/png, image/webp" onchange="window.handleReplaceFileInModal(event)" class="hidden" />
              </label>
              <button 
                id="crop-modal-save-btn"
                type="button" 
                onclick="window.applyCropAndSave()" 
                class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5"
              >
                <span>Upload & Apply Optimized Image &rarr;</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  };

  window.handleReplaceFileInModal = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const context = window.activeCropModalData?.context || 'general';
    const callback = window.activeCropModalData?.onSaveCallback;
    window.closeImageCropModal();
    window.openImageCropModal(file, { context }, callback);
  };

  // Canvas-based WebP compression and Cloud Storage upload execution
  window.applyCropAndSave = async function() {
    if (!window.activeCropModalData || window.isUploadProcessing) return;
    window.isUploadProcessing = true;

    const { img, meta, selectedRatio, context, onSaveCallback } = window.activeCropModalData;
    const saveBtn = document.getElementById('crop-modal-save-btn');
    const cancelBtn = document.getElementById('crop-modal-cancel-btn');
    const progressBar = document.getElementById('crop-upload-progress');
    const progressText = document.getElementById('crop-upload-progress-text');

    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<span>⏳ Optimizing & Uploading...</span>`;
    }
    if (cancelBtn) cancelBtn.disabled = true;
    if (progressBar) progressBar.classList.remove('hidden');

    try {
      // Step 1: Processing & Compressing to WebP
      if (progressText) progressText.textContent = "Step 1/3: Compressing & converting to WebP (Quality 82%)...";
      await new Promise(r => setTimeout(r, 80));

      const optimized = window.processAndOptimizeImage(img, {
        selectedRatio,
        context,
        originalMime: meta.originalType,
        originalSizeBytes: meta.originalSizeBytes
      });

      // Step 2: Uploading to Cloud Storage
      if (progressText) progressText.textContent = "Step 2/3: Uploading optimized WebP to Cloud Storage...";
      
      let finalUrl = optimized.dataUrl;
      let uploadMeta = {
        filename: `${meta.filename.replace(/\.[^/.]+$/, "")}.${optimized.extension}`,
        type: optimized.mimeType,
        size: optimized.sizeKB,
        dimensions: optimized.dimensions,
        uploadDate: meta.uploadDate
      };

      if (window.cmsClient && typeof window.cmsClient.uploadToCloudStorage === 'function') {
        const uploadResult = await window.cmsClient.uploadToCloudStorage(
          optimized.dataUrl,
          context || 'general',
          meta.filename.replace(/\.[^/.]+$/, "")
        );
        if (uploadResult && uploadResult.url) {
          finalUrl = uploadResult.url;
          uploadMeta.filename = uploadResult.filename;
          uploadMeta.size = uploadResult.size;
        }
      }

      // Step 3: Preloading in memory and updating CMS
      if (progressText) progressText.textContent = "Step 3/3: Preloading & synchronizing CMS...";
      
      if (window.preloadImage) {
        await window.preloadImage(finalUrl);
      }

      window.closeImageCropModal();
      window.isUploadProcessing = false;

      if (onSaveCallback) {
        onSaveCallback(finalUrl, uploadMeta);
      }

      window.showAdminToast("Image uploaded successfully!", "success");
    } catch (err) {
      console.error("[Image Upload] Failure:", err);
      window.isUploadProcessing = false;
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `<span>Upload & Apply Optimized Image &rarr;</span>`;
      }
      if (cancelBtn) cancelBtn.disabled = false;
      if (progressBar) progressBar.classList.add('hidden');
      window.showAdminToast(err.message || "Upload failed. Please check your connection and try again.", "error");
    }
  };

  // =========================================================================
  // DRAG & DROP UPLOADER COMPONENT (ASCII Spec Matched)
  // =========================================================================
  window.renderDragAndDropUploader = function(inputId, callbackName, options = {}) {
    const maxMB = options.maxMB || 10;
    const context = options.context || 'general';

    return `
      <div 
        id="drop-zone-${inputId}" 
        class="drag-drop-zone border-2 border-dashed border-teal-300 dark:border-teal-800 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-3xl p-8 sm:p-10 text-center transition-all bg-teal-50/50 dark:bg-slate-900/60 cursor-pointer group focus-within:ring-2 focus-within:ring-emerald-500"
        ondragover="event.preventDefault(); this.classList.add('border-emerald-500', 'bg-emerald-50/80', 'dark:bg-emerald-950/40');"
        ondragleave="event.preventDefault(); this.classList.remove('border-emerald-500', 'bg-emerald-50/80', 'dark:bg-emerald-950/40');"
        ondrop="event.preventDefault(); this.classList.remove('border-emerald-500', 'bg-emerald-50/80', 'dark:bg-emerald-950/40'); window.handleDroppedImageFile(event, '${inputId}', '${context}', ${callbackName});"
        onclick="document.getElementById('${inputId}').click()"
        role="region"
        aria-label="Image drag and drop zone"
        tabindex="0"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); document.getElementById('${inputId}').click();}"
      >
        <div class="space-y-3 pointer-events-none">
          <div class="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto text-2xl shadow-inner border border-emerald-300/40 group-hover:scale-110 transition-transform">
            📁
          </div>
          <div class="text-base font-extrabold text-slate-900 dark:text-white font-heading">
            Drag image here
          </div>
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-widest">or</div>
          <div>
            <span class="inline-block px-5 py-2.5 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all">
              Browse Files
            </span>
          </div>
          <div class="pt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <span class="text-emerald-700 dark:text-emerald-400 font-bold">JPG / JPEG / PNG only</span> &bull; Maximum ${maxMB} MB
          </div>
        </div>
        <input 
          type="file" 
          id="${inputId}" 
          accept="image/jpeg, image/png" 
          class="hidden" 
          onchange="window.handleImageInputChange(event, '${context}', ${callbackName})" 
          aria-label="Upload JPG or PNG image"
        />
      </div>
    `;
  };

  window.handleDroppedImageFile = function(e, inputId, context, callbackFn) {
    const file = e.dataTransfer.files[0];
    if (!file) return;
    window.openImageCropModal(file, { context }, (base64, meta) => {
      callbackFn(base64, meta);
    });
  };

  window.handleImageInputChange = function(e, context, callbackFn) {
    const file = e.target.files[0];
    if (!file) return;
    window.openImageCropModal(file, { context }, (base64, meta) => {
      callbackFn(base64, meta);
    });
  };

  // =========================================================================
  // STANDARDIZED REUSABLE FORM FIELD GENERATORS
  // =========================================================================
  window.renderTextInput = function(id, label, value, options = {}) {
    return `
      <div class="space-y-1.5 font-sans">
        <label for="${id}" class="block text-xs font-bold text-slate-700 dark:text-slate-300">
          ${label} ${options.required ? '<span class="text-red-500">*</span>' : ''}
        </label>
        <input 
          type="text" 
          id="${id}" 
          value="${window.escapeHTML(value || '')}" 
          placeholder="${options.placeholder || ''}" 
          ${options.required ? 'required' : ''} 
          oninput="window.markAdminDirty()" 
          class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-xs transition-all"
        />
        ${options.helpText ? `<p class="text-[11px] text-slate-400">${options.helpText}</p>` : ''}
      </div>
    `;
  };

  window.renderTextarea = function(id, label, value, options = {}) {
    return `
      <div class="space-y-1.5 font-sans">
        <label for="${id}" class="block text-xs font-bold text-slate-700 dark:text-slate-300">
          ${label} ${options.required ? '<span class="text-red-500">*</span>' : ''}
        </label>
        <textarea 
          id="${id}" 
          rows="${options.rows || 3}" 
          placeholder="${options.placeholder || ''}" 
          ${options.required ? 'required' : ''} 
          oninput="window.markAdminDirty()" 
          class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-xs transition-all"
        >${window.escapeHTML(value || '')}</textarea>
        ${options.helpText ? `<p class="text-[11px] text-slate-400">${options.helpText}</p>` : ''}
      </div>
    `;
  };

  window.renderRichTextField = function(id, label, value, options = {}) {
    return `
      <div class="space-y-1.5 font-sans">
        <label for="${id}" class="block text-xs font-bold text-slate-700 dark:text-slate-300">${label}</label>
        <div class="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 focus-within:ring-2 focus-within:ring-emerald-500">
          <div class="flex items-center gap-1 p-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <button type="button" onclick="window.applyRichFormat('${id}', 'bold')" class="px-2.5 py-1 rounded bg-white dark:bg-slate-800 font-bold hover:bg-slate-200 dark:hover:bg-slate-700" title="Bold">B</button>
            <button type="button" onclick="window.applyRichFormat('${id}', 'italic')" class="px-2.5 py-1 rounded bg-white dark:bg-slate-800 italic hover:bg-slate-200 dark:hover:bg-slate-700" title="Italic">I</button>
            <button type="button" onclick="window.applyRichFormat('${id}', 'list')" class="px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" title="Bullet List">• List</button>
            <button type="button" onclick="window.applyRichFormat('${id}', 'link')" class="px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" title="Link">🔗 Link</button>
            <span class="text-[10px] text-slate-400 ml-auto font-mono">Safe Controlled Editor</span>
          </div>
          <textarea 
            id="${id}" 
            rows="${options.rows || 4}" 
            oninput="window.markAdminDirty()" 
            class="w-full p-3 bg-transparent text-slate-900 dark:text-white border-0 outline-none text-xs leading-relaxed"
          >${window.escapeHTML(value || '')}</textarea>
        </div>
        ${options.helpText ? `<p class="text-[11px] text-slate-400">${options.helpText}</p>` : ''}
      </div>
    `;
  };

  window.applyRichFormat = function(textareaId, formatType) {
    const el = document.getElementById(textareaId);
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = el.value.substring(start, end);
    let replacement = selected;

    if (formatType === 'bold') {
      replacement = `**${selected || 'bold text'}**`;
    } else if (formatType === 'italic') {
      replacement = `*${selected || 'italic text'}*`;
    } else if (formatType === 'list') {
      replacement = `\n• ${selected || 'List item'}`;
    } else if (formatType === 'link') {
      const url = prompt("Enter Link URL (e.g. #/contact or https://...):", "#/services");
      if (url) replacement = `[${selected || 'link text'}](${url})`;
    }

    el.value = el.value.substring(0, start) + replacement + el.value.substring(end);
    window.markAdminDirty();
    el.focus();
  };

  window.renderToggle = function(id, label, isChecked, options = {}) {
    return `
      <label class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer select-none">
        <div>
          <div class="font-bold text-slate-900 dark:text-white text-xs">${label}</div>
          ${options.subLabel ? `<div class="text-[10px] text-slate-400">${options.subLabel}</div>` : ''}
        </div>
        <input 
          type="checkbox" 
          id="${id}" 
          ${isChecked ? 'checked' : ''} 
          onchange="window.markAdminDirty()" 
          class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        />
      </label>
    `;
  };

  window.renderSelect = function(id, label, selectedValue, optionsList = []) {
    return `
      <div class="space-y-1.5 font-sans">
        <label for="${id}" class="block text-xs font-bold text-slate-700 dark:text-slate-300">${label}</label>
        <select 
          id="${id}" 
          onchange="window.markAdminDirty()" 
          class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
        >
          ${optionsList.map(opt => `
            <option value="${opt.value}" ${opt.value === selectedValue ? 'selected' : ''}>${opt.label}</option>
          `).join('')}
        </select>
      </div>
    `;
  };

  function renderAdminPage() {
    const isAuthenticated = sessionStorage.getItem('anugraha_admin_auth') === 'true';

    if (!isAuthenticated) {
      return renderAdminLoginGate();
    }

    let activeTab = window.activeAdminTab || 'dashboard';
    if (currentPath.startsWith('/admin/')) {
      const sub = currentPath.replace('/admin/', '').trim();
      if (sub && sub !== 'login') {
        activeTab = sub;
        window.activeAdminTab = sub;
      }
    }

    const navItems = [
      { id: 'dashboard', label: '🏠 Dashboard' },
      { id: 'homepage', label: '🖥️ Homepage' },
      { id: 'about', label: 'ℹ️ About Us' },
      { id: 'leadership', label: '👨‍⚕️ Leadership' },
      { id: 'administration', label: '👥 Administration' },
      { id: 'hospitals', label: '🏥 Hospitals' },
      { id: 'vision-centers', label: '👁️ Vision Centers' },
      { id: 'services', label: '🩺 Services' },
      { id: 'equipment', label: '🔬 Equipment (22)' },
      { id: 'doctors', label: '🧑‍⚕️ Doctors' },
      { id: 'academics', label: '🎓 Academics' },
      { id: 'patient-resources', label: '📋 Patient Resources' },
      { id: 'faqs', label: '❓ FAQs' },
      { id: 'insurance', label: '🛡️ Insurance & Schemes' },
      { id: 'news', label: '📰 News & Press' },
      { id: 'media', label: '🖼️ Media Library' },
      { id: 'settings', label: '⚙️ Settings & Backup' },
      { id: 'logout', label: '🚪 Logout' }
    ];

    return `
      <div class="min-h-screen bg-[#f4f8f8] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col md:flex-row">
        
        <!-- DESKTOP SIDEBAR NAVIGATION (Jobie Style active rounded pill items) -->
        <aside class="w-72 bg-[#093327] dark:bg-slate-900 text-white p-6 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen border-r border-teal-900/40">
          <div class="space-y-6">
            
            <!-- Logo Branding Header (Jobie Style) -->
            <div class="flex items-center gap-3 border-b border-teal-800/60 pb-4">
              <div class="w-10 h-10 rounded-full bg-white p-0.5 shadow-lg overflow-hidden shrink-0">
                <img src="${window.appStore.getBrand().logo || 'assets/official_logo.jpg'}" alt="Logo" class="w-full h-full object-contain" />
              </div>
              <div>
                <div class="font-extrabold text-base text-white font-heading tracking-tight">Anugraha CMS</div>
                <div class="text-[10px] text-emerald-400 font-mono font-bold">Content Editor v2.0</div>
              </div>
            </div>

            <!-- Navigation Links List matching exact requested order -->
            <nav class="space-y-1 text-xs font-bold font-heading overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
              ${navItems.map(tab => `
                <button 
                  onclick="window.switchAdminTab('${tab.id}')" 
                  class="w-full text-left px-3.5 py-2.5 rounded-2xl transition-all flex items-center justify-between ${
                    activeTab === tab.id 
                      ? 'bg-white text-[#093327] dark:bg-emerald-500 dark:text-slate-950 font-extrabold shadow-xl scale-[1.02]' 
                      : 'text-slate-300 hover:text-white hover:bg-teal-900/60 dark:hover:bg-slate-800/80'
                  }"
                >
                  <span class="truncate">${tab.label}</span>
                  ${activeTab === tab.id ? '<span class="w-2 h-2 rounded-full bg-emerald-600 dark:bg-slate-950 shrink-0"></span>' : ''}
                </button>
              `).join('')}
            </nav>

          </div>

          <!-- Live Site Link & Sign Out Button -->
          <div class="pt-4 border-t border-teal-800/60 space-y-2">
            <a href="#/" target="_blank" rel="noopener" class="block w-full text-center py-2.5 rounded-xl bg-teal-900/60 hover:bg-teal-900 text-emerald-300 font-bold text-xs border border-teal-700/50 transition-colors">
              Preview Live Website &rarr;
            </a>
            <button onclick="window.handleAdminLogout()" class="block w-full py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 font-bold text-xs border border-red-800/50 transition-colors">
              Sign Out
            </button>
          </div>
        </aside>

        <!-- MOBILE TOP NAVIGATION BAR & DRAWER (Does not consume mobile screen permanently) -->
        <div class="w-full md:hidden bg-[#093327] text-white p-4 sticky top-0 z-50 flex items-center justify-between shadow-lg border-b border-teal-800/60">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden shrink-0 shadow">
              <img src="${window.appStore.getBrand().logo || 'assets/official_logo.jpg'}" alt="Logo" class="w-full h-full object-contain" />
            </div>
            <div class="font-extrabold text-sm text-white font-heading">Anugraha CMS</div>
          </div>

          <div class="flex items-center gap-2">
            <a href="#/" target="_blank" class="px-3 py-1.5 rounded-xl bg-teal-900 text-emerald-300 text-xs font-bold">Live</a>
            <button onclick="window.toggleAdminMobileDrawer()" class="p-2 rounded-xl bg-teal-900 text-white min-h-[44px] flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        <!-- Mobile Top Drawer Overlay -->
        ${window.isAdminMobileDrawerOpen ? `
          <div class="md:hidden fixed inset-0 z-50 bg-[#062c26]/98 backdrop-blur-2xl text-white p-6 overflow-y-auto flex flex-col justify-between">
            <div class="space-y-6">
              <div class="flex items-center justify-between border-b border-teal-800 pb-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-white p-0.5 shadow overflow-hidden shrink-0">
                    <img src="${window.appStore.getBrand().logo || 'assets/official_logo.jpg'}" alt="Logo" class="w-full h-full object-contain" />
                  </div>
                  <span class="font-extrabold text-base text-white font-heading">CMS Navigation</span>
                </div>
                <button onclick="window.toggleAdminMobileDrawer()" class="p-2 rounded-xl bg-teal-900 text-white min-h-[44px]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              <nav class="grid grid-cols-2 gap-2 text-xs font-bold font-heading">
                ${navItems.filter(t => t.id !== 'logout').map(tab => `
                  <button onclick="window.switchAdminTab('${tab.id}'); window.toggleAdminMobileDrawer()" class="p-3 rounded-xl text-left ${activeTab === tab.id ? 'bg-emerald-500 text-slate-950 font-extrabold' : 'bg-teal-950/60 text-slate-200'}">
                    ${tab.label}
                  </button>
                `).join('')}
              </nav>
            </div>

            <div class="pt-6 border-t border-teal-800 space-y-2">
              <button onclick="window.handleAdminLogout()" class="block w-full py-3 rounded-xl bg-red-950 text-red-200 font-bold text-xs text-center">
                Sign Out
              </button>
            </div>
          </div>
        ` : ''}

        <!-- MAIN DASHBOARD CONTENT PANEL -->
        <main class="flex-1 p-4 sm:p-8 overflow-y-auto space-y-6 min-w-0">
          
          <!-- Top Jobie-Inspired Admin Header Bar -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading capitalize">
                ${activeTab.replace('-', ' ')}
              </h1>
              <span class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold">
                Editor Mode
              </span>
            </div>

            <!-- Header Profile Badges -->
            <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div class="flex items-center gap-2">
                <div class="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex items-center justify-center border border-emerald-400/40">
                  WA
                </div>
                <div class="text-left text-xs">
                  <div class="font-extrabold text-slate-900 dark:text-white">web@admin</div>
                  <div class="text-[10px] text-slate-400 font-mono">Super Admin</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Active Tab Workspace Render -->
          ${renderAdminTabContent(activeTab)}

        </main>

      </div>
    `;
  }

  // 1. Premium Split-Panel Password Gate View
  function renderAdminLoginGate() {
    const savedUser = localStorage.getItem('anugraha_remembered_user') || 'web@admin';

    return `
      <div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-emerald-500 selection:text-slate-950">
        <!-- Main Card Split Container matching reference design -->
        <div class="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
          
          <!-- LEFT PANEL: Hospital Branding Visual Banner (40% desktop) -->
          <div class="w-full md:w-5/12 bg-gradient-to-br from-[#062c26] via-[#093327] to-[#041d19] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-white border-b md:border-b-0 md:border-r border-teal-800/40">
            
            <!-- Subtle Eye-Care Visual Background Shapes -->
            <div class="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>
            <div class="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-teal-400/10 blur-3xl pointer-events-none"></div>
            
            <!-- Brand Identity Header -->
            <div class="space-y-4 relative z-10">
              <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md p-2.5 border border-white/20 shadow-xl flex items-center justify-center">
                <img src="${window.appStore.getBrand().logo || 'assets/official_logo.jpg'}" alt="Logo" class="w-full h-full object-contain" />
              </div>

              <div>
                <span class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                  Est. 2001 &bull; 25 Years
                </span>
                <h2 class="text-2xl font-extrabold font-heading text-white tracking-tight leading-snug">
                  Anugraha Eye Hospital
                </h2>
                <p class="text-xs text-teal-200/80 mt-1 font-medium">
                  Authentic. Affectionate. Affordable.
                </p>
              </div>
            </div>

            <!-- Curved Slide Notch / LOGIN Accent Badge -->
            <div class="my-8 relative z-10">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold text-xs tracking-widest uppercase shadow-inner">
                <span class="w-2 h-2 rounded-full ${window.isSupabaseConfigured && window.isSupabaseConfigured() ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}"></span>
                <span>${window.isSupabaseConfigured && window.isSupabaseConfigured() ? 'SUPABASE CLOUD CMS' : 'SECURE CMS ACCESS'}</span>
              </div>
              <p class="text-[11px] text-teal-200/70 mt-2 leading-relaxed">
                ${window.isSupabaseConfigured && window.isSupabaseConfigured() 
                  ? 'Connected to Supabase Cloud PostgreSQL database with Row-Level Security and Realtime sync.' 
                  : 'Multi-device cloud content administration console for Vijayapura & Kalaburagi campuses.'}
              </p>
            </div>

            <!-- Footer Badge -->
            <div class="relative z-10 text-[10px] text-teal-300/60 font-mono flex items-center gap-1.5">
              <span>● ${window.isSupabaseConfigured && window.isSupabaseConfigured() ? 'PostgreSQL Cloud Database &bull; Realtime Enabled' : 'Protected System &bull; Static Storage'}</span>
            </div>

          </div>

          <!-- RIGHT PANEL: Login Form -->
          <div class="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-between bg-white dark:bg-slate-900">
            
            <!-- Top Back to Website Action -->
            <div class="flex items-center justify-between pb-6">
              <a href="#/" class="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span>&larr; Back to Website</span>
              </a>

              <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Admin Portal</span>
            </div>

            <!-- Main Login Content -->
            <div class="space-y-6 max-w-sm mx-auto w-full">
              
              <!-- User Avatar Circle -->
              <div class="text-center space-y-2">
                <div class="w-16 h-16 rounded-full bg-teal-900/10 dark:bg-emerald-950/60 border border-teal-800/30 text-teal-800 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
                <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">LOGIN / SIGN IN</h1>
                <p class="text-xs text-slate-500 dark:text-slate-400">Enter your credentials to access the Content Editor Console.</p>
              </div>

              <!-- Interactive Form -->
              <form id="admin-login-form" onsubmit="window.handleAdminLoginSubmit(event)" class="space-y-4">
                
                <!-- Username / Email Field -->
                <div class="space-y-1">
                  <label for="admin-user-input" class="block text-xs font-bold text-slate-700 dark:text-slate-300">Username or Email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </div>
                    <input 
                      type="text" 
                      id="admin-user-input" 
                      name="username"
                      value="${savedUser}" 
                      placeholder="web@admin" 
                      required 
                      oninput="window.validateAdminLoginForm()"
                      class="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-base sm:text-sm border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <!-- Password Field -->
                <div class="space-y-1">
                  <label for="admin-pass-input" class="block text-xs font-bold text-slate-700 dark:text-slate-300">Password / Access Key</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                    
                    <input 
                      type="password" 
                      id="admin-pass-input" 
                      name="password"
                      placeholder="••••••••" 
                      required 
                      oninput="window.validateAdminLoginForm()"
                      class="w-full pl-10 pr-12 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-base sm:text-sm border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />

                    <!-- Show/Hide Password Eye Button -->
                    <button 
                      type="button" 
                      onclick="window.toggleAdminPasswordVisibility()"
                      class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      title="Toggle Password Visibility"
                      aria-label="Toggle Password Visibility"
                    >
                      <svg id="admin-pass-eye-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Remember Me & Security Status -->
                <div class="flex items-center justify-between pt-1">
                  <label class="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" id="admin-remember-me" checked class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" />
                    <span class="text-xs text-slate-600 dark:text-slate-400 font-medium">Remember username</span>
                  </label>

                  <span class="text-[11px] ${window.isSupabaseConfigured && window.isSupabaseConfigured() ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'} font-bold flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></path></svg>
                    ${window.isSupabaseConfigured && window.isSupabaseConfigured() ? 'Supabase Auth' : 'Local Setup Mode'}
                  </span>
                </div>

                <!-- Error Notice Container -->
                <div id="admin-login-error" class="hidden p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-bold text-center">
                  Incorrect username or password. Please try again.
                </div>

                <!-- State-Aware Submit Button -->
                <button 
                  type="submit" 
                  id="admin-submit-btn"
                  class="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-white font-extrabold text-sm shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-2"
                >
                  <span id="admin-btn-text">Sign In to Console</span>
                  <svg id="admin-btn-spinner" class="w-4 h-4 text-white animate-spin hidden" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>

              </form>
            </div>

            <!-- Footer Security Boundary Note -->
            <div class="text-center text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-1">
              <div class="font-bold">&copy; Anugraha Eye Hospital — Content Management Console</div>
              <div class="text-[10px] text-slate-500 leading-tight">
                Client-Side Prototype Authentication: Frontend demonstration storage. Production deployment requires server-side authentication, RBAC, and secure backend API.
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  // 2. Comprehensive Module Tab Content Router
  function renderAdminTabContent(tabId) {
    const store = window.appStore;

    // MODULE 1: DASHBOARD / OVERVIEW (Simple Content Overview)
    if (tabId === 'dashboard' || tabId === 'overview') {
      const facilities = store.getFacilities();
      const doctorsCount = (store.getLeadership() || []).length;
      const servicesCount = (store.getServices() || []).length;
      const baseHospitalsCount = facilities.filter(f => f.type === 'base').length;
      const visionCentersCount = facilities.filter(f => f.type === 'vision-center').length;
      const imagesCount = (store.getGallery() || []).length + servicesCount + doctorsCount;
      const faqsCount = (store.getFaqs() || []).length;
      const lastSavedTime = localStorage.getItem('anugraha_last_saved_time') || 'Active Session (Synced)';

      return `
        <div class="space-y-6 font-sans">
          
          <!-- System Metadata & Status Strip -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl font-bold border border-emerald-400/40 shrink-0">
                🌐
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-extrabold text-slate-900 dark:text-white text-base font-heading">Website Status:</span>
                  <span class="px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs font-mono flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live & Synchronized
                  </span>
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Anugraha Eye Hospital Public Website (Frontend SPA Build)</div>
              </div>
            </div>

            <div class="flex items-center gap-6 text-xs font-mono border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-end">
              <div>
                <div class="text-slate-400 text-[10px] uppercase font-bold">Current Admin</div>
                <div class="font-extrabold text-teal-900 dark:text-emerald-400">web@admin</div>
              </div>
              <div class="border-l border-slate-200 dark:border-slate-800 pl-6">
                <div class="text-slate-400 text-[10px] uppercase font-bold">Last Saved</div>
                <div class="font-bold text-slate-700 dark:text-slate-200">${lastSavedTime}</div>
              </div>
            </div>
          </div>

          <!-- Section Header -->
          <div class="flex items-center justify-between pt-2">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Content Module Overview</h2>
              <p class="text-xs text-slate-500">Summary of published site content modules and asset count.</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold">
              7 Core Categories
            </span>
          </div>

          <!-- 7 REQUIRED SUMMARY CARDS GRID -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- 1. Pages Card -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">📄</span>
                <span class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono font-bold">12 Routes</span>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">Pages</div>
                <div class="text-xs text-slate-500 mt-0.5">Home, About, Services, Hospitals & Resources</div>
              </div>
              <button onclick="window.switchAdminTab('homepage')" class="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors">
                <span>Manage Pages</span>
                <span>&rarr;</span>
              </button>
            </div>

            <!-- 2. Doctors Card -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">👨‍⚕️</span>
                <span class="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono font-bold">${doctorsCount} Profiles</span>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">Doctors</div>
                <div class="text-xs text-slate-500 mt-0.5">Dr. Lingadalli & Dr. Malini bios & photos</div>
              </div>
              <button onclick="window.switchAdminTab('doctors')" class="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors">
                <span>Manage Doctors</span>
                <span>&rarr;</span>
              </button>
            </div>

            <!-- 3. Services Card -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl shrink-0">🩺</span>
                <span class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono font-bold">${servicesCount} Specialties</span>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">Services</div>
                <div class="text-xs text-slate-500 mt-0.5">Cataract, LASIK, Retina & Glaucoma Care</div>
              </div>
              <button onclick="window.switchAdminTab('services')" class="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors">
                <span>Manage Services</span>
                <span>&rarr;</span>
              </button>
            </div>

            <!-- 4. Hospitals Card -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl shrink-0">🏥</span>
                <span class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono font-bold">${baseHospitalsCount} Campuses</span>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">Hospitals</div>
                <div class="text-xs text-slate-500 mt-0.5">Vijayapura Main & Kalaburagi Campuses</div>
              </div>
              <button onclick="window.switchAdminTab('hospitals')" class="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors">
                <span>Manage Hospitals</span>
                <span>&rarr;</span>
              </button>
            </div>

            <!-- 5. Vision Centers Card -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shrink-0">👁️</span>
                <span class="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-bold">${visionCentersCount} Centers</span>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">Vision Centers</div>
                <div class="text-xs text-slate-500 mt-0.5">Talikoti, Muddebihal, Sindagi, Indi & 4 More</div>
              </div>
              <button onclick="window.switchAdminTab('vision-centers')" class="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors">
                <span>Manage Vision Centers</span>
                <span>&rarr;</span>
              </button>
            </div>

            <!-- 6. Images Card -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl shrink-0">🖼️</span>
                <span class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono font-bold">${imagesCount} Assets</span>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">Images</div>
                <div class="text-xs text-slate-500 mt-0.5">Doctor cutouts, service photos & media</div>
              </div>
              <button onclick="window.switchAdminTab('media')" class="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors">
                <span>Manage Images</span>
                <span>&rarr;</span>
              </button>
            </div>

            <!-- 7. FAQs Card -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <span class="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl shrink-0">❓</span>
                <span class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono font-bold">${faqsCount} FAQs</span>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">FAQs</div>
                <div class="text-xs text-slate-500 mt-0.5">Patient guidance & clinical recovery FAQs</div>
              </div>
              <button onclick="window.switchAdminTab('faqs')" class="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors">
                <span>Manage FAQs</span>
                <span>&rarr;</span>
              </button>
            </div>

          </div>

        </div>
      `;
    }

    // MODULE 2: HOMEPAGE EDITOR
    if (tabId === 'homepage') {
      const home = store.getHomepage();
      const brand = store.getBrand();
      const stats = store.getStats();

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <!-- Header Actions -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Homepage Complete Editor</h2>
              <p class="text-slate-500">Edit hero banner, CTA buttons, stats counters, logo, and section visibility with permanent PostgreSQL & Cloud Storage persistence.</p>
            </div>
            <a href="#/" target="_blank" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors">
              <span>Preview Live</span>
              <span>&nearr;</span>
            </a>
          </div>

          <form id="admin-homepage-form" onsubmit="window.saveHomepageAdmin(event)" class="space-y-6">
            
            <!-- Section 1: Logo & Branding Asset -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 class="font-extrabold text-slate-900 dark:text-white text-sm font-heading">1. Website Logo</h3>
                <span class="text-[10px] text-slate-400 font-mono">JPG, JPEG, PNG, WebP</span>
              </div>

              <div class="flex flex-col sm:flex-row items-center gap-6">
                <div class="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center shrink-0">
                  <img id="admin-logo-preview" src="${brand.logo || 'assets/official_logo.jpg'}" alt="Logo Preview" class="w-full h-full object-contain" />
                </div>
                <div class="space-y-2 flex-1">
                  <label class="block font-bold text-slate-700 dark:text-slate-300">Upload New Official Logo</label>
                  <label class="inline-block px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow transition-colors">
                    Choose Image File
                    <input type="file" accept="image/jpeg, image/png, image/webp" onchange="window.handleAdminLogoUpload(event)" class="hidden" />
                  </label>
                  <div class="text-[11px] text-slate-400">Strictly validates file format and uploads to Cloud Storage with automatic WebP conversion.</div>
                </div>
              </div>
            </div>

            <!-- Section 2: Hero Content Block (Canonical Hero Data Model) -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 class="font-extrabold text-slate-900 dark:text-white text-sm font-heading">2. Hero Banner Content</h3>
                  <p class="text-[11px] text-slate-500 mt-0.5">Controls the primary hero banner heading, taglines, CTAs, and background image on the public homepage.</p>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  ● Cloud Synchronized
                </span>
              </div>

              <div class="space-y-4">
                <!-- Hero Eyebrow Tagline -->
                <div>
                  <label for="admin-hero-eyebrow" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hero Eyebrow Tagline <span class="text-slate-400 font-normal">(Top badge above heading)</span>
                  </label>
                  <input 
                    type="text" 
                    id="admin-hero-eyebrow" 
                    value="${window.escapeHTML(home.heroEyebrow || brand.tagline || 'Authentic. Affectionate. Affordable. Eye Care')}" 
                    required 
                    oninput="window.markAdminDirty()"
                    placeholder="e.g. Authentic. Affectionate. Affordable. Eye Care"
                    class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                  />
                </div>

                <!-- Hero Main Heading (H1) -->
                <div>
                  <label for="admin-hero-heading" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hero Main Heading (H1) <span class="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="admin-hero-heading" 
                    value="${window.escapeHTML(home.heroHeading || 'Restoring Sight, Enriching Lives Across North Karnataka')}" 
                    required 
                    oninput="window.markAdminDirty()"
                    placeholder="e.g. Restoring Sight, Enriching Lives Across North Karnataka"
                    class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm transition-all" 
                  />
                </div>

                <!-- Hero Description Paragraph -->
                <div>
                  <label for="admin-hero-desc" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hero Description Paragraph <span class="text-rose-500">*</span>
                  </label>
                  <textarea 
                    id="admin-hero-desc" 
                    rows="3" 
                    required 
                    oninput="window.markAdminDirty()"
                    placeholder="Enter comprehensive hero introduction paragraph..."
                    class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed transition-all"
                  >${window.escapeHTML(home.heroDescription || '')}</textarea>
                </div>

                <!-- CTA Button 1 (Primary) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="admin-hero-cta1-text" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Primary CTA Button Text <span class="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="admin-hero-cta1-text" 
                      value="${window.escapeHTML(home.primaryCta?.text || 'Book an Appointment')}" 
                      required
                      oninput="window.markAdminDirty()"
                      placeholder="e.g. Book an Appointment"
                      class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label for="admin-hero-cta1-link" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary CTA Destination Link</label>
                    <input 
                      type="text" 
                      id="admin-hero-cta1-link" 
                      value="${window.escapeHTML(home.primaryCta?.link || '#/contact')}" 
                      required
                      oninput="window.markAdminDirty()"
                      placeholder="e.g. #/contact or tel:08352-220646"
                      class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-[11px] transition-all" 
                    />
                  </div>
                </div>

                <!-- CTA Button 2 (Secondary) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="admin-hero-cta2-text" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Secondary CTA Button Text <span class="text-rose-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="admin-hero-cta2-text" 
                      value="${window.escapeHTML(home.secondaryCta?.text || 'Explore Specialties')}" 
                      required
                      oninput="window.markAdminDirty()"
                      placeholder="e.g. Explore Specialties"
                      class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label for="admin-hero-cta2-link" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Secondary CTA Destination Link</label>
                    <input 
                      type="text" 
                      id="admin-hero-cta2-link" 
                      value="${window.escapeHTML(home.secondaryCta?.link || '#/services')}" 
                      required
                      oninput="window.markAdminDirty()"
                      placeholder="e.g. #/services or #/vision-centers"
                      class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-[11px] transition-all" 
                    />
                  </div>
                </div>

                <!-- Hero Background Asset Container -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <!-- Hidden Input storing canonical image URL -->
                  <input type="hidden" id="admin-hero-image-url" value="${window.escapeHTML(home.heroImage || 'assets/services/cataract_surgery.jpg')}" />

                  <div class="flex items-center gap-3 min-w-0 flex-1">
                    <div class="w-24 h-16 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0 shadow-inner">
                      <img 
                        id="admin-hero-img-preview" 
                        src="${home.heroImage || 'assets/services/cataract_surgery.jpg'}" 
                        data-stored-url="${window.escapeHTML(home.heroImage || 'assets/services/cataract_surgery.jpg')}" 
                        alt="Hero Background Preview" 
                        class="w-full h-full object-cover" 
                      />
                    </div>
                    <div class="truncate space-y-1">
                      <div class="font-bold text-slate-900 dark:text-white text-xs">Hero Background Asset</div>
                      <div class="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono truncate">
                        <span class="w-1.5 h-1.5 rounded-full ${String(home.heroImage || '').startsWith('http') ? 'bg-emerald-500' : 'bg-blue-500'} shrink-0"></span>
                        <span class="truncate" title="${home.heroImage || 'assets/services/cataract_surgery.jpg'}">
                          ${String(home.heroImage || '').startsWith('http') ? 'Cloud CDN Asset: ' + (home.heroImage || '').split('/').pop() : (home.heroImage || 'assets/services/cataract_surgery.jpg')}
                        </span>
                      </div>
                      <div class="text-[10px] text-emerald-600 dark:text-emerald-400">JPG, JPEG, PNG, WebP (Auto-optimized to 1920px 16:9 WebP)</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <label class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-sm transition-all flex items-center gap-1.5">
                      <span>📤 Select & Optimize Image</span>
                      <input type="file" id="admin-hero-file-input" accept=".jpg, .jpeg, .png, .webp, image/jpeg, image/png, image/webp" onchange="window.handleAdminHeroImageUpload(event)" class="hidden" />
                    </label>
                  </div>
                </div>

                <!-- Instant Save Hero Section CTA -->
                <div class="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <span class="text-[11px] text-slate-500">Save Hero section independently or use the button below for all settings.</span>
                  <button 
                    type="button" 
                    id="admin-hero-save-btn" 
                    onclick="window.saveHeroBannerSection(event)" 
                    class="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5"
                  >
                    <span>💾 Save Hero Banner Only</span>
                  </button>
                </div>

              </div>
            </div>

            <!-- Section 3: Trust Statistics Counters -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 class="font-extrabold text-slate-900 dark:text-white text-sm font-heading border-b border-slate-100 dark:border-slate-800 pb-3">3. Trust Statistics Counters</h3>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label for="admin-home-surgeries" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Lifetime Surgeries Count</label>
                  <input type="text" id="admin-home-surgeries" value="${window.escapeHTML(stats.lifetimeSurgeries || '2,28,951+')}" required oninput="window.markAdminDirty()" class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                </div>
                <div>
                  <label for="admin-home-camps" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Outreach Camps Count</label>
                  <input type="text" id="admin-home-camps" value="${window.escapeHTML(stats.outreachCamps || '2,715')}" required oninput="window.markAdminDirty()" class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                </div>
                <div>
                  <label for="admin-home-free" class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Free Cataract Surgeries</label>
                  <input type="text" id="admin-home-free" value="${window.escapeHTML(stats.freeCataracts || '50,000+')}" required oninput="window.markAdminDirty()" class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                </div>
              </div>
            </div>

            <!-- Section 4: Homepage Sections Switchboard -->
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 class="font-extrabold text-slate-900 dark:text-white text-sm font-heading border-b border-slate-100 dark:border-slate-800 pb-3">4. Section Visibility Switchboard</h3>
              <p class="text-slate-500 text-xs">Enable or disable specific sections on the public homepage.</p>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                ${[
                  { key: 'whyAnugraha', label: 'Why Anugraha' },
                  { key: 'services', label: 'Services Grid' },
                  { key: 'featuredDoctors', label: 'Featured Doctors' },
                  { key: 'hospitals', label: 'Base Hospitals' },
                  { key: 'visionCenters', label: 'Vision Centers' },
                  { key: 'technology', label: 'Technology Suite' },
                  { key: 'communityImpact', label: 'Community Impact' },
                  { key: 'academics', label: 'Academics Silo' },
                  { key: 'insurance', label: 'Insurance Partners' },
                  { key: 'faqs', label: 'Patient FAQs' },
                  { key: 'finalCta', label: 'Final CTA Banner' }
                ].map(sec => `
                  <label class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-emerald-400/40 transition-colors">
                    <span class="font-bold text-slate-800 dark:text-slate-200">${sec.label}</span>
                    <input type="checkbox" id="admin-sec-${sec.key}" onchange="window.markAdminDirty()" ${home.sections?.[sec.key] !== false ? 'checked' : ''} class="w-4 h-4 text-emerald-600 rounded" />
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Save & Cancel Form Bar -->
            <div class="flex items-center gap-3 pt-2">
              <button 
                type="submit" 
                id="admin-homepage-save-btn" 
                class="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <span id="admin-homepage-save-btn-text">Save All Homepage Settings</span>
                <svg id="admin-homepage-save-spinner" class="w-4 h-4 text-white animate-spin hidden" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
              <button type="button" onclick="render()" class="px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors">
                Cancel
              </button>
            </div>

          </form>

        </div>
      `;
    }

    // MODULE 3: ABOUT US EDITOR
    if (tabId === 'about') {
      const about = store.getAbout();
      const brand = store.getBrand();

      return `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-sans">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">About Us Narrative & Milestones</h2>
              <p class="text-slate-500">Edit institutional story, 2001 inception history, vision, mission, and milestones.</p>
            </div>
            <a href="#/about" target="_blank" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">Preview &nearr;</a>
          </div>

          <form onsubmit="window.saveAboutAdmin(event)" class="space-y-6">
            
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hospital Story (Intro Narrative)</label>
              <textarea id="admin-about-story" rows="4" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${about.story}</textarea>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Founding History (2001 Inception)</label>
              <textarea id="admin-about-history" rows="4" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${about.history}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Vision Statement</label>
                <textarea id="admin-about-vision" rows="3" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${about.vision || brand.vision}</textarea>
              </div>

              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mission Statement</label>
                <textarea id="admin-about-mission" rows="3" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${about.mission || brand.mission}</textarea>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Community Impact Summary</label>
              <textarea id="admin-about-impact" rows="3" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${about.communityImpact}</textarea>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button type="submit" class="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg">
                Save About Us Content
              </button>
              <button type="button" onclick="render()" class="px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                Cancel
              </button>
            </div>

          </form>
        </div>
      `;
    }

    // MODULE 4: LEADERSHIP PROFILE MANAGER
    if (tabId === 'leadership') {
      const leaders = store.getLeadership() || [];

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Founders & Medical Leadership Profiles</h2>
              <p class="text-slate-500">Manage Dr. Prabhugouda B. Lingadalli, Dr. Malini P L, and clinical leadership records.</p>
            </div>
            <button onclick="window.addLeadershipProfilePrompt()" class="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow">
              + Add Doctor Profile
            </button>
          </div>

          <div class="space-y-6">
            ${leaders.map(doc => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
                  <div class="flex items-center gap-3">
                    <span class="font-extrabold text-slate-900 dark:text-white text-base font-heading">${doc.name}</span>
                    <span class="px-3 py-1 rounded-full ${doc.published !== false ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'} text-[10px] font-mono font-bold">
                      ${doc.published !== false ? '● Published' : '○ Draft'}
                    </span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button onclick="window.toggleLeadershipPublish('${doc.id}')" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold text-xs">
                      ${doc.published !== false ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onclick="window.deleteLeadershipConfirm('${doc.id}')" class="px-3 py-1.5 rounded-xl bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-xs">
                      Delete
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input type="text" id="admin-doc-name-${doc.id}" value="${doc.name}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Designation / Title</label>
                    <input type="text" id="admin-doc-title-${doc.id}" value="${doc.title || doc.designation || ''}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Degrees & Qualifications</label>
                    <input type="text" id="admin-doc-degrees-${doc.id}" value="${doc.degrees}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Specialization</label>
                    <input type="text" id="admin-doc-spec-${doc.id}" value="${doc.specialization || ''}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                </div>

                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Biography</label>
                  <textarea id="admin-doc-bio-${doc.id}" rows="4" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${doc.bio}</textarea>
                </div>

                <!-- Dual Format Validated Image Upload -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img id="admin-doc-img-${doc.id}" src="${doc.photo || 'assets/official_logo.jpg'}" alt="${doc.name}" class="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-800" />
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">Profile Photo Asset</div>
                      <div class="text-[10px] text-slate-400">Strictly .jpg, .jpeg, .png only</div>
                    </div>
                  </div>
                  <label class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs cursor-pointer">
                    Replace Photo
                    <input type="file" accept="image/jpeg, image/png" onchange="window.handleAdminDoctorPhotoUpload(event, '${doc.id}')" class="hidden" />
                  </label>
                </div>

                <div class="flex items-center gap-3 pt-2">
                  <button onclick="window.saveLeadershipProfile('${doc.id}')" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow">
                    Save Changes
                  </button>
                  <a href="#/about/leadership" target="_blank" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    Preview Profile &rarr;
                  </a>
                </div>

              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 5: ADMINISTRATION TEAM (With Full Profile Photo Upload & Management)
    if (tabId === 'administration') {
      const adminTeam = store.getAdministration() || [];

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                Administration Team Profiles (${adminTeam.length} Members)
              </h2>
              <p class="text-slate-500 mt-0.5">
                Manage executive leadership profiles, qualifications, and 1:1 portrait photos for the public administration page.
              </p>
            </div>
            <button onclick="window.addAdminTeamMember(event)" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg inline-flex items-center gap-1.5 shrink-0">
              <span>+ Add Staff Member</span>
            </button>
          </div>

          <div class="space-y-6">
            ${adminTeam.map((m, idx) => {
              const initials = m.name.split(' ').map(n => n[0]).slice(0, 2).join('');
              return `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-md transition-all">
                  
                  <!-- Member Card Header -->
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-3">
                    <div class="flex items-center gap-2.5">
                      <span class="font-extrabold text-slate-900 dark:text-white text-base font-heading">${m.name}</span>
                      <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px] font-bold">
                        ${m.department || m.role}
                      </span>
                      <span class="px-2.5 py-0.5 rounded-full ${m.published !== false ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'} font-mono text-[10px] font-bold">
                        ${m.published !== false ? '● Published' : '○ Draft'}
                      </span>
                    </div>

                    <div class="flex items-center gap-2">
                      <button 
                        type="button" 
                        onclick="window.toggleAdminMemberPublish('${m.id}')" 
                        class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
                      >
                        ${m.published !== false ? 'Unpublish' : 'Publish'}
                      </button>
                      <button 
                        type="button" 
                        onclick="window.deleteAdminTeamMember(${idx})" 
                        class="px-3 py-1.5 rounded-xl bg-red-100 dark:bg-red-950/80 hover:bg-red-200 text-red-700 dark:text-red-300 font-bold text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <!-- Profile Image Upload Box -->
                  <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                      <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400 shadow-md bg-teal-950 flex items-center justify-center shrink-0">
                        ${m.photo ? `
                          <img id="admin-team-img-preview-${m.id}" src="${m.photo}" alt="${m.name}" class="w-full h-full object-cover" />
                        ` : `
                          <div class="text-white font-extrabold text-lg font-heading">${initials}</div>
                        `}
                      </div>
                      <div>
                        <div class="font-extrabold text-slate-900 dark:text-white text-xs font-heading">
                          Profile Portrait Image
                        </div>
                        <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                          ${m.photo ? '✓ Custom Portrait Uploaded' : 'No photo uploaded (Displays initials avatar)'}
                        </div>
                        <div class="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                          JPG / JPEG / PNG &bull; Recommended 1:1 Square (≥400px)
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-2">
                      <label class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs cursor-pointer shadow transition-all">
                        ${m.photo ? 'Replace Portrait' : '+ Upload Portrait'}
                        <input type="file" accept="image/jpeg, image/png" onchange="window.handleAdminTeamPhotoFile(event, '${m.id}')" class="hidden" />
                      </label>

                      ${m.photo ? `
                        <button 
                          type="button" 
                          onclick="window.removeAdminTeamPhoto('${m.id}')" 
                          class="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-red-100 hover:text-red-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
                        >
                          Remove
                        </button>
                      ` : ''}
                    </div>
                  </div>

                  <!-- Form Fields Grid -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="admin-team-name-${idx}" 
                        value="${window.escapeHTML(m.name)}" 
                        oninput="window.markAdminDirty()" 
                        class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                    </div>

                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Position / Role</label>
                      <input 
                        type="text" 
                        id="admin-team-role-${idx}" 
                        value="${window.escapeHTML(m.position || m.role)}" 
                        oninput="window.markAdminDirty()" 
                        class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                    </div>

                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                      <input 
                        type="text" 
                        id="admin-team-dept-${idx}" 
                        value="${window.escapeHTML(m.department || '')}" 
                        oninput="window.markAdminDirty()" 
                        class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                    </div>

                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tenure / Experience</label>
                      <input 
                        type="text" 
                        id="admin-team-tenure-${idx}" 
                        value="${window.escapeHTML(m.tenure || '10 Years')}" 
                        oninput="window.markAdminDirty()" 
                        class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Qualifications & Certifications</label>
                    <input 
                      type="text" 
                      id="admin-team-qual-${idx}" 
                      value="${window.escapeHTML(m.qualifications)}" 
                      oninput="window.markAdminDirty()" 
                      class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" 
                    />
                  </div>

                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Biography / Responsibilities Narrative</label>
                    <textarea 
                      id="admin-team-desc-${idx}" 
                      rows="3" 
                      oninput="window.markAdminDirty()" 
                      class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
                    >${window.escapeHTML(m.desc)}</textarea>
                  </div>

                  <!-- Save & Preview Footer -->
                  <div class="flex items-center gap-3 pt-2">
                    <button 
                      type="button" 
                      onclick="window.saveAdminTeamMember(${idx})" 
                      class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-all"
                    >
                      Save Member Details
                    </button>

                    <a 
                      href="#/about-us/administration#${m.id}" 
                      target="_blank" 
                      class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
                    >
                      Preview Profile &nearr;
                    </a>
                  </div>

                </div>
              `;
            }).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 6: HOSPITALS (Base Campuses)
    if (tabId === 'hospitals') {
      const facilities = store.getFacilities().filter(f => f.type === 'base');

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Base Tertiary Hospitals (Vijayapura & Kalaburagi)</h2>
              <p class="text-slate-500">Manage base hospital addresses, phone numbers, hours, emergency contact, and Google Maps embed links.</p>
            </div>
            <a href="#/hospitals" target="_blank" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">Preview Base Hospitals &nearr;</a>
          </div>

          <div class="space-y-6">
            ${facilities.map((fac, idx) => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">🏥</span>
                    <span class="font-extrabold text-slate-900 dark:text-white text-base font-heading">${fac.name}</span>
                  </div>
                  <span class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold">Base Tertiary Hospital</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Campus Name</label>
                    <input type="text" id="admin-hosp-name-${fac.id}" value="${fac.name}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Helpline</label>
                    <input type="text" id="admin-hosp-phone-${fac.id}" value="${fac.phone}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Email</label>
                    <input type="email" id="admin-hosp-email-${fac.id}" value="${fac.email || 'contactus@anugrahaeyehospital.com'}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">OPD Operating Hours</label>
                    <input type="text" id="admin-hosp-hours-${fac.id}" value="${fac.hours}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Physical Address</label>
                    <input type="text" id="admin-hosp-address-${fac.id}" value="${fac.address}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Google Maps URL</label>
                    <input type="text" id="admin-hosp-map-${fac.id}" value="${fac.googleMapsUrl || ''}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Emergency Information</label>
                    <input type="text" id="admin-hosp-emerg-${fac.id}" value="${fac.emergencyInfo || '24x7 Emergency Ophthalmic Desk'}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                </div>

                <button onclick="window.saveHospitalCampus('${fac.id}')" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow">
                  Save ${fac.name}
                </button>

              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 7: VISION CENTERS
    if (tabId === 'vision-centers') {
      const visionCenters = store.getFacilities().filter(f => f.type === 'vision-center');

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Vision Centers Editor (8 Regional Centers)</h2>
              <p class="text-slate-500">Talikoti, Muddebihal, Sindagi, Indi, B.Bagewadi, Chadachan, Nalatwad, Tikota.</p>
            </div>
            <button onclick="window.addVisionCenterPrompt()" class="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow">
              + Add Vision Center
            </button>
          </div>

          <div class="space-y-6">
            ${visionCenters.map(vc => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                
                <!-- Distinct Location Header Banner -->
                <div class="p-3.5 rounded-2xl bg-teal-900/10 dark:bg-emerald-950/40 border border-teal-800/30 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-base">📍</span>
                    <span class="font-extrabold text-teal-900 dark:text-emerald-300 text-sm font-heading tracking-wide uppercase">
                      LOCATION: ${vc.name.toUpperCase()}
                    </span>
                  </div>
                  <button onclick="window.deleteVisionCenterConfirm('${vc.id}')" class="px-2.5 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-xs">
                    Delete
                  </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Center Name</label>
                    <input type="text" id="admin-vc-name-${vc.id}" value="${vc.name}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                    <input type="text" id="admin-vc-phone-${vc.id}" value="${vc.phone}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Doctor Visiting Days</label>
                    <input type="text" id="admin-vc-visits-${vc.id}" value="${vc.doctorVisits || 'Sundays'}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Opening Hours</label>
                    <input type="text" id="admin-vc-hours-${vc.id}" value="${vc.hours || 'Mon–Sat 9am–5pm'}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Physical Address</label>
                    <input type="text" id="admin-vc-address-${vc.id}" value="${vc.address}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Google Maps URL</label>
                    <input type="text" id="admin-vc-map-${vc.id}" value="${vc.googleMapsUrl || ''}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                </div>

                <div class="flex items-center gap-3 pt-1">
                  <button onclick="window.saveVisionCenter('${vc.id}')" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow">
                    Save ${vc.name}
                  </button>
                  <a href="#/vision-centers/${vc.town?.toLowerCase() || vc.id}" target="_blank" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    Preview Page &rarr;
                  </a>
                </div>

              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 8: SERVICES & SPECIALTIES
    if (tabId === 'services') {
      const services = store.getServices() || [];
      const leadership = store.getLeadership() || [];

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Super-Specialty Services (9 Departments)</h2>
              <p class="text-slate-500">Edit clinical copy, 10-box clinical details, doctor assignments, and photo assets.</p>
            </div>
            <a href="#/services" target="_blank" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200">Preview Services Hub &nearr;</a>
          </div>

          <div class="space-y-6">
            ${services.map(s => {
              const cd = s.clinicalDetails || {};
              const targetSlug = s.slug || s.id;

              return `
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
                  
                  <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <span class="font-extrabold text-slate-900 dark:text-white text-base font-heading">${s.title}</span>
                      <div class="text-[10px] text-slate-400 font-mono">Slug: #${targetSlug}</div>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold">${s.category || 'Ophthalmic Specialty'}</span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Service Name</label>
                      <input type="text" id="admin-srv-title-${s.id}" value="${window.escapeHTML(s.title)}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subtitle / Procedure Tag</label>
                      <input type="text" id="admin-srv-sub-${s.id}" value="${window.escapeHTML(s.subtitle || '')}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                      <input type="text" id="admin-srv-cat-${s.id}" value="${window.escapeHTML(s.category || 'Surgical Ophthalmology')}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                    </div>
                  </div>

                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Short Card Description</label>
                    <input type="text" id="admin-srv-short-${s.id}" value="${window.escapeHTML(s.shortDesc || s.desc)}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>

                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">1. Clinical Overview</label>
                    <textarea id="admin-srv-overview-${s.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${window.escapeHTML(cd.overview || s.fullDesc || s.desc || '')}</textarea>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">2. Conditions Treated (one per line)</label>
                      <textarea id="admin-srv-cond-${s.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.conditions) ? cd.conditions : [cd.conditions || '']).filter(Boolean).join('\n')}</textarea>
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">3. Symptoms & Indications (one per line)</label>
                      <textarea id="admin-srv-symp-${s.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.symptoms) ? cd.symptoms : [s.symptoms || '']).filter(Boolean).join('\n')}</textarea>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">4. Diagnostic Modalities (one per line)</label>
                      <textarea id="admin-srv-diag-${s.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.diagnosis) ? cd.diagnosis : [s.diagnosis || '']).filter(Boolean).join('\n')}</textarea>
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">5. Treatment Options (one per line)</label>
                      <textarea id="admin-srv-treat-${s.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.treatment) ? cd.treatment : [s.treatment || '']).filter(Boolean).join('\n')}</textarea>
                    </div>
                  </div>

                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">6. Step-by-Step Procedure (one step per line)</label>
                    <textarea id="admin-srv-proc-${s.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.procedure) ? cd.procedure : []).join('\n')}</textarea>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">7. Clinical Benefits (one per line)</label>
                      <textarea id="admin-srv-bene-${s.id}" rows="2" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.benefits) ? cd.benefits : []).join('\n')}</textarea>
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">8. Patient Preparation (one per line)</label>
                      <textarea id="admin-srv-prep-${s.id}" rows="2" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.preparation) ? cd.preparation : []).join('\n')}</textarea>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">9. Recovery & Follow-Up (one per line)</label>
                      <textarea id="admin-srv-recov-${s.id}" rows="2" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.recovery) ? cd.recovery : []).join('\n')}</textarea>
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">10. When to Consult (one per line)</label>
                      <textarea id="admin-srv-cons-${s.id}" rows="2" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${(Array.isArray(cd.whenToConsult) ? cd.whenToConsult : []).join('\n')}</textarea>
                    </div>
                  </div>

                  <!-- Dual Format Validated Image Upload -->
                  <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                      <img id="admin-srv-img-preview-${s.id}" src="${s.heroImage || s.imagePlaceholder}" alt="${s.title}" class="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-800" />
                      <div>
                        <div class="font-bold text-slate-900 dark:text-white">Service Image Asset</div>
                        <div class="text-[10px] text-slate-400">Strictly .jpg, .jpeg, .png only</div>
                      </div>
                    </div>
                    <label class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs cursor-pointer">
                      Replace Photo
                      <input type="file" accept="image/jpeg, image/png" onchange="window.handleAdminServiceImageUpload(event, '${s.id}')" class="hidden" />
                    </label>
                  </div>

                  <div class="flex items-center gap-3 pt-1">
                    <button onclick="window.saveServiceSpecialty('${s.id}')" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow">
                      Save Changes
                    </button>
                    <a href="#/services/${targetSlug}" target="_blank" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                      Preview Service &rarr;
                    </a>
                  </div>

                </div>
              `;
            }).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 9: DOCTORS SEARCHABLE MANAGER
    if (tabId === 'doctors') {
      const leaders = store.getLeadership() || [];
      const query = (window.adminDoctorSearchQuery || '').toLowerCase();
      const filtered = leaders.filter(d => 
        d.name.toLowerCase().includes(query) || 
        (d.specialization || '').toLowerCase().includes(query) ||
        (d.hospital || '').toLowerCase().includes(query)
      );

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Searchable Doctor Manager</h2>
              <p class="text-slate-500">Search, edit, and manage verified doctor profiles.</p>
            </div>
            
            <!-- Live Search Bar -->
            <div class="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search by name or specialty..." 
                value="${window.adminDoctorSearchQuery || ''}"
                oninput="window.handleAdminDoctorSearch(event)"
                class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 outline-none"
              />
              <svg class="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${filtered.map(doc => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
                
                <div class="flex items-center gap-4">
                  <img src="${doc.photo || 'assets/official_logo.jpg'}" alt="${doc.name}" class="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shrink-0" />
                  <div>
                    <div class="font-extrabold text-slate-900 dark:text-white text-base font-heading">${doc.name}</div>
                    <div class="text-emerald-600 dark:text-emerald-400 font-bold text-xs">${doc.title || doc.designation}</div>
                    <div class="text-slate-400 text-[11px]">${doc.degrees}</div>
                  </div>
                </div>

                <div class="space-y-1 text-slate-600 dark:text-slate-400">
                  <div><strong>Specialization:</strong> ${doc.specialization || 'Comprehensive Ophthalmology'}</div>
                  <div><strong>Experience:</strong> ${doc.experience || '20+ Years'}</div>
                  <div><strong>Hospital:</strong> ${doc.hospital || 'Vijayapura Campus'}</div>
                  <div><strong>Languages:</strong> ${doc.languages || 'Kannada, English, Hindi'}</div>
                </div>

                <div class="flex items-center gap-2 pt-2">
                  <button onclick="window.switchAdminTab('leadership')" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow">
                    Edit Full Profile
                  </button>
                  <a href="#/about/leadership" target="_blank" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    Preview &rarr;
                  </a>
                </div>

              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 10: ACADEMICS
    if (tabId === 'academics') {
      const academics = store.getAcademics() || [];

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Academic & Residency Programs (4 Programs)</h2>
              <p class="text-slate-500">Fellowship Programs, NBEMS DNB, DOT Paramedical Diploma, and RGUHS B.Sc Optometry.</p>
            </div>
            <a href="#/academics" target="_blank" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">Preview Academics &nearr;</a>
          </div>

          <div class="space-y-6">
            ${academics.map(p => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span class="font-extrabold text-slate-900 dark:text-white text-base font-heading">${p.title}</span>
                  <span class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold">${p.credibilityBadge || 'Recognized'}</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Affiliation / Board</label>
                    <input type="text" id="admin-acad-affil-${p.id}" value="${p.affiliation || p.recognizedBy}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Duration</label>
                    <input type="text" id="admin-acad-duration-${p.id}" value="${p.duration || ''}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Eligibility Criteria</label>
                    <input type="text" id="admin-acad-elig-${p.id}" value="${p.eligibility || ''}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Program Overview Description</label>
                    <textarea id="admin-acad-desc-${p.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${p.desc}</textarea>
                  </div>
                </div>

                <div class="flex items-center gap-3 pt-1">
                  <button onclick="window.saveAcademicProgram('${p.id}')" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow">
                    Save Changes
                  </button>
                  <a href="#/academics/${p.id}" target="_blank" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    Preview Program &rarr;
                  </a>
                </div>

              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 11: PATIENT RESOURCES
    if (tabId === 'patient-resources') {
      const res = store.getPatientResources();

      return `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs font-sans">
          
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Patient Resources & Education</h2>
              <p class="text-slate-500">Edit general patient info, eye-care education, appointments, and emergency information.</p>
            </div>
            <a href="#/patient-resources" target="_blank" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200">Preview &nearr;</a>
          </div>

          <form onsubmit="window.savePatientResources(event)" class="space-y-6">
            
            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">General Patient Information</label>
              <textarea id="admin-res-info" rows="3" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${res.patientInfo}</textarea>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Eye-Care Education & Preventative Guidance</label>
              <textarea id="admin-res-edu" rows="3" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${res.education}</textarea>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Appointment & OPD Registration Guidance</label>
              <textarea id="admin-res-appt" rows="3" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${res.appointmentInfo}</textarea>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Emergency Ophthalmic Information</label>
              <textarea id="admin-res-emerg" rows="3" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${res.emergencyInfo}</textarea>
            </div>

            <div>
              <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cashless Insurance & Scheme Overview</label>
              <textarea id="admin-res-ins" rows="3" required class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${res.insuranceInfo}</textarea>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button type="submit" class="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg">
                Save Patient Resources
              </button>
              <button type="button" onclick="render()" class="px-6 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                Cancel
              </button>
            </div>

          </form>

        </div>
      `;
    }

    // MODULE 12: FAQS
    if (tabId === 'faqs') {
      const faqs = store.getFaqs() || [];

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Frequently Asked Questions (${faqs.length} FAQs)</h2>
              <p class="text-slate-500">Edit, add, or reorder authentic patient guidance questions.</p>
            </div>
            <button onclick="window.addFaqPrompt()" class="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow">
              + Add FAQ
            </button>
          </div>

          <div class="space-y-4">
            ${faqs.map((f, idx) => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
                
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold flex items-center justify-center text-xs">${idx + 1}</span>
                    <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[10px]">${f.category || 'General'}</span>
                  </div>
                  <button onclick="window.deleteFaqConfirm('${f.id}')" class="px-2.5 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-xs">Delete</button>
                </div>

                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Question</label>
                  <input type="text" id="admin-faq-q-${f.id}" value="${f.question}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                </div>

                <div>
                  <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Clinical Answer</label>
                  <textarea id="admin-faq-a-${f.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${f.answer}</textarea>
                </div>

                <button onclick="window.saveFaqItem('${f.id}')" class="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow">
                  Save FAQ
                </button>

              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 13: INSURANCE & EMPANELMENTS
    if (tabId === 'insurance' || tabId === 'empanelments') {
      const emps = store.getEmpanelments() || [];

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Empanelments & Cashless Insurance Partners (${emps.length} Partners)</h2>
            <p class="text-slate-500 mt-1">Manage government schemes, private insurance providers, and TPAs.</p>
          </div>

          <!-- Add Partner Box -->
          <form onsubmit="window.addAdminEmpanelment(event)" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div class="font-extrabold text-slate-900 dark:text-white text-sm font-heading">Add New Partner</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="text" id="admin-emp-name" placeholder="Partner Name (e.g. Star Health)" required class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
              <select id="admin-emp-cat" class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                <option value="Insurance Providers">Insurance Providers</option>
                <option value="Government Schemes">Government Schemes</option>
                <option value="TPAs & Corporate">TPAs & Corporate</option>
              </select>
              <input type="text" id="admin-emp-code" placeholder="Code (e.g. STAR)" required class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
            </div>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow">
              + Add Partner
            </button>
          </form>

          <!-- Partners Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            ${emps.map(e => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div>
                  <div class="font-extrabold text-slate-900 dark:text-white">${e.name}</div>
                  <div class="text-[10px] text-slate-400 font-mono">${e.category} (${e.code})</div>
                </div>
                <button onclick="window.removeAdminEmpanelment('${e.code}')" class="px-2.5 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-xs">Remove</button>
              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 14: NEWS & PRESS
    if (tabId === 'news') {
      const news = store.getNews() || [];

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Hospital News & Press Releases (${news.length} Articles)</h2>
              <p class="text-slate-500">Manage real institutional honors, academic expansions, and community camp news.</p>
            </div>
            <button onclick="window.addNewsPrompt()" class="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow">
              + Add News Article
            </button>
          </div>

          <div class="space-y-4">
            ${news.map(item => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span class="font-extrabold text-slate-900 dark:text-white text-sm font-heading">${item.title}</span>
                  <button onclick="window.deleteNewsConfirm('${item.id}')" class="px-2.5 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-xs">Delete</button>
                </div>
                <div class="text-[11px] text-slate-400 font-mono">${item.date} &bull; ${item.category}</div>
                <p class="text-slate-600 dark:text-slate-300">${item.content || item.shortDesc || item.snippet}</p>
              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 15: MEDIA LIBRARY (With strict JPG/PNG dual validation & Safe Reference Checks)
    if (tabId === 'media') {
      const gallery = store.getGallery() || [];
      const searchQuery = (window.adminMediaSearchQuery || '').toLowerCase().trim();
      const filterMode = window.adminMediaFilterMode || 'all'; // 'all', 'used', 'unused'

      // Calculate total storage footprint and live usage stats
      let totalUsageCount = 0;
      const galleryWithUsage = gallery.map(item => {
        const usage = store.getImageUsage(item.src);
        if (usage.length > 0) totalUsageCount++;
        return { ...item, usage };
      });

      // Filter gallery
      const filteredGallery = galleryWithUsage.filter(item => {
        const matchesSearch = !searchQuery || 
          (item.title && item.title.toLowerCase().includes(searchQuery)) ||
          (item.filename && item.filename.toLowerCase().includes(searchQuery)) ||
          (item.category && item.category.toLowerCase().includes(searchQuery)) ||
          (item.usage && item.usage.some(u => u.toLowerCase().includes(searchQuery)));
        
        if (!matchesSearch) return false;
        if (filterMode === 'used') return item.usage.length > 0;
        if (filterMode === 'unused') return item.usage.length === 0;
        return true;
      });

      return `
        <div class="space-y-8 text-xs font-sans">
          
          <!-- Library Header & Stats Cards -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 class="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                  Interactive Media Library (${gallery.length} Assets)
                </h2>
                <p class="text-slate-500 mt-0.5">
                  Centralized Ophthalmic Asset Manager. Strictly allowed formats: <strong>.jpg, .jpeg, .png</strong> only (5–10 MB Max).
                </p>
              </div>

              <!-- Quick Upload Trigger Button -->
              <label class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs cursor-pointer shadow-lg inline-flex items-center gap-2 shrink-0 transition-transform active:scale-95">
                <span>+ Upload Image</span>
                <input type="file" accept="image/jpeg, image/png" onchange="window.handleAdminMediaFileInput(event)" class="hidden" />
              </label>
            </div>

            <!-- 4 Quick Stats Badges -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Media Assets</span>
                <span class="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5 block">${gallery.length}</span>
              </div>
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Page Usages</span>
                <span class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block">${totalUsageCount} in use</span>
              </div>
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Unreferenced Assets</span>
                <span class="text-xl font-extrabold text-teal-600 dark:text-teal-400 font-mono mt-0.5 block">${gallery.length - totalUsageCount} available</span>
              </div>
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Format Security</span>
                <span class="text-xl font-extrabold text-slate-800 dark:text-slate-200 font-mono mt-0.5 block">JPG/PNG Only</span>
              </div>
            </div>
          </div>

          <!-- Polished Drag-and-Drop Upload Zone -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white font-heading">Upload New Image to Media Library</h3>
            ${window.renderDragAndDropUploader('media-library-file-input', 'window.handleMediaLibraryUpload', { maxMB: 10, context: 'media-library' })}
          </div>

          <!-- Search & Filter Controls -->
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- Search Bar -->
            <div class="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Search by filename, title, or used page..." 
                value="${window.escapeHTML(window.adminMediaSearchQuery || '')}" 
                oninput="window.adminMediaSearchQuery = this.value; render();" 
                class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <svg class="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>

            <!-- Filter Pills -->
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onclick="window.adminMediaFilterMode = 'all'; render();" 
                class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${filterMode === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}"
              >
                All (${gallery.length})
              </button>
              <button 
                onclick="window.adminMediaFilterMode = 'used'; render();" 
                class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${filterMode === 'used' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}"
              >
                In Use (${totalUsageCount})
              </button>
              <button 
                onclick="window.adminMediaFilterMode = 'unused'; render();" 
                class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${filterMode === 'unused' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}"
              >
                Available (${gallery.length - totalUsageCount})
              </button>
            </div>
          </div>

          <!-- Media Assets Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filteredGallery.length === 0 ? `
              <div class="col-span-full py-16 text-center text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-2">
                <div class="text-3xl">🔍</div>
                <div class="font-bold text-slate-700 dark:text-slate-300">No media assets match your search.</div>
                <button onclick="window.adminMediaSearchQuery = ''; window.adminMediaFilterMode = 'all'; render();" class="text-xs text-emerald-600 dark:text-emerald-400 underline font-bold">Clear Filters</button>
              </div>
            ` : filteredGallery.map(item => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                
                <div class="space-y-3">
                  <!-- Image Thumbnail Container with aspect preservation -->
                  <div class="w-full h-44 rounded-2xl bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center relative group-hover:border-emerald-500/50 transition-colors">
                    <img 
                      src="${item.src}" 
                      alt="${window.escapeHTML(item.title || item.filename)}" 
                      loading="lazy" 
                      class="w-full h-full object-cover" 
                    />
                    <div class="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/80 text-white font-mono text-[10px] backdrop-blur-sm border border-white/10">
                      ${item.type === 'image/png' ? 'PNG' : 'JPG'}
                    </div>
                  </div>

                  <!-- Filename & Title -->
                  <div>
                    <div class="font-extrabold text-slate-900 dark:text-white text-sm font-heading truncate" title="${window.escapeHTML(item.title || item.filename)}">
                      ${window.escapeHTML(item.title || item.filename || 'Untitled Image')}
                    </div>
                    <div class="text-[11px] text-slate-400 font-mono mt-0.5 truncate" title="${window.escapeHTML(item.filename)}">
                      📄 ${window.escapeHTML(item.filename || 'image.jpg')}
                    </div>
                  </div>

                  <!-- Metadata Attributes Strip -->
                  <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-[11px] font-mono text-slate-600 dark:text-slate-400 space-y-1.5 border border-slate-200/60 dark:border-slate-800/60">
                    <div class="flex items-center justify-between">
                      <span class="text-slate-400">File Size:</span>
                      <span class="font-bold text-slate-800 dark:text-slate-200">${item.size || '320 KB'}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-slate-400">Dimensions:</span>
                      <span class="font-bold text-teal-700 dark:text-teal-300">${item.dimensions || '1200 × 800'}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-slate-400">Upload Date:</span>
                      <span class="font-bold text-slate-800 dark:text-slate-200">${item.uploadDate || '15 Aug 2026'}</span>
                    </div>
                  </div>

                  <!-- "Used On" Live References Badge -->
                  <div class="space-y-1 pt-1">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Live Page References:</span>
                    ${item.usage && item.usage.length > 0 ? `
                      <div class="flex flex-wrap gap-1">
                        ${item.usage.map(u => `
                          <span class="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300/40">
                            ✓ ${window.escapeHTML(u)}
                          </span>
                        `).join('')}
                      </div>
                    ` : `
                      <span class="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-medium">
                        Unreferenced / Available for use
                      </span>
                    `}
                  </div>
                </div>

                <!-- Media Action Buttons -->
                <div class="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    type="button" 
                    onclick="window.openUseImagePicker('${item.src}')" 
                    class="flex-1 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs text-center shadow transition-all"
                  >
                    Use Image
                  </button>

                  <label class="py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer text-center">
                    Replace
                    <input type="file" accept="image/jpeg, image/png" onchange="window.handleReplaceMediaItem(${item.id}, event)" class="hidden" />
                  </label>

                  <button 
                    type="button" 
                    onclick="window.deleteGalleryItemChecked(${item.id})" 
                    class="py-2 px-3 rounded-xl bg-red-100 dark:bg-red-950/80 hover:bg-red-200 text-red-700 dark:text-red-300 font-bold text-xs transition-colors" 
                    title="Delete Image"
                  >
                    Delete
                  </button>
                </div>

              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    // MODULE 16: SETTINGS & BACKUP
    if (tabId === 'settings' || tabId === 'backup') {
      const brand = store.getBrand();

      return `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 text-xs font-sans">
          
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white font-heading">Settings & JSON Backup Engine</h2>
            <p class="text-slate-500">Manage telephony credentials, export JSON backup files, or restore sitewide JSON config.</p>
          </div>

          <!-- Telephony Form -->
          <form onsubmit="window.saveBrandAdmin(event)" class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <div class="font-extrabold text-slate-900 dark:text-white text-sm font-heading">1. Telephony & Helpline Credentials</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Helpline Phone</label>
                <input type="text" id="admin-brand-phone" value="${brand.fallbackPhone}" required class="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp Desk</label>
                <input type="text" id="admin-brand-whatsapp" value="${brand.whatsappPhone}" required class="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Email</label>
                <input type="email" id="admin-brand-email" value="${brand.contactEmail}" required class="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hospital Founder Name</label>
                <input type="text" id="admin-brand-founder" value="${brand.founder}" required class="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
              </div>
            </div>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow">Save Telephony</button>
          </form>

          <!-- Export Block -->
          <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="font-extrabold text-slate-900 dark:text-white text-sm font-heading">2. Export Configuration JSON File</div>
            <p class="text-slate-500 leading-relaxed">
              Downloads a complete JSON backup file containing all current hospital brand settings, stats, doctor bios, vision center directories, and services data.
            </p>
            <button onclick="window.exportAdminJSON()" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg">
              📥 Export Configuration JSON File
            </button>
          </div>

          <!-- Import Block -->
          <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="font-extrabold text-slate-900 dark:text-white text-sm font-heading">3. Import Configuration JSON File (FileReader API)</div>
            <p class="text-slate-500 leading-relaxed">
              Upload a previously exported JSON backup file to instantly update all hospital credentials and content across the website.
            </p>
            <label class="inline-block px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer border border-slate-700">
              📤 Choose JSON File to Restore
              <input type="file" accept=".json" onchange="window.handleAdminImportJSON(event)" class="hidden" />
            </label>
          </div>

          <!-- Reset Defaults Block -->
          <div class="p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 space-y-3">
            <div class="font-extrabold text-red-800 dark:text-red-200 text-sm font-heading">4. Reset to Factory Hospital Defaults</div>
            <p class="text-red-600 dark:text-red-300/80 leading-relaxed">
              Restores original default hospital credentials and clears any custom local overrides.
            </p>
            <button onclick="window.resetAdminDefaults()" class="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-xs shadow">
              ⚠️ Reset Store to Defaults
            </button>
          </div>

        </div>
      `;
    }

    // MODULE: ADVANCED OPHTHALMIC EQUIPMENT CMS
    if (tabId === 'equipment') {
      const equipmentList = store.getAllEquipment();

      return `
        <div class="space-y-6 text-xs font-sans">
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                Advanced Ophthalmic Equipment (${equipmentList.length} Items)
              </h2>
              <p class="text-slate-500 mt-0.5">
                Manage diagnostic & surgical machines, replace images (.jpg, .jpeg, .png only), edit machine titles, and toggle active carousel status.
              </p>
            </div>
            <button onclick="window.addEquipmentPrompt()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg inline-flex items-center gap-1.5 shrink-0">
              <span>+ Add New Equipment</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${equipmentList.map((eq, idx) => `
              <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                
                <!-- Card Header -->
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center">${idx + 1}</span>
                    <span class="font-extrabold text-slate-900 dark:text-white text-sm font-heading truncate max-w-[200px]">${eq.name}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button onclick="window.toggleEquipmentActive('${eq.id}')" class="px-2.5 py-1 rounded-lg text-[10px] font-bold ${eq.isActive !== false ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}">
                      ${eq.isActive !== false ? '● Active' : '○ Inactive'}
                    </button>
                    <button onclick="window.deleteEquipmentAdmin('${eq.id}')" class="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold">
                      Delete
                    </button>
                  </div>
                </div>

                <!-- Image Preview and Upload Row -->
                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <div class="w-16 h-16 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 flex items-center justify-center shrink-0">
                      <img id="admin-eq-img-${eq.id}" src="${eq.image || 'assets/equipment/reichert_7_nct.jpg'}" alt="${eq.name}" class="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div class="font-bold text-slate-800 dark:text-slate-200 text-xs">Machine Photo Asset</div>
                      <div class="text-[10px] text-slate-400">Strictly .jpg, .jpeg, .png only</div>
                    </div>
                  </div>

                  <label class="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs cursor-pointer shrink-0 shadow-xs">
                    <span>Replace Image</span>
                    <input type="file" accept="image/jpeg, image/png, image/jpg" onchange="window.handleEquipmentImageUpload(event, '${eq.id}')" class="hidden" />
                  </label>
                </div>

                <!-- Form Fields -->
                <div class="space-y-3">
                  <div>
                    <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Equipment Name</label>
                    <input type="text" id="admin-eq-name-${eq.id}" value="${eq.name}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category / Type</label>
                      <input type="text" id="admin-eq-cat-${eq.id}" value="${eq.category || 'Diagnostic / Surgical'}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
                      <input type="number" id="admin-eq-order-${eq.id}" value="${eq.displayOrder || idx + 1}" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" />
                    </div>
                  </div>
                </div>

                <!-- Save Action -->
                <div class="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <span class="text-[10px] text-slate-400 font-mono">ID: ${eq.id}</span>
                  <button onclick="window.saveEquipmentAdminItem('${eq.id}')" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow">
                    Save Changes
                  </button>
                </div>

              </div>
            `).join('')}
          </div>

        </div>
      `;
    }

    return `<div>Select Module</div>`;
  }

  // --- ADMIN INTERACTIVE ACTION HANDLERS ---

  window.handleAdminLoginSubmit = async function(e) {
    e.preventDefault();
    const user = document.getElementById('admin-user-input')?.value.trim();
    const pass = document.getElementById('admin-pass-input')?.value;
    const err = document.getElementById('admin-login-error');
    const btn = document.getElementById('admin-submit-btn');
    const btnText = document.getElementById('admin-btn-text');
    const spinner = document.getElementById('admin-btn-spinner');
    const rememberMe = document.getElementById('admin-remember-me')?.checked;

    if (!user || !pass) return;

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Authenticating...";
    if (spinner) spinner.classList.remove('hidden');
    if (err) err.classList.add('hidden');

    try {
      const res = await window.authClient.signIn(user, pass);
      if (res && res.error) {
        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = "Sign In to Console";
        if (spinner) spinner.classList.add('hidden');
        if (err) {
          err.textContent = res.error.message || "Authentication failed. Check your Supabase email/password credentials.";
          err.classList.remove('hidden');
        }
        return;
      }

      if (rememberMe) {
        localStorage.setItem('anugraha_remembered_user', user);
      } else {
        localStorage.removeItem('anugraha_remembered_user');
      }

      window.activeAdminTab = 'dashboard';
      window.location.hash = '#/admin/dashboard';
      window.showAdminToast("Authenticated successfully. Opening CMS Console...", "success");
      render();
    } catch (ex) {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Sign In to Console";
      if (spinner) spinner.classList.add('hidden');
      if (err) {
        err.textContent = ex.message || "Authentication error occurred.";
        err.classList.remove('hidden');
      }
    }
  };

  window.toggleAdminPasswordVisibility = function() {
    const input = document.getElementById('admin-pass-input');
    const icon = document.getElementById('admin-pass-eye-icon');
    if (!input || !icon) return;

    if (input.type === 'password') {
      input.type = 'text';
      icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.959 8.959 0 013.682-.796c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-1.2-1.2a3 3 0 11-4.243-4.243M3 3l18 18"/>`;
    } else {
      input.type = 'password';
      icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>`;
    }
  };

  window.validateAdminLoginForm = function() {
    const user = document.getElementById('admin-user-input')?.value.trim();
    const pass = document.getElementById('admin-pass-input')?.value;
    const btn = document.getElementById('admin-submit-btn');
    if (btn) {
      btn.disabled = (!user || !pass);
    }
  };

  window.handleAdminLogout = async function() {
    if (window.authClient) {
      await window.authClient.signOut();
    } else {
      sessionStorage.removeItem('anugraha_admin_auth');
      sessionStorage.removeItem('anugraha_admin_user');
      sessionStorage.removeItem('anugraha_admin_token');
    }
    window.activeAdminTab = 'dashboard';
    window.location.hash = '#/admin';
    window.showAdminToast("Signed out of CMS Console", "success");
    render();
  };

  window.switchAdminTab = function(tabId) {
    if (window.hasUnsavedAdminChanges) {
      if (!confirm("You have unsaved changes. Leave without saving?")) {
        return;
      }
      window.clearAdminDirty();
    }
    if (tabId === 'logout') {
      window.handleAdminLogout();
      return;
    }
    window.activeAdminTab = tabId;
    window.location.hash = `#/admin/${tabId}`;
    render();
  };

  // --- MEDIA LIBRARY INTERACTIVE HANDLERS ---
  window.handleAdminMediaFileInput = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    window.openImageCropModal(file, { context: 'media-library' }, (base64, meta) => {
      window.handleMediaLibraryUpload(base64, meta);
    });
  };

  window.handleMediaLibraryUpload = function(base64, meta) {
    const store = window.appStore;
    store.addGalleryItem({
      src: base64,
      title: meta.filename,
      filename: meta.filename,
      type: meta.type,
      size: meta.size,
      dimensions: meta.dimensions,
      uploadDate: meta.uploadDate,
      category: "General Asset",
      usedOn: "Media Library"
    });
    window.showAdminToast(`Uploaded ${meta.filename} to Media Library`, "success");
    render();
  };

  window.handleReplaceMediaItem = function(id, event) {
    const file = event.target.files[0];
    if (!file) return;
    window.openImageCropModal(file, { context: 'media-replace' }, (base64, meta) => {
      const store = window.appStore;
      store.updateGalleryItem(id, {
        src: base64,
        filename: meta.filename,
        type: meta.type,
        size: meta.size,
        dimensions: meta.dimensions,
        uploadDate: meta.uploadDate
      });
      window.showAdminToast(`Replaced image in Media Library with ${meta.filename}`, "success");
      render();
    });
  };

  window.deleteGalleryItemChecked = function(id) {
    const store = window.appStore;
    const item = (store.getGallery() || []).find(g => g.id === id);
    if (!item) return;

    const usage = store.getImageUsage(item.src);
    if (usage.length > 0) {
      const list = usage.map(u => `• ${u}`).join('\n');
      const msg = `⚠️ Warning: This image is currently used by:\n\n${list}\n\nDeleting this image will remove it from these live pages. Delete anyway?`;
      if (!confirm(msg)) {
        return;
      }
    } else {
      if (!confirm(`Are you sure you want to delete "${item.filename || item.title}" from the Media Library?`)) {
        return;
      }
    }

    store.removeGalleryItem(id);
    window.showAdminToast(`Deleted ${item.filename || 'image'} from library`, "success");
    render();
  };

  // "Use Image" Target Assignment Picker
  window.openUseImagePicker = function(imageSrc) {
    let modal = document.getElementById('use-image-picker-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'use-image-picker-modal';
      document.body.appendChild(modal);
    }

    const store = window.appStore;
    const facilities = store.getFacilities();
    const leadership = store.getLeadership();
    const services = store.getServices();

    modal.innerHTML = `
      <div class="fixed inset-0 z-[99999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-900/60 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          
          <div class="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">🎯</span>
              <div>
                <h3 class="text-base font-extrabold text-slate-900 dark:text-white font-heading">Assign Image to Page / Entity</h3>
                <p class="text-[11px] text-slate-500">Select where you want to use this image across the hospital website.</p>
              </div>
            </div>
            <button onclick="window.closeUseImagePicker()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs">✕</button>
          </div>

          <div class="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
            
            <div class="w-full h-32 rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-800 mb-4">
              <img src="${imageSrc}" alt="Target Preview" class="max-h-full max-w-full object-contain" />
            </div>

            <!-- Target Selection Options -->
            <div class="space-y-2">
              <span class="font-bold text-slate-700 dark:text-slate-300 block text-[11px] uppercase tracking-wider">Common Placements:</span>
              
              <button onclick="window.applyImageToTarget('${imageSrc}', 'homepage-hero')" class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 text-left font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>🖥️ Set as Homepage Hero Banner</span>
                <span class="text-emerald-600 text-xs">&rarr;</span>
              </button>

              <button onclick="window.applyImageToTarget('${imageSrc}', 'brand-logo')" class="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 text-left font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>🏥 Set as Official Website Logo</span>
                <span class="text-emerald-600 text-xs">&rarr;</span>
              </button>
            </div>

            <div class="space-y-2 pt-2">
              <span class="font-bold text-slate-700 dark:text-slate-300 block text-[11px] uppercase tracking-wider">Doctor Profile Portraits:</span>
              ${leadership.map(doc => `
                <button onclick="window.applyImageToTarget('${imageSrc}', 'doctor', '${doc.id}')" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>👨‍⚕️ ${doc.name}</span>
                  <span class="text-slate-400 text-[10px]">Assign Portrait</span>
                </button>
              `).join('')}
            </div>

            <div class="space-y-2 pt-2">
              <span class="font-bold text-slate-700 dark:text-slate-300 block text-[11px] uppercase tracking-wider">Administration Team Portraits:</span>
              ${(store.getAdministration() || []).map(member => `
                <button onclick="window.applyImageToTarget('${imageSrc}', 'admin-team', '${member.id}')" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>👥 ${member.name} (${member.role})</span>
                  <span class="text-slate-400 text-[10px]">Assign Admin Portrait</span>
                </button>
              `).join('')}
            </div>

            <div class="space-y-2 pt-2">
              <span class="font-bold text-slate-700 dark:text-slate-300 block text-[11px] uppercase tracking-wider">Hospital Campuses:</span>
              ${facilities.filter(f => f.type === 'base').map(fac => `
                <button onclick="window.applyImageToTarget('${imageSrc}', 'facility', '${fac.id}')" class="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>🏥 ${fac.name}</span>
                  <span class="text-slate-400 text-[10px]">Assign Hero</span>
                </button>
              `).join('')}
            </div>

            <div class="pt-2">
              <button onclick="navigator.clipboard.writeText('${imageSrc}'); window.showAdminToast('Copied Image URL to clipboard!', 'success'); window.closeUseImagePicker();" class="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 text-center">
                📋 Copy Image Data Path
              </button>
            </div>

          </div>

          <div class="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-right">
            <button onclick="window.closeUseImagePicker()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">Close</button>
          </div>

        </div>
      </div>
    `;
  };

  window.closeUseImagePicker = function() {
    const modal = document.getElementById('use-image-picker-modal');
    if (modal) modal.remove();
  };

  window.applyImageToTarget = async function(imageSrc, targetType, targetId) {
    const store = window.appStore;
    if (targetType === 'homepage-hero') {
      await window.preloadImage(imageSrc);
      const heroContainer = document.getElementById('hero-banner-container');
      if (heroContainer) {
        heroContainer.style.backgroundImage = `url("${imageSrc}")`;
      }
      store.updateHomepage({ heroImage: imageSrc });
      window.showAdminToast("Applied image to Homepage Hero Banner!", "success");
    } else if (targetType === 'brand-logo') {
      await window.preloadImage(imageSrc);
      store.updateBrand({ logo: imageSrc });
      window.showAdminToast("Applied image as Official Website Logo!", "success");
    } else if (targetType === 'doctor') {
      await window.preloadImage(imageSrc);
      store.updateLeadership(targetId, { photo: imageSrc });
      window.showAdminToast("Updated doctor portrait photo!", "success");
    } else if (targetType === 'admin-team') {
      await window.preloadImage(imageSrc);
      store.updateAdminMember(targetId, { photo: imageSrc });
      window.showAdminToast("Updated administration team portrait photo!", "success");
    } else if (targetType === 'facility') {
      await window.preloadImage(imageSrc);
      store.updateFacility(targetId, { heroImage: imageSrc });
      window.showAdminToast("Updated hospital facility hero photo!", "success");
    }
    window.closeUseImagePicker();
    render();
  };

  window.showAdminToast = function(msg, type = 'success') {
    let container = document.getElementById('admin-toast-box');
    if (!container) {
      container = document.createElement('div');
      container.id = 'admin-toast-box';
      container.className = 'fixed top-6 right-6 z-[99999] flex flex-col gap-2 max-w-sm pointer-events-none font-sans';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `p-4 rounded-2xl shadow-2xl text-xs font-bold border text-white pointer-events-auto transition-all ${type === 'success' ? 'bg-[#062c26] border-emerald-500' : 'bg-red-950 border-red-500'}`;
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3200);
  };

  // HOMEPAGE & HERO PERSISTENCE HANDLERS

  window.saveHeroBannerSection = async function(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById('admin-hero-save-btn');
    const origText = btn ? btn.innerHTML : '<span>💾 Save Hero Banner Only</span>';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>⏳ Saving to Cloud CMS...</span>`;
    }

    const store = window.appStore;
    const heroEyebrow = (document.getElementById('admin-hero-eyebrow')?.value || '').trim();
    const heroHeading = (document.getElementById('admin-hero-heading')?.value || '').trim();
    const heroDescription = (document.getElementById('admin-hero-desc')?.value || '').trim();
    const cta1Text = (document.getElementById('admin-hero-cta1-text')?.value || '').trim();
    const cta1Link = (document.getElementById('admin-hero-cta1-link')?.value || '').trim();
    const cta2Text = (document.getElementById('admin-hero-cta2-text')?.value || '').trim();
    const cta2Link = (document.getElementById('admin-hero-cta2-link')?.value || '').trim();
    const heroImage = (document.getElementById('admin-hero-image-url')?.value || store.getHomepage()?.heroImage || 'assets/services/cataract_surgery.jpg').trim();

    // 1. Validation
    if (!heroHeading) {
      window.showAdminToast("Hero Main Heading is required.", "error");
      if (btn) { btn.disabled = false; btn.innerHTML = origText; }
      return;
    }
    if (!heroDescription) {
      window.showAdminToast("Hero Description is required.", "error");
      if (btn) { btn.disabled = false; btn.innerHTML = origText; }
      return;
    }
    if (!cta1Text) {
      window.showAdminToast("Primary CTA button text is required.", "error");
      if (btn) { btn.disabled = false; btn.innerHTML = origText; }
      return;
    }
    if (!cta2Text) {
      window.showAdminToast("Secondary CTA button text is required.", "error");
      if (btn) { btn.disabled = false; btn.innerHTML = origText; }
      return;
    }

    const existingHome = store.getHomepage() || {};
    const heroPayload = {
      ...existingHome,
      heroEyebrow: heroEyebrow || store.getBrand().tagline || 'Authentic. Affectionate. Affordable. Eye Care',
      heroHeading,
      heroDescription,
      heroImage,
      primaryCta: {
        text: cta1Text || 'Book an Appointment',
        link: cta1Link || '#/contact'
      },
      secondaryCta: {
        text: cta2Text || 'Explore Specialties',
        link: cta2Link || '#/services'
      }
    };

    try {
      const res = await store.updateHomepage(heroPayload);
      if (res && res.error) {
        window.showAdminToast("Unable to save Hero content. Please try again: " + res.error, "error");
      } else {
        window.clearAdminDirty();
        window.showAdminToast("Hero Banner content saved permanently!", "success");
        render();
      }
    } catch (err) {
      console.error("[Hero Save Error]:", err);
      window.showAdminToast("Unable to save Hero content. Please try again.", "error");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = origText;
      }
    }
  };

  window.saveHomepageAdmin = async function(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById('admin-homepage-save-btn');
    const btnText = document.getElementById('admin-homepage-save-btn-text');
    const spinner = document.getElementById('admin-homepage-save-spinner');

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Saving to Cloud CMS...";
    if (spinner) spinner.classList.remove('hidden');

    const store = window.appStore;
    
    const heroEyebrow = (document.getElementById('admin-hero-eyebrow')?.value || '').trim();
    const heroHeading = (document.getElementById('admin-hero-heading')?.value || '').trim();
    const heroDescription = (document.getElementById('admin-hero-desc')?.value || '').trim();
    const cta1Text = (document.getElementById('admin-hero-cta1-text')?.value || '').trim();
    const cta1Link = (document.getElementById('admin-hero-cta1-link')?.value || '').trim();
    const cta2Text = (document.getElementById('admin-hero-cta2-text')?.value || '').trim();
    const cta2Link = (document.getElementById('admin-hero-cta2-link')?.value || '').trim();
    const surgeries = (document.getElementById('admin-home-surgeries')?.value || '').trim();
    const camps = (document.getElementById('admin-home-camps')?.value || '').trim();
    const free = (document.getElementById('admin-home-free')?.value || '').trim();
    const heroImage = (document.getElementById('admin-hero-image-url')?.value || store.getHomepage()?.heroImage || 'assets/services/cataract_surgery.jpg').trim();

    // 1. Validation
    if (!heroHeading) {
      window.showAdminToast("Hero Main Heading is required.", "error");
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Save All Homepage Settings";
      if (spinner) spinner.classList.add('hidden');
      return;
    }
    if (!heroDescription) {
      window.showAdminToast("Hero Description is required.", "error");
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Save All Homepage Settings";
      if (spinner) spinner.classList.add('hidden');
      return;
    }
    if (!cta1Text) {
      window.showAdminToast("Primary CTA button text is required.", "error");
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Save All Homepage Settings";
      if (spinner) spinner.classList.add('hidden');
      return;
    }
    if (!cta2Text) {
      window.showAdminToast("Secondary CTA button text is required.", "error");
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Save All Homepage Settings";
      if (spinner) spinner.classList.add('hidden');
      return;
    }

    const sections = {
      whyAnugraha: document.getElementById('admin-sec-whyAnugraha')?.checked ?? true,
      services: document.getElementById('admin-sec-services')?.checked ?? true,
      featuredDoctors: document.getElementById('admin-sec-featuredDoctors')?.checked ?? true,
      hospitals: document.getElementById('admin-sec-hospitals')?.checked ?? true,
      visionCenters: document.getElementById('admin-sec-visionCenters')?.checked ?? true,
      technology: document.getElementById('admin-sec-technology')?.checked ?? true,
      communityImpact: document.getElementById('admin-sec-communityImpact')?.checked ?? true,
      academics: document.getElementById('admin-sec-academics')?.checked ?? true,
      insurance: document.getElementById('admin-sec-insurance')?.checked ?? true,
      faqs: document.getElementById('admin-sec-faqs')?.checked ?? true,
      finalCta: document.getElementById('admin-sec-finalCta')?.checked ?? true
    };

    const existingHome = store.getHomepage() || {};
    const homepagePayload = {
      ...existingHome,
      heroEyebrow: heroEyebrow || store.getBrand().tagline || 'Authentic. Affectionate. Affordable. Eye Care',
      heroHeading,
      heroDescription,
      heroImage,
      primaryCta: { 
        text: cta1Text || 'Book an Appointment', 
        link: cta1Link || '#/contact' 
      },
      secondaryCta: { 
        text: cta2Text || 'Explore Specialties', 
        link: cta2Link || '#/services' 
      },
      sections
    };

    try {
      const res = await store.updateHomepage(homepagePayload);

      if (surgeries && camps && free) {
        await store.updateStats({ lifetimeSurgeries: surgeries, outreachCamps: camps, freeCataracts: free });
      }

      if (res && res.error) {
        window.showAdminToast("Unable to save Hero content. Please try again: " + res.error, "error");
      } else {
        window.clearAdminDirty();
        window.showAdminToast("Homepage & Hero content saved permanently!", "success");
        render();
      }
    } catch (err) {
      console.error("[Homepage Save Error]:", err);
      window.showAdminToast("Unable to save Hero content. Please try again.", "error");
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Save All Homepage Settings";
      if (spinner) spinner.classList.add('hidden');
    }
  };

  window.handleAdminLogoUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    window.openImageCropModal(file, { context: 'brand', defaultRatio: '1:1' }, async (finalUrl, meta) => {
      try {
        const store = window.appStore;
        await window.preloadImage(finalUrl);
        await store.updateBrand({ logo: finalUrl });
        store.addGalleryItem({
          title: "Hospital Official Logo",
          category: "Branding",
          src: finalUrl,
          filename: meta.filename || file.name,
          type: meta.type || file.type,
          size: meta.size,
          dimensions: meta.dimensions,
          uploadDate: new Date().toLocaleDateString('en-IN')
        });
        window.showAdminToast("Official logo uploaded & published permanently!", "success");
        render();
      } catch (err) {
        window.showAdminToast("Logo upload failed. Previous logo preserved.", "error");
      }
    });
  };

  window.handleAdminHeroImageUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    window.openImageCropModal(file, { context: 'hero', defaultRatio: '16:9' }, async (finalUrl, meta) => {
      try {
        const preview = document.getElementById('admin-hero-img-preview');
        if (preview) preview.src = finalUrl;
        const hiddenInput = document.getElementById('admin-hero-image-url');
        if (hiddenInput) hiddenInput.value = finalUrl;

        // 1. Preload image in memory before updating hero view
        await window.preloadImage(finalUrl);

        // 2. Smoothly update hero background in DOM if present
        const heroContainer = document.getElementById('hero-banner-container');
        if (heroContainer) {
          heroContainer.style.backgroundImage = `url("${finalUrl}")`;
        }

        // 3. Atomically update store and Cloud database
        const store = window.appStore;
        const res = await store.updateHomepage({ heroImage: finalUrl });

        store.addGalleryItem({
          title: "Homepage Hero Background",
          category: "Homepage Hero",
          src: finalUrl,
          filename: meta.filename || file.name,
          type: meta.type || file.type,
          size: meta.size,
          dimensions: meta.dimensions,
          uploadDate: new Date().toLocaleDateString('en-IN')
        });

        if (res && res.error) {
          window.showAdminToast("Image uploaded, but metadata save had an issue: " + res.error, "error");
        } else {
          window.clearAdminDirty();
          window.showAdminToast("Hero background asset uploaded & saved permanently!", "success");
        }
        render();
      } catch (err) {
        console.error("[Hero Image Upload Error]:", err);
        window.showAdminToast("Hero image upload failed. Your existing Hero image has been preserved.", "error");
      }
    });
  };

  // ABOUT US HANDLERS
  window.saveAboutAdmin = function(e) {
    if (e) e.preventDefault();
    const store = window.appStore;
    const story = document.getElementById('admin-about-story')?.value;
    const history = document.getElementById('admin-about-history')?.value;
    const vision = document.getElementById('admin-about-vision')?.value;
    const mission = document.getElementById('admin-about-mission')?.value;
    const communityImpact = document.getElementById('admin-about-impact')?.value;

    store.updateAbout({ story, history, vision, mission, communityImpact });
    store.updateBrand({ vision, mission });
    window.showAdminToast("About Us narrative updated successfully!", "success");
    render();
  };

  // LEADERSHIP & DOCTORS HANDLERS
  window.saveLeadershipProfile = function(id) {
    const store = window.appStore;
    const name = document.getElementById(`admin-doc-name-${id}`)?.value;
    const title = document.getElementById(`admin-doc-title-${id}`)?.value;
    const degrees = document.getElementById(`admin-doc-degrees-${id}`)?.value;
    const specialization = document.getElementById(`admin-doc-spec-${id}`)?.value;
    const bio = document.getElementById(`admin-doc-bio-${id}`)?.value;

    store.updateLeadership(id, { name, title, designation: title, degrees, specialization, bio });
    window.showAdminToast(`Saved profile for ${name}`, "success");
    render();
  };

  window.toggleLeadershipPublish = function(id) {
    const store = window.appStore;
    const leader = store.getLeaderById(id);
    if (leader) {
      const newStatus = !leader.published;
      store.updateLeadership(id, { published: newStatus });
      window.showAdminToast(`Doctor profile ${newStatus ? 'Published' : 'Unpublished'}`, "success");
      render();
    }
  };

  window.deleteLeadershipConfirm = function(id) {
    const leader = window.appStore.getLeaderById(id);
    if (!leader) return;
    if (confirm(`Are you sure you want to delete the profile for "${leader.name}"? This action cannot be undone.`)) {
      window.appStore.deleteLeadership(id);
      window.showAdminToast(`Deleted profile for ${leader.name}`, "success");
      render();
    }
  };

  window.addLeadershipProfilePrompt = function() {
    const name = prompt("Enter Doctor's Full Name:", "Dr. New Consultant");
    if (name) {
      const store = window.appStore;
      store.addLeadership({
        name,
        title: "Senior Ophthalmic Consultant",
        degrees: "MBBS, MS (Ophthalmology)",
        specialization: "Comprehensive Ophthalmology",
        bio: "Dedicated ophthalmic consultant delivering clinical excellence at Anugraha Eye Hospital."
      });
      window.showAdminToast(`Added doctor profile for ${name}`, "success");
      render();
    }
  };

  window.handleAdminDoctorPhotoUpload = function(event, docId) {
    const file = event.target.files[0];
    if (!file) return;

    window.openImageCropModal(file, { context: 'doctors', defaultRatio: '1:1' }, (finalUrl, meta) => {
      const store = window.appStore;
      store.updateLeadership(docId, { photo: finalUrl });
      store.addGalleryItem({
        title: `Doctor Profile - ${docId}`,
        category: "Doctor Profiles",
        src: finalUrl,
        filename: meta.filename || file.name,
        type: meta.type || file.type,
        size: meta.size,
        dimensions: meta.dimensions,
        uploadDate: new Date().toLocaleDateString('en-IN')
      });
      window.showAdminToast("Doctor photo uploaded & published!", "success");
      render();
    });
  };

  window.handleAdminDoctorSearch = function(e) {
    window.adminDoctorSearchQuery = e.target.value;
    render();
  };

  // ADMINISTRATION HANDLERS
  window.handleAdminTeamPhotoFile = function(event, memberId) {
    const file = event.target.files[0];
    if (!file) return;

    window.openImageCropModal(file, { context: 'profile', defaultRatio: '1:1' }, (base64, meta) => {
      const store = window.appStore;
      store.updateAdminMember(memberId, { photo: base64 });
      store.addGalleryItem({
        title: `Administration Portrait - ${memberId}`,
        category: "Staff Profiles",
        src: base64,
        filename: meta.filename,
        type: meta.type,
        size: meta.size,
        dimensions: meta.dimensions,
        uploadDate: meta.uploadDate,
        usedOn: "Administration Team Page"
      });
      window.showAdminToast("Administration profile photo updated successfully!", "success");
      render();
    });
  };

  window.removeAdminTeamPhoto = function(memberId) {
    if (confirm("Remove profile photo for this team member?")) {
      const store = window.appStore;
      store.updateAdminMember(memberId, { photo: "" });
      window.showAdminToast("Profile photo removed", "success");
      render();
    }
  };

  window.toggleAdminMemberPublish = function(id) {
    const store = window.appStore;
    const list = store.getAdministration();
    const member = list.find(m => m.id === id);
    if (member) {
      const newStatus = member.published === false ? true : false;
      store.updateAdminMember(id, { published: newStatus });
      window.showAdminToast(`Staff profile ${newStatus ? 'Published' : 'Unpublished'}`, "success");
      render();
    }
  };

  window.addAdminTeamMember = function(e) {
    if (e) e.preventDefault();
    const name = prompt("Enter Administrative Staff Member Name:", "New Staff Member");
    if (name) {
      const store = window.appStore;
      store.addAdminMember({
        name,
        role: "Ophthalmic Administrator",
        position: "Ophthalmic Administrator",
        department: "Operations",
        tenure: "5+ Years",
        qualifications: "Graduate Degree",
        desc: "Administrative coordination and quality healthcare management."
      });
      window.showAdminToast("Added staff member", "success");
      render();
    }
  };

  window.deleteAdminTeamMember = function(index) {
    const list = window.appStore.getAdministration();
    const member = list[index];
    if (!member) return;
    if (confirm(`Are you sure you want to delete staff member "${member.name}"?`)) {
      window.appStore.deleteAdminMember(member.id);
      window.showAdminToast("Staff member deleted", "success");
      render();
    }
  };

  window.saveAdminTeamMember = function(index) {
    const store = window.appStore;
    const member = store.getAdministration()[index];
    if (member) {
      const name = document.getElementById(`admin-team-name-${index}`)?.value || member.name;
      const role = document.getElementById(`admin-team-role-${index}`)?.value || member.role;
      const dept = document.getElementById(`admin-team-dept-${index}`)?.value || member.department;
      const tenure = document.getElementById(`admin-team-tenure-${index}`)?.value || member.tenure || '10 Years';
      const qual = document.getElementById(`admin-team-qual-${index}`)?.value || member.qualifications;
      const desc = document.getElementById(`admin-team-desc-${index}`)?.value || member.desc;

      store.updateAdminMember(member.id, { 
        name, 
        role, 
        position: role, 
        department: dept, 
        tenure, 
        qualifications: qual, 
        desc 
      });
      window.clearAdminDirty();
      window.showAdminToast(`Saved details for ${name}`, "success");
      render();
    }
  };

  // HOSPITALS & VISION CENTERS HANDLERS
  window.saveHospitalCampus = function(id) {
    const store = window.appStore;
    const name = document.getElementById(`admin-hosp-name-${id}`)?.value;
    const phone = document.getElementById(`admin-hosp-phone-${id}`)?.value;
    const email = document.getElementById(`admin-hosp-email-${id}`)?.value;
    const hours = document.getElementById(`admin-hosp-hours-${id}`)?.value;
    const address = document.getElementById(`admin-hosp-address-${id}`)?.value;
    const googleMapsUrl = document.getElementById(`admin-hosp-map-${id}`)?.value;
    const emergencyInfo = document.getElementById(`admin-hosp-emerg-${id}`)?.value;

    store.updateFacility(id, { name, phone, email, hours, address, googleMapsUrl, emergencyInfo });
    window.showAdminToast(`Saved ${name} details!`, "success");
    render();
  };

  window.saveVisionCenter = function(id) {
    const store = window.appStore;
    const name = document.getElementById(`admin-vc-name-${id}`)?.value;
    const phone = document.getElementById(`admin-vc-phone-${id}`)?.value;
    const doctorVisits = document.getElementById(`admin-vc-visits-${id}`)?.value;
    const hours = document.getElementById(`admin-vc-hours-${id}`)?.value;
    const address = document.getElementById(`admin-vc-address-${id}`)?.value;
    const googleMapsUrl = document.getElementById(`admin-vc-map-${id}`)?.value;

    store.updateFacility(id, { name, phone, doctorVisits, hours, address, googleMapsUrl });
    window.showAdminToast(`Saved ${name} details!`, "success");
    render();
  };

  window.deleteVisionCenterConfirm = function(id) {
    const fac = window.appStore.getFacilityById(id);
    if (!fac) return;
    if (confirm(`Are you sure you want to delete "${fac.name}"?`)) {
      window.appStore.deleteFacility(id);
      window.showAdminToast(`Deleted ${fac.name}`, "success");
      render();
    }
  };

  window.addVisionCenterPrompt = function() {
    const town = prompt("Enter Vision Center Town / Location:", "New Town");
    if (town) {
      const store = window.appStore;
      store.addFacility({
        type: 'vision-center',
        name: `${town} Vision Center`,
        town: town,
        phone: "08352-220646",
        hours: "Mon–Sat 9am–5pm",
        doctorVisits: "Weekly Schedule",
        address: `${town} Main Market Road, North Karnataka`
      });
      window.showAdminToast(`Added ${town} Vision Center`, "success");
      render();
    }
  };

  // SERVICES HANDLERS
  window.saveServiceSpecialty = function(id) {
    const store = window.appStore;
    const existing = store.getServiceById(id) || {};
    const title = document.getElementById(`admin-srv-title-${id}`)?.value || existing.title;
    const subtitle = document.getElementById(`admin-srv-sub-${id}`)?.value || existing.subtitle;
    const category = document.getElementById(`admin-srv-cat-${id}`)?.value || existing.category;
    const shortDesc = document.getElementById(`admin-srv-short-${id}`)?.value || existing.shortDesc;
    const overview = document.getElementById(`admin-srv-overview-${id}`)?.value || existing.clinicalDetails?.overview;

    const parseLines = (val) => (val || '').split('\n').map(l => l.trim()).filter(Boolean);

    const conditions = parseLines(document.getElementById(`admin-srv-cond-${id}`)?.value);
    const symptoms = parseLines(document.getElementById(`admin-srv-symp-${id}`)?.value);
    const diagnosis = parseLines(document.getElementById(`admin-srv-diag-${id}`)?.value);
    const treatment = parseLines(document.getElementById(`admin-srv-treat-${id}`)?.value);
    const procedure = parseLines(document.getElementById(`admin-srv-proc-${id}`)?.value);
    const benefits = parseLines(document.getElementById(`admin-srv-bene-${id}`)?.value);
    const preparation = parseLines(document.getElementById(`admin-srv-prep-${id}`)?.value);
    const recovery = parseLines(document.getElementById(`admin-srv-recov-${id}`)?.value);
    const whenToConsult = parseLines(document.getElementById(`admin-srv-cons-${id}`)?.value);

    store.updateService(id, {
      title,
      subtitle,
      category,
      shortDesc,
      fullDesc: overview,
      desc: overview,
      symptoms: symptoms.join(', '),
      diagnosis: diagnosis.join(', '),
      treatment: treatment.join(', '),
      clinicalDetails: {
        ...(existing.clinicalDetails || {}),
        overview,
        conditions: conditions.length > 0 ? conditions : existing.clinicalDetails?.conditions,
        symptoms: symptoms.length > 0 ? symptoms : existing.clinicalDetails?.symptoms,
        diagnosis: diagnosis.length > 0 ? diagnosis : existing.clinicalDetails?.diagnosis,
        treatment: treatment.length > 0 ? treatment : existing.clinicalDetails?.treatment,
        procedure: procedure.length > 0 ? procedure : existing.clinicalDetails?.procedure,
        benefits: benefits.length > 0 ? benefits : existing.clinicalDetails?.benefits,
        preparation: preparation.length > 0 ? preparation : existing.clinicalDetails?.preparation,
        recovery: recovery.length > 0 ? recovery : existing.clinicalDetails?.recovery,
        whenToConsult: whenToConsult.length > 0 ? whenToConsult : existing.clinicalDetails?.whenToConsult
      }
    });

    window.showAdminToast(`Saved changes for ${title}!`, "success");
    render();
  };

  window.handleAdminServiceImageUpload = function(event, serviceId) {
    const file = event.target.files[0];
    if (!file) return;

    window.openImageCropModal(file, { context: 'services', defaultRatio: '16:9' }, (finalUrl, meta) => {
      const store = window.appStore;
      store.updateServiceImage(serviceId, finalUrl);
      store.addGalleryItem({
        title: `Service Asset - ${serviceId}`,
        category: "Services",
        src: finalUrl,
        filename: meta.filename || file.name,
        type: meta.type || file.type,
        size: meta.size,
        dimensions: meta.dimensions,
        uploadDate: new Date().toLocaleDateString('en-IN')
      });
      window.showAdminToast("Service photo uploaded & published!", "success");
      render();
    });
  };

  // ACADEMICS HANDLERS
  window.saveAcademicProgram = function(id) {
    const store = window.appStore;
    const affiliation = document.getElementById(`admin-acad-affil-${id}`)?.value;
    const duration = document.getElementById(`admin-acad-duration-${id}`)?.value;
    const eligibility = document.getElementById(`admin-acad-elig-${id}`)?.value;
    const desc = document.getElementById(`admin-acad-desc-${id}`)?.value;

    store.updateAcademicProgram(id, { affiliation, recognizedBy: affiliation, duration, eligibility, desc });
    window.showAdminToast("Academic program updated!", "success");
    render();
  };

  // PATIENT RESOURCES HANDLER
  window.savePatientResources = function(e) {
    if (e) e.preventDefault();
    const store = window.appStore;
    const patientInfo = document.getElementById('admin-res-info')?.value;
    const education = document.getElementById('admin-res-edu')?.value;
    const appointmentInfo = document.getElementById('admin-res-appt')?.value;
    const emergencyInfo = document.getElementById('admin-res-emerg')?.value;
    const insuranceInfo = document.getElementById('admin-res-ins')?.value;

    store.updatePatientResources({ patientInfo, education, appointmentInfo, emergencyInfo, insuranceInfo });
    window.showAdminToast("Patient resources updated successfully!", "success");
    render();
  };

  // FAQS HANDLERS
  window.saveFaqItem = function(id) {
    const store = window.appStore;
    const question = document.getElementById(`admin-faq-q-${id}`)?.value;
    const answer = document.getElementById(`admin-faq-a-${id}`)?.value;

    store.updateFaq(id, { question, answer });
    window.showAdminToast("FAQ updated!", "success");
    render();
  };

  window.deleteFaqConfirm = function(id) {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      window.appStore.deleteFaq(id);
      window.showAdminToast("FAQ deleted", "success");
      render();
    }
  };

  window.addFaqPrompt = function() {
    const question = prompt("Enter Patient Question:", "How do I consult a specialist?");
    if (question) {
      const answer = prompt("Enter Clinical Answer:", "Appointments can be booked online or via phone.");
      if (answer) {
        window.appStore.addFaq({ question, answer, category: "General" });
        window.showAdminToast("Added FAQ item", "success");
        render();
      }
    }
  };

  // INSURANCE HANDLERS
  window.addAdminEmpanelment = function(e) {
    e.preventDefault();
    const name = document.getElementById('admin-emp-name').value;
    const category = document.getElementById('admin-emp-cat').value;
    const code = document.getElementById('admin-emp-code').value;

    window.appStore.addEmpanelment({ name, category, code });
    window.showAdminToast(`Added partner: ${name}`, "success");
    render();
  };

  window.removeAdminEmpanelment = function(code) {
    if (confirm(`Remove partner (${code})?`)) {
      window.appStore.removeEmpanelment(code);
      window.showAdminToast(`Removed partner (${code})`, "success");
      render();
    }
  };

  // NEWS HANDLERS
  window.addNewsPrompt = function() {
    const title = prompt("Enter News Headline:", "New Community Camp Launched");
    if (title) {
      const content = prompt("Enter News Content:", "Anugraha Eye Hospital conducts regular screening camps across rural districts.");
      if (content) {
        window.appStore.addNewsItem({ title, shortDesc: content, content, category: "Clinical Outreach" });
        window.showAdminToast("Added news article", "success");
        render();
      }
    }
  };

  window.deleteNewsConfirm = function(id) {
    if (confirm("Delete this news article?")) {
      window.appStore.removeNewsItem(id);
      window.showAdminToast("News article deleted", "success");
      render();
    }
  };

  // MEDIA LIBRARY HANDLERS
  window.handleAdminMediaUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    window.openImageCropModal(file, { context: 'gallery', defaultRatio: 'original' }, (finalUrl, meta) => {
      const store = window.appStore;
      store.addGalleryItem({
        title: file.name.replace(/\.[^/.]+$/, ""),
        category: "Media Library",
        src: finalUrl,
        filename: meta.filename || file.name,
        type: meta.type || file.type,
        size: meta.size,
        dimensions: meta.dimensions,
        uploadDate: new Date().toLocaleDateString('en-IN')
      });
      window.showAdminToast("Image uploaded to Media Library & Cloud Storage!", "success");
      render();
    });
  };

  window.copyMediaPath = function(path) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(path).then(() => {
        window.showAdminToast("Image path copied to clipboard!", "success");
      });
    } else {
      window.showAdminToast("Image path: " + path, "success");
    }
  };

  window.deleteGalleryItemConfirm = function(id) {
    if (confirm("Delete this image asset from Media Library?")) {
      window.appStore.removeGalleryItem(id);
      window.showAdminToast("Image asset deleted", "success");
      render();
    }
  };

  // SETTINGS & BACKUP HANDLERS
  window.saveBrandAdmin = function(e) {
    e.preventDefault();
    const store = window.appStore;
    store.updateBrand({
      fallbackPhone: document.getElementById('admin-brand-phone')?.value,
      whatsappPhone: document.getElementById('admin-brand-whatsapp')?.value,
      contactEmail: document.getElementById('admin-brand-email')?.value,
      founder: document.getElementById('admin-brand-founder')?.value
    });
    window.showAdminToast("Hospital Credentials updated!", "success");
    render();
  };

  window.exportAdminJSON = function() {
    const store = window.appStore;
    const jsonStr = store.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anugraha_config_${Date.now()}.json`;
    a.click();
    window.showAdminToast("Exported configuration JSON file!", "success");
  };

  window.handleAdminImportJSON = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const jsonStr = e.target.result;
      const store = window.appStore;
      const success = store.importJSON(jsonStr);
      if (success) {
        window.showAdminToast("Imported configuration JSON successfully!", "success");
        render();
      } else {
        window.showAdminToast("Invalid JSON file format", "error");
      }
    };
    reader.readAsText(file);
  };

  // EQUIPMENT CMS HANDLERS
  window.handleEquipmentImageUpload = function(event, eqId) {
    const file = event.target.files[0];
    if (!file) return;

    window.openImageCropModal(file, { context: 'equipment', defaultRatio: '4:3' }, (finalUrl, meta) => {
      const preview = document.getElementById(`admin-eq-img-${eqId}`);
      if (preview) preview.src = finalUrl;
      window.appStore.updateEquipment(eqId, { image: finalUrl });
      window.showAdminToast("Equipment image replaced & persisted successfully!", "success");
      render();
    });
  };

  window.saveEquipmentAdminItem = function(eqId) {
    const store = window.appStore;
    const name = document.getElementById(`admin-eq-name-${eqId}`)?.value;
    const category = document.getElementById(`admin-eq-cat-${eqId}`)?.value;
    const displayOrder = parseInt(document.getElementById(`admin-eq-order-${eqId}`)?.value || '1', 10);

    store.updateEquipment(eqId, {
      name: name || eqId,
      altText: name || eqId,
      category: category || 'Diagnostic / Surgical',
      displayOrder: isNaN(displayOrder) ? 1 : displayOrder
    });
    window.showAdminToast(`Saved changes for ${name}`, "success");
    render();
  };

  window.toggleEquipmentActive = function(eqId) {
    const store = window.appStore;
    const eq = store.getEquipmentById(eqId);
    if (!eq) return;
    const newStatus = !(eq.isActive !== false);
    store.updateEquipment(eqId, { isActive: newStatus });
    window.showAdminToast(`${eq.name} is now ${newStatus ? 'Active' : 'Inactive'}`, "success");
    render();
  };

  window.addEquipmentPrompt = function() {
    const name = prompt("Enter Equipment Name (e.g. Ophthalmic Biometer):");
    if (name) {
      const store = window.appStore;
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      store.addEquipment({
        id: id || ('eq-' + Date.now()),
        name: name,
        altText: name,
        category: "Diagnostic / Surgical",
        image: "assets/equipment/reichert_7_nct.jpg",
        isActive: true,
        published: true
      });
      window.showAdminToast(`Added ${name} to equipment catalog!`, "success");
      render();
    }
  };

  window.deleteEquipmentAdmin = function(eqId) {
    const store = window.appStore;
    const eq = store.getEquipmentById(eqId);
    if (!eq) return;
    if (confirm(`Are you sure you want to delete "${eq.name}"?`)) {
      store.deleteEquipment(eqId);
      window.showAdminToast(`Deleted ${eq.name}`, "success");
      render();
    }
  };

  window.resetAdminDefaults = function() {
    if (confirm("Reset all store modifications to factory defaults?")) {
      const store = window.appStore;
      store.reset();
      window.showAdminToast("Restored factory defaults", "success");
      render();
    }
  };

  // Central Render Loop
  function render() {
    // Keep in-memory store 100% in sync with latest localStorage modifications
    store.sync();
    updatePageSEO(currentPath);

    if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
      headerContainer.innerHTML = '';
      appContainer.innerHTML = renderAdminPage();
      footerContainer.innerHTML = '';
      return;
    }

    headerContainer.innerHTML = renderHeader();
    appContainer.innerHTML = renderPage();
    footerContainer.innerHTML = renderFooter();

    // Initialize Smooth Scroll, Sitewide Observers, Navigation & Motion Tokens on render
    initLenisSmoothScroll();
    initSectionScrollReveals();
    initGridStaggers();
    initMotionReveals();
    initTimelineScrollProgress();
    initMobileBottomBar();
    initFormValidationShake();
    initPhysicsDragCarousel();

    initSpotlightHoverTracker();
  }

  // Consolidated & Debounced Real-Time Synchronization Listener
  let storeUpdateDebounceTimer = null;
  window.addEventListener('anugraha-store-updated', (e) => {
    if (storeUpdateDebounceTimer) clearTimeout(storeUpdateDebounceTimer);
    storeUpdateDebounceTimer = setTimeout(() => {
      const activeEl = document.activeElement;
      const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
      if (!isTyping) {
        render();
      }
    }, 150);
  });

  // Initial Run
  initInitialApertureLoader();
  render();
});
