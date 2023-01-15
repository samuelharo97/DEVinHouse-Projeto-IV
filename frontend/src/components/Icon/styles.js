import styled from 'styled-components';

export const Container = styled.svg`
  fill: ${({ theme, variant }) => (variant ? theme.COLORS.SUCCESS.MAIN : theme.COLORS.COMMON.GRAY)};
  height: 40px;
  width: 40px;

  &:hover {
    cursor: pointer;
  }
`;
