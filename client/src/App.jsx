import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from "./components";
const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen">
    <div className= "bg-slate-500">
      <Navbar />
     
    </div>
   
    
  </div>
  );
}

export default App;
