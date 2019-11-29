import React from 'react';
import './App.css';
import ExamineList from './ExamineList';
import SinsList from './SinsList';
import Walkthrough from './Walkthrough';
import sinsdb from './data/sinsdb_en';

function App() {

  return (
    <div className="App">
      <ExamineList sinsdb={sinsdb} />
      <SinsList />
      <Walkthrough />
    </div>
  );
}

export default App;
