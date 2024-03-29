import React, { Suspense } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { PageLogin } from '@/spa/auth/PageLogin';
import { PageLogout } from '@/spa/auth/PageLogout';
import { Layout, Loader } from '@/spa/layout';

import {
  AuthenticatedRouteGuard,
  PublicOnlyRouteGuard,
} from '@/spa/router/guards';

import { PageActivate } from './account/PageActivate';
import { useAuthContext } from './auth/AuthContext';
import FolderRoutes from './folder/folder.route';
import { useAccount } from './account/account.service';

const AdminRoutes = React.lazy(() => import('@/spa/admin/AdminRoutes'));
const ClientRoutes = React.lazy(() => import('@/spa/client/ClientRoutes'));
const AccountRoutes = React.lazy(() => import('@/spa/account/AccountRoutes'));
const SuperAdminRoutes = React.lazy(() => import('@/spa/superAdmin/account/accountRoutes'));
const DashboardRoutes = React.lazy(() => import('@/spa/dashboard/DashboardRoutes')
);

export const App = () => {
  const { isAuthenticated } = useAuthContext();
  const role = localStorage.getItem('role');

  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app">
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Navigate
                    to={
                      isAuthenticated && (role === 'admin' || role==='client') ? '/admin/home' :
                        isAuthenticated && role === 'superAdmin' ? '/superAdmin/users' : '/login'
                    }
                    replace
                  />
                }
              />

              <Route
                path="login"
                element={
                  <PublicOnlyRouteGuard>
                    <PageLogin />
                  </PublicOnlyRouteGuard>
                }
              />

              <Route
                path=":key-confirm-account"
                element={
                  <PublicOnlyRouteGuard>
                    <PageActivate />
                  </PublicOnlyRouteGuard>
                }
              />

              <Route
                path="logout"
                element={
                  <ErrorBoundary>
                    <PageLogout />
                  </ErrorBoundary>
                }
              />

              <Route
                path="account/*"
                element={
                  <ErrorBoundary>
                    <AccountRoutes />
                  </ErrorBoundary>
                }
              />

              <Route
                path="admin/*"
                element={
                  <AuthenticatedRouteGuard>
                    <AdminRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="client/*"
                element={
                  <AuthenticatedRouteGuard>
                    <ClientRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="superAdmin/*"
                element={
                  <AuthenticatedRouteGuard>
                    <SuperAdminRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="folder/*"
                element={
                  <AuthenticatedRouteGuard>
                    <FolderRoutes />
                  </AuthenticatedRouteGuard>
                }
              />

              <Route
                path="*"
                element={
                  <ErrorPage errorCode={404} />
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};
