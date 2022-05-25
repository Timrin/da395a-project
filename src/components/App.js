import React from "react";
import './App.css';
import PoemContainer from './PoemContainer';

function App() {

  return (
    <div className="App">
      <div id="menuBar">
        <img className="logo" src="quill.png"></img>
        <h1 className="mobile-show">Dicta</h1>
      </div>
      <div className="header">
        <h1>Dicta</h1>
      </div>
      <PoemContainer/>
    </div>
  );
}

export default App;
