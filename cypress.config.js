const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      const cucumber = require('cypress-cucumber-preprocessor').default
  
      
      on('file:preprocessor', cucumber())
      
    },
    baseUrl: "https://sleek.com/sg/",
    specPattern:"**/*.{feature,features}"
  },
});
