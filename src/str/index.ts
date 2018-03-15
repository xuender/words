// 分词
import { extract } from 'nodejieba'
/**
 * 分词
 */
export function cut(str: string, s = 'x'): string[][] {
  const lines = str.split(/[\n\r．，！]+/)
  const ret = []
  for (const l of lines) {
    const cs = extract(l.replace(s, ''), 3)
    const r = []
    for (const c of cs) {
      r.push(c.word)
    }
    ret.push(r)
  }
  return ret
}

/**
 * 字符串包含
 */
export function contain(str: string, s = 'x'): boolean {
  return str.toLowerCase().includes(s.toLowerCase())
}
