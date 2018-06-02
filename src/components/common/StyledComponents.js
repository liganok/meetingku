import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

export const SLink = styled(Link)`
  text-decoration:none;
  color: black;
  &:hover {
        color: black;
    }
  &:visited {
        color: black;
    }
  &:active {
        color: black;
    }
`
export const SGrid = styled(Grid) `
  width:100%;
  margin:0
`