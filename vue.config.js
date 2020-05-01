module.exports = {
  devServer: {
    port: 6543
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    config.plugins.delete('preload')
  },
}
