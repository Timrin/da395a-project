import './App.css';
import PoemList from './poemList/PoemList';
import {readPoemsFromLocalStorage} from '../localStorage_util.js'

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <PoemList readPoems={readPoemsFromLocalStorage}/>
    </div>
  );
}

export default App;
