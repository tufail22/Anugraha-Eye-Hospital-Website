/**
 * Anugraha Eye Hospital — Reusable Admin Component Suite (Browser Vanilla JS)
 * Location: /js/admin-components.js
 * 
 * Modular reusable Admin UI renderers:
 * - ImageUploader
 * - EditableTextField
 * - EditableTextarea
 * - SectionEditor
 * - LocationEditor
 * - DoctorEditor
 * - SEOEditor
 */

(function() {

  /**
   * Reusable ImageUploader Component
   * Strictly enforces .jpg / .jpeg / .png, <= 5MB file size, and rejects .webp, .svg, .gif, .pdf, .docx, .exe, etc.
   */
  window.renderImageUploader = function(props) {
    const id = props.id;
    const label = props.label || "Upload Image (.jpg / .png only, Max 5MB)";
    const currentImage = props.currentImage || "";
    const currentAlt = props.currentAlt || "";
    const uploadHandler = props.onUploadHandlerName || `window.handleCmsImageUpload(event, '${id}')`;
    const removeHandler = props.onRemoveHandlerName || `window.removeCmsImage('${id}')`;
    const helpText = props.helpText || "Strictly allowed: .jpg, .jpeg, .png (Max 5MB). Rejects .webp, .svg, .gif, .pdf, .docx, .exe.";

    return `
      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 admin-upload-zone">
        <label for="img-input-${id}" class="block text-xs font-bold text-slate-200">
          ${label} <span class="text-red-400 font-bold">* Mandatory Alt Text on Publish</span>
        </label>

        ${currentImage ? `
          <div class="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div class="w-24 h-24 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
              <img id="preview-img-${id}" src="${currentImage}" alt="${currentAlt || 'Image preview'}" class="w-full h-full object-cover" />
            </div>
            <div class="space-y-2 flex-1 w-full">
              <div class="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Image File Attached (.jpg / .png)</span>
              </div>
              <div class="flex items-center gap-2">
                <label class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer">
                  Replace Image
                  <input type="file" id="img-input-${id}" accept="image/jpeg, image/jpg, image/png" onchange="${uploadHandler}" class="hidden" />
                </label>
                <button type="button" onclick="${removeHandler}" class="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-bold">
                  Remove Image
                </button>
              </div>
            </div>
          </div>
        ` : `
          <div class="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center space-y-2">
            <div class="text-slate-400 text-xs">Drag and drop or click to browse image (.jpg / .png only)</div>
            <label class="inline-block px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs cursor-pointer hover:bg-emerald-400 transition-colors shadow-md">
              Browse Image (.jpg / .png)
              <input type="file" id="img-input-${id}" accept="image/jpeg, image/jpg, image/png" onchange="${uploadHandler}" class="hidden" />
            </label>
          </div>
        `}

        <div class="space-y-1">
          <label for="img-alt-${id}" class="block text-[11px] font-bold text-slate-300">Image Accessibility Alt Text</label>
          <input type="text" id="img-alt-${id}" value="${currentAlt}" placeholder="Describe image content for accessibility" oninput="window.markCardUnsaved('${id}')" class="w-full p-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none" />
          <div id="img-alt-err-${id}" class="hidden text-[11px] font-bold text-red-400">Alt text is required for accessibility.</div>
        </div>

        <p class="text-[10px] text-slate-500 font-mono">${helpText}</p>
      </div>
    `;
  };

  /**
   * Reusable EditableTextField Component
   */
  window.renderEditableTextField = function(props) {
    const id = props.id;
    const label = props.label;
    const value = props.value || "";
    const placeholder = props.placeholder || "";
    const type = props.type || "text";

    return `
      <div class="space-y-1.5">
        <label for="${id}" class="block text-xs font-bold text-slate-200">${label}</label>
        <input type="${type}" id="${id}" value="${value}" placeholder="${placeholder}" oninput="window.markCardUnsaved('${id.split('-')[0]}')" class="w-full p-3 rounded-xl bg-slate-900 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none" />
      </div>
    `;
  };

  /**
   * Reusable EditableTextarea Component with Rich-Text Formatting Toolbar
   */
  window.renderEditableTextarea = function(props) {
    const id = props.id;
    const label = props.label;
    const value = props.value || "";
    const rows = props.rows || 4;
    const enableRichText = props.enableRichText !== false;
    const sectionKey = id.split('-')[0];

    return `
      <div class="space-y-1.5">
        <label for="${id}" class="block text-xs font-bold text-slate-200">${label}</label>
        
        <div class="rounded-xl border border-slate-700 overflow-hidden bg-slate-900 space-y-2 p-2">
          ${enableRichText ? `
            <div class="flex items-center gap-1 border-b border-slate-800 pb-2">
              <button type="button" onclick="window.applyRichText('${sectionKey}', 'bold')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white" title="Bold">B</button>
              <button type="button" onclick="window.applyRichText('${sectionKey}', 'italic')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs italic font-bold text-white" title="Italic">I</button>
              <button type="button" onclick="window.applyRichText('${sectionKey}', 'ul')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white" title="Bullet List">• Bullet List</button>
              <button type="button" onclick="window.applyRichText('${sectionKey}', 'ol')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white" title="Numbered List">1. Num List</button>
            </div>
          ` : ''}

          <textarea id="${id}" rows="${rows}" oninput="window.markCardUnsaved('${sectionKey}')" class="w-full p-2.5 bg-transparent text-white text-xs outline-none resize-y">${value}</textarea>
        </div>
      </div>
    `;
  };

  /**
   * Reusable SEOEditor Component
   */
  window.renderSEOEditor = function(props) {
    const sectionKey = props.sectionKey;
    const currentTitle = props.currentTitle || "";
    const currentMetaDesc = props.currentMetaDescription || "";

    return `
      <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 class="font-extrabold text-white text-xs font-heading flex items-center gap-1.5">
            <span>🔍 SEO & Meta Description Customizer</span>
          </h3>
          <span class="text-[10px] text-emerald-400 font-mono">Module Route Meta</span>
        </div>

        <div class="space-y-3">
          <div class="space-y-1">
            <label for="seo-title-${sectionKey}" class="block text-[11px] font-bold text-slate-300">Page Browser Title (&lt;title&gt;)</label>
            <input type="text" id="seo-title-${sectionKey}" value="${currentTitle}" placeholder="e.g. Services | Anugraha Eye Hospital" oninput="window.markCardUnsaved('${sectionKey}')" class="w-full p-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none font-mono" />
          </div>

          <div class="space-y-1">
            <label for="seo-meta-${sectionKey}" class="block text-[11px] font-bold text-slate-300">Meta Description (&lt;meta name="description"&gt;)</label>
            <textarea id="seo-meta-${sectionKey}" rows="2" placeholder="Search engine snippet summary (150-160 characters)" oninput="window.markCardUnsaved('${sectionKey}')" class="w-full p-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-700 focus:ring-2 focus:ring-emerald-400 outline-none">${currentMetaDesc}</textarea>
          </div>
        </div>
      </div>
    `;
  };

  /**
   * Reusable LocationEditor Component for Vision Centers & Base Hospitals
   */
  window.renderLocationEditor = function(props) {
    const loc = props.location;
    const idx = props.index;

    return `
      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-mono font-bold text-xs">#${idx + 1}</span>
            <h3 class="font-extrabold text-white text-base font-heading">${loc.name}</h3>
            ${loc.type === 'base' ? `<span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">Base Hospital</span>` : ''}
          </div>
          
          <div class="flex items-center gap-2">
            <button type="button" onclick="window.moveRepeatableItem('vision-centers', ${idx}, 'up')" ${idx === 0 ? 'disabled' : ''} class="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-bold">▲ Up</button>
            <button type="button" onclick="window.moveRepeatableItem('vision-centers', ${idx}, 'down')" class="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-bold">▼ Down</button>
            ${loc.type !== 'base' ? `<button type="button" onclick="window.deleteRepeatableItem('vision-centers', ${idx})" class="p-1.5 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-bold">Delete</button>` : ''}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label for="vc-name-${idx}" class="block font-bold text-slate-300 mb-1">Facility Name</label>
            <input type="text" id="vc-name-${idx}" value="${loc.name}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
          </div>
          <div>
            <label for="vc-town-${idx}" class="block font-bold text-slate-300 mb-1">Town / Location</label>
            <input type="text" id="vc-town-${idx}" value="${loc.town || loc.name}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
          </div>
          <div>
            <label for="vc-phone-${idx}" class="block font-bold text-slate-300 mb-1">Telephone Number</label>
            <input type="text" id="vc-phone-${idx}" value="${loc.phone}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
          </div>
          <div>
            <label for="vc-hours-${idx}" class="block font-bold text-slate-300 mb-1">Operating Hours</label>
            <input type="text" id="vc-hours-${idx}" value="${loc.hours}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
          </div>
          <div class="sm:col-span-2">
            <label for="vc-address-${idx}" class="block font-bold text-slate-300 mb-1">Full Postal Address</label>
            <input type="text" id="vc-address-${idx}" value="${loc.address}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
          </div>
          ${loc.doctorVisits ? `
            <div class="sm:col-span-2">
              <label for="vc-docvisits-${idx}" class="block font-bold text-slate-300 mb-1">Doctor / Specialist Visit Schedule</label>
              <input type="text" id="vc-docvisits-${idx}" value="${loc.doctorVisits}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
            </div>
          ` : ''}
        </div>

        <button type="button" onclick="window.saveRepeatableItem('vision-centers', ${idx})" class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400">
          Save Location Details
        </button>
      </div>
    `;
  };

  /**
   * Reusable DoctorEditor Component for Founders & Medical Leadership Profiles
   */
  window.renderDoctorEditor = function(props) {
    const doc = props.doctor;

    return `
      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-slate-800 text-emerald-400 font-extrabold text-xl flex items-center justify-center overflow-hidden border-2 border-white shadow-md shrink-0 font-heading">
              ${doc.photo ? `<img src="${doc.photo}" alt="${doc.photoAlt || doc.name}" class="w-full h-full object-cover" />` : doc.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h4 class="font-extrabold text-white text-base font-heading">${doc.name}</h4>
              <div class="text-xs font-bold text-emerald-400">${doc.title} &bull; ${doc.degrees}</div>
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-[11px] font-bold text-slate-300">Upload Photo (.jpg / .png only)</label>
            <input type="file" accept="image/jpeg, image/jpg, image/png" onchange="window.handleAdminPhotoUpload(event, '${doc.id}')" class="text-xs text-slate-400 cursor-pointer" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label for="doc-name-${doc.id}" class="block font-bold text-slate-300 mb-1">Doctor Name</label>
            <input type="text" id="doc-name-${doc.id}" value="${doc.name}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
          </div>
          <div>
            <label for="doc-title-${doc.id}" class="block font-bold text-slate-300 mb-1">Title / Role</label>
            <input type="text" id="doc-title-${doc.id}" value="${doc.title}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
          </div>
          <div class="sm:col-span-2">
            <label for="doc-degrees-${doc.id}" class="block font-bold text-slate-300 mb-1">Degrees & Qualifications</label>
            <input type="text" id="doc-degrees-${doc.id}" value="${doc.degrees}" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700" />
          </div>
          <div class="sm:col-span-2">
            <label for="doc-bio-${doc.id}" class="block font-bold text-slate-300 mb-1">Professional Bio & Institutional Legacy</label>
            <textarea id="doc-bio-${doc.id}" rows="3" class="w-full p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700">${doc.bio}</textarea>
          </div>
        </div>

        <button type="button" onclick="window.saveDoctorProfile('${doc.id}')" class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400">
          Save Doctor Profile
        </button>
      </div>
    `;
  };

})();
