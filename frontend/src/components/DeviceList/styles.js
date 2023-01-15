import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 95%;
  margin: auto;
  list-style: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 1390px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 770px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 1800px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
export const Container = styled.main`
  grid-area: content;
  text-align: center;
  width: 80%;
  justify-content: center;
  margin: auto;
  padding-left: 50px;
  > ul,
  li {
    list-style: none;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 10px;
  > input {
    width: 94%;
    min-width: 320px;
    height: 33px;
    border-radius: 3px;
    margin-bottom: 40px;
    border: none;
    padding-left: 10px;
  }

  > input:focus {
    outline: solid 1px ${({ theme }) => theme.COLORS.PRIMARY.LIGHT};
  }

  > label {
    width: 94%;
    min-width: 320px;
    color: ${({ theme }) => theme.COLORS.PRIMARY.DARK};
    text-align: left;
    align-self: left;
  }
`;
