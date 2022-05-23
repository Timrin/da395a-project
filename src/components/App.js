import React from "react";
import './App.css';
import PoemList from './poemList/PoemList';
import {readPoemsFromLocalStorage} from '../localStorage_util.js'
import PoemContainer from './PoemContainer';
function App() {

  return (
    <div className="App">
      <h1>Hello World</h1>
      <PoemList readPoems={readPoemsFromLocalStorage}/>
      <PoemContainer/>
    </div>
  );
}

export default App;
