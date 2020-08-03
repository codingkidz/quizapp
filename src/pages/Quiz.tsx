import React, { useEffect } from "react";

import {useParams, Link} from 'react-router-dom'

import { fetchQuestionsByUnit } from "services/api";

import { Question } from "models/Question";
import { LivesContainer } from "components/LivesContainer";
import { MultipleChoice } from "components/MultipleChoice";

export const Quiz: React.FC = () => {
  const { unit } = useParams();
  const [questions, setQuestions] = React.useState<Question[]>();
  const [currentQuestionIndex, setQuestionIndex] = React.useState<number>(0);
  const [lives, setLives] = React.useState(3);

  useEffect(() => {
    if (!unit) {
      throw new Error("Quiz Requires a unit!")
    }

    fetchQuestionsByUnit(unit).then((questions) => {
      setQuestions(questions);
    });
  }, [unit]);

  const handleResult = (result: boolean) => {
    // if the user gets it wrong, take a life
    if (!result) {
      setLives(lives - 1);
    }

    // continue in any case
    setQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestion = () => {
    return questions && currentQuestionIndex < questions.length ? (
      <MultipleChoice
        key={questions[currentQuestionIndex].id}
        question={questions[currentQuestionIndex]}
        handleResult={handleResult}
      />
    ) : (
      quizEnded(true)
    );
  };

  const quizEnded = (passed: boolean) => {
    return (
      <>
        {passed ? (
          <h2>Good job you passed the quiz!</h2>
        ) : (
          <h2>You're out of lives</h2>
        )}

        <button onClick={resetQuiz}>Restart Quiz</button>
        <Link to="/units">Return to Unit List</Link>
      </>
    );
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setLives(3);
  };

  return lives >= 1 ? (
    <>
      <LivesContainer lives={lives} />
      {questions ? renderQuestion() : <p>Loading Questions...</p>}
    </>
  ) : (
    quizEnded(false)
  );
};