import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal">
          <Heading as="h1">Appartment Rental</Heading>
          <div>
            <Heading as="h2">Check in and out</Heading>
            <Button variation="primary" size="medium" onClick={() => {}}>
              Check In
            </Button>
            <Button variation="secondary" size="small" onClick={() => {}}>
              Check Out
            </Button>
          </div>
        </Row>

        <Row type="vertical">
          <form>
            <Heading as="h3">Form</Heading>
            <Input type="number" placeholder="Number of Guests" />
            <Input type="number" placeholder="Number of Guests" />
          </form>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
