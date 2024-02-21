import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from '@/components/ErrorPage';
import { SuperAdminRouteGuard } from '../router/guards';
import PageCategories from './PageCategories';
import DefaultSubCategorieRoutes from './defaultSubCategories/DefaultSubCategorieRoutes';

const CategoriesRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SuperAdminRouteGuard>
                        <PageCategories />
                    </SuperAdminRouteGuard>
                }
            />
             <Route
                path="/*"
                element={
                    <SuperAdminRouteGuard>
                        <DefaultSubCategorieRoutes />
                    </SuperAdminRouteGuard>
                }
            />
            <Route path="*" element={<ErrorPage errorCode={404} />} />
        </Routes>
    );
};

export default CategoriesRoutes;
