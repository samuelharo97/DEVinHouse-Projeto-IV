import { UserProfile } from '@components';
import { useAuth } from '@contexts';
import { Container } from './styles';

export const MyProfile = () => {
  const { user } = useAuth();

  return (
    <Container>
      <UserProfile user={user} />
    </Container>
  );
};
