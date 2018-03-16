import { Word2Vec, WordVector } from 'node-word2vec'
import { pullAll } from 'lodash'

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
   * @param p 正向
   * @param n 逆向
   * @param size 数量
   * @return 可能的推测
   */
  async analogy(p: string[], n: string[], size = 10): Promise<string[]> {
    let v
    for (const s of p) {
      const sv = await this.getVector(s)
      v = v ? v.add(sv) : sv
    }
    if (v) {
      for (const s of n) {
        const sv = await this.getVector(s)
        v.add(sv.reverse())
      }
      const ret = await this.getSimilarWordList(v, size + p.length + n.length)
      pullAll(ret, p)
      pullAll(ret, n)
      return ret.slice(0, size)
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
