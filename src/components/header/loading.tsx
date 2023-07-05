import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Placeholder } from "react-bootstrap";

const LoadingHeader = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-primary rounded push-down">
        <Container>
          <Placeholder xs={3} size={"lg"} />
          <Placeholder xs={5} size={"lg"} animation={"glow"} />
          <Placeholder xs={4} size={"lg"} />
        </Container>
      </Navbar>
    </div>
  );
};

export default LoadingHeader;
