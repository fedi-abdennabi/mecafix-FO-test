import {
  Avatar,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

type UserData = {
  name: string;
  email: string;
  role: string;
  status: string;
  avatarSrc?: string;
};

type UserTabsProps = {
  users: UserData[];
};

const UserTabs: React.FC<UserTabsProps> = ({ users }) => {
  const { t } = useTranslation(['DashboardTranslate']);
   if (!Array.isArray(users) || users.length === 0) {
    return <div>No user data available</div>; 
  }
  return (
    <Box overflowX="auto" my={6}>
      <Table minWidth="100%">
        <Thead>
          <Tr>
            <Th>{t('DashboardTranslate:tabs.user')}</Th>
            <Th>{t('DashboardTranslate:tabs.email')}</Th>
            <Th>{t('DashboardTranslate:tabs.role')}</Th>
            <Th>{t('DashboardTranslate:tabs.status')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>
                {user.avatarSrc && <Avatar name={user.name} src={user.avatarSrc} />}
                <Text>{user.name}</Text>
              </Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const usersData: UserData[] = [
  {
    name: 'Mongi',
    email: 'mongi@gmail.com',
    role: 'Manager',
    status: 'Active',
    avatarSrc: 'https://bit.ly/dan-abramov',
  },
  {
    name: 'Mongi',
    email: 'mongi@gmail.com',
    role: 'Manager',
    status: 'Active',
    avatarSrc: 'https://bit.ly/dan-abramov',
  },
];

export { UserTabs, usersData };

