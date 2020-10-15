const axios = require('axios')

exports.handler = async (event, context) => {

  const urls = (event.queryStringParameters.urls || "").split(",").filter(v => v)
  console.log(JSON.stringify(urls))
  const pages = await urls.map(async (url) => axios.get(url).then((res) => res.data ).catch(() => "err"))
  console.log(JSON.stringify(pages))

  return {
    statusCode: 200,
    body: `${JSON.stringify(pages)}`
  }
}