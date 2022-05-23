import React,{ useState,useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar} from "./components";
import { TransactionsProvider } from './context/TransactionContext';
import Hatch from './components/Hatch';
import {BrowserRouter as Router,Route,Link, Routes} from "react-router-dom";
import Welcome from './components/Welcome';
import Wheat from './components/Wheat';
import Landing from './components/Landing';
const App = () => {
  return (
    <div className="fill-window">
      <TransactionsProvider >
      <Router>
          <Navbar/>
          <Routes>
            <Route path="/hatch" element={<Hatch />} />
            <Route path="/farm" element={<Welcome />} />
            <Route path="/wheat" element={<Wheat />} />
            <Route path="/" element={<Landing />} />
          </Routes>
      </Router>
      </TransactionsProvider>
    </div>
  );
}

export default App;
