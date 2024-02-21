import { Route, Routes } from "react-router-dom";
import { AdminRouteGuard } from "../router/guards";
import { PageCard } from "./PageCard";
import { PageUpdateCard } from "./PageUpdateCard";

const CardRoutes = () => {
    return (
 
            <Routes>
                <Route
                    path="/"
                    element={
                        <AdminRouteGuard>
                          <PageCard />
                        </AdminRouteGuard>
                    }
                />
                <Route
                path="/update/:folderId"
                element={
                    <AdminRouteGuard>
                        <PageUpdateCard />
                    </AdminRouteGuard>
                }
            />
            </Routes>
     
    )
}

export default CardRoutes;