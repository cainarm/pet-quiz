import styled from "styled-components";

type Props = {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Heading({ variant, ...props }: Props) {
  return <StyledHeading as={variant} {...props} />;
}

const StyledHeading = styled.h1`
  font-family: ${(props) => props.theme.font.primary.style.fontFamily};
  color: ${(props) => props.theme.colors.text};
  font-size: 2.2rem;
  font-weight: 300;
`;
