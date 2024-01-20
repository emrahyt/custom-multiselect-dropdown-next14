import { ChangeEvent } from "react";
import { PLACEHOLDER_TEXT } from "@/utils/constants";
import { StyledInput } from "./input-field.styles";

interface InputFieldProps {
  handleTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const InputField: React.FC<InputFieldProps> = ({
  handleTextChange,
  searchTerm,
}) => (
  <StyledInput
    placeholder={PLACEHOLDER_TEXT}
    onChange={handleTextChange}
    value={searchTerm}
  />
);

export default InputField;
