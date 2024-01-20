import { ApiResponse, Character } from "@/types/api";
import {
  CharacterBaseInfo,
  ParsedCharacter,
  ParsedCharactersResponse,
} from "@/types/general";

export const parseCharactersResponse = (
  charactersResponse: ApiResponse
): ParsedCharactersResponse => {
  const { info, results } = charactersResponse;

  if (!info || !results) return { totalPages: 0, charactersList: [] };

  const { pages } = info;

  const charactersList = results.map((character: Character) => {
    const { name, id, image, episode } = character;
    const numberOfEpisodes = episode.length;
    return {
      name,
      id,
      image,
      numberOfEpisodes,
    };
  });

  return {
    totalPages: pages,
    charactersList,
  };
};

export const highlightText = (
  text: string,
  searchTerm: string
): React.ReactNode => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");

  return text
    .split(regex)
    .map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
};

export const handleFormerSelections = ({
  selectedCharacters,
  characters,
}: {
  selectedCharacters: CharacterBaseInfo[];
  characters: ParsedCharacter[];
}): CharacterBaseInfo[] => {
  const filteredSelections = selectedCharacters.filter((selectedCharacter) => {
    return characters.some(
      (character) => character.id === selectedCharacter.id
    );
  });
  const formerSelections = filteredSelections.map(({ id, name }) => ({
    id,
    name,
  }));
  return formerSelections;
};
