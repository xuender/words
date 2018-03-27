import { Word2Vec } from 'node-word2vec'
const w2v = new Word2Vec(__dirname + '/../../data/corpus.bin')

function getVector(word: string): Promise<any> {
  return new Promise<any>(resolve => {
    w2v.getVector(word, resolve)
  })
}

function getSimilarWordList(v: any, count = 10): Promise<any> {
  return new Promise<any>(resolve => {
    w2v.getSimilarWordList(v, count, resolve)
  })
}

async function main() {
  console.log('开始')
  const a1 = await getVector('美丽')
  const s = await getSimilarWordList(a1, 10)
  console.log('s', s)

  const aa = await getVector('女人')
  const ab = await getVector('丈夫')
  const ba = await getVector('男人')
  const vv = aa.add(ba.reverse()).add(ab)
  const ss = await getSimilarWordList(vv, 10)
  console.log('ss', ss)
  process.exit()
}

main()
