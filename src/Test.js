import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "./index";

const answerKey = {
  a1: "answer1",
  a2: "answer2",
  a3: "answer3",
  a4: "answer4",
};

export const Test = () => {
  const { testId } = useParams();
  const [testName, setTestName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [result, setResult] = useState(null);
  useEffect(() => {
    const test = db.collection("tests").doc(testId);
    test.get().then((doc) => {
      setTestName(doc.data().name);
    });
    test
      .collection("questions")
      .get()
      .then((querySnapshot) => {
        let tempQuestions = [];
        querySnapshot.forEach((doc) => {
          tempQuestions.push({ ...doc.data(), id: doc.id });
        });
        setQuestions(tempQuestions);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [testId]);
  const currentQuestionData =
    questions.length > 0
      ? questions[currentQuestion]
      : {
          image: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctAnswer: "",
        };
  const questionImg = currentQuestionData.image;
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAnswerKey = answerKey[selected];
    const selectedAnswerText = currentQuestionData[selectedAnswerKey];
    if (selectedAnswerText === currentQuestionData.correctAnswer) {
      setResult("correct");
    } else {
      setResult("incorrect");
      setIncorrectQuestions([...incorrectQuestions, currentQuestionData]);
    }
  };
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelected("");
    setResult(null);
  };
  const reachedEnd = currentQuestion === questions.length - 1;
  const neededToPass = Math.round(questions.length * 0.8);
  const numberCorrect = questions.length - incorrectQuestions.length;
  const passed = numberCorrect >= neededToPass;
  return (
    <div className="test-container">
      <Link to="/">go back to tests</Link>
      <h1>{testName}</h1>
      <div>{`question ${currentQuestion + 1} of ${questions.length}`}</div>
      <div>{`${incorrectQuestions.length} wrong so far`}</div>
      {!reachedEnd && (
        <div>
          <h3>{currentQuestionData.question}</h3>
          {questionImg && <img src={questionImg} alt="" />}
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <label>
                  <input
                    type="radio"
                    value="a1"
                    name="a1"
                    checked={selected === "a1"}
                    onChange={() => setSelected("a1")}
                  />
                  {currentQuestionData.answer1}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    value="a2"
                    name="a2"
                    checked={selected === "a2"}
                    onChange={() => setSelected("a2")}
                  />
                  {currentQuestionData.answer2}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    value="a3"
                    name="a3"
                    checked={selected === "a3"}
                    onChange={() => setSelected("a3")}
                  />
                  {currentQuestionData.answer3}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    value="a4"
                    name="a4"
                    checked={selected === "a4"}
                    onChange={() => setSelected("a4")}
                  />
                  {currentQuestionData.answer4}
                </label>
              </li>
            </ul>
            {!result && <button type="submit">submit</button>}
            {result && <h4>{result}</h4>}
            {result === "incorrect" && (
              <div>{`the correct answer was: ${currentQuestionData.correctAnswer}`}</div>
            )}
            {result && (
              <button type="button" onClick={handleNextQuestion}>
                next question
              </button>
            )}
          </form>
        </div>
      )}
      {reachedEnd && (
        <div>
          <h4>here's how you did bud...</h4>
          <div>{`correct answers needed to pass: ${neededToPass}`}</div>
          <div>{`you answered: ${numberCorrect} correctly`}</div>
          <div>{`${(numberCorrect / questions.length) * 100}%`}</div>
          <h3>{passed ? `you passed!` : `you failed`}</h3>
        </div>
      )}
    </div>
  );
};
