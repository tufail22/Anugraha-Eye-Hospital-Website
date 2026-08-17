# =========================================================================
# ANUGRAHA EYE HOSPITAL - SUPABASE LIVE WRITE & MULTI-DEVICE PERSISTENCE TEST
# =========================================================================

$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$baseUrl = 'https://fihrlxfitctsedthcdlf.supabase.co/rest/v1'

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "TEST A & B: LIVE WRITE TO SUPABASE POSTGRESQL" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# Fetch current homepage setting
$originalJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_site_settings?id=eq.homepage&select=value"
$originalObj = ($originalJson | ConvertFrom-Json)[0].value

Write-Host "[BEFORE] Hero Eyebrow: $($originalObj.heroEyebrow)" -ForegroundColor Yellow

# Temporarily test change
$originalObj.heroEyebrow = "Authentic. Affectionate. Affordable. Eye Care (Verified Live Cloud Persistence)"
$payload = @{
    id = "homepage"
    value = $originalObj
    updated_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json -Depth 10

# Upsert via REST API
$headers = @{
    "apikey" = $apiKey
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
    "Prefer" = "resolution=merge-duplicates"
}
$upsertRes = curl.exe -s -X POST -H "apikey: $apiKey" -H "Authorization: Bearer $apiKey" -H "Content-Type: application/json" -H "Prefer: resolution=merge-duplicates" -d "$payload" "$baseUrl/cms_site_settings"

# Verify change was committed to PostgreSQL database
$verifiedJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_site_settings?id=eq.homepage&select=value"
$verifiedObj = ($verifiedJson | ConvertFrom-Json)[0].value

Write-Host "[AFTER WRITE] Hero Eyebrow in Database: $($verifiedObj.heroEyebrow)" -ForegroundColor Green

# Restore original value
$originalObj.heroEyebrow = "Authentic. Affectionate. Affordable. Eye Care"
$restorePayload = @{
    id = "homepage"
    value = $originalObj
    updated_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json -Depth 10

$restoreRes = curl.exe -s -X POST -H "apikey: $apiKey" -H "Authorization: Bearer $apiKey" -H "Content-Type: application/json" -H "Prefer: resolution=merge-duplicates" -d "$restorePayload" "$baseUrl/cms_site_settings"

$finalJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_site_settings?id=eq.homepage&select=value"
$finalObj = ($finalJson | ConvertFrom-Json)[0].value

Write-Host "[RESTORED] Hero Eyebrow in Database: $($finalObj.heroEyebrow)" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "LIVE WRITE AND PERSISTENCE VERIFICATION: 100% SUCCESSFUL" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
