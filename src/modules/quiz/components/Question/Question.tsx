import styled from "styled-components";
import { Paragraph } from "@/modules/core/components/Typography";
import { Choice as ChoiceType } from "@/modules/quiz/model/Question";

type Props = {
  text: string;
  choices: ChoiceType[];
  selectedChoices: string[];
  onSelect: (value: string) => void;
};

export function Question({ text, choices, selectedChoices, onSelect }: Props) {
  return (
    <Wrapper>
      <Header>
        <Paragraph>
          <b>{text}</b>
        </Paragraph>
      </Header>
      <ul>
        {choices.map((choice) => (
          <li key={choice.value}>
            <Choice
              tabIndex={0}
              aria-selected={selectedChoices.includes(choice.value)}
              onClick={() => onSelect(choice.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSelect(choice.value);
                }
              }}
            >
              <Paragraph>{choice.text}</Paragraph>
            </Choice>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.text};
  padding: 20px;

  ul {
    list-style: none;
    padding: 0;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Choice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  border: 2px solid ${(props) => props.theme.colors.text};
  padding: 2px 6px;
  background-color: white;
  cursor: pointer;
  background: ${(props) =>
    props["aria-selected"] ? props.theme.colors.secondary : "white"};

  &:focus {
    outline-color: ${(props) => props.theme.colors.secondary};
  }
`;
