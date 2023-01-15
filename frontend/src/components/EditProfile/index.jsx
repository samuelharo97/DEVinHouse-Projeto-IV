/* eslint-disable react-hooks/exhaustive-deps */
import { Formulary, InputWrapper, InputContainer, ActionWrapper, HiddenInput } from './styles';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { WhiteLayer } from '@components';
import { useAuth } from '@contexts';
import { useEffect } from 'react';
import { phoneMask, phoneNumber } from '@utils';
import { fetchZipcode } from '@services';
import { useNavigate } from 'react-router-dom';

const message = 'Campo obrigatório';

const schema = yup.object().shape({
  email: yup.string().email().typeError('Digite um e-mail válido.').required(message),
  fullName: yup.string().required(message).max(80, 'No máximo 80 caracteres'),
  photoUrl: yup.string().typeError('URL Inválida').url(),
  street: yup.string().required(message),
  phone: yup.string().matches(phoneNumber).min(15, 'Celular deve conter 11 números').max(15),
  zipCode: yup
    .string()
    .matches(/^[0-9]+$/, 'O CEP deve conter 8 números, sem barra (-)')
    .min(8, 'O CEP deve conter 8 números')
    .max(8, 'O CEP deve conter 8 números')
    .required(message),
  number: yup.number().typeError(message).required(message),
  neighborhood: yup.string().required(message),
  city: yup.string().required(message),
  complement: yup.string(message)
});

export const EditProfile = ({ children, title }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { axiosUpdateUser, user } = useAuth();

  const findZipcode = (e) => {
    fetchZipcode(e)
      .then((res) => res.json())
      .then((data) => {
        setValue('street', data.logradouro);
        setValue('city', data.localidade);
        setValue('neighborhood', data.bairro);
        setValue('state', data.uf);
      });
  };

  const submitForm = (data) => {
    axiosUpdateUser(data);
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  const populateForm = () => {
    setValue('fullName', user.fullName);
    setValue('email', user.email);
    setValue('photoUrl', user.photoUrl);
    setValue('phone', user.phone);
    setValue('street', user.userAddress.street);
    setValue('number', user.userAddress.number);
    setValue('zipCode', user.userAddress.zipCode);
    setValue('city', user.userAddress.city);
    setValue('neighborhood', user.userAddress.neighborhood);
    setValue('state', user.userAddress.state);
    setValue('complement', user.userAddress.complement || '');
  };

  const phoneValue = watch('phone');

  useEffect(() => {
    populateForm();
  }, []);

  useEffect(() => {
    setValue('phone', phoneMask(phoneValue));
  }, [phoneValue]);

  return (
    <WhiteLayer>
      <Formulary onSubmit={handleSubmit(submitForm)}>
        <h2>{title}</h2>
        <InputWrapper>
          <InputContainer>
            <label htmlFor="fullName">
              Nome completo* <span>{errors.fullName?.message}</span>
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              name="fullName"
              id="fullName"
              {...register('fullName')}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="email">
              E-mail* <span>{errors.email?.message}</span>
            </label>
            <input
              type="email"
              placeholder="Seu e-mail"
              name="email"
              id="email"
              {...register('email')}
            />
          </InputContainer>
        </InputWrapper>

        <InputWrapper>
          <InputContainer>
            <label htmlFor="photoUrl">
              URL foto perfil <span>{errors.photoURL?.message}</span>
            </label>
            <input
              type="url"
              placeholder="Sua foto"
              name="photoUrl"
              id="photoUrl"
              {...register('photoUrl')}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="phone">Celular</label>
            <input
              type="tel"
              formNoValidate
              placeholder="Seu celular"
              name="phone"
              id="phone"
              {...register('phone')}
            />
          </InputContainer>
        </InputWrapper>

        <InputWrapper>
          <InputContainer>
            <label htmlFor="zipCode">
              CEP* <span>{errors.zipCode?.message}</span>
            </label>
            <input
              type="text"
              placeholder="Ex: 01153000"
              name="zipCode"
              id="zipCode"
              onBlurCapture={findZipcode}
              {...register('zipCode')}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="street">
              Logradouro/Endereço* <span>{errors.street?.message}</span>
            </label>
            <input
              type="text"
              placeholder="Seu logradouro/endereço"
              name="street"
              id="street"
              {...register('street')}
            />
          </InputContainer>
        </InputWrapper>

        <InputWrapper>
          <InputContainer>
            <label htmlFor="city">
              Cidade* <span>{errors.city?.message}</span>
            </label>
            <input
              type="text"
              placeholder="Sua cidade"
              name="city"
              id="city"
              {...register('city')}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="complement">
              Complemento <span>{errors.complement?.message}</span>
            </label>
            <input
              type="text"
              placeholder="Seu complemento"
              name="complement"
              id="complement"
              {...register('complement')}
            />
          </InputContainer>
        </InputWrapper>

        <InputWrapper>
          <InputContainer>
            <label htmlFor="number">
              Número* <span>{errors.number?.message}</span>
            </label>
            <input
              type="number"
              placeholder="Número da sua residência"
              name="number"
              id="number"
              {...register('number')}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="neighborhood">
              Bairro* <span>{errors.neighborhood?.message}</span>
            </label>
            <input
              type="text"
              placeholder="Seu bairro"
              name="neighborhood"
              id="neighborhood"
              {...register('neighborhood')}
            />
          </InputContainer>
        </InputWrapper>
        <HiddenInput>
          <input type="text" name="state" id="state" {...register('state')} />
        </HiddenInput>

        <ActionWrapper>{children}</ActionWrapper>
      </Formulary>
    </WhiteLayer>
  );
};

EditProfile.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
};
