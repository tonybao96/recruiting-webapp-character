import { useState } from 'react';
import CharacterSheet from './CharacterSheet.js';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section" name="Attributes">
        <div>
          <CharacterSheet></CharacterSheet>
        </div>
      </section>
    </div>
  );
}

export default App;
