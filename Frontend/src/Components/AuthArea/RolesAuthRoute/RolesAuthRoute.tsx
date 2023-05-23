import { Navigate } from "react-router-dom";
import { RoleModel } from "../../../Models/RoleModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";

interface RolesAuthRouteProps {
  children?: React.ReactNode;
  permittedRoles?: RoleModel[];
}

function RolesAuthRoute({
  children,
  permittedRoles = [RoleModel.Admin, RoleModel.User],
}: RolesAuthRouteProps): JSX.Element {
  const user = authStore.getState().user;
  if (!user) {
    //user is not logged in, kick them to login screen
    notifyService.error("You must be logged in");
    return <Navigate to={"/login"} />;
  }

  const isPermitted = permittedRoles.some((role) => user?.roleId === role);

  if (isPermitted) {
    //user has one of the necessary roles, display component
    return <div>{children}</div>;
  } else {
    //user is not permitted by their role, kick them home
    notifyService.error("Unauthorized access");
    return <Navigate to={"/home"} />;
  }
}

export default RolesAuthRoute;
