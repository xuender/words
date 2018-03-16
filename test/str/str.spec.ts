import { contain, cut } from '../../src/str'
describe('字符串 str', () => {
  it('包含 contain', () => {
    expect(contain('你好xx')).toBe(true)
    expect(contain('你好yy')).toBe(false)
  })
  it('分词 cut', () => {
    expect(cut('妈妈')).toEqual(jasmine.arrayContaining([['妈妈']]))
    const c = cut('妈妈妻子，爸爸xx')
    expect(c[0]).toEqual(jasmine.arrayContaining(['妈妈', '妻子']))
    expect(c[1]).toEqual(jasmine.arrayContaining(['爸爸']))
    expect(c[1]).not.toEqual(jasmine.arrayContaining(['xx']))
  })
})
