import { Poetry } from '../../src/index'
describe('诗', () => {
    const txt = ` 窗前明月光，\n疑是地上霜。\n举头望明月，\n低头思故乡。`
    const p = new Poetry(txt)
    // console.log(JSON.stringify(p, null, 2))
    it('内容为空', () => {
        expect(() => { new Poetry('') }).toThrowError('内容为空')
        expect(() => { new Poetry('  ') }).toThrowError('内容为空')
    })
    it('句子 sentence', () => {
        expect(p.sentences.length).toBe(4)
        expect(p.sentences[0].words.length).toBe(5)
    })
    it('押韵', () => {
        //  1,3句押韵
        expect(p.sentences[1].rhyme).toBe(1)
        expect(p.sentences[3].rhyme).toBe(1)
    })
})