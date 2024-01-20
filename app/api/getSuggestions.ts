import axios, { AxiosResponse, AxiosError } from "axios";
import { BASE_URL, INTERNAL_SERVER_ERROR } from "utils/constants";
import { parseCharactersResponse } from "utils/helpers";
import { ParsedCharactersResponse } from "@/types/general";
import { ApiResponse, ApiError } from "@/types/api";

interface CustomResponse<T> {
  data?: T;
  status?: number;
  error?: string;
}

export const getSuggestions = async (
  characterName: string,
  page: number
): Promise<CustomResponse<ParsedCharactersResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${BASE_URL}/character/?page=${page}&name=${characterName}`
    );

    const parsedResponse = parseCharactersResponse(response.data);

    return { data: parsedResponse, status: response.status };
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;

    const customResponse: CustomResponse<ParsedCharactersResponse> = {
      data: undefined,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.data?.error || INTERNAL_SERVER_ERROR,
    };

    return customResponse;
  }
};
