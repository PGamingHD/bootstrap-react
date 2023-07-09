import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios from "axios";

const loadedProfile = ({ profilePic, auth, setFile, file }: any) => {
  const handleFile = (event: any) => {
    if (!event.target.files[0]) return;

    if (
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      event.target.value = "";
      return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: "Must be type png, jpg, jpeg",
      });
    }

    return setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file)
      return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: "No file chosen!",
      });

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("api/profile/uploadpfp/" + auth()?.username, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 500,
      timerProgressBar: true,
    }).fire({
      icon: "success",
      title: "Profile picture updated",
    });

    return window.location.reload();
  };

  return (
    <>
      <div>
        <Image
          src={
            profilePic.type === "link"
              ? profilePic.picture
              : `data:image/jpg;base64,${profilePic?.picture}`
          }
          thumbnail
          style={{ height: "60px", width: "60px", backgroundColor: "#0D6EFD" }}
        ></Image>
        <br />
        Welcome user {auth()?.displayname}!
        <br />
        Username: {auth()?.username}
        <br />
        Role: {auth()?.role}
      </div>
      <div className="row">
        <div className="col p-2"></div>
      </div>
      <div className="row">
        <div className="col p-2"></div>
        <div className="col p-2">
          <Form.Group
            onInput={handleFile}
            controlId="formFile"
            className="mb-3"
          >
            <Form.Label>Upload new profile picture</Form.Label>
            <Form.Control
              className="colorScheming"
              type="file"
              style={{ backgroundColor: "#0D6EFD", borderColor: "#0D6EFD" }}
            />
            <div className="col p-2"></div>
            <Button onClick={handleUpload}>Upload</Button>
          </Form.Group>
        </div>
        <div className="col p-2"></div>
      </div>
    </>
  );
};

export default loadedProfile;
