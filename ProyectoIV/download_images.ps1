$base = "https://image.pollinations.ai/prompt"
$images = @(
    @{ Name = "hero-1.jpg"; Prompt = "diverse friendly neighbors in modern suburban street sunny day photorealistic"; Width = 1200; Height = 600 },
    @{ Name = "hero-2.jpg"; Prompt = "closeup hand holding tablet displaying interactive city map safety data interface high tech"; Width = 1200; Height = 600 },
    @{ Name = "hero-3.jpg"; Prompt = "community meeting in sunny park happy diverse people sitting talking photorealistic"; Width = 1200; Height = 600 },
    @{ Name = "product-camera.jpg"; Prompt = "modern white wifi security camera IP camera isolated product photography"; Width = 600; Height = 600 },
    @{ Name = "product-alarm.jpg"; Prompt = "smart home security alarm system panel keypad modern design white background"; Width = 600; Height = 600 },
    @{ Name = "product-sensor.jpg"; Prompt = "small white motion sensor PIR wall mounted modern minimalist"; Width = 600; Height = 600 },
    @{ Name = "product-lock.jpg"; Prompt = "digital smart door lock with keypad and fingerprint scanner modern door"; Width = 600; Height = 600 },
    @{ Name = "product-kit.jpg"; Prompt = "home security system kit with cameras central hub and sensors product layout"; Width = 600; Height = 600 },
    @{ Name = "product-light.jpg"; Prompt = "outdoor LED security floodlight with motion sensor wall mounted"; Width = 600; Height = 600 },
    @{ Name = "evidence-1.jpg"; Prompt = "broken street light lamp post at night dark street urban decay"; Width = 800; Height = 600 },
    @{ Name = "evidence-2.jpg"; Prompt = "graffiti vandalism on a park bench urban park daylight"; Width = 800; Height = 600 },
    @{ Name = "evidence-3.jpg"; Prompt = "minor car accident bumper damage at city intersection day"; Width = 800; Height = 600 },
    @{ Name = "evidence-4.jpg"; Prompt = "damaged metal shop rolling shutter door attempted burglary dented"; Width = 800; Height = 600 },
    @{ Name = "evidence-5.jpg"; Prompt = "community neighborhood watch meeting outdoors people talking"; Width = 800; Height = 600 },
    @{ Name = "evidence-6.jpg"; Prompt = "dark residential street during power outage night no streetlights"; Width = 800; Height = 600 }
)

$destDir = "public\images"
if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

foreach ($img in $images) {
    # Simple URL encoding for spaces
    $encodedPrompt = $img.Prompt -replace " ", "%20"
    $url = "$base/$encodedPrompt`?width=$($img.Width)&height=$($img.Height)&nologo=true&seed=$((Get-Random))"
    $outputPath = Join-Path $destDir $img.Name
    Write-Host "Downloading $($img.Name) from $url..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
        Write-Host "Saved $($img.Name)"
    } catch {
        Write-Error "Failed to download $($img.Name): $_"
    }
}
