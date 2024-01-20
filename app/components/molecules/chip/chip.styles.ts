import styled, { css } from "styled-components";

export const StyledChip = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.azureishWhite};
    padding: 6px 10px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    gap: 5px;
    color: ${theme.colors.charcoal};
    font-size: 16px;
    font-weight: 500;
  `}
`;
