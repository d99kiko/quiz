import React from "react";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [answers, setAnswers] = React.useState([]);
  const [buttonClasses, setButtonClasses] = React.useState([]);

  React.useEffect(() => {
    const allAnswers = [...props.answers, props.correctAnswer];
    allAnswers.sort(() => Math.random() - 0.5);
    setAnswers(allAnswers);
  }, []);

  function decodeHTMLEntities(text) {
    const parser = new DOMParser().parseFromString(text, "text/html");
    return parser.documentElement.textContent;
  }

  function handleClick(answer) {
    setSelectedAnswer(answer);
  }

  React.useEffect(() => {
    const updatedClasses = answers.map((answer) => {
      if (answer === props.correctAnswer) {
        if (answer === selectedAnswer) {
          props.doCount();
        }
        return "correct";
      } else if (answer === selectedAnswer) {
        return "incorrect";
      } else {
        return "unchecked";
      }
    });

    setButtonClasses(updatedClasses);
  }, [props.setCheckAnswers]);

  React.useEffect(() => {
    const updatedClasses = answers.map((answer) => {
      if (answer === selectedAnswer) {
        return "selected";
      }
    });
    setButtonClasses(updatedClasses);
  }, [selectedAnswer]);

  return (
    <div className="quiz-question">
      <h3 className="quiz-question-text">
        {decodeHTMLEntities(props.question)}
      </h3>
      <div className="answers-container">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${buttonClasses[index]}`}
            onClick={() => handleClick(answer)}
            disabled={props.checkAnswers}
          >
            {decodeHTMLEntities(answer)}
          </button>
        ))}
      </div>
      <div className="line-under-question"></div>
    </div>
  );
}
