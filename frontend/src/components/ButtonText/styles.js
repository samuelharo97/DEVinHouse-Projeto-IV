import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Text = styled(Link)`
  color: ${({ theme }) => theme.COLORS.SECONDARY.MAIN};
  text-decoration: underline;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  align-self: center;
  width: fit-content;
`
