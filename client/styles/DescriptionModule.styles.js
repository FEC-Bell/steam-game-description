import styled from 'styled-components';

export const DescCol = styled.div`
  width: 324px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 940px) and (min-width: 470px) {
    max-width: 940px;
    margin: 0;
    width: auto;
    height: auto;
    flex-direction: row;
  }
`;

export const ImgContainer = styled.div`
  height: 151px;
  margin-bottom: 7px;

  @media screen and (max-width: 940px) and (min-width: 470px) {
    margin-right: 8px;
    height: auto;
    width: auto;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  @media screen and max-width: 940px) and (min-width: 470px) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: auto;
    height: auto;
  }
`;

export const DescImg = styled.img`
  width: auto;
  height: auto;
  max-height: 151px;
`;

export const Desc = styled.div`
  max-height: 111px;
  overflow: hidden;
  font-size: 13px;
  line-height: 18px;
  padding-right: 16px;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;

  @media screen and (max-width: 940px) and (min-width: 470px) {
    padding-right: 0px;
    width: auto;
    height: auto;
  }
`;

export const DescStats = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #556772;

  @media screen and (max-width: 940px) and (min-width: 470px) {
    overflow: hidden;
  }
`;

export const ReleaseDate = styled.div`
  padding-top: 9px;
  padding-bottom: 13px;
  display: flex;
  line-height: 16px;
`;