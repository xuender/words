console.log('test')
const pinyin = require("pinyin");
console.log(pinyin("中心"));
console.log('2', pinyin("中心", {
    style: pinyin.STYLE_INITIALS,
    heteronym: true
}));
