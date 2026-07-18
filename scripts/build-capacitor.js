// app/api 폴더는 static export랑 호환이 안 되니까,
// Capacitor용 빌드할 때만 잠깐 빼놨다가 끝나면 원상복구함.
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const apiDir = path.join(__dirname, '..', 'app', 'api')
const apiBackup = path.join(__dirname, '..', 'app', '_api_backup')

function run() {
  const hadApi = fs.existsSync(apiDir)
  if (hadApi) fs.renameSync(apiDir, apiBackup)

  try {
    execSync('next build', {
      stdio: 'inherit',
      env: { ...process.env, CAPACITOR_BUILD: 'true' },
    })
  } finally {
    if (hadApi) fs.renameSync(apiBackup, apiDir)
  }
}

run()
