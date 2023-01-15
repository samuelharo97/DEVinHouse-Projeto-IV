import { ButtonText, WhiteLayer } from '@components';
import { useAuth } from '@contexts';
import PropTypes from 'prop-types';
import { ButtonContainer, Container, LinkButton } from './styles';

export const UserProfile = ({ user }) => {
  const { handleLogout } = useAuth();

  return (
    <WhiteLayer>
      <Container>
        <h3>Meu Perfil</h3>
        <div>
          <img src={user.photoUrl || './profile.png'} alt="user profile pic" />
          <div>
            <h4>{user.fullName}</h4>
            <span>{`${user.email} - ${user.phone || ''}`}</span>
          </div>
        </div>

        <div>
          <div>
            <section>Endereço</section>
            <span>{user.userAddress.zipCode}</span>
            <span>{`${user.userAddress.street} - ${user.userAddress.number} - ${user.userAddress.neighborhood} - ${user.userAddress.city} - ${user.userAddress.state}`}</span>
          </div>
        </div>

        <ButtonContainer>
          <LinkButton to={'/edit'}>EDITAR PERFIL</LinkButton>
          <LinkButton to={'/change-password'}>ALTERAR SENHA</LinkButton>
        </ButtonContainer>

        <ButtonText func={handleLogout} routeTo={'/'} title="Sair" />
      </Container>
    </WhiteLayer>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    photoUrl: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    userAddress: PropTypes.shape({
      zipCode: PropTypes.string,
      street: PropTypes.string.isRequired,
      neighborhood: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired
    })
  })
};
