import fs from 'fs'
import pino from 'pino'
import { forEach } from 'lodash'

import { UseTime, chinese } from './utils'

const log = pino({ prettyPrint: true })

async function main(dir: string) {
  const ut = new UseTime()
  log.info('扫描', dir)
  const pa = fs.readdirSync(dir)
  pa.forEach(af => {
    if (!chinese(af)) { return }
    //log.info('歌手', af)
    const pb = fs.readdirSync(`${dir}/${af}`)
    pb.forEach(bf => {
      if (!chinese(bf)) { return }
      //log.warn('歌曲', bf)
      const ts = fs.readFileSync(`${dir}/${af}/${bf}`, 'utf-8')
      forEach(ts.split(/\s*\n+\s*/), t => {
        if (!t.includes('[')) { return true }
        if (!t.startsWith('[00')) { return true }
        if (chinese(t, true)) {
          const str = t.replace(/^[\[\]0-9:.]+/, '')
          if (str.includes(':') || str.includes('：')) { return true }
          if (str.trim()) {
            log.info(str)
            fs.appendFileSync('/home/ender/work/node/words/data/lrc.txt', str + '\n')
          }
        } else {
          return false
        }
      })
    })
  })
  return ut
}

main('/home/ender/work/node/words/data/lrc').then(ut => log.info('耗时', ut.time))
