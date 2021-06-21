import styled from 'styled-components'

export const Tr = styled.div`
  display: flex;
  border-bottom: 1px solid #eaeaea;
  position: relative;

  &:last-child {
    border: none;
  }
`

export const Td = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 48px;
`

export const DeleteBtn = styled.button`
  position: absolute;
  top: 50%;
  right: -80px;
  transform: translateY(-50%);
`
