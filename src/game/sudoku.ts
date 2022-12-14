
export const ijToBox = (i: number, j: number): number => {
    return Math.floor(i / 3) * 3 + Math.floor(j / 3);
}

export const boxToIJ = (box: number, index: number): [number, number] => {
    const bi = Math.floor(box / 3) * 3;
    const bj = (box % 3) * 3;
    const i = Math.floor(index / 3);
    const j = index % 3;
    return [bi + i, bj + j];
}

export type Highlight = 'selected' | 'same' | 'connected';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'harder';

export interface SudokuTile {
    number?: number;
    row: number;
    col: number;
    valid: boolean;
    notes: number[];
    solid: boolean;
}

export type Move = [
    row: number, col: number,
    changed: 'value' | 'note',
    from: number | undefined,
    to: number | undefined
];

export interface Sudoku {
    grid: SudokuTile[][];
    valid: boolean;
    complete: boolean;
    moves: Move[];
    moveIndex: number;
    remaining: number[];
    started?: Date,
    finished?: Date,
}

export const cloneTile = (tile: SudokuTile): SudokuTile => {
    return {
        ...tile,
        notes: [...tile.notes],
    };
}

export const cloneSudoku = (sudoku: Sudoku): Sudoku => {
    const newGrid = sudoku.grid.map(row => row.map(tile => cloneTile(tile)));
    return {
        ...sudoku,
        grid: newGrid,
        moves: [...sudoku.moves],
        remaining: [...sudoku.remaining],
    };
}

export const findRemaining = (grid: SudokuTile[][]): number[] => {
    const nCount: Record<number, number> = {};
    for (const row of grid) {
        for (const tile of row) {
            if (tile.number) {
                if (tile.number in nCount) {
                    nCount[tile.number] += 1;
                } else {
                    nCount[tile.number] = 1;
                }
            }
        }
    }

    return new Array(9).fill(0).map((_, i) => i + 1).filter(v => !nCount[v] || nCount[v] !== 9);
};

export const createSudoku = (numbers?: (number | undefined)[][]): Sudoku => {
    const grid = new Array(9).fill(0).map((_, i) => {
        return new Array(9).fill(0).map((_, j) => {
            return {
                number: numbers !== undefined ? numbers[i][j] : undefined,
                row: i,
                col: j,
                valid: true,
                notes: [],
                solid: numbers !== undefined && numbers[i][j] !== undefined,
            } as SudokuTile;
        })
    });

    return {
        grid,
        valid: true,
        complete: false,
        moves: [],
        moveIndex: 0,
        remaining: findRemaining(grid),
    }
};

export const validateSudoku = (sudoku: Sudoku): Sudoku => {
    // code is a bit complicated, used to do more
    let isValid = true;
    let isComplete = true;

    const invalidRow: Record<number, number[]> = {};
    const invalidCol: Record<number, number[]> = {};
    const invalidBox: Record<number, number[]> = {};

    for (let i = 0; i < 9; i++) {
        const rowSeen: number[] = [];
        const colSeen: number[] = [];
        const boxSeen: number[] = [];
        for (let j = 0; j < 9; j++) {
            sudoku.grid[i][j].valid = true;

            const row = sudoku.grid[i][j].number;
            if (row) {
                if (rowSeen.includes(row)) {
                    if (i in invalidRow) {
                        invalidRow[i].push(row);
                    } else {
                        isValid = false;
                        invalidRow[i] = [row];
                    }
                } else {
                    rowSeen.push(row);
                }
            } else {
                isComplete = false;
            }
            const col = sudoku.grid[j][i].number;
            if (col) {
                if (colSeen.includes(col)) {
                    if (i in invalidCol) {
                        invalidCol[i].push(col);
                    } else {
                        isValid = false;
                        invalidCol[i] = [col];
                    }
                } else {
                    colSeen.push(col);
                }
            }
            const [bi, bj] = boxToIJ(i, j);
            const box = sudoku.grid[bi][bj].number;
            if (box) {
                if (boxSeen.includes(box)) {
                    if (i in invalidBox) {
                        invalidBox[i].push(box);
                    } else {
                        isValid = false;
                        invalidBox[i] = [box];
                    }
                } else {
                    boxSeen.push(box);
                }
            }
        }
    }

    for (const invalid in invalidRow) {
        for (let i = 0; i < 9; i++) {
            const tile = sudoku.grid[invalid][i];
            if (tile.number && invalidRow[invalid].includes(tile.number)) {
                tile.valid = false;
            }
        }
    }

    for (const invalid in invalidCol) {
        for (let i = 0; i < 9; i++) {
            const tile = sudoku.grid[i][invalid];
            if (tile.number && invalidCol[invalid].includes(tile.number)) {
                tile.valid = false;
            }
        }
    }

    for (const invalid in invalidBox) {
        for (let i = 0; i < 9; i++) {
            const [pi, pj] = boxToIJ(invalid as any as number, i);
            const tile = sudoku.grid[pi][pj];
            if (tile.number && invalidBox[invalid].includes(tile.number)) {
                tile.valid = false;
            }
        }
    }

    return {
        ...sudoku,
        valid: isValid,
        complete: isValid && isComplete,
    }
}