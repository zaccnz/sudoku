import { SudokuAction } from '@/game/reducer';
import { Dispatch, RefObject } from 'react';

/* @ts-ignore */
import { numbersContainer, number } from './Numbers.module.css';

interface NumbersProp {
    remaining: number[],
    dispatch: Dispatch<SudokuAction>,
    selected?: [number, number],
    note?: boolean,
    numbersRef: RefObject<HTMLDivElement>,
}

export const Numbers: React.FC<NumbersProp> = ({ remaining, selected, dispatch, note, numbersRef }) => {
    const numbers = new Array(9).fill(0).map((_, v) => v + 1);
    return (
        <div className={numbersContainer} ref={numbersRef}>
            {
                numbers.map(n => {
                    return (
                        <div
                            className={number}
                            key={`number-input-${n}`}
                            onClick={() => {
                                selected && dispatch(note ? {
                                    type: 'setNote',
                                    note: n,
                                    row: selected[0],
                                    col: selected[1],
                                } : {
                                    type: 'setNumber',
                                    number: n,
                                    row: selected[0],
                                    col: selected[1],
                                });
                            }}
                            {...{ disabled: !remaining.includes(n) }}
                        >
                            {n}
                        </div>
                    );
                })
            }
        </div>
    );
};