import { WhiteLayer, Button, ButtonText, AbsoluteLoading } from '@components';
import { LoginForm } from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@contexts';
import { useLoader } from '@hooks';
/* import axios from 'axios';
import { useEffect } from 'react'; */

const loginSchema = yup.object().shape({
  email: yup.string().email().typeError('Digite um e-mail válido').required('Digite um e-mail'),
  password: yup
    .string()
    .required('Digite a senha')
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
});

export const Login = () => {
  const { axiosLogin } = useAuth();
  const { isLoading, loadsFor } = useLoader();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const handleLogin = (data) => {
    loadsFor(1500);
    const { email, password } = data;
    axiosLogin(email, password);
  };

  return (
    <WhiteLayer>
      <LoginForm onSubmit={handleSubmit(handleLogin)}>
        <h2>Acessar</h2>
        <div>
          <label htmlFor="email">
            E-mail <span>{errors.email?.message}</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Seu e-mail"
            {...register('email')}
          />
        </div>
        {isLoading && <AbsoluteLoading />}
        <div>
          <label htmlFor="password">
            Senha <span>{errors.password?.message}</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Sua senha"
            {...register('password')}
          />
        </div>
        <Button type={'submit'} title={'ACESSAR'} />
        <ButtonText routeTo="/register" title={'Cadastrar'} />
      </LoginForm>
    </WhiteLayer>
  );
};
