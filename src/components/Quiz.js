import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
import rBlob from "../images/blob1R.png";
import lBlob from "../images/blob1L.png";

async function fetchWithRetry(url, retries = 3, delay = 2000) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, retries - 1, delay * 2);
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}

export default function Quiz(props) {
  const [questions, setQuestions] = React.useState([]);
  const [checkAnswers, setCheckAnswers] = React.useState(false);
  const [countCorrect, setCountCorrect] = React.useState(0);

  React.useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await fetchWithRetry(
          "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
        );
        if (data.results && Array.isArray(data.results)) {
          const newQuestions = data.results.map((item) => ({
            id: nanoid(),
            question: item.question,
            answers: item.incorrect_answers,
            correctAnswer: item.correct_answer,
          }));
          setQuestions(newQuestions);
        } else {
          throw new Error("Invalid data format: results is not an array.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      }
    }
    loadQuestions();
  }, []);

  function handleCheckAnswers() {
    setCheckAnswers(true);
  }

  function doCount() {
    setCountCorrect((prevValue) => prevValue + 1);
  }

  const questionsArray = questions.map((item) => (
    <Question
      key={item.id}
      id={item.id}
      answers={item.answers}
      correctAnswer={item.correctAnswer}
      question={item.question}
      setCheckAnswers={checkAnswers}
      doCount={doCount}
    />
  ));

  return (
    <div className="container-question">
      <img src={rBlob} className="right-image-quiz" alt="decor" />
      <img src={lBlob} className="left-image-quiz" alt="decor" />
      {questionsArray}
      {countCorrect === 0 && !checkAnswers ? (
        <button onClick={handleCheckAnswers} className="button-check">
          Check Answers
        </button>
      ) : (
        <div className="checked-info">
          <h4 className="score-info">
            You scored {countCorrect}/5 correct answers
          </h4>
          <button className="retry-button" onClick={props.resetQuiz}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
