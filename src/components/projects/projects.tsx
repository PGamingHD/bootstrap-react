import "./projects.css";
import { useEffect, useState } from "react";
import LoadedProjects from "./loaded.tsx";
import LoadingProjects from "./loading.tsx";
import Axios from "axios";

const Profile = () => {
  const [loadedContent, setLoadedContent] = useState(false);
  const [previousData, setPreviousData] = useState();
  const [ongoingData, setOngoingData] = useState();

  useEffect(() => {
    document.title = "PGTechnologies - Projects";
    setLoadedContent(false);
    (async () => {
      const { data } = await Axios.get("/api/projects");

      const ongoingProjects = data.response.filter(
        (data: any): boolean => data.projectstatus === "ONGOING"
      );
      const previousProjects = data.response.filter(
        (data: any): boolean => data.projectstatus === "PREVIOUS"
      );

      setPreviousData(previousProjects);
      setOngoingData(ongoingProjects);
    })();
    setLoadedContent(true);
  }, []);

  if (!ongoingData || !previousData) return <></>;

  return (
    <>
      {loadedContent ? (
        <LoadedProjects ongoingData={ongoingData} previousData={previousData} />
      ) : (
        <LoadingProjects />
      )}
    </>
  );
};

export default Profile;
