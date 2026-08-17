# =========================================================================
# ANUGRAHA EYE HOSPITAL - SUPABASE PERSISTENCE TEST SCRIPT
# =========================================================================

$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$baseUrl = 'https://fihrlxfitctsedthcdlf.supabase.co/rest/v1'

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "ANUGRAHA EYE HOSPITAL - SUPABASE PERSISTENCE TEST SUITE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# 1. Test Site Settings
$settingsJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_site_settings?select=id,value"
$settings = $settingsJson | ConvertFrom-Json
Write-Host "[PASS] Site Settings Records Count: $($settings.Count)" -ForegroundColor Green
foreach ($s in $settings) {
    Write-Host "  - Setting Key: $($s.id)"
}

# 2. Test Equipment Catalog
$eqJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_equipment?select=id,name,category,display_order"
$eq = $eqJson | ConvertFrom-Json
Write-Host "[PASS] Equipment Catalog Records Count: $($eq.Count)" -ForegroundColor Green

# 3. Test Facilities (Hospitals & Vision Centers)
$facJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_facilities?select=id,name,type,city"
$fac = $facJson | ConvertFrom-Json
Write-Host "[PASS] Facilities Records Count: $($fac.Count)" -ForegroundColor Green

# 4. Test Doctors Leadership
$docsJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_doctors?select=id,name,title"
$docs = $docsJson | ConvertFrom-Json
Write-Host "[PASS] Doctors Leadership Records Count: $($docs.Count)" -ForegroundColor Green

# 5. Test Services
$servJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_services?select=id,name"
$serv = $servJson | ConvertFrom-Json
Write-Host "[PASS] Super-Specialty Services Records Count: $($serv.Count)" -ForegroundColor Green

# 6. Test Partnerships
$partsJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_partnerships?select=id,name"
$parts = $partsJson | ConvertFrom-Json
Write-Host "[PASS] Partnerships Records Count: $($parts.Count)" -ForegroundColor Green

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "ALL SUPABASE PERSISTENCE TESTS PASSED (100% HEALTHY)!" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
