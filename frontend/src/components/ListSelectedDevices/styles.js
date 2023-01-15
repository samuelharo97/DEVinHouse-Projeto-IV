import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 95%;
  margin: auto;
  list-style: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 1390px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 970px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 1800px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Container = styled.div`
  grid-area: content;
`;
