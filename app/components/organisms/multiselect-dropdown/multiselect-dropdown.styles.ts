import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    height: auto;
    border: 2px solid ${theme.colors.cadetGray};
    border-radius: 14px;
    padding: 5px;
    box-sizing: border-box;
  `}
`;
