import { SudokuAction } from '@/game/reducer';
import { Sudoku, SudokuTile as Tile } from '@/game/sudoku';
import React, { useEffect, useRef } from 'react';
import { gridContainer, gridBox } from './SudokuGrid.module.css';
import { SudokuTile } from './SudokuTile';

interface SudokuGridProps {
    sudoku: Sudoku;
    dispatch: React.Dispatch<SudokuAction>,
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({ sudoku, dispatch }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const onKeyDown = (event: KeyboardEvent) => {
        if (sudoku.selected) {
            console.log(event.key);
            if ('123456789'.indexOf(event.key) >= 0) {
                dispatch({
                    type: 'setNumber',
                    number: parseInt(event.key),
                });
            } else if (event.key === '0' || event.key === ' ' || event.key === 'Backspace' || event.key === 'Delete') {
                dispatch({
                    type: 'setNumber'
                });
            }
        }
    }

    const onMouseDown = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            dispatch({
                type: 'deselect'
            });
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onMouseDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', onMouseDown);
        }
    });

    const boxed: Tile[][][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((v, i) => {
        return v.map((_, j) => {
            return new Array(9).fill(0).map((_, index) => {
                return sudoku.grid[i * 3 + Math.floor(index / 3)][j * 3 + index % 3];
            });
        });
    });

    return (
        <div
            className={gridContainer}
            ref={containerRef}
        >
            {
                boxed.map((row, y) => {
                    return row.map((tiles, x) => {
                        return (
                            <div
                                key={`box-${x}-${y}`}
                                className={gridBox}
                                style={{ "--x": x, "--y": y } as React.CSSProperties}
                            >
                                {
                                    tiles.map(tile => {
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
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                })
            }
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