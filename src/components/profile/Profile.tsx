import "./profile.css";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "sweetalert2/src/sweetalert2.scss";

import LoadingProfile from "./loading.tsx";
import LoadedProfile from "./loaded.tsx";

const Profile = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const [loadedContent, setLoadedContent] = useState(false);

  const [profilePic, setProfilePic] = useState({
    type: "link",
    picture:
      "https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  });

  const [file, setFile] = useState(undefined);

  useEffect(() => {
    setLoadedContent(false);
    document.title = "PGTechnologies - Profile";

    (async () => {
      const profileData = await axios.get("/api/profile/" + auth()?.username);

      if (profileData.data.message === "authentication") {
        return navigate("/");
      }

      if (profileData.data.message === "failed") {
        console.log("Failed to query profile picture from db!");
        return navigate("/");
      }

      setProfilePic(profileData.data.response);
      return setLoadedContent(true);
    })();
  }, []);

  return (
    <>
      {loadedContent ? (
        <LoadedProfile
          profilePic={profilePic}
          auth={auth}
          setFile={setFile}
          file={file}
        />
      ) : (
        <LoadingProfile />
      )}
    </>
  );
};

export default Profile;
