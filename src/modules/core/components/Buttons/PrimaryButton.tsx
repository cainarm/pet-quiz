import styled, { css } from "styled-components";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton(props: Props) {
  return <Button {...props} />;
}

const Button = styled.button`
  border: none;
  background: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.text};
  color: white;
  padding: 8px 16px;
  border-radius: 32px;
  cursor: pointer;
  font-family: ${(props) => props.theme.font.secondary.style.fontFamily};
  transition: background 0.1s ease-in-out;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: white;
    color: ${(props) => props.theme.colors.text};
  }

  &:focus {
    outline-color: ${(props) => props.theme.colors.secondary};
  }
`;
