import React from 'react';

import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const ProgressCercles = () => {
  const { t } = useTranslation(['DashboardTranslate']);

  return (
    <Flex justify="center" align="center" direction="column" py={6}>
      <Text textAlign="center" mb={4} fontWeight="bold">
      {t('DashboardTranslate:distribution.cardTitle')}
      </Text>
      <Flex justify="center"
        align="center"
        flexWrap="wrap"
        maxW="800px"
        mx="auto">
          <Box flexDirection={'row'} >
          <Text>{t('DashboardTranslate:distribution.company')}</Text>
        <CircularProgress
          size={120}
          value={50}
          color="#012652"
          trackColor="gray.300"
          mr={[2, 8]}
          mb={[2, 0]}>
          <CircularProgressLabel fontSize="2xl"
            fontWeight="extrabold"
            color={'blackAlpha.900'}>50%</CircularProgressLabel>
        </CircularProgress>
        </Box>
        <Box flexDirection={'row'}>
        <Text>{t('DashboardTranslate:distribution.particular')}</Text>
        <CircularProgress  
          justifyContent={'center'}
          size={120}
          value={75}
          color="#012652"
          trackColor="gray.300"
          mr={[2, 8]}
          mb={[2, 0]}>
          <CircularProgressLabel fontSize="2xl"
            fontWeight="extrabold"
            color={'blackAlpha.900'}>75%</CircularProgressLabel>
        </CircularProgress>
        </Box>
        <Box flexDirection={'row'}>
        <Text>{t('DashboardTranslate:distribution.other')}</Text>
        <CircularProgress  size={120}
          value={100}
          color="#012652"
          trackColor="gray.300"
          mr={[2, 8]}
          mb={[2, 0]}>
          <CircularProgressLabel fontSize="2xl"
            fontWeight="extrabold"
            color={'blackAlpha.900'}>100%</CircularProgressLabel>
        </CircularProgress>
        </Box>
      </Flex>
    </Flex>
  );
};
