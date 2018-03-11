import { consent } from '../../src/corpus'
describe('corpus 语料库', () => {
  it('同义词 consent', () => {
    expect(consent('美丽')).toEqual(jasmine.arrayContaining(['漂亮', '好看']))
  })
})
