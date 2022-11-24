import React, { useContext, useEffect, useRef, useState } from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';

/* @ts-ignore */
import { settingsBackdrop, settingsClose, settingsContainer, settingsError, settingsHeader, settingsRow, settingsText, settingsTitle } from './Settings.module.css';

interface SettingsProps {
    setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Settings: React.FC<SettingsProps> = ({ setSettingsOpen }) => {
    const settings = useContext(SettingsContext);

    const systemThemeCheckbox = useRef<HTMLInputElement>(null);
    const darkThemeCheckbox = useRef<HTMLInputElement>(null);
    const confettiCheckbox = useRef<HTMLInputElement>(null);

    const [forwardDelay, setForwardDelay] = useState(0);
    const [forwardDelayError, setForwardDelayError] = useState('');
    const [backDelay, setBackDelay] = useState(0);
    const [backDelayError, setBackDelayError] = useState('');

    useEffect(() => {
        if (forwardDelay !== settings.forwardDelay)
            setForwardDelay(settings.forwardDelay);
    }, [settings.forwardDelay]);

    useEffect(() => {
        if (backDelay !== settings.backDelay)
            setBackDelay(settings.backDelay);
    }, [settings.backDelay]);

    const updateSettings = () => {
        settings.updateSettings(existingState => {
            const nextState = { ...existingState };

            systemThemeCheckbox.current && (nextState.useSystemTheme = systemThemeCheckbox.current.checked);
            darkThemeCheckbox.current && (nextState.darkTheme = darkThemeCheckbox.current.checked);
            confettiCheckbox.current && (nextState.confetti = confettiCheckbox.current.checked);

            return nextState;
        });
    };

    const updateForwardDelay = (forwardDelay: number) => {
        if (isNaN(forwardDelay) || forwardDelay < 0 || forwardDelay > 200) {
            setForwardDelayError('forward delay must be a number between 0 and 200');
            return;
        } else {
            setForwardDelayError('');
        }
        setForwardDelay(forwardDelay);

        settings.updateSettings(existing => {
            existing.forwardDelay = forwardDelay;

            return { ...existing };
        });
    };

    const updateBackDelay = (backDelay: number) => {
        if (isNaN(backDelay) || backDelay < 0 || backDelay > 200) {
            setBackDelayError('back delay must be a number between 0 and 200');
            return;
        } else {
            setBackDelayError('');
        }
        setBackDelay(backDelay);

        settings.updateSettings(existing => {
            existing.backDelay = backDelay;

            return { ...existing };
        });
    };

    return (
        <div className={settingsBackdrop}>
            <div className={settingsContainer}>
                <div className={settingsRow}>
                    <h1 className={settingsTitle}>⚙️ settings</h1>
                    <div className={settingsClose} onClick={() => setSettingsOpen(false)}>
                        x
                    </div>
                </div>
                <h3 className={settingsHeader}>
                    theme
                </h3>
                <div className={settingsRow}>
                    <p className={settingsText}>use system theme</p>
                    <input
                        type='checkbox'
                        ref={systemThemeCheckbox}
                        checked={settings.useSystemTheme}
                        onChange={() => updateSettings()}
                    />
                </div>
                <div className={settingsRow}>
                    <p className={settingsText}>dark theme</p>
                    <input
                        type='checkbox'
                        ref={darkThemeCheckbox}
                        checked={settings.darkTheme}
                        disabled={settings.useSystemTheme}
                        onChange={() => updateSettings()}
                    />
                </div>
                <h3 className={settingsHeader}>
                    game
                </h3>
                <div className={settingsRow}>
                    <p className={settingsText}>confetti on win</p>
                    <input
                        type='checkbox'
                        ref={confettiCheckbox}
                        checked={settings.confetti}
                        onChange={() => updateSettings()}
                    />
                </div>
                <h3 className={settingsHeader}>
                    solver
                </h3>
                <div className={settingsRow}>
                    <p className={settingsText}>delay (ms)</p>
                    <input
                        type='number'
                        value={forwardDelay}
                        min={0}
                        max={200}
                        step={5}
                        onChange={e => updateForwardDelay(parseInt(e.target.value))}
                        style={{ width: '5em' }}
                    />
                </div>
                {forwardDelayError !== '' && <p className={settingsError}>{forwardDelayError}</p>}
                <div className={settingsRow}>
                    <p className={settingsText}>backtrack delay (ms)</p>
                    <input
                        type='number'
                        value={backDelay}
                        min={0}
                        max={200}
                        step={5}
                        onChange={e => updateBackDelay(parseInt(e.target.value))}
                        style={{ width: '5em' }}
                    />
                </div>
                {backDelayError !== '' && <p className={settingsError}>{backDelayError}</p>}
            </div>
        </div>
    )
}