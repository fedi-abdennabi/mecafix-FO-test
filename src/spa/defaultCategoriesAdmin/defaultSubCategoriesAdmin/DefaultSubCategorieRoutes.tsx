import React from 'react';

import {  Route, Routes } from 'react-router-dom';
import { ErrorPage } from '@/components/ErrorPage';
import PageDefaultSubCategorie from './PageDefaultSubCategorie';
import { AdminRouteGuard } from '@/spa/router/guards';
import PageDefaultInputs from '../defaultInputAdmin/PageDefaultInputs';

const DefaultSubCategorieRoutes = () => {
    return (
        <Routes>
            <Route
                path="/:id"
                element={
                    <AdminRouteGuard>
                        <PageDefaultSubCategorie />
                    </AdminRouteGuard>
                }
            />
            <Route
                path="/subCategorie/:defaultSubCategoryId"
                element={
                    <AdminRouteGuard>
                        <PageDefaultInputs />
                    </AdminRouteGuard>
                }
            />
            <Route path="*" element={<ErrorPage errorCode={404} />} />
        </Routes>
    );
};

export default DefaultSubCategorieRoutes;
