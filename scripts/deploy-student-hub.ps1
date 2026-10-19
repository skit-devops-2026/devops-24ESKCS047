# Script to deploy the built frontend to anjali-kanwar/student-hub on GitHub Pages
param (
    [string]$RepoUrl = "https://github.com/anjali-kanwar/student-hub.git"
)

$ErrorActionPreference = "Stop"

Write-Host "==> Building frontend..." -ForegroundColor Cyan
npm run build --prefix frontend

$distPath = Join-Path $PSScriptRoot "..\frontend\dist"
$tempDeployPath = Join-Path $PSScriptRoot "..\temp_student_hub_deploy"

if (Test-Path $tempDeployPath) {
    Remove-Item -Recurse -Force $tempDeployPath
}

Write-Host "==> Preparing deployment bundle..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path $tempDeployPath | Out-Null
Copy-Item -Path "$distPath\*" -Destination $tempDeployPath -Recurse

Push-Location $tempDeployPath

try {
    Write-Host "==> Initializing git in deployment bundle..." -ForegroundColor Cyan
    git init -b main
    git config user.name "Anjali Kanwar"
    git config user.email "anjalikanwar006@gmail.com"
    git add -A
    git commit -m "Deploy to GitHub Pages"
    git remote add origin $RepoUrl
    Write-Host "==> Pushing to $RepoUrl..." -ForegroundColor Cyan
    git push -u origin main --force
    Write-Host "==> Deployment pushed successfully!" -ForegroundColor Green
} finally {
    Pop-Location
    if (Test-Path $tempDeployPath) {
        Remove-Item -Recurse -Force $tempDeployPath
    }
}
