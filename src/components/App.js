import React, { useState } from "react";
import './App.css';
import Word from './Word.js';
import PoemContainer from './PoemContainer';

function App() {

  const [word, setWord] = useState();
  const [modalActive, setModalActive] = useState(false);

  const onWordClick = (word) => {
    //TODO: strip punctuation from word
    word = word.trim();
    setWord(word);
    setModalActive(true);
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Word word={word} setModalActive={setModalActive} modalActive={modalActive} ></Word>
      <PoemContainer onWordClick={onWordClick}/>
    </div>
  );
}

export default App;
