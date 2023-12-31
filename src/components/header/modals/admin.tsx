import { Form, Modal, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const AdminModal = ({
  auth,
  showAdmin,
  handleAdminClose,
  adminData,
  userData,
}: any) => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [showSEditor, setShowSEditor] = useState<boolean>(false);
  const [showDev, setShowDev] = useState<boolean>(false);
  const [showProjects, setShowProjects] = useState<boolean>(false);

  const [projectName, setProjectName] = useState<string>("");
  const [projectPic, setProjectPic] = useState<string>("");
  const [projectDesc, setProjectDesc] = useState<string>("");
  const [projectStatus, setProjectStatus] = useState<string>("PREVIOUS");

  const [filteredEditor, setFilteredEditor] = useState<any>();
  const [filteredSEditor, setFilteredSEditor] = useState<any>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [userRole, setUserRole] = useState<string>("MEMBER");

  useEffect(() => {
    if (!filteredEditor) return;
    if (filteredEditor[0].read) {
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

  const handleProjectsShow = () => setShowProjects(true);
  const handleProjectsClose = () => setShowProjects(false);

  const handleProjectSwitch = () => {
    handleDevClose();
    handleProjectsShow();
  };

  const handleProjectName = (event: any) => setProjectName(event.target.value);
  const handleProjectPic = (event: any) => setProjectPic(event.target.value);
  const handleProjectDesc = (event: any) => setProjectDesc(event.target.value);
  const handleProjectStatus = (event: any) =>
    setProjectStatus(event.target.value);

  const projectSubmit = async () => {
    if (projectName === "") {
      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: `Projectname must be filled in`,
      });

      return window.location.reload();
    }

    if (projectPic === "") {
      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: `Projectpicture must be filled in`,
      });

      return window.location.reload();
    }

    if (projectDesc === "") {
      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: `Projectdescription must be filled in`,
      });

      return window.location.reload();
    }

    if (projectStatus === "") {
      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: `Projectstatus must be filled in`,
      });

      return window.location.reload();
    }

    const res: AxiosResponse<any, any> = await axios.post("/api/projects", {
      projectname: projectName,
      projectpic: projectPic,
      projectdesc: projectDesc,
      projectstatus: projectStatus,
    });

    if (res.data.message === "success") {
      handleProjectsClose();

      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "success",
        title: `New project was added!`,
      });

      return window.location.reload();
    }
  };

  const handleEditorClose = () => setShowEditor(false);

  const editorSubmit = async (): Promise<void> => {
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

  const editorSSubmit = async (): Promise<void> => {
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

  const deleteAccount = async (): Promise<void> => {
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

  const deleteContact = async (): Promise<void> => {
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

  const handleSEditorShow = (event: any): void => {
    const onlyOne = userData.filter(
      (data: any) => data.userId === parseInt(event.target.id)
    );

    setFilteredSEditor(onlyOne);
    setUserRole(onlyOne[0]?.role);
    setShowSEditor(true);
    handleDevClose();
  };
  const handleCheckSubmit = () => {
    if (isChecked) setIsChecked(false);
    else setIsChecked(true);
  };

  const handleRoleChange = (event: any) => {
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
          <Button variant="primary" onClick={handleProjectSwitch}>
            Add Project
          </Button>
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
                disabled={
                  !filteredSEditor
                    ? true
                    : auth()?.role === filteredSEditor[0]?.role
                }
              >
                <option value="MEMBER">MEMBER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="DEVELOPER">DEVELOPER</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={deleteAccount}
            disabled={
              !filteredSEditor ? true : auth()?.role === filteredSEditor[0].role
            }
          >
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

      <Modal show={showProjects} onHide={handleProjectsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                onChange={handleProjectName}
                placeholder="Project Name"
                type="text"
                autoComplete="name"
                id="projectName"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Picture</Form.Label>
              <Form.Control
                onChange={handleProjectPic}
                placeholder="Project Picture"
                type="text"
                autoComplete="picture"
                id="projectPic"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                onChange={handleProjectDesc}
                placeholder="Project Description"
                type="text"
                autoComplete="description"
                id="projectDesc"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Status</Form.Label>
              <Form.Select
                defaultValue={projectStatus}
                aria-label="Project Status"
                onChange={handleProjectStatus}
              >
                <option value="PREVIOUS">PREVIOUS</option>
                <option value="ONGOING">ONGOING</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={projectSubmit}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleProjectsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminModal;
