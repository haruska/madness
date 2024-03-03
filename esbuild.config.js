const path = require('path')
const relay = require('./createRelayPlugin')

const watch = process.argv.includes('--watch')
const clients = []

const watchOptions = {
    onRebuild: (error, result) => {
        if (error) {
            console.error('Build failed:', error)
        } else {
            console.log('Build succeeded')
            clients.forEach((res) => res.write('data: update\n\n'))
            clients.length = 0
        }
    }
}

require('esbuild').build({
    entryPoints: ["./application.tsx", "./reactComponents.tsx"],
    bundle: true,
    outdir: path.join(process.cwd(), "app/assets/builds"),
    plugins: [relay({
        "artifactDirectory": "./app/javascript/RelayArtifacts"
    })],
    absWorkingDir: path.join(process.cwd(), "app/javascript"),
    watch: watch && watchOptions,
}).catch(() => process.exit(1));
