import { Form, Modal, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminModal = ({
  auth,
  showAdmin,
  handleAdminClose,
  adminData,
  userData,
}: any) => {
  const [showEditor, setShowEditor] = useState<any>(false);
  const [showSEditor, setShowSEditor] = useState<any>(false);
  const [showDev, setShowDev] = useState<any>(false);

  const [filteredEditor, setFilteredEditor] = useState<any>();
  const [filteredSEditor, setFilteredSEditor] = useState<any>();
  const [isChecked, setIsChecked] = useState<any>(false);

  const [userRole, setUserRole] = useState<any>("MEMBER");

  useEffect(() => {
    if (!filteredEditor) return;
    if (filteredEditor[0].read) {
      console.log("CHECKED BY DEFAULT");
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [filteredEditor]);

  if (!adminData) return <></>;
  if (!userData) return <></>;

  const handleEditorShow = (event: any) => {
    const onlyOne = adminData.response.filter(
      (data: any) => data.contactId === parseInt(event.target.id)
    );

    setFilteredEditor(onlyOne);
    setShowEditor(true);
    handleAdminClose();
  };
  const handleEditorClose = () => setShowEditor(false);

  const editorSubmit = async () => {
    const res = await axios.put("/api/contact/updateRead", {
      isRead: isChecked,
      contactId: !filteredEditor ? 0 : parseInt(filteredEditor[0].contactId),
    });

    if (res.data.message === "success") {
      handleEditorClose();

      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "success",
        title: `Changed read to ${isChecked ? "true" : "false"}`,
      });

      return window.location.reload();
    }
  };

  const editorSSubmit = async () => {
    const res = await axios.put("api/users/updateRole", {
      userId: filteredSEditor[0].userId,
      newRole: userRole,
    });

    if (res.data.message === "success") {
      setShowSEditor(false);

      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "success",
        title: `User role has been updated`,
      });

      return window.location.reload();
    }
  };

  const deleteAccount = async () => {
    const res = await axios.delete(
      "api/users/removeUser/" + filteredSEditor[0]?.username
    );

    if (res.data.message === "success") {
      setShowSEditor(false);

      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "success",
        title: `User account deleted`,
      });

      return window.location.reload();
    }
  };

  const deleteContact = async () => {
    const res = await axios.delete(
      "api/contact/deleteContact/" + filteredEditor[0]?.contactId
    );

    if (res.data.message === "success") {
      setShowEditor(false);

      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "success",
        title: `Contact form deleted`,
      });

      return window.location.reload();
    }
  };

  const handleDevShow = () => setShowDev(true);
  const handleDevClose = () => setShowDev(false);

  const handleDevSwitch = () => {
    handleAdminClose();
    handleDevShow();
  };

  const handleSEditorShow = (event: any) => {
    const onlyOne = userData.filter(
      (data: any) => data.userId === parseInt(event.target.id)
    );

    setFilteredSEditor(onlyOne);
    setUserRole(onlyOne[0]?.role);
    setShowSEditor(true);
    handleDevClose();
  };
  const handleCheckSubmit = (event: any) => {
    console.log(event.target.checked);
    if (isChecked) setIsChecked(false);
    else setIsChecked(true);
  };

  const handleRoleChange = (event: any) => {
    console.log(event.target.value);
    setUserRole(event.target.value);
  };

  return (
    <>
      <Modal show={showAdmin} size="lg" onHide={handleAdminClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Panel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Read</th>
                <th>Editor</th>
              </tr>
            </thead>
            <tbody>
              {adminData.response.map((data: any) => (
                <tr key={data.contactId + "_" + "list"}>
                  <td key={data.contactId + "_" + "contactid"}>
                    {data.contactId}
                  </td>
                  <td key={data.contactId + "_" + "firstname"}>
                    {data.firstname}
                  </td>
                  <td key={data.contactId + "_" + "lastname"}>
                    {data.lastname}
                  </td>
                  <td key={data.contactId + "_" + "email"}>{data.email}</td>
                  <td key={data.contactId + "_" + "read"}>
                    {data.read ? "true" : "false"}
                  </td>
                  <td key={data.contactId + "_" + "edit"}>
                    <Button
                      onClick={handleEditorShow}
                      id={data.contactId}
                      style={{ backgroundColor: "#0D6EFD" }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            hidden={auth()?.role !== "DEVELOPER"}
            onClick={handleDevSwitch}
          >
            Developer
          </Button>
          <Button variant="secondary" onClick={handleAdminClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditor} onHide={handleEditorClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Editor Panel - Contact #
            {!filteredEditor ? "" : filteredEditor[0].contactId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Name:{" "}
                {!filteredEditor
                  ? "Not found"
                  : filteredEditor[0].firstname +
                    " " +
                    filteredEditor[0].lastname}
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                placeholder="Email/Username"
                type="text"
                autoComplete="username"
                id="emailUsername"
                value={!filteredEditor ? "Not found" : filteredEditor[0].email}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                placeholder="Contact Reason"
                as="textarea"
                rows={3}
                autoComplete="username"
                id="contactReason"
                value={!filteredEditor ? "Not found" : filteredEditor[0].reason}
                disabled
              />
            </Form.Group>
            <Form.Check
              defaultChecked={!filteredEditor ? false : filteredEditor[0].read}
              type="switch"
              label="Contact message has been read"
              id="custom-switch"
              onChange={handleCheckSubmit}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteContact}>
            Delete Contact
          </Button>
          <Button variant="secondary" onClick={handleEditorClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editorSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDev} size="lg" onHide={handleDevClose}>
        <Modal.Header closeButton>
          <Modal.Title>Developer Panel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Editor</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((data: any) => (
                <tr key={data.userId + "_" + "userlist"}>
                  <td key={data.userId + "_" + "id"}>{data.userId}</td>
                  <td key={data.username + "_" + "username"}>
                    {data.username}
                  </td>
                  <td key={data.email + "_" + "email"}>{data.email}</td>
                  <td key={data.role + "_" + "role"}>{data.role}</td>
                  <td key={data.userId}>
                    <Button
                      onClick={handleSEditorShow}
                      id={data.userId}
                      style={{ backgroundColor: "#0D6EFD" }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDevClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSEditor} onHide={() => setShowSEditor(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            DEV Editor Panel - User #
            {!filteredSEditor ? "" : filteredSEditor[0]?.userId}
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
                id="accountUsername"
                value={!filteredSEditor ? "" : filteredSEditor[0]?.username}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Email</Form.Label>
              <Form.Control
                placeholder="Email"
                type="text"
                autoComplete="email"
                id="accountEmail"
                value={!filteredSEditor ? "" : filteredSEditor[0]?.email}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Account Role</Form.Label>
              <Form.Select
                defaultValue={!filteredSEditor ? "" : filteredSEditor[0]?.role}
                aria-label="Default select example"
                onChange={handleRoleChange}
              >
                <option value="MEMBER">MEMBER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="DEVELOPER">DEVELOPER</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteAccount}>
            Delete Account
          </Button>
          <Button variant="secondary" onClick={() => setShowSEditor(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={editorSSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminModal;
