import React from 'react';
import './App.css';
import ExamineList from './ExamineList';
import SinsList from './SinsList';
import Walkthrough from './Walkthrough';

function App() {
  return (
    <div className="App">
      <ExamineList />
      <SinsList />
      <Walkthrough />
    </div>
  );
}

export default App;
