/* eslint-disable react-hooks/exhaustive-deps */
import { DeviceDetails, AbsoluteLoading } from '@components';
import { useAxios, useLoader } from '@hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, FreeSpace } from './styles';

export const Details = () => {
  const { id } = useParams();
  const { axiosGetDeviceById } = useAxios();
  const { isLoading, loadsFor } = useLoader();
  const [device, setDevice] = useState();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    loadsFor(3000);
    axiosGetDeviceById(id).then((res) => {
      setDevice(res.data);
      setFetched(true);
    });
  }, []);

  return isLoading ? (
    <Container>
      <AbsoluteLoading />
    </Container>
  ) : (
    <>
      <Container>{fetched ? <DeviceDetails product={device} /> : <AbsoluteLoading />}</Container>{' '}
      <FreeSpace />
    </>
  );
};
