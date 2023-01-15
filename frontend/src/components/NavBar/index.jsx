import { Container, StyledLink } from './styles';

export const NavBar = () => {
  return (
    <Container>
      <ul>
        <li>
          <StyledLink to={'/'}> Inicio </StyledLink>
        </li>
        <li>
          <StyledLink to={'/devices'}> Dispositivos </StyledLink>
        </li>
        <li>
          <StyledLink to={'/profile'}> Perfil </StyledLink>
        </li>
      </ul>
    </Container>
  );
};
