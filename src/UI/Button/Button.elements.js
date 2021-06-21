import styled from 'styled-components'

export const ButtonElem = styled.button`
  padding: 20px 30px;
  border-radius: 40px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.1em;
  font-weight: bold;
  background: #db001b;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:active {
    box-shadow: none;
  }

  &:disabled {
    background: #c1c1c1;
    box-shadow: none;
    cursor: not-allowed;
  }
`
