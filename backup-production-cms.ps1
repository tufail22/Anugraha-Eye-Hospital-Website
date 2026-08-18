# =========================================================================
# ANUGRAHA EYE HOSPITAL - PRODUCTION CMS DATABASE BACKUP SCRIPT
# =========================================================================

$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$baseUrl = 'https://fihrlxfitctsedthcdlf.supabase.co'
$adminHeaders = @{
    'apikey' = $apiKey
    'Content-Type' = 'application/json'
}

$backup = @{}
$tables = @('cms_site_settings', 'cms_doctors', 'cms_facilities', 'cms_services', 'cms_equipment', 'cms_administration', 'cms_gallery', 'cms_academics', 'cms_empanelments', 'cms_faqs', 'cms_partnerships', 'cms_news')

Write-Host "Exporting live Supabase production CMS data..." -ForegroundColor Cyan

foreach ($t in $tables) {
    try {
        $uri = "$baseUrl/rest/v1/${t}?select=*"
        $data = Invoke-RestMethod -Uri $uri -Method GET -Headers $adminHeaders
        $count = if ($data) { $data.Length } else { 0 }
        $backup[$t] = $data
        Write-Host " [+] Exported $t : $count rows" -ForegroundColor Green
    } catch {
        Write-Host " [-] Failed to export $t : $($_.Exception.Message)" -ForegroundColor Red
    }
}

$timestamp = [DateTime]::UtcNow.ToString("yyyyMMdd_HHmmss")
$backupDir = "d:\New folder\backups"
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
}

$backupJson = $backup | ConvertTo-Json -Depth 30
$backupFilePath = "$backupDir\cms_snapshot_$timestamp.json"
$latestBackupPath = "$backupDir\cms_snapshot_latest.json"

[System.IO.File]::WriteAllText($backupFilePath, $backupJson)
[System.IO.File]::WriteAllText($latestBackupPath, $backupJson)

Write-Host "===================================================" -ForegroundColor Green
Write-Host "SUCCESS: Live production CMS backup saved to:" -ForegroundColor Green
Write-Host "  $backupFilePath" -ForegroundColor Yellow
Write-Host "  $latestBackupPath" -ForegroundColor Yellow
Write-Host "===================================================" -ForegroundColor Green
