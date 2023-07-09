import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const loadedStaff = () => {
  return (
    <div className="card-container">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="/../../src/assets/pg_logo.png"
          style={{ background: "#000", borderRadius: "5px" }}
        />
        <Card.Body>
          <Card.Title>PGamingHD</Card.Title>
          <Card.Title>
            <i>Founder</i>
          </Card.Title>
          <Card.Text>
            My name is Pontus, I am 20 years old and live in Sweden. I love to
            develop backend projects on my free time.
          </Card.Text>
          <Button
            variant="primary"
            href="https://discordapp.com/users/266726434855321600/"
          >
            Discord Profile
          </Button>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="/../../src/assets/rahx.png"
          style={{ background: "#000", borderRadius: "5px" }}
        />
        <Card.Body>
          <Card.Title>Rahx</Card.Title>
          <Card.Title>
            <i>Administrator</i>
          </Card.Title>
          <Card.Text>This is information about Rahx!</Card.Text>
          <Button
            variant="primary"
            href="https://discordapp.com/users/264114457033179146/"
          >
            Discord Profile
          </Button>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="/../../src/assets/mrdeadkingz.png"
          style={{ background: "#000", borderRadius: "5px" }}
        />
        <Card.Body>
          <Card.Title>MrDeadKingz</Card.Title>
          <Card.Title>
            <i>Administrator</i>
          </Card.Title>
          <Card.Text>This is information about MrDeadKingz!</Card.Text>
          <Button
            variant="primary"
            href="https://discordapp.com/users/694107202344058880/"
          >
            Discord Profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default loadedStaff;
