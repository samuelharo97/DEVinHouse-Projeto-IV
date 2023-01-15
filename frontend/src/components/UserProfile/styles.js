import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 28px;

  > h3 {
    color: ${({ theme }) => theme.COLORS.PRIMARY.MAIN};
    text-align: center;
  }

  > div {
    display: flex;
    gap: 12px;

    > div {
      display: flex;
      flex-direction: column;
      > section {
        color: ${({ theme }) => theme.COLORS.SECONDARY.DARK};
        border-bottom: 1px solid ${({ theme }) => theme.COLORS.SECONDARY.DARK};
        width: 100%;
      }
    }
    > img {
      height: 66px;
      width: 66px;
      border-radius: 50%;

      border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY.DARK};
      background-color: ${({ theme }) => theme.COLORS.COMMON.GRAY};
    }
  }
`;

export const LinkButton = styled(Link)`
  width: 140px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY.MAIN};
  color: ${({ theme }) => theme.COLORS.COMMON.WHITE};
  height: 40px;
  border: 0;
  padding: 10px 0;
  margin: 16px 30px;
  border-radius: 50px;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;
  text-align: center;
  align-self: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
