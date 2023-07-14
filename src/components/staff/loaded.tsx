import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const loadedStaff = ({ staffData, profilePic }: any) => {
  return (
    <div className="card-container">
      {console.log(staffData)}
      {staffData.map(({ userId, role, description, displayname }: any) => (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={
              profilePic.type === "link"
                ? profilePic.picture
                : `data:image/jpg;base64,${profilePic?.picture}`
            }
            style={{
              background: "#000",
              borderRadius: "5px",
              width: "222px",
              height: "222px",
            }}
          />
          <Card.Body>
            <Card.Title>{displayname}</Card.Title>
            <Card.Title>
              <i>
                {role.charAt(0).toUpperCase() + role.toLowerCase().slice(1)}
              </i>
            </Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="/pg_logo.png"
          style={{
            background: "#000",
            borderRadius: "5px",
            width: "222px",
            height: "222px",
          }}
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
          src="/rahx.png"
          style={{
            background: "#000",
            borderRadius: "5px",
            width: "222px",
            height: "222px",
          }}
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
          src="/mrdeadkingz.png"
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
