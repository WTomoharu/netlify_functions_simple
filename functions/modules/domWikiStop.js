const jsdom = require('jsdom')
const { JSDOM } = jsdom

const pickDict = { 1: "Name", 0: "Number" }

function getStationTable(dom) {
  let flag = false
  for (const element of Array.from(dom.querySelectorAll(".mw-parser-output > *"))) {
    if (element.localName === "h2" && element.textContent.indexOf("駅一覧") == !1) {
      flag = true
    } else if (flag && element.className === "wikitable") {
      return element
    }
  }
}

class Stop {
  constructor(row) {
    const children = row.children
    this.name = children["1"].textContent.trim()
    this.number = children["0"].textContent.trim()
  }
}

function main(jsonData) {
  const HTMLText = Object.values(jsonData.query.pages)[0].revisions["0"]["*"]
  const dom = new JSDOM(HTMLText).window.document
  const stationTable = getStationTable(dom)
  const rowElements = stationTable.querySelectorAll("tr:nth-child(n+2)")
  const stops = Array.from(rowElements, row => new Stop(row))
  return stops
}

module.exports = main