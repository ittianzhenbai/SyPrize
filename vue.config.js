module.exports = {
    publicPath: "./",
    devServer: {
      overlay: {
        warnings: false,
        errors: false
      },
      hot: true,
      port: 8088,
      proxy: {
        "/api": {
          ws: true,
          target:
            process.env.VUE_APP_URL,
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            "^/api": ""
          }
        }
      }
    },
    lintOnSave: false//全局禁用eslint
  };
  