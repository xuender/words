import { cutHMM } from 'nodejieba'
/**
 * 词语关联
 */
export interface Relation {
  /**
   * 主要关系
   */
  main: string
  /**
   * 正向
   */
  positive: string[]
  /**
   * 负向
   */
  negative: string[]
}

/**
 * 分词
 * @param str 句子
 * @param split 标识符号
 * @return 分词结果
 */
export function relation(str: string, split = 'x'): Relation[] {
  console.log('str', str)
  const lines = str.toLowerCase().split(/[\n\r．，,！]+/)
  const data = []
  let y = -1
  let x = -1
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]
    const r = []
    for (const c of cutHMM(l)) {
      r.push(c)
    }
    data.push(r)
    if (contain(l, split)) {
      y = i // 查找缺失的行
      console.log(r)
      for (let f = 0; f < r.length; f++) {
        const s = r[f].toLowerCase()
        console.log('---', s, (new Array(s.length + 1)).join(split.toLowerCase()))
        if (s === (new Array(s.length + 1)).join(split.toLowerCase())) {
          x = f // 查找缺失的列
        }
      }
    }
  }
  console.log('x', x, 'y', y, data)
  if (x > -1) {
    const r = []
    if (x > 0) {
      r.push(getRelation(data, 0, x, y))
    }
    if (x < data[y].length - 1) {
      r.push(getRelation(data, x + 1, x, y))
    }
    return r
  }
  return []
}

function getRelation(data: string[][], m: number, x: number, y: number): Relation {
  const p: string[] = []
  const n: string[] = []
  const r = { main: data[y][m], positive: p, negative: n }
  for (let i = 0; i < data.length; i++) {
    if (i === y) { continue }
    const d = data[i]
    for (let f = 0; f < d.length; f++) {
      if (f === x) { p.push(d[f]) }
      if (f === m) { n.push(d[f]) }
    }
  }
  return r
}

/**
 * 字符串包含分隔符
 * @param str 字符串
 * @param split 分隔符
 * @return 是否包含分隔符
 */
export function contain(str: string, split = 'x'): boolean {
  return str.toLowerCase().includes(split.toLowerCase())
}
