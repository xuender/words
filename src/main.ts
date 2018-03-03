import { DictUtils } from './dict'
import { toArray } from './pinyin'
import {UseTime} from './utils'
import pinyin from 'pinyin'
// const dictUtils = new DictUtils('./test/test.json')
const dictUtils = new DictUtils()

async function main() {
  //for (const w of ['领新', '海尔', '青岛', '程序']) {
  //console.log(w, dictUtils.includes(w))
  //}
  for (const w of ['扫把星', '破伤风', '希望']) {
    const ut = new UseTime()
    console.log(w, dictUtils.rhyme(w, w.length), ut.time)
  }
  for (const w of ['希望', '一击']) {
    console.log(w, toArray(w))
  }
}

main()
