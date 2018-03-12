import chalk from 'chalk'
/**
 * 进度条显示
 * @example
 * function print(i: number, max: number): Promise<number> {
 *   return new Promise<number>(resolve => {
 *     setTimeout(() => {
 *       progress(i, max, '测试')
 *       resolve(i)
 *     }, 10)
 *   })
 * }
 * async function main() {
 *   for (let i = 0; i < 200; i++) {
 *     await print(i, 199)
 *   }
 * }
 * main()
 * @param current 当前值
 * @param max 最大值
 * @param label 标题
 */
export function progress(current: number, max: number, label = '') {
  const i = parseInt(`${100 * current / max}`, 10)
  const a = (new Array(i + 1)).join('#')
  const b = (new Array(100 - i)).join('-')
  console.log(`\x1B[1A\x1B[K ${label} [${a}${b}] ${chalk.bold.green(String(current))}`)
}
