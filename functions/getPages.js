exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: `JSON:${JSON.stringify(["HelloGetPages", context])}`
  }
}