import { cloneSudoku, createSudoku, Difficulty, findRemaining, Move, Sudoku, validateSudoku } from '@/game/sudoku';

export type SudokuAction = {
    type: 'createNew', numbers?: (number | undefined)[][],
} | {
    type: 'setNumber', row: number, col: number, number?: number,
} | {
    type: 'setNote', row: number, col: number, note: number,
} | {
    type: 'setPossibilities', possibilities: number[][],
} | {
    type: 'solidify',
} | {
    type: 'undo',
} | {
    type: 'redo',
} | {
    type: 'startTimer',
} | {
    type: 'clearMoves',
};

const buildPossibilityLookup = (): Record<number, number[]> => {
    const lookup: Record<number, number[]> = {};

    for (let i = 0; i < 512; i++) {
        lookup[i] = [];
        for (let j = 0; j < 9; j++) {
            if ((i & (1 << j)) > 0) {
                lookup[i].push(j + 1);
            }
        }
    }

    return lookup;
};

const possibilityLookup: Record<number, number[]> = buildPossibilityLookup();

export const sudokuReducer = (state: Sudoku, action: SudokuAction): Sudoku => {
    const prepareState = (state: Sudoku) => {
        state.remaining = findRemaining(state.grid);
        return validateSudoku(state);
    }

    const pushMove = (state: Sudoku, move: Move) => {
        if (state.moveIndex !== state.moves.length) {
            state.moves = state.moves.slice(0, state.moveIndex);
        }
        state.moves.push(move);
        state.moveIndex++;
    }

    const toggleNote = (state: Sudoku, i: number, j: number, note: number) => {
        if (state.grid[i][j].notes.includes(note)) {
            state.grid[i][j].notes = state.grid[i][j].notes.filter(v => v !== note);
        } else {
            state.grid[i][j].notes.push(note);
        }
    };

    switch (action.type) {
        case 'createNew': {
            return createSudoku(action.numbers);
        }
        case 'solidify': {
            state = cloneSudoku(state);
            state.grid.map(row => {
                row.map(tile => {
                    tile.solid = tile.number !== undefined;
                });
            });
            return prepareState(state);
        }
        case 'setNumber': {
            state = cloneSudoku(state);
            const { row, col } = action;
            const tile = state.grid[row][col];
            if (!tile.solid) {
                pushMove(state, [row, col, 'value', tile.number, action.number]);

                tile.number = action.number;
            }
            return prepareState(state);
        }
        case 'setNote': {
            state = cloneSudoku(state);
            const { row: i, col: j, note: number } = action;
            if (!state.grid[i][j].solid && state.grid[i][j].number === undefined) {
                pushMove(state, [i, j, 'note', number, number]);
                toggleNote(state, i, j, number);
            }
            return state;
        }
        case 'setPossibilities': {
            state = cloneSudoku(state);
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    const possible = possibilityLookup[action.possibilities[i][j]];
                    state.grid[i][j].notes = [...possible];
                }
            }
            return state;
        }
        case 'undo': {
            if (state.moveIndex > 0) {
                state = cloneSudoku(state);
                const [row, col, type, from, _] = state.moves[state.moveIndex - 1];
                switch (type) {
                    case 'value': {
                        state.grid[row][col].number = from;
                        break;
                    }
                    case 'note': {
                        toggleNote(state, row, col, from ?? 1);
                    }
                }
                state.moveIndex--;
                return prepareState(state);
            }
            return state;
        }
        case 'redo': {
            if (state.moveIndex < state.moves.length) {
                state = cloneSudoku(state);
                const [row, col, type, _, to] = state.moves[state.moveIndex];
                switch (type) {
                    case 'value': {
                        state.grid[row][col].number = to;
                        break;
                    }
                    case 'note': {
                        toggleNote(state, row, col, to ?? 1);
                    }
                }
                state.moveIndex++;
                return prepareState(state);
            }
            return state;
        }
        case 'clearMoves': {
            if (state.moves.length > 0) {
                state = cloneSudoku(state);
                state.moves = [];
                state.moveIndex = 0;
                return state;
            }
        }
    };

    throw new Error(`unimplemented action ${JSON.stringify(action)}!`)
};