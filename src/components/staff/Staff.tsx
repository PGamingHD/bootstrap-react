import "./staff.css";

//BOOTSTRAP
import LoadingStaff from "./loading.tsx";
import LoadedStaff from "./loaded.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

const Staff = () => {
  const auth = useAuthUser();
  const [loadedContent, setLoadedContent] = useState(false);
  const [staffData, setStaffData] = useState();
  const [profilePic, setProfilePic] = useState({
    type: "link",
    picture:
      "https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  });

  useEffect(() => {
    setLoadedContent(false);
    document.title = "PGTechnologies - Staff";

    (async () => {
      const res = await axios.get("/api/users/getStaff");
      const profileData = await axios.get("/api/profile/" + auth()?.username);

      setStaffData(res.data.response);
      setProfilePic(profileData.data.response);
    })();

    setLoadedContent(true);
  }, []);

  if (!staffData) return <></>;

  return (
    <>
      {loadedContent ? (
        <LoadedStaff staffData={staffData} profilePic={profilePic} />
      ) : (
        <LoadingStaff />
      )}
    </>
  );
};

export default Staff;
