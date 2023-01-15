import styled from 'styled-components';

export const FilterBtn = styled.button`
  width: fit-content;
  padding: 0 5px;
  height: 30px;
  background: ${({ theme, active }) => (active ? theme.COLORS.PRIMARY.LIGHT : 'transparent')};
  color: ${({ theme, active }) => (active ? theme.COLORS.COMMON.WHITE : theme.COLORS.PRIMARY.MAIN)};
  border: 0.5px solid ${({ theme }) => theme.COLORS.PRIMARY.LIGHT};
`;
