import { useState, useEffect } from 'react';
import { Card } from './app.types';

const useApp = () => {
    
    const [cards, setcards] = useState<Card[]>([]);
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState<Card | null>(null)
    const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
    const [disabled, setDisabled] = useState(false)
  
    const cardImages: any[] = [
        {"src": '/img/helmet-1.png', matched: false},
        {"src":'/img/potion-1.png', matched: false},
        {"src":'/img/ring-1.png', matched: false},
        {"src":'/img/scroll-1.png', matched: false},
        {"src":'/img/shield-1.png', matched: false},
        {"src":'/img/sword-1.png', matched: false}
    ];

  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards: Card[] = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}));
  
      setChoiceOne(null)
      setChoiceTwo(null)
      setcards(shuffleCards)
      setTurns(0)
  }

      //start a new game automagically
      useEffect(() => {
        shuffleCards();
      // eslint-disable-next-line
      }, [] );
  
    // compare 2 selected card
    useEffect(() => {
      const areBothCardsFlipped = choiceOne && choiceTwo;
      if (areBothCardsFlipped) {
        setDisabled(true);
        const bothCardsMatch = choiceOne.src === choiceTwo.src;
        if (bothCardsMatch) {
  
          const updatedCards = cards.map((card) => (
            card.src === choiceOne.src ?
            {...card, matched: true}
            :
            card
          ));
  
          setcards(updatedCards);
          resetTurn();
        } else {   
         setTimeout(() => resetTurn(), 1000) 
        }
      }
    }, [choiceOne, choiceTwo, cards]);
  
  
    //handle a choice
    const handleChoice = (card: Card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }
  
    //reset choices & increase turn
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    };
  

    return {
        cards,
        shuffleCards,
        disabled,
        turns,
        choiceOne,
        choiceTwo,
        handleChoice
    }
}

export default useApp;