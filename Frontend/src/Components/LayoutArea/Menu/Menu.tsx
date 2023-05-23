import { NavLink } from "react-router-dom";
import UserZone from "../UserZone/UserZone";
import { authStore } from "../../../Redux/AuthState";

function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <NavLink to="/home">Home</NavLink>
      <span> | </span>

      <UserZone />
    </div>
  );
}

export default Menu;
