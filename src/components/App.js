import './App.css';
import { getPoem } from '../localStorage_util';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={() => getPoem()}>Poem!</button>
    </div>
  );
}

export default App;
