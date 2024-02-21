import React from 'react';

import { Route , Routes } from 'react-router-dom';
import { ErrorPage } from '@/components/ErrorPage';
import PageDefaultSubCategorie from './PageDefaultSubCategorie';
import { SuperAdminRouteGuard } from '@/spa/router/guards';
import PageDefaultInputs from '../defaultInput/PageDefaultInputs';

const DefaultSubCategorieRoutes = () => {
    return (
        <Routes>
            <Route
                path="/:id"
                element={
                    <SuperAdminRouteGuard>
                        <PageDefaultSubCategorie />
                    </SuperAdminRouteGuard>
                }
            />
            <Route
                path="/subCategorie/:defaultSubCategoryId"
                element={
                    <SuperAdminRouteGuard>
                        <PageDefaultInputs />
                    </SuperAdminRouteGuard>
                }
            />
            <Route 
                 path="*" 
                 element={<ErrorPage errorCode={404} />} />
        </Routes>
    );
};

export default DefaultSubCategorieRoutes;
