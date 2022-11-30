import React, { Dispatch, SetStateAction } from 'react';

/* @ts-ignore */
import { modalBackdrop, modalClose, modalContainer, modalRow, modalTitle } from './Modal.module.css';

interface ModalProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    title: string,
    children?: React.ReactNode,
}

export const Modal: React.FC<ModalProps> = ({ open, setOpen, title, children }) => {

    return (
        <>
            {open && (
                <div className={modalBackdrop}>
                    <div className={modalContainer}>
                        <div className={modalRow}>
                            <h1 className={modalTitle}>{title}</h1>
                            <div className={modalClose} onClick={() => setOpen(false)}>
                                x
                            </div>
                        </div>
                        {
                            children
                        }
                    </div>
                </div>
            )}
        </>

    )
}