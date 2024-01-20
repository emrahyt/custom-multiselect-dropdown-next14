import { FC, memo } from "react";
import CloseButton from "@/components/atoms/close-button/close-button.component";
import { StyledChip } from "./chip.styles";

interface ChipProps {
  characterName: string;
  handleChipRemove: () => void;
}

const Chip: FC<ChipProps> = ({ characterName, handleChipRemove }) => (
  <StyledChip>
    {characterName}
    <CloseButton handleChipRemove={handleChipRemove} />
  </StyledChip>
);

export default memo(Chip);
