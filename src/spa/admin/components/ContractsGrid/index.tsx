import React from 'react';
import { Box, Flex, Card, GridItem, Text, Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const ContractsGrid = () => {
  const {t}=useTranslation(['DashboardTranslate'])
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
      <GridItem>
        <Card
          data-type="Card"
          overflow="hidden"
          variant="outline"
          bg="gray.300"
          borderWidth={2}
          rounded={20}
          px={6}
          py={6}
          boxShadow={'md'}
          textAlign='center'>
          <Text fontWeight="bold" color="gray.900">
            {t('DashboardTranslate:contracts.invalidEstimate')}
          </Text>
            <Text fontSize="2xl" color="gray.900">
              250
            </Text>
        </Card>
      </GridItem>
      <GridItem>
      <Card
          data-type="Card"
          overflow="hidden"
          variant="outline"
          bg="gray.300"
          borderWidth={2}
          rounded={20}
          px={6}
          py={6}
          boxShadow={'md'}
          textAlign='center'>
          <Text fontWeight="bold" color="gray.900">
          {t('DashboardTranslate:contracts.postponedContracts')}
          </Text>
            <Text fontSize="2xl" color="gray.900">
              150
            </Text>
        </Card>
      </GridItem>
    </Grid>
  );
};
