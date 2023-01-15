import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 105px, 40px auto 100px;
  grid-template-areas:
    'section'
    'content'
    'footer';
  grid-row-gap: 50px;
  padding-top: 150px;
`

export const Section = styled.section`
  grid-area: section;
  width: 70%;
  margin: auto;
  align-self: center;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.SECONDARY.LIGHT};
  min-width: 350px;
  > h3 {
    padding-bottom: 10px;
    font-weight: 600;
    font-size: 32px;
    line-height: 42px;
  }

  @media (max-width: 650px) {
    margin-left: 15%;
    h3 {
      text-align: center;
    }
  }
`

export const Footer = styled.footer`
  height: 100px;
  width: 100%;
`
