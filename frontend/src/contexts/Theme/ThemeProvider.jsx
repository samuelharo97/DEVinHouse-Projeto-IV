import { ThemeContext } from './ThemeContext';
import PropTypes from 'prop-types';
import { useLayoutEffect, useState } from 'react';
import { lightTheme } from '@styles';

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useLayoutEffect(() => {
    if (localStorage.getItem('@Theme')) {
      setTheme(JSON.parse(localStorage.getItem('@Theme')));
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node
};
