import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 120px;
  justify-content: space-evenly;
  align-items: center;

  > img {
    width: 80px;
    height: 80px;
  }
  > div {
    display: flex;
    flex-direction: column;
  }

  h5 {
    margin-top: 20px;
  }

  div > div:nth-child(3) {
    margin-top: 20px;
  }

  > svg {
    margin-left: 15px;
  }
`;

export const List = styled.li`
  display: list-item;
  background: ${({ theme }) => theme.COLORS.COMMON.WHITE};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: fit-content;
  width: 400px;
  margin: auto;
  padding: 20px;
`;

export const InfoIcon = styled.div`
  svg {
    color: ${({ theme }) => theme.COLORS.INFO.DARK};
    height: 20px;
    width: 20px;

    &:hover {
      cursor: pointer;
    }
  }
`;
