import React from 'react'
import styled from 'styled-components'

export const Div = styled.div`
  display: ${props => props.display};
  position: ${props => props.position};
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
  height: ${props => props.height};
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  background-color: ${props => props.backgroundColor};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
`;
