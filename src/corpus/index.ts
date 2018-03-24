import { getCorpus } from './corpus'

import { Relation } from './relation'
/**
 * 同义词查找
 * @param word 词
 * @return 同义词
 */
export function similar(word: string, max = 10): Promise<string[]> {
  return getCorpus().similar(word, max)
}

/**
 * 推测
 * @param like 相关词
 * @param p 正向
 * @param n 逆向
 * @param size 数量
 * @return 可能的推测
 */
export function analogy(r: Relation, max = 10): Promise<string[]> {
  return getCorpus().analogy(r, max)
}

export { Relation, getRelation } from './relation'
