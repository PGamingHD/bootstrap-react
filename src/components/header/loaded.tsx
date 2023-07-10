import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Badge, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import LoginModal from "./modals/login.tsx";
import RegisterModal from "./modals/register.tsx";
import AdminModal from "./modals/admin.tsx";

const LoadedHeader = ({
  auth,
  show,
  showRegister,
  showAdmin,
  profilePic,
  unreadMessages,
  userData,
  adminData,
  handleLogout,
  handleAdminShow,
  handleClose,
  handleUsername,
  handlePassword,
  handleRUsername,
  handleRPassword,
  handleREmail,
  handleRegisterSwitch,
  handleKeepSignedIn,
  handleRegisterClose,
  handleSubmit,
  handleLoginSwitch,
  handleRegisterSubmit,
  handleAdminClose,
  handleShow,
}: any) => {
  return (
    <>
      <Navbar expand="lg" sticky="top" className="bg-primary rounded push-down">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/pg_logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ borderRadius: "5px" }}
            />{" "}
            <b>PGTechnologies</b>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                {window.location.pathname === "/" ? <b>Home</b> : "Home"}
              </Nav.Link>
              <Nav.Link href="/staff">
                {window.location.pathname === "/staff" ? <b>Staff</b> : "Staff"}
              </Nav.Link>
              <Nav.Link href="/projects">
                {window.location.pathname === "/projects" ? (
                  <b>Projects</b>
                ) : (
                  "Projects"
                )}
              </Nav.Link>
              <Nav.Link href="/contact">
                {window.location.pathname === "/contact" ? (
                  <b>Contact</b>
                ) : (
                  "Contact"
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Collapse className="justify-content-end">
              {auth() ? (
                <Navbar.Text>
                  Signed in as: <a href="/profile">{auth()?.displayname}</a>
                </Navbar.Text>
              ) : (
                <Navbar.Text>Not signed in</Navbar.Text>
              )}
              {auth() ? (
                <a href="/profile">
                  <Image
                    src={
                      profilePic.type === "link"
                        ? profilePic.picture
                        : `data:image/jpg;base64,${profilePic?.picture}`
                    }
                    thumbnail
                    style={{
                      marginLeft: "1rem",
                      height: "40px",
                      width: "40px",
                      backgroundColor: "#0D6EFD",
                    }}
                  ></Image>
                </a>
              ) : (
                ""
              )}
            </Navbar.Collapse>
            {auth() ? (
              <Button
                style={{ marginLeft: "10px", color: "#000" }}
                onClick={handleLogout}
                className="btn-danger"
              >
                Logout
              </Button>
            ) : (
              <Button
                style={{ marginLeft: "10px", color: "#000" }}
                onClick={handleShow}
                className="btn-success"
              >
                Login
              </Button>
            )}
            <Button
              hidden={auth()?.role !== "ADMIN" && auth()?.role !== "DEVELOPER"}
              style={{ marginLeft: "10px", color: "#000" }}
              onClick={handleAdminShow}
              className="btn-warning"
            >
              Admin{" "}
              {unreadMessages !== 0 ? (
                <Badge pill bg="primary">
                  {unreadMessages > 99 ? "99+" : unreadMessages}
                </Badge>
              ) : (
                ""
              )}
            </Button>
          </Navbar.Collapse>

          <LoginModal
            show={show}
            handleClose={handleClose}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
            handleRegisterSwitch={handleRegisterSwitch}
            handleKeepSignedIn={handleKeepSignedIn}
            handleSubmit={handleSubmit}
          />

          <RegisterModal
            showRegister={showRegister}
            handleRegisterClose={handleRegisterClose}
            handleRUsername={handleRUsername}
            handleREmail={handleREmail}
            handleRPassword={handleRPassword}
            handleLoginSwitch={handleLoginSwitch}
            handleRegisterSubmit={handleRegisterSubmit}
          />

          <AdminModal
            auth={auth}
            showAdmin={showAdmin}
            handleAdminClose={handleAdminClose}
            adminData={adminData}
            userData={userData}
          />
        </Container>
      </Navbar>
    </>
  );
};

export default LoadedHeader;
