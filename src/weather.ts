import got from 'got'
import chalk from 'chalk'

async function main() {
  const r = await got('https://www.sojson.com/open/api/weather/json.shtml?city=%E5%A8%81%E6%B5%B7', { json: true })
  print(r.body)
}

function print(w: any) {
  console.log(chalk.bold.red(w.city), chalk.green(time(w.date)))
  const d = w.data
  console.log('温度', chalk.bold.red(d.wendu))
  console.log('湿度', chalk.bold.green(d.shidu))
  console.log(chalk.bold.green(d.quality))
  console.log(chalk.bold.green(d.ganmao))
  const f = d.forecast[0]
  console.log(chalk.yellow(f.low), '-', chalk.yellow(f.high))
  console.log(chalk.blue(f.type), chalk.blue(f.fx), chalk.blue(f.fl), chalk.blue(f.notice))
}

function time(s: string) {
  return `${s.substr(0, 4)}年 ${s.substr(4, 2)}月 ${s.substr(6)}日`
}

main()
