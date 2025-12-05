import { useState } from 'react'

const questions = [
  {
    id: 1,
    question: "If a company's revenue was $500,000 in 2022 and increased by 20% in 2023, what was the revenue in 2023?",
    options: ["$550,000", "$600,000", "$620,000", "$650,000"],
    correct: 1
  },
  {
    id: 2,
    question: "A product costs $80 after a 20% discount. What was the original price?",
    options: ["$96", "$100", "$104", "$120"],
    correct: 1
  },
  {
    id: 3,
    question: "If 15 workers can complete a job in 12 days, how many days will it take 20 workers to complete the same job?",
    options: ["8 days", "9 days", "10 days", "16 days"],
    correct: 1
  },
  {
    id: 4,
    question: "A train travels 240 km in 3 hours. What is its average speed in km/h?",
    options: ["70 km/h", "75 km/h", "80 km/h", "85 km/h"],
    correct: 2
  },
  {
    id: 5,
    question: "If the ratio of apples to oranges is 3:5 and there are 24 apples, how many oranges are there?",
    options: ["30", "35", "40", "45"],
    correct: 2
  }
]

function NumericalReasoning({ onBack }) {
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
          <h2>📊 Numerical Reasoning</h2>
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
        <h2>📊 Numerical Reasoning</h2>
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

export default NumericalReasoning
