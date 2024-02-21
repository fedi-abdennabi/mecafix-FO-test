import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from '@/components/ErrorPage';

import PageInputs from '../Inputs/PageInputs';
import { AdminRouteGuard } from '@/spa/router/guards';

const SubCategoryRoutes = () => {
    return (
        <Routes>
            <Route
                path="/:subCategoryId"
                element={
                    <AdminRouteGuard>
                        <PageInputs />
                    </AdminRouteGuard>
                }
            />
            <Route path="*" element={<ErrorPage errorCode={404} />} />
        </Routes>
    );
};

export default SubCategoryRoutes;