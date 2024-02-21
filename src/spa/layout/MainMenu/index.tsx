import React, { useState } from 'react';

import {
  Box,
  BoxProps,
  Flex,
  LinkOverlay,
  Progress,
  Show,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  HiBriefcase,
  HiCloud,
  HiHome,
  HiMenu,
  HiOfficeBuilding,
  HiOutlineAdjustments,
  HiOutlineCurrencyDollar,
  HiOutlineViewGrid,
  HiShieldCheck,
  HiTranslate,
  HiUser,
  HiUserGroup,
} from 'react-icons/hi';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom';

import { usePackDetails } from '@/spa/Packs/Pack.service';
import { useAccount } from '@/spa/account/account.service';
import { useLayoutContext } from '@/spa/layout';

const MainMenuItem = ({
  to,
  baseHref,
  ...rest
}: BoxProps & { to: string } & { baseHref: string }) => {
  const { navOnClose } = useLayoutContext();
  const { pathname } = useLocation();

  const isActive = pathname.startsWith(baseHref);
  return (
    <Box
      as={RouterLink}
      to={to}
      bg={isActive ? 'customBlueDark' : 'transparent'}
      justifyContent="flex-start"
      position="relative"
      opacity={isActive ? 1 : 0.8}
      fontWeight="300"
      borderRadius="md"
      px="4"
      py="2"
      _hover={{
        bg: 'customBlueLight',
        _after: {
          opacity: 1,
          w: '2rem',
        },
      }}
      _focusVisible={{
        outline: 'none',
        bg: 'customBlueLight',
        _after: {
          opacity: 1,
          w: '2rem',
        },
      }}
      onClick={navOnClose}
      {...rest}
    />
  );
};

export const MainMenu = ({ ...rest }) => {
  const { PackDetails, isLoading: detailsLoading } = usePackDetails(
    localStorage.getItem('accountId')
  );
  const { t } = useTranslation(['mainMenu', 'common', 'payment', 'billing']);
  const { account, isAdmin, isManager, isSuperAdmin } =
    useAccount();
  const [isFlotteOpen, setIsFlotteOpen] = useState(false);
  const { pathname } = useLocation();
  let isActiveItem = false;
  if (
    [
      '/admin/users',
      '/admin/language',
      '/admin/company',
      '/admin/company/update',
      '/admin/pack',
      '/admin/payment',
      '/admin/ai-cadre',
      '/admin/billing',
    ].includes(pathname)
  ) {
    isActiveItem = true;
  }

  return (
    <Stack spacing="1" {...rest}>
      {/* admin menu  */}
      {isAdmin && (
        <>
          <MainMenuItem
            baseHref="/admin/home"
            style={{ paddingLeft: '30px' }}
            to="/admin/home"
            display={'flex'}
          >
            <HiHome size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:Home')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/Park"
            style={{ paddingLeft: '30px' }}
            to="/admin/Park"
            display={'flex'}
          >
            <HiOfficeBuilding size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:Park')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/Clients"
            style={{ paddingLeft: '30px' }}
            to="/admin/Clients"
            display={'flex'}
          >
            <HiUser size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:Clients')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/Dashboard"
            style={{ paddingLeft: '30px' }}
            to="/admin/Dashboard"
            display={'flex'}
          >
            <HiShieldCheck size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:Dashboard')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/payment"
            style={{ paddingLeft: '30px' }}
            to="/admin/payment"
            display={'flex'}
          >
            <HiShieldCheck
              size={'1.3rem'}
              style={{ marginRight: '7px' }}
            />{' '}
            {t('mainMenu:Subscriptions')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/billing"
            style={{ paddingLeft: '30px' }}
            to="/admin/billing"
            display={'flex'}
          >
            <HiOutlineCurrencyDollar
              size={'1.3rem'}
              style={{ marginRight: '7px' }}
            />{' '}
            {t('mainMenu:Billing')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/admin/categories"
            style={{ paddingLeft: '30px' }}
            to="/admin/categories"
            display={'flex'}
          >
            <HiShieldCheck
              size={'1.3rem'}
              style={{ marginRight: '7px' }}
            />{' '}
            Categories
          </MainMenuItem>

        </>
      )}

      {/* Super admin menu  */}
      {isSuperAdmin && (
        <>
          {/* <MainMenuItem
            baseHref="/superAdmin/company"
            style={{ paddingLeft: '30px' }}
            to={'/superAdmin/company'}
            display={'flex'}
          >
            <HiBriefcase size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:companiesManagement')}
          </MainMenuItem> */}
          {/* <MainMenuItem
            baseHref="/superAdmin/ai-cadre"
            style={{ paddingLeft: '30px' }}
            to="/superAdmin/ai-cadre"
            display={'flex'}
          >
            <HiCloud size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:ContextManagement')}
          </MainMenuItem> */}
          <MainMenuItem
            baseHref="/superAdmin/users"
            style={{ paddingLeft: '30px' }}
            to="/superAdmin/users"
            display={'flex'}
          >
            <HiUserGroup size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:UsersManagement')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/superAdmin/configuration"
            style={{ paddingLeft: '30px' }}
            to="/superAdmin/configuration"
            display={'flex'}
          >
            <HiOutlineAdjustments
              size={'1.3rem'}
              style={{ marginRight: '7px' }}
            />{' '}
            {t('mainMenu:Configuration')}
          </MainMenuItem>
          {/* <MainMenuItem
            baseHref="/superAdmin/company"
            style={{ paddingLeft: '30px' }}
            to={'/superAdmin/company/update'}
            display={'flex'}
          >
            <HiBriefcase size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:CompanyManagement')}
          </MainMenuItem> */}
          <MainMenuItem
            baseHref="/superAdmin/pack"
            style={{ paddingLeft: '30px' }}
            to="/superAdmin/pack"
            display={'flex'}
          >
            <HiShieldCheck size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:PacksManagement')}
          </MainMenuItem>
          <MainMenuItem
            baseHref="/superAdmin/categories"
            style={{ paddingLeft: '30px' }}
            to="/superAdmin/categories"
            display={'flex'}
          >
            <HiMenu size={'1.3rem'} style={{ marginRight: '7px' }} />{' '}
            {t('mainMenu:categories')}
          </MainMenuItem>

        </>
      )}
    </Stack>
  );
};
