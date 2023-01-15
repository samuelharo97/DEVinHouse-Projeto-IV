import { Container, FlexibleDiv, StyledLink } from './styles';
import PropTypes from 'prop-types';
import { NavBar, ToggleTheme } from '@components';
import { Link } from 'react-router-dom';
export const Header = ({ Authenticated }) => {
  return (
    <Container>
      <div>
        <Link to={'/'}>
          <img src="logo.png" alt="company logo" />
        </Link>
        <h1>ConnectLab</h1>
      </div>
      {Authenticated ? (
        <FlexibleDiv>
          <NavBar />
          <ToggleTheme />
        </FlexibleDiv>
      ) : (
        <div>
          <StyledLink to={'/'}>LOGIN</StyledLink> <ToggleTheme />
        </div>
      )}
    </Container>
  );
};

Header.propTypes = {
  Authenticated: PropTypes.bool
};
