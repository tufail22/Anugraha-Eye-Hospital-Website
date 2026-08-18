$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$baseUrl = 'https://fihrlxfitctsedthcdlf.supabase.co'

$authBody = '{"email":"admin@anugrahaeyehospital.com","password":"Admin@2001"}'
$authHeaders = @{ 'apikey' = $apiKey; 'Content-Type' = 'application/json' }
$authRes = Invoke-RestMethod -Uri "$baseUrl/auth/v1/token?grant_type=password" -Method POST -Headers $authHeaders -Body $authBody
$jwtToken = $authRes.access_token
Write-Host "[PASS] 1. Authenticated as Admin" -ForegroundColor Green

$fileBytes = [System.IO.File]::ReadAllBytes('d:\New folder\assets\official_logo.jpg')
$storageUploadUrl = "$baseUrl/storage/v1/object/hospital-media/brand/anugraha_official_logo.jpg"
$storageHeaders = @{
    'apikey' = $apiKey
    'Authorization' = "Bearer $jwtToken"
    'Content-Type' = 'image/jpeg'
    'x-upsert' = 'true'
}
$uploadRes = Invoke-RestMethod -Uri $storageUploadUrl -Method POST -Headers $storageHeaders -Body $fileBytes
Write-Host "[PASS] 2. Uploaded logo to storage: $($uploadRes.Key)" -ForegroundColor Green

$adminHeaders = @{
    'apikey' = $apiKey
    'Authorization' = "Bearer $jwtToken"
    'Content-Type' = 'application/json'
}

$currentBrandRes = Invoke-RestMethod -Uri "$baseUrl/rest/v1/cms_site_settings?id=eq.brand" -Method GET -Headers $adminHeaders
$currentBrandVal = if ($currentBrandRes.Length -gt 0) { $currentBrandRes[0].value } else { @{} }
$currentBrandVal.logo = "assets/official_logo.jpg"

$patchBody = @{
    'id' = 'brand'
    'value' = $currentBrandVal
    'updated_at' = [DateTime]::UtcNow.ToString('o')
} | ConvertTo-Json -Depth 10

$pgRes = Invoke-RestMethod -Uri "$baseUrl/rest/v1/cms_site_settings" -Method POST -Headers ($adminHeaders + @{'Prefer'='resolution=merge-duplicates'}) -Body $patchBody
Write-Host "[PASS] 3. Updated cms_site_settings.brand in Supabase PostgreSQL" -ForegroundColor Green
