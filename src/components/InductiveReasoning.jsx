import { useState } from 'react'

const questions = [
  {
    id: 1,
    question: "What comes next in the sequence?",
    sequence: ["2", "4", "8", "16", "?"],
    options: ["24", "28", "32", "36"],
    correct: 2
  },
  {
    id: 2,
    question: "What comes next in the pattern?",
    sequence: ["A", "C", "E", "G", "?"],
    options: ["H", "I", "J", "K"],
    correct: 1
  },
  {
    id: 3,
    question: "Complete the sequence:",
    sequence: ["1", "1", "2", "3", "5", "8", "?"],
    options: ["11", "12", "13", "14"],
    correct: 2
  },
  {
    id: 4,
    question: "What's the missing number?",
    sequence: ["100", "90", "81", "73", "?"],
    options: ["64", "65", "66", "67"],
    correct: 2
  },
  {
    id: 5,
    question: "Find the next shape pattern:",
    sequence: ["●", "●●", "●●●", "●●●●", "?"],
    options: ["●●●●", "●●●●●", "●●●●●●", "●●"],
    correct: 1
  }
]

function InductiveReasoning({ onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (index) => {
    if (!answered) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setAnswered(true)
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 1)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswered(false)
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="test-container">
        <div className="test-header">
          <h2>🔍 Inductive Reasoning</h2>
          <button className="back-button" onClick={onBack}>Back to Home</button>
        </div>
        <div className="result-card">
          <h3>Test Complete!</h3>
          <div className="result-score">{percentage}%</div>
          <div className="result-message">
            You got {score} out of {questions.length} questions correct
          </div>
          <button className="submit-button" onClick={handleRestart}>Try Again</button>
          <button className="next-button" onClick={onBack}>Back to Home</button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="test-container">
      <div className="test-header">
        <h2>🔍 Inductive Reasoning</h2>
        <button className="back-button" onClick={onBack}>Back to Home</button>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="question-card">
        <div className="question-text">
          <strong>Question {currentQuestion + 1} of {questions.length}</strong>
          <p>{question.question}</p>
        </div>
        
        <div className="pattern-grid">
          {question.sequence.map((item, index) => (
            <div key={index} className="pattern-item">
              {item}
            </div>
          ))}
        </div>

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                answered && index === question.correct ? 'correct' : ''
              } ${
                answered && selectedAnswer === index && index !== question.correct ? 'incorrect' : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>

        {!answered ? (
          <button 
            className="submit-button" 
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </button>
        ) : (
          <button className="next-button" onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Show Results'}
          </button>
        )}
      </div>
    </div>
  )
}

export default InductiveReasoning
