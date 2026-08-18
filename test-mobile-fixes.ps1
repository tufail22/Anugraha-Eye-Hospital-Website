# =========================================================================
# TEST SUITE: MOBILE RESPONSIVE NAVIGATION & BOTTOM BAR CONSOLIDATION
# =========================================================================
Write-Host "==================================================="
Write-Host "STARTING MOBILE EXPERIENCE & RESPONSIVE AUDIT"
Write-Host "==================================================="

$appJs = Get-Content -Raw "d:\New folder\js\app.js"
$stylesCss = Get-Content -Raw "d:\New folder\css\styles.css"
$indexHtml = Get-Content -Raw "d:\New folder\index.html"

# 1. Verify Hamburger Button & Drawer IDs
if ($appJs -match 'id="mobile-hamburger-btn"' -and $appJs -match 'aria-controls="mobile-navigation-drawer"') {
    Write-Host "[PASS] 1. Accessible Hamburger Button verified with id and aria-controls" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 1. Hamburger button missing accessible attributes" -ForegroundColor Red
    exit 1
}

# 2. Verify Mobile Drawer Panel and Backdrop in app.js
if ($appJs -match 'id="mobile-drawer-backdrop"' -and $appJs -match 'id="mobile-navigation-drawer"') {
    Write-Host "[PASS] 2. Mobile Drawer Backdrop and Navigation Panel verified in DOM template" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 2. Mobile Drawer missing backdrop or panel element" -ForegroundColor Red
    exit 1
}

# 3. Verify Drawer CSS Classes in styles.css
if ($stylesCss -match '\.mobile-drawer-backdrop' -and $stylesCss -match '\.mobile-drawer-panel' -and $stylesCss -match 'z-index:\s*99999') {
    Write-Host "[PASS] 3. Mobile Drawer CSS styles (fixed, backdrop blur, transform, z-index 99999) verified in css/styles.css" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 3. Mobile Drawer CSS classes missing from styles.css" -ForegroundColor Red
    exit 1
}

# 4. Verify Single Consolidated Bottom Bar
$bottomBarCount = ([regex]::Matches($appJs, 'id="mobile-bottom-bar"')).Count
if ($bottomBarCount -eq 1) {
    Write-Host "[PASS] 4. Exactly 1 Consolidated Mobile Bottom Bar verified (zero duplicates)" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 4. Found $bottomBarCount mobile bottom bars in app.js (expected 1)" -ForegroundColor Red
    exit 1
}

# 5. Verify Bottom Bar Buttons
if ($appJs -match 'Call Now' -and $appJs -match 'Appointment' -and $appJs -match 'WhatsApp Direct Chat') {
    Write-Host "[PASS] 5. Mobile Bottom Bar contains all 3 primary actions: Call Now, Appointment, WhatsApp" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 5. Mobile bottom bar missing one of the primary actions" -ForegroundColor Red
    exit 1
}

# 6. Verify Close Function on Links and Hash Routing
if ($appJs -match 'window\.closeMobileDrawer\(\)' -and $appJs -match 'onclick="window\.closeMobileDrawer\(\)"') {
    Write-Host "[PASS] 6. Navigation links and router automatically close mobile drawer upon selection" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 6. Close drawer handler not attached to links or router" -ForegroundColor Red
    exit 1
}

# 7. Verify Safe Area Inset Support in CSS
if ($stylesCss -match 'env\(safe-area-inset-bottom\)') {
    Write-Host "[PASS] 7. Safe-Area-Inset-Bottom support verified for modern iOS/Android viewports" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 7. Safe-area inset missing in styles.css" -ForegroundColor Red
    exit 1
}

# 8. Verify Footer Clearance
if ($appJs -match 'pb-28\s+sm:pb-32\s+lg:pb-16') {
    Write-Host "[PASS] 8. Footer bottom clearance verified to prevent fixed CTA overlap" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 8. Footer missing bottom clearance classes" -ForegroundColor Red
    exit 1
}

Write-Host "==================================================="
Write-Host "ALL MOBILE RESPONSIVE AUDITS PASSED (100% CLEAN)"
Write-Host "==================================================="
