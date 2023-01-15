import styled from 'styled-components';

export const Formulary = styled.form`
  color: ${({ theme }) => theme.COLORS.PRIMARY.DARK};

  h2 {
    color: ${({ theme }) => theme.COLORS.PRIMARY.MAIN};
    text-align: center;
    padding-bottom: 28px;
  }

  text-align: center;

  label {
    text-align: left;
    > span {
      color: red;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 28px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 10px;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 20px;

  input {
    width: 330px;
    height: 35px;
    border-radius: 5px;
    border: 0.5px solid ${({ theme }) => theme.COLORS.SECONDARY.LIGHT};
    background-color: ${({ theme }) => theme.COLORS.COMMON.WHITE};
    color: ${({ theme }) => theme.COLORS.COMMON.BLACK};
    padding-left: 10px;
  }
  input:focus {
    border: none;
    outline: 1px solid ${({ theme }) => theme.COLORS.PRIMARY.MAIN};
  }
  > span {
    color: red;
  }

  @media (max-width: 850px) {
    input {
      width: 250px;
    }
  }

  @media (max-width: 650px) {
    input {
      width: 150px;
    }
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const HiddenInput = styled.div`
  display: none;
`;