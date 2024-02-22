import { Route, Routes } from "react-router-dom";
import { AdminRouteGuard } from "../router/guards";
import PageHome from "./PageHome";


const HomeRoutes = () => {
    return (
            <Routes>
                <Route
                    path=""
                    element={
                        <AdminRouteGuard>
                          <PageHome />
                        </AdminRouteGuard>
                    }
                />
            </Routes>
    )
}

export default HomeRoutes;