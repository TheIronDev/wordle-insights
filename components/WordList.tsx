import React, {FunctionComponent} from 'react';
import {Word} from './types';
import WordComponent from './Word';

type WordListProps = {
    words: Word[]
};

const WordListComponent: FunctionComponent<WordListProps> = ({words}) => (
  <ul>
    {words.map((word: Word) => <WordComponent key={word.id} word={word}/> )}
  </ul>
);

export default WordListComponent;
