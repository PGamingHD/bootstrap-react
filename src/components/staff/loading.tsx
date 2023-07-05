import Card from "react-bootstrap/Card";
import { Placeholder } from "react-bootstrap";

const LoadingStaff = () => {
  return (
    <div className="card-container">
      <Card style={{ width: "18rem" }}>
        <Placeholder
          variant="top"
          as={Card.Img}
          size="lg"
          style={{ background: "#000", borderRadius: "5px" }}
        />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={5} />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder xs={7} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={12} /> <Placeholder xs={4} />{" "}
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Placeholder
          variant="top"
          as={Card.Img}
          size="lg"
          style={{ background: "#000", borderRadius: "5px" }}
        />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={5} />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder xs={7} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={12} /> <Placeholder xs={4} />{" "}
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Placeholder
          variant="top"
          as={Card.Img}
          size="lg"
          style={{ background: "#000", borderRadius: "5px" }}
        />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={5} />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder xs={7} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={12} /> <Placeholder xs={4} />{" "}
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoadingStaff;
