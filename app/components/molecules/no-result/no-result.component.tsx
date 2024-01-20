import { FC } from "react";
import notFoundIcon from "assets/not-found.svg";
import ClearButton from "@/components/atoms/clear-button/clear-button.component";
import { NO_RESULT_TEXT } from "utils/constants";
import {
  StyledContainer,
  StyledNotFoundImage,
  StyledNotFoundText,
} from "./no-result.styles";

interface NoResultProps {
  clearSearchField: () => void;
}

const NoResult: FC<NoResultProps> = ({ clearSearchField }) => (
  <StyledContainer>
    <StyledNotFoundImage src="./not-found.svg" alt="not-found" />
    <StyledNotFoundText>{NO_RESULT_TEXT}</StyledNotFoundText>
    <ClearButton clearSearchField={clearSearchField} />
  </StyledContainer>
);

export default NoResult;
