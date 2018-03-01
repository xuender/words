import { Dict } from './dict';
const pinyin = require("pinyin");

console.log('字典转换')
const dicts: Dict[] = []
const t = ['文字', '我长了']
for (const w of t) {
    const d: Dict = {
        txt: w,
        pinyin: pinyin(w, { heteronym: true, style: pinyin.STYLE_NORMAL }),
    };
    dicts.push(d)
}
console.log(JSON.stringify(dicts))