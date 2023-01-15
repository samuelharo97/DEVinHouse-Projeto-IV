import { MdDarkMode, MdLightMode } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useTheme } from '@contexts';
import { darkTheme, lightTheme } from '@styles';

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme);
      localStorage.setItem('@Theme', JSON.stringify(lightTheme));
    } else {
      setTheme(darkTheme);
      localStorage.setItem('@Theme', JSON.stringify(darkTheme));
    }
  };

  return (
    <div>
      {theme === lightTheme ? (
        <MdLightMode onClick={handleToggle} />
      ) : (
        <MdDarkMode onClick={handleToggle} />
      )}
    </div>
  );
};

ToggleTheme.propTypes = {
  theme: PropTypes.bool
};
