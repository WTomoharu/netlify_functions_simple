const jsdom = require('jsdom')
const { JSDOM } = jsdom

function timeFormat(text) {
  const [hour, minute] = text.split(":").map(v => String(Number(v)))
  return {hour, minute}
}

function stopNameFormat(text) {
  return text.replace(/\(.+?\)/, "")
}

class Stop {
  constructor(li, index) {
    this.stopName = stopNameFormat(li.querySelector('.title').textContent)
    const times = Array.from(li.querySelectorAll('.time > li'))
      .map(v => timeFormat(v.textContent.slice(0, -1)))
    
    if (times.length === 2) {
      this.arrTime = times[0]
      this.depTime = times[1]
    } else if (index === 0) {
      this.arrTime = null
      this.depTime = times[0]
    } else {
      this.arrTime = times[0]
      this.depTime = null
    }
  }
}

function main(HTMLText) {
  const dom = new JSDOM(HTMLText).window.document
  const lis = Array.from(dom.querySelectorAll('.station'))
  const stops = lis.map((li, i) => new Stop(li, i))
  return stops
}

module.exports = main