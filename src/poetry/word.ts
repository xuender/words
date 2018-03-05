import { Rhyme } from './rhyme'

/**
 * 字
 */
export interface Word {
  /**
   * 字
   */
  w: string
  /**
   * 拼音
   */
  py: string[]
  /**
   * 韵
   */
  rhyme: Rhyme[]
}
