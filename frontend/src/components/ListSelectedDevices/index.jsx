/* eslint-disable react/prop-types */
import {  Card } from '@components';
/* import PropTypes from 'prop-types'; */
import { Container, List } from './styles';

export const ListSelectedDevices = ({ products }) => {
  return (
    <Container>
      <List>
        {products.map((data) => {
          return <Card key={data.id} data={data} isSelected={data.settings.is_on} />;
        })}
      </List>
    </Container>
  );
};

/* ListSelectedDevices.propTypes = {
  products: PropTypes.array.isRequired
}; */
