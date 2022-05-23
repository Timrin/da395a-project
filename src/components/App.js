import React from "react";
import './App.css';
import List from './poemList/List.js';
import PoemContainer from './PoemContainer';
function App() {

  return (
    <div className="App">
      <h1>Hello World</h1>
      <List type="poem"/>
      <PoemContainer/>
    </div>
  );
}

export default App;
