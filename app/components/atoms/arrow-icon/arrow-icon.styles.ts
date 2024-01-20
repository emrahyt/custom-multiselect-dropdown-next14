import styled, { css } from "styled-components";

interface StyledImageProps {
  $isExpanded: boolean;
}

export const StyledImage = styled.img<StyledImageProps>`
  ${({ $isExpanded }) => css`
    position: absolute;
    right: 5px;
    top: 13px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    transition: transform 0.3s ease;
    transform: rotate(${ $isExpanded ? "180deg" : "0deg" });
  `}
`;
