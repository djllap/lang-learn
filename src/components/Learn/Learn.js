import React, { useState, useEffect, useContext } from 'react';
import AnswerSubmit from '../AnswerSubmit/AnswerSubmit';
import AnswerFeedback from '../AnswerFeedback/AnswerFeedback';
import LanguageContext from '../../contexts/LanguageContext';
import tokenService from '../../services/token-service'
import config from '../../config'

export default function Learn(props) {
  const languageContext = useContext(LanguageContext);
  const { language, setLanguage, setWords } = languageContext;
  
  const [currentWord, setCurrentWord] = useState({});
  const [nextWord, setNextWord] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [answer, setAnswer] = useState('');
  const [guess, setGuess] = useState('');

  const getNextWord = () => {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenService.getAuthToken()}`,
      }
    })
    .then(res => res.json())
    .then(word => {
      setCurrentWord(word);
    }) 
  }

  const advance = () => {
    setAnswer('');
    setCurrentWord(nextWord);
    setNextWord({nextWord: ''});
    setIsCorrect(null);
    setGuess('');
  }

  const submitGuess = (guess) => {
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getAuthToken()}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        guess: guess
      })
    })
    .then(res => res.json())
    .then(json => {
      const {
        nextWord,
        totalScore,
        wordCorrectCount,
        wordIncorrectCount,
        answer,
        isCorrect
      } = json;
      const word = {
        nextWord,
        totalScore,
        wordCorrectCount,
        wordIncorrectCount,
      };
      
      setIsCorrect(isCorrect);
      setAnswer(answer);
      setNextWord(word);
    })
  }

  useEffect(() => { // sets language context if it hasn't been already
    if (!language || !language.name) {
      fetch(`${config.API_ENDPOINT}/language`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenService.getAuthToken()}`,
        }
      })
      .then(res => res.json())
      .then(data => {
        setLanguage(data.language);
        setWords(data.words);
      });
    }
  }, [language])

  useEffect(() => { // gets next word on mount
      getNextWord();
  }, [])
  
  return (
    <div className="learn-container">
      {
        (answer) ?
          <AnswerFeedback
            currentWord={currentWord}
            isCorrect={isCorrect}
            answer={answer}
            guess={guess}
            nextWord={nextWord}
            advance={advance}
          />
          :
          <AnswerSubmit 
            currentWord={currentWord}
            submitGuess={submitGuess}
            guess={guess}
            setGuess={setGuess}
          />
          
      }
    </div>
  )
}