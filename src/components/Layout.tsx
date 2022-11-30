import React, { Dispatch, SetStateAction, useState } from 'react';
import { About } from './modal/About';
import { Settings } from './modal/Settings';
import { Error } from './modal/Error';
/* @ts-ignore */
import { container, footer, header, headerText, headerLinkActive, headerLinkInactive, headerLinkAnimate, main, mainContent } from './Layout.module.css'

interface Props {
    page: 'index' | 'solver',
    boardString?: string,
    children: (values: { error: string, setError: Dispatch<SetStateAction<string>> }) => React.ReactElement,
}

export const Layout: React.FC<Props> = ({ page, boardString, children }) => {
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
                        href={`${import.meta.env.BASE_URL}solver/${boardString !== undefined ? `?board=${boardString}` : ''}`}
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
                <div className={mainContent}>
                    {children({ error, setError })}
                </div>
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
            <Error
                error={error}
                setError={setError} />
            <Settings
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen} />
            <About
                aboutOpen={aboutOpen}
                setAboutOpen={setAboutOpen} />
        </div>
    )
};