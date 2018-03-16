import { cutHMM } from 'nodejieba'
/**
 * 分词
 * @param str 句子
 * @param split 分隔符
 * @return 分词结果
 */
export function cut(str: string, split = 'x'): string[][] {
  const lines = str.split(/[\n\r．，,！]+/)
  const ret = []
  for (const l of lines) {
    const r = []
    for (const c of cutHMM(l.replace(new RegExp(split, 'gm'), ''))) {
      r.push(c)
    }
    ret.push(r)
  }
  return ret
}

/**
 * 字符串包含
 */
export function contain(str: string, split = 'x'): boolean {
  return str.toLowerCase().includes(split.toLowerCase())
}

function test() {
  console.log(cut('妈妈妻子，爸爸xx'))
}
test()
