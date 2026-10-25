const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        port: 8080,
        protocol: 'ws'
      },
      overlay: {
        warnings: false,
        errors: true
      }
    }
  }
})
