const getPage = require('./getPage.js')

exports.handler = async (event, context) => {
  const url = 'https://rss.allabout.co.jp/aa/latest/ch/health/'
  const xml = await getPage(url)
  return {
    statusCode: 200,
    body: xml
  }
}