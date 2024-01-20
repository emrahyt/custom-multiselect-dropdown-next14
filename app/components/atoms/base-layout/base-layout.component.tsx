import { forwardRef, ReactNode, Ref } from "react";
import { StyledWrapper, StyledContainer } from "./base-layout.styles";

interface LayoutProps {
  children: ReactNode;
}

const BaseLayout = forwardRef(
  ({ children }: LayoutProps, ref: Ref<HTMLDivElement>) => (
    <StyledWrapper>
      <StyledContainer ref={ref}>{children}</StyledContainer>
    </StyledWrapper>
  )
);

BaseLayout.displayName = "BaseLayout";
export default BaseLayout;
