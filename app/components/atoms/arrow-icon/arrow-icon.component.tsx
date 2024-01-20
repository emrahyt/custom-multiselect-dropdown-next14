import React, { memo } from "react";
import { StyledImage } from "./arrow-icon.styles";

interface ArrowIconProps {
  isExpanded: boolean;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ isExpanded }) => (
  <StyledImage $isExpanded={isExpanded} src="/arrow-up.svg" alt="arrow-icon" />
);

export default memo(ArrowIcon);
