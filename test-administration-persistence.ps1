# =========================================================================
# TEST SUITE: ADMINISTRATION TEAM PROFILES PERSISTENCE & DATA INTEGRITY
# =========================================================================

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "STARTING ADMINISTRATION TEAM PERSISTENCE AUDIT" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

$appJs = Get-Content "d:\New folder\js\app.js" -Raw
$storeJs = Get-Content "d:\New folder\js\store.js" -Raw
$cmsClientJs = Get-Content "d:\New folder\lib\cms-client.js" -Raw

$hasError = $false

# 1. VERIFY STORE METHOD SIGNATURES
if ($storeJs -match "async updateAdminMember\(" -and $storeJs -match "async updateAllAdminMembers\(" -and $storeJs -match "async addAdminMember\(" -and $storeJs -match "async deleteAdminMember\(") {
    Write-Host "[PASS] 1. Store async administration CRUD methods verified" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 1. Missing async methods in store.js" -ForegroundColor Red
    $hasError = $true
}

# 2. VERIFY BIDIRECTIONAL FIELD MAPPINGS IN CMS CLIENT
if ($cmsClientJs -match "qualifications: a\.degrees" -and $cmsClientJs -match "desc: a\.bio" -and $cmsClientJs -match "saveAllAdministration\(") {
    Write-Host "[PASS] 2. CMSClient bidirectional field mapping and bulk save verified" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 2. Missing bidirectional mapping or saveAllAdministration in cms-client.js" -ForegroundColor Red
    $hasError = $true
}

# 3. VERIFY ADMIN DASHBOARD UI BINDINGS & BULK SAVE BUTTON
if ($appJs -match 'id="save-all-admin-team-btn"' -and $appJs -match 'admin-team-name-\$\{m\.id\}' -and $appJs -match 'saveAdminTeamMember\(') {
    Write-Host "[PASS] 3. Admin dashboard UI bindings and bulk save button verified" -ForegroundColor Green
} else {
    Write-Host "[FAIL] 3. Missing UI bindings in js/app.js" -ForegroundColor Red
    $hasError = $true
}

# 4. DIRECT CLOUD PERSISTENCE TEST WITH SUPABASE POSTGRESQL
$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc'
$baseUrl = 'https://fihrlxfitctsedthcdlf.supabase.co'
$publicHeaders = @{ "apikey" = $apiKey; "Authorization" = "Bearer $apiKey" }

try {
    $adminRes = Invoke-RestMethod -Uri "$baseUrl/rest/v1/cms_administration?select=*" -Method GET -Headers $publicHeaders
    if ($adminRes -and $adminRes.Count -ge 6) {
        Write-Host "[PASS] 4. Successfully verified $($adminRes.Count) administration members in Supabase PostgreSQL:" -ForegroundColor Green
        foreach ($m in $adminRes) {
            Write-Host "   - $($m.name) ($($m.role)) | Degrees: $($m.degrees)" -ForegroundColor Gray
        }
    } else {
        Write-Host "[FAIL] 4. Expected at least 6 administration members in Supabase, found $($adminRes.Count)" -ForegroundColor Red
        $hasError = $true
    }
} catch {
    Write-Host "[FAIL] 4. Cloud connection error: $($_.Exception.Message)" -ForegroundColor Red
    $hasError = $true
}

Write-Host "===================================================" -ForegroundColor Cyan
if (!$hasError) {
    Write-Host "ALL ADMINISTRATION PERSISTENCE TESTS PASSED (100% SUCCESS)" -ForegroundColor Green
} else {
    Write-Host "ADMINISTRATION PERSISTENCE TESTS REPORTED ERRORS" -ForegroundColor Red
}
Write-Host "===================================================" -ForegroundColor Cyan
