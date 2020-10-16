const axios = require('axios')
const myModule = require('./modules/domTrain.js')

exports.handler = async (event, context) => {
  const urls = (event.queryStringParameters.urls || "").split(",").filter(v => v)
  const pages = await Promise.all(urls.map(async (url) => axios.get(url).then((res) => myModule(res.data)).catch(() => "")))
  const obj = { urls, pages: Object.assign(...pages.map((v, i) => ({ [urls[i]]: v }))) }

  return {
    statusCode: 200,
    body: `${JSON.stringify(obj)}`,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }
}