import * as readlineSync from 'readline-sync'
import chalk from 'chalk'
import { similar } from './corpus'
import { cut, tag, extract, cutAll, cutHMM, cutForSearch, cutSmall } from 'nodejieba'

function exit() {
  console.log('退出')
  process.exit(0);
}

function init() {
  process.title = 'words-cli'
  process.on('SIGINT', exit);
}

// 分词
function cutWord() {
  const s = readlineSync.question('请输入一个句子,对其进行分词: ')
  while (1) {
    console.log(chalk.green.bold(s))
    const i = readlineSync.keyInSelect([
      '分词 cut',
      '词性 tag',
      '关键词 extract',
      '所有词 cutAll',
      '智能 cutHMM',
      '搜索 cutForSearch',
      '词宽度 cutSmall'
    ], '选择分词方式: ')
    switch (i) {
      case 0:
        console.log(cut(s))
        break;
      case 1:
        console.log(tag(s))
        break;
      case 2: // 诗词分词使用
        console.log(extract(s, readlineSync.questionInt('关键词数量: ')))
        break;
      case 3:
        console.log(cutAll(s))
        break;
      case 4: // 建立语料库使用
        console.log(cutHMM(s))
        break;
      case 5:
        console.log(cutForSearch(s))
        break;
      case 6:
        console.log(cutSmall(s, readlineSync.questionInt('词长度: ')))
        break;
      default:
        return
    }
  }
}

async function main() {
  init()
  while (1) {
    const index = readlineSync.keyInSelect(['分词', '近义词', '填词'], '选择工作: ')
    switch (index) {
      case 0:
        cutWord()
        break
      case 1:
        const word = readlineSync.question('请输入一个词,查找其近义词: ')
        const ws = await similar(word)
        console.log(ws)
        break
      case 2: // 填词
        break
      default:
        return
    }
  }
}

main().then(exit);
