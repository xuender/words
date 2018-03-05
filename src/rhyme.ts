import { find } from 'lodash'

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

/**
 * 韵律
 * @param py 拼音
 * @return 十四韵
 */
export function rhyme(py: string): string {
  const v = vowel(py).replace(/\d$/, '')
  const ret = find(FOURTEEN, (f) => f[1].includes(v))
  if (ret) { return ret[0] as string }
  throw new Error(`韵错误: ${py} ${v} ${ret}`)
}

/**
 * 获取韵母
 */
export function vowel(py: string): string {
  // 十六居
  if (/^(ju|qu|xu|yu|nv|lv)\d?$/.test(py)) { return py }
  // 十三支
  if (/^[zcs][h]?i\d?$/.test(py)) { return py }
  // 去掉生母就是韵母
  return py.replace(/^[bpmfdtnlgkhjqxzcsryw]+/, '')
}

/**
 * 音调
 * @param py 拼音
 * @return 音调
 */
export function tone(py: string): string {
  switch (py.substr(py.length - 1)) {
    case '1': return '阴平'
    case '2': return '阳平'
    case '3': return '上声'
    case '4': return '去声'
    default: throw Error('音调错误')
  }
}
