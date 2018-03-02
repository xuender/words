import { UseTime } from '../../src/utils/use-time'
describe('消耗时间', () => {
  it('时间差', () => {
    expect(UseTime.diff(0, 1)).toBe('1毫秒')
    expect(UseTime.diff(1, 10)).toBe('9毫秒')
    expect(UseTime.diff(0, 10000)).toBe('10秒')
    expect(UseTime.diff(0, 100000000)).toBe('1天 3小时 46分钟 40秒')
  })
  it('时间颠倒', () => {
    expect(UseTime.diff(11, 10)).toBe('1毫秒')
  })
})
