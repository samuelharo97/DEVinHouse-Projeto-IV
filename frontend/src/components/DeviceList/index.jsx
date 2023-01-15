import { AddDeviceCard, Loading } from '@components';
import { useAxios } from '@hooks';
import { useEffect, useState } from 'react';
import { Container, InputWrapper, List } from './styles';

export const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [locations, setLocations] = useState([]);
  const { axiosGetDevices, axiosGetLocations } = useAxios();
  const [search, setSearch] = useState('');

  useEffect(() => {
    axiosGetDevices().then((res) => setDevices(res));
    axiosGetLocations().then((res) => setLocations(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredDevices =
    search.length > 0
      ? devices.filter((device) => device.name.toLowerCase().includes(search.toLowerCase()))
      : [];

  return (
    <Container>
      <InputWrapper>
        <label htmlFor="search">Nome do dispositivo</label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Buscar pelo nome do dispositivo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputWrapper>

      {search.length > 0 ? (
        <List>
          {filteredDevices.map((device) => (
            <AddDeviceCard key={device._id} device={device} locations={locations} />
          ))}
        </List>
      ) : devices ? (
        <List>
          {devices.map((device) => (
            <AddDeviceCard key={device._id} device={device} locations={locations} />
          ))}
        </List>
      ) : (
        <Loading />
      )}
    </Container>
  );
};
