import { FC } from "react";
import SuggestionRow from "@/components/atoms/suggestion-row/suggestion-row.component";
import LoadMoreButton from "@/components/atoms/load-more-button/load-more-button.component";
import { StyledContainer } from "./suggestions.styles";
import { ParsedCharacter, CharacterBaseInfo } from "@/types/general";

interface SuggestionsProps {
  characters: ParsedCharacter[];
  handleCharacterSelect: (character: CharacterBaseInfo) => void;
  selectedCharacters: CharacterBaseInfo[];
  searchTerm: string;
  searchAreaHeight: number;
  hasMoreCharacters: boolean;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
}

const Suggestions: FC<SuggestionsProps> = ({
  characters,
  handleCharacterSelect,
  selectedCharacters,
  searchTerm,
  searchAreaHeight,
  hasMoreCharacters,
  handleLoadMore,
  isLoadingMore,
}) => (
  <StyledContainer $searchAreaHeight={searchAreaHeight}>
    {characters.map((character) => (
      <SuggestionRow
        key={`${character.id}-${character.name}`}
        character={character}
        handleCharacterSelect={handleCharacterSelect}
        selectedCharacters={selectedCharacters}
        searchTerm={searchTerm}
      />
    ))}
    {hasMoreCharacters && (
      <LoadMoreButton
        handleLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
      />
    )}
  </StyledContainer>
);

export default Suggestions;
