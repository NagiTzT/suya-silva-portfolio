[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[a-z0-9]{20}$')]
  [string]$ProjectRef,

  [switch]$Apply,
  [switch]$Seed,
  [switch]$SkipLogin
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot

function Resolve-SupabaseCommand {
  if (Get-Command 'supabase' -ErrorAction SilentlyContinue) {
    return @{ Exe = 'supabase'; Prefix = @() }
  }
  if (Get-Command 'npx' -ErrorAction SilentlyContinue) {
    return @{ Exe = 'npx'; Prefix = @('--yes', 'supabase@latest') }
  }
  if (Get-Command 'pnpm' -ErrorAction SilentlyContinue) {
    return @{ Exe = 'pnpm'; Prefix = @('dlx', 'supabase@latest') }
  }
  throw 'Instale o Node.js LTS (inclui npx) ou o Supabase CLI antes de continuar.'
}

function Invoke-Supabase {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$CommandArgs)
  & $script:supabaseCommand.Exe @($script:supabaseCommand.Prefix) @CommandArgs
  if ($LASTEXITCODE -ne 0) {
    throw "O comando Supabase falhou: $($CommandArgs -join ' ')"
  }
}

function ConvertFrom-SecureValue {
  param([securestring]$Value)
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Value)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
  }
}

Push-Location $projectRoot
try {
  $script:supabaseCommand = Resolve-SupabaseCommand

  if (-not $SkipLogin) {
    Write-Host '1/4 Autenticando no Supabase...'
    Invoke-Supabase login
  } else {
    Write-Host '1/4 Usando a autenticação já existente...'
  }

  Write-Host '2/4 Vinculando este diretório ao projeto...'
  Invoke-Supabase link --project-ref $ProjectRef

  Write-Host '3/4 Validando migrations sem aplicar...'
  Invoke-Supabase db push --dry-run

  if (-not $Apply) {
    Write-Host ''
    Write-Host 'Validação concluída. Execute novamente com -Apply para enviar as migrations.'
    return
  }

  Write-Host '4/4 Aplicando schema, políticas RLS e heartbeat...'
  Invoke-Supabase db push

  $supabaseUrl = "https://$ProjectRef.supabase.co"
  $publishableKey = ConvertFrom-SecureValue (Read-Host 'Cole a chave Publishable/anon (ela não será exibida)' -AsSecureString)
  @(
    "VITE_SUPABASE_URL=$supabaseUrl"
    "VITE_SUPABASE_PUBLISHABLE_KEY=$publishableKey"
  ) | Set-Content -LiteralPath (Join-Path $projectRoot '.env.local') -Encoding utf8
  $publishableKey = $null

  if ($Seed) {
    if (-not (Get-Command 'node' -ErrorAction SilentlyContinue)) {
      throw 'Node.js não foi encontrado. Instale o Node.js LTS para carregar os projetos e imagens.'
    }

    $secretKey = ConvertFrom-SecureValue (Read-Host 'Cole a chave Secret (uso local e temporário)' -AsSecureString)
    try {
      $env:SUPABASE_URL = $supabaseUrl
      $env:SUPABASE_SECRET_KEY = $secretKey
      node (Join-Path $PSScriptRoot 'seed-supabase.mjs')
      if ($LASTEXITCODE -ne 0) { throw 'A carga de dados falhou.' }
    } finally {
      Remove-Item Env:SUPABASE_URL -ErrorAction SilentlyContinue
      Remove-Item Env:SUPABASE_SECRET_KEY -ErrorAction SilentlyContinue
      $secretKey = $null
    }
  }

  Write-Host ''
  Write-Host 'Configuração concluída. A chave administrativa não foi salva em arquivo.'
} finally {
  Pop-Location
}
