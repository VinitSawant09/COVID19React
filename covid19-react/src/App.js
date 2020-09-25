import React from 'react';
import './App.css';
import Ticker from "./components/Ticker";
import './css/Ticker.css'
function App() {
  return (
    <div className="App">
      <h1 className="heading"> COVID-19 India Dashboard </h1>
      <Ticker></Ticker>
    </div>
  );
}

export default App;
