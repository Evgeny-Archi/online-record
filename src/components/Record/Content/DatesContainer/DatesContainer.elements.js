import styled from 'styled-components'

export const DatesWrap = styled.div`
  display: flex;
  flex-direction: row;

  & > div:first-child {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-left: 10px;
  }

  @media screen and (max-width: 460px) {
    flex-direction: column;

    & > div:first-child {
      margin-right: 0;
    }
    & > div:last-child {
      margin-top: 10px;
      margin-left: 0;
    }
  }
`
