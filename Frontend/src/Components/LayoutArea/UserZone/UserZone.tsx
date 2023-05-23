import { useEffect, useState } from "react";
import "./UserZone.css";
import { AuthActionType, authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";

function UserZone(): JSX.Element {
  const [userName, setUserName] = useState<string>("Guest");

  useEffect(() => {
    displayUser();
    const unsubscribe = authStore.subscribe(displayUser);

    return () => {
      unsubscribe();
    };
  }, []);

  function displayUser() {
    const user = authStore.getState().user;
    setUserName(user ? user.firstName + " " + user.lastName : "Guest");
  }

  function logOut() {
    authStore.dispatch({ type: AuthActionType.Logout });
  }

  return (
    <div className="UserZone">
      <span>Hello {userName} </span>
      <span>
        {userName === "Guest" && (
          <span>
            {" "}
            | <NavLink to={"/login"}>Login</NavLink>
          </span>
        )}
      </span>
      <span>
        {userName !== "Guest" && (
          <span>
            | <NavLink to={"/list"}>All Vacations</NavLink>
            <span> | </span>
            <NavLink to={"/home"} onClick={() => logOut()}>
              Log Out
            </NavLink>
          </span>
        )}
      </span>
    </div>
  );
}

export default UserZone;
