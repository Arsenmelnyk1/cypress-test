const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    specPattern: [
      'cypress/e2e/userForm.cy.js'
    ],
  },
  retries: {
    runMode: 2,
    openMode: 2,
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  video: true,
  screenshotOnRunFailure: true,
  videoCompression: false,
  setupNodeEvents(on) {
    on('after:spec', (spec, results) => {
      if (results && results.video) {
        const failures = results.tests.some(test =>
          test.attempts.some(attempt => attempt.state === 'failed'),
        )
        if (!failures) {
          fs.unlinkSync(results.video)
        }
      }
    })
  },
});
