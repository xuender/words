import { intersection, find, indexOf } from 'lodash'
import pinyin from 'pinyin'

import { rhyme as toRhyme } from './rhyme'
/**
 * 包含
 */
export function includes(p: string[][], c: string[][]): boolean {
  if (p.length < c.length || c.length === 0) { return false }
  let i = 0
  let pi = -1
  for (const a of c) {
    const f = find(p, (b: string[]) => intersection(a, b).length > 0, i)
    if (!f) { return false }
    const t = indexOf(p, f, i)
    // console.log('a', a, 'f', f, 't', t, 'i', i, 'pi', pi)
    if (t - pi > 1 && pi >= 0) { return false }
    pi = t
    i = t
  }
  return true;
}
/**
 * 比较
 */
export function equal(a: string[][], b: string[][]): boolean {
  if (a.length !== b.length) { return false }
  for (let i = 0; i < a.length; i++) {
    if (intersection(a[i], b[i]).length === 0) { return false }
  }
  return true
}
/**
 * 压韵
 * @param wa 比较词
 * @param wb 比较词
 * @param size 比较的末尾长度
 * @param exclude 排除的文字
 */
export function rhyme(
  wa: string | string[][],
  wb: string | string[][],
  size = 1,
  exclude: string[] = []): boolean {
  if (size < 1 || wa.length < size || wb.length < size) { return false }
  if (typeof (wb) === 'string') {
    // console.log(wb, exclude)
    if (intersection(wb.split('').slice(wb.length - size), exclude).length > 0) { return false }
  }
  const a = toArray(wa, size)
  const b = toArray(wb, size)
  // console.log(a, b)
  return equal(a, b)
}

function getVowel(py: string): string {
  return toRhyme(py) + tone(py)
}
function tone(str: string): string {
  return ['1', '2'].includes(str.substr(str.length - 1)) ? '平' : '仄'
}

export function toArray(w: string | string[][], size = w.length): string[][] {
  if (typeof (w) === 'string') {
    const py = pinyin(w, { style: pinyin.STYLE_TONE2 }).splice(w.length - size)
    for (const p of py) {
      for (let i = 0; i < p.length; i++) {
        p[i] = getVowel(p[i])
      }
    }
    return py
  }
  return w.slice(w.length - size) as string[][]
}
