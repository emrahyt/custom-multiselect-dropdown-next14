import { ParsedCharactersResponse, CharacterBaseInfo } from "@/types/general";
import { ApiResponse } from "@/types/api";
import {
  parseCharactersResponse,
  highlightText,
  handleFormerSelections,
} from ".";

describe("parseCharactersResponse", () => {
  it("should parse characters response correctly", () => {
    const mockCharactersResponse: ApiResponse = {
      info: {
        count: 10,
        pages: 2,
        next: "next-page-url",
        prev: "prev-page-url",
      },
      results: [
        {
          id: 1,
          name: "Rick",
          status: "Alive",
          species: "Human",
          type: "Main",
          gender: "Male",
          origin: { name: "Earth", url: "earth-url" },
          location: { name: "Location 1", url: "location1-url" },
          image: "image-url",
          episode: ["episode1", "episode2"],
          url: "character1-url",
          created: "2024-01-20",
        },
      ],
    };

    const expectedParsedResponse: ParsedCharactersResponse = {
      totalPages: 2,
      charactersList: [
        {
          id: 1,
          name: "Rick",
          image: "image-url",
          numberOfEpisodes: 2,
        },
      ],
    };

    const actualParsedResponse = parseCharactersResponse(
      mockCharactersResponse
    );

    expect(actualParsedResponse).toEqual(expectedParsedResponse);
  });
});

describe("highlightText", () => {
  it("should highlight search term in text", () => {
    const text = "This is a sample text for testing.";
    const searchTerm = "sample";
    const actualOutput = highlightText(text, searchTerm);
    expect(actualOutput).toMatchSnapshot();
  });

  it("should return original text if search term is empty", () => {
    const text = "This is a sample text for testing.";
    const searchTerm = "";
    const expectedOutput = text;
    const actualOutput = highlightText(text, searchTerm);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it("should handle case-insensitive search", () => {
    const text = "This is a sample text for testing.";
    const searchTerm = "SAMPLE";
    const actualOutput = highlightText(text, searchTerm);
    expect(actualOutput).toMatchSnapshot();
  });
});

describe("handleFormerSelections", () => {
  it("should filter selected characters based on the available characters", () => {
    const selectedCharacters = [
      { id: 1, name: "Character 1" },
      { id: 2, name: "Character 2" },
      { id: 3, name: "Character 3" },
    ];

    const characters = [
      { id: 1, name: "Character 1", numberOfEpisodes: 3, image: "path1" },
      { id: 4, name: "Character 4", numberOfEpisodes: 1, image: "path2" },
      { id: 3, name: "Character 3", numberOfEpisodes: 5, image: "path3" },
    ];

    const expectedFormerSelections = [
      { id: 1, name: "Character 1" },
      { id: 3, name: "Character 3" },
    ];

    const actualFormerSelections = handleFormerSelections({
      selectedCharacters,
      characters,
    });

    expect(actualFormerSelections).toEqual(expectedFormerSelections);
  });

  it("should return an empty array if no characters are selected", () => {
    const selectedCharacters: CharacterBaseInfo[] = [];
    const characters = [
      { id: 1, name: "Character 1", numberOfEpisodes: 3, image: "path1" },
      { id: 4, name: "Character 4", numberOfEpisodes: 1, image: "path2" },
      { id: 3, name: "Character 3", numberOfEpisodes: 5, image: "path3" },
    ];

    const expectedFormerSelections: CharacterBaseInfo[] = [];
    const actualFormerSelections = handleFormerSelections({
      selectedCharacters,
      characters,
    });

    expect(actualFormerSelections).toEqual(expectedFormerSelections);
  });

  it("should return an empty array if no characters match the selected characters", () => {
    const selectedCharacters = [
      { id: 5, name: "Character 5" },
      { id: 6, name: "Character 6" },
    ];

    const characters = [
      { id: 1, name: "Character 1", numberOfEpisodes: 3, image: "path1" },
      { id: 4, name: "Character 4", numberOfEpisodes: 1, image: "path2" },
      { id: 3, name: "Character 3", numberOfEpisodes: 5, image: "path3" },
    ];

    const expectedFormerSelections: CharacterBaseInfo[] = [];

    const actualFormerSelections = handleFormerSelections({
      selectedCharacters,
      characters,
    });

    expect(actualFormerSelections).toEqual(expectedFormerSelections);
  });
});
