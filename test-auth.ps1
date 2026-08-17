$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$body = '{"email":"admin@anugrahaeyehospital.com","password":"Admin@2001"}'

$headers = @{
    "apikey" = $apiKey
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-WebRequest -Uri "https://fihrlxfitctsedthcdlf.supabase.co/auth/v1/token?grant_type=password" -Method POST -Headers $headers -Body $body -UseBasicParsing
    Write-Host "STATUS:" $response.StatusCode
    Write-Host "CONTENT:" $response.Content
} catch {
    Write-Host "ERROR:" $_.Exception.Message
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $respBody = $reader.ReadToEnd()
        Write-Host "RESPONSE BODY:" $respBody
    }
}
