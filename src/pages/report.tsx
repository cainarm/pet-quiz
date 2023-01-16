import styled from "styled-components";
import Link from "next/link";
import { Heading, Paragraph } from "@/modules/core/components/Typography";


export default function ReportPage() {
    
  return (
    <Container>
      <Heading>Your dog health report !</Heading>
      <Paragraph>
        Imagine a very nice health report in here.
      </Paragraph>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 1em;
  width: 100%;
  height: 100%;
  padding-top: 6em;
  background-color: ${(props) => props.theme.colors.primary};
`;
