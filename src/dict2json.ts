import chalk from 'chalk'
import fs from 'fs'
import readlineSync from 'readline-sync'
import pinyin from 'pinyin'

import { Dict } from './dict';
import { UseTime } from './utils'

async function main() {
  console.log('字典转换')
  const iFile = readlineSync.questionPath('请输入字典文件: ', {
    isFile: true
  });
  console.log(`开始读取 ${chalk.yellow(iFile)}`)
  const oFile = readlineSync.questionPath('请输入输出文件: ', {
    isFile: true,
    exists: false
  });
  const ut = new UseTime()
  const idsData = fs.readFileSync(iFile, 'utf8')
  const words = idsData.split(/\s+/)
  const dicts: Dict[] = []
  for (const w of words) {
    const d: Dict = {
      txt: w,
      pinyin: pinyin(w, { heteronym: true, style: pinyin.STYLE_NORMAL }),
    };
    dicts.push(d)
  }
  fs.writeFileSync(oFile, JSON.stringify(dicts, null, 2))
  console.log(`输出到 ${chalk.yellow(iFile)} 完毕`, ut.time)
}

main()
