import React from 'react';
import './AnswerFeedback.css';

export default function AnswerFeedback(props) {
  let h2;
  let guessColor;

  if (props.isCorrect) {
    h2 = <h2 className="green">You were correct! :D</h2>;
    guessColor = 'green'
  } else {
    h2 = <h2 className="red">{`Good try, but not quite right :(`}</h2>;
    guessColor = 'red'
  }


  return (
    <div className="feedback">
      <div className="DisplayScore">
        <p>
          Your total score is:{` ${props.nextWord.totalScore}`}
        </p>

        {h2}
      </div>
      <div className="DisplayFeedback">
        <p className="feedback-p">
          {`The correct translation for ${props.currentWord.nextWord} was ${props.answer} and you chose ${props.guess}!`}
        </p>
      </div>
      <button 
        className="learn-guess-submit"
        onClick={props.advance}
      >
        Try another word!
      </button>
    </div>
  )
}