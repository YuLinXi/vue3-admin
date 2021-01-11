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
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true,
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true,
      },
    },
  },
};
