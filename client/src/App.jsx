import { useState,useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from "./components";
import { TrasactionContext } from './context/transactionContext';
const App = () => {
  const [count, setCount] = useState(0);
  const { connectWallet} = useContext(TrasactionContext);

  return (
    <div className="min-h-screen">
    <Navbar />
    
  </div>
  );
}

export default App;
