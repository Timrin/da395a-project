import React, { useState } from "react";
import './App.css';
import List from './poemList/List.js';
import PoemContainer from './PoemContainer';
import { writePoemToLocalStorage, writeWordToLocalStorage, deleteFromLocalStorage } from "../localStorage_util";
import Dropdown from 'react-bootstrap/Dropdown';

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
      <div id="menuBar">
        
        <img className="logo" src={'quill.png'} />

        <div className="mobile-show">
        <a id="title" href="#top"><h1>Dicta</h1></a>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-list">
                Saved
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#poemList">Saved Poems</Dropdown.Item>
              <Dropdown.Item href="#wordList">Saved Words</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      
      </div>
      <div id="header">
        <h1>Dicta</h1>
      </div>
      <div id="poemList">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <List type="poems" deletePoem={deletePoem} setPoem={setPoem} setIsLoaded={setIsLoaded} />
      </div>
      <div id="wordList">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <List type="words" deleteWord={deleteWord} />
      </div>
      <PoemContainer savePoem={savePoem} saveWord={saveWord} poem={poem} setPoem={setPoem}
       isLoaded={isLoaded} setIsLoaded={setIsLoaded}/>
    </div>
  );
}

export default App;
