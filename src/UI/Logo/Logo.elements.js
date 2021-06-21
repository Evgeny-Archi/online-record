import styled, { keyframes } from 'styled-components'

const spinner = keyframes`
    0% {
    stroke-dasharray: 1, 120;
    stroke-dashoffset: 0;
    transform: rotate(0deg);
  }
  50% {
    stroke-dasharray: 90, 120;
    stroke-dashoffset: -20;
    transform: rotate(180deg);
  }
  100% {
    stroke-dasharray: 90, 120;
    stroke-dashoffset: -97;
    transform: rotate(360deg);
  }
`

export const LogoIcon = styled.svg`
  & .spinner {
    fill: transparent;
    stroke: #db001b;
    stroke-width: 2;
    stroke-linecap: round;
    transform-origin: 19.5px 19.5px 0;
    animation: ${spinner} 2s linear infinite;
  }
`
