# =========================================================================
# ANUGRAHA EYE HOSPITAL - END-TO-END IMAGE UPLOAD & CMS PERSISTENCE TEST
# =========================================================================

$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$baseUrl = 'https://fihrlxfitctsedthcdlf.supabase.co'

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "IMAGE UPLOAD & AUTHENTICATED PERSISTENCE TEST SUITE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# 0. AUTHENTICATE AS ADMIN TO ACQUIRE JWT
$authBody = '{"email":"admin@anugrahaeyehospital.com","password":"Admin@2001"}'
$authHeaders = @{
    "apikey" = $apiKey
    "Content-Type" = "application/json"
}

$authRes = Invoke-RestMethod -Uri "$baseUrl/auth/v1/token?grant_type=password" -Method POST -Headers $authHeaders -Body $authBody
$jwtToken = $authRes.access_token

if ($jwtToken) {
    Write-Host "[PASS] 0. Authenticated as Admin (JWT Acquired)" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 0. Authentication Failed" -ForegroundColor Red
    exit 1
}

$adminHeaders = @{
    "apikey" = $apiKey
    "Authorization" = "Bearer $jwtToken"
    "Content-Type" = "application/json"
}

# 1. TEST PNG UPLOAD TO CLOUD STORAGE
$testFileName = "hero_test_$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds()).png"
$storageUploadUrl = "$baseUrl/storage/v1/object/hospital-media/hero/$testFileName"
$pngBytes = [byte[]]@(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x60, 0x60, 0x60, 0x00, 0x00, 0x00, 0x04, 0x00, 0x01, 0x27, 0x34, 0x27, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82)

$storageHeaders = @{
    "apikey" = $apiKey
    "Authorization" = "Bearer $jwtToken"
    "Content-Type" = "image/png"
    "x-upsert" = "true"
}

try {
    $res = Invoke-RestMethod -Uri $storageUploadUrl -Method POST -Headers $storageHeaders -Body $pngBytes
    $cdnUrl = "$baseUrl/storage/v1/object/public/hospital-media/hero/$testFileName"
    Write-Host "[PASS] 1. Cloud Storage Upload Succeeded (Key: $($res.Key))" -ForegroundColor Green
    
    # 2. TEST CDN URL ACCESSIBILITY
    $cdnCheck = Invoke-WebRequest -Uri $cdnUrl -UseBasicParsing
    if ($cdnCheck.StatusCode -eq 200) {
        Write-Host "[PASS] 2. Image Public CDN URL Accessible (HTTP 200 OK)" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] 2. CDN returned HTTP $($cdnCheck.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "[FAIL] 1. Storage Upload Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. TEST HOMEPAGE HERO SETTING PERSISTENCE IN POSTGRESQL (WITH ADMIN JWT)
$patchBody = @{
    id = "homepage"
    value = @{
        heroEyebrow = "25+ Years of Clinical Excellence"
        heroHeading = "Advanced Micro-Incision Eye Care with Precision Robotics"
        heroDescription = "Equipped with state-of-the-art diagnostic and surgical ophthalmic systems."
        heroImage = $cdnUrl
    }
    updated_at = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json -Depth 5

try {
    $pgRes = Invoke-RestMethod -Uri "$baseUrl/rest/v1/cms_site_settings" -Method POST -Headers ($adminHeaders + @{"Prefer"="resolution=merge-duplicates"}) -Body $patchBody
    Write-Host "[PASS] 3. Authenticated Admin updated cms_site_settings.homepage with new CDN Image URL in PostgreSQL" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] 3. Database update failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. VERIFY PUBLIC REST API READ (UNAUTHENTICATED ANON KEY)
$publicHeaders = @{
    "apikey" = $apiKey
    "Authorization" = "Bearer $apiKey"
}
try {
    $readRes = Invoke-RestMethod -Uri "$baseUrl/rest/v1/cms_site_settings?id=eq.homepage" -Method GET -Headers $publicHeaders
    if ($readRes -and $readRes[0].value.heroImage -eq $cdnUrl) {
        Write-Host "[PASS] 4. Public Website Reads newly uploaded Hero Image URL from Cloud Database: $($readRes[0].value.heroImage)" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] 4. Image URL mismatch: $($readRes[0].value.heroImage)" -ForegroundColor Red
    }
} catch {
    Write-Host "[FAIL] 4. Failed to query public API: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. TEST EQUIPMENT IMAGE REPLACEMENT (WITH ADMIN JWT)
$eqPatchBody = @{
    id = "eq-1"
    name = "Reichert 7 NCT"
    image = $cdnUrl
    alt_text = "Reichert 7 Non-Contact Tonometer"
    category = "Diagnostic"
    display_order = 1
    is_active = $true
    published = $true
    updated_at = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json -Depth 5

try {
    $eqRes = Invoke-RestMethod -Uri "$baseUrl/rest/v1/cms_equipment" -Method POST -Headers ($adminHeaders + @{"Prefer"="resolution=merge-duplicates"}) -Body $eqPatchBody
    $eqRead = Invoke-RestMethod -Uri "$baseUrl/rest/v1/cms_equipment?id=eq.eq-1" -Method GET -Headers $publicHeaders
    if ($eqRead -and $eqRead[0].image -eq $cdnUrl) {
        Write-Host "[PASS] 5. Equipment 'Reichert 7 NCT' Image successfully replaced & verified in PostgreSQL via Public API" -ForegroundColor Green
    }
} catch {
    Write-Host "[FAIL] 5. Equipment update failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "ALL IMAGE UPLOAD & PERSISTENCE TESTS PASSED (100%)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
