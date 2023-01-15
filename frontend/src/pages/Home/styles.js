import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  padding-top: 150px;
  grid-template-rows: 105px, 215px, 30px auto;
  grid-template-areas:
    'temperature'
    'filter'
    'content';

  grid-row-gap: 20px;
`;

export const Footer = styled.footer`
  height: 100px;
  width: 100%;
`;

export const Group = styled.div`
  grid-area: content;
  text-align: center;
  width: 90%;
  justify-content: center;
  margin: auto;
  > ul,
  li {
    list-style: none;
  }
`;

export const FilterContainer = styled.div`
  height: 30px;
  width: 78%;
  grid-area: filter;
  margin: 15px auto;
  display: flex;
  gap: 10px;
`;
