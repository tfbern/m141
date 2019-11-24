module.exports = {
  "devServer": {
    "port": 80,
    "proxy": {
      "/api": {
        "target": "http://localhost:3000/"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}