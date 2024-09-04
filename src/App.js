import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

export default function App() {
  const [quiz, setQuiz] = React.useState(false);
  const [quizKey, setQuizKey] = React.useState(0);

  function startQuiz() {
    setQuiz(true);
  }

  const resetQuiz = () => {
    setQuizKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      {quiz ? (
        <Quiz key={quizKey} resetQuiz={resetQuiz} />
      ) : (
        <Start startQuiz={startQuiz} />
      )}
    </div>
  );
}
