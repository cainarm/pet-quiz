import styled from "styled-components";

type Props = {
  variant?: "p" | "span" | "div";
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Paragraph({ variant, ...props }: Props) {
  return <StyledParagraph as={variant} {...props} />;
}

const StyledParagraph = styled.p`
  font-family: ${(props) => props.theme.font.secondary.style.fontFamily};
  color: ${(props) => props.theme.colors.text};
`;
