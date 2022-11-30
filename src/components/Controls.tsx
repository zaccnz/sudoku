import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { ImUndo, ImRedo } from 'react-icons/im';
import { BsFillPencilFill } from 'react-icons/bs';
import { VscDebugStart } from 'react-icons/vsc';

import { SudokuAction } from '@/game/reducer';
import { Difficulty, Sudoku } from '@/game/sudoku';
import { boardFromString, boardToString, WorkerInput, WorkerResult } from '@/game/worker';
import SolveWorker from '@/game/worker?worker';

/* @ts-ignore */
import { controlsContainer, gameGeneratorContainer, gameControlsContainer, gameGeneratorText, gameClockContainer, controlsButton, gameDifficultySelector } from './Controls.module.css';

const randomInterval = (from: number, to: number): number => {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

type DifficultyEntry = { name: string, generate: () => number };

const DIFFICULTIES: Record<Difficulty, DifficultyEntry> = {
    'easy': {
        name: 'Beginner',
        generate: () => randomInterval(10, 19),
    },
    'medium': {
        name: 'Easy',
        generate: () => randomInterval(20, 29),
    },
    'hard': {
        name: 'Medium',
        generate: () => randomInterval(30, 39),
    },
    'harder': {
        name: 'Hard',
        generate: () => randomInterval(40, 58),
    },
};

interface Button {
    text: string,
    icon?: IconType,
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

// https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
export const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');

interface GameClockProps {
    started: Date;
    finished?: Date,
}

const GameClock: React.FC<GameClockProps> = ({ started, finished }) => {
    const [timerState, setTimerState] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const updateTimer = () => {
        const now = finished !== undefined ? finished : new Date();
        const seconds = (now.getTime() - started.getTime()) / 1000;
        setTimerState({
            hours: Math.floor(seconds / (60 * 60)),
            minutes: Math.floor(seconds / 60) % 60,
            seconds: Math.floor(seconds % 60),
        });
    }

    useEffect(() => {
        updateTimer();
        const updateInterval = setInterval(() => updateTimer(), 500);
        return () => clearInterval(updateInterval);
    }, [started, finished]);

    return (
        <div className={gameClockContainer}>
            {timerState.hours > 0 && <span>{timerState.hours}:</span>}
            {zeroPad(timerState.minutes, 2)}:{zeroPad(timerState.seconds, 2)}
        </div>
    )
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
                    dispatch({
                        type: 'startTimer',
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
            icon: ImUndo,
            enabled: sudoku.moveIndex > 0,
            action: {
                type: 'click',
                onClick: () => dispatch({ type: 'undo' }),
            }
        } as Button,
        {
            text: 'Redo',
            icon: ImRedo,
            enabled: sudoku.moveIndex < sudoku.moves.length,
            action: {
                type: 'click',
                onClick: () => dispatch({ type: 'redo' }),
            }
        } as Button,
        {
            text: 'Note',
            icon: BsFillPencilFill,
            enabled: true,
            action: {
                type: 'toggle',
                state: note,
                setState: setNote,
            }
        } as Button,
    ] : [
        {
            text: 'Solve',
            icon: VscDebugStart,
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
        } as Button,
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
        } as Button,
    ]);

    return (
        <div className={controlsContainer} {...{ page }}>
            <div className={gameGeneratorContainer}>
                <select
                    className={gameDifficultySelector}
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
                    className={controlsButton}
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
                    New Board
                </button>
            </div>
            <div className={gameControlsContainer}>
                {
                    buttons.map((v, i) => {
                        return (<button
                            className={controlsButton}
                            key={`controls-button-${i}`}
                            disabled={!v.enabled}
                            onClick={() => {
                                if (v.action.type === 'click') {
                                    v.action.onClick();
                                } else if (v.action.type === 'toggle') {
                                    v.action.setState(state => !state);
                                }
                            }}
                            {
                            ...{
                                active: (v.action.type === 'toggle' && v.action.state).toString()
                            }
                            }
                        >
                            {
                                v.icon && <v.icon />
                            }
                            {v.text}
                        </button>)
                    })
                }
            </div>
            {
                page === 'index' && sudoku.started && (
                    <GameClock
                        started={sudoku.started}
                        finished={sudoku.finished}
                    />
                )
            }
        </div>
    );
};