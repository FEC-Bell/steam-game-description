import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  #game-description {
    width: 324px;
    height: 428px;
    position: relative;
  }

  @media screen and (max-width: 940px) and (min-width: 470px) {
    #game-description {
      max-width: 940px;
      width: auto;
      height: auto;
      overflow-x: hidden;
    }
  }
`;