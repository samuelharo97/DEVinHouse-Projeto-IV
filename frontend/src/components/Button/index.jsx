import PropTypes from 'prop-types';
import { Container } from './styles';

export const Button = ({
  title,
  color = 'primary',
  func,
  disable = false,
  type = 'button',
  children
}) => {
  return (
    <Container disabled={disable} onClick={func} color={color} type={type}>
      {title}
      {children}
    </Container>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  func: PropTypes.func,
  disable: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node
};
