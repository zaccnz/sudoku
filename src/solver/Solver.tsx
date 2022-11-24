import { SudokuGrid } from '@/components/SudokuGrid';
import { sudokuReducer } from '@/game/reducer';
import { createSudoku } from '@/game/sudoku';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Controls } from '@/components/Controls';
import { Numbers } from '@/components/Numbers';
import { SettingsProvider } from '@/providers/SettingsProvider';
import { Layout } from '@/components/Layout';

const NUMBERS = '0123456789';

const Solver: React.FC = () => {
  const [sudoku, dispatch] = useReducer(sudokuReducer, createSudoku());
  const numbersRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<[number, number] | undefined>(undefined);

  useEffect(() => {
    const boardString = new URLSearchParams(window.location.search).get('board');
    if (!boardString) return;
    if (boardString.length !== 81) {
      alert('invalid board in URL');
      return;
    }
    const board: (number | undefined)[][] = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const digit = boardString[i * 9 + j];
        if (!NUMBERS.includes(digit)) {
          alert('invalid board in URL');
          return;
        }
        row.push(digit === '0' ? undefined : parseInt(digit));
      }
      board.push(row);
      window.history.pushState(null, '', `${import.meta.env.BASE_URL}solver/`);
    }
    dispatch({
      'type': 'createNew',
      'numbers': board,
    });
  }, []);

  return (
    <SettingsProvider>
      <Layout page='solver'>
        {
          ({ setError }) => (
            <>
              <Controls
                sudoku={sudoku}
                page='solver'
                dispatch={dispatch}
                selected={selected}
                setError={setError}
              />
              <SudokuGrid
                sudoku={sudoku}
                dispatch={dispatch}
                selected={selected}
                setSelected={setSelected}
                numbersRef={numbersRef}
              />
              <Numbers
                remaining={sudoku.remaining}
                dispatch={dispatch}
                selected={selected}
                numbersRef={numbersRef}
              />
            </>
          )
        }
      </Layout>
    </SettingsProvider >
  )
}

export default Solver
