import { includes, rhyme, vowel } from '../src/pinyin'

describe('拼音 includes', () => {
  const p = [['a'], ['b'], ['c'], ['d', 'e']]
  it('包含 includes', () => {
    expect(includes(p, [['a'], ['b']])).toBe(true)
    expect(includes(p, [['b'], ['c']])).toBe(true)
    expect(includes(p, [['b'], ['f', 'c']])).toBe(true)
    expect(includes(p, [['c'], ['d']])).toBe(true)
    expect(includes(p, [['c'], ['e']])).toBe(true)
    expect(includes(p, [['k', 'b'], ['c']])).toBe(true)
  })
  it('不包含 includes', () => {
    expect(includes(p, [['a'], ['b'], ['c'], ['d'], ['e']])).toBe(false)
    expect(includes(p, [['k']])).toBe(false)
    expect(includes(p, [['a'], ['c']])).toBe(false)
    expect(includes(p, [['b'], ['a']])).toBe(false)
    expect(includes(p, [])).toBe(false)
  })
})

describe('拼音 rhyme', () => {
  it('压韵 rhyme', () => {
    expect(rhyme('心花', '新华')).toBe(true)
  })
  it('不压韵 rhyme', () => {
    expect(rhyme('心花', '西球')).toBe(false)
  })
})

describe('韵母 vowel', () => {
  it('vowel', () => {
    expect(vowel('chang')).toBe('ang')
    expect(vowel('pin1')).toBe('in1')
  })
})
