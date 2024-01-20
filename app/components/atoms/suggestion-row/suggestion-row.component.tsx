import { KeyboardEvent, ChangeEvent } from "react";
import { highlightText } from "@/utils/helpers";
import { ENTER_KEY, EPISODES_TEXT, EPISODE_TEXT } from "utils/constants";
import { ParsedCharacter, CharacterBaseInfo } from "@/types/general";

import {
  StyledContainer,
  StyledCheckbox,
  StyledCharacterImage,
  StyledCharacterInfo,
  StyledCharacterInfoText,
} from "./suggestion-row.styles";

interface SuggestionRowProps {
  handleCharacterSelect: (character: CharacterBaseInfo) => void;
  selectedCharacters: CharacterBaseInfo[];
  character: ParsedCharacter;
  searchTerm: string;
}

const SuggestionRow: React.FC<SuggestionRowProps> = ({
  handleCharacterSelect,
  selectedCharacters,
  character,
  searchTerm,
}) => {
  const { image, id, name, numberOfEpisodes } = character;

  const isSelected: boolean = !!selectedCharacters.find(
    (char) => char.id === id
  );
  const highlightedText: React.ReactNode = highlightText(name, searchTerm);
  const episodesText: string =
    numberOfEpisodes > 1 ? EPISODES_TEXT : EPISODE_TEXT;

  const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, id } = event.target;
    handleCharacterSelect({ id: Number(id), name });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = event;
    const inputTarget = target as HTMLInputElement;
    const { name, id } = inputTarget;
    if (key !== ENTER_KEY) return;
    handleCharacterSelect({ id: Number(id), name });
  };

  return (
    <StyledContainer>
      <StyledCheckbox
        type="checkbox"
        name={name}
        id={id.toString()}
        checked={isSelected}
        onChange={handleCheckboxClick}
        onKeyPress={handleKeyPress}
      />
      <StyledCharacterImage src={image} alt="character-img" />
      <StyledCharacterInfo>
        <StyledCharacterInfoText>{highlightedText}</StyledCharacterInfoText>
        <StyledCharacterInfoText>{`${numberOfEpisodes} ${episodesText}`}</StyledCharacterInfoText>
      </StyledCharacterInfo>
    </StyledContainer>
  );
};

export default SuggestionRow;
