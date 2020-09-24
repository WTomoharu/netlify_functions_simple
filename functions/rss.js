exports.handler = async (event, context) => {
  const axios = require('axios')
  const xml = await axios.get('https://rss.allabout.co.jp/aa/latest/ch/health/').then((res) => res.data )
  return {
    statusCode: 200,
    body: xml
  }
}