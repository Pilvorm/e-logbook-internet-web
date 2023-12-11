const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "bsdeu1",

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});
