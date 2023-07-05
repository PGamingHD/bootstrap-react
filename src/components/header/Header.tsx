import { useEffect, useState } from "react";
import "./header.css";

//REACT COMPONENTS
import { post } from "../../utilities/backending.js";
import { useAuthUser, useSignIn, useSignOut } from "react-auth-kit";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import axios, { AxiosResponse } from "axios";

//MODAL IMPORTS
import LoadingHeader from "./loading.tsx";
import LoadedHeader from "./loaded.tsx";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const [loadedContent, setLoadedContent] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignIn, setKeepSignIn] = useState(false);

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const [unreadMessages, setUnreadMessages] = useState(0);

  const [adminData, setAdminData] = useState();
  const [userData, setUserData] = useState();

  const [profilePic, setProfilePic] = useState({
    type: "link",
    picture:
      "https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  });

  const auth = useAuthUser();

  useEffect(() => {
    if (auth()?.role) {
      (async () => {
        const profileData = await axios.get("api/profile/" + auth()?.username);

        setProfilePic(profileData.data.response);
      })();
    }

    if (auth()?.role === "ADMIN" || auth()?.role === "DEVELOPER") {
      (async () => {
        const res: AxiosResponse<any, any> = await axios.get(
          "api/contact/count"
        );
        const contactRes: AxiosResponse<any, any> = await axios.get(
          "api/contact"
        );
        const res2: AxiosResponse<any, any> = await axios.get("api/users");

        setAdminData(contactRes.data);
        setUnreadMessages(res.data.response);
        setUserData(res2.data.response);
      })();
    }

    setLoadedContent(true);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdminClose = () => setShowAdmin(false);
  const handleAdminShow = () => setShowAdmin(true);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const signIn = useSignIn();
  const logout = useSignOut();

  const handleSubmit = async () => {
    if (username.length === 0 || password.length === 0) {
      return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: "All boxes must be filled out",
      });
    }

    const loginRes = await post("/api/login", {
      user: username,
      password: password,
    });

    if (loginRes.response === "Failed to query to database!") return;

    if (
      loginRes.response === "No account found!" ||
      loginRes.response === "Account password did not match account!"
    ) {
      return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: "Combination not found",
      });
    }

    signIn({
      token: loginRes.token,
      expiresIn: keepSignIn ? 10080 : 360,
      tokenType: "Bearer",
      authState: {
        username: loginRes.data.username,
        displayname: loginRes.data.displayname,
        role: loginRes.data.role,
      },
    });

    setUsername("");
    setPassword("");
    handleClose();
    await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 250,
      timerProgressBar: true,
    }).fire({
      icon: "success",
      title: "Account login successful",
    });

    return window.location.reload();
  };

  const handleRegisterSubmit = async () => {
    if (
      registerUsername.length === 0 ||
      registerPassword.length === 0 ||
      registerEmail.length === 0
    ) {
      return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: "All boxes must be filled out",
      });
    }

    const registerRes = await post("/api/register", {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    });

    if (registerRes.response === "Failed to query to database!") return;

    if (registerRes.response === "Account name already exists!") {
      return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).fire({
        icon: "error",
        title: "Account name already exists",
      });
    }

    setRegisterEmail("");
    setRegisterUsername("");
    setRegisterPassword("");
    handleRegisterClose();
    handleShow();
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    }).fire({
      icon: "success",
      title: "Account successfully registered",
    });
  };

  const handleLogout = async () => {
    await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 250,
      timerProgressBar: true,
    }).fire({
      icon: "success",
      title: "Account logout successful",
    });
    return logout();
  };

  const handleREmail = (event: any): void =>
    setRegisterEmail(event.target.value);
  const handleRUsername = (event: any): void =>
    setRegisterUsername(event.target.value);
  const handleRPassword = (event: any): void =>
    setRegisterPassword(event.target.value);

  const handleLoginSwitch = (): void => {
    handleRegisterClose();
    handleShow();
  };

  const handleRegisterSwitch = (): void => {
    handleClose();
    handleRegisterShow();
  };
  const handleKeepSignedIn = () => {
    if (keepSignIn) setKeepSignIn(false);
    else setKeepSignIn(true);
  };
  const handleUsername = (event: any): void => setUsername(event.target.value);

  const handlePassword = (event: any): void => setPassword(event.target.value);

  return (
    <>
      {loadedContent ? (
        <LoadedHeader
          auth={auth}
          show={show}
          showRegister={showRegister}
          showAdmin={showAdmin}
          profilePic={profilePic}
          unreadMessages={unreadMessages}
          userData={userData}
          adminData={adminData}
          handleLogout={handleLogout}
          handleAdminShow={handleAdminShow}
          handleClose={handleClose}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleRUsername={handleRUsername}
          handleRPassword={handleRPassword}
          handleREmail={handleREmail}
          handleRegisterSwitch={handleRegisterSwitch}
          handleKeepSignedIn={handleKeepSignedIn}
          handleRegisterClose={handleRegisterClose}
          handleSubmit={handleSubmit}
          handleLoginSwitch={handleLoginSwitch}
          handleRegisterSubmit={handleRegisterSubmit}
          handleAdminClose={handleAdminClose}
          handleShow={handleShow}
        />
      ) : (
        <LoadingHeader />
      )}
    </>
  );
};

export default Header;
