import React, { useContext } from 'react';
import { Highlight, SudokuTile as Tile } from '@/game/sudoku';

/* @ts-ignore */
import { tileContainer, tileNoteContainer, tileNumberContainer, tileText } from './SudokuTile.module.css';
import { Settings, SettingsContext } from '@/providers/SettingsProvider';

interface TileProps {
    tile: Tile;
    onSelected: () => void;
    highlight?: Highlight;
}

const highlightColors: Record<'light' | 'dark', Record<Highlight | 'none' | 'invalid' | 'invalid-selected', string>> = {
    'light': {
        'none': '#fff',
        'selected': '#73a4fa',
        'connected': '#aac7fa',
        'same': '#92b6f7',
        'invalid': '#fa9393',
        'invalid-selected': '#f77474'
    },
    'dark': {
        'none': '#000',
        'selected': '#73a4fa',
        'connected': '#aac7fa',
        'same': '#92b6f7',
        'invalid': '#fa9393',
        'invalid-selected': '#f77474'
    },
}

const getHighlight = (settings: Settings, valid: boolean, highlight?: Highlight): string => {
    const theme = settings.isDarkTheme ? 'dark' : 'light';
    if (!valid && settings.highlightInvalid) {
        return highlight === 'selected' ?
            highlightColors[theme]['invalid-selected'] : highlightColors[theme]['invalid'];
    } else {
        if (highlight === 'connected' && !settings.highlightConnected) {
            return highlightColors[theme]['none'];
        }
        return highlightColors[theme][highlight ?? 'none'];
    }
}

export const SudokuTile: React.FC<TileProps> = ({ tile, onSelected, highlight }) => {
    const settings = useContext(SettingsContext);

    return (
        <div
            className={tileContainer}
            style={{
                gridRow: `${tile.row + 1} / span 1`,
                gridColumn: `${tile.col + 1} / span 1`,
                '--background': getHighlight(settings, tile.valid, highlight),
                color: tile.solid ? (settings.isDarkTheme ? '#fff' : '#000') : '#228',
            } as React.CSSProperties}
            onClick={() => onSelected()}
        >
            {tile.number ?
                <div className={tileNumberContainer}>
                    {tile.number}
                </div> :
                <div className={tileNoteContainer}>
                    {
                        tile.notes.map(v => {
                            return <div
                                style={{
                                    gridRow: `${Math.floor((v - 1) / 3) + 1} / span 1`,
                                    gridColumn: `${((v - 1) % 3) + 1} / span 1`,
                                    textAlign: 'center',
                                    overflow: 'hidden',
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