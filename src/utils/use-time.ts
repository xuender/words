import chalk from 'chalk'
import moment from 'moment'

/**
 * 消耗时间
 */
export class UseTime {
  private static FORMAT: any = { d: '天', h: '小时', m: '分钟', s: '秒' }
  /**
   * 计算时间差
   * @param a 时间A(毫秒)
   * @param b 时间B(毫秒)
   * @return 自然语言描述
   */
  public static diff(a: number, b: number): string {
    if (a > b) { [a, b] = [b, a] }
    const nowMoment = moment(b)
    const startMoment = moment(a)
    const ms = []
    for (const k in UseTime.FORMAT) {
      const i = nowMoment.diff(startMoment, k as moment.unitOfTime.Diff)
      if (i) {
        ms.push(`${i}${UseTime.FORMAT[k]}`)
        startMoment.add(i, k as moment.unitOfTime.Diff)
      }
    }
    if (ms.length === 0) { ms.push(`${b - a}毫秒`) }
    return ms.join(' ')
  }

  /**
    * @param start 起始时间(毫秒)
   */
  constructor(private start = new Date().getTime()) { }

  /**
   * 消耗时间自然语言描述
   * @return 黄色粗体
   */
  get time(): string {
    return chalk.yellow.bold(UseTime.diff(this.start, new Date().getTime()))
  }

  toString(): string {
    return this.time
  }
}

const USER_TIME = new UseTime()

/**
 * 默认消耗时间函数
 * @return 自然语言描述消耗的时间
 */
export function useTime(): string {
  return USER_TIME.time
}
