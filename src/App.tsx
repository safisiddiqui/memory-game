import React from 'react';
import './App.css';
import SingleCard from './components/single-card.component';
import useApp from './useApp';

const App = () => {

  const {
    cards,
    shuffleCards,
    disabled,
    turns,
    choiceOne,
    choiceTwo,
    handleChoice
  } = useApp();

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
      {cards.map(card => (
        <SingleCard 
        key = {card.id} 
        card ={card} 
        handleChoice = {handleChoice}
        flipped ={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
        
      ))}
       </div>
       <p> Turns: {turns}</p>
    </div>
    
  );
}

export default App;
