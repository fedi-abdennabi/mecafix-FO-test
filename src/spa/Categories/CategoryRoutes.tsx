
import { ErrorPage } from '@/components/ErrorPage';
import { Route, Routes } from 'react-router-dom';
import { AdminRouteGuard } from '../router/guards';
import SubCategoryRoutes from './SubCategories/SubCategoryRoutes';

const CategorysRoutes = () => {
    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <AdminRouteGuard>
                        <SubCategoryRoutes />
                    </AdminRouteGuard>
                }
            />
            <Route path="*" element={<ErrorPage errorCode={404} />} />
        </Routes>
    );
};

export default CategorysRoutes;
