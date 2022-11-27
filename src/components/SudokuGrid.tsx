import { SudokuAction } from '@/game/reducer';
import { Highlight, Sudoku, SudokuTile as Tile } from '@/game/sudoku';
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { SudokuTile } from './SudokuTile';

/* @ts-ignore */
import { gridContainer, gridBox, gridBoard } from './SudokuGrid.module.css';

interface SudokuGridProps {
    sudoku: Sudoku;
    dispatch: React.Dispatch<SudokuAction>,
    selected?: [number, number],
    setSelected: Dispatch<SetStateAction<[number, number] | undefined>>,
    holdingShift?: boolean,
    setHoldingShift?: Dispatch<SetStateAction<boolean>>,
    numbersRef: RefObject<HTMLDivElement>,
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({ sudoku, dispatch, selected, setSelected, holdingShift, setHoldingShift, numbersRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const onKeyDown = (event: KeyboardEvent) => {
        if (selected) {
            if ('123456789'.indexOf(event.key) >= 0) {
                if (holdingShift !== undefined && holdingShift) {
                    dispatch({
                        type: 'setNote',
                        note: parseInt(event.key),
                        row: selected[0],
                        col: selected[1],
                    });
                } else {
                    dispatch({
                        type: 'setNumber',
                        number: parseInt(event.key),
                        row: selected[0],
                        col: selected[1],
                    });
                }
            } else if ("!@#$%^&*(".indexOf(event.key) >= 0) {
                dispatch({
                    type: 'setNote',
                    note: "!@#$%^&*(".indexOf(event.key) + 1,
                    row: selected[0],
                    col: selected[1],
                });
            } else if (event.key === '0' || event.key === ' ' || event.key === 'Backspace' || event.key === 'Delete') {
                dispatch({
                    type: 'setNumber',
                    row: selected[0],
                    col: selected[1],
                });
            } else if (event.key === 'Shift') {
                setHoldingShift && setHoldingShift(true);
            }
        }
    }

    const onKeyUp = (event: KeyboardEvent) => {
        if (event.key === 'Shift') {
            setHoldingShift && setHoldingShift(false);
        }
    }

    const onMouseDown = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node) &&
            numbersRef.current && !numbersRef.current.contains(event.target as Node)) {
            setSelected(undefined);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('mousedown', onMouseDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            document.removeEventListener('mousedown', onMouseDown);
        }
    });

    const boxSelect: boolean[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((v, i) => {
        return v.map((_, j) => {
            return selected !== undefined && Math.floor(selected[0] / 3) === i && Math.floor(selected[1] / 3) === j;
        });
    });

    const boxed: [Tile[], boolean][][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((v, i) => {
        return v.map((_, j) => {
            return [new Array(9).fill(0).map((_, index) => {
                return sudoku.grid[i * 3 + Math.floor(index / 3)][j * 3 + index % 3];
            }), selected !== undefined && Math.floor(selected[0] / 3) === i && Math.floor(selected[1] / 3) === j];
        });
    });

    return (
        <div
            className={gridContainer}
            ref={containerRef}
        >
            <div className={gridBoard}>
                {
                    boxed.map((row, y) => {
                        return row.map(([tiles, boxSelected], x) => {
                            return (
                                <div
                                    key={`grid-box-${x}${y}`}
                                    className={gridBox}
                                    style={{ "--x": x, "--y": y } as React.CSSProperties}
                                >
                                    {
                                        tiles.map((tile) => {
                                            let highlight: Highlight | undefined = undefined;
                                            if (selected) {
                                                const [sr, sc] = selected;
                                                if (tile.row === sr && tile.col === sc) {
                                                    highlight = 'selected';
                                                } else if (tile.number && tile.number === sudoku.grid[sr][sc].number) {
                                                    highlight = 'same';
                                                } else if (boxSelected) {
                                                    highlight = 'connected';
                                                } else if (tile.row === sr || tile.col === sc) {
                                                    highlight = 'connected';
                                                }
                                            }

                                            return (
                                                <SudokuTile
                                                    key={`tile-${tile.row}-${tile.col}`}
                                                    tile={tile}
                                                    highlight={highlight}
                                                    onSelected={() => {
                                                        setSelected([tile.row, tile.col]);
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            );
                        })
                    })
                }
            </div>
        </div>
    );
};

/*

            <div className={gridBox} style={{ "--x": 1, "--y": 0 } as React.CSSProperties}></div>
            <div className={gridBox} style={{ "--x": 2, "--y": 0 } as React.CSSProperties}></div>
            <div className={gridBox} style={{ "--x": 0, "--y": 1 } as React.CSSProperties}></div>
            <div className={gridBox} style={{ "--x": 1, "--y": 1 } as React.CSSProperties}></div>
            <div className={gridBox} style={{ "--x": 2, "--y": 1 } as React.CSSProperties}></div>
            <div className={gridBox} style={{ "--x": 0, "--y": 2 } as React.CSSProperties}></div>
            <div className={gridBox} style={{ "--x": 1, "--y": 2 } as React.CSSProperties}></div>
            <div className={gridBox} style={{ "--x": 2, "--y": 2 } as React.CSSProperties}></div>
            {
                sudoku.grid.map(row => {
                    return row.map(tile => {
                        return (
                            <SudokuTile
                                key={`tile-${tile.row}-${tile.col}`}
                                tile={tile}
                                onSelected={() => {
                                    dispatch({
                                        type: 'selectTile',
                                        row: tile.row,
                                        col: tile.col,
                                    });
                                }}
                            />
                        );
                    });
                })
            }
*/