import { useState } from 'react'

function Games({ onBack }) {
  const [selectedGame, setSelectedGame] = useState(null)

  if (selectedGame === 'memory') {
    return <MemoryGame onBack={() => setSelectedGame(null)} onHome={onBack} />
  }

  if (selectedGame === 'simon') {
    return <SimonGame onBack={() => setSelectedGame(null)} onHome={onBack} />
  }

  if (selectedGame === 'reaction') {
    return <ReactionGame onBack={() => setSelectedGame(null)} onHome={onBack} />
  }

  return (
    <div className="test-container">
      <div className="test-header">
        <h2>🎮 Games</h2>
        <button className="back-button" onClick={onBack}>Back to Home</button>
      </div>

      <div className="test-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <button className="test-card" onClick={() => setSelectedGame('memory')}>
          <h2>🧠 Memory Match</h2>
          <p>Match pairs of cards to test your memory</p>
        </button>
        <button className="test-card" onClick={() => setSelectedGame('simon')}>
          <h2>🎵 Pattern Memory</h2>
          <p>Remember and repeat the pattern sequence</p>
        </button>
        <button className="test-card" onClick={() => setSelectedGame('reaction')}>
          <h2>⚡ Reaction Time</h2>
          <p>Test your reflexes and reaction speed</p>
        </button>
      </div>
    </div>
  )
}

