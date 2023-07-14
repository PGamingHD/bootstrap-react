import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios, { AxiosResponse } from "axios";

const loadedProfile = ({
  profilePic,
  auth,
  setFile,
  file,
  profileDesc,
  setProfileDesc,
}: any) => {
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

  const handleDescription = (event: any) => setProfileDesc(event.target.value);

  const handleDescSubmit = async () => {
    if (profileDesc === "") {
      return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: "Please enter a valid description",
      });
    }

    const res: AxiosResponse<any, any> = await axios.post(
      "/api/profile/changedesc/" + auth()?.username,
      {
        description: profileDesc,
      }
    );

    if (res.data.message === "success") {
      await Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: true,
      }).fire({
        icon: "success",
        title: "Profile description updated",
      });

      return window.location.reload();
    } else {
      console.log(res);
    }
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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Set your profile description</Form.Label>
            <Form.Control
              onChange={handleDescription}
              placeholder="Profile Description"
              type="text"
              autoComplete="description"
            />
            <div className="col p-2"></div>
            <Button onClick={handleDescSubmit}>Change Description</Button>
          </Form.Group>
        </div>
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
              onChange={handleFile}
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
