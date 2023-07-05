import { Placeholder } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const loadingProfile = () => {
  return (
    <>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={1} size="lg" />
      </Placeholder>

      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={2} size="sm" />
      </Placeholder>

      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={2} size="sm" />
      </Placeholder>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={1} size="sm" />
      </Placeholder>

      <div className="row">
        <div className="col p-2"></div>
      </div>

      <div className="row">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={2} size="sm" />
        </Placeholder>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={3} size="sm" />
        </Placeholder>
        <div className="col p-2"></div>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={2} size="lg" />
        </Placeholder>
      </div>
    </>
  );
};

export default loadingProfile;
