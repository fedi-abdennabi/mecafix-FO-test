import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "@/components/ErrorPage";
import PackRoutes from "@/spa/Packs/PackRoutes";
import { SuperAdminRouteGuard } from "@/spa/router/guards";
import AdminUsersRoutes from "@/spa/admin/users/AdminUsersRoutes";
import ConfigurationRoutes from "@/spa/Configuration/ConfigurationRoutes";
import CategoriesRoutes from "@/spa/defaultCategories/CategoriesRoutes";

const AccountRoutes = () => {
  return (
    <Routes>
      <Route
        path="pack/*"
        element={<PackRoutes />}
      />
      <Route
        path="users/*"
        element={
          <SuperAdminRouteGuard>
            <AdminUsersRoutes />
          </SuperAdminRouteGuard>}
      />
      <Route
        path="configuration/*"
        element={
          <SuperAdminRouteGuard>
            <ConfigurationRoutes />
          </SuperAdminRouteGuard>
        }
      />
        <Route
        path="categories/*"
        element={
          <SuperAdminRouteGuard>
             <CategoriesRoutes />
          </SuperAdminRouteGuard>
        }
      />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default AccountRoutes;
