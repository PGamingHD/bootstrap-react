import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const RegisterModal = ({
  showRegister,
  handleRegisterClose,
  handleRUsername,
  handleREmail,
  handleRPassword,
  handleLoginSwitch,
  handleRegisterSubmit,
}: any) => {
  document.addEventListener(
    "keydown",
    (event: any) => {
      if (!showRegister) return;
      if (event.key !== "Enter") return;

      handleRegisterSubmit();
    },
    { once: true }
  );

  return (
    <Modal show={showRegister} onHide={handleRegisterClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <b>Account Register</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Account Username</Form.Label>
            <Form.Control
              placeholder="Username"
              type="text"
              autoComplete="username"
              id="usernameRBox"
              onChange={handleRUsername}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Account Email</Form.Label>
            <Form.Control
              placeholder="Email"
              type="text"
              autoComplete="username"
              id="emailRBox"
              onChange={handleREmail}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Account Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="password"
              id="passwordRBox"
              onChange={handleRPassword}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleRegisterClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLoginSwitch}>
          Login
        </Button>
        <Button variant="success" onClick={handleRegisterSubmit}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
