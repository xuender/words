import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'

import { UseTime } from './utils'

async function main(dir: string) {
  const ut = new UseTime()
  const pa = fs.readdirSync(`${dir}/www.shi-ci.com/poem`)
  pa.forEach((ele, index) => {
    if (ele.includes('.')) {
      return
    }
    const html = fs.readFileSync(`${dir}/www.shi-ci.com/poem/${ele}`, 'utf-8')
    const $ = cheerio.load(html);
    const title = $('title').text().split(' ')[0]
    const time = $('.poet a:nth-child(1)').text()
    const poet = $('.poet a:nth-child(2)').text()
    const poem = $('#poem-content').text()
    console.log(`${title}\t${time}\t${poet}\t${poem}`)
    fs.appendFileSync(`${dir}/poet.txt`, `${title}\t${time}\t${poet}\t${poem}\n`)
    fs.appendFileSync(`${dir}/poet-c.txt`, `${poem}\n`)
  })
  return ut
}

main('/home/ender/work/node/words/data').then(ut => console.log(ut.time))
