import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.COLORS.COMMON.WHITE};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: ${({ width }) => width};
  height: fit-content;
  padding: ${({ pad }) => pad};
  grid-area: ${({ variant }) => variant};
  margin: auto;

`;
