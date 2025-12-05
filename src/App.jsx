import { useState } from 'react'
import './App.css'
import NumericalReasoning from './components/NumericalReasoning'
import InductiveReasoning from './components/InductiveReasoning'
import VerbalReasoning from './components/VerbalReasoning'
import DeductiveReasoning from './components/DeductiveReasoning'
import Games from './components/Games'

function App() {
  const [selectedTest, setSelectedTest] = useState('home')

  const renderTest = () => {
    switch (selectedTest) {
      case 'numerical':
        return <NumericalReasoning onBack={() => setSelectedTest('home')} />
      case 'inductive':
        return <InductiveReasoning onBack={() => setSelectedTest('home')} />
      case 'verbal':
        return <VerbalReasoning onBack={() => setSelectedTest('home')} />
      case 'deductive':
        return <DeductiveReasoning onBack={() => setSelectedTest('home')} />
      case 'games':
        return <Games onBack={() => setSelectedTest('home')} />
      default:
        return (
          <div className="home-container">
            <h1>MT2.0 Aptitude Test System</h1>
            <p className="subtitle">Developed and maintained by MT2.0 CTO Lando D.</p>
            <div className="test-grid">
              <button className="test-card" onClick={() => setSelectedTest('numerical')}>
                <h2>📊 Numerical Reasoning</h2>
                <p>Test your mathematical and data interpretation skills</p>
              </button>
              <button className="test-card" onClick={() => setSelectedTest('inductive')}>
                <h2>🔍 Inductive Reasoning</h2>
                <p>Identify patterns and logical sequences</p>
              </button>
              <button className="test-card" onClick={() => setSelectedTest('verbal')}>
                <h2>📝 Verbal Reasoning</h2>
                <p>Assess your comprehension and language skills</p>
              </button>
              <button className="test-card" onClick={() => setSelectedTest('deductive')}>
                <h2>🧩 Deductive Reasoning</h2>
                <p>Apply logical rules to reach conclusions</p>
              </button>
              <button className="test-card" onClick={() => setSelectedTest('games')}>
                <h2>🎮 Games</h2>
                <p>Fun cognitive challenges and puzzles</p>
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="app">
      {renderTest()}
    </div>
  )
}

export default App
