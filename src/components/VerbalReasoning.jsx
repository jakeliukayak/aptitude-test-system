import { useState } from 'react'

const questions = [
  {
    id: 1,
    passage: "Climate change is one of the most pressing challenges of our time. Rising global temperatures are causing ice caps to melt, sea levels to rise, and weather patterns to become more extreme. Scientists agree that human activities, particularly the burning of fossil fuels, are the primary cause.",
    question: "According to the passage, what is the primary cause of climate change?",
    options: [
      "Natural weather cycles",
      "Human activities, especially burning fossil fuels",
      "Volcanic eruptions",
      "Solar radiation"
    ],
    correct: 1
  },
  {
    id: 2,
    passage: "The invention of the printing press in the 15th century revolutionized the spread of information. Before this, books were copied by hand, making them rare and expensive. The printing press made books more accessible and affordable, leading to increased literacy rates across Europe.",
    question: "What was the main impact of the printing press?",
    options: [
      "It made paper cheaper",
      "It replaced handwritten letters",
      "It made books more accessible and affordable",
      "It eliminated the need for libraries"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "Choose the word that is most similar in meaning to 'Abundant':",
    options: ["Scarce", "Plentiful", "Minimal", "Restricted"],
    correct: 1
  },
  {
    id: 4,
    question: "Choose the word that is opposite in meaning to 'Transparent':",
    options: ["Clear", "Obvious", "Opaque", "Visible"],
    correct: 2
  },
  {
    id: 5,
    question: "Complete the analogy: Book is to Reading as Fork is to ____",
    options: ["Cooking", "Eating", "Kitchen", "Spoon"],
    correct: 1
  }
]

function VerbalReasoning({ onBack }) {
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
          <h2>📝 Verbal Reasoning</h2>
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
        <h2>📝 Verbal Reasoning</h2>
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
          {question.passage && (
            <div style={{ 
              background: '#222', 
              padding: '1rem', 
              borderRadius: '8px', 
              margin: '1rem 0',
              lineHeight: '1.8'
            }}>
              {question.passage}
            </div>
          )}
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

export default VerbalReasoning
