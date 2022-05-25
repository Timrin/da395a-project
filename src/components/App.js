import React, { useState } from "react";
import './App.css';
import List from './poemList/List.js';
import PoemContainer from './PoemContainer';
import { writePoemToLocalStorage, writeWordToLocalStorage, deleteFromLocalStorage } from "../localStorage_util";

function App() {

  //Uses state to force re-render when a new poem is added. Updates the list of saved poems from 
  //LoacalStorage without having to reload the page
  const [value, setValue] = useState();

  //Writes the poem to LOcalStorage and forces a re-render by updating the state
  function savePoem(poem){
    setValue(value+1);
    writePoemToLocalStorage(poem);
  }

  function saveWord(word){
    setValue(value+1);
    writeWordToLocalStorage(word);
  }

  function deletePoem(id){
    setValue(value+1);
    deleteFromLocalStorage('poems', id);
  }

  function deleteWord(id){
    setValue(value+1);
    deleteFromLocalStorage('words', id);
  }
  
  return (
    <div className="App">
      <h1>Hello World</h1>
      <List type="poems" deletePoem={deletePoem}/>
      <List type="words" deleteWord={deleteWord}/>
      <PoemContainer savePoem={savePoem} saveWord={saveWord}/>
    </div>
  );
}

export default App;
