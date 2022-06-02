import React, { useState } from "react";
import './App.css';
import List from './poemList/List.js';
import PoemContainer from './PoemContainer';
import { writePoemToLocalStorage, writeWordToLocalStorage, deleteFromLocalStorage } from "../localStorage_util";
import { getNewPoem } from "./api_util";
import { Button } from 'react-bootstrap';
import FloatingActionButton from "./FloatingActionButton";

function App() {

  //Uses state to force re-render when a new poem is added. Updates the list of saved poems from 
  //LoacalStorage without having to reload the page
  const [value, setValue] = useState();
  //States from PoemContainer
  const [poem, setPoem] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

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
      <FloatingActionButton/>
      <div className="contentContainer">

        <div id="menuBar">

          <img className="logo" src={'quill.png'} alt="Dicta logo"/>

          <div className="menu-btn">
            <Button className="btn" onClick={() => { getNewPoem(setPoem, setIsLoaded) }}>
              New Poem
            </Button>
            <Button className="btn" onClick={() => { savePoem(poem) }}>
              <span className="material-icons">turned_in</span>
            </Button>
          </div>

          <div className="mobile-show">
            <h1>Dicta</h1>
          </div>

        </div>
        <div id="header">
          <h1>Dicta</h1>
        </div>

        <div className="list-container">
          <div id="poemList">
            <List type="poems" deletePoem={deletePoem} setPoem={setPoem} setIsLoaded={setIsLoaded} />
          </div>
          <div id="wordList">
            <List type="words" deleteWord={deleteWord} />
          </div>
        </div>

        <PoemContainer savePoem={savePoem} saveWord={saveWord} poem={poem} setPoem={setPoem}
          isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      </div>
    </div>
  );
}

export default App;
