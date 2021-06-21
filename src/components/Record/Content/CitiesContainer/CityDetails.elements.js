import styled from 'styled-components'

export const DetailsWrap = styled.div`
  padding-left: 20px;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const DetailsItem = styled.div`
  line-height: 24px;
`

export const PreloaderItem = styled.div`
  height: 16px;
  margin: 6px 0;
  background: #efefef;
  border-radius: 4px;

  &:nth-child(1) {
    width: 100px;
  }
  &:nth-child(2) {
    width: 180px;
  }
  &:nth-child(3) {
    width: 160px;
  }
`

export const TelLink = styled.a`
  margin-right: 10px;

  &:not(:last-child):after {
    content: ',';
    color: #000;
  }
`
