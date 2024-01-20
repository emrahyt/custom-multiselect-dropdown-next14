import styled, { css, DefaultTheme } from "styled-components";

interface StyledToastContainerProps {
  $show: boolean;
}

export const StyledToastContainer = styled.div<StyledToastContainerProps>`
  ${({ theme, $show }) => css`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${theme.colors.black};
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    opacity: ${$show ? 1 : 0};
    transition: opacity 0.3s ease-in-out;
    user-select: none;
  `}
`;
