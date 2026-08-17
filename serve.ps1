# Anugraha Eye Hospital - Local & Multi-Device Live Dev Server with Persistent REST API
$port = 8080

$localIP = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*","Ethernet*" -ErrorAction SilentlyContinue | Where-Object { $_.IPAddress -notlike "169.254*" } | Select-Object -ExpandProperty IPAddress -First 1)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

if ($localIP) {
    try {
        $listener.Prefixes.Add("http://${localIP}:$port/")
    } catch {
        # ignore if IP prefix cannot be added directly
    }
}

try {
    $listener.Start()
} catch {
    # Fallback to localhost-only listener if needed
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Prefixes.Add("http://127.0.0.1:$port/")
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  ANUGRAHA EYE HOSPITAL - LIVE SERVER & API ENGINE ACTIVE  " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Localhost URL:     http://localhost:$port/" -ForegroundColor Yellow
Write-Host "  Loopback URL:      http://127.0.0.1:$port/" -ForegroundColor Yellow
if ($localIP) {
    Write-Host "  Network Devices:   http://$($localIP):$port/" -ForegroundColor Cyan
    Write-Host "  (All phones, tablets & devices on the same WiFi/LAN can open this URL)" -ForegroundColor Gray
}
Write-Host "  API Endpoint:      http://localhost:$port/api/store (GET / POST)" -ForegroundColor Magenta
Write-Host "==========================================================" -ForegroundColor Cyan

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".avif" = "image/avif"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".xml"  = "application/xml; charset=utf-8"
}

$dataPath = Join-Path $PSScriptRoot "data\store.json"
$dataDir = Join-Path $PSScriptRoot "data"
if (!(Test-Path $dataDir)) {
    New-Item -ItemType Directory -Force -Path $dataDir | Out-Null
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS Headers for all devices & cross-origin IP access
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Cache-Control")
        $response.AddHeader("Access-Control-Max-Age", "86400")

        # Handle Preflight OPTIONS
        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $rawPath = $request.Url.AbsolutePath
        $path = $rawPath.ToLower()

        # ----------------------------------------------------
        # REST API: GET /api/store or GET /api/data
        # ----------------------------------------------------
        if (($path -eq "/api/store" -or $path -eq "/api/data" -or $path -eq "/api/save") -and $request.HttpMethod -eq "GET") {
            $response.ContentType = "application/json; charset=utf-8"
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            if (Test-Path $dataPath) {
                $bytes = [System.IO.File]::ReadAllBytes($dataPath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $msg = [System.Text.Encoding]::UTF8.GetBytes("{}")
                $response.ContentLength64 = $msg.Length
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
            $response.OutputStream.Close()
            continue
        }

        # ----------------------------------------------------
        # REST API: POST /api/store or POST /api/save (Save Data)
        # ----------------------------------------------------
        if (($path -eq "/api/store" -or $path -eq "/api/data" -or $path -eq "/api/save") -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $body = $reader.ReadToEnd()
            $reader.Close()

            if (![string]::IsNullOrWhiteSpace($body)) {
                [System.IO.File]::WriteAllText($dataPath, $body, [System.Text.Encoding]::UTF8)
                $response.StatusCode = 200
                $response.ContentType = "application/json; charset=utf-8"
                $resJson = [System.Text.Encoding]::UTF8.GetBytes('{"success":true,"message":"Store saved to server disk successfully","timestamp":"' + (Get-Date).ToString("o") + '"}')
                $response.ContentLength64 = $resJson.Length
                $response.OutputStream.Write($resJson, 0, $resJson.Length)
            } else {
                $response.StatusCode = 400
                $resJson = [System.Text.Encoding]::UTF8.GetBytes('{"success":false,"error":"Empty body"}')
                $response.ContentLength64 = $resJson.Length
                $response.OutputStream.Write($resJson, 0, $resJson.Length)
            }
            $response.OutputStream.Close()
            continue
        }

        # ----------------------------------------------------
        # STATIC FILE SERVING
        # ----------------------------------------------------
        $relPath = $request.Url.LocalPath
        if ($relPath -eq "/" -or [string]::IsNullOrWhiteSpace($relPath)) { 
            $relPath = "/index.html" 
        }

        $localPath = Join-Path $PSScriptRoot $relPath.TrimStart('/').Replace('/', '\')

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            if ($mimeTypes.ContainsKey($ext)) {
                $response.ContentType = $mimeTypes[$ext]
            } else {
                $response.ContentType = "application/octet-stream"
            }

            # Disable cache for json / js / html during active editing so changes reflect immediately
            if ($ext -eq ".json" -or $ext -eq ".html" -or $ext -eq ".js") {
                $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            }

            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # continue server loop
    }
}
