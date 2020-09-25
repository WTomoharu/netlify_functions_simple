// 共通のページ取得モジュール

const axios = require('axios')

/**
 * webページの文字列を取得する
 * @param {string} url - 取得したいページのURLを
 * @return {string} - 成功の場合はbodyDataを、失敗の場合は空文字を返す
 */
module.exports = async (url) => {
  return axios.get(url).then((res) => res.data ).catch(() => "")
}