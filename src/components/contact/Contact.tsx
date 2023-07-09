import Form from "react-bootstrap/Form";
import { Col, FloatingLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [validated, setValidated] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    document.title = "PGTechnologies - Contact";
  }, []);

  const handleSubmit = async (event: any) => {
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      !email.includes("@") ||
      reason.length === 0
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const contactResponse = await axios.post("api/contact", {
      firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1),
      lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1),
      email: email,
      reason: reason,
    });

    if (contactResponse.data.message === "failed") {
      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: "Contact form errored out",
      });

      return window.location.reload();
    }

    if (contactResponse.data.message === "success") {
      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "success",
        title: "Contact form submitted",
      });

      return window.location.reload();
    }
  };

  const handleFirstname = (event: any) => setFirstname(event.target.value);
  const handleLastname = (event: any) => setLastname(event.target.value);
  const handleEmail = (event: any) => setEmail(event.target.value);
  const handleReason = (event: any) => setReason(event.target.value);

  return (
    <>
      <div className="row">
        <h1>Contact Us</h1>
        <p style={{ fontSize: "20px", color: "grey" }}>
          Do you require to come in contact with us? Feel free to contact us
          below!
        </p>
        <div className="col p-2"></div>
        <Col className="p-2" xs={6}>
          <Form className="align-items-center" noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="form1">
              <Row>
                <Col xs={6}>
                  <FloatingLabel
                    controlId="floatingInput1"
                    label="Firstname"
                    className="mb-1"
                    id="firstname_f"
                  >
                    <Form.Control
                      onChange={handleFirstname}
                      required
                      type="text"
                      placeholder="Firstname"
                    />
                    <Form.Control.Feedback type="invalid">
                      Missing firstname
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col xs={6}>
                  <FloatingLabel
                    controlId="floatingInput2"
                    label="Lastname"
                    className="mb-1"
                    id="lastname_f"
                  >
                    <Form.Control
                      onChange={handleLastname}
                      required
                      type="text"
                      placeholder="Lastname"
                    />
                    <Form.Control.Feedback type="invalid">
                      Missing lastname
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form2">
              <FloatingLabel
                controlId="floatingInput3"
                label="Email"
                className="mb-1"
                id="email_f"
              >
                <Form.Control
                  onChange={handleEmail}
                  required
                  type="email"
                  placeholder="Email"
                />
                <Form.Control.Feedback type="invalid">
                  Missing valid email
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form3">
              <FloatingLabel
                controlId="floatingInput4"
                label="Contact Reason"
                className="mb-1"
                id="reason_f"
              >
                <Form.Control
                  onChange={handleReason}
                  required
                  placeholder="Contact Reason"
                  type="text"
                />
                <Form.Control.Feedback type="invalid">
                  Missing reason
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Form>
          <Button onClick={handleSubmit}>Submit Contact</Button>
        </Col>
        <div className="col p-2"></div>
      </div>
    </>
  );
};

export default Contact;
