import { cutHMM } from 'nodejieba'
import { repeat } from 'lodash'
/**
 * 词语关系
 */
export interface Relation {
  /**
   * 关系对象
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
 * 获取词语关系
 * 男人爸爸，女人xx
 * 女人是关系对象
 * 爸爸是正向
 * 男人是负向
 * 结论是妻子
 * @param str 句子
 * @param split 标识符号
 * @return 关系词
 */
export function getRelation(str: string, split = 'x'): Relation[] {
  const lines = str.toLowerCase().split(/[\n\r．，,！]+/)
  const data = []
  let y = -1
  let x = -1
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]
    const r = []
    for (const c of cutHMM(l)) {
      //console.log(c)
      r.push(c)
    }
    data.push(r)
    if (contain(l, split)) {
      y = i // 查找缺失的行
      //console.log(r)
      for (let f = 0; f < r.length; f++) {
        const s = r[f].toLowerCase()
        //console.log('---', s, repeat(split.toLowerCase(), s.length))
        if (s === repeat(split.toLowerCase(), s.length)) {
          x = f // 查找缺失的列
        }
      }
    }
  }
  if (x > -1) {
    const r = []
    if (x > 0) {
      r.push(createRelation(data, 0, x, y))
    }
    if (x < data[y].length - 1) {
      r.push(createRelation(data, x + 1, x, y))
    }
    return r
  }
  return []
}

function createRelation(data: string[][], m: number, x: number, y: number): Relation {
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
  console.log('关系', r)
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
