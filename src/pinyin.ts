import { intersection, find, indexOf } from 'lodash'
import pinyin from 'pinyin'
/**
 * 包含
 */
export function includes(p: string[][], c: string[][]): boolean {
  if (p.length < c.length || c.length === 0) return false
  let i = 0
  let pi = -1
  for (const a of c) {
    const f = find(p, (b: string[]) => intersection(a, b).length > 0, i)
    if (!f) return false
    const t = indexOf(p, f, i)
    //console.log('a', a, 'f', f, 't', t, 'i', i, 'pi', pi)
    if (t - pi > 1 && pi >= 0) return false
    pi = t
    i = t
  }
  return true;
}

/**
 * 压韵
 */
export function rhyme(wa: string | string[][], wb: string | string[][], size = 1): boolean {
  if (size < 1 || wa.length < size || wb.length < size) return false
  const a = toArray(wa, size)
  const b = toArray(wb, size)
  //console.log(a, b)
  return includes(a, b)
}

// 中华新韵（十四韵）
const FOURTEEN = [
  ['麻', ['a', 'ia', 'ua']],
  ['波', ['o', 'e', 'uo']],
  ['皆', ['ie', 'ue']],
  ['开', ['ai', 'uai']],
  ['微', ['ei', 'ui']],
  ['豪', ['ao', 'iao']],
  ['尤', ['ou', 'iu']],
  ['寒', ['an', 'ian', 'uan']],
  ['文', ['en', 'in', 'un']],
  ['唐', ['ang', 'iang', 'uang']],
  ['庚', ['eng', 'ing']],
  ['齐', ['i']],
  ['支', ['zhi', 'zi', 'chi', 'ci', 'shi', 'si']],
  ['姑', ['u']],
  ['东', ['ong', 'iong']],
  ['居', ['ju', 'qu', 'xu', 'yu', 'nv', 'lv']],
  ['耳', ['er']],
]

function toVowel(str: string): string {
  const v = vowel(str).replace(/\d$/, '')
  const ret = find(FOURTEEN, (f) => f[1].includes(v))
  if (ret) return ret[0] as string
  return ''
}

export function toArray(w: string | string[][], size = w.length): string[][] {
  if (typeof (w) === 'string') {
    const py = pinyin(w, { style: pinyin.STYLE_TONE2 }).splice(w.length - size)
    for (const p of py) {
      for (let i = 0; i < p.length; i++) {
        p[i] = toVowel(p[i])
      }
    }
    return py
  }
  return w.slice(w.length - size) as string[][]
}

/**
 * 获取韵母
 */
export function vowel(str: string): string {
  // 十六居
  if (/^ju|qu|xu|yu|nv|lv\d$/.test(str)) return str
  // 十三支
  if (/^[zcs][h]*i\d$/.test(str)) return str
  // 去掉生母就是韵母
  return str.replace(/^[bpmfdtnlgkhjqxzcsryw]+/, '')
}
