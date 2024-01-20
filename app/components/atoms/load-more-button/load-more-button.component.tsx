import { LOAD_MORE_TEXT, LOADING_TEXT } from "@/utils/constants";

import {
  StyledContainer,
  StyledLoadMoreButton,
} from "./load-more-button.styles";

interface LoadMoreButtonProps {
  isLoadingMore: boolean;
  handleLoadMore: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isLoadingMore,
  handleLoadMore,
}) => {
  const buttonText = isLoadingMore ? LOADING_TEXT : LOAD_MORE_TEXT;

  return (
    <StyledContainer>
      <StyledLoadMoreButton type="button" onClick={handleLoadMore}>
        {buttonText}
      </StyledLoadMoreButton>
    </StyledContainer>
  );
};

export default LoadMoreButton;
