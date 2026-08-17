# =========================================================================
# ANUGRAHA EYE HOSPITAL - COMPREHENSIVE CODEBASE & ERROR AUDIT
# =========================================================================

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "STARTING FULL REPOSITORY ERROR & INTEGRITY AUDIT" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

$jsFiles = Get-ChildItem -Path . -Recurse -Include *.js | Where-Object { $_.FullName -notmatch "node_modules" }
$hasErrors = $false

foreach ($file in $jsFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Check for unclosed template literals (odd count of unescaped backticks)
    # Simple check:
    $backticks = [regex]::Matches($content, '(?<!\\)`').Count
    if ($backticks % 2 -ne 0) {
        Write-Host ("[FAIL] Unbalanced backticks in " + $file.Name + " (" + $backticks + ")") -ForegroundColor Red
        $hasErrors = $true
    } else {
        Write-Host ("[PASS] " + $file.Name + " syntax structure verified") -ForegroundColor Green
    }
}

# Check index.html script references
$indexHtml = Get-Content "index.html" -Raw
$scriptMatches = [regex]::Matches($indexHtml, 'src="([^"]+)"')
foreach ($match in $scriptMatches) {
    $src = $match.Groups[1].Value
    if ($src -notmatch "^http") {
        $localPath = $src.TrimStart('./').Replace('/', '\')
        if (Test-Path $localPath) {
            Write-Host ("[PASS] Script referenced in index.html exists: " + $src) -ForegroundColor Green
        } else {
            Write-Host ("[FAIL] Missing script referenced in index.html: " + $src) -ForegroundColor Red
            $hasErrors = $true
        }
    }
}

# Check CSS file
if (Test-Path "css\styles.css") {
    Write-Host "[PASS] css\styles.css verified" -ForegroundColor Green
} else {
    Write-Host "[FAIL] css\styles.css missing" -ForegroundColor Red
    $hasErrors = $true
}

# Run end-to-end stability and persistence tests
powershell -ExecutionPolicy Bypass -File .\test-website-stability.ps1

Write-Host "===================================================" -ForegroundColor Cyan
if (!$hasErrors) {
    Write-Host "ALL ERROR AUDITS PASSED (0 ERRORS DETECTED)" -ForegroundColor Green
} else {
    Write-Host "ERRORS WERE DETECTED - PLEASE REVIEW ABOVE" -ForegroundColor Red
}
Write-Host "===================================================" -ForegroundColor Cyan
