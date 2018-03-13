import { getCorpus } from './corpus'
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
 * @param p 正向
 * @param n 逆向
 * @param size 数量
 * @return 可能的推测
 */
export function analogy(p: string[], n: string[], max = 10): Promise<string[]> {
  return getCorpus().analogy(p, n, max)
}
