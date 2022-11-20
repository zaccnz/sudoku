import { numbersContainer, number } from './Numbers.module.css';

export const Numbers: React.FC = () => {
    const numbers = new Array(9).fill(0).map((_, v) => v + 1);
    return (
        <div className={numbersContainer}>
            {
                numbers.map(n => {
                    return (
                        <div
                            className={number}
                            key={`number-input-${n}`}
                        >
                            {n}
                        </div>
                    );
                })
            }
        </div>
    );
};