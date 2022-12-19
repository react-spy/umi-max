export default {
  "dev": {
    '/conference_api': {
      target: 'http://47.104.187.0/',
      changeOrigin: true,
      pathRewrite: {
        '^/conference_api': '/conference_api',
      },
    },
  },
};
