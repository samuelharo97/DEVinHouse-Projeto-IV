/* eslint-disable react-hooks/exhaustive-deps */
import { AbsoluteLoading, DeviceList } from '@components';
import { useLoader } from '@hooks';
import { useEffect } from 'react';
import { Container, Footer, Section } from './styles';

export const Devices = () => {
  const { isLoading, loadsFor } = useLoader();

  useEffect(() => {
    loadsFor(2000);
  }, []);

  return isLoading ? (
    <AbsoluteLoading />
  ) : (
    <Container>
      <div>
        <Section>
          <h3> Dispositivos </h3>
        </Section>
      </div>
      <DeviceList />
      <Footer />
    </Container>
  );
};
