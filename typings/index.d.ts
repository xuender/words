// Type definitions for node_modules/nodejieba/index.js
// Project: [LIBRARY_URL_HERE]
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 *
 */
declare namespace nodejieba {

  /**
   *
   */
  export var DEFAULT_DICT: string;

  /**
   *
   */
  export var DEFAULT_HMM_DICT: string;

  /**
   *
   */
  export var DEFAULT_USER_DICT: string;

  /**
   *
   */
  export var DEFAULT_IDF_DICT: string;

  /**
   *
   */
  export var DEFAULT_STOP_WORD_DICT: string;

  /**
   *
   */
  export var load: /* someFunct */ any;
}

/**
 *
 */
export declare var isDictLoaded: boolean;

/**
 *
 * @param dictJson
 */
declare function someFunct(dictJson: {} | string): void;

/**
 *
 * @param obj
 * @param functName
 */
declare function wrapWithDictLoad(obj: /* nodejieba */ any, functName: string): void;

/**
 *
 */
export declare var dict: string;

/**
 *
 */
export declare var hmmDict: string;

/**
 *
 */
export declare var userDict: string;

/**
 *
 */
export declare var idfDict: string;

/**
 *
 */
export declare var stopWordDict: string;
declare function cut(dictJson: {} | string): any;
declare function tag(dictJson: {} | string): any;
declare function extract(dictJson: {} | string, p: number): any;
declare function cutAll(dictJson: {} | string): any;
declare function cutHMM(dictJson: {} | string): any;
declare function cutForSearch(dictJson: {} | string): any;
declare function cutSmall(dictJson: {} | string, p: number): any;
