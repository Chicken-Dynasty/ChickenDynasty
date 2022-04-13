import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from './components';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Button
      </button>
      <Navbar/>

      
    </div>
  );
}

export default App;
