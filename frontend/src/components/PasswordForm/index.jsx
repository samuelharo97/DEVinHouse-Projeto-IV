/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { validPassword } from '@utils';
import { useAuth } from '@contexts';
import { ButtonContainer, Formulary, InputContainer, InputWrapper } from './styles';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonText, WhiteLayer } from '@components';

const message = 'Campo obrigatório';

const schema = yup.object().shape({
  old_password: yup.string().required(message),
  new_password: yup
    .string()
    .matches(validPassword, 'A senha deve conter: letras, números e caracteres especiais')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .required(message),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'As senhas não correspondem')
    .typeError('As senhas não correspondem')
    .required(message)
});

export const PasswordForm = ({ children }) => {
  const { axiosChangePassword } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const submitForm = (data) => {
    axiosChangePassword(data);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <WhiteLayer>
      <Formulary onSubmit={handleSubmit(submitForm)}>
        <InputWrapper>
          <InputContainer>
            <label htmlFor="old_password">
              Senha antiga* <span>{errors.old_password?.message}</span>
            </label>
            <input
              type="password"
              placeholder="Sua senha"
              name="old_password"
              id="old_password"
              {...register('old_password')}
            />
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <InputContainer>
            <label htmlFor="new_password">
              Nova senha* <span>{errors.new_password?.message}</span>
            </label>
            <input
              type="password"
              placeholder="Nova senha"
              name="new_password"
              id="new_password"
              {...register('new_password')}
            />
          </InputContainer>
        </InputWrapper>
        <InputWrapper>
          <InputContainer>
            <label htmlFor="confirm_password">
              Confirmar senha* <span>{errors.confirm_password?.message}</span>
            </label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              name="confirm_password"
              id="confirm_password"
              {...register('confirm_password')}
            />
          </InputContainer>
        </InputWrapper>
        <ButtonContainer>
          <Button title="CONFIRMAR" type="submit"></Button>
          <ButtonText routeTo={'/profile'} title={'Cancelar'} />
        </ButtonContainer>
      </Formulary>
    </WhiteLayer>
  );
};
