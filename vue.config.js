module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.scss"; @import "@/styles/_base.scss"; @import "@/styles/_animations.scss";`,
      }
    }
  }
};