import "./projects.css";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    document.title = "PGTechnologies - Projects";
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: "1rem", color: "black" }}>
        Previous Projects
      </h1>
      <div className="card-container">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="/vixirus.png"
            style={{
              background: "#000",
              borderRadius: "5px",
              width: "222px",
              height: "222px",
            }}
          />
          <Card.Body>
            <Card.Title>Vixirus</Card.Title>
            <Card.Text>
              This was the first ever project made, it was a Music client. The
              main purpose of this project was for server entertainment, it was
              later discontinued due to Youtube issuing copyright strikes to
              multiple larger projects.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="/discmon.jpg"
            style={{
              background: "#000",
              borderRadius: "5px",
              width: "222px",
              height: "222px",
            }}
          />
          <Card.Body>
            <Card.Title>Discmon</Card.Title>
            <Card.Text>
              Discmon was a Pokémon project in Discord.JS, written completely in
              JavaScript. It was discontinued a few months later after beta
              build was released.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="/bitpizza.png"
            style={{
              background: "#000",
              borderRadius: "5px",
              width: "222px",
              height: "222px",
            }}
          />
          <Card.Body>
            <Card.Title>PizzaParadise</Card.Title>
            <Card.Text>
              PizzaParadise was a minigame project I made, it was later remade
              due to legal issues. However later discontinued due to lack of
              interest in project development.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="/lua.png"
            style={{
              background: "#000",
              borderRadius: "5px",
              width: "222px",
              height: "222px",
            }}
          />
          <Card.Body>
            <Card.Title>LuaLock</Card.Title>
            <Card.Text>
              LuaLock was an extremely advanced Lua script Whitelist system,
              using Websockets, APIs, and a Discord.JS client. It was later
              discontinued due to obfuscation prices being extremely high.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="/vixirus.png"
            style={{
              background: "#000",
              borderRadius: "5px",
              width: "222px",
              height: "222px",
            }}
          />
          <Card.Body>
            <Card.Title>VixirusV2</Card.Title>
            <Card.Text>
              VixirusV2 was a later project of mine, consisting of a Discord Bot
              & Dashboard. The project aim was to make an awesome Multi-purpose
              client for Discord servers to use.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="/discmon.jpg"
            style={{
              background: "#000",
              borderRadius: "5px",
              width: "222px",
              height: "222px",
            }}
          />
          <Card.Body>
            <Card.Title>DiscmonV2</Card.Title>
            <Card.Text>
              DiscmonV2 was a Pokémon project in Discord.JS, completely revamped
              and remade in TypeScript. It used the Prisma ORM to make database
              calls and everything was extemely optimised.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <h1 style={{ marginBottom: "1rem", marginTop: "1rem", color: "black" }}>
        Ongoing Projects
      </h1>
      <p style={{ fontSize: "25px" }}>
        No currently ongoing projects, coming soon!
      </p>
    </>
  );
};

export default Profile;
