const { defineConfig } = require('cypress')
require('dotenv/config')

module.exports = defineConfig({
  e2e: {
    video: false,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    viewportWidth: 1900,
    viewportHeight: 1200,
    experimentalRunAllSpecs: true,
    env: { hideXhr: true },
    setupNodeEvents(on, config) {
      require('cypress-localstorage-commands/plugin')(on, config)

      if (process.env.CYPRESS_ENVIROMENT === 'dev') {
        config.baseUrl = 'https://front.serverest.dev'
        config.env = {
          env: 'dev',
          api_url: 'https://serverest.dev',
        }
      } else {
        config.baseUrl = 'https://localhost:3000'
        config.env = {
          env: 'local',
          api_url: 'https://localhost:3000/api/v1/',
        }
      }

      return config
    },
  },
})
