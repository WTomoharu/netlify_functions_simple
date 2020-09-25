const getPage = require('./getPage.js')
const url = 'https://rss.allabout.co.jp/aa/latest/ch/health/'

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: await getPage(url)
  }
}