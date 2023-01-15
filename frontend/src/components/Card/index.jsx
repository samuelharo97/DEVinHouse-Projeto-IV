import { Icon } from '@components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Container, InfoIcon, List } from './styles';
import { FaInfoCircle } from 'react-icons/fa';
import { useAxios } from '@hooks';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export const Card = ({ data }) => {
  const { axiosUpdateDeviceStatus } = useAxios();
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const updateStatus = () =>
    axiosUpdateDeviceStatus(data)
      .then((res) => {
        toast.success(`${data.device.name} foi ${!status ? 'ligado' : 'desligado'} com sucesso`);
        setStatus((prev) => {
          return !prev;
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Falha na atualização');
      });

  const checkStatus = () => {
    if (data.settings.is_on) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  useEffect(() => {
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List>
      <Container>
        <img src={data.device.photoUrl} alt="IOT device" />
        <div>
          <h5>{data.device.name}</h5>
          <div>
            <p>{`${data.settings.location} | ${data.settings.room} | ${status ? 'ON' : 'OFF'}`}</p>
          </div>
          <InfoIcon>
            <FaInfoCircle onClick={() => navigate(`details/${data.id}`)} />
          </InfoIcon>
        </div>

        <Icon handleSwitch={() => updateStatus()} selected={status} />
      </Container>
    </List>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    device: PropTypes.shape({
      name: PropTypes.string.isRequired,
      photoUrl: PropTypes.string.isRequired
    }),
    settings: PropTypes.shape({
      room: PropTypes.string,
      is_on: PropTypes.bool,
      location: PropTypes.string
    })
  }),
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func
};
