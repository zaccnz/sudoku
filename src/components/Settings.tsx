import React from 'react';
import { settingsBackdrop, settingsClose, settingsContainer, settingsRow, settingsText, settingsTitle } from './Settings.module.css';

interface SettingsProps {
    setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Settings: React.FC<SettingsProps> = ({ setSettingsOpen }) => {
    return (
        <div className={settingsBackdrop}>
            <div className={settingsContainer}>
                <div className={settingsRow}>
                    <h1 className={settingsTitle}>settings</h1>
                    <div className={settingsClose} onClick={() => setSettingsOpen(false)}>
                        x
                    </div>
                </div>
                <p>sorry... for the moment these do nothing!</p>
                <div className={settingsRow}>
                    <p className={settingsText}>use system theme</p>
                    <input
                        type='checkbox'
                        ref={null}
                        checked={true}
                        onChange={() => { }}
                    />
                </div>
                <div className={settingsRow}>
                    <p className={settingsText}>dark theme</p>
                    <input
                        type='checkbox'
                        ref={null}
                        checked={true}
                        onChange={() => { }}
                    />
                </div>
                <div className={settingsRow}>
                    <p className={settingsText}>use buttons for number input</p>
                    <input
                        type='checkbox'
                        ref={null}
                        checked={true}
                        onChange={() => { }}
                    />
                </div>
            </div>
        </div>
    )
}