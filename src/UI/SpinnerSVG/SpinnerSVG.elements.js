import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg)
  }
`

const animate = keyframes`
0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }
  
  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
`

export const Svg = styled.svg`
  animation: ${rotate} 2s linear infinite;
  max-width: 100px;
  width: ${(props) => props.size.width};
  height: ${(props) => props.size.height};

  & circle {
    animation: ${animate} 1.4s ease-in-out infinite both;
    display: block;
    fill: transparent;
    stroke: #bbbbbb;
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 280;
    stroke-width: 10px;
    transform-origin: 50% 50%;
  }
`
