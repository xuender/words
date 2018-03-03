import fs from 'fs'
import pinyin from 'pinyin'
import { chain, indexOf } from 'lodash'

import { includes, rhyme, toArray } from './pinyin'
/**
 * 字典格式定义
 */
export interface Dict {
  txt: string;
  pinyin: string[][];
}

/**
 * 字典工具
 */
export class DictUtils {
  private dicts = [];
  constructor(dict = './data/cy.json') {
    this.dicts = JSON.parse(fs.readFileSync(dict, 'utf8'))
  }

  /**
   * 查找包含的词
   */
  includes(w: string): string[] {
    const py = pinyin(w, { heteronym: true, style: pinyin.STYLE_NORMAL })
    return chain(this.dicts).filter((d: Dict) => includes(d.pinyin, py))
      .map((d: Dict) => d.txt)
      .value()
  }
  /**
   * 压韵
   */
  rhyme(w: string, size = 1): string[] {
    if (w.length < size) return []
    const wa = toArray(w, size)
    return chain(this.dicts).filter((d: Dict) => rhyme(wa, d.txt, size, w.split('').slice(w.length - size)))
      .map((d: Dict) => d.txt)
      .value()
  }
}
