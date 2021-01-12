module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variables.scss";',
      },
    },
  },

  devServer: {
    proxy: {
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true,
      },
    },
  },
};
