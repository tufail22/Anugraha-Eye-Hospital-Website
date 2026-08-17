$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$uploadUrl = "https://fihrlxfitctsedthcdlf.supabase.co/storage/v1/object/hospital-media/test/sample.png"

$pngBytes = [byte[]]@(0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x60, 0x60, 0x60, 0x00, 0x00, 0x00, 0x04, 0x00, 0x01, 0x27, 0x34, 0x27, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82)

$headers = @{
    "apikey" = $apiKey
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "image/png"
    "x-upsert" = "true"
}

try {
    $res = Invoke-RestMethod -Uri $uploadUrl -Method POST -Headers $headers -Body $pngBytes
    Write-Host "[PASS] STORAGE UPLOAD SUCCESS Key:" $res.Key
    $cdnUrl = "https://fihrlxfitctsedthcdlf.supabase.co/storage/v1/object/public/hospital-media/test/sample.png"
    $cdnCheck = Invoke-WebRequest -Uri $cdnUrl -UseBasicParsing
    Write-Host "[PASS] CDN PUBLIC URL ACCESSIBLE (HTTP" $cdnCheck.StatusCode ")"
} catch {
    Write-Host "[FAIL] STORAGE UPLOAD FAILED:" $_.Exception.Message
}
