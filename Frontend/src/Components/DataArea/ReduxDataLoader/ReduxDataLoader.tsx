import { useEffect } from "react";
import { authStore } from "../../../Redux/AuthState";
import dataLoadService from "../../../Services/DataLoadService";

interface ReduxDataLoaderProps {
  children: React.ReactNode;
}

function ReduxDataLoader({ children }: ReduxDataLoaderProps): JSX.Element {
  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      if (authStore.getState().user) {
        console.log("All data loaded!");

        dataLoadService.LoadAllData();
      }
    });

    return () => unsubscribe();
  });

  return <div className="ReduxDataLoader">{children}</div>;
}

export default ReduxDataLoader;
