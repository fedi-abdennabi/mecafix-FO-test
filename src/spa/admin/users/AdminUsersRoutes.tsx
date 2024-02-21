import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';
import { PageUserUpdate } from '@/spa/admin/users/PageUserUpdate';
import { PageUsers } from '@/spa/admin/users/PageUsers';
import { PageCreateAccountUser } from '@/spa/superAdmin/account/PageCreateAccount';

const AdminUsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageUsers />} />
      <Route path="/create" element={<PageCreateAccountUser />} />
      <Route path="/:id" element={<PageUserUpdate />} />
      <Route path="/*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
};

export default AdminUsersRoutes;
