import React from 'react';

/* @ts-ignore */
import { aboutBackdrop, aboutClose, aboutContainer, aboutHeader, aboutRow, aboutText, aboutTitle } from './About.module.css';

interface AboutProps {
    setAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const About: React.FC<AboutProps> = ({ setAboutOpen }) => {
    return (
        <div className={aboutBackdrop}>
            <div className={aboutContainer}>
                <div className={aboutRow}>
                    <h1 className={aboutTitle}>📖 about</h1>
                    <div className={aboutClose} onClick={() => setAboutOpen(false)}>
                        x
                    </div>
                </div>
                <h3 className={aboutHeader}>
                    sudoku
                </h3>
                <div className={aboutRow}>
                    <p className={aboutText}>fill in the tiles with numbers.  enter in 1-9 in each row, column and box.</p>
                </div>
                <h3 className={aboutHeader}>
                    difficulty
                </h3>
                <div className={aboutRow}>
                    <p className={aboutText}>easy: 10-19 missing tiles.</p>
                </div>
                <div className={aboutRow}>
                    <p className={aboutText}>medium: 20-29 missing tiles.</p>
                </div>
                <div className={aboutRow}>
                    <p className={aboutText}>hard: 30-39 missing tiles.</p>
                </div>
                <div className={aboutRow}>
                    <p className={aboutText}>harder: 40-58 missing tiles.</p>
                </div>
                <h3 className={aboutHeader}>
                    controls
                </h3>
                <div className={aboutRow}>
                    <p className={aboutText}>
                        click on a tile and set it using your keyboard, or the number buttons at the bottom.{'  '}
                        to enter a note, hold 'Shift' on keyboard.{'  '}
                        to clear a tile, enter '0' or hit 'Space', 'Backspace' or 'Delete'.
                    </p>
                </div>
                <h3 className={aboutHeader}>
                    solver
                </h3>
                <div className={aboutRow}>
                    <p className={aboutText}>uses a backtracking algorithm to find the unique solution to the sudoku grid.</p>
                </div>
            </div>
        </div>
    )
}