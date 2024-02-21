import { Route, Routes } from "react-router-dom";
import { AdminRouteGuard } from "../router/guards";
import ParkPage from "./ParkPage";

const ParkRoutes = () => {
    return (
        <>
            <Routes>
                <Route
                    path=""
                    element={
                        <AdminRouteGuard>
                          <ParkPage />
                        </AdminRouteGuard>
                    }
                />
            </Routes>
        </>
    )
}

export default ParkRoutes;