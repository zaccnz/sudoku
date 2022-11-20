import { Layout } from './components/Layout';
import { SudokuGrid } from './components/SudokuGrid';
import { gameContainer } from './assets/App.module.css';
import { useReducer } from 'react';
import { createSudoku, Sudoku } from './game/sudoku';
import { sudokuReducer } from './game/reducer';
/*
import { Controls } from './components/Controls';
import { Numbers } from './components/Numbers';
*/

function App() {
  const [sudoku, dispatch] = useReducer(sudokuReducer, createSudoku());

  return (
    <Layout page='index'>
      <div className={gameContainer}>
        <SudokuGrid sudoku={sudoku} dispatch={dispatch} />
      </div>
    </Layout>
  )
}

export default App
