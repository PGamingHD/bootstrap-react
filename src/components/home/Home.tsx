import "./home.css";
import { Carousel } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Carousel className={"align-content-center"}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.discordapp.com/attachments/1010999257899204769/1057280526190387271/starters.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Main slide</h3>
            <p>Why not check this slide out?</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.discordapp.com/attachments/1010999257899204769/1057280526190387271/starters.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Secondary slide</h3>
            <p>Why not check this slide out then?</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.discordapp.com/attachments/1010999257899204769/1057280526190387271/starters.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide</h3>
            <p>How about this slide, this is the last of its kind!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h1
        style={{
          marginTop: "5rem",
          textAlign: "center",
          color: "black",
        }}
      >
        Hey
      </h1>
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
