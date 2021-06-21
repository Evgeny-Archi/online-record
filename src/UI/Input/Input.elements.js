import styled, { css } from 'styled-components'

export const InputElem = styled.input`
  display: inline-block;
  width: 100%;
  height: 50px;
  background: #efefef;
  color: ${(props) => (props.isValid ? '#000' : '#969696')};
  font-size: 1.2em;
  padding-left: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;

  ${(props) =>
    props.isError &&
    css`
      background: #fae5e8;

      &::placeholder {
        color: #e23745;
      }
    `}

  &:focus {
    background: #fff;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
    border: 1px solid #eaeaea;
  }
`
