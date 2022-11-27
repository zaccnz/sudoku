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
        'none': '#FFFBFF',
        'selected': '#73a4fa',
        'connected': '#aac7fa',
        'same': '#92b6f7',
        'invalid': '#fa9393',
        'invalid-selected': '#f77474'
    },
    'dark': {
        'none': '#1D1B1A',
        'selected': '#2e4264',
        'connected': '#232c3b',
        'same': '#2d3b54',
        'invalid': '#fa9393',
        'invalid-selected': '#f77474'
    },
}

const textColours: Record<'light' | 'dark', Record<'solid' | 'editable', string>> = {
    'light': {
        'solid': '#1D1B1A',
        'editable': '#228',
    },
    'dark': {
        'solid': '#E8E1DF',
        'editable': '#8e8ee8',
    }
};

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
                gridRow: `${tile.row % 3 + 1} / span 1`,
                gridColumn: `${tile.col % 3 + 1} / span 1`,
                '--background': getHighlight(settings, tile.valid, highlight),
                '--colour': textColours[settings.isDarkTheme ? 'dark' : 'light'][tile.solid ? 'solid' : 'editable'],
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