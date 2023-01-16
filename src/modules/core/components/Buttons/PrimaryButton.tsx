import styled, { css } from "styled-components";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton(props: Props) {
  return <Button {...props} />;
}

const Button = styled.button`
  border: none;
  background: black;
  border: 1px solid black;
  color: white;
  padding: 1em 2em;
  border-radius: 2em;
  cursor: pointer;
  font-family: ${(props) => props.theme.font.secondary.style.fontFamily};
  transition: background 0.1s ease-in-out;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `};

  &:hover {
    background: white;
    color: black;
  }
`;
