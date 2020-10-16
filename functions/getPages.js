const axios = require('axios')

exports.handler = async (event, context) => {
  const urls = (event.queryStringParameters.urls || "").split(",").filter(v => v)
  const pages = await Promise.all(urls.map(async (url) => [url, axios.get(url).then((res) => res.data).catch(() => "")]))
  // const obj = { urls, pages: Object.assign(...pages.map(([k, v]) => ({ [k]: v }))) }
  const obj = { urls, pages }

  return {
    statusCode: 200,
    body: `${JSON.stringify(obj)}`,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }
}