import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.nav`
  > ul {
    display: flex;
    align-items: center;
    list-style: none;
    .active {
      color: ${({ theme }) => theme.COLORS.SECONDARY.DARK};
      font-weight: 700;
    }
  }
`;

export const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.COLORS.COMMON.WHITE};
  height: 40px;
  border: 0;
  padding: 0 16px;
  margin-top: 16px;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  text-transform: uppercase;
  text-align: center;
  padding-top: 10px;
`;
