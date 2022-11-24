import React from 'react';
import { Highlight, SudokuTile as Tile } from '@/game/sudoku';

/* @ts-ignore */
import { tileContainer, tileNoteContainer } from './SudokuTile.module.css';

interface TileProps {
    tile: Tile;
    onSelected: () => void;
    highlight?: Highlight;
}

const highlightColors: Record<Highlight | 'none' | 'invalid' | 'invalid-selected', string> = {
    'none': '#fff',
    'selected': '#73a4fa',
    'connected': '#aac7fa',
    'same': '#92b6f7',
    'invalid': '#fa9393',
    'invalid-selected': '#f77474'
}

const getHighlight = (valid: boolean, highlight?: Highlight): string => {
    if (valid) {
        return highlightColors[highlight ?? 'none'];
    } else {
        return highlight === 'selected' ?
            highlightColors['invalid-selected'] : highlightColors['invalid'];
    }
}

export const SudokuTile: React.FC<TileProps> = ({ tile, onSelected, highlight }) => {
    return (
        <div
            className={tileContainer}
            style={{
                gridRow: (tile.row % 3) + 1,
                gridColumn: (tile.col % 3) + 1,
                '--background': getHighlight(tile.valid, highlight),
                color: tile.solid ? '#000' : '#228',
            } as React.CSSProperties}
            onClick={() => onSelected()}
        >
            {tile.number ?
                tile.number :
                <div className={tileNoteContainer}>
                    {
                        tile.notes.map(v => {
                            return <div
                                style={{
                                    gridRow: Math.floor((v - 1) / 3) + 1,
                                    gridColumn: ((v - 1) % 3) + 1,
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                    minWidth: 0,
                                }}
                                key={`tile-${tile.row}-${tile.col}-note-${v}`}
                            >
                                {v}
                            </div>;
                        })
                    }
                </div >
            }
        </div >
    );
};