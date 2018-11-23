module.exports = {
  devServer: {
    proxy: {
      '/gps_route_share': {
        target: 'https://www.codoon.com/www/gps_data_server',
        changeOrigin: true
      }
    }
  }
}
