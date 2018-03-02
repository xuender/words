import { DictUtils } from './dict'
import { toArray } from './pinyin'
import pinyin from 'pinyin'
const dictUtils = new DictUtils()

async function main() {
  //for (const w of ['领新', '海尔', '青岛', '程序']) {
  //console.log(w, dictUtils.includes(w))
  //}
  //for (const w of ['扫把星', '破伤风']) {
  //console.log(w, dictUtils.rhyme(w, w.length))
  //}
  for (const w of ['疲惫', '体会', '倒退', '早已经长大', '早不说谎话', '复读机', '有出息', '大肥裤子', '饿着肚子']) {
    console.log(w, toArray(w))
  }
}

main()
