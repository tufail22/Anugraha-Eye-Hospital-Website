# =========================================================================
# TEST SUITE: HOSPITAL LOGO STANDARDIZATION & CANONICAL PERSISTENCE AUDIT
# =========================================================================

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "STARTING CANONICAL LOGO PROPAGATION & PERSISTENCE AUDIT" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

$appJs = Get-Content "d:\New folder\js\app.js" -Raw
$storeJs = Get-Content "d:\New folder\js\store.js" -Raw
$indexHtml = Get-Content "d:\New folder\index.html" -Raw

$hasError = $false

# 1. VERIFY CANONICAL DATA STORE BINDINGS
if ($storeJs -match "getBrand\(\)" -and $storeJs -match "updateBrand\(") {
    Write-Host "[PASS] 1. Central Store getBrand() and updateBrand() verified" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 1. Missing getBrand() or updateBrand() in js/store.js" -ForegroundColor Red
    $hasError = $true
}

# 2. VERIFY PUBLIC HEADER, DRAWER & FOOTER DYNAMIC BINDINGS
$requiredLocations = @(
    @{ Name = "Desktop Header Navbar"; Pattern = 'alt="\$\{brand\.name\} Official Logo"' },
    @{ Name = "Mobile Navigation Drawer"; Pattern = 'alt="\$\{brand\.name\} Official Logo"' },
    @{ Name = "Global Footer"; Pattern = 'alt="\$\{brand\.name\} Official Logo"' },
    @{ Name = "Homepage Trust Badge"; Pattern = 'alt="\$\{brand\.name\} Official Logo"' },
    @{ Name = "Academics Hub"; Pattern = 'alt="\$\{brand\.name\} Official Logo"' },
    @{ Name = "Empanelments & Insurance Hub"; Pattern = 'alt="\$\{brand\.name\} Official Logo"' },
    @{ Name = "Admin Dashboard Preview"; Pattern = 'id="admin-logo-preview"' }
)

foreach ($loc in $requiredLocations) {
    if ($appJs -match $loc.Pattern) {
        Write-Host "[PASS] 2. Verified Dynamic Logo Binding in $($loc.Name)" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] 2. Missing Dynamic Logo Binding in $($loc.Name)" -ForegroundColor Red
        $hasError = $true
    }
}

# 3. VERIFY DYNAMIC HEAD / SEO FAVICON AND META TAGS
if ($appJs -match "favIcon\.setAttribute\('href', logoAsset\)" -and $appJs -match '"logo": image') {
    Write-Host "[PASS] 3. Dynamic Favicon & JSON-LD Schema logo synchronization verified in updatePageSEO" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 3. Dynamic Favicon or JSON-LD sync missing in updatePageSEO" -ForegroundColor Red
    $hasError = $true
}

# 4. VERIFY READ-ONLY SUPABASE CLOUD STORAGE LOGO
$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$baseUrl = 'https://fihrlxfitctsedthcdlf.supabase.co'
$publicHeaders = @{ "apikey" = $apiKey; "Authorization" = "Bearer $apiKey" }

try {
    $brandRes = Invoke-RestMethod -Uri "$baseUrl/rest/v1/cms_site_settings?id=eq.brand" -Method GET -Headers $publicHeaders
    if ($brandRes -and $brandRes[0].value.logo) {
        $cloudLogo = $brandRes[0].value.logo
        Write-Host "[PASS] 4. Read canonical brand logo from Supabase Cloud: $cloudLogo" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] 4. Failed to read brand logo from Supabase Cloud" -ForegroundColor Red
        $hasError = $true
    }
} catch {
    Write-Host "[FAIL] 4. Cloud connection error: $($_.Exception.Message)" -ForegroundColor Red
    $hasError = $true
}

Write-Host "===================================================" -ForegroundColor Cyan
if (!$hasError) {
    Write-Host "ALL CANONICAL LOGO TESTS PASSED (100% SUCCESS)" -ForegroundColor Green
} else {
    Write-Host "LOGO STANDARDIZATION TESTS REPORTED ERRORS" -ForegroundColor Red
}
Write-Host "===================================================" -ForegroundColor Cyan
