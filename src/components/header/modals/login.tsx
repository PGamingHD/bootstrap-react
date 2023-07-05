import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const LoginModal = ({
  show,
  handleClose,
  handleUsername,
  handlePassword,
  handleRegisterSwitch,
  handleKeepSignedIn,
  handleSubmit,
}: any) => {
  document.addEventListener(
    "keydown",
    (event: any) => {
      if (!show) return;
      if (event.key !== "Enter") return;

      handleSubmit();
    },
    { once: true }
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <b>Account Login</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Account Username/Email</Form.Label>
            <Form.Control
              placeholder="Email/Username"
              type="text"
              autoComplete="username"
              id="usernameBox"
              onChange={handleUsername}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Account Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="password"
              id="passwordBox"
              onChange={handlePassword}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              onChange={handleKeepSignedIn}
              id="custom-switch"
              label="Keep me signed in"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleRegisterSwitch}>
          Register
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
