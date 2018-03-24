import fs from 'fs'
import { mv, mkdir } from 'shelljs'

async function main() {
  const dir = `/home/ender/work/node/words/data/lrc`
  console.log('检查目录', dir)
  const pa = fs.readdirSync(dir)
  pa.forEach((ele, index) => {
    if (!ele.includes('.')) {
      return
    }
    const a = `${dir}/${ele}`
    const b = ele.split('-')[0]
    mkdir(`${dir}/${b}`)
    mv(a, `${dir}/${b}/${ele}`)
    console.log(a, b, ele)
  })
}

main()
