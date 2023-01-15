/* eslint-disable react-hooks/exhaustive-deps */
import { AbsoluteLoading, Button, Icon, WhiteLayer } from '@components';
import { useAxios, useLoader } from '@hooks';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, FlexColumnDiv, FlexRowDiv } from './styles';
export const DeviceDetails = ({ product }) => {
  const { axiosUpdateDeviceStatus, axiosDeleteUserDevice } = useAxios();
  const [status, setStatus] = useState(true);
  const { loadsFor, isLoading } = useLoader();
  useEffect(() => {
    if (product.settings.is_on) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, []);

  const navigate = useNavigate();

  const deleteDevice = () => {
    const confirmed = confirm(
      `Tem certeza que deseja remover ${product.device.name} dos seus dispositivos?`
    );
    if (confirmed) {
      axiosDeleteUserDevice(product.id);
      loadsFor(1000);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  useEffect(() => loadsFor(2000), [status]);

  const updateStatus = () =>
    axiosUpdateDeviceStatus(product)
      .then((res) => {
        toast.success(`${product.device.name} foi ${!status ? 'ligado' : 'desligado'} com sucesso`);
        setStatus((prev) => {
          return !prev;
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Falha na atualização');
      });

  return (
    <WhiteLayer>
      <Container>
        <FlexColumnDiv>
          <h3>{product.device.name}</h3>
          <span>{product.device.madeBy}</span>
        </FlexColumnDiv>

        <img src={product.device.photoUrl} alt={`${product.device.name}`} />
        <FlexRowDiv>
          <h5>Dispositivo {status ? 'Ligado' : 'Desligado'}</h5>
          <Icon handleSwitch={() => updateStatus()} selected={status} />
        </FlexRowDiv>
        {isLoading && <AbsoluteLoading />}
        <aside>
          <section>Informações do dispositivo</section>
          <p>
            ID virtual: <span>{product.info.virtual_id}</span>
          </p>
          <p>
            Endereço IP: <span>{product.info.ip_address}</span>
          </p>
          <p>
            Endereço MAC: <span>{product.info.mac_address}</span>
          </p>
          <p>
            Força do sinal: <span>{product.info.signal}</span>
          </p>
        </aside>
        <Button title="Remover" func={deleteDevice} />
      </Container>
    </WhiteLayer>
  );
};

DeviceDetails.propTypes = {
  product: PropTypes.shape({
    settings: PropTypes.shape({
      room: PropTypes.string,
      is_on: PropTypes.bool,
      location: PropTypes.string
    }),
    id: PropTypes.string,
    device: PropTypes.shape({
      photoUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      madeBy: PropTypes.string.isRequired
    }),
    info: PropTypes.shape({
      virtual_id: PropTypes.string.isRequired,
      ip_address: PropTypes.string.isRequired,
      signal: PropTypes.string,
      mac_address: PropTypes.string.isRequired
    })
  })
};
