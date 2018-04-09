/**
 * 循环执行
 */
export class Loop {
  private start: number
  private num = 0
  private intervalTimer: any
  /**
   * @param millisec 间隔毫秒
   * @param runnable 循环执行的函数
   * @param count 循环次数,默认-1不停止
   */
  constructor(
    private millisec: number,
    private runnable: (loop: Loop) => void,
    private count = -1,
  ) { }

  /**
   * 运行
   */
  run() {
    this.start = new Date().getTime()
    this.intervalTimer = setTimeout(() => { this.doRun() }, this.millisec)
  }

  private doRun() {
    if (this.count === 0) { return }
    this.count -= 1
    this.num += 1
    const offset = new Date().getTime() - (this.start + this.num * 1000)
    // console.log('offset', offset)
    let nextTime = this.millisec - offset
    // console.log('offset', offset, nextTime)
    if (nextTime < 0) { nextTime = 0 }
    this.intervalTimer = setTimeout(() => { this.doRun() }, nextTime)
    this.runnable(this)
  }

  /**
   * 停止
   */
  stop() {
    this.count = 0
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer)
      this.intervalTimer = void 0
    }
  }
}
