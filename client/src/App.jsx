import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from "./components";
const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen">
    <Navbar />
    
    
  </div>
  );
}

export default App;
