import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Layout } from './components/Layout';
import { SudokuGrid } from './components/SudokuGrid';
import { createSudoku } from './game/sudoku';
import { sudokuReducer } from './game/reducer';
import { SettingsContext, SettingsProvider } from './providers/SettingsProvider';
import { Controls } from './components/Controls';
import { Numbers } from './components/Numbers';
import Confetti from 'react-confetti';

const App: React.FC = () => {
  const [sudoku, dispatch] = useReducer(sudokuReducer, createSudoku());
  const [selected, setSelected] = useState<[number, number] | undefined>(undefined);
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const numbersRef = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState(false);
  const [particles, setParticles] = useState(false);
  const settings = useContext(SettingsContext);

  const empty = sudoku.grid.map(row => row.filter(v => v.number !== undefined)).flat().length === 0;
  console.log(sudoku.grid.map(row => row.filter(v => v.number !== undefined)).concat())
  const boardString = sudoku.grid.map(row => row.map(tile => tile.number ?? '0').join('')).join('');

  const onResize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  useEffect(() => {
    if (sudoku.complete) {
      dispatch({
        type: 'solidify',
      });
      if (settings.confetti) {
        setParticles(true);
      }
    }
  }, [sudoku.complete]);

  return (
    <SettingsProvider>
      <Layout page='index' boardString={!empty ? boardString : undefined}>
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
                <Numbers
                  remaining={sudoku.remaining}
                  dispatch={dispatch}
                  selected={selected}
                  note={note}
                  numbersRef={numbersRef}
                />
                {
                  particles && <Confetti
                    recycle={false}
                    style={{ overflow: 'none', width: '100%', height: '100%' }}
                    width={windowSize[0]}
                    height={windowSize[1]}
                    numberOfPieces={1000}
                    onConfettiComplete={() => {
                      setParticles(false);
                    }}
                  />
                }
              </>
            )
          }
        }
      </Layout>
    </SettingsProvider >
  )
}

export default App
