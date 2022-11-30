import React from 'react';
import { Modal } from './Modal';

/* @ts-ignore */
import { aboutHeader, aboutRow, aboutSpan, aboutText } from './About.module.css';

interface AboutProps {
    aboutOpen: boolean,
    setAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const About: React.FC<AboutProps> = ({ aboutOpen, setAboutOpen }) => {
    return (
        <Modal open={aboutOpen} setOpen={setAboutOpen} title='📖 about'>
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
                <p className={aboutText}>
                    <span className={aboutSpan}>easy: 10-19 missing tiles.</span>
                    <span className={aboutSpan}>medium: 20-29 missing tiles.</span>
                    <span className={aboutSpan}>hard: 30-39 missing tiles.</span>
                    <span className={aboutSpan}>harder: 40-58 missing tiles.</span>
                </p>
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
        </Modal >
    )
}