module.exports = {
  apps: [{
    name: 'chickpeas',
    script: '.output/server/index.mjs',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
