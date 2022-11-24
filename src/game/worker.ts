/* Web worker to solve sudoku without halting main thread */

import { boxToIJ, ijToBox } from '@/game/sudoku';

export const boardToString = (board: Board): string => {
    const tileStr = (value?: number) => value !== undefined ? value : 0;
    return board.map(row => row.map(tileStr).join(',')).join('|');
}

export const boardFromString = (board: string): Board => {
    const tileNum = (value: string) => value === '0' ? undefined : parseInt(value);
    return board.split('|').map(row => row.split(',').map(tileNum));
}

export type WorkerInput = {
    type: 'solve',
    board: string,
    forwardDelay: number,
    backDelay: number,
} | {
    type: 'generate',
    count: number,
};

export type WorkerResult = {
    event: 'success',
    board?: string,
} | {
    event: 'failed',
    error: string,
} | {
    event: 'setNumber',
    number: number | undefined,
    row: number, col: number
} | {
    event: 'updatePossible',
    possibilities: number[][],
}
type Board = (number | undefined)[][];

const computePossible = (board: Board): number[][] => {
    const rowPossible = new Array(9).fill(511);
    const colPossible = new Array(9).fill(511);
    const boxPossible = new Array(9).fill(511);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const number = board[i][j];
            if (number) {
                const mask = ~(1 << number - 1);
                rowPossible[i] &= mask;
                colPossible[j] &= mask;
                boxPossible[ijToBox(i, j)] &= mask;
            }
        }
    }
    const possible = new Array(9).fill(0).map(_ => new Array(9).fill(511));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            possible[i][j] &= rowPossible[i];
            possible[i][j] &= colPossible[j];
            possible[i][j] &= boxPossible[ijToBox(i, j)];
        }
    }
    return possible;
}

const countPossibilities = (possibilities: number): number => {
    let count = 0;
    while (possibilities > 0) {
        count += 1;
        possibilities = possibilities & (possibilities - 1);
    }
    return count;
}

const pickPossibility = (possibilities: number, n: number): number => {
    let num = 0;
    while (n >= 0) {
        num++;
        if ((possibilities & 1) === 1) {
            n--;
        }
        possibilities = possibilities >> 1;
    }
    return num;
}

const orderPossible = (board: Board, possible: number[][]): [i: number, j: number, score: number, p: number][] => {
    const toSolve: [number, number, number, number][] = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === undefined) {
                const score = countPossibilities(possible[i][j]);
                toSolve.push([i, j, score, possible[i][j]]);
            }
        }
    }
    shuffleArray(toSolve);
    toSolve.sort((a, b) => a[2] - b[2]);

    return toSolve;
}

const propogate = (i: number, j: number, value: number, possible: number[][]): [i: number, j: number, mask: number][] => {
    const mask = 1 << value - 1;
    const result: [number, number, number][] = [];
    const box = ijToBox(i, j);

    for (let x = 0; x < 9; x++) {
        if (x === j) continue;
        if ((possible[i][x] & mask) > 0) {
            possible[i][x] &= ~mask;
            result.push([i, x, mask]);
        }
    }

    for (let y = 0; y < 9; y++) {
        if (y === i) continue;
        if ((possible[y][j] & mask) > 0) {
            possible[y][j] &= ~mask;
            result.push([y, j, mask]);
        }
    }

    for (let bi = 0; bi < 9; bi++) {
        const [pi, pj] = boxToIJ(box, bi);
        if (pi === i && pj === j) {
            continue;
        }
        if ((possible[pi][pj] & mask) > 0) {
            possible[pi][pj] &= ~mask;
            result.push([pi, pj, mask]);
        }
    }

    return result;
}

const undoPropogation = (result: [i: number, j: number, mask: number][], possible: number[][]) => {
    for (const r of result) {
        const [i, j, mask] = r;
        possible[i][j] |= mask;
    }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const timer = (millis: number): Promise<void> => {
    return new Promise((res) => {
        setTimeout(res, millis);
    });
}

const solveRecursive = async (board: Board, possible: number[][], ui: boolean, forwardDelay: number, backDelay: number): Promise<boolean> => {
    const toSolve = orderPossible(board, possible);
    if (toSolve.length === 0) {
        return true;
    } else if (toSolve[0][2] === 0) {
        return false;
    }

    const [i, j, score, p] = toSolve[0];
    const guesses = new Array(score).fill(0).map((_, i) => i);
    shuffleArray(guesses);
    for (const guess of guesses) {
        const number = pickPossibility(p, guess);
        board[i][j] = number;
        if (ui) {
            postMessage({
                'event': 'setNumber',
                number,
                row: i,
                col: j,
            } as WorkerResult);
        }
        const result = propogate(i, j, number, possible);
        if (ui) {
            postMessage({
                'event': 'updatePossible',
                possibilities: possible,
            } as WorkerResult);
            await timer(forwardDelay);
        }
        if (await solveRecursive(board, possible, ui, forwardDelay, backDelay)) {
            return true;
        }
        undoPropogation(result, possible);
    }
    board[i][j] = undefined;
    if (ui) {
        postMessage({
            'event': 'setNumber',
            number: undefined,
            row: i,
            col: j,
        } as WorkerResult);
        await timer(backDelay);
    }
    return false;
}

const solve = (board: Board, forwardDelay: number, backDelay: number): void => {
    const possible = computePossible(board);
    postMessage({
        event: 'updatePossible',
        possibilities: possible,
    } as WorkerResult);
    solveRecursive(board, possible, true, forwardDelay, backDelay)
        .then((result) => {
            if (result) {
                postMessage({ event: 'success' } as WorkerResult);
            } else {
                postMessage({ event: 'failed', error: 'Failed to find a solution' } as WorkerResult);
            }
        });
}

const countSolutionsRecursive = (board: Board, possible: number[][]): number => {
    const toSolve = orderPossible(board, possible);
    if (toSolve.length === 0) {
        return 1;
    } else if (toSolve[0][2] === 0) {
        return 0;
    }

    let solutions = 0;

    const [i, j, score, p] = toSolve[0];
    const guesses = new Array(score).fill(0).map((_, i) => i);
    for (const guess of guesses) {
        const number = pickPossibility(p, guess);
        board[i][j] = number;
        const result = propogate(i, j, number, possible);

        solutions += countSolutionsRecursive(board, possible);
        undoPropogation(result, possible);
    }
    board[i][j] = undefined;
    return solutions;
};

const countSolutions = (board: Board): number => {
    const possible = computePossible(board);
    return countSolutionsRecursive(board, possible);
}

const generateBoard = async (count: number, tries: number = 0): Promise<boolean> => {
    const board: Board = new Array(9).fill(0).map(_ => new Array(9).fill(undefined));
    const possible = computePossible(board);
    await solveRecursive(board, possible, false, 0, 0);
    const canRemove = new Array(81).fill(0).map((_, i) => i);
    shuffleArray(canRemove);
    for (let i = 0; i < count; i++) {
        const next = canRemove.pop();
        if (!next) {
            if (tries <= 20) {
                return await generateBoard(count, tries + 1);
            } else {
                return false;
            }
        }
        const row = Math.floor(next / 9);
        const col = next % 9;
        const removed = board[row][col];
        board[row][col] = undefined;
        const cloneBoard = board.map(row => row.map(val => val));
        if (countSolutions(cloneBoard) > 1) {
            board[row][col] = removed;
            i--;
        }
    }
    postMessage({
        event: 'success',
        board: boardToString(board),
    } as WorkerResult);
    return true;
}

const tryGenerateBoard = async (count: number) => {
    let tries = 5;
    while (tries > 0) {
        if (await generateBoard(count)) {
            return;
        }
        tries--;
    }
    postMessage({
        event: 'failed',
        error: 'Failed to generate board.'
    } as WorkerResult);
}

onmessage = (e: MessageEvent) => {
    const input = e.data as WorkerInput;

    switch (input.type) {
        case 'solve': {
            const { board, forwardDelay, backDelay } = input;
            solve(boardFromString(board), forwardDelay, backDelay);
            break;
        }
        case 'generate': {
            // works best when count < 58
            const { count } = input;
            tryGenerateBoard(count);
            break;
        }
    }
}

export default {};