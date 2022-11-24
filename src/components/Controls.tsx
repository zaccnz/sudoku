import { SudokuAction } from '@/game/reducer';
import { Difficulty, Sudoku } from '@/game/sudoku';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { boardFromString, boardToString, WorkerInput, WorkerResult } from '@/game/worker';
import SolveWorker from '@/game/worker?worker';

/* @ts-ignore */
import { controlsContainer, gameStateContainer, gameControlsContainer } from './Controls.module.css';

const randomInterval = (from: number, to: number): number => {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

type DifficultyEntry = { name: string, generate: () => number };

const DIFFICULTIES: Record<Difficulty, DifficultyEntry> = {
    'easy': {
        name: 'Easy',
        generate: () => randomInterval(10, 19),
    },
    'medium': {
        name: 'Medium',
        generate: () => randomInterval(20, 29),
    },
    'hard': {
        name: 'Hard',
        generate: () => randomInterval(30, 39),
    },
    'harder': {
        name: 'Harder',
        generate: () => randomInterval(40, 58),
    },
};

interface Button {
    text: string,
    icon: any,
    enabled: boolean,
    action: {
        type: 'toggle',
        state: boolean,
        setState: Dispatch<SetStateAction<boolean>>,
    } | {
        type: 'click',
        onClick: () => void,
    }
}

interface ControlsProps {
    sudoku: Sudoku;
    page: 'index' | 'solver';
    selected?: [number, number],
    dispatch: Dispatch<SudokuAction>,
    note?: boolean,
    setNote?: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>,
}

export const Controls: React.FC<ControlsProps> = ({ sudoku, page, dispatch, selected, note, setNote, setError }) => {
    const [generating, setGenerating] = useState(false);
    const [solving, setSolving] = useState(false);
    const difficultyRef = useRef<HTMLSelectElement>(null);

    const workerRef = useRef(new SolveWorker());
    workerRef.current.onmessage = (e) => {
        const result = e.data as WorkerResult;
        switch (result.event) {
            case 'success': {
                setSolving(false);
                if (result.board) {
                    setGenerating(false);
                    dispatch({
                        type: 'createNew',
                        numbers: boardFromString(result.board),
                    });
                }
                return;
            }
            case 'failed': {
                setError(result.error);
                if (result.error === 'Failed to generate a board.  Please try again.') {
                    setGenerating(false);
                }
                return;
            }
            case 'setNumber': {
                dispatch({
                    type: 'setNumber',
                    number: result.number,
                    row: result.row,
                    col: result.col,
                });
                return;
            }
            case 'updatePossible': {
                dispatch({
                    type: 'setPossibilities',
                    possibilities: result.possibilities,
                });
                return;
            }
        }
    };

    const buttons: Button[] = (page === 'index' ? [
        {
            text: 'Undo',
            icon: undefined,
            enabled: sudoku.moveIndex > 0,
            action: {
                type: 'click',
                onClick: () => dispatch({ type: 'undo' }),
            }
        },
        {
            text: 'Redo',
            icon: undefined,
            enabled: sudoku.moveIndex < sudoku.moves.length,
            action: {
                type: 'click',
                onClick: () => dispatch({ type: 'redo' }),
            }
        },
        (note !== undefined && setNote) && {
            text: 'Note',
            icon: undefined,
            enabled: true,
            action: {
                type: 'toggle',
                state: note,
                setState: setNote,
            }
        },
    ] : [
        {
            text: 'Solve',
            icon: undefined,
            enabled: !solving,
            action: {
                type: 'click',
                onClick: () => {
                    setSolving(true);
                    dispatch({
                        type: 'solidify'
                    });
                    const numbers = sudoku.grid.map(row => row.map(v => v.number));
                    workerRef.current.postMessage({
                        type: 'solve',
                        board: boardToString(numbers),
                        forwardDelay: 100,
                        backDelay: 50
                    } as WorkerInput);
                }
            }
        },
        {
            text: 'Clear',
            icon: undefined,
            enabled: true,
            action: {
                type: 'click',
                onClick: () => {
                    dispatch({
                        type: 'createNew',
                    });
                }
            }
        },
    ]).filter(v => typeof v !== 'boolean') as Button[];

    return (
        <div className={controlsContainer}>
            <div className={gameStateContainer}>
                <p>
                    New Game
                </p>
                <select
                    ref={difficultyRef}
                >
                    {
                        Object.entries(DIFFICULTIES).map(([diff, value]) => (
                            <option key={`difficulty-${diff}`} value={diff}>
                                {value.name}
                            </option>
                        ))
                    }
                </select>
                <button
                    onClick={() => {
                        setGenerating(true);
                        const entry = (DIFFICULTIES as Record<string, DifficultyEntry>)[difficultyRef.current?.value ?? 'easy'];
                        workerRef.current.postMessage({
                            type: 'generate',
                            count: entry.generate()
                        } as WorkerInput);
                    }}
                    disabled={generating}
                >
                    generate
                </button>
            </div>
            <div className={gameControlsContainer}>
                {
                    buttons.map((v, i) => {
                        return (<button
                            key={`controls-button-${i}`}
                            disabled={!v.enabled}
                            onClick={() => {
                                if (v.action.type === 'click') {
                                    v.action.onClick();
                                } else if (v.action.type === 'toggle') {
                                    v.action.setState(state => !state);
                                }
                            }}
                        >
                            {v.text}
                        </button>)
                    })
                }
                <p>
                    Timer here?
                </p>
            </div>
        </div>
    );
};