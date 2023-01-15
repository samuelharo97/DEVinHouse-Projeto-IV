import styled from 'styled-components';

export const LoginForm = styled.form`
  grid-area: content;

  color: ${({ theme }) => theme.COLORS.PRIMARY.DARK};
  display: flex;
  flex-direction: column;
  gap: 28px;

  > h2 {
    color: ${({ theme }) => theme.COLORS.PRIMARY.MAIN};
    text-align: center;
  }

  label {
    text-align: left;
    > span {
      color: red;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  input {
    width: 330px;
    height: 35px;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.COLORS.PRIMARY.MAIN};
    border: 0.5px solid ${({ theme }) => theme.COLORS.SECONDARY.LIGHT};
    background-color: ${({ theme }) => theme.COLORS.COMMON.WHITE};
    padding-left: 8px;
  }
`;
