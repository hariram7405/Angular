Write-Host "Building and deploying Angular projects..." -ForegroundColor Green

$projects = @(
    @{Path="Day1\Phase1"; Name="Day1 Phase1"; BaseHref="/Angular-Training/day1-phase1/"},
    @{Path="Day1\Project2"; Name="Day1 Project2"; BaseHref="/Angular-Training/day1-project2/"},
    @{Path="Day2\Phase1"; Name="Day2 Phase1"; BaseHref="/Angular-Training/day2-phase1/"},
    @{Path="Day2\Project2"; Name="Day2 Project2"; BaseHref="/Angular-Training/day2-project2/"}
)

foreach ($project in $projects) {
    Write-Host "`nBuilding $($project.Name)..." -ForegroundColor Yellow
    
    if (Test-Path $project.Path) {
        Set-Location $project.Path
        
        Write-Host "Installing dependencies..." -ForegroundColor Cyan
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Building project..." -ForegroundColor Cyan
            ng build --base-href="$($project.BaseHref)"
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ $($project.Name) built successfully!" -ForegroundColor Green
            } else {
                Write-Host "✗ Failed to build $($project.Name)" -ForegroundColor Red
            }
        } else {
            Write-Host "✗ Failed to install dependencies for $($project.Name)" -ForegroundColor Red
        }
        
        Set-Location ..\..
    } else {
        Write-Host "✗ Project path not found: $($project.Path)" -ForegroundColor Red
    }
}

Write-Host "`nAll builds completed!" -ForegroundColor Green
Write-Host "Push to GitHub to trigger automatic deployment." -ForegroundColor Cyan