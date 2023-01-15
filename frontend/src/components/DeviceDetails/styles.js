import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;

  img {
    width: 100px;
    height: 100px;
  }

  section {
    color: ${({ theme }) => theme.COLORS.SECONDARY.MAIN};
    font-weight: 700;
    font-size: 20px;
    line-height: 21px;
    border-bottom: 0.5px solid ${({ theme }) => theme.COLORS.SECONDARY.LIGHT};
  }

  aside {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h5 {
    color: ${({ theme }) => theme.COLORS.SECONDARY.LIGHT};
    font-weight: 700;
    font-size: 19px;
    line-height: 21px;
  }

  p {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: ${({ theme }) => theme.COLORS.SECONDARY.LIGHT};
    > span {
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
    }
  }
`;

export const FlexRowDiv = styled.div`
  display: flex;
  text-align: center;
  gap: 28px;
  align-items: center;
`;
export const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px;
`;
