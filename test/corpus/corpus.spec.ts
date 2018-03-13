import { similar, analogy } from '../../src/corpus'

describe('corpus 语料库', () => {
  it('同义词 similar', () => {
    similar('美丽').then(a => {
      console.log('a', a)
      expect(a).toEqual(jasmine.arrayContaining(['漂亮', '好看']))
    })
  })

  it('推测 analogy', () => {
    analogy(['女性', '丈夫'], ['男性']).then(a => {
      console.log('a', a)
      expect(a).toEqual(jasmine.arrayContaining(['妻子']))
    })
  })
})
