const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Increase timeout for response waiting since we have simulated API delays
    defaultCommandTimeout: 10000,
    // Increase viewport for better visibility during testing
    viewportWidth: 1200,
    viewportHeight: 800,
  },
  // Configure video recording and screenshots
  video: false,
  screenshotOnRunFailure: true,
  // Retry tests to account for any flakiness due to simulated network issues
  retries: {
    runMode: 1,
    openMode: 0,
  },
});
