/**
 * 韵律
 */
export interface Rhyme {
    /**
     * 拼音
     */
    py: string
    /**
     * 中华新韵
     */
    r: string
    /**
     * 音调
     */
    t: string
}

/**
 * 比较韵律
 * @param a
 * @param b 
 * @return 韵律是否相同
 */
export function equal(a: Rhyme, b: Rhyme): boolean {
    return a.r === b.r && a.t[1] === b.t[1]
}

/**
 * 比较两组韵律是否有相同
 * @param as 
 * @param bs 
 * @return 有相同
 */
export function matches(as: Rhyme[], bs: Rhyme[]): boolean {
    for (const a of as) {
        for (const b of bs) {
            if (equal(a, b)) return true
        }
    }
    return false;
}