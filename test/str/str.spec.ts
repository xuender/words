import { contain, cut } from '../../src/str'
describe('字符串 str', () => {
  it('包含 contain', () => {
    expect(contain('你好xx')).toBe(true)
    expect(contain('你好yy')).toBe(false)
  })
  it('分词 cut', () => {
    expect(cut('')).toBe(true)
    expect(contain('你好yy')).toBe(false)
  })
})
