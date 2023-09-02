const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/styles/index.scss";`,
        sassOptions: {
          outputStyle: "expanded",
        },
      },
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#20BDBD",
            "border-color-base": "#ABB5BA",
            "border-radius-base": "4px",
            "font-size-base": "15px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
});
