import React from 'react';

import { ButtonGroup, IconButton, Stack, Text } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { Logo } from '@/components/Logo';
import { useTranslation } from 'react-i18next';

export const FooterStack = () => {
  const {t}=useTranslation(['DashboardTranslate'])
  return (
    <Stack justify="space-between" justifyContent="center" alignItems="center">
      <Logo />
      <ButtonGroup variant="tertiary">
        <IconButton
          as="a"
          href="#"
          aria-label="LinkedIn"
          icon={<FaLinkedin />}
        />
        <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub />} />
        <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter />} />
      </ButtonGroup>
      <Text fontSize="sm" color="fg.subtle">
        &copy; {new Date().getFullYear()} Mecafix, Inc. {t('DashboardTranslate:footer.copyRight')}.
      </Text>
    </Stack>
  );
};
