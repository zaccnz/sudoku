/* @ts-ignore */
import { container, header, headerText } from './Layout.module.css'

interface Props {
    page: 'index' | 'solver',
    children?: React.ReactNode,
}

export const Layout: React.FC<Props> = ({ page, children }) => {

    return (
        <div className={container}>
            <header className={header}>
                <h1 className={headerText}>
                    sudoku{page === 'solver' && <span>{' '}solver</span>}
                </h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>made by zac</p>
                <p>2022</p>
            </footer>
        </div>
    )
};