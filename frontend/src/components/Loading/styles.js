import styled from 'styled-components';

export const Spinner = styled.div`
  animation: spin 2s linear infinite;
  border: 16px solid ${({ theme }) => theme.COLORS.PRIMARY.LIGHT};
  border-top: 16px solid ${({ theme }) => theme.COLORS.PRIMARY.DARK};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export const AbsoluteSpinner = styled.div`
  animation: spin 2s linear infinite;
  border: 16px solid ${({ theme }) => theme.COLORS.PRIMARY.LIGHT};
  border-top: 16px solid ${({ theme }) => theme.COLORS.PRIMARY.DARK};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: auto;
  position: fixed;
  z-index: 999;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
