
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

export type Difficulty = 'easy' | 'medium' | 'hard' | 'impossible';

export interface SudokuTile {
    number?: number;
    row: number;
    col: number;
    valid: boolean;
    highlight?: Highlight;
    notes: Record<number, boolean>;
    solid: boolean;
}

export interface Sudoku {
    grid: SudokuTile[][];
    valid: boolean;
    complete: boolean;
    selected?: [number, number];
}

export const createSudoku = (difficulty?: Difficulty): Sudoku => {
    return {
        grid: new Array(9).fill(0).map((_, i) => {
            return new Array(9).fill(0).map((_, j) => {
                return {
                    number: i === j && i != 4 ? i + 1 : undefined,
                    row: i,
                    col: j,
                    valid: true,
                    notes: {},
                    solid: i === j,
                } as SudokuTile;
            })
        }),
        valid: true,
        complete: false,
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
                        isValid = false;
                    } else {
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
                        isValid = false;
                    } else {
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
                        isValid = false;
                    } else {
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