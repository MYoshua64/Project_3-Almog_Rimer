import { Navigate, Route, Routes } from "react-router-dom";
import { RoleModel } from "../../../Models/RoleModel";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import RolesAuthRoute from "../../AuthArea/RolesAuthRoute/RolesAuthRoute";
import FollowReport from "../../DataArea/FollowReport/FollowReport";
import Insert from "../../DataArea/Insert/AddVacation";
import List from "../../DataArea/List/List";
import UpdateVacation from "../../DataArea/UpdateVacation/UpdateVacation";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import ReduxDataLoader from "../../DataArea/ReduxDataLoader/ReduxDataLoader";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route
        path="/list"
        element={
          <RolesAuthRoute>
            <ReduxDataLoader>
              <List />
            </ReduxDataLoader>
          </RolesAuthRoute>
        }
      />
      <Route
        path="/insert"
        element={
          <RolesAuthRoute permittedRoles={[RoleModel.Admin]}>
            <Insert />
          </RolesAuthRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/vacations/update/:vacationId"
        element={
          <RolesAuthRoute permittedRoles={[RoleModel.Admin]}>
            <UpdateVacation />
          </RolesAuthRoute>
        }
      />
      <Route
        path={"/vacations/report"}
        element={
          <RolesAuthRoute permittedRoles={[RoleModel.Admin]}>
            <ReduxDataLoader>
              <FollowReport />
            </ReduxDataLoader>
          </RolesAuthRoute>
        }
      />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
