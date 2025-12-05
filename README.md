# MT2.0 Aptitude Test System

A comprehensive aptitude test platform built with ReactJS, covering Numerical Reasoning, Inductive Reasoning, Verbal Reasoning, Deductive Reasoning, and interactive cognitive Games.

## Features

### Test Types

1. **📊 Numerical Reasoning**
   - Mathematical problem solving
   - Data interpretation
   - Percentage calculations
   - Ratio and proportion
   - Speed, distance, and time problems

2. **🔍 Inductive Reasoning**
   - Pattern recognition
   - Sequence completion
   - Visual pattern analysis
   - Logical progression identification

3. **📝 Verbal Reasoning**
   - Reading comprehension
   - Vocabulary (synonyms/antonyms)
   - Analogies
   - Passage analysis

4. **🧩 Deductive Reasoning**
   - Logical deduction from premises
   - Syllogistic reasoning
   - If-then logic
   - Categorical reasoning

5. **🎮 Games**
   - **Memory Match**: Test your visual memory by matching pairs
   - **Pattern Memory**: Simon-style sequence memorization game
   - **Reaction Time**: Measure your reflexes and response speed

## Technology Stack

- **React 19.2.0** - UI framework
- **Vite 7.2.4** - Build tool and dev server
- **ESLint** - Code quality and linting
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jakeliukayak/aptitude-test-system.git
cd aptitude-test-system
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

```
aptitude-test-system/
├── src/
│   ├── components/
│   │   ├── NumericalReasoning.jsx
│   │   ├── InductiveReasoning.jsx
│   │   ├── VerbalReasoning.jsx
│   │   ├── DeductiveReasoning.jsx
│   │   └── Games.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Features

- ✨ Modern, responsive UI with gradient styling
- 📊 Progress bars for tracking test completion
- ✅ Immediate visual feedback on answers
- 🏆 Score calculation and results display
- 🔄 Smooth navigation between test types
- 🎮 Interactive games with state management
- 📱 Mobile-friendly design

## How to Use

1. **Select a Test**: Choose from the five available test types on the home screen
2. **Answer Questions**: Read each question carefully and select your answer
3. **Submit**: Click "Submit Answer" to check your response
4. **View Results**: Complete all questions to see your final score
5. **Play Games**: Access cognitive games for a fun challenge

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

