import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  align-self: center;
  padding: 40px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  div {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 28px;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 20px;
  select,
  input {
    width: 230px;
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
`;

export const HiddenInput = styled.div`
  display: none;
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
