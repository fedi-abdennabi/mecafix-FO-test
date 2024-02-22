import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';
import { ClientRouteGuard } from '../router/guards/ClientRouteGuard';
import { useAccount } from '../account/account.service';
import PageHomeClient from '../Acceuil/PageHomeClient';
import PageCreateClient from '../Clients/PageCreateClient';


const ClientRoutes = () => {
  const { isLoading: accountLoading } = useAccount();
  return (
    <Routes>
      {!accountLoading && (
        <>
          <Route
            path="home/"
            element={
              <ClientRouteGuard>
                <PageHomeClient />
              </ClientRouteGuard>
            }
          />
          <Route
            path="home/addClient/"
            element={
              <ClientRouteGuard>
                <PageCreateClient />
              </ClientRouteGuard>
            }
          />
          <Route path="*" element={<ErrorPage errorCode={404} />} />
        </>
      )}
    </Routes>
  );
};

export default ClientRoutes;
