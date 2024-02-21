import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from '@/components/ErrorPage';
import { AdminRouteGuard } from '../router/guards';
import PageCategories from './PageCategories';
import DefaultSubCategorieRoutes from './defaultSubCategoriesAdmin/DefaultSubCategorieRoutes';

const CategoriesRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AdminRouteGuard>
                        <PageCategories />
                    </AdminRouteGuard>
                }
            />
             <Route
                path="/*"
                element={
                    <AdminRouteGuard>
                        <DefaultSubCategorieRoutes />
                    </AdminRouteGuard>
                }
            />
            <Route path="*" element={<ErrorPage errorCode={404} />} />
        </Routes>
    );
};

export default CategoriesRoutes;
