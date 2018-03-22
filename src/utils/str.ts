/**
 * 是否是中文判断
 * @param str 字符串
 * @param pure 是否纯粹的中文(不包含英文)
 * @return 判断结果
 */
export function chinese(str: string, pure = false): boolean {
  if (/^[\u4e00-\u9fa5\u0000-\u00ff\u3000-\u303F\uFF00-\uFFEF]+$/g.test(str)) {
    return !pure || !(/[a-zA-Z]+/.test(str))
  }
  return false
}
