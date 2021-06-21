import styled, { css } from 'styled-components'

export const SelectContainer = styled.div`
  width: 100%;
  position: relative;
  background: #efefef;
  border: 1px solid transparent;
  border-radius: 4px;

  ${(props) =>
    props.isError &&
    css`
      background: #fae5e8;
    `}

  ${(props) =>
    props.isOpen &&
    css`
      background: #fff;
      box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
      border: 1px solid #eaeaea;
    `}
`

export const Title = styled.div`
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TitleText = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding-left: 15px;
  text-align: left;
  font-size: 1.2em;
  cursor: pointer;
  color: ${(props) => (props.isChecked ? '#000' : '#969696')};

  ${(props) =>
    props.isError &&
    css`
      color: #e23745;
    `}
`
export const TitleArrow = styled.svg`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%)
    ${(props) => (props.isOpen ? 'rotate(180deg)' : '')};
  color: #bbbbbb;
  transition: transform 0.2s linear;
`

export const Dropdown = styled.div`
  width: 100%;
  max-height: 400px;
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 3;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid #eaeaea;
  overflow-y: auto;
`
export const DropdownItem = styled.div`
  height: 50px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  &.active {
    background: #f5f5f5;
  }
`
