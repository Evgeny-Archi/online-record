import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
*,
  *:after,
  *:before {
    box-sizing: border-box;
  }
  body {
    font-family: Arial, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', -apple-system,
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
  #root {
    width: 100%;
  }

  a {
    color: #4e94d7;
    text-decoration: none;

    &:hover {
      color: #e23745;
    }
  }
`

export default GlobalStyle
