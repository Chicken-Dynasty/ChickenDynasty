import React,{ useState,useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar} from "./components";
import { TransactionContext } from './context/transactionContext';
import Hatch from './components/Hatch';
import {BrowserRouter as Router,Route,Link, Routes} from "react-router-dom";
import Welcome from './components/Welcome';
const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/hatch" element={<Hatch />} />
        <Route path="/home" element={<Welcome />} />
        <Route path="/" element={<Welcome />} />

      </Routes>
    </Router>

  );
}

export default App;
