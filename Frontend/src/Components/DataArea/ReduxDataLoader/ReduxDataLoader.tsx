import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import followerService from "../../../Services/FollowerService";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";

interface ReduxDataLoaderProps {
  children: React.ReactNode;
}

function ReduxDataLoader({ children }: ReduxDataLoaderProps): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    vacationService
      .getAllVacations()
      .then(() => {
        followerService
          .getAllFollowersByVacations()
          .then(() => setLoaded(true));
      })
      .catch((err) => {
        notifyService.error(err);
        navigate("/home");
      });
  }, []);

  return <div className="ReduxDataLoader">{loaded && children}</div>;
}

export default ReduxDataLoader;
