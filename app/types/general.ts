export interface SimplifiedCharacter {
  name: string;
  id: number;
  image: string;
  episode: string[];
}

export type ParsedCharacter = Omit<SimplifiedCharacter, "episode"> & {
  numberOfEpisodes: number;
};

export type CharacterBaseInfo = Pick<ParsedCharacter, "id" | "name">;

export type MultiselectCharacter = Pick<
  ParsedCharacter,
  "id" | "name" | "image"
>;

export interface ParsedCharactersResponse {
  totalPages: number;
  charactersList: ParsedCharacter[];
}
