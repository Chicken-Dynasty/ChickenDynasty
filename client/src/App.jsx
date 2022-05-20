import React,{ useState,useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar} from "./components";
import { TransactionContext } from './context/transactionContext';
import Hatch from './components/Hatch';
const App = () => {

  return (
    <div className="min-h-screen">
    <Navbar />
    <Hatch />
  </div>
  );
}

export default App;
