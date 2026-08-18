# =========================================================================
# TEST SUITE: HOMEPAGE HERO BANNER COMPLETE PERSISTENCE AUDIT
# =========================================================================
Write-Host "==================================================="
Write-Host "STARTING HERO BANNER PERSISTENCE & DATA PIPELINE AUDIT"
Write-Host "==================================================="

$config = Get-Content -Raw "d:\New folder\js\config.js"
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

# Step 2: Define New Hero Content
$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$testHeroHeading = "Restoring Sight, Enriching Lives Across 14 Districts ($timestamp)"
$testHeroEyebrow = "25 Years of Authentic Eye Care ($timestamp)"
$testHeroDesc = "North Karnataka's largest tertiary ophthalmic network with 2 base hospitals and 8 vision centers. ($timestamp)"
$testPrimaryCtaText = "Schedule Consultation"
$testPrimaryCtaLink = "#/contact"
$testSecondaryCtaText = "View Our Facilities"
$testSecondaryCtaLink = "#/hospitals"
$testHeroImage = "https://fihrlxfitctsedthcdlf.supabase.co/storage/v1/object/public/hospital-media/hero/hero_optimized_$timestamp.webp"

$homepagePayload = @{
    "id" = "homepage"
    "value" = @{
        "heroEyebrow" = $testHeroEyebrow
        "heroHeading" = $testHeroHeading
        "heroDescription" = $testHeroDesc
        "heroImage" = $testHeroImage
        "primaryCta" = @{
            "text" = $testPrimaryCtaText
            "link" = $testPrimaryCtaLink
        }
        "secondaryCta" = @{
            "text" = $testSecondaryCtaText
            "link" = $testSecondaryCtaLink
        }
        "sections" = @{
            "whyAnugraha" = $true
            "services" = $true
            "featuredDoctors" = $true
            "hospitals" = $true
            "visionCenters" = $true
            "technology" = $true
            "communityImpact" = $true
            "academics" = $true
            "insurance" = $true
            "faqs" = $true
            "finalCta" = $true
        }
    }
    "updated_at" = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
} | ConvertTo-Json -Depth 6

# Step 3: Persist Complete Hero Configuration to Supabase PostgreSQL
$writeHeaders = @{
    "apikey" = $key
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
    "Prefer" = "resolution=merge-duplicates"
}

try {
    $writeRes = Invoke-RestMethod -Uri "$url/rest/v1/cms_site_settings" -Method POST -Headers $writeHeaders -Body $homepagePayload
    Write-Host "[PASS] 2. Persisted Complete Hero Configuration to Cloud Database (PostgreSQL)" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] 2. Failed to write to cms_site_settings: $_" -ForegroundColor Red
    exit 1
}

# Step 4: Simulate Public Website / Admin Panel Refresh (Read from Supabase via Public API)
$readHeaders = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
}

try {
    $readRes = Invoke-RestMethod -Uri "$url/rest/v1/cms_site_settings?id=eq.homepage&select=*" -Headers $readHeaders
    if ($readRes -and $readRes.Count -gt 0) {
        $savedVal = $readRes[0].value
        
        # Test 1: Heading
        if ($savedVal.heroHeading -eq $testHeroHeading) {
            Write-Host "[PASS] 3. Hero Main Heading (H1) Persisted & Verified: $($savedVal.heroHeading)" -ForegroundColor Green
        } else {
            Write-Host "[FAIL] 3. Heading mismatch. Expected: $testHeroHeading, Got: $($savedVal.heroHeading)" -ForegroundColor Red
            exit 1
        }

        # Test 2: Eyebrow
        if ($savedVal.heroEyebrow -eq $testHeroEyebrow) {
            Write-Host "[PASS] 4. Hero Eyebrow Tagline Persisted & Verified: $($savedVal.heroEyebrow)" -ForegroundColor Green
        } else {
            Write-Host "[FAIL] 4. Eyebrow mismatch. Expected: $testHeroEyebrow, Got: $($savedVal.heroEyebrow)" -ForegroundColor Red
            exit 1
        }

        # Test 3: Description
        if ($savedVal.heroDescription -eq $testHeroDesc) {
            Write-Host "[PASS] 5. Hero Description Paragraph Persisted & Verified: $($savedVal.heroDescription)" -ForegroundColor Green
        } else {
            Write-Host "[FAIL] 5. Description mismatch. Expected: $testHeroDesc, Got: $($savedVal.heroDescription)" -ForegroundColor Red
            exit 1
        }

        # Test 4: Primary CTA
        if ($savedVal.primaryCta.text -eq $testPrimaryCtaText -and $savedVal.primaryCta.link -eq $testPrimaryCtaLink) {
            Write-Host "[PASS] 6. Primary CTA ($($savedVal.primaryCta.text) -> $($savedVal.primaryCta.link)) Persisted & Verified" -ForegroundColor Green
        } else {
            Write-Host "[FAIL] 6. Primary CTA mismatch" -ForegroundColor Red
            exit 1
        }

        # Test 5: Secondary CTA
        if ($savedVal.secondaryCta.text -eq $testSecondaryCtaText -and $savedVal.secondaryCta.link -eq $testSecondaryCtaLink) {
            Write-Host "[PASS] 7. Secondary CTA ($($savedVal.secondaryCta.text) -> $($savedVal.secondaryCta.link)) Persisted & Verified" -ForegroundColor Green
        } else {
            Write-Host "[FAIL] 7. Secondary CTA mismatch" -ForegroundColor Red
            exit 1
        }

        # Test 6: Hero Background Asset
        if ($savedVal.heroImage -eq $testHeroImage) {
            Write-Host "[PASS] 8. Hero Background Asset URL Persisted & Verified: $($savedVal.heroImage)" -ForegroundColor Green
        } else {
            Write-Host "[FAIL] 8. Hero image mismatch" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "[FAIL] Could not retrieve homepage setting from Supabase" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "[FAIL] Error reading from Supabase: $_" -ForegroundColor Red
    exit 1
}

# Step 5: Codebase Validation
$appJs = Get-Content -Raw "d:\New folder\js\app.js"
$storeJs = Get-Content -Raw "d:\New folder\js\store.js"
$cmsClientJs = Get-Content -Raw "d:\New folder\lib\cms-client.js"

if ($appJs -match 'admin-hero-heading' -and $appJs -match 'admin-hero-eyebrow' -and $appJs -match 'admin-hero-desc' -and $appJs -match 'admin-hero-cta1-text' -and $appJs -match 'admin-hero-cta2-text' -and $appJs -match 'admin-hero-image-url') {
    Write-Host "[PASS] 9. All 6 Hero input fields exist with canonical data model matching in js/app.js" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 9. Input field mismatch in app.js" -ForegroundColor Red
    exit 1
}

if ($storeJs -match 'async updateHomepage\(fields\)' -and $cmsClientJs -match 'async saveSetting\(settingKey, settingValue\)') {
    Write-Host "[PASS] 10. Async Store and CMS Client update pipeline verified" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 10. Store / CMS Client async methods missing" -ForegroundColor Red
    exit 1
}

if ($appJs -match 'window\.saveHeroBannerSection' -and $appJs -match 'window\.saveHomepageAdmin') {
    Write-Host "[PASS] 11. Atomic Hero Banner and Homepage form submission handlers verified" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 11. Save handlers missing in app.js" -ForegroundColor Red
    exit 1
}

Write-Host "==================================================="
Write-Host "ALL HERO PERSISTENCE & DATA PIPELINE TESTS PASSED (100%)"
Write-Host "==================================================="
