"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Layout from "@/components/atoms/base-layout/base-layout.component";
import ArrowIcon from "@/components/atoms/arrow-icon/arrow-icon.component";
import Chip from "@/components/molecules/chip/chip.component";
import InputField from "@/components/atoms/input-field/input-field.component";
import InputContainer from "@/components/atoms/input-container/input-container.component";
import Suggestions from "@/components/molecules/suggestions/suggestions.component";
import NoResult from "@/components/molecules/no-result/no-result.component";
import Spinner from "@/components/atoms/spinner/spinner.component";
import Toast from "@/components/atoms/toast/toast.component";

import { handleFormerSelections } from "@/utils/helpers";

import { getSuggestions } from "@/api/getSuggestions";

import {
  INITIAL_CONTAINER_HEIGHT,
  INITIAL_SEARCH_AREA_HEIGHT,
  MINIMUM_SUGGESTIONS_HEIGHT,
  REMOVE_SELECTION_TEXT,
  SUCCESS,
} from "@/utils/constants";

import { StyledContainer } from "./multiselect-dropdown.styles";
import { CharacterBaseInfo, ParsedCharacter } from "@/types/general";

const MultiselectDropdown: React.FC = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreCharacters, setHasMoreCharacters] = useState<boolean>(true);
  const [characters, setCharacters] = useState<ParsedCharacter[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<
    CharacterBaseInfo[]
  >([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchAreaHeight, setSearchAreaHeight] = useState<number>(
    INITIAL_SEARCH_AREA_HEIGHT
  );
  const [containerHeight, setContainerHeight] = useState<number>(
    INITIAL_CONTAINER_HEIGHT
  );

  const handleChipRemove = useCallback((id: number) => {
    setSelectedCharacters((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item.id !== id)
    );
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isFirstPage = page === 1;
    !isFirstPage && setPage(1);
    setSearchTerm(event.target.value || "");
  };

  const handleSearch = async (keyword: string, pageNumber: number) => {
    const keywordLength = keyword.length;
    const noSearchTerm = keywordLength === 0;
    if (noSearchTerm) {
      setCharacters([]);
      setIsError(false);
      setSelectedCharacters([]);
    }
    if (keywordLength < 3) return;
    const isFirstPage = pageNumber === 1;
    isFirstPage ? setIsLoading(true) : setIsLoadingMore(true);
    try {
      const { data, status } = await getSuggestions(keyword, pageNumber);
      handleResponse({ data, status, isFirstPage });
    } catch (error) {
      setIsError(true);
      setCharacters([]);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
      setTimeout(() => setIsLoadingMore(false), 300);
    }
  };

  const handleResponse = ({ data, status, isFirstPage }: any) => {
    if (status === SUCCESS) {
      const { totalPages, charactersList } = data;
      setIsError(false);
      const hasMorePages = totalPages > page;
      setHasMoreCharacters(hasMorePages);
      setCharacters((prevCharacters) => {
        return isFirstPage
          ? charactersList
          : [...prevCharacters, ...charactersList];
      });
    } else {
      setIsError(true);
      setCharacters([]);
    }
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleCharacterSelect = ({ name, id }: CharacterBaseInfo) => {
    const remainingSpace = containerHeight - searchAreaHeight;
    const hasEnoughSpaceForSuggestions =
      remainingSpace > MINIMUM_SUGGESTIONS_HEIGHT;
    const isSelected = selectedCharacters.some((item) => item.id === id);

    if (!hasEnoughSpaceForSuggestions && !isSelected) {
      setShowNotification(true);
      return;
    }
    if (isSelected) {
      setSelectedCharacters((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.id !== id)
      );
    } else {
      setSelectedCharacters((prevSelectedItems) => [
        ...prevSelectedItems,
        { id, name },
      ]);
    }
  };

  useEffect(() => {
    const debouncedSearch = setTimeout(() => handleSearch(searchTerm, 1), 500);
    return () => {
      clearTimeout(debouncedSearch);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (page === 1) return;
    handleSearch(searchTerm, page);
  }, [page]);

  useEffect(() => {
    if (isError) {
      setSelectedCharacters([]);
    }
  }, [isError]);

  useEffect(() => {
    if (searchBoxRef.current) {
      const currentSearchBoxHeight = searchBoxRef.current.clientHeight;
      setSearchAreaHeight(currentSearchBoxHeight);
    }
    if (containerRef.current) {
      const currentContainerHeight = containerRef.current.clientHeight;
      setContainerHeight(currentContainerHeight);
    }
  }, [selectedCharacters]);

  useEffect(() => {
    const remainingSelections = handleFormerSelections({
      selectedCharacters,
      characters,
    });
    setSelectedCharacters(remainingSelections);
  }, [characters]);

  const haveCharacters = characters.length > 0 && !isLoading;
  const showErrorText = !isLoading && isError;

  return (
    <Layout ref={containerRef}>
      <StyledContainer ref={searchBoxRef}>
        {selectedCharacters.map(({ name, id }) => (
          <Chip
            key={id}
            characterName={name}
            handleChipRemove={() => handleChipRemove(id)}
          />
        ))}
        <InputContainer>
          <InputField
            handleTextChange={handleTextChange}
            searchTerm={searchTerm}
          />
          <ArrowIcon isExpanded={haveCharacters} />
        </InputContainer>
      </StyledContainer>
      {haveCharacters && (
        <Suggestions
          characters={characters}
          handleCharacterSelect={handleCharacterSelect}
          selectedCharacters={selectedCharacters}
          searchTerm={searchTerm}
          searchAreaHeight={searchAreaHeight}
          hasMoreCharacters={hasMoreCharacters}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      )}
      {isLoading && <Spinner />}
      {showErrorText && <NoResult clearSearchField={() => setSearchTerm("")} />}
      <Toast
        message={REMOVE_SELECTION_TEXT}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </Layout>
  );
};

export default MultiselectDropdown;
