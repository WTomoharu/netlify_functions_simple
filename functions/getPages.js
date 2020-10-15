const axios = require('axios')

exports.handler = async (event, context) => {

  const urls = (event.queryStringParameters.urls || "").split(",").filter(v => v)
  const pages = await urls.map(async (url) => axios.get(url).then((res) => res.data ).catch(() => "err"))
  console.log(JSON.stringify({event, urls, pages}))

  return {
    statusCode: 200,
    body: `${JSON.stringify({event, urls, pages})}`
  }
}