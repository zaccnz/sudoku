import { controlsContainer, gameStateContainer, gameControlsContainer } from './Controls.module.css';

export const Controls: React.FC = () => {
    return (
        <div className={controlsContainer}>
            <div className={gameStateContainer}>
                <p>
                    New Game
                </p>
            </div>
            <div className={gameControlsContainer}>
                <button>undo</button>
                <button>redo</button>
                <button>clear tile</button>
                <button>reset</button>
            </div>
        </div>
    );
};