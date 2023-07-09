import "./home.css";
import { Carousel } from "react-bootstrap";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "PGTechnologies - Home";
  }, []);

  return (
    <>
      <Carousel className={"align-content-center"}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/njs.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Node.JS</h3>
            <p>The JavaScript runtime I build all my projects with.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/ts.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>TypeScript</h3>
            <p>The JavaScript superset I use for my projects.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/rejs.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>React.JS</h3>
            <p>The web framework I use for all my websites.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/exjs.png"
            alt="Fourth slide"
          />

          <Carousel.Caption>
            <h3>Exress.JS</h3>
            <p>The backend framework I make all my backends with.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/djs.png"
            alt="Fifth slide"
          />

          <Carousel.Caption>
            <h3>Discord.JS</h3>
            <p>The framework I work on Discord projects with.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h2
        style={{
          marginTop: "5rem",
          textAlign: "center",
          color: "black",
        }}
      >
        PGTechnologies, what are we?
      </h2>
      <p
        style={{
          fontSize: "20px",
          textAlign: "left",
          marginTop: "2.5rem",
          color: "black",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        adipisci dicta doloremque explicabo impedit ipsam itaque nisi porro
        praesentium, quia sed sit vitae, voluptate? Debitis ducimus est et ex
        excepturi in ipsam magni quis tempora unde. Alias, consectetur
        consequatur cumque eaque hic iusto officiis possimus provident quo quod,
        temporibus, voluptatum. Ab accusamus animi asperiores at consequatur
        culpa dignissimos ea eius est eveniet excepturi exercitationem facere id
        laboriosam libero magnam numquam odit optio praesentium quasi recusandae
        similique temporibus tenetur ullam vero vitae, voluptatibus! At culpa
        earum, eius eveniet excepturi fugiat inventore ipsa nesciunt odit
        reiciendis repudiandae sequi, suscipit vel. Consectetur consequatur
        dignissimos dolorum earum eos ex excepturi explicabo in itaque
        laudantium maiores nam non odio officia officiis optio, quae quia
        quisquam recusandae reiciendis rem reprehenderit saepe sint ullam vero.
      </p>
      <p
        style={{
          fontSize: "20px",
          textAlign: "left",
          marginTop: "2.5rem",
          color: "black",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at autem
        eius, est iure labore natus quas quasi veniam voluptatibus? At
        cupiditate dolorum exercitationem impedit nostrum. Adipisci architecto
        dolor harum impedit ipsa nisi officiis rem vel. Dignissimos eligendi
        facere fuga, hic in nesciunt praesentium quibusdam quis quos veritatis!
        Distinctio dolores ea, et eveniet exercitationem impedit praesentium
        quasi quod quos temporibus tenetur voluptate voluptatem. Accusamus
        accusantium amet atque consequuntur deleniti eos ex expedita id, illo in
        ipsam natus possimus totam! Adipisci blanditiis ducimus, excepturi in
        inventore labore laboriosam maxime modi, necessitatibus neque nulla
        numquam porro quasi quibusdam saepe sed suscipit tempora ullam voluptas
        voluptate. Aliquid asperiores commodi, corporis dolorem eligendi
        molestiae quibusdam vel? Atque dolorem, ducimus eum exercitationem nisi
        officia repellendus. Esse illo iure minima non porro ullam vel!
      </p>
    </>
  );
};

export default Home;
