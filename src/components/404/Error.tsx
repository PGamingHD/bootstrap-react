import "./error.css";
import Button from "react-bootstrap/Button";

const Error = () => {
  return (
    <>
      <div>
        <div className="row">
          <div className="col p-5"></div>
        </div>
        <div className="row">
          <div className="col p-5"></div>
        </div>
        <div className="row">
          <div
            className="col"
            style={{
              fontSize: "40px",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              textShadow: "1px 1px #000",
            }}
          >
            Woops, that page is gone!
          </div>
        </div>
        <div className="row">
          <div
            className="col"
            style={{
              fontSize: "18px",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              color: "grey",
              textShadow: "1px 1px #000",
            }}
          >
            Seems like you got lost while trying to index this page.
          </div>
        </div>
        <div className="row">
          <div
            className="col"
            style={{
              fontSize: "200px",
              color: "grey",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              textShadow: "1px 1px #000",
            }}
          >
            404
          </div>
        </div>
        <Button href="/" style={{ color: "black", marginTop: "1rem" }}>
          Homepage
        </Button>
      </div>
    </>
  );
};

export default Error;
