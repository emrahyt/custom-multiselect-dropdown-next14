import styled, { css } from "styled-components";

interface StyledContainerProps {
  $searchAreaHeight: number;
}

export const StyledContainer = styled.div<StyledContainerProps>`
  ${({ theme, $searchAreaHeight }) => css`
    border: 2px solid ${theme.colors.cadetGray};
    background-color: ${theme.colors.white};
    width: 100%;
    overflow-y: auto;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    animation: fadeInAnimation ease 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    box-sizing: border-box;
    max-height: calc(100% - ${$searchAreaHeight}px - 10px);
    @keyframes fadeInAnimation {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
`;
