import React, { Dispatch, SetStateAction, useState } from 'react';
import { About } from './modal/About';
/* @ts-ignore */
import { container, footer, header, headerText, headerLinkActive, headerLinkInactive, headerLinkAnimate, main } from './Layout.module.css'
import { Settings } from './modal/Settings';
import { Error } from './modal/Error';

interface Props {
    page: 'index' | 'solver',
    children: (values: { error: string, setError: Dispatch<SetStateAction<string>> }) => React.ReactElement,
}

export const Layout: React.FC<Props> = ({ page, children }) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [error, setError] = useState('');

    return (
        <div className={container}>
            <header className={header}>
                <h1 className={headerText}>
                    <a
                        href={`${import.meta.env.BASE_URL}`}
                        style={{ flex: '1 1 0px', textAlign: 'right' }}
                        className={page === 'index' ? headerLinkActive : headerLinkInactive}
                    >
                        <span className={page === 'solver' ? headerLinkAnimate : ''} style={{ direction: 'rtl' }}>
                            sudoku
                        </span>
                    </a>
                    <a
                        href={`${import.meta.env.BASE_URL}solver/`}
                        style={{ flex: '1 1 0px' }}
                        className={page === 'solver' ? headerLinkActive : headerLinkInactive}
                    >
                        <span className={page === 'index' ? headerLinkAnimate : ''}>
                            solver
                        </span>
                    </a>
                </h1>
            </header>
            <main className={main}>
                {children({ error, setError })}
            </main>
            <footer className={footer}>
                <p>zac, 2022</p>
                <p>
                    <a onClick={() => setAboutOpen(true)} style={{ cursor: 'pointer' }}>about</a>
                    {', '}
                    <a onClick={() => setSettingsOpen(true)} style={{ cursor: 'pointer' }}>settings</a>
                    {', '}
                    <a href="https://github.com/zaccnz/sudoku/">source code</a>
                </p>
            </footer>
            {error.length > 0 && <Error error={error} setError={setError} />}
            {settingsOpen && <Settings setSettingsOpen={setSettingsOpen} />}
            {aboutOpen && <About setAboutOpen={setAboutOpen} />}
        </div>
    )
};