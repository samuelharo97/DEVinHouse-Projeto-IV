/* eslint-disable react-hooks/exhaustive-deps */
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAxios } from '@hooks';
import { toast } from 'react-toastify';

export const AuthProvider = ({ children }) => {
  const URL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const token = localStorage.getItem('@Token');
  const id = localStorage.getItem('@ID');
  const { axiosGetUserDevices } = useAxios();

  const [allDevices, setAllDevices] = useState([]);

  const getDevices = useCallback(() => {
    axiosGetUserDevices().then((res) => {
      setAllDevices(res.data);
    });
  }, [axiosGetUserDevices]);

  const checkLogin = () => {
    if (token) {
      axiosGetUser(id);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const axiosLogin = async (usuario, senha) => {
    const user = {
      email: usuario,
      password: senha
    };
    try {
      const res = await axios.post(`${URL}auth/login`, user);
      localStorage.setItem('@Token', res.data.token);
      localStorage.setItem('@ID', res.data.user.id);
      toast.success('Usuário autenticado');
      axiosGetUser(res.data.user.id);
    } catch (err) {
      toast.error('Falha no login, tente outra senha ou e-mail');
      return console.error(err);
    }
  };

  const axiosGetUser = (userId) => {
    const token = localStorage.getItem('@Token');

    if (!token) {
      throw new Error('Token not found');
    }
    const id = userId;

    axios
      .get(`${URL}users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setUser(res.data);
        setAuth(true);
      });
  };

  const axiosChangePassword = (data) => {
    const token = localStorage.getItem('@Token');
    const id = localStorage.getItem('@ID');
    const config = {
      email: user.email,
      old_password: data.old_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password
    };
    axios
      .patch(`${URL}users/${id}`, config, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => toast.success('Senha alterada com sucesso.'))
      .catch((err) => {
        console.log(err);
        toast.error('Falha ao alterar a senha, tente novamente.');
      });
  };

  const axiosUpdateUser = async (data) => {
    const id = localStorage.getItem('@ID');
    const token = localStorage.getItem('@Token');
    if (!token || !id) {
      throw new Error('User not found');
    }
    const updatedUser = {
      email: data.email,
      fullName: data.fullName,
      photoUrl: data.photoUrl || null,
      phone: data.phone || null,

      userAddress: {
        zipCode: data.zipCode,
        street: data.street,
        number: data.number,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state || null,
        complement: data.complement || null
      }
    };
    try {
      await axios.put(`${URL}users/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      toast.error('Falha ao atualizar o perfil, tente novamente!');
    }
  };

  const handleLogout = () => {
    localStorage.clear('@Token');
    localStorage.clear('@ID');
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        auth,
        setAuth,
        handleLogout,
        axiosLogin,
        axiosGetUser,
        axiosUpdateUser,
        allDevices,
        getDevices,
        axiosChangePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node
};
