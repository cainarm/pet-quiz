import styled from "styled-components";

export default function ReportPage() {
  return (
    <Container>
      <Report
        src={
          "https://cdn.shopify.com/s/files/1/0603/5852/5127/files/Report_Prototype_1_1_1000x.png?v=1673438740"
        }
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const Report = styled.img`
  width: 100%;
  max-width: 832px;
  border: 2px solid ${(props) => props.theme.colors.text};
`;
