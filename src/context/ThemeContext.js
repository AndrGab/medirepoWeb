import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
    darkMode: localStorage.getItem("theme"),
};

const themeReducer = (state, action) => {
    switch (action.type) {
        case "LIGHTMODE":
            localStorage.setItem('theme', false);
            return { darkMode: false };
        case "DARKMODE":
            localStorage.setItem('theme', true);
            return { darkMode: true };
        default:
            return state;
    }
};

export function ThemeProvider(props) {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>;
}