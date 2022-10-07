import React, { createContext, useEffect, useReducer } from 'react';

export const ThemeContext = createContext();

const initialState = {
  darkMode: localStorage.getItem('theme') === true ? true : false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'LIGHTMODE':
      localStorage.setItem('theme', false);
      return { ...state, darkMode: false };
    case 'DARKMODE':
      localStorage.setItem('theme', true);
      return { ...state, darkMode: true };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    const Theme = localStorage.getItem('theme');
    if (Theme && Theme === 'true') {
      dispatch({ type: 'DARKMODE' });
    }
  }, []);

  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
}

function useDarkState() {
  var context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('Text must be used within a ThemeProvider');
  }

  return context;
}

export { useDarkState };
