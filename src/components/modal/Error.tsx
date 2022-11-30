import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from './Modal';

/* @ts-ignore */
import { errorText } from './Error.module.css';

interface ErrorProps {
    error: string,
    setError: Dispatch<SetStateAction<string>>,
}

export const Error: React.FC<ErrorProps> = ({ error, setError }) => {
    return (
        <Modal open={error.length > 0} setOpen={(open) => open ? alert('error') : setError('')} title='⚠️ error'>
            <p className={errorText}>{error}</p>
        </Modal>
    )
}