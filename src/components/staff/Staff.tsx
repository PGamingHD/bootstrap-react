import "./staff.css";

//BOOTSTRAP
import LoadingStaff from "./loading.tsx";
import LoadedStaff from "./loaded.tsx";
import { useEffect, useState } from "react";

const Staff = () => {
  const [loadedContent, setLoadedContent] = useState(false);

  useEffect(() => {
    setLoadedContent(false);
    setTimeout(() => {
      setLoadedContent(true);
    }, 50);
  }, []);

  return <>{loadedContent ? <LoadedStaff /> : <LoadingStaff />}</>;
};

export default Staff;
