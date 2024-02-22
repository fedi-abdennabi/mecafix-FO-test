import { Route, Routes } from "react-router-dom";
import PageInputs from "../Categories/Inputs/PageInputs";
import { AdminRouteGuard } from "../router/guards";
import { GeneratePdf } from "./GeneratePdf";
import { PageFolder } from "./PageFolder";
import { PageHistoryFolder } from "./PageHistoryFolder";
import { PageVisualizeDiagnosis } from "./PageVisualizeDiagnosis";

const FolderRoutes = () => {
    return (

        <Routes>
            <Route
                path="/:folderId"
                element={
                    <AdminRouteGuard>
                        <PageFolder />
                    </AdminRouteGuard>
                }
            />
           
        <Route
                path="/category/subCategory/:subCategoryId"
                element={
                    <AdminRouteGuard>
                        <PageInputs />
                    </AdminRouteGuard>
                }
            />
        <Route
                path="/generatepdf"
                element={
                    <AdminRouteGuard>
                        <GeneratePdf/>
                    </AdminRouteGuard>
                }
            />
                 <Route
                    path="/:folderId/history"
                    element={
                        <AdminRouteGuard>
                          <PageHistoryFolder />
                        </AdminRouteGuard>
                    }
                />
                <Route
                    path="/folder/:folderId/history/diagnosis"
                    element={
                        <AdminRouteGuard>
                          <PageVisualizeDiagnosis />
                        </AdminRouteGuard>
                    }
                />
        </Routes>

    )
}

export default FolderRoutes;