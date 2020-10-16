const jsdom = require('jsdom')
const { JSDOM } = jsdom

let Dict;

function getDict(dom) {
  const trainType = {}
  for (const item of Array.from(dom.querySelectorAll("#timeNotice1 td ul li"))) {
    const [key, value] = item.textContent.split("：")
    trainType[key] = value
  }

  const trainFor = {}
  for (const item of Array.from(dom.querySelectorAll("#timeNotice2 td ul li"))) {
    const [key, value] = item.textContent.split("：")
    trainFor[key] = value
  }

  return { trainType, trainFor }
}

class Cell {
  constructor(li, hour) {
    this.hour = hour
    this.minute = li.querySelector("dt").textContent

    const trainTypeKey = li.querySelector(".trainType") ?
      li.querySelector(".trainType").textContent.slice(1, -1) : "無印"
    this.trainType = Dict.trainType[trainTypeKey]

    const trainForKey = li.querySelector(".trainFor") ?
      li.querySelector(".trainFor").textContent : "無印"
    this.trainFor = Dict.trainFor[trainForKey]

    this.trainNumber = li.querySelector("a").href.match(/(?<=train\/).+?(?=\/)/)
    this.url = li.querySelector("a").href
  }
}

class Row {
  constructor(tr) {
    const lis = Array.from(tr.querySelectorAll(".timeNumb"))
    const hour = tr.querySelector(".hour").textContent
    this.cells = lis.map(li => new Cell(li, hour))
  }
}

function main(HTMLText) {
  const dom = new JSDOM(HTMLText).window.document
  Dict = getDict(dom)
  const trs = Array.from(dom.querySelectorAll('.tblDiaDetail tr')).slice(1)
  const rows = trs.map(tr => new Row(tr))
  const out = [].concat(...rows.map(row => row.cells))
  return out
}

module.exports = main