import { useState } from 'react'

const questions = [
  {
    id: 1,
    premises: [
      "All birds have feathers.",
      "A robin is a bird."
    ],
    question: "What can we conclude?",
    options: [
      "Some birds don't have feathers",
      "A robin has feathers",
      "All feathered animals are birds",
      "Robins can fly"
    ],
    correct: 1
  },
  {
    id: 2,
    premises: [
      "If it rains, the ground gets wet.",
      "The ground is wet."
    ],
    question: "What can we conclude?",
    options: [
      "It must have rained",
      "It might have rained, or something else made it wet",
      "It will rain tomorrow",
      "The ground is always wet"
    ],
    correct: 1
  },
  {
    id: 3,
    premises: [
      "All mammals are warm-blooded.",
      "All whales are mammals."
    ],
    question: "What can we logically conclude?",
    options: [
      "All warm-blooded animals are mammals",
      "Whales live in water",
      "All whales are warm-blooded",
      "Some mammals are not warm-blooded"
    ],
    correct: 2
  },
  {
    id: 4,
    premises: [
      "If John studies hard, he will pass the exam.",
      "John passed the exam."
    ],
    question: "What can we conclude?",
    options: [
      "John definitely studied hard",
      "John might have studied hard",
      "John will pass all future exams",
      "The exam was easy"
    ],
    correct: 1
  },
  {
    id: 5,
    premises: [
      "No cats are dogs.",
      "All poodles are dogs."
    ],
    question: "What must be true?",
    options: [
      "Some cats are poodles",
      "All dogs are poodles",
      "No poodles are cats",
      "Cats and dogs are enemies"
    ],
    correct: 2
  }
]

function DeductiveReasoning({ onBack }) {
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
          <h2>🧩 Deductive Reasoning</h2>
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
        <h2>🧩 Deductive Reasoning</h2>
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
          <div style={{ 
            background: '#222', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            margin: '1rem 0'
          }}>
            <strong>Given:</strong>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              {question.premises.map((premise, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{premise}</li>
              ))}
            </ul>
          </div>
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

export default DeductiveReasoning
