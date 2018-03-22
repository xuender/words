import { chinese } from '../../src/utils/str'

describe('str 字符串', () => {

  it('chinese 中文', () => {
    expect(chinese('你好')).toBe(true)
    expect(chinese('book 书')).toBe(true)
  })

  it('chinese 非中文', () => {
    expect(chinese('スイカ')).toBe(false)
    expect(chinese('수박')).toBe(false)
    expect(chinese('book', true)).toBe(false)
  })
})
