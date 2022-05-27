import React, { useState } from "react";
import './App.css';
import List from './poemList/List.js';
import PoemContainer from './PoemContainer';
import { writePoemToLocalStorage, writeWordToLocalStorage, deleteFromLocalStorage } from "../localStorage_util";

function App() {

  //Uses state to force re-render when a new poem is added. Updates the list of saved poems from 
  //LoacalStorage without having to reload the page
  const [value, setValue] = useState();
  //States from PoemContainer
  const [poem, setPoem] = useState();
  const [currentWord, setCurrentWord] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [definition, setDefinition] = useState({
    status: false,
    word: "",
    phonetic: "",
    meanings: []
});

  //Writes the poem to LOcalStorage and forces a re-render by updating the state
  function savePoem(poem) {
    writePoemToLocalStorage(poem);
    setValue(poem);
  }

  function saveWord(word) {
    writeWordToLocalStorage(word);
    setValue(word);
  }

  function deletePoem(id) {
    setValue(id);
    deleteFromLocalStorage('poems', id);
  }

  function deleteWord(id) {
    setValue(id);
    deleteFromLocalStorage('words', id);
  }

  return (
    <div className="App">
      <div id="menuBar">
        <img className="logo" src="quill.png"></img>
        <h1 className="mobile-show">Dicta</h1>
      </div>
      <div id="header">
        <h1>Dicta</h1>
      </div>
      <div id="savedLists">
        <List type="poems" deletePoem={deletePoem} setPoem={setPoem} setIsLoaded={setIsLoaded} />
        <List type="words" deleteWord={deleteWord} />
      </div>
      <PoemContainer savePoem={savePoem} saveWord={saveWord} poem={poem} setPoem={setPoem}
        currentWord={currentWord} setCurrentWord={setCurrentWord} isLoaded={isLoaded}
        setIsLoaded={setIsLoaded} definition={definition} setDefinition={setDefinition}/>
    </div>
  );
}

export default App;