function MemoryGame({ onBack, onHome }) {
  const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🥝', '🍑']
  
  const createDeck = () => {
    return [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, matched: false }))
  }

  const [cards, setCards] = useState(createDeck)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const initializeGame = () => {
    setCards(createDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      if (cards[first].symbol === cards[second].symbol) {
        const newMatched = [...matched, first, second]
        setMatched(newMatched)
        setFlipped([])
        if (newMatched.length === cards.length) {
          setGameWon(true)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  return (
    <div className="test-container">
      <div className="test-header">
        <h2>🧠 Memory Match</h2>
        <button className="back-button" onClick={onBack}>Back to Games</button>
      </div>

      <div className="game-container">
        <div className="game-status">
          <div>Moves: {moves}</div>
          <div>Matched: {matched.length / 2} / {cards.length / 2}</div>
        </div>

        {gameWon ? (
          <div className="result-card">
            <h3>🎉 Congratulations!</h3>
            <div className="result-score">{moves}</div>
            <div className="result-message">Moves taken to complete</div>
            <button className="submit-button" onClick={initializeGame}>Play Again</button>
            <button className="next-button" onClick={onHome}>Back to Home</button>
          </div>
        ) : (
          <div className="game-board" style={{ 
            gridTemplateColumns: 'repeat(4, 1fr)',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`game-cell ${
                  flipped.includes(index) || matched.includes(index) ? 'revealed' : ''
                }`}
                onClick={() => handleCardClick(index)}
                style={{ fontSize: '2rem' }}
              >
                {flipped.includes(index) || matched.includes(index) ? card.symbol : '?'}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SimonGame({ onBack, onHome }) {
  const colors = ['red', 'blue', 'green', 'yellow']
  const [sequence, setSequence] = useState([])
  const [playerSequence, setPlayerSequence] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [activeColor, setActiveColor] = useState(null)

  const getRandomColor = () => {
    // eslint-disable-next-line react-hooks/purity
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const startGame = () => {
    const firstColor = getRandomColor()
    const initialSequence = [firstColor]
    setSequence(initialSequence)
    setPlayerSequence([])
    setScore(0)
    setGameOver(false)
    playSequence(initialSequence)
  }

  const playSequence = async (seq) => {
    setIsPlaying(true)
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setActiveColor(seq[i])
      await new Promise(resolve => setTimeout(resolve, 400))
      setActiveColor(null)
    }
    setIsPlaying(false)
  }

  const handleColorClick = (color) => {
    if (isPlaying || gameOver) return

    const newPlayerSequence = [...playerSequence, color]
    setPlayerSequence(newPlayerSequence)

    setActiveColor(color)
    setTimeout(() => setActiveColor(null), 300)

    if (color !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true)
      return
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 1)
      setPlayerSequence([])
      const newColor = getRandomColor()
      const nextSequence = [...sequence, newColor]
      setTimeout(() => {
        setSequence(nextSequence)
        playSequence(nextSequence)
      }, 1000)
    }
  }

  const colorStyles = {
    red: { background: activeColor === 'red' ? '#ff6b6b' : '#c92a2a' },
    blue: { background: activeColor === 'blue' ? '#4dabf7' : '#1971c2' },
    green: { background: activeColor === 'green' ? '#51cf66' : '#2f9e44' },
    yellow: { background: activeColor === 'yellow' ? '#ffd43b' : '#f59f00' }
  }

  return (
    <div className="test-container">
      <div className="test-header">
        <h2>🎵 Pattern Memory</h2>
        <button className="back-button" onClick={onBack}>Back to Games</button>
      </div>

      <div className="game-container">
        <div className="game-status">
          <div>Score: {score}</div>
          <div>Pattern Length: {sequence.length}</div>
        </div>

        {gameOver ? (
          <div className="result-card">
            <h3>Game Over!</h3>
            <div className="result-score">{score}</div>
            <div className="result-message">Patterns completed</div>
            <button className="submit-button" onClick={startGame}>Play Again</button>
            <button className="next-button" onClick={onHome}>Back to Home</button>
          </div>
        ) : sequence.length === 0 ? (
          <div className="result-card">
            <h3>Pattern Memory Game</h3>
            <p>Watch the pattern and repeat it!</p>
            <button className="submit-button" onClick={startGame}>Start Game</button>
          </div>
        ) : (
          <div className="game-board" style={{ 
            gridTemplateColumns: 'repeat(2, 1fr)',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            {colors.map(color => (
              <div
                key={color}
                className="game-cell"
                onClick={() => handleColorClick(color)}
                style={{
                  ...colorStyles[color],
                  cursor: isPlaying ? 'not-allowed' : 'pointer',
                  height: '120px'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ReactionGame({ onBack, onHome }) {
  const [stage, setStage] = useState('waiting') // waiting, ready, go, result
  const [startTime, setStartTime] = useState(null)
  const [reactionTime, setReactionTime] = useState(null)
  const [attempts, setAttempts] = useState([])

  const startTest = () => {
    setStage('ready')
    const delay = Math.random() * 3000 + 2000 // 2-5 seconds
    setTimeout(() => {
      setStage('go')
      setStartTime(Date.now())
    }, delay)
  }

  const handleClick = () => {
    if (stage === 'ready') {
      setStage('waiting')
      alert('Too early! Wait for the green signal.')
    } else if (stage === 'go') {
      const time = Date.now() - startTime
      setReactionTime(time)
      setAttempts([...attempts, time])
      setStage('result')
    }
  }

  const reset = () => {
    setStage('waiting')
    setReactionTime(null)
  }

  const getAverageTime = () => {
    if (attempts.length === 0) return 0
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)
  }

  const stageColors = {
    waiting: '#1a1a1a',
    ready: '#c92a2a',
    go: '#2f9e44',
    result: '#1a1a1a'
  }

  const stageMessages = {
    waiting: 'Click "Start" to begin',
    ready: 'Wait for green...',
    go: 'Click now!',
    result: 'Click "Try Again" for another attempt'
  }

  return (
    <div className="test-container">
      <div className="test-header">
        <h2>⚡ Reaction Time</h2>
        <button className="back-button" onClick={onBack}>Back to Games</button>
      </div>

      <div className="game-container">
        {attempts.length > 0 && (
          <div className="game-status">
            <div>Average: {getAverageTime()}ms</div>
            <div>Attempts: {attempts.length}</div>
          </div>
        )}

        <div
          onClick={handleClick}
          style={{
            background: stageColors[stage],
            border: '2px solid #333',
            borderRadius: '12px',
            padding: '4rem',
            textAlign: 'center',
            cursor: stage === 'go' || stage === 'ready' ? 'pointer' : 'default',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            transition: 'background 0.3s'
          }}
        >
          {stage === 'result' ? (
            <>
              <h3>Reaction Time</h3>
              <div className="result-score">{reactionTime}ms</div>
            </>
          ) : (
            <h3 style={{ fontSize: '1.5rem' }}>{stageMessages[stage]}</h3>
          )}
        </div>

        {stage === 'waiting' ? (
          <button className="submit-button" onClick={startTest}>
            Start Test
          </button>
        ) : stage === 'result' ? (
          <>
            <button className="submit-button" onClick={reset}>
              Try Again
            </button>
            <button className="next-button" onClick={onHome}>
              Back to Home
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Games
