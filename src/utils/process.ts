import chalk from 'chalk'

/**
 * 颜色表
 */
const COLORS: string[] = `ff0000,00ffff,0000ff,ffff00,00ff00,ff00ff,ffffff,
000033,003300,ffccff,00cc00,ff00cc,00ff33,ff33ff,330000,ccffff,33ff00,cc00ff,
cc0000,00ffcc,ff0033,33ffff,ccff00,0000cc,ff3300,00ccff,ffcc00,0033ff,ffff33,
3300ff,ffffcc,000066,006600,ff99ff,009900,ff0099,00ff66,ff66ff,660000,99ffff,
66ff00,9900ff,990000,00ff99,ff0066,66ffff,99ff00,000099,ff6600,0099ff,ff9900,
0066ff,ffff66,6600ff,ffff99,003333,330033,ccffcc,333300,ccccff,cc0033,00cccc,
cc3300,33ccff,cccc00,3300cc,ccff33,3333ff,ff3333,33ffcc,33cc00,cc00cc,0033cc,
ffcc33,00cc33,ff33cc,33ff33,cc33ff,ffcccc,003366,663300,99ccff,993300,0099cc,
ff6633,00cc99,ff3366,3399ff,cc6600,33ff99,cc0066,66ccff,336600,ff3399,00cc66,
ff66cc,006633,ff99cc,009933,cc0099,33ff66,cc66ff,339900,cc99ff,660033,99ff33,
6600cc,ccff66,003399,ff9933,0066cc,ffcc66,330066,99ffcc,990033,66ffcc,330099,
99cc00,9933ff,66cc00,ffcc99,3366ff,cc9900,6633ff,66ff33,9900cc,ccff99,333333,
006666,ff6666,006699,ff9966,009966,ff6699,009999,cc3333,33cccc,ff9999,660066,
66ff66,660099,99ff66,990066,66ff99,990099,33cc33,9966ff,999900,6666ff,669900,
9999ff,996600,6699ff,666600,cc33cc,99ff99,3333cc,cccc33,cccccc,333366,336633,
993333,66cccc,cc3366,33cc66,9933cc,66cc33,cc3399,33cc99,cc6633,3366cc,99cc33,
6633cc,cc9933,3399cc,663333,99cccc,cc66cc,339933,cccc66,333399,cc99cc,cccc99,
336666,663366,666633,336699,cc9966,339966,cc6699,339999,cc6666,663399,99cc66,
6666cc,999933,669933,9966cc,6699cc,996633,66cc66,993399,66cc99,993366,9999cc,
99cc99,cc9999,666666,666699,669966,996666,669999,996699,999966,999999`.split(/\s*,\s*/)

/**
 * 多进程日志，使用相同颜色标识相同进程编号
 * @param pid 进程编号
 * @param msg 日志消息
 */
export function plog(pid: number, ...msg: any[]) {
  const ms = []
  ms.push('>')
  if (pid < 10) ms.push('')
  if (pid < 100) ms.push('')
  ms.push(chalk.hex(COLORS[pid % COLORS.length]).bold(`${pid}`))
  ms.push(...msg)
  console.log(...ms)
}

/**
 * 多进程运行
 * @param num 进程编号
 * @param func 子进程函数
 * @return 全部完成后回调
 */
export function prun(num: number, func: ProcessFunc, ...parameter: any[]): Promise<any> {
  const ps = []
  for (let i = 0; i < num; i++) {
    ps.push(func(i, ...parameter))
  }
  return Promise.all(ps)
}

/**
 * 进程函数
 * @param pid 进程编号
 * @param parameter 参数
 */
export interface ProcessFunc {
  (pid: number, ...parameter: any[]): Promise<any>
}
