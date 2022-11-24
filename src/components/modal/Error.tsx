import React, { Dispatch, SetStateAction } from 'react';

/* @ts-ignore */
import { errorClose, errorContainer, errorRow, errorText, errorTitle } from './Error.module.css';

interface ErrorProps {
    error: string,
    setError: Dispatch<SetStateAction<string>>,
}

export const Error: React.FC<ErrorProps> = ({ error, setError }) => {

    return (
        <div className={errorContainer}>
            <div className={errorRow}>
                <h1 className={errorTitle}>⚠️ error</h1>
                <div className={errorClose} onClick={() => setError('')}>
                    x
                </div>
            </div>
            <p className={errorText}>{error}</p>
        </div>
    )
}