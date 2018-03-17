import { Word2Vec, WordVector } from 'node-word2vec'
import { chain } from 'lodash'

import { Relation } from './relation'

/**
 * 语料库
 */
export class Corpus {
  private model: Word2Vec;

  /**
   * 根据语料模型生成语料库
   * @param modelFile 语料模型
   */
  constructor(modelFile = __dirname + '/../../data/corpus.bin') {
    this.model = new Word2Vec(modelFile)
  }

  /**
   * 近义词
   * @param word 词
   * @param size 数量
   * @return 近义词
   */
  async similar(word: string, size = 10): Promise<string[]> {
    const v = await this.getVector(word)
    const ret = await this.getSimilarWordList(v, size)
    return ret
  }

  private getVector(word: string): Promise<WordVector> {
    return new Promise<WordVector>(resolve => {
      this.model.getVector(word, resolve)
    })
  }

  private getSimilarWordList(v: WordVector, count = 10): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      this.model.getSimilarWordList(v, count, f => resolve(f as string[]))
    })
  }

  /**
   * 推测
   * @param r 关系
   * @param size 数量
   * @return 可能的推测
   */
  async analogy(r: Relation, size = 10): Promise<string[]> {
    console.log('r', r)
    let v = await this.getVector(r.main)
    if (v) {
      for (const s of r.negative) { // 逆向
        const sv = await this.getVector(s)
        if (sv) { v = v.add(sv.reverse()) }
      }
      for (const s of r.positive) { // 正向
        const sv = await this.getVector(s)
        if (sv) { v = v.add(sv) }
      }
      const ret = await this.getSimilarWordList(v, size + r.positive.length + r.negative.length)
      return chain(ret).map(k => k[0]).pullAll(r.positive).pullAll(r.negative).slice(0, size).value()
    }
    return []
  }
}

let CORPUS: Corpus
export function getCorpus() {
  if (!CORPUS) {
    CORPUS = new Corpus()
  }
  return CORPUS
}
