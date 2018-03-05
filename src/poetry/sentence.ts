import { Word } from './word'
import { matches } from './rhyme'
/**
 * 句子
 */
export interface Sentence {
  /**
   * 句子
   */
  s: string
  /**
   * 词组
   */
  words: Word[]
  /**
   * 句尾押韵
   */
  rhyme?: number
}

/**
 * 设置句子押韵数量
 * @param s 要设置押韵的句子
 * @param ps 对比句子
 */
export function setRhyme(s: Sentence, ...ps: Sentence[]) {
  let max = 0
  for (const p of ps) {
    const r = getRhyme(p, s)
    if (r > max) { max = r }
  }
  s.rhyme = max
}

/**
 * 比较两个句子末尾压韵字数
 */
function getRhyme(a: Sentence, b: Sentence): number {
  const len = a.words.length < b.words.length ? a.words.length : b.words.length
  if (len === 0) { return 0 }
  for (let i = 1; i <= len; i++) {
    if (!matches(a.words[a.words.length - i].rhyme, b.words[b.words.length - i].rhyme)) {
      return i - 1
    }
  }
  return len
}
