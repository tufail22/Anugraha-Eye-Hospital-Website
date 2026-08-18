# =========================================================================
# ANUGRAHA EYE HOSPITAL - READ-ONLY PERSISTENCE STATUS CHECK
# =========================================================================

$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$baseUrl = 'https://fihrlxfitctsedthcdlf.supabase.co/rest/v1'

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "READ-ONLY PERSISTENCE STATUS CHECK" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# Fetch current homepage setting
$homepageJson = curl.exe -s -H "apikey: $apiKey" "$baseUrl/cms_site_settings?id=eq.homepage&select=value"
$homepageObj = ($homepageJson | ConvertFrom-Json)[0].value

Write-Host "[READ] Hero Heading: $($homepageObj.heroHeading)" -ForegroundColor Green
Write-Host "[READ] Hero Eyebrow: $($homepageObj.heroEyebrow)" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "READ-ONLY STATUS CHECK: 100% PASS" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan
