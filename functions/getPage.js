// 共通のページ取得モジュール
const axios = require('axios')

module.exports = async (url) => {
  return axios.get(url).then((res) => res.data )
}