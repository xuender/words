import pinyin from 'pinyin'

import { Sentence, setRhyme } from './sentence'
import { Word } from './word'
import { Rhyme } from './rhyme';
import { rhyme, tone } from '../rhyme'

/**
 * 诗歌
 */
export class Poetry {
  sentences: Sentence[] = []

  constructor(p: string) {
    if (!p || !p.trim()) { throw new Error('内容为空') }
    for (const s of p.split(/[\n\r]+/)) {
      this.sentences.push(this.toSentence(s.trim()))
    }
    this.matches()
  }

  /**
   * 检查压韵
   */
  private matches() {
    if (this.sentences.length === 0) { return }
    for (let i = 1; i < this.sentences.length; i++) {
      setRhyme(this.sentences[i], ...this.sentences.slice(0, i))
    }
    setRhyme(this.sentences[0], ...this.sentences.slice(1, 3))
  }

  /**
   * 生成句子
   * @param s 句子
   * @returns 句子对象
   */
  private toSentence(s: string): Sentence {
    const words = []
    for (const w of s.split('')) {
      // 判断是否是汉子
      if (/^[\u4E00-\u9FA5\uF900-\uFA2D]$/.test(w)) {
        words.push(this.toWord(w))
      }
    }
    return { s: s, words: words }
  }

  /**
   * 生成词
   * @param w 词
   * @returns 词对象
   */
  private toWord(w: string): Word {
    return {
      w: w,
      py: pinyin(w, { style: pinyin.STYLE_TONE })[0],
      rhyme: this.toRhyme(w),
    }
  }

  /**
   * 生成韵
   */
  private toRhyme(w: string): Rhyme[] {
    const py = pinyin(w, { style: pinyin.STYLE_TONE2 })[0]
    const ret: Rhyme[] = []
    py.forEach(p => ret.push({
      py: p,
      r: rhyme(p),
      t: tone(p)
    }))
    return ret
  }
}
