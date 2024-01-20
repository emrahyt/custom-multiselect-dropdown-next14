import { ReactNode } from "react";
import { StyledContainer } from "./input-container.styles";

interface InputContainerProps {
  children: ReactNode;
}

const InputContainer: React.FC<InputContainerProps> = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

export default InputContainer;
