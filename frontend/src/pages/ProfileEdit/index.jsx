import { Button, ButtonText, EditProfile } from '@components';
import { Container } from './styles';

export const ProfileEdit = () => {
  return (
    <Container>
      <EditProfile title="Editar Perfil">
        <Button color={'primary'} title={'SALVAR'} type={'submit'} />
        <ButtonText routeTo={'/profile'} title={'Cancelar'} />
      </EditProfile>
    </Container>
  );
};
