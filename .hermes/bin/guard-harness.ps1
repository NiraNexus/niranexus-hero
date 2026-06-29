param([string]$task)
$limit = 5.00
$costFile = '.hermes/metrics/cost_meter.log'
if (Test-Path $costFile) {
    $cost = (Get-Content $costFile | Select-Object -Last 1).Split(' ')[1]
    if ([double]$cost -gt $limit) {
        Write-Error "[SAFETY CRITICAL]: Budget exceeded. Execution blocked."
        exit 1
    }
}
hermes run --task $task
