import { createSudoku, Difficulty, ijToBox, Sudoku, validateSudoku } from '@/game/sudoku';
import React, { createContext } from 'react';

export type SudokuAction = {
    type: 'createNew', difficulty: Difficulty,
} | {
    type: 'selectTile', row: number, col: number,
} | {
    type: 'setNumber', number?: number,
} | {
    type: 'deselect'
};

export const sudokuReducer = (state: Sudoku, action: SudokuAction): Sudoku => {
    switch (action.type) {
        case 'createNew': {
            return createSudoku(action.difficulty);
        }
        case 'selectTile': {
            const { row, col } = action;
            const box = ijToBox(row, col);

            state = {
                ...state,
                selected: [row, col]
            };

            const selectedNumber = state.grid[row][col].number;

            state.grid.map(r => {
                r.map(tile => {
                    if (tile.row === row && tile.col === col) {
                        tile.highlight = 'selected';
                    } else if (tile.number && tile.number === selectedNumber) {
                        tile.highlight = 'same';
                    } else if (tile.row === row || tile.col === col) {
                        tile.highlight = 'connected';
                    } else if (box === ijToBox(tile.row, tile.col)) {
                        tile.highlight = 'connected';
                    } else {
                        tile.highlight = undefined;
                    }
                })
            });
            return validateSudoku(state);
        }
        case 'deselect': {
            state = {
                ...state,
                selected: undefined,
            };

            state.grid.map(r => {
                r.map(tile => {
                    tile.highlight = undefined;
                })
            });
            return state;
        }
        case 'setNumber': {
            state = {
                ...state
            };
            if (state.selected) {
                const [row, col] = state.selected;
                const tile = state.grid[row][col];
                if (!tile.solid) {
                    tile.number = action.number;
                }
            }
            return validateSudoku(state);
        }
    }

    return {
        ...state,
    }
};