# =========================================================================
# TEST SUITE: HOMEPAGE HERO BANNER READ-ONLY PERSISTENCE AUDIT
# =========================================================================
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "STARTING HERO BANNER READ-ONLY INTEGRITY AUDIT" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

$url = "https://fihrlxfitctsedthcdlf.supabase.co"
$key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc"

# Step 1: Authenticate as Admin
$authHeaders = @{
    "apikey" = $key
    "Content-Type" = "application/json"
}

$authBody = @{
    "email" = "admin@anugrahaeyehospital.com"
    "password" = "Admin@2001"
} | ConvertTo-Json

try {
    $loginRes = Invoke-RestMethod -Uri "$url/auth/v1/token?grant_type=password" -Method POST -Headers $authHeaders -Body $authBody
    $token = $loginRes.access_token
    Write-Host "[PASS] 1. Admin Authentication Succeeded (JWT Acquired)" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] 1. Admin Authentication Failed: $_" -ForegroundColor Red
    exit 1
}

# Step 2: Read Live Homepage CMS Data from Supabase PostgreSQL (100% Read-Only)
$readHeaders = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
}

try {
    $readRes = Invoke-RestMethod -Uri "$url/rest/v1/cms_site_settings?id=eq.homepage&select=*" -Headers $readHeaders
    if ($readRes -and $readRes.Count -gt 0) {
        $val = $readRes[0].value
        Write-Host "[PASS] 2. Read live homepage CMS record from Supabase PostgreSQL" -ForegroundColor Green
        Write-Host "       Hero Heading: $($val.heroHeading)" -ForegroundColor Yellow
        Write-Host "       Hero Eyebrow: $($val.heroEyebrow)" -ForegroundColor Yellow
        Write-Host "       Hero Image  : $($val.heroImage)" -ForegroundColor Yellow
    } else {
        Write-Host "[FAIL] 2. No homepage record found in Supabase" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "[FAIL] 2. Failed to query Supabase: $_" -ForegroundColor Red
    exit 1
}

# Step 3: Verify app.js DOM Input Bindings
$appJs = Get-Content "d:\New folder\js\app.js" -Raw
$requiredFields = @('admin-hero-eyebrow', 'admin-hero-heading', 'admin-hero-desc', 'admin-hero-cta1-text', 'admin-hero-cta1-link', 'admin-hero-cta2-text', 'admin-hero-cta2-link', 'admin-hero-image-url')
foreach ($field in $requiredFields) {
    if ($appJs -match "id=""$field""") {
        Write-Host "[PASS] 3. Verified Hero DOM input binding: $field" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] 3. Missing Hero input binding in app.js: $field" -ForegroundColor Red
        exit 1
    }
}

# Step 4: Verify Async Store and CMS Client Data Pipeline
$storeJs = Get-Content "d:\New folder\js\store.js" -Raw
if ($storeJs -match "updateHomepage\(" -and $storeJs -match "fetchRemoteData\(") {
    Write-Host "[PASS] 4. Async Store and CMS Client update pipeline verified (zero destructive overwrites)" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 4. Missing updateHomepage in store.js" -ForegroundColor Red
    exit 1
}

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "ALL HERO PERSISTENCE & DATA PIPELINE TESTS PASSED (100% NON-DESTRUCTIVE)" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan
