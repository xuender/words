/**
 * 查找有关系的词
 * @param words 需要查找的词
 * @param max 最多的返回数量
 * @return 关系词
 */
export function relation(words: string[], max = 10): string[] {
  return []
}

/**
 * 同义词查找
 * @param word 词
 * @return 同义词
 */
export function consent(word: string): string[] {
  return []
}

/**
 * 关系词及其同义词
 * @param words 查找的词
 * @param max 关系词最大数量
 * @return 关系词的同义词，数量会大于关系词最大数量
 */
export function relationAll(words: string[], max = 10): string[] {
  const s = new Set<string>()
  for (const w of relation(words, max)) {
    for (const c of consent(w)) {
      s.add(c)
    }
  }
  return Array.from(s)
}
