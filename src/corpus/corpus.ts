import { Word2Vec } from 'node-word2vec'

export class Corpus {
  private model: Word2Vec;

  constructor(modelFile = '../../data/corpus.model') {
    this.model = new Word2Vec(modelFile)
  }
}
