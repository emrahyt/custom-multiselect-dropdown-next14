import { StyledCloseButton, StyledImage } from "./close-button.styles";

interface CloseButtonProps {
  handleChipRemove: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ handleChipRemove }) => (
  <StyledCloseButton onClick={handleChipRemove} type="button">
    <StyledImage src="./close-icon.svg" alt="close-icon" />
  </StyledCloseButton>
);

export default CloseButton;
