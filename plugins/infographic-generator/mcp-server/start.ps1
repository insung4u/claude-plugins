Set-Location $PSScriptRoot
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies (first run)..."
    npm install --silent
}
node "$PSScriptRoot/index.js"
