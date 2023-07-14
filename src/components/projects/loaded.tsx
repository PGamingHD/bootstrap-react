import Card from "react-bootstrap/Card";

const LoadedProjects = ({ previousData, ongoingData }: any) => {
  return (
    <>
      <h1 style={{ marginBottom: "1rem", color: "black" }}>
        Previous Projects
      </h1>
      <div className="card-container">
        {!previousData || !previousData.length ? (
          <p style={{ fontSize: "25px", color: "grey" }}>
            No previous projects found, coming soon!
          </p>
        ) : (
          previousData.map(
            ({ projectId, projectdesc, projectname, projectpic }: any) => (
              <Card key={projectId + "_" + "card"} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={"/" + projectpic}
                  style={{
                    background: "#000",
                    borderRadius: "5px",
                    width: "222px",
                    height: "222px",
                  }}
                  key={projectId + "_" + "img"}
                />
                <Card.Body key={projectId + "_" + "body"}>
                  <Card.Title key={projectId + "_" + "name"}>
                    {projectname}
                  </Card.Title>
                  <Card.Text key={projectId + "_" + "text"}>
                    {projectdesc}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          )
        )}
      </div>

      <h1 style={{ marginBottom: "1rem", marginTop: "1rem", color: "black" }}>
        Ongoing Projects
      </h1>

      <div className="card-container">
        {!ongoingData || !ongoingData.length ? (
          <p style={{ fontSize: "25px", color: "grey" }}>
            No ongoing projects found, coming soon!
          </p>
        ) : (
          ongoingData.map(
            ({ projectId, projectdesc, projectname, projectpic }: any) => (
              <Card key={projectId + "_" + "card"} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={"/" + projectpic}
                  style={{
                    background: "#000",
                    borderRadius: "5px",
                    width: "222px",
                    height: "222px",
                  }}
                  key={projectId + "_" + "img"}
                />
                <Card.Body key={projectId + "_" + "body"}>
                  <Card.Title key={projectId + "_" + "name"}>
                    {projectname}
                  </Card.Title>
                  <Card.Text key={projectId + "_" + "text"}>
                    {projectdesc}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          )
        )}
      </div>
    </>
  );
};

export default LoadedProjects;
