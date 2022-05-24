import React, { useState } from "react";
import './App.css';
import List from './poemList/List.js';
import PoemContainer from './PoemContainer';
import { writePoemToLocalStorage, writeWordToLocalStorage } from "../localStorage_util";

function App() {

  //Uses state to force re-render when a new poem is added. Updates the list of saved poems from 
  //LoacalStorage without having to reload the page
  const [value, setValue] = useState();

  //Writes the poem to LOcalStorage and forces a re-render by updating the state
  function savePoem(poem){
    setValue(poem);
    writePoemToLocalStorage(poem);
  }

  function saveWord(word){
    setValue(word);
    writeWordToLocalStorage(word);
  }
  
  return (
    <div className="App">
      <h1>Hello World</h1>
      <List type="poems"/>
      <List type="words"/>
      <PoemContainer savePoem={savePoem} saveWord={saveWord}/>
    </div>
  );
}

export default App;
