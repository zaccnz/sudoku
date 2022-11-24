import { useEffect, useReducer, useRef, useState } from 'react';
import { Layout } from './components/Layout';
import { SudokuGrid } from './components/SudokuGrid';
import { createSudoku } from './game/sudoku';
import { sudokuReducer } from './game/reducer';
import { SettingsProvider } from './providers/SettingsProvider';
import { Controls } from './components/Controls';
import { Numbers } from './components/Numbers';

const App: React.FC = () => {
  const [sudoku, dispatch] = useReducer(sudokuReducer, createSudoku());
  const [selected, setSelected] = useState<[number, number] | undefined>(undefined);
  const numbersRef = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState(false);

  const boardString = sudoku.grid.map(row => row.map(tile => tile.number ?? '0').join('')).join('');

  useEffect(() => {
    if (sudoku.complete) {
      dispatch({
        type: 'solidify',
      });
      console.log('do particles now');
    }
  }, [sudoku.complete])

  return (
    <SettingsProvider>
      <Layout page='index'>
        {
          ({ setError }) => {
            return (
              <>
                <Controls
                  sudoku={sudoku}
                  page='index'
                  dispatch={dispatch}
                  selected={selected}
                  note={note}
                  setNote={setNote}
                  setError={setError}
                />
                <SudokuGrid
                  sudoku={sudoku}
                  dispatch={dispatch}
                  selected={selected}
                  setSelected={setSelected}
                  setHoldingShift={setNote}
                  numbersRef={numbersRef}
                />
                <a
                  href={`${import.meta.env.BASE_URL}solver/?board=${boardString}`}
                  target="_blank"
                >
                  open in solver
                </a>
                <Numbers
                  remaining={sudoku.remaining}
                  dispatch={dispatch}
                  selected={selected}
                  note={note}
                  numbersRef={numbersRef}
                />
              </>
            )
          }
        }
      </Layout>
    </SettingsProvider >
  )
}

export default App
