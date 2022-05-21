import React,{ useState,useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar} from "./components";
import { TransactionsProvider } from './context/transactionContext';
import Hatch from './components/Hatch';
import {BrowserRouter as Router,Route,Link, Routes} from "react-router-dom";
import Welcome from './components/Welcome';
import Wheat from './components/Wheat';
const App = () => {

  return (
    <TransactionsProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/hatch" element={<Hatch />} />
        <Route path="/home" element={<Welcome />} />
        <Route path="/wheat" element={<Wheat />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
      
    </TransactionsProvider>
  );
}

export default App;
