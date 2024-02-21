import { Route, Routes } from "react-router-dom";
import { AdminRouteGuard } from "../router/guards";
import PageClients from "./PageClients";
import PageCreateClient from "./PageCreateClient";
import PageShowClient from "./PageShowClient";
import PageUpdateClient from "./PageClientUpdate";
import { PageAddCar } from "./PageAddCar";
import { PageUpdateCar } from "./PageUpdateCar";
import PageAddFolder from "./PageAddFolder";

const ClientsRoutes = () => {
    return (
        <>
            <Routes>
                <Route
                    path=""
                    element={
                        <AdminRouteGuard>
                          <PageClients />
                        </AdminRouteGuard>
                    }
                />
                <Route
                    path="/addClient"
                    element={
                        <AdminRouteGuard>
                          <PageCreateClient />
                        </AdminRouteGuard>
                    }
                />
                <Route
                    path="/showClient/:clientId"
                    element={
                        <AdminRouteGuard>
                          <PageShowClient/>
                        </AdminRouteGuard>
                    }
                />
                <Route
                    path="/updateClient/:clientId"
                    element={
                        <AdminRouteGuard>
                          <PageUpdateClient/>
                        </AdminRouteGuard>
                    }
                />
                <Route
                    path="/:clientId/addCar"
                    element={
                        <AdminRouteGuard>
                          <PageAddCar/>
                        </AdminRouteGuard>
                    }
                />
                <Route
                    path="/:clientId/updateCar/:carId"
                    element={
                        <AdminRouteGuard>
                          <PageUpdateCar />
                        </AdminRouteGuard>
                    }
                />
                <Route
                    path="/client/:clientId/addFolder"
                    element={
                        <AdminRouteGuard>
                          <PageAddFolder/>
                        </AdminRouteGuard>
                    }
                />
            </Routes>
        </>
    )
}

export default ClientsRoutes;