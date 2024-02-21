import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from '@/components/ErrorPage';
import AcceuilRoutes from '../Acceuil/HomeRoutes';
import ClientsRoutes from '../Clients/ClientsRoutes';
import PaymentRoutes from '../Paiement/PaymentRoutes';
import ParkRoutes from '../Park/ParkRoutes';
import { useAccount } from '../account/account.service';
import BillingRoutes from '../billing/BillingRoutes';
import DashboardRoutes from '../dashboard/DashboardRoutes';
import { AdminRouteGuard, AuthenticatedRouteGuard } from '../router/guards';
import FolderRoutes from '../folder/folder.route';
import CardRoutes from '../Card/card.route';
import CategoriesRoutes from '../defaultCategoriesAdmin/CategoriesRoutes';

const AdminRoutes = () => {
  const { isLoading: accountLoading } = useAccount();
  return (
    <Routes>
      {!accountLoading && (
        <>
          <Route
            path="dashboard/*"
            element={
              <AuthenticatedRouteGuard>
                <DashboardRoutes />
              </AuthenticatedRouteGuard>
            }
          />
          <Route
            path="home/*"
            element={
              <AdminRouteGuard>
                <AcceuilRoutes />
              </AdminRouteGuard>
            }
          />
          <Route
            path="Park/*"
            element={
              <AdminRouteGuard>
                <ParkRoutes />
              </AdminRouteGuard>
            }

          />
          <Route
            path="billing/*"
            element={
              <AdminRouteGuard>
                <BillingRoutes />
              </AdminRouteGuard>
            }
          />
          <Route
            path="payment/*"
            element={
              <AdminRouteGuard>
                <PaymentRoutes />{' '}
              </AdminRouteGuard>
            }
          />
          <Route
            path="Clients/*"
            element={
              <AdminRouteGuard>
                <ClientsRoutes />
              </AdminRouteGuard>
            }

          />

          <Route
            path="folder/*"
            element={
              <AdminRouteGuard>
                <FolderRoutes />
              </AdminRouteGuard>
            }
          />
          <Route
            path="card/*"
            element={
              <AdminRouteGuard>
                <CardRoutes />
              </AdminRouteGuard>
            }
          />

          <Route
            path="categories/*"
            element={
              <AdminRouteGuard>
                <CategoriesRoutes />
              </AdminRouteGuard>
            }
          />

          <Route path="*" element={<ErrorPage errorCode={404} />} />
        </>
      )}
    </Routes>
  );
};

export default AdminRoutes;
