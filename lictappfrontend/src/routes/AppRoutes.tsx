import { Route, Routes } from "react-router";
import { Login } from "../page/Login";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout";
import { Profile } from "../page/Profile";
import { OpportunityAdmin } from "../page/Admin/OpportunityAdmin";
import { UsuarioAdmin } from "../page/Admin/UsuarioAdmin";
import { OpportunityUser } from "../page/user/OpportunityUser";
import { MyOpportunityUser } from "../page/user/MyOpportunityUser";
import ProtectedRoute from "../components/molecules/auth/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
       <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="opportunities-admin" element={<OpportunityAdmin />} />
          <Route
            path="users-admin"
            element={<UsuarioAdmin></UsuarioAdmin>}
          ></Route>
          <Route
            path="opportunities-new"
            element={<OpportunityUser></OpportunityUser>}
          ></Route>
          <Route
            path="opportunities-user"
            element={<MyOpportunityUser></MyOpportunityUser>}
          ></Route>
        </Route>
      </Route>
    </Routes>
  );
};
