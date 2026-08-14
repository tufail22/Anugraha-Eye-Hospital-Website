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

  // SEO Dynamic Title, Meta Description & JSON-LD Structured Data Injector
  function updatePageSEO(path) {
    let title = "Anugraha Eye Hospital | Authentic. Affectionate. Affordable. Eye Care";
    let description = "Anugraha Eye Hospital founded in 2001 by Dr. Prabhugouda B. Lingadalli. Super-specialty eye care base hospitals in Vijayapura & Kalaburagi, and 8 rural Vision Centers across Karnataka.";
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
    } else if (path === '/academics') {
      title = "Academics & Surgical Fellowships | Anugraha Institute";
      description = "Surgical Fellowships, NBEMS DNB Ophthalmology residency, Diploma in Ophthalmic Technology, and B.Sc Optometry (RGUHS Affiliated).";
    } else if (path === '/patient-resources/empanelments-and-insurance') {
      title = "Insurance & Government Scheme Empanelments | Anugraha Eye Hospital";
      description = "Cashless eye treatment for Ayushman Bharat (AB-ARK), ABY, JSS, Star Health, ICICI Lombard, Niva Bupa, Bajaj Allianz, and major TPAs.";
    } else if (path === '/admin') {
      title = "Admin Portal Sign In | Anugraha Eye Hospital CMS";
      description = "Gated administrative management portal for sitewide content editing.";
    } else if (path.startsWith('/admin/dashboard')) {
      title = "Admin Dashboard | Anugraha Eye Hospital CMS Console";
      description = "Authenticated Content Management Console.";
    }

    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

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

    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };

    // Reduced-motion safeguard: Route changes become an instant cut (0ms fade/slide)
    if (!motionSafe.isMotionSafe) {
      currentPath = path;
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'auto' });
      render();
      return;
    }

    // Trigger Top Progress Bar & Smooth Exit/Entrance Transition
    window.triggerTopProgressBar();
    
    appContainer.classList.add("page-exit");

    setTimeout(() => {
      currentPath = path;
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'auto' });
      render();

      appContainer.classList.remove("page-exit");
      appContainer.classList.add("page-enter");

      setTimeout(() => {
        appContainer.classList.remove("page-enter");
      }, 300);
    }, 180);
  }

  // Handle hash changes in URL bar directly
  window.addEventListener('hashchange', () => {
    const newPath = window.location.hash.replace('#', '') || '/';
    if (newPath !== currentPath) {
      currentPath = newPath;
      render();
    }
  });

  // Mobile Drawer Toggle State
  window.isMobileDrawerOpen = window.isMobileDrawerOpen || false;
  window.toggleMobileDrawer = function() {
    window.isMobileDrawerOpen = !window.isMobileDrawerOpen;
    render();
  };

  // Theme Manager (System Match by default + LocalStorage User Mode Override)
  window.getThemePreference = function() {
    return localStorage.getItem('anugraha_theme_v1') || 'system';
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
  };

  window.cycleTheme = function() {
    const current = window.getThemePreference();
    let next = 'dark';
    if (current === 'system') {
      const effective = window.getEffectiveTheme();
      next = effective === 'dark' ? 'light' : 'dark';
    } else if (current === 'dark') {
      next = 'light';
    } else {
      next = 'system';
    }
    localStorage.setItem('anugraha_theme_v1', next);
    window.applyTheme();
    render();
    if (window.showAdminToast) {
      const label = next === 'system' ? 'System Theme' : `${next.charAt(0).toUpperCase() + next.slice(1)} Mode`;
      window.showAdminToast(`Switched theme to ${label}`, 'success');
    }
  };

  // Listen to OS System Color Scheme Changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (window.getThemePreference() === 'system') {
        window.applyTheme();
        render();
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
    const dataGaps = store.getDataGaps();
    const isScrolled = window.scrollY > 80;
    const isDark = window.currentTheme === 'dark';

    return `
      <!-- Main Sticky Condensing Navigation Header -->
      <header class="sticky top-0 z-50 px-2 sm:px-4 max-w-7xl mx-auto pt-3">
        <nav id="main-nav" class="header-nav glass-card rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-xl transition-all border border-white/60 ${isScrolled ? 'is-scrolled' : ''}">
          
          <!-- Logo & Brand Name (Admin Editable) -->
          <a href="#/" class="flex items-center gap-3 group shrink-0">
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md group-hover:scale-105 transition-transform border border-teal-900/20 overflow-hidden shrink-0">
              <img src="assets/official_logo.jpg" alt="${brand.name} Official Logo" class="w-full h-full object-contain" />
            </div>
            <div>
              <div class="brand-title font-extrabold text-base sm:text-lg text-teal-950 tracking-tight leading-none font-heading transition-colors">${brand.name}</div>
              <div class="brand-subtitle text-[10px] sm:text-[11px] font-semibold text-teal-700 tracking-wider uppercase mt-0.5 transition-colors">${brand.tagline}</div>
            </div>
          </a>

          <!-- Primary Navigation Mega-Menus (Center / Right) -->
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

          <!-- Header Right Utilities (Premium Theme Toggle Button + Mobile Hamburger) -->
          <div class="flex items-center gap-2">
            
            <!-- Premium Light/Dark Theme Switcher Button (Right Header) -->
            <button onclick="window.cycleTheme()" title="Switch Theme (Light Mode / Dark Mode / System)" aria-label="Switch Theme Mode" class="btn-shine-glow p-2 px-3 rounded-xl bg-teal-900/10 dark:bg-emerald-900/40 hover:bg-teal-900/20 dark:hover:bg-emerald-800/60 border border-teal-900/20 dark:border-emerald-400/40 text-teal-950 dark:text-emerald-300 flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm active:scale-95">
              ${window.getEffectiveTheme() === 'dark' ? `
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                <span class="hidden sm:inline font-mono">${window.getThemePreference() === 'system' ? 'System 🌙' : 'Dark'}</span>
              ` : `
                <svg class="w-4 h-4 text-teal-800 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                <span class="hidden sm:inline font-mono">${window.getThemePreference() === 'system' ? 'System ☀️' : 'Light'}</span>
              `}
            </button>

            <!-- Mobile Hamburger Button -->
            <button onclick="window.toggleMobileDrawer()" class="lg:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-900/50 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>

          </div>

        </nav>
      </header>

      <!-- STICKY HERO-AWARE MOBILE BOTTOM CONTACT BAR (Appears only after hero scrolls past >450px) -->
      <div id="mobile-bottom-bar" class="mobile-bottom-bar lg:hidden p-3 bg-[#062c26]/95 backdrop-blur-xl border-t border-teal-800/80 shadow-2xl">
        <div class="max-w-md mx-auto flex items-center gap-2">
          <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>Call Helpline: ${brand.fallbackPhone}</span>
          </a>
          
          <a href="https://wa.me/${brand.whatsappPhone.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" title="WhatsApp Direct Chat" class="whatsapp-gentle-pulse w-12 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg active:scale-95 transition-all border border-emerald-400/40">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
        </div>
      </div>

      <!-- Mobile Full-Height Accordion Drawer -->
      ${window.isMobileDrawerOpen ? `
        <div class="fixed inset-0 z-50 bg-[#062c26]/98 backdrop-blur-2xl text-white p-6 overflow-y-auto lg:hidden flex flex-col justify-between">
          <div class="space-y-6">
            
            <!-- Drawer Header -->
            <div class="flex items-center justify-between border-b border-teal-800/80 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md overflow-hidden shrink-0">
                  <img src="assets/official_logo.jpg" alt="${brand.name} Official Logo" class="w-full h-full object-contain" />
                </div>
                <span class="font-extrabold text-lg font-heading text-white">${brand.name}</span>
              </div>
              <button onclick="window.toggleMobileDrawer()" class="p-2 rounded-xl bg-teal-900 text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <!-- Drawer Accordion Navigation -->
            <div class="space-y-3 font-heading font-semibold text-sm">
              <a href="#/" onclick="window.toggleMobileDrawer()" class="block py-2 text-emerald-300">Home</a>
              
              <div class="space-y-2 border-t border-teal-900 pt-3">
                <div class="text-xs uppercase tracking-wider text-teal-400 font-bold">About Us</div>
                <a href="#/about-us" onclick="window.toggleMobileDrawer()" class="block pl-3 py-1.5 text-slate-200">Our Story & Overview</a>
                <a href="#/about-us/leadership" onclick="window.toggleMobileDrawer()" class="block pl-3 py-1.5 text-slate-200">Leadership & Awards</a>
                <a href="#/about-us/administration" onclick="window.toggleMobileDrawer()" class="block pl-3 py-1.5 text-slate-200">Administration Team</a>
              </div>

              <div class="space-y-2 border-t border-teal-900 pt-3">
                <div class="text-xs uppercase tracking-wider text-teal-400 font-bold">Hospitals & Vision Centers</div>
                <a href="#/hospitals/vijayapura" onclick="window.toggleMobileDrawer()" class="block pl-3 py-1.5 text-slate-200">Vijayapura Base Hospital</a>
                <a href="#/hospitals/kalaburagi" onclick="window.toggleMobileDrawer()" class="block pl-3 py-1.5 text-slate-200">Kalaburagi Base Hospital</a>
                <a href="#/vision-centers" onclick="window.toggleMobileDrawer()" class="block pl-3 py-1.5 text-amber-300">All 8 Vision Centers Directory</a>
              </div>

              <div class="space-y-2 border-t border-teal-900 pt-3">
                <a href="#/services" onclick="window.toggleMobileDrawer()" class="block text-white">Services</a>
                <a href="#/academics" onclick="window.toggleMobileDrawer()" class="block text-white">Academics</a>
                <a href="#/patient-resources/empanelments-and-insurance" onclick="window.toggleMobileDrawer()" class="block text-white">Empanelments & Insurance</a>
                <a href="#/contact" onclick="window.toggleMobileDrawer()" class="block text-white">Contact Us</a>
              </div>
            </div>

          </div>

          <!-- Drawer Bottom Phone CTA -->
          <div class="pt-6 border-t border-teal-900 space-y-3">
            <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="block w-full py-3 text-center rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs">
              Call Now: ${brand.fallbackPhone}
            </a>
          </div>
        </div>
      ` : ''}

      <!-- Sticky Mobile Call/WhatsApp Bar (Pinned to Bottom of Viewport on Mobile) -->
      <div class="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 bg-[#062c26]/95 backdrop-blur-md border-t border-teal-800/60 flex items-center justify-between gap-2 shadow-2xl">
        <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-lg">
          <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <span>Call Now</span>
        </a>
        <a href="https://wa.me/${brand.whatsappPhone.replace(/[^0-9]/g, '')}" target="_blank" class="py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>WhatsApp</span>
        </a>
      </div>
    `;
  }

  // Render Multi-Column Footer with Admin Editable Links & Single Low-Emphasis Admin Login Link
  function renderFooter() {
    const brand = store.getBrand();
    const facilities = store.getFacilities().filter(f => f.type === 'vision-center');
    const currentYear = new Date().getFullYear();

    return `
      <footer class="bg-[#041a17] text-slate-300 pt-16 pb-16 mt-24 border-t border-teal-900/60 font-sans relative z-10">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-teal-900/60">
            
            <!-- Column 1: Logo + One-Line Mission Statement + Social Icons (Admin Editable) -->
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xl border-2 border-emerald-400/40 overflow-hidden shrink-0">
                  <img src="assets/official_logo.jpg" alt="${brand.name} Official Logo" class="w-full h-full object-contain" />
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

          <!-- Bottom Bar: Dynamic Year Copyright + Single Low-Emphasis "Admin Login" Link -->
          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; ${currentYear} ${brand.name}. All rights reserved. North Karnataka's Premier Super-Specialty Eye Network.
            </div>
            
            <!-- Low-emphasis, text-only Admin Login Link (ONLY public entry point to admin area) -->
            <div>
              <a href="#/admin" class="text-slate-600 hover:text-slate-400 text-xs font-mono transition-colors">
                Admin Login
              </a>
            </div>
          </div>

        </div>
      </footer>
    `;
  }

  // Router Engine: Map `currentPath` to page HTML generators
  function renderPage() {
    const path = currentPath;
    
    // Page: Home
    if (path === '/') return renderHomePage();
    
    // Page: About Us
    if (path === '/about-us') return renderAboutUsPage();
    if (path === '/about-us/leadership') return renderLeadershipPage();
    if (path === '/about-us/administration') return renderAdministrationPage();
    
    // Page: Base Hospitals
    if (path === '/hospitals/vijayapura') return renderHospitalDetailPage('vijayapura');
    if (path === '/hospitals/kalaburagi') return renderHospitalDetailPage('kalaburagi');
    
    // Page: Vision Centers Directory & Details
    if (path === '/vision-centers') return renderVisionCentersPage();
    if (path.startsWith('/vision-centers/')) {
      const centerId = path.replace('/vision-centers/', '');
      return renderVisionCenterDetailPage(centerId);
    }
    
    // Page: Services
    if (path === '/services') return renderServicesPage();
    
    // Page: Academics Hub & Program Detail Views
    if (path === '/academics') return renderAcademicsPage();
    if (path.startsWith('/academics/')) {
      const slug = path.replace('/academics/', '');
      return renderAcademicDetailPage(slug);
    }
    
    // Page: Empanelments & Resources
    if (path === '/patient-resources/empanelments-and-insurance' || path === '/empanelments') return renderEmpanelmentsPage();
    if (path === '/patient-resources/handouts') return renderAuxiliaryPage('handouts');
    
    // Page: Auxiliary & Gallery Pages
    if (path === '/gallery') return renderGalleryPage();
    if (['/news', '/videos', '/careers', '/case-studies', '/get-associated', '/contact'].includes(path)) {
      return renderAuxiliaryPage(path.replace('/', ''));
    }

    // Page: Admin CMS Portal & Dashboard Routes (Gated Authentication)
    if (path === '/admin') return renderAdminLoginPage();
    if (path === '/admin/dashboard' || path.startsWith('/admin/dashboard')) {
      return renderAdminDashboardShell(path);
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

    const motionSafe = window.useMotionSafe ? window.useMotionSafe() : { isMotionSafe: true };

    // Reduced-motion safeguard: single simple opacity fade, no stagger, no slide
    if (!motionSafe.isMotionSafe) {
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

  // 1. HOME PAGE View (Exact 9 Sections in Order)
  function renderHomePage() {
    const brand = store.getBrand();
    const stats = store.getStats();
    const facilities = store.getFacilities();

    // Trigger hero motion choreography, parallax, magnetic buttons & stat counters
    setTimeout(() => {
      initHeroChoreography();
      initHeroParallax();
      initMagneticButtons();
      initStatCounters();
    }, 60);

    return `
      <div class="space-y-20 pt-4">
        
        <!-- 1. HERO SECTION -->
        <section class="relative max-w-7xl mx-auto px-4 hero-section-root">
          <div class="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center p-8 sm:p-12 md:p-16 bg-cover bg-right border border-teal-900/30 shadow-2xl hero-parallax-bg" style="background-image: url('assets/hero-bg.png');">
            
            <!-- Dark Vision Blue Gradient Overlay with Aperture Mask Reveal -->
            <div class="absolute inset-0 bg-gradient-to-r from-[#062c26] via-[#062c26]/95 to-transparent opacity-0 transition-opacity duration-700 ease-out hero-aperture-mask"></div>

            <div class="relative z-10 max-w-2xl space-y-6 text-white">
              
              <!-- Eyebrow Badge (Step 2) -->
              <div class="hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs tracking-wide border border-emerald-500/30 opacity-0 transform translate-y-4 transition-all duration-300">
                <div class="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm overflow-hidden shrink-0">
                  <img src="assets/official_logo.jpg" alt="Anugraha Official Logo" class="w-full h-full object-contain" />
                </div>
                <span>Super-Specialty Eye Network &bull; Est. 2001 Vijayapura</span>
              </div>

              <!-- Word-by-Word Stagger H1 Headline (Step 3) -->
              <h1 class="hero-h1 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] font-heading text-white">
                <span class="hero-word-span">Authentic.</span> 
                <span class="hero-word-span">Affectionate.</span><br/>
                <span class="hero-word-span text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200">Affordable.</span> 
                <span class="hero-word-span">Eye</span> 
                <span class="hero-word-span">Care</span> 
                <span class="hero-word-span">for</span> 
                <span class="hero-word-span">All.</span>
              </h1>

              <!-- Subheadline (Step 4) -->
              <p class="hero-subheadline text-base sm:text-lg text-slate-200 leading-relaxed font-normal opacity-0 transform translate-y-4 transition-all duration-300">
                Founded by <strong>Dr. Prabhugouda B. Lingadalli</strong>, Anugraha Eye Hospital is North Karnataka's premier tertiary eye care destination, operating 2 base hospitals and 7 rural Vision Centers.
              </p>

              <!-- Hero Direct Contact CTAs with Magnetic Effect and easeSpring Settle (Step 5) -->
              <div class="hero-ctas flex flex-wrap items-center gap-4 pt-2 opacity-0 transform translate-y-6 transition-all duration-500">
                <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="btn-call-now btn-shine-glow magnetic-btn px-6 py-4 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-3 group">
                  <div class="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <span>Call Hospital: ${brand.fallbackPhone}</span>
                </a>

                <a href="#/vision-centers" class="btn-shine-glow magnetic-btn px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 border border-white/20 backdrop-blur-md group">
                  <svg class="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>Explore 8 Vision Centers</span>
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
              
              <!-- Stat 1: Total Surgeries (2,28,951) -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Total Surgeries</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="228951" data-prefix="" data-suffix="">
                  0
                </div>
                <p class="text-[10px] text-slate-500 mt-1">Lifetime operations</p>
              </div>

              <!-- Stat 2: Outreach Camps (2,715) -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Outreach Camps</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="2715" data-prefix="" data-suffix="">
                  0
                </div>
                <p class="text-[10px] text-slate-500 mt-1">Mobile eye camps</p>
              </div>

              <!-- Stat 3: Free Cataracts (50,000+) -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Free Cataracts</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="50000" data-prefix="" data-suffix="+">
                  0
                </div>
                <p class="text-[10px] text-slate-500 mt-1">Free surgeries</p>
              </div>

              <!-- Stat 4: Students Screened (10,000+) -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Students Screened</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="10000" data-prefix="" data-suffix="+">
                  0
                </div>
                <p class="text-[10px] text-slate-500 mt-1">District school vision</p>
              </div>

              <!-- Stat 5: Free Patients/Yr (~10,000) -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Free Patients/Yr</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="10000" data-prefix="~" data-suffix="">
                  0
                </div>
                <p class="text-[10px] text-slate-500 mt-1">Treated free yearly</p>
              </div>

              <!-- Stat 6: Total Reach (~10 Lakh) -->
              <div class="spotlight-card p-4 rounded-2xl bg-white/70 border border-teal-100 text-center">
                <div class="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Total Reach</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-1.5 font-mono stat-counter" data-target="10" data-prefix="~" data-suffix=" Lakh">
                  0
                </div>
                <p class="text-[10px] text-slate-500 mt-1">25-Yr footprint</p>
              </div>

            </div>
          </div>
        </section>

        <!-- 3. VALUE PILLARS (3-Card Layout for Authentic / Affectionate / Affordable) -->
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
                Compassionate community-rooted service, 2,715 mobile eye camps, and school screening programs reaching over 10,000 students in active partnership with local ASHA & Anganwadi workers.
              </p>
            </div>

            <!-- Pillar 3: Affordable -->
            <div class="spotlight-card p-8 rounded-3xl border border-teal-100 space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-700 text-amber-200 flex items-center justify-center font-bold text-xl shadow-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 class="text-2xl font-bold text-teal-950 font-heading">Affordable</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Over 50,000 free cataract operations for impoverished demographics, low-cost rural Vision Centers, and complete empanelment with Ayushman Bharat & Arogya Bhagya health schemes.
              </p>
            </div>

          </div>
        </section>

        <!-- 4. OUR LEGACY TEASER -->
        <section class="max-w-7xl mx-auto px-4">
          <div class="glass-card-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div class="space-y-4 max-w-2xl">
              <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider">Our Institutional Legacy</span>
              <h2 class="text-3xl font-extrabold text-white font-heading">Founded in 2001, Vijayapura</h2>
              <p class="text-slate-300 text-sm leading-relaxed">
                Established by <strong>Dr. Prabhugouda B. Lingadalli</strong>, Anugraha Eye Hospital pioneered a high-volume, high-quality, low-cost ophthalmic delivery model. Over nearly a quarter century, it has grown into a premier referral hub operating base hospitals in Vijayapura and Kalaburagi along with 7 rural Vision Centers across Karnataka and Maharashtra.
              </p>
            </div>

            <a href="#/about-us" class="px-6 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0 shadow-lg flex items-center gap-2">
              <span>Read Our Full Story</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </section>

        <!-- 5. CARE NETWORK MAP / PREVIEW -->
        <section class="max-w-7xl mx-auto px-4 space-y-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span class="px-3 py-1 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">Regional Coverage</span>
              <h2 class="text-3xl font-extrabold text-teal-950 font-heading mt-1">2 Base Hospitals & 7 Vision Centers</h2>
              <p class="text-slate-600 text-sm">Providing specialized eye care across Karnataka and Maharashtra districts.</p>
            </div>
            <a href="#/vision-centers" class="text-xs font-bold text-teal-900 hover:underline">Explore Full Directory &rarr;</a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3">
              <div class="text-xs font-bold text-teal-900 uppercase tracking-wider">Vijayapura Base Hospital</div>
              <div class="text-xs text-slate-500">Navabhag Main Road, Behind Central Bus Stand</div>
              <div class="text-xs font-semibold text-emerald-700">Hours: 8:00 AM – 9:00 PM daily</div>
              <a href="#/hospitals/vijayapura" class="inline-block text-xs font-bold text-teal-900 hover:underline pt-2 underline-animated">View Campus Details &rarr;</a>
            </div>

            <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3">
              <div class="text-xs font-bold text-teal-900 uppercase tracking-wider">Kalaburagi Base Hospital</div>
              <div class="text-xs text-slate-500">Tertiary Base Center & Optometry Institute</div>
              <div class="text-xs font-semibold text-emerald-700">Hours: 8:00 AM – 8:00 PM daily</div>
              <a href="#/hospitals/kalaburagi" class="inline-block text-xs font-bold text-teal-900 hover:underline pt-2 underline-animated">View Campus Details &rarr;</a>
            </div>

            <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3 bg-teal-50/50">
              <div class="text-xs font-bold text-amber-900 uppercase tracking-wider">8 Rural Vision Centers</div>
              <div class="text-xs text-slate-600">Talikoti, Muddebihal, Sindagi, Indi, B.Bagewadi, Chadachan, Nalatwad, Tikota</div>
              <div class="text-xs font-semibold text-emerald-800">Primary Care, Spectacles, 24x7 Emergency</div>
              <a href="#/vision-centers" class="inline-block text-xs font-bold text-teal-900 hover:underline pt-2 underline-animated">View All 8 Centers &rarr;</a>
            </div>
          </div>
        </section>

        <!-- 6. SERVICES PREVIEW GRID -->
        <section class="max-w-7xl mx-auto px-4 space-y-6">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span class="px-3 py-1 rounded-full badge-amber font-semibold text-xs uppercase tracking-wider">Ophthalmic Specialties</span>
              <h2 class="text-3xl font-extrabold text-teal-950 font-heading mt-1">Super-Specialty Ophthalmic Services</h2>
              <p class="text-slate-600 text-sm">Advanced surgical and diagnostic eye care.</p>
            </div>
            <a href="#/services" class="text-xs font-bold text-teal-900 hover:underline underline-animated">View All Services &rarr;</a>
          </div>

          <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-medium">
            <strong>Data Gap Notice:</strong> Clinical procedure copy is currently labeled as <em>"Content pending final clinical review"</em> per hospital audit instructions.
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${[
              { title: "Cataract & Phacoemulsification", desc: "Micro-incision cataract procedures with premium intraocular lenses." },
              { title: "LASIK & Contoura Vision", desc: "MyAlcon verified blade-free laser vision correction." },
              { title: "Retina & Vitreoretinal Care", desc: "Diabetic retinopathy screening, anti-VEGF, and retinal detachment lasers." },
              { title: "Glaucoma Diagnostics", desc: "IOP monitoring, visual fields, OCT, and surgical trabeculectomy." },
              { title: "Pediatric Ophthalmology", desc: "Squint correction, amblyopia management, and district school screenings." },
              { title: "Oculoplasty & Aesthetics", desc: "Eyelid surgery, lacrimal duct disorders, and trauma reconstruction." },
              { title: "Cornea & External Disease", desc: "Dry eye clinic, pterygium autograft, and corneal ulcer management." }
            ].map(s => `
              <div class="spotlight-card p-6 rounded-3xl border border-teal-100 space-y-3 flex flex-col justify-between group">
                <div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">Pending Clinical Review</span>
                  <h3 class="text-base font-extrabold text-teal-950 font-heading mt-2 group-hover:text-emerald-700 transition-colors">${s.title}</h3>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">${s.desc}</p>
                </div>
                <a href="#/services" class="text-xs font-bold text-teal-900 hover:underline pt-2 border-t border-teal-100 flex items-center justify-between">
                  <span>Learn More</span>
                  <span class="icon-shift-right">&rarr;</span>
                </a>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 7. LEADERSHIP TEASER (Aperture Hover Effect) -->
        <section class="max-w-7xl mx-auto px-4 space-y-8">
          <div class="text-center space-y-3">
            <span class="px-3 py-1 rounded-full badge-coral font-semibold text-xs uppercase tracking-wider">Medical Leadership</span>
            <h2 class="text-3xl font-extrabold text-teal-950 font-heading">Hospital Founders & Medical Directors</h2>
            <p class="text-slate-600 text-sm max-w-xl mx-auto">Pioneering compassionate, high-volume ophthalmic care since 2001.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Chairman Card with Aperture Effect -->
            <div class="spotlight-card aperture-card p-8 rounded-3xl border border-teal-100 space-y-6 group">
              <div class="flex items-center gap-6">
                <div class="aperture-ring w-20 h-20 rounded-full bg-teal-950 text-white font-extrabold text-2xl flex items-center justify-center font-heading shadow-xl shrink-0 border-2 border-emerald-400">
                  DPL
                </div>
                <div>
                  <h3 class="text-2xl font-extrabold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">Dr. Prabhugouda B. Lingadalli</h3>
                  <div class="text-xs font-bold text-teal-700">Chairman & Founder &bull; MBBS, MS, DNB, FAEH, MCHS</div>
                </div>
              </div>
              <p class="text-slate-600 text-sm leading-relaxed">
                Pioneered mobile eye camps treating ~10,000 patients annually free of cost, reaching nearly 10 lakh individuals over 25 years. Recipient of 12 prestigious awards including the Government of Karnataka's Rajyostava Award (2021).
              </p>
              <a href="#/about-us/leadership" class="inline-flex items-center gap-2 text-xs font-bold text-teal-900 hover:text-emerald-700 group">
                <span>View Full Bio & 12 Conferred Awards</span>
                <span class="icon-shift-right">&rarr;</span>
              </a>
            </div>

            <!-- Medical Director Card with Aperture Effect -->
            <div class="spotlight-card aperture-card p-8 rounded-3xl border border-teal-100 space-y-6 group">
              <div class="flex items-center gap-6">
                <div class="aperture-ring w-20 h-20 rounded-full bg-emerald-900 text-white font-extrabold text-2xl flex items-center justify-center font-heading shadow-xl shrink-0 border-2 border-emerald-400">
                  DMP
                </div>
                <div>
                  <h3 class="text-2xl font-extrabold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">Dr. Malini P L</h3>
                  <div class="text-xs font-bold text-emerald-700">Medical Director &bull; MBBS, DO, FGO</div>
                </div>
              </div>
              <p class="text-slate-600 text-sm leading-relaxed">
                Committed, compassionate leader with nearly two decades driving organizational development and elevating Anugraha Eye Hospital to national super-specialty standards.
              </p>
              <a href="#/about-us/leadership" class="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-900 group">
                <span>View Leadership Bio</span>
                <span class="icon-shift-right">&rarr;</span>
              </a>
            </div>

          </div>
        </section>

        <!-- 8. RECOGNITION STRIP (Quiet Trust Badges) -->
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

        <!-- 9. COMMUNITY OUTREACH PANEL (Partner Names/Logos Reinforcing "Affectionate" Pillar) -->
        <section class="max-w-7xl mx-auto px-4">
          <div class="glass-card rounded-3xl p-8 border border-teal-100 space-y-6">
            <div class="space-y-2">
              <span class="px-3 py-1 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">Reinforcing The "Affectionate" Pillar</span>
              <h2 class="text-2xl font-extrabold text-teal-950 font-heading">Community & Ecosystem Partners</h2>
              <p class="text-slate-600 text-sm">Collaborating with civic and public health partners irrespective of caste, creed, race, or religion.</p>
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

      </div>
    `;
  }

  // 2. ABOUT US View (Central Narrative Hub)
  function renderAboutUsPage() {
    const brand = store.getBrand();
    const objectives = store.data.coreObjectives;
    const facilities = store.getFacilities();

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-20">
        
        <!-- SECTION 1: H1 + FOUNDING NARRATIVE (2001, Vijayapura, Underserved North Karnataka Focus) -->
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
              <p>
                Founded in <strong>2001</strong> in Vijayapura by renowned ophthalmic surgeon <strong>Dr. Prabhugouda B. Lingadalli</strong> (former professor at B M Patil Medical College and alumnus of Aravind Eye Hospital, Madurai), Anugraha Eye Hospital was established to address an acute structural shortage of specialized eye care services across North Karnataka.
              </p>
              <p>
                Prior to 2001, thousands of rural patients suffering from treatable cataracts, glaucoma, and ocular trauma across Vijayapura, Bagalkot, Kalaburagi, and adjacent Solapur/Sangli districts of Maharashtra had limited access to advanced micro-surgical technology. Dr. Lingadalli pioneered a sustainable delivery model prioritizing high clinical quality, high patient volume, and low operational costs.
              </p>
              <p>
                Over the past 25 years, Anugraha Eye Hospital has evolved from a single clinic into a comprehensive healthcare network operating <strong>2 super-specialty base hospitals</strong> and <strong>7 rural Vision Centers</strong>, restoring vision for over 2,28,951 patients and performing over 50,000 surgeries entirely free of cost.
              </p>
            </div>

            <div class="pt-6 border-t border-teal-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
                <div class="text-2xl font-extrabold text-teal-950 font-mono">2001</div>
                <div class="text-xs font-semibold text-teal-800 uppercase mt-0.5">Founded in Vijayapura</div>
              </div>
              <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
                <div class="text-2xl font-extrabold text-teal-950 font-mono">2 Base + 7 VC</div>
                <div class="text-xs font-semibold text-teal-800 uppercase mt-0.5">Regional Care Network</div>
              </div>
              <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
                <div class="text-2xl font-extrabold text-teal-950 font-mono">50,000+</div>
                <div class="text-xs font-semibold text-teal-800 uppercase mt-0.5">Free Cataract Operations</div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: FOUNDING-TO-TODAY TIMELINE COMPONENT (Genuine Dated Sequence) -->
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
                  <h3 class="text-xl font-bold text-teal-950 font-heading">50,000+ Free Cataract Surgeries</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Crossed 50,000 free micro-incision cataract procedures performed for impoverished patients across 2,715 outreach screening camps.
                  </p>
                </div>
              </div>

              <!-- Timeline Item 3: Milestone 2 -->
              <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                <div class="w-full sm:w-1/2 text-left sm:text-right space-y-2">
                  <span class="inline-block px-3 py-1 rounded-full bg-amber-800 text-amber-200 font-mono font-bold text-xs">Milestone 2</span>
                  <h3 class="text-xl font-bold text-teal-950 font-heading">District-Wide School Screenings</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Scaled mobile school eye screening program examining over 10,000 students across government and private schools, distributing free corrective spectacles.
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
                    Operating 2 tertiary base hospitals (Vijayapura & Kalaburagi) and 7 rural Vision Centers with RGUHS optometry affiliation and NBEMS DNB accreditation.
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

        <!-- SECTION 6: SUB-NAVIGATION CARDS -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <a href="#/about-us/leadership" class="glass-card p-8 rounded-3xl border border-teal-100 space-y-4 hover-lift block group">
            <div class="w-12 h-12 rounded-2xl bg-teal-900 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">Hospital Founders & Leadership &rarr;</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Explore profiles of Founder & Chairman Dr. Prabhugouda B. Lingadalli, Medical Director Dr. Malini P L, and the 12 conferred state & national honors.
            </p>
          </a>

          <a href="#/about-us/administration" class="glass-card p-8 rounded-3xl border border-teal-100 space-y-4 hover-lift block group">
            <div class="w-12 h-12 rounded-2xl bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-teal-950 font-heading group-hover:text-emerald-700 transition-colors">Management & Administration &rarr;</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Learn about our administrative framework, hospital managers, paramedical heads, and campus operations across Vijayapura and Kalaburagi.
            </p>
          </a>

        </section>

      </div>
    `;
  }

  // 3. LEADERSHIP View (Redesigned Bold Editorial Layout inspired by Reference Mockup)
  function renderLeadershipPage() {
    const leadership = store.data.leadership;
    const chairman = leadership.find(l => l.id === 'dr-lingadalli');
    const medicalDirector = leadership.find(l => l.id === 'dr-malini');
    const brand = store.getBrand();

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-24 font-sans">
        
        <!-- Bold Editorial Hero Header -->
        <div class="glass-card-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div class="absolute -right-10 -bottom-10 opacity-10 text-7xl sm:text-9xl font-extrabold font-heading text-white pointer-events-none select-none">
            LEADERSHIP
          </div>

          <div class="relative z-10 max-w-3xl space-y-4">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Institutional Founders & Clinical Governance</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading leading-tight">
              Hospital Founders & Medical Leadership
            </h1>
            <p class="text-slate-300 text-base sm:text-lg leading-relaxed">
              Guiding Anugraha Eye Hospital's surgical excellence, academic credentials, and 25-year philanthropic footprint across Karnataka and Maharashtra.
            </p>

            <div class="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-emerald-300">
              <div class="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">12 State & National Conferred Awards</div>
              <div class="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">Aravind Eye Hospital Alumnus</div>
              <div class="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">RGUHS & NBEMS Recognized</div>
            </div>
          </div>
        </div>

        <!-- PROFILE 1: Dr. Prabhugouda B. Lingadalli (Chairman & Founder) -->
        <section id="dr-lingadalli" class="space-y-12">
          
          <!-- Split Screen Editorial Layout (Reference Mockup Style) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left Portrait Card Box -->
            <div class="lg:col-span-5 glass-card-dark rounded-3xl p-8 text-white space-y-6 relative overflow-hidden shadow-2xl">
              <div class="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none"></div>

              <div class="relative z-10 space-y-6 text-center lg:text-left">
                
                <!-- Portrait Image / Avatar Frame with Aperture Lens Focus Motif -->
                <div class="aperture-focus-card relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-3xl p-2 bg-gradient-to-tr from-emerald-500 via-teal-700 to-amber-400 shadow-2xl overflow-hidden group">
                  <div class="aperture-focus-ring"></div>
                  ${chairman.photo ? `
                    <img src="${chairman.photo}" alt="${chairman.name}" class="card-img-editorial w-full h-full rounded-2xl object-cover shadow-inner group-hover:scale-105 transition-transform duration-500" />
                  ` : `
                    <div class="w-full h-full rounded-2xl bg-teal-950 text-amber-300 font-extrabold text-5xl flex items-center justify-center font-heading border-2 border-emerald-400 shadow-inner">
                      DPL
                    </div>
                  `}
                </div>

                <div class="space-y-2">
                  <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs uppercase tracking-wider">
                    ${chairman.title}
                  </span>
                  <h2 class="text-3xl font-extrabold text-white font-heading leading-tight">
                    ${chairman.name}
                  </h2>
                  <div class="text-xs font-mono text-emerald-400 font-bold">
                    ${chairman.degrees}
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                  <div class="flex items-center justify-between">
                    <span>Ophthalmology Training:</span>
                    <span class="text-white font-bold">VIMS Bellary (1998)</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>Diplomate of National Board:</span>
                    <span class="text-white font-bold">DNB Cleared (2000)</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>Fellowship Training:</span>
                    <span class="text-emerald-400 font-bold">Aravind Eye Hospital Madurai</span>
                  </div>
                </div>

                <div class="pt-2 flex flex-col gap-2">
                  <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="block w-full py-3.5 text-center rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg">
                    Contact Chairman's Office: ${brand.fallbackPhone}
                  </a>
                  <a href="#/admin" class="text-center text-[11px] font-semibold text-emerald-400 hover:underline pt-1">
                    Admin Photo Upload (.jpg / .png) &rarr;
                  </a>
                </div>

              </div>
            </div>

            <!-- Right Bio & Narrative Content -->
            <div class="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-teal-100/80 shadow-xl space-y-6 relative overflow-hidden">
              <div class="absolute -right-8 -top-8 text-8xl font-extrabold text-teal-900/5 font-heading pointer-events-none select-none">
                FOUNDER
              </div>

              <!-- Signature Quote Callout (Reference Mockup Style) -->
              <blockquote class="relative z-10 text-xl sm:text-2xl font-bold text-teal-950 font-heading leading-relaxed bg-teal-50/70 p-6 rounded-2xl border-l-4 border-teal-800">
                "Our foundational commitment has always been simple — no person in North Karnataka should suffer from preventable blindness due to lack of affordable, super-specialty eye care."
              </blockquote>

              <div class="relative z-10 prose prose-teal max-w-none text-slate-700 space-y-4 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>Dr. Prabhugouda B. Lingadalli</strong> (MBBS, MS, DNB, FAEH, MCHS) is the Founder and Chairman of Anugraha Eye Hospital across both the Vijayapura and Kalaburagi campuses. He pioneered a high-quality, high-volume, low-cost ophthalmic service delivery model restoring sight to thousands of underprivileged individuals across Karnataka and Maharashtra.
                </p>
                <p>
                  He completed his MBBS from B M Patil Medical College, Vijayapura, followed by MS Ophthalmology from Vijayanagar Institute of Medical Sciences, Bellary in 1998, and cleared the prestigious DNB examination in 2000. Dr. Lingadalli dedicated 2 years of intensive fellowship training at the world-renowned <strong>Aravind Eye Hospital, Madurai</strong>, mastering high-volume micro-incision cataract surgery and community eye care administration.
                </p>
                <p>
                  He served in academia as Lecturer and progressed to Professor at B M Patil Medical College over a decade. In 2001, he founded Anugraha Eye Hospital in Vijayapura and established a landmark mobile eye camp network that treats ~10,000 patients annually free of cost, impacting nearly <strong>10 lakh individuals</strong> over a 25-year institutional footprint.
                </p>
              </div>

              <!-- Quick Highlights Badges -->
              <div class="relative z-10 pt-4 border-t border-teal-100 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div class="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-center">
                  <div class="text-lg font-extrabold text-teal-950 font-mono">25 Years</div>
                  <div class="text-[10px] font-bold text-slate-500 uppercase">Surgical Legacy</div>
                </div>
                <div class="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-center">
                  <div class="text-lg font-extrabold text-teal-950 font-mono">50,000+</div>
                  <div class="text-[10px] font-bold text-slate-500 uppercase">Free Cataracts</div>
                </div>
                <div class="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-center col-span-2 sm:col-span-1">
                  <div class="text-lg font-extrabold text-teal-950 font-mono">10 Lakh</div>
                  <div class="text-[10px] font-bold text-slate-500 uppercase">Total Reach</div>
                </div>
              </div>

            </div>

          </div>

          <!-- HONORS & AWARDS SECTION (Styled like filmography / honors list in mockup) -->
          <div class="glass-card-dark rounded-3xl p-8 sm:p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider">State & National Conferred Honors</span>
                <h3 class="text-3xl font-extrabold text-white font-heading mt-1">Conferred Institutional Honors & Awards</h3>
                <p class="text-xs text-slate-300">Listing of 12 prestigious awards conferred upon Dr. Prabhugouda B. Lingadalli for healthcare excellence.</p>
              </div>
              <div class="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shrink-0">
                12 Conferred Awards
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${chairman.awards.map((award, aIdx) => `
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4 hover:border-amber-500/50 transition-all">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-sm flex items-center justify-center font-mono shrink-0">
                    ${aIdx + 1}
                  </div>
                  <div class="space-y-1">
                    <h4 class="font-extrabold text-white text-sm sm:text-base font-heading leading-tight">${award.title}</h4>
                    <div class="text-xs font-semibold text-slate-400">${award.organization}</div>
                    ${award.year !== '-' ? `<span class="inline-block text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mt-1">Year: ${award.year}</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </section>

        <!-- PROFILE 2: Dr. Malini P L (Medical Director) -->
        <section id="dr-malini" class="space-y-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left Bio & Narrative Content -->
            <div class="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-teal-100/80 shadow-xl space-y-6 relative overflow-hidden">
              <div class="absolute -right-8 -top-8 text-8xl font-extrabold text-teal-900/5 font-heading pointer-events-none select-none">
                DIRECTOR
              </div>

              <div>
                <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-xs border border-emerald-200 uppercase tracking-wider">
                  ${medicalDirector.title}
                </span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-teal-950 font-heading mt-2 leading-tight">
                  ${medicalDirector.name}
                </h2>
                <div class="text-sm font-bold text-emerald-800 mt-1 font-mono">
                  Credentials: ${medicalDirector.degrees}
                </div>
              </div>

              <!-- Quote Block -->
              <blockquote class="text-slate-700 text-base italic leading-relaxed bg-teal-50/70 p-5 rounded-2xl border-l-4 border-emerald-700">
                "Clinical governance, cutting-edge surgical technology, and compassionate care define our two-decade operational promise to North Karnataka."
              </blockquote>

              <!-- Full Bio Text (PROJECT-CONTEXT.md exact narrative) -->
              <div class="prose prose-teal max-w-none text-slate-700 space-y-4 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>Dr. Malini P L</strong> (MBBS, DO, FGO) is the Medical Director of Anugraha Eye Hospital. A committed and compassionate clinical leader with nearly two decades of administrative and surgical governance experience, she has played an instrumental role driving organizational development and elevating the hospital to national super-specialty standards.
                </p>
                <p>
                  She reinforces the hospital's 25-year institutional legacy, overseeing clinical protocols, consultant accreditation, and patient safety across base hospitals in Vijayapura and Kalaburagi. Dr. Malini emphasizes the strategic advantage of the hospital's city-center locations, cutting-edge micro-surgical technology, and a dedicated team of highly trained, compassionate healthcare professionals.
                </p>
              </div>

              <div class="pt-4 border-t border-teal-100 flex items-center justify-between">
                <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="text-xs font-bold text-teal-900 hover:text-emerald-700 flex items-center gap-2">
                  <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span>Contact Medical Director's Office</span>
                </a>
              </div>
            </div>

            <!-- Right Portrait Card Box -->
            <div class="lg:col-span-5 glass-card-dark rounded-3xl p-8 text-white space-y-6 relative overflow-hidden shadow-2xl">
              <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-teal-500/20 blur-2xl pointer-events-none"></div>

              <div class="relative z-10 space-y-6 text-center">
                <!-- Portrait Image / Avatar Frame with Aperture Lens Focus Motif -->
                <div class="aperture-focus-card relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-3xl p-2 bg-gradient-to-tr from-emerald-400 via-teal-600 to-emerald-300 shadow-2xl overflow-hidden group">
                  <div class="aperture-focus-ring"></div>
                  ${medicalDirector.photo ? `
                    <img src="${medicalDirector.photo}" alt="${medicalDirector.name}" class="card-img-editorial w-full h-full rounded-2xl object-cover shadow-inner group-hover:scale-105 transition-transform duration-500" />
                  ` : `
                    <div class="w-full h-full rounded-2xl bg-emerald-950 text-emerald-300 font-extrabold text-5xl flex items-center justify-center font-heading border-2 border-emerald-400 shadow-inner">
                      DMP
                    </div>
                  `}
                </div>

                <div class="space-y-2">
                  <h3 class="text-2xl font-extrabold text-white font-heading">${medicalDirector.name}</h3>
                  <div class="text-xs font-mono text-emerald-300 font-bold">${medicalDirector.degrees}</div>
                  <div class="text-xs text-slate-300 font-semibold">${medicalDirector.title}</div>
                </div>

                <div class="pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                  <div>Over 18 Years Ophthalmic Governance</div>
                  <div class="text-emerald-400 font-bold">NABH & Clinical Accreditation Oversight</div>
                </div>

                <div class="pt-2">
                  <a href="#/admin" class="text-xs font-semibold text-emerald-400 hover:underline">
                    Admin Photo Upload (.jpg / .png) &rarr;
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    `;
  }

  // 4. ADMINISTRATION View (Consolidated 6 Bios ON ONE PAGE with Left-Hand Sticky Anchor Jump Menu)
  function renderAdministrationPage() {
    const adminTeam = store.data.administration;
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
                        <a href="#/admin" class="text-[11px] font-semibold text-slate-400 hover:text-slate-600 underline">
                          Admin Edit Photo &rarr;
                        </a>
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

          <!-- ADMIN-REPLACEABLE EMBEDDED MAP PLACEHOLDER COMPONENT SLOT -->
          <div class="lg:col-span-7 glass-card rounded-3xl p-8 border border-teal-100/80 shadow-xl space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <span class="px-3 py-1 rounded-full badge-teal font-bold text-[11px] uppercase tracking-wider">Static Map Component Slot</span>
                <h3 class="text-xl font-extrabold text-teal-950 font-heading mt-1">Campus Location Map</h3>
              </div>
              <span class="text-[11px] font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Admin Replaceable Slot</span>
            </div>

            <!-- Embedded Map Visual Slot (Frontend Static Map Component) -->
            <div class="relative w-full h-80 rounded-2xl bg-slate-900 overflow-hidden border border-teal-100 flex items-center justify-center group shadow-inner">
              <!-- Stylized Map Grid Background Visual -->
              <div class="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" style="background-image: url('assets/hero-bg.png');"></div>
              
              <!-- Map Pin Overlay Marker -->
              <div class="relative z-10 text-center space-y-3 p-6 bg-slate-950/85 backdrop-blur-md rounded-2xl border border-teal-500/40 max-w-sm mx-auto shadow-2xl">
                <div class="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold mx-auto shadow-lg animate-bounce">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <h4 class="font-extrabold text-white text-sm font-heading">${facility.name}</h4>
                  <p class="text-xs text-slate-300 mt-1">${isKalaburagi ? 'Kalaburagi Campus Slot' : 'Navabhag Main Road, Behind Central Bus Stand'}</p>
                </div>
                <a href="https://maps.google.com" target="_blank" rel="noopener" class="inline-block px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors">
                  Open in Maps &rarr;
                </a>
              </div>
            </div>

            <p class="text-xs text-slate-500">
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
    const facilities = store.getFacilities().filter(f => f.type === 'vision-center');

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

  // 7. SERVICES View (Clinical Offerings with Swappable Neutral Placeholder Imagery & Audit Notice)
  function renderServicesPage() {
    const dataGaps = store.getDataGaps();
    const brand = store.getBrand();
    const servicesList = store.getServices();

    return `
      <div class="max-w-7xl mx-auto px-4 py-10 space-y-12 font-sans">
        
        <!-- Header -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-teal font-semibold text-xs uppercase tracking-wider">
            Super-Specialty Ophthalmic Care
          </div>
          <h1 class="text-4xl font-extrabold text-teal-950 font-heading">Ophthalmic Services & Specialties</h1>
          <p class="text-slate-600 leading-relaxed text-sm">
            State-of-the-art diagnostic and surgical eye care provided by experienced consultants across our base hospitals and vision centers.
          </p>
        </div>

        ${!dataGaps.servicesContentConfirmed ? `
          <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-sm font-medium">
            <strong>Content Audit Notice:</strong> ${dataGaps.servicesNotice}
          </div>
        ` : ''}

        <!-- 8 Ophthalmic Specialties Grid with License-Safe Swappable Imagery -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${servicesList.map(s => `
            <div class="glass-card rounded-3xl border border-teal-100/90 overflow-hidden flex flex-col justify-between hover-lift transition-all">
              
              <!-- License-Safe Swappable Placeholder Image Box -->
              <div class="relative w-full h-44 bg-gradient-to-br from-[#062c26] via-[#0d4b43] to-[#041a17] p-4 flex flex-col justify-between text-white overflow-hidden border-b border-teal-800/60">
                <!-- Optical Iris Motif Backdrop -->
                <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-2 border-emerald-400/20 flex items-center justify-center pointer-events-none">
                  <div class="w-20 h-20 rounded-full border border-teal-300/20"></div>
                </div>

                <div class="flex items-center justify-between relative z-10">
                  <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/30">
                    Ophthalmic Specialty
                  </span>
                  <div class="w-8 h-8 rounded-xl bg-teal-900/90 text-emerald-400 flex items-center justify-center font-bold border border-teal-700/60">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </div>
                </div>

                <!-- Neutral Placeholder Label Overlay for Non-Developers -->
                <div class="relative z-10 space-y-1">
                  <div class="text-xs font-bold text-white font-heading">${s.title}</div>
                  <div class="text-[10px] text-emerald-300 font-mono bg-slate-950/60 backdrop-blur-sm p-1.5 rounded-lg border border-teal-700/60 truncate" title="Swappable field in js/store.js: ${s.configKey}">
                    📷 Swappable: store.js &rarr; services['${s.id}']
                  </div>
                </div>
              </div>

              <!-- Content Body -->
              <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div class="space-y-2">
                  <h3 class="text-lg font-extrabold text-teal-950 font-heading leading-tight">${s.title}</h3>
                  <p class="text-xs font-semibold text-emerald-800">${s.subtitle || ''}</p>
                  <p class="text-xs text-slate-600 leading-relaxed">${s.desc}</p>
                </div>

                <div class="pt-4 border-t border-teal-100">
                  <a href="tel:${brand.fallbackPhone.replace(/[^0-9+]/g, '')}" class="inline-flex items-center gap-1.5 text-xs font-bold text-teal-950 hover:text-emerald-700 transition-colors">
                    <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <span>Enquire: ${brand.fallbackPhone}</span>
                  </a>
                </div>
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // 8. ACADEMICS View (Hub + Detail Pages Engine with RGUHS & NBE Accreditations)
  function renderAcademicsPage() {
    const academics = store.getAcademics();
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

  // 9. EMPANELMENTS & INSURANCE View (Category Grouped Logo Grid)
  function renderEmpanelmentsPage() {
    const empanelments = store.getEmpanelments();
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
    window.currentLightboxIndex = index;
    const item = GALLERY_IMAGES[index];
    if (!item) return;

    // Find clicked thumbnail element to calculate shared-element origin rect
    const thumb = document.querySelector(`[data-thumb-index="${index}"]`);
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
              <span class="text-xs font-mono text-slate-400">${index + 1} / ${GALLERY_IMAGES.length}</span>
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
    const nextIdx = (index + 1) % GALLERY_IMAGES.length;
    const prevIdx = (index - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    const imgNext = new Image(); imgNext.src = GALLERY_IMAGES[nextIdx].src;
    const imgPrev = new Image(); imgPrev.src = GALLERY_IMAGES[prevIdx].src;

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
      const thumb = document.querySelector(`[data-thumb-index="${window.currentLightboxIndex}"]`);
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
    if (window.currentLightboxIndex === null) return;
    const nextIdx = (window.currentLightboxIndex + 1) % GALLERY_IMAGES.length;
    window.updateLightboxSlide(nextIdx, 'next');
  };

  window.prevLightbox = function() {
    if (window.currentLightboxIndex === null) return;
    const prevIdx = (window.currentLightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    window.updateLightboxSlide(prevIdx, 'prev');
  };

  window.updateLightboxSlide = function(newIdx, direction) {
    window.currentLightboxIndex = newIdx;
    const item = GALLERY_IMAGES[newIdx];
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
    if (countEl) countEl.textContent = `${newIdx + 1} / ${GALLERY_IMAGES.length}`;

    // Preload next image
    const preloadIdx = (newIdx + 1) % GALLERY_IMAGES.length;
    const imgPre = new Image(); imgPre.src = GALLERY_IMAGES[preloadIdx].src;
  };

  function renderGalleryPage() {
    const activeCat = window.activeGalleryCategory || 'All';
    const categories = ['All', 'Base Hospital', 'Operations', 'Outreach Camps', 'Infrastructure'];
    const filteredImages = activeCat === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(g => g.category === activeCat);

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
              <img src="assets/official_logo.jpg" alt="Official Logo" class="w-full h-full object-contain" />
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
          <div class="space-y-6">
            ${handoutList.length > 0 ? `
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                ${handoutList.map(h => `
                  <div class="glass-card p-6 rounded-3xl border border-teal-100 space-y-4 hover-lift flex flex-col justify-between">
                    <div class="space-y-2">
                      <span class="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold text-[10px] uppercase">PDF Document</span>
                      <h3 class="font-extrabold text-teal-950 text-base font-heading">${h.title}</h3>
                      <p class="text-xs text-slate-500 font-mono">File size: ${h.fileSize || 'PDF'}</p>
                    </div>
                    <a href="${h.pdfUrl}" target="_blank" download class="px-4 py-2.5 rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-950 transition-colors text-center block shadow-sm">
                      Download PDF &rarr;
                    </a>
                  </div>
                `).join('')}
              </div>
            ` : `
              <!-- Honest Empty-State Banner for Handouts -->
              <div class="p-8 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-6 text-center max-w-2xl mx-auto shadow-md">
                <div class="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-2xl mx-auto">📄</div>
                <div class="space-y-2">
                  <span class="px-3 py-1 rounded-full bg-amber-200/60 text-amber-900 font-extrabold text-[11px] uppercase tracking-wider">Clinical Verification Notice</span>
                  <h3 class="text-2xl font-extrabold text-teal-950 font-heading">Handouts & Patient Care Guides Coming Soon</h3>
                  <p class="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                    Patient educational brochures and post-operative care PDF handouts are currently undergoing clinical verification by our ophthalmic board. We do not publish unverified medical literature.
                  </p>
                </div>
              </div>
            `}
          </div>
        ` : ''}

        <!-- SPECIAL CASE: News & Media -->
        ${type === 'news' ? `
          <div class="space-y-6">
            ${newsList.length > 0 ? `
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${newsList.map(n => `
                  <div class="glass-card rounded-3xl border border-teal-100 overflow-hidden space-y-4 hover-lift flex flex-col justify-between">
                    <div class="h-44 bg-slate-900 overflow-hidden">
                      <img src="${n.image || 'assets/official_logo.jpg'}" alt="${n.title}" class="w-full h-full object-cover" />
                    </div>
                    <div class="p-6 pt-0 space-y-2 flex-1">
                      <span class="text-[10px] font-bold text-emerald-700 uppercase font-mono">${n.date}</span>
                      <h3 class="font-extrabold text-teal-950 text-base font-heading">${n.title}</h3>
                      <p class="text-xs text-slate-600 line-clamp-3">${n.excerpt}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <!-- Honest Empty-State Banner for News -->
              <div class="p-8 rounded-3xl bg-teal-50/70 border border-teal-100 space-y-6 text-center max-w-2xl mx-auto shadow-md">
                <div class="w-16 h-16 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-2xl mx-auto">📰</div>
                <div class="space-y-2">
                  <span class="px-3 py-1 rounded-full bg-teal-200/60 text-teal-950 font-extrabold text-[11px] uppercase tracking-wider">Hospital News Feed</span>
                  <h3 class="text-2xl font-extrabold text-teal-950 font-heading">Hospital Press & Media Coverage Coming Soon</h3>
                  <p class="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Official press releases and community outreach campaign updates are scheduled for release following audit verification by our communications department.
                  </p>
                </div>
              </div>
            `}
          </div>
        ` : ''}

        <!-- SPECIAL CASE: Videos Embed Grid -->
        ${type === 'videos' ? `
          <div class="space-y-6">
            ${videoList.length > 0 ? `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${videoList.map(v => `
                  <div class="glass-card rounded-3xl border border-teal-100 overflow-hidden space-y-4">
                    <div class="relative w-full h-64 bg-slate-950 flex items-center justify-center overflow-hidden">
                      ${v.isMp4 ? `
                        <video controls class="w-full h-full object-cover">
                          <source src="${v.videoUrl}" type="video/mp4" />
                        </video>
                      ` : `
                        <iframe src="${v.embedUrl}" class="w-full h-full border-0" allowfullscreen></iframe>
                      `}
                    </div>
                    <div class="p-6 pt-0 space-y-1">
                      <span class="px-2.5 py-1 rounded-full bg-teal-50 text-teal-900 font-bold text-[10px] uppercase">${v.category || 'Ophthalmic Video'}</span>
                      <h3 class="font-extrabold text-teal-950 text-base font-heading">${v.title}</h3>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <!-- Honest Empty-State Banner for Videos -->
              <div class="p-8 rounded-3xl bg-teal-50/70 border border-teal-100 space-y-6 text-center max-w-2xl mx-auto shadow-md">
                <div class="w-16 h-16 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-2xl mx-auto">🎥</div>
                <div class="space-y-2">
                  <span class="px-3 py-1 rounded-full bg-teal-200/60 text-teal-950 font-extrabold text-[11px] uppercase tracking-wider">Educational Video Library</span>
                  <h3 class="text-2xl font-extrabold text-teal-950 font-heading">Ophthalmic Video Library Coming Soon</h3>
                  <p class="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Surgical procedure overviews and patient care video tutorials (.mp4) are undergoing final editing by our clinical media team.
                  </p>
                </div>
              </div>
            `}
          </div>
        ` : ''}

        <!-- OTHER AUXILIARY STUBS: Careers, Case-Studies, Get-Associated, Contact -->
        ${['careers', 'case-studies', 'get-associated'].includes(type) ? `
          <div class="p-8 rounded-3xl bg-teal-50/70 border border-teal-100 space-y-6 text-center max-w-2xl mx-auto shadow-md">
            <div class="w-16 h-16 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-2xl mx-auto">
              ${type === 'careers' ? '👨‍⚕️' : type === 'case-studies' ? '🔬' : '🤝'}
            </div>
            <div class="space-y-2">
              <span class="px-3 py-1 rounded-full bg-teal-200/60 text-teal-950 font-extrabold text-[11px] uppercase tracking-wider">Audit Notice</span>
              <h3 class="text-2xl font-extrabold text-teal-950 font-heading">${titles[type]} Updates Pending</h3>
              <p class="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Official listings for ${titles[type]} are being updated by hospital administration. We do not publish fabricated listings or unverified entries.
              </p>
            </div>
          </div>
        ` : ''}

        ${type === 'contact' ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 glass-card p-8 rounded-3xl border border-teal-100">
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-teal-950 font-heading">Base Hospital Coordinates</h3>
              <div class="space-y-3 text-sm text-slate-700">
                <p><strong>Vijayapura Base Campus:</strong> Navabhag Main Road, Behind Central Bus Stand, Vijayapura – 586101</p>
                <p><strong>Kalaburagi Base Campus:</strong> Station Road, Near Super Market, Kalaburagi – 585101</p>
                <p><strong>Telephone:</strong> <a href="tel:${brand.fallbackPhone}" class="text-teal-900 font-bold hover:underline">${brand.fallbackPhone}</a></p>
                <p><strong>Email:</strong> ${brand.contactEmail}</p>
              </div>
            </div>
            
            <div class="p-6 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-3">
              <h4 class="font-bold text-teal-950 text-sm">Direct Phone Enquiries</h4>
              <p class="text-xs text-slate-600">Per hospital guidelines, all patient inquiries route directly to hospital reception via landline or official WhatsApp.</p>
              <a href="tel:${cleanPhone}" class="block w-full py-3 text-center rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-950 transition-colors">
                Call ${brand.fallbackPhone} Now
              </a>
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

      </div>
    `;
  }

  // 11. ADMIN LOGIN PAGE (Premium Healthcare SaaS CMS Login View)
  function renderAdminLoginPage() {
    // If already authenticated, redirect to /admin/dashboard immediately
    if (window.authClient && window.authClient.isAuthenticated()) {
      setTimeout(() => navigateTo('/admin/dashboard'), 0);
      return `
        <div class="max-w-md mx-auto px-4 py-20 text-center space-y-4 font-sans">
          <div class="text-sm font-bold text-teal-900">Redirecting to Admin Dashboard...</div>
        </div>
      `;
    }

    return `
      <div class="min-h-[85vh] flex items-center justify-center px-4 py-12 font-sans">
        <div class="w-full max-w-md space-y-8">
          
          <!-- SaaS Card Wrapper -->
          <div class="glass-card-dark p-8 md:p-10 rounded-3xl border border-teal-800/80 shadow-2xl space-y-6 text-white relative overflow-hidden">
            
            <div class="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
            
            <!-- Hospital Logo & Eyebrow -->
            <div class="text-center space-y-3">
              <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center p-1 shadow-lg mx-auto overflow-hidden">
                <img src="assets/official_logo.jpg" alt="Official Hospital Logo" class="w-full h-full object-contain" />
              </div>
              <div>
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] uppercase tracking-wider font-mono">CMS Admin Portal</span>
                <h1 class="text-2xl font-extrabold font-heading text-white mt-2">Sign in to Admin Dashboard</h1>
                <p class="text-xs text-slate-300 mt-1">Marketing & Informational Website Content Management System</p>
              </div>
            </div>

            <!-- Error Banner Container -->
            <div id="admin-login-error" class="hidden p-3.5 rounded-2xl bg-red-950/80 border border-red-500/60 text-red-300 text-xs font-bold text-center">
              Invalid username or password.
            </div>

            <!-- Login Form -->
            <form onsubmit="window.handleAdminLoginSubmit(event)" class="space-y-4">
              <div class="space-y-1.5">
                <label for="admin-username" class="block text-xs font-bold text-slate-200">Username</label>
                <div class="relative">
                  <input type="text" id="admin-username" placeholder="web@admin" required autocomplete="username" class="w-full px-4 py-3 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border border-slate-700/80 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all" />
                </div>
              </div>

              <div class="space-y-1.5">
                <label for="admin-password" class="block text-xs font-bold text-slate-200">Password</label>
                <div class="relative">
                  <input type="password" id="admin-password" placeholder="••••••••" required autocomplete="current-password" class="w-full px-4 py-3 pr-12 rounded-xl bg-slate-900/90 text-white placeholder-slate-500 text-sm border border-slate-700/80 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all" />
                  <button type="button" onclick="window.toggleAdminPasswordVisibility()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 text-xs font-bold font-mono">
                    Show
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between pt-1 text-xs">
                <label class="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
                  <input type="checkbox" id="admin-remember" checked class="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700" />
                  <span>Remember this browser</span>
                </label>
                <button type="button" onclick="window.toggleForgotPasswordNotice()" class="text-xs font-bold text-emerald-400 hover:underline">
                  Forgot password?
                </button>
              </div>

              <!-- Forgot Password Inline Notice -->
              <div id="forgot-password-notice" class="hidden p-3 rounded-xl bg-teal-900/80 border border-teal-700 text-xs text-amber-300 text-center font-bold">
                Contact your website administrator
              </div>

              <!-- Submit Button -->
              <button type="submit" id="admin-login-submit" class="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm hover:bg-emerald-400 transition-all shadow-lg flex items-center justify-center gap-2">
                <span id="admin-login-btn-text">Sign In</span>
              </button>
            </form>

            <!-- Prototype Notice Footer -->
            <div class="pt-4 border-t border-slate-800/80 text-center">
              <p class="text-[10px] text-slate-400 leading-relaxed font-mono">
                /* Frontend Prototype Notice: Local session persistence enabled. Credentials: web@admin / Admin@2001 */
              </p>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  // 12. ADMIN CMS DASHBOARD SHELL (Protected Route Architecture)
  function renderAdminDashboardShell(currentPath) {
    // Auth Guard: Unauthenticated access redirects immediately to /admin
    if (!window.authClient || !window.authClient.isAuthenticated()) {
      setTimeout(() => navigateTo('/admin'), 0);
      return `
        <div class="max-w-md mx-auto px-4 py-20 text-center space-y-4 font-sans">
          <div class="text-sm font-bold text-teal-900">Redirecting to Login...</div>
        </div>
      `;
    }

    const session = window.authClient.getCurrentSession();
    const cms = window.cmsClient;
    const store = window.appStore;
    const siteSettings = cms ? cms.getSiteSettings() : store.getBrand();

    // Determine Active CMS Section Module
    let activeSection = window.activeAdminSection || 'dashboard';
    if (currentPath && currentPath.includes('/admin/dashboard/')) {
      activeSection = currentPath.replace('/admin/dashboard/', '');
    }

    const navModules = [
      { id: 'dashboard', label: 'Dashboard Home', icon: '📊', isGroup: false },
      { id: 'homepage', label: 'Homepage', icon: '🏠', publicRoute: '#/' },
      { id: 'about', label: 'About Us', icon: '🏥', publicRoute: '#/about-us' },
      { id: 'leadership', label: 'Leadership', icon: '🩺', publicRoute: '#/about-us/leadership' },
      { id: 'administration', label: 'Administration Team', icon: '👥', isRepeatable: true, publicRoute: '#/about-us/administration' },
      { id: 'hospitals', label: 'Hospitals', icon: '🏢', publicRoute: '#/hospitals/vijayapura' },
      { id: 'vision-centers', label: 'Vision Centers', icon: '👁️', isRepeatable: true, publicRoute: '#/vision-centers' },
      { id: 'services', label: 'Services', icon: '🔬', publicRoute: '#/services' },
      { id: 'academics', label: 'Academics', icon: '🎓', publicRoute: '#/academics' },
      { id: 'empanelments', label: 'Empanelments & Insurance', icon: '🛡️', isRepeatable: true, publicRoute: '#/patient-resources/empanelments-and-insurance' },
      { id: 'gallery', label: 'Gallery', icon: '📷', publicRoute: '#/gallery' },
      { id: 'news', label: 'News & Media', icon: '📰', publicRoute: '#/news' },
      { id: 'contact', label: 'Contact Info', icon: '📞', publicRoute: '#/contact' },
      { id: 'settings', label: 'Site Settings', icon: '⚙️', isSettings: true }
    ];

    const currentMod = navModules.find(m => m.id === activeSection) || navModules[0];

    return `
      <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
        
        <!-- SIDEBAR NAVIGATION (Desktop + Mobile Responsive Drawer) -->
        <aside class="w-full md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
          
          <!-- Sidebar Top -->
          <div class="p-6 space-y-6">
            <!-- Header Branding -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                <img src="${siteSettings.logo || 'assets/official_logo.jpg'}" alt="${siteSettings.logoAlt}" class="w-full h-full object-contain" />
              </div>
              <div>
                <div class="font-extrabold text-sm text-white font-heading leading-tight">Anugraha Eye Hospital</div>
                <div class="text-[10px] text-emerald-400 font-mono">CMS Admin Console</div>
              </div>
            </div>

            <!-- Module Links Navigation List -->
            <nav class="space-y-1">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 font-mono">Content Modules</div>
              ${navModules.map(m => `
                <button onclick="window.switchAdminSection('${m.id}')" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSection === m.id ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }">
                  <div class="flex items-center gap-2.5 truncate">
                    <span class="text-sm">${m.icon}</span>
                    <span class="truncate">${m.label}</span>
                  </div>
                  ${m.isRepeatable ? `<span class="text-[9px] px-1.5 py-0.5 rounded font-mono ${activeSection === m.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-emerald-400'}">List</span>` : ''}
                </button>
              `).join('')}
            </nav>
          </div>

          <!-- Sidebar Footer (User Account & Logout) -->
          <div class="p-6 border-t border-slate-800 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center font-mono border border-emerald-500/40">
                  WA
                </div>
                <div>
                  <div class="text-xs font-extrabold text-white font-mono">${session ? session.username : 'web@admin'}</div>
                  <div class="text-[10px] text-slate-400 font-mono">Authenticated Admin</div>
                </div>
              </div>
              <button onclick="window.handleAdminLogout()" class="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 transition-colors" title="Sign Out">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              </button>
            </div>

            <button onclick="window.handleAdminLogout()" class="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-bold text-xs hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              <span>Sign Out of CMS</span>
            </button>
          </div>

        </aside>

        <!-- MAIN DASHBOARD CONTENT WORKSPACE -->
        <main class="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          <!-- Top Header Bar -->
          <header class="p-6 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Admin CMS</span>
                <span>/</span>
                <span class="text-emerald-400 font-bold">${currentMod.label}</span>
              </div>
              <h1 class="text-2xl font-extrabold text-white font-heading mt-1">${currentMod.label} CMS Manager</h1>
            </div>

            <div class="flex items-center gap-3">
              ${currentMod.publicRoute ? `
                <a href="${currentMod.publicRoute}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 border border-slate-700">
                  <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  <span>Preview on Site</span>
                </a>
              ` : ''}
              
              <button onclick="window.resetAdminStore()" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold transition-colors">
                Reset Store
              </button>
            </div>
          </header>

          <!-- Dynamic Workspace Content View -->
          <div class="p-6 md:p-8 space-y-8 flex-1">
            ${renderAdminSectionContent(activeSection, currentMod)}
          </div>

        </main>

      </div>
    `;
  }

  // Render Content per active Admin Section
  function renderAdminSectionContent(sectionKey, moduleInfo) {
    const store = window.appStore;
    const cms = window.cmsClient;

    if (sectionKey === 'dashboard') {
      return renderAdminDashboardHomeView();
    }

    if (sectionKey === 'settings') {
      return renderAdminSiteSettingsView();
    }

    if (moduleInfo.isRepeatable) {
      return renderRepeatableModuleEditor(sectionKey);
    }

    // Default: Standardized AdminEditorCard for Content Pages
    return renderAdminEditorCardView(sectionKey, moduleInfo);
  }

  // 1. DASHBOARD HOME OVERVIEW VIEW
  function renderAdminDashboardHomeView() {
    const store = window.appStore;
    const cms = window.cmsClient;
    const stats = store.getStats();
    const facilities = store.getFacilities();
    const empanelments = store.getEmpanelments();
    const adminTeam = store.data.administration || [];

    const draftsCount = Object.keys(store.data.cmsDrafts || {}).length;
    const publishedCount = Object.keys(store.data.cmsPublished || {}).length;

    return `
      <div class="space-y-8">
        
        <!-- Welcome Hero Banner -->
        <div class="glass-card-dark p-8 rounded-3xl border border-teal-800 text-white space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs font-mono">
            <span>Operational System Status: Healthy</span>
          </div>
          <h2 class="text-3xl font-extrabold font-heading text-white">Commercial Marketing CMS Dashboard</h2>
          <p class="text-slate-300 text-xs max-w-2xl leading-relaxed">
            Welcome to the Anugraha Eye Hospital Content Management System. Edit sitewide pages, manage Vision Center locations, upload media, and update hospital credentials in real-time.
          </p>
        </div>

        <!-- Metric Summary Cards Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div class="text-xs font-bold text-slate-400 uppercase font-mono">CMS Modules</div>
            <div class="text-2xl font-extrabold text-white font-heading">13</div>
            <div class="text-[11px] text-emerald-400 font-semibold">Active Modules</div>
          </div>

          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div class="text-xs font-bold text-slate-400 uppercase font-mono">Draft Edits</div>
            <div class="text-2xl font-extrabold text-amber-400 font-heading">${draftsCount}</div>
            <div class="text-[11px] text-amber-300 font-semibold">Pending Publish</div>
          </div>

          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div class="text-xs font-bold text-slate-400 uppercase font-mono">Published Sections</div>
            <div class="text-2xl font-extrabold text-emerald-400 font-heading">${publishedCount}</div>
            <div class="text-[11px] text-emerald-300 font-semibold">Live on Site</div>
          </div>

          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div class="text-xs font-bold text-slate-400 uppercase font-mono">Vision Centers</div>
            <div class="text-2xl font-extrabold text-white font-heading">${facilities.length}</div>
            <div class="text-[11px] text-slate-400 font-semibold">Directory Centers</div>
          </div>

          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div class="text-xs font-bold text-slate-400 uppercase font-mono">Admin Team</div>
            <div class="text-2xl font-extrabold text-white font-heading">${adminTeam.length}</div>
            <div class="text-[11px] text-slate-400 font-semibold">Staff Profiles</div>
          </div>

          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div class="text-xs font-bold text-slate-400 uppercase font-mono">Empanelments</div>
            <div class="text-2xl font-extrabold text-white font-heading">${empanelments.length}</div>
            <div class="text-[11px] text-slate-400 font-semibold">Empaneled Partners</div>
          </div>
        </div>

        <!-- Quick Jump Grid -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-white font-heading">Quick Action CMS Shortcuts</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button onclick="window.switchAdminSection('vision-centers')" class="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left space-y-2 transition-all hover:scale-105">
              <span class="text-xl">👁️</span>
              <div class="font-extrabold text-white text-sm">Vision Centers</div>
              <div class="text-xs text-slate-400">Add, edit, or reorder 8 regional centers.</div>
            </button>

            <button onclick="window.switchAdminSection('empanelments')" class="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left space-y-2 transition-all hover:scale-105">
              <span class="text-xl">🛡️</span>
              <div class="font-extrabold text-white text-sm">Empanelments & Insurance</div>
              <div class="text-xs text-slate-400">Manage government schemes & insurance logos.</div>
            </button>

            <button onclick="window.switchAdminSection('academics')" class="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left space-y-2 transition-all hover:scale-105">
              <span class="text-xl">🎓</span>
              <div class="font-extrabold text-white text-sm">Academics & Training</div>
              <div class="text-xs text-slate-400">Edit RGUHS, DNB, and fellowship programs.</div>
            </button>

            <button onclick="window.switchAdminSection('settings')" class="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left space-y-2 transition-all hover:scale-105">
              <span class="text-xl">⚙️</span>
              <div class="font-extrabold text-white text-sm">Site Settings</div>
              <div class="text-xs text-slate-400">Update logo, phone numbers & social links.</div>
            </button>
          </div>
        </div>

      </div>
    `;
  }

  // 2. STANDARDIZED AdminEditorCard COMPONENT FOR CONTENT MODULES
  function renderAdminEditorCardView(sectionKey, moduleInfo) {
    const cms = window.cmsClient;
    const rec = cms ? cms.getContent(sectionKey) : { title: '', content: '', status: 'draft' };
    const isPublished = rec.status === 'published';

    return `
      <div class="glass-card-dark p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <!-- Header status -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 class="text-xl font-bold text-white font-heading">${moduleInfo.label} Content Editor</h2>
            <p class="text-xs text-slate-400 mt-1">Edit marketing titles, copy, and images for the ${moduleInfo.label} section.</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-full font-bold text-xs ${isPublished ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'}">
              Status: ${isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <!-- Editor Card Form -->
        <div id="editor-card-${sectionKey}" class="space-y-6">
          
          <!-- Short Text Field 1: Title -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-200">Section Title / Main Heading</label>
            <input type="text" id="card-title-${sectionKey}" value="${rec.title || ''}" oninput="window.markCardUnsaved('${sectionKey}')" class="w-full p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none" />
          </div>

          <!-- Short Text Field 2: Subtitle / Eyebrow -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-200">Subtitle / Eyebrow Badge</label>
            <input type="text" id="card-subtitle-${sectionKey}" value="${rec.subtitle || ''}" oninput="window.markCardUnsaved('${sectionKey}')" class="w-full p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none" />
          </div>

          <!-- Long-form Content Rich-Text Editor Toolbar -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-200">Main Copy / Description (Rich-Text Formatting)</label>
            
            <div class="rounded-xl border border-slate-700 overflow-hidden bg-slate-900 space-y-2 p-2">
              <!-- Toolbar -->
              <div class="flex items-center gap-1 border-b border-slate-800 pb-2">
                <button type="button" onclick="window.applyRichText('${sectionKey}', 'bold')" class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">B</button>
                <button type="button" onclick="window.applyRichText('${sectionKey}', 'italic')" class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs italic font-bold text-white">I</button>
                <button type="button" onclick="window.applyRichText('${sectionKey}', 'ul')" class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">• Bullet List</button>
                <button type="button" onclick="window.applyRichText('${sectionKey}', 'ol')" class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">1. Num List</button>
              </div>

              <!-- Content Textarea -->
              <textarea id="card-content-${sectionKey}" rows="5" oninput="window.markCardUnsaved('${sectionKey}')" class="w-full p-3 bg-transparent text-white text-xs outline-none resize-y">${rec.content || ''}</textarea>
            </div>
          </div>

          <!-- Image Upload Slot with MANDATORY Alt Text (5MB Max, JPG/PNG Only) -->
          ${window.renderImageUploader({
            id: sectionKey,
            label: "Section Image Slot",
            currentImage: rec.image,
            currentAlt: rec.altText,
            maxSizeMB: 5,
            allowedTypes: ['image/jpeg', 'image/png'],
            rejectedTypes: ['.webp', '.svg', '.gif', '.pdf', '.docx', '.exe']
          })}

          <!-- SEO & Meta Description Customizer Component -->
          ${window.renderSEOEditor({
            sectionKey: sectionKey,
            currentTitle: rec.seoTitle || `${moduleInfo.label} | Anugraha Eye Hospital`,
            currentMetaDescription: rec.seoDescription || `Learn about ${moduleInfo.label} at Anugraha Eye Hospital.`
          })}

          <!-- Card Actions Footer -->
          <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <button type="button" onclick="window.saveCmsDraft('${sectionKey}')" class="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-xs transition-colors">
                Save Draft
              </button>
              
              <button type="button" onclick="window.publishCmsContent('${sectionKey}')" class="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition-colors shadow-lg">
                Publish
              </button>
            </div>

            ${moduleInfo.publicRoute ? `
              <a href="${moduleInfo.publicRoute}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
                <span>Preview on Site</span>
                <span>&rarr;</span>
              </a>
            ` : ''}
          </div>

        </div>

      </div>
    `;
  }

  // 3. REPEATABLE LIST MODULES EDITOR (Vision Centers, Insurance, Admin Team)
  function renderRepeatableModuleEditor(moduleKey) {
    const store = window.appStore;

    if (moduleKey === 'vision-centers') {
      const centers = store.getFacilities();
      return `
        <div class="glass-card-dark p-8 rounded-3xl border border-slate-800 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 class="text-xl font-bold text-white font-heading">Vision Centers Directory (8 Centers)</h2>
              <p class="text-xs text-slate-400 mt-1">Add, edit, remove, or reorder Vision Center facilities.</p>
            </div>
            <button onclick="window.addRepeatableItem('vision-centers', event)" class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400">
              + Add Vision Center
            </button>
          </div>

          <div class="space-y-4">
            ${centers.map((c, idx) => `
              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div class="flex items-center gap-3">
                    <span class="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-mono font-bold text-xs">#${idx + 1}</span>
                    <h3 class="font-extrabold text-white text-base font-heading">${c.name}</h3>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <button onclick="window.moveRepeatableItem('vision-centers', ${idx}, 'up')" ${idx === 0 ? 'disabled' : ''} class="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-bold">▲ Up</button>
                    <button onclick="window.moveRepeatableItem('vision-centers', ${idx}, 'down')" ${idx === centers.length - 1 ? 'disabled' : ''} class="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-bold">▼ Down</button>
                    <button onclick="window.deleteRepeatableItem('vision-centers', ${idx})" class="p-1.5 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-bold">Delete</button>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label class="block font-bold text-slate-300 mb-1">Center Name</label>
                    <input type="text" id="vc-name-${idx}" value="${c.name}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-300 mb-1">Town / Location</label>
                    <input type="text" id="vc-town-${idx}" value="${c.town || c.name}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-300 mb-1">Phone Number</label>
                    <input type="text" id="vc-phone-${idx}" value="${c.phone}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-300 mb-1">Operating Hours</label>
                    <input type="text" id="vc-hours-${idx}" value="${c.hours}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block font-bold text-slate-300 mb-1">Full Address</label>
                    <input type="text" id="vc-address-${idx}" value="${c.address}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
                  </div>
                </div>

                <button onclick="window.saveRepeatableItem('vision-centers', ${idx})" class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400">
                  Save Changes for ${c.name}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (moduleKey === 'empanelments') {
      const emps = store.getEmpanelments();
      return `
        <div class="glass-card-dark p-8 rounded-3xl border border-slate-800 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 class="text-xl font-bold text-white font-heading">Empanelments & Insurance Partners</h2>
              <p class="text-xs text-slate-400 mt-1">Add, edit, remove, or reorder empaneled insurance partners.</p>
            </div>
            <button onclick="window.addRepeatableItem('empanelments', event)" class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400">
              + Add Insurance Partner
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${emps.map((e, idx) => `
              <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px]">${e.code}</span>
                  <div class="flex items-center gap-1">
                    <button onclick="window.moveRepeatableItem('empanelments', ${idx}, 'up')" ${idx === 0 ? 'disabled' : ''} class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold">▲</button>
                    <button onclick="window.moveRepeatableItem('empanelments', ${idx}, 'down')" ${idx === emps.length - 1 ? 'disabled' : ''} class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold">▼</button>
                    <button onclick="window.deleteRepeatableItem('empanelments', ${idx})" class="px-2 py-1 rounded bg-red-500/20 text-red-300 text-[10px] font-bold">✕</button>
                  </div>
                </div>
                <div>
                  <div class="font-extrabold text-white text-xs">${e.name}</div>
                  <div class="text-[10px] text-slate-400 font-mono">${e.category}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (moduleKey === 'administration') {
      const adminTeam = store.data.administration || [];
      return `
        <div class="glass-card-dark p-8 rounded-3xl border border-slate-800 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 class="text-xl font-bold text-white font-heading">Administrative Management Team</h2>
              <p class="text-xs text-slate-400 mt-1">Add, edit, remove, or reorder administrative staff profiles.</p>
            </div>
            <button onclick="window.addRepeatableItem('administration', event)" class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400">
              + Add Team Member
            </button>
          </div>

          <div class="space-y-4">
            ${adminTeam.map((m, idx) => `
              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-slate-800 text-emerald-400 font-extrabold text-sm flex items-center justify-center font-heading">
                      ${m.name ? m.name[0] : 'A'}
                    </div>
                    <div>
                      <h4 class="font-extrabold text-white text-sm font-heading">${m.name}</h4>
                      <div class="text-xs text-slate-400">${m.role}</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button onclick="window.moveRepeatableItem('administration', ${idx}, 'up')" ${idx === 0 ? 'disabled' : ''} class="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-bold">▲ Up</button>
                    <button onclick="window.moveRepeatableItem('administration', ${idx}, 'down')" ${idx === adminTeam.length - 1 ? 'disabled' : ''} class="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-bold">▼ Down</button>
                    <button onclick="window.deleteRepeatableItem('administration', ${idx})" class="p-1.5 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-bold">Delete</button>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label class="block font-bold text-slate-300 mb-1">Full Name</label>
                    <input type="text" id="admin-team-name-${m.id}" value="${m.name}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-300 mb-1">Role / Designation</label>
                    <input type="text" id="admin-team-role-${m.id}" value="${m.role}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
                  </div>
                </div>

                <button onclick="window.saveAdminTeamMember('${m.id}')" class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400">
                  Save Member Details
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return `<div>Select Module</div>`;
  }

  // 4. SITE SETTINGS MODULE VIEW
  function renderAdminSiteSettingsView() {
    const cms = window.cmsClient;
    const settings = cms ? cms.getSiteSettings() : {};

    return `
      <div class="glass-card-dark p-8 rounded-3xl border border-slate-800 space-y-6 font-sans">
        
        <div class="border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold text-white font-heading">Global Site Settings</h2>
          <p class="text-xs text-slate-400 mt-1">Manage official hospital logo, primary phone number, footer text, and social media channels.</p>
        </div>

        <form onsubmit="window.saveSiteSettings(event)" class="space-y-6">
          
          <!-- Logo Management -->
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 admin-upload-zone">
            <h3 class="font-extrabold text-white text-sm font-heading">1. Hospital Logo Asset (.jpg / .png only, Max 10MB)</h3>
            
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <div class="w-20 h-20 rounded-full bg-white p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0">
                <img id="site-logo-preview" src="${settings.logo || 'assets/official_logo.jpg'}" alt="${settings.logoAlt || 'Logo'}" class="w-full h-full object-contain" />
              </div>
              
              <div class="space-y-2 flex-1">
                <label class="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer">
                  Replace Site Logo (.jpg / .png)
                  <input type="file" accept="image/jpeg, image/jpg, image/png" onchange="window.handleLogoUpload(event)" class="hidden" />
                </label>
                <div class="text-[11px] text-slate-400 font-mono">Max size: 10 MB</div>
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-bold text-slate-300">Logo Accessibility Alt Text</label>
              <input type="text" id="site-logoAlt" value="${settings.logoAlt || ''}" required class="w-full p-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none" />
            </div>
          </div>

          <!-- Primary Enquiry Phone Number -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-200">Primary Sitewide Enquiry Phone Number</label>
            <input type="text" id="site-primaryPhone" value="${settings.primaryPhone || ''}" required class="w-full p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none" />
          </div>

          <!-- Footer Copy -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-200">Footer Tagline & Copyright Description</label>
            <textarea id="site-footerText" rows="2" class="w-full p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none">${settings.footerText || ''}</textarea>
          </div>

          <!-- Social Links List -->
          <div class="space-y-3">
            <h3 class="font-extrabold text-white text-sm font-heading">Social Media Channels</h3>
            
            <div class="space-y-3">
              ${(settings.socialLinks || []).map((s, idx) => `
                <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                  <span class="w-28 text-xs font-bold text-emerald-400 font-mono">${s.platform}</span>
                  <input type="url" id="social-url-${idx}" value="${s.url}" class="flex-1 p-2 rounded-lg bg-slate-950 text-white text-xs border border-slate-700" />
                  <label class="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <input type="checkbox" id="social-enable-${idx}" ${s.enabled ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-500" />
                    <span>Enabled</span>
                  </label>
                </div>
              `).join('')}
            </div>
          </div>

          <button type="submit" class="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition-colors shadow-lg">
            Save Site Settings
          </button>
        </form>

      </div>
    `;
  }

  // --- ADMIN HANDLERS & HANDSHAKES ---

  window.handleAdminLoginSubmit = async function(e) {
    e.preventDefault();
    const userElem = document.getElementById('admin-username');
    const passElem = document.getElementById('admin-password');
    const btnElem = document.getElementById('admin-login-submit');
    const btnText = document.getElementById('admin-login-btn-text');
    const errBanner = document.getElementById('admin-login-error');

    if (!userElem || !passElem) return;
    errBanner.classList.add('hidden');

    const username = userElem.value.trim();
    const password = passElem.value;

    if (btnElem) btnElem.disabled = true;
    if (btnText) btnText.textContent = "Signing In...";

    try {
      const res = await window.authClient.login(username, password);
      if (res.success) {
        window.showAdminToast("Authenticated successfully. Opening dashboard...", "success");
        setTimeout(() => navigateTo('/admin/dashboard'), 150);
      } else {
        if (errBanner) {
          errBanner.textContent = res.error || "Invalid username or password.";
          errBanner.classList.remove('hidden');
        }
        if (btnElem) btnElem.disabled = false;
        if (btnText) btnText.textContent = "Sign In";
      }
    } catch (err) {
      console.error(err);
      if (errBanner) {
        errBanner.textContent = "An unexpected login error occurred.";
        errBanner.classList.remove('hidden');
      }
      if (btnElem) btnElem.disabled = false;
      if (btnText) btnText.textContent = "Sign In";
    }
  };

  window.toggleAdminPasswordVisibility = function() {
    const passInput = document.getElementById('admin-password');
    if (!passInput) return;
    if (passInput.type === 'password') {
      passInput.type = 'text';
    } else {
      passInput.type = 'password';
    }
  };

  window.toggleForgotPasswordNotice = function() {
    const notice = document.getElementById('forgot-password-notice');
    if (notice) notice.classList.toggle('hidden');
  };

  window.handleAdminLogout = function() {
    if (window.authClient) {
      window.authClient.logout();
    }
    window.showAdminToast("Logged out of Admin Session", "success");
    navigateTo('/admin');
  };

  window.switchAdminSection = function(sectionId) {
    window.activeAdminSection = sectionId;
    window.location.hash = `/admin/dashboard/${sectionId}`;
    render();
  };

  window.markCardUnsaved = function(sectionKey) {
    const card = document.getElementById(`editor-card-${sectionKey}`);
    if (card) card.classList.add('border-amber-500/50');
  };

  window.applyRichText = function(sectionKey, type) {
    const textarea = document.getElementById(`card-content-${sectionKey}`);
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end) || "text";
    let replacement = "";

    if (type === 'bold') replacement = `<b>${selected}</b>`;
    if (type === 'italic') replacement = `<i>${selected}</i>`;
    if (type === 'ul') replacement = `\n<ul>\n  <li>${selected}</li>\n</ul>\n`;
    if (type === 'ol') replacement = `\n<ol>\n  <li>${selected}</li>\n</ol>\n`;

    textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    window.markCardUnsaved(sectionKey);
  };

  window.handleCmsImageUpload = function(event, sectionKey) {
    /* FRONTEND-ONLY TRUST BOUNDARY: Client-side MIME type, size & pixel dimension validation — must be re-enforced server-side before production deployment with a real backend */
    const file = event.target.files[0];
    const container = event.target.closest('.admin-upload-zone') || event.target.parentElement;
    if (!file) return;

    const nameLower = file.name.toLowerCase();
    const rejectedExtensions = ['.webp', '.svg', '.gif', '.pdf', '.docx', '.exe', '.bmp', '.tiff'];
    const isRejected = rejectedExtensions.some(ext => nameLower.endsWith(ext));

    // Validate MIME type: ONLY .jpg, .jpeg, .png
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const isJpegOrPng = validMimeTypes.includes(file.type.toLowerCase()) || 
                        nameLower.endsWith('.jpg') || 
                        nameLower.endsWith('.jpeg') || 
                        nameLower.endsWith('.png');

    if (isRejected || !isJpegOrPng) {
      window.showAdminToast("Invalid File Format: Admin accepts ONLY .jpg or .png images (rejected .webp, .svg, .gif, .pdf, .docx, .exe).", "error");
      event.target.value = '';
      return;
    }

    // Validate size: Max 5MB per image
    if (file.size > 5 * 1024 * 1024) {
      window.showAdminToast("File size exceeds 5MB maximum limit.", "error");
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Src = e.target.result;

      // Dimension Re-validation Check via HTMLImageElement
      const img = new Image();
      img.onload = function() {
        if (img.naturalWidth <= 0 || img.naturalHeight <= 0) {
          window.showAdminToast("Corrupted or invalid image file.", "error");
          return;
        }
        if (window.cmsClient) {
          window.cmsClient.saveDraft(sectionKey, { image: base64Src });
        }
        window.showAdminToast("Image uploaded & verified successfully", "success");
        render();
      };
      img.onerror = function() {
        window.showAdminToast("Failed to decode image pixels.", "error");
      };
      img.src = base64Src;
    };
    reader.readAsDataURL(file);
  };

  window.removeCmsImage = function(sectionKey) {
    if (window.cmsClient) {
      window.cmsClient.saveDraft(sectionKey, { image: "", altText: "" });
    }
    window.showAdminToast("Image removed from card", "success");
    render();
  };

  window.saveCmsDraft = function(sectionKey) {
    const title = document.getElementById(`card-title-${sectionKey}`)?.value;
    const subtitle = document.getElementById(`card-subtitle-${sectionKey}`)?.value;
    const content = document.getElementById(`card-content-${sectionKey}`)?.value;
    const altText = document.getElementById(`card-alt-${sectionKey}`)?.value;

    if (window.cmsClient) {
      window.cmsClient.saveDraft(sectionKey, { title, subtitle, content, altText });
      window.showAdminToast("Draft saved successfully.", "success");
      render();
    }
  };

  window.publishCmsContent = function(sectionKey) {
    const title = document.getElementById(`card-title-${sectionKey}`)?.value;
    const subtitle = document.getElementById(`card-subtitle-${sectionKey}`)?.value;
    const content = document.getElementById(`card-content-${sectionKey}`)?.value;
    const altText = document.getElementById(`card-alt-${sectionKey}`)?.value;
    const errEl = document.getElementById(`card-alt-err-${sectionKey}`);

    const rec = window.cmsClient.getContent(sectionKey);

    // Image Alt Text Mandatory Check
    if (rec.image && (!altText || altText.trim() === "")) {
      if (errEl) errEl.classList.remove('hidden');
      window.showAdminToast("Alt text is required for accessibility.", "error");
      return;
    }
    if (errEl) errEl.classList.add('hidden');

    try {
      const seoTitle = document.getElementById(`seo-title-${sectionKey}`)?.value;
      const seoDescription = document.getElementById(`seo-meta-${sectionKey}`)?.value;

      window.cmsClient.publishContent(sectionKey, { title, subtitle, content, altText, seoTitle, seoDescription });
      window.showAdminToast("Content published successfully with custom SEO metadata.", "success");
      render();
    } catch (e) {
      window.showAdminToast(e.message || "Publish failed.", "error");
    }
  };

  window.saveDoctorProfile = function(docId) {
    const store = window.appStore;
    const leaders = store.data.leadership || [];
    const doc = leaders.find(d => d.id === docId);

    if (doc) {
      const nameInput = document.getElementById(`doc-name-${docId}`)?.value;
      const titleInput = document.getElementById(`doc-title-${docId}`)?.value;
      const degreesInput = document.getElementById(`doc-degrees-${docId}`)?.value;
      const bioInput = document.getElementById(`doc-bio-${docId}`)?.value;

      if (nameInput) doc.name = nameInput;
      if (titleInput) doc.title = titleInput;
      if (degreesInput) doc.degrees = degreesInput;
      if (bioInput) doc.bio = bioInput;

      store.save();
      window.showAdminToast(`Saved profile for ${doc.name}`, 'success');
      render();
    }
  };

  window.handleAdminPhotoUpload = function(event, docId) {
    /* FRONTEND-ONLY TRUST BOUNDARY: Client-side MIME type, size & pixel dimension validation */
    const file = event.target.files[0];
    if (!file) return;

    const nameLower = file.name.toLowerCase();
    const rejectedExtensions = ['.webp', '.svg', '.gif', '.pdf', '.docx', '.exe', '.bmp', '.tiff'];
    const isRejected = rejectedExtensions.some(ext => nameLower.endsWith(ext));

    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const isJpegOrPng = validMimeTypes.includes(file.type.toLowerCase()) || 
                        nameLower.endsWith('.jpg') || 
                        nameLower.endsWith('.jpeg') || 
                        nameLower.endsWith('.png');

    if (isRejected || !isJpegOrPng) {
      window.showAdminToast("Invalid File Format: Admin accepts ONLY .jpg or .png images.", "error");
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.showAdminToast("File size exceeds 5MB maximum limit.", "error");
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Src = e.target.result;
      const img = new Image();
      img.onload = function() {
        if (img.naturalWidth <= 0 || img.naturalHeight <= 0) {
          window.showAdminToast("Corrupted image file.", "error");
          return;
        }
        const store = window.appStore;
        const leaders = store.data.leadership || [];
        const doc = leaders.find(d => d.id === docId);
        if (doc) {
          doc.photo = base64Src;
          store.save();
          window.showAdminToast(`Uploaded photo for ${doc.name}`, "success");
          render();
        }
      };
      img.onerror = function() {
        window.showAdminToast("Failed to decode image pixels.", "error");
      };
      img.src = base64Src;
    };
    reader.readAsDataURL(file);
  };

  window.saveSiteSettings = function(e) {
    e.preventDefault();
    const primaryPhone = document.getElementById('site-primaryPhone')?.value;
    const footerText = document.getElementById('site-footerText')?.value;
    const logoAlt = document.getElementById('site-logoAlt')?.value;

    if (window.cmsClient) {
      window.cmsClient.updateSiteSettings({ primaryPhone, footerText, logoAlt });
      window.showAdminToast("Site Settings saved successfully.", "success");
      render();
    }
  };

  window.handleLogoUpload = function(event) {
    /* FRONTEND-ONLY TRUST BOUNDARY: Client-side MIME type, size & pixel dimension validation — must be re-enforced server-side before production deployment with a real backend */
    const file = event.target.files[0];
    if (!file) return;

    const nameLower = file.name.toLowerCase();
    const rejectedExtensions = ['.webp', '.svg', '.gif', '.pdf', '.docx', '.exe', '.bmp', '.tiff'];
    const isRejected = rejectedExtensions.some(ext => nameLower.endsWith(ext));

    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const isJpegOrPng = validMimeTypes.includes(file.type.toLowerCase()) || 
                        nameLower.endsWith('.jpg') || 
                        nameLower.endsWith('.jpeg') || 
                        nameLower.endsWith('.png');

    if (isRejected || !isJpegOrPng) {
      window.showAdminToast("Invalid File Format: Admin accepts ONLY .jpg or .png images (rejected .webp, .svg, .gif, .pdf, .docx, .exe).", "error");
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.showAdminToast("File size exceeds 5MB maximum limit.", "error");
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Src = e.target.result;
      const img = new Image();
      img.onload = function() {
        if (img.naturalWidth <= 0 || img.naturalHeight <= 0) {
          window.showAdminToast("Corrupted or invalid logo image file.", "error");
          return;
        }
        if (window.cmsClient) {
          window.cmsClient.updateSiteSettings({ logo: base64Src });
        }
        window.showAdminToast("Logo asset replaced & verified", "success");
        render();
      };
      img.onerror = function() {
        window.showAdminToast("Failed to decode logo image pixels.", "error");
      };
      img.src = base64Src;
    };
    reader.readAsDataURL(file);
  };

  window.moveRepeatableItem = function(moduleKey, index, direction) {
    const store = window.appStore;
    let list = [];
    if (moduleKey === 'vision-centers') list = store.data.facilities;
    if (moduleKey === 'empanelments') list = store.data.empanelments;
    if (moduleKey === 'administration') list = store.data.administration;

    if (!list || list.length === 0) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const [moved] = list.splice(index, 1);
    list.splice(targetIdx, 0, moved);
    store.save();
    window.showAdminToast(`Item moved ${direction}`, "success");
    render();
  };

  window.addRepeatableItem = function(moduleKey, e) {
    if (e) e.preventDefault();
    const store = window.appStore;

    if (moduleKey === 'vision-centers') {
      const name = prompt("Enter new Vision Center Name:", "New Vision Center");
      if (name) {
        store.data.facilities.push({
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name,
          town: name,
          phone: "08352-220646",
          hours: "9:00 AM – 6:00 PM",
          address: `${name} Main Road, Vijayapura District`
        });
        store.save();
        window.showAdminToast("Added Vision Center", "success");
        render();
      }
    }

    if (moduleKey === 'empanelments') {
      const name = prompt("Enter Insurance Company / Partner Name:", "New Insurance Co.");
      if (name) {
        store.data.empanelments.push({
          name,
          category: "Insurance Providers",
          code: name.substring(0, 4).toUpperCase()
        });
        store.save();
        window.showAdminToast("Added Insurance Partner", "success");
        render();
      }
    }

    if (moduleKey === 'administration') {
      const name = prompt("Enter Staff Member Name:", "New Staff Member");
      if (name) {
        if (!store.data.administration) store.data.administration = [];
        store.data.administration.push({
          id: Date.now().toString(),
          name,
          role: "Ophthalmic Administrator",
          tenure: "1 Year",
          qualifications: "Bachelor's Degree",
          desc: "Administrative coordination."
        });
        store.save();
        window.showAdminToast("Added Team Member", "success");
        render();
      }
    }
  };

  window.deleteRepeatableItem = function(moduleKey, index) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const store = window.appStore;

    if (moduleKey === 'vision-centers') store.data.facilities.splice(index, 1);
    if (moduleKey === 'empanelments') store.data.empanelments.splice(index, 1);
    if (moduleKey === 'administration') store.data.administration.splice(index, 1);

    store.save();
    window.showAdminToast("Item deleted", "success");
    render();
  };

  window.saveRepeatableItem = function(moduleKey, index) {
    const store = window.appStore;

    if (moduleKey === 'vision-centers') {
      const fac = store.data.facilities[index];
      if (fac) {
        fac.name = document.getElementById(`vc-name-${index}`)?.value || fac.name;
        fac.town = document.getElementById(`vc-town-${index}`)?.value || fac.town;
        fac.phone = document.getElementById(`vc-phone-${index}`)?.value || fac.phone;
        fac.hours = document.getElementById(`vc-hours-${index}`)?.value || fac.hours;
        fac.address = document.getElementById(`vc-address-${index}`)?.value || fac.address;
        store.save();
        window.showAdminToast(`Saved changes for ${fac.name}`, "success");
        render();
      }
    }
  };

  // ADMIN DASHBOARD WORKFLOW MOTION ENGINE
  window.showAdminToast = function(message, type = 'success') {
    let container = document.getElementById('admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'admin-toast-container';
      container.className = 'fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `admin-toast pointer-events-auto p-4 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs font-bold ${
      type === 'success' ? 'bg-teal-950 text-white border-emerald-500/40' : 'bg-red-950 text-white border-red-500/40'
    }`;

    const icon = type === 'success' ? `
      <div class="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      </div>
    ` : `
      <div class="w-7 h-7 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
      </div>
    `;

    toast.innerHTML = `${icon}<span class="flex-1">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('is-hiding');
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  };

  window.setAdminTab = function(tabId) {
    window.activeAdminTab = tabId;
    render();
  };

  window.saveBrandAdmin = function(e) {
    e.preventDefault();
    store.updateBrand({
      fallbackPhone: document.getElementById('admin-fallbackPhone').value,
      whatsappPhone: document.getElementById('admin-whatsappPhone').value,
      contactEmail: document.getElementById('admin-contactEmail').value,
      vision: document.getElementById('admin-vision').value
    });
    window.showAdminToast("Brand & Telephony updated sitewide!", "success");
    render();
  };

  window.saveStatsAdmin = function(e) {
    e.preventDefault();
    store.updateStats({
      lifetimeSurgeries: document.getElementById('admin-lifetimeSurgeries').value,
      outreachCamps: document.getElementById('admin-outreachCamps').value,
      freeCataracts: document.getElementById('admin-freeCataracts').value,
      studentsScreened: document.getElementById('admin-studentsScreened').value,
      annualFreePatients: document.getElementById('admin-annualFreePatients').value,
      totalPeopleReached: document.getElementById('admin-totalPeopleReached').value
    });
    window.showAdminToast("Dashboard lifetime metrics updated sitewide!", "success");
    render();
  };

  window.handleAdminPhotoUpload = function(event, memberId) {
    const file = event.target.files[0];
    const container = event.target.closest('.admin-upload-zone') || event.target.parentElement;
    if (!file) return;

    // Check size limit (5MB) and mime type
    if (file.size > 5 * 1024 * 1024 || !file.type.startsWith('image/')) {
      if (container) {
        container.classList.remove('admin-error-shake');
        void container.offsetWidth;
        container.classList.add('admin-error-shake');
        setTimeout(() => container.classList.remove('admin-error-shake'), 350);
      }
      window.showAdminToast("Upload failed: File exceeds 5MB limit or is not an image", "error");
      return;
    }

    // Render animated progress bar state
    if (container) {
      const existingProg = container.querySelector('.upload-prog-bar');
      if (existingProg) existingProg.remove();
      container.insertAdjacentHTML('beforeend', `
        <div class="upload-prog-bar w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mt-2">
          <div class="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style="width: 0%"></div>
        </div>
      `);
      const pBar = container.querySelector('.upload-prog-bar div');
      requestAnimationFrame(() => { if (pBar) pBar.style.width = '100%'; });
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Src = e.target.result;
      let member = (store.data.leadership || []).find(m => m.id === memberId);
      if (!member) {
        member = (store.data.administration || []).find(m => m.id === memberId);
      }

      if (member) {
        member.photo = base64Src;
        store.save();
        window.showAdminToast(`Photo uploaded & optimized for ${member.name.split(' ')[0]}`, 'success');
        setTimeout(() => render(), 500);
      }
    };
    reader.readAsDataURL(file);
  };

  window.saveAdminTeamMember = function(memberId) {
    const member = store.data.administration ? store.data.administration.find(m => m.id === memberId) : null;
    if (!member) return;

    const nameInput = document.getElementById(`admin-team-name-${memberId}`);
    const roleInput = document.getElementById(`admin-team-role-${memberId}`);
    const tenureInput = document.getElementById(`admin-team-tenure-${memberId}`);
    const qualInput = document.getElementById(`admin-team-qual-${memberId}`);
    const descInput = document.getElementById(`admin-team-desc-${memberId}`);

    if (nameInput) member.name = nameInput.value;
    if (roleInput) member.role = roleInput.value;
    if (tenureInput) member.tenure = tenureInput.value;
    if (qualInput) member.qualifications = qualInput.value;
    if (descInput) member.desc = descInput.value;

    store.save();
    window.showAdminToast(`Saved profile details for ${member.name.split(' ')[0]}`, 'success');
    render();
  };

  window.saveDataGapsAdmin = function(e) {
    e.preventDefault();
    store.updateDataGaps({
      kalaburagiAddressConfirmed: document.getElementById('admin-kalaburagiConfirmed').checked,
      servicesContentConfirmed: document.getElementById('admin-servicesConfirmed').checked
    });
    window.showAdminToast("Data gap audit controls updated!", "success");
    render();
  };

  window.resetAdminStore = function() {
    if (confirm("Reset all local admin modifications to default hospital config?")) {
      store.resetToDefaults();
      window.showAdminToast("Restored default hospital config", "success");
      render();
    }
  };

  window.exportAdminStore = function() {
    const jsonStr = store.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anugraha_config_${Date.now()}.json`;
    a.click();
    window.showAdminToast("Exported configuration JSON file", "success");
  };

  window.saveAdminAcademicProgram = function(id, event) {
    if (event) event.preventDefault();
    const title = document.getElementById(`admin-acad-title-${id}`)?.value;
    const recognizedBy = document.getElementById(`admin-acad-recognized-${id}`)?.value;
    const duration = document.getElementById(`admin-acad-duration-${id}`)?.value;
    const eligibility = document.getElementById(`admin-acad-eligibility-${id}`)?.value;
    const desc = document.getElementById(`admin-acad-desc-${id}`)?.value;
    const imagePlaceholder = document.getElementById(`admin-acad-image-${id}`)?.value;

    store.updateAcademicProgram(id, { title, recognizedBy, duration, eligibility, desc, imagePlaceholder });
    window.showAdminToast(`Saved changes for ${title}`, 'success');
    render();
  };

  window.handleAdminAcademicImageUpload = function(event, programId) {
    const file = event.target.files[0];
    const container = event.target.closest('.admin-upload-zone') || event.target.parentElement;
    if (!file) return;

    // Strict validation: ONLY .jpg / .jpeg and .png formats allowed (and <= 5MB)
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const isJpegOrPng = validMimeTypes.includes(file.type.toLowerCase()) || 
                        file.name.toLowerCase().endsWith('.jpg') || 
                        file.name.toLowerCase().endsWith('.jpeg') || 
                        file.name.toLowerCase().endsWith('.png');

    if (file.size > 5 * 1024 * 1024 || !isJpegOrPng) {
      if (container) {
        container.classList.remove('admin-error-shake');
        void container.offsetWidth;
        container.classList.add('admin-error-shake');
        setTimeout(() => container.classList.remove('admin-error-shake'), 350);
      }
      event.target.value = ''; // Clear invalid file input
      window.showAdminToast("Invalid File Format: Admin can ONLY upload images in .jpg or .png format.", "error");
      return;
    }

    // Render animated progress bar state
    if (container) {
      const existingProg = container.querySelector('.upload-prog-bar');
      if (existingProg) existingProg.remove();
      container.insertAdjacentHTML('beforeend', `
        <div class="upload-prog-bar w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mt-2">
          <div class="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style="width: 0%"></div>
        </div>
      `);
      const pBar = container.querySelector('.upload-prog-bar div');
      requestAnimationFrame(() => { if (pBar) pBar.style.width = '100%'; });
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Src = e.target.result;
      const prog = store.getAcademicProgramById(programId);
      if (prog) {
        prog.imagePlaceholder = base64Src;
        store.updateAcademicProgram(programId, { imagePlaceholder: base64Src });
        
        const inputElem = document.getElementById(`admin-acad-image-${programId}`);
        if (inputElem) inputElem.value = base64Src;

        window.showAdminToast(`Uploaded & optimized image (.jpg / .png format) for ${prog.title}`, 'success');
        setTimeout(() => render(), 400);
      }
    };
    reader.readAsDataURL(file);
  };

  window.handleAdminGalleryPhotoUpload = function(event) {
    const file = event.target.files[0];
    const container = event.target.closest('.admin-upload-zone') || event.target.parentElement;
    if (!file) return;

    // Strict validation: ONLY .jpg / .jpeg and .png formats allowed (and <= 5MB)
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const isJpegOrPng = validMimeTypes.includes(file.type.toLowerCase()) || 
                        file.name.toLowerCase().endsWith('.jpg') || 
                        file.name.toLowerCase().endsWith('.jpeg') || 
                        file.name.toLowerCase().endsWith('.png');

    if (file.size > 5 * 1024 * 1024 || !isJpegOrPng) {
      if (container) {
        container.classList.remove('admin-error-shake');
        void container.offsetWidth;
        container.classList.add('admin-error-shake');
        setTimeout(() => container.classList.remove('admin-error-shake'), 350);
      }
      event.target.value = '';
      window.showAdminToast("Invalid File Format: Gallery upload ONLY allows images in .jpg or .png format.", "error");
      return;
    }

    const title = document.getElementById('admin-gallery-title')?.value || file.name;
    const category = document.getElementById('admin-gallery-cat')?.value || 'Base Hospital';
    const caption = document.getElementById('admin-gallery-caption')?.value || 'Uploaded gallery photo';

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Src = e.target.result;
      store.addGalleryItem({ title, category, caption, src: base64Src });
      window.showAdminToast(`Uploaded gallery photo "${title}" (.jpg / .png format)`, 'success');
      render();
    };
    reader.readAsDataURL(file);
  };

  window.handleAdminVideoUpload = function(event) {
    const file = event.target.files[0];
    const container = event.target.closest('.admin-upload-zone') || event.target.parentElement;
    if (!file) return;

    // Strict validation: ONLY .mp4 video format allowed (and <= 25MB)
    const isMp4 = file.type === 'video/mp4' || file.name.toLowerCase().endsWith('.mp4');

    if (file.size > 25 * 1024 * 1024 || !isMp4) {
      if (container) {
        container.classList.remove('admin-error-shake');
        void container.offsetWidth;
        container.classList.add('admin-error-shake');
        setTimeout(() => container.classList.remove('admin-error-shake'), 350);
      }
      event.target.value = '';
      window.showAdminToast("Invalid Video Format: Admin can ONLY upload video files in .mp4 format.", "error");
      return;
    }

    const title = document.getElementById('admin-video-title')?.value || file.name;
    const category = document.getElementById('admin-video-cat')?.value || 'Surgical Video';

    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Src = e.target.result;
      store.addVideoItem({ title, category, videoUrl: base64Src, isMp4: true });
      window.showAdminToast(`Uploaded video "${title}" (.mp4 format)`, 'success');
      render();
    };
    reader.readAsDataURL(file);
  };

  window.addAdminEmpanelment = function(e) {
    e.preventDefault();
    const name = document.getElementById('admin-emp-name').value;
    const category = document.getElementById('admin-emp-cat').value;
    const code = document.getElementById('admin-emp-code').value;

    if (!this.data) this.data = store.data;
    if (!store.data.empanelments) store.data.empanelments = [];
    store.data.empanelments.unshift({ name, category, code });
    store.save();

    window.showAdminToast(`Empaneled partner "${name}" added`, 'success');
    render();
  };

  window.removeAdminEmpanelment = function(code) {
    if (!store.data.empanelments) return;
    store.data.empanelments = store.data.empanelments.filter(e => e.code !== code);
    store.save();
    window.showAdminToast(`Removed partner (${code})`, 'success');
    render();
  };

  window.removeAdminGalleryItem = function(id) {
    store.removeGalleryItem(id);
    window.showAdminToast("Gallery photo removed", "success");
    render();
  };

  window.removeAdminVideoItem = function(id) {
    store.removeVideoItem(id);
    window.showAdminToast("Video item removed", "success");
    render();
  };

  function initAdminListDragAndDrop() {
    const dragItems = document.querySelectorAll('.admin-drag-item');
    let draggedIndex = null;
    let dragListType = null;

    dragItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        draggedIndex = parseInt(item.getAttribute('data-drag-index'));
        dragListType = item.getAttribute('data-drag-list');
        item.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('is-dragging');
        dragItems.forEach(i => i.classList.remove('admin-drag-over'));
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        item.classList.add('admin-drag-over');
      });

      item.addEventListener('dragleave', () => {
        item.classList.remove('admin-drag-over');
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('admin-drag-over');
        const targetIndex = parseInt(item.getAttribute('data-drag-index'));
        const targetListType = item.getAttribute('data-drag-list');

        if (draggedIndex === null || dragListType !== targetListType || draggedIndex === targetIndex) return;

        if (targetListType === 'administration') {
          const list = store.data.administration;
          const [moved] = list.splice(draggedIndex, 1);
          list.splice(targetIndex, 0, moved);
          store.save();
          window.showAdminToast("Administrative team reordered successfully", "success");
          render();
        } else if (targetListType === 'facilities') {
          const list = store.data.facilities;
          const [moved] = list.splice(draggedIndex, 1);
          list.splice(targetIndex, 0, moved);
          store.save();
          window.showAdminToast("Vision Centers directory reordered successfully", "success");
          render();
        }
      });
    });
  }

  window.editFacilityPrompt = function(facId) {
    const fac = store.getFacilityById(facId);
    if (!fac) return;
    const newPhone = prompt(`Enter new telephone number for ${fac.name}:`, fac.phone);
    if (newPhone) {
      const newHours = prompt(`Enter operating hours for ${fac.name}:`, fac.hours);
      store.updateFacility(facId, { phone: newPhone, hours: newHours || fac.hours });
      alert("Facility updated!");
      render();
    }
  };

  window.resetAdminStore = function() {
    if (confirm("Reset all store modifications to factory defaults?")) {
      store.reset();
      render();
    }
  };

  window.exportAdminStore = function() {
    const jsonStr = store.exportJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anugraha_hospital_config.json";
    a.click();
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

  // Central Render Loop
  function render() {
    updatePageSEO(currentPath);
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
    initAdminListDragAndDrop();
    initSpotlightHoverTracker();
  }

  // Initial Run
  initInitialApertureLoader();
  render();
});
