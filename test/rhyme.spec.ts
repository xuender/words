import { rhyme, vowel, tone } from '../src/rhyme'
describe('押韵', () => {
  it('韵母 vowel', () => {
    expect(vowel('chang')).toBe('ang')
    expect(vowel('pin1')).toBe('in1')
  })
  it('音调 tone', () => {
    expect(tone('a1')).toBe('阴平')
    expect(tone('a2')).toBe('阳平')
    expect(tone('a3')).toBe('上声')
    expect(tone('a4')).toBe('去声')
  })
})

describe('十四韵 rhyme', () => {
  it('麻', () => {
    expect(rhyme('ma')).toBe('麻')
    expect(rhyme('lia')).toBe('麻')
    expect(rhyme('gua')).toBe('麻')
  })
  it('十三支', () => {
    expect(rhyme('chi')).toBe('支')
    expect(rhyme('si3')).toBe('支')
  })
  it('十六居', () => {
    expect(rhyme('qu')).toBe('居')
    expect(rhyme('lv3')).toBe('居')
  })
})