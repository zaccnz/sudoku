import React, { createContext, useEffect, useState } from 'react';

export interface Settings {
    /* preferences */
    darkTheme: boolean;
    useSystemTheme: boolean;
    confetti: boolean;
    highlightConnected: boolean;
    highlightInvalid: boolean;
    forwardDelay: number,
    backDelay: number,

    /* state */
    isDarkTheme: boolean;
    loaded: boolean;
}

const InitialSettings: Settings = {
    darkTheme: false,
    useSystemTheme: true,
    confetti: true,
    highlightConnected: true,
    highlightInvalid: true,
    forwardDelay: 100,
    backDelay: 50,
    isDarkTheme: false,
    loaded: false,
};

const colourSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const loadBoolean = (settings: Settings, key: keyof Settings) => {
    const setting = localStorage.getItem(`sudoku.${key}`);
    setting && ((settings[key] as boolean) = setting === 'true');
}

const loadInt = (settings: Settings, key: keyof Settings) => {
    const setting = localStorage.getItem(`sudoku.${key}`);
    setting && ((settings[key] as number) = parseInt(setting));
}

const findExistingSettings = (): Settings => {
    const settings = { ...InitialSettings };

    loadBoolean(settings, 'darkTheme');
    loadBoolean(settings, 'useSystemTheme');
    loadBoolean(settings, 'confetti');
    loadBoolean(settings, 'highlightConnected');
    loadBoolean(settings, 'highlightInvalid');
    loadInt(settings, 'forwardDelay');
    loadInt(settings, 'backDelay');

    settings.loaded = true;

    return settings;
};

const saveSettings = (settings: Settings) => {
    if (!settings.loaded) {
        return;
    }
    localStorage.setItem(`sudoku.darkTheme`, `${settings.darkTheme}`);
    localStorage.setItem(`sudoku.useSystemTheme`, `${settings.useSystemTheme}`);
    localStorage.setItem(`sudoku.confetti`, `${settings.confetti}`);
    localStorage.setItem(`sudoku.highlightConnected`, `${settings.highlightConnected}`);
    localStorage.setItem(`sudoku.highlightInvalid`, `${settings.highlightInvalid}`);
    localStorage.setItem(`sudoku.forwardDelay`, `${settings.forwardDelay}`);
    localStorage.setItem(`sudoku.backDelay`, `${settings.backDelay}`);
    return;
};


type UpdateSettings = React.Dispatch<React.SetStateAction<Settings>>;

export const SettingsContext = createContext<Settings & { updateSettings: UpdateSettings }>({ ...InitialSettings, updateSettings: () => undefined });

interface SettingsProviderProps {
    children?: React.ReactNode,
}

export const SettingsProvider: React.FC<SettingsProviderProps> = (props) => {
    const [settings, setSettings] = useState<Settings>(InitialSettings);
    const [systemDarkMode, setSystemDarkMode] = useState(colourSchemeMediaQuery.matches);

    const updateBrowserTheme = (event: MediaQueryListEvent) => {
        setSystemDarkMode(event.matches);
    };

    useEffect(() => {
        setSettings(findExistingSettings);

        colourSchemeMediaQuery.addEventListener('change', updateBrowserTheme);

        return () => {
            colourSchemeMediaQuery.removeEventListener('change', updateBrowserTheme);
        };
    }, []);

    useEffect(() => {
        if (settings.useSystemTheme) {
            if (systemDarkMode !== settings.isDarkTheme)
                setSettings(s => {
                    const state = { ...s };
                    state.isDarkTheme = systemDarkMode;
                    return state;
                });
        } else {
            if (settings.darkTheme !== settings.isDarkTheme)
                setSettings(s => {
                    const state = { ...s };
                    state.isDarkTheme = settings.darkTheme;
                    return state;
                });
        }
    }, [settings.darkTheme, settings.useSystemTheme, systemDarkMode]);

    useEffect(() => {
        if (settings.isDarkTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [settings.isDarkTheme]);

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ ...settings, updateSettings: setSettings }}>
            {props.children}
        </SettingsContext.Provider>
    );
};