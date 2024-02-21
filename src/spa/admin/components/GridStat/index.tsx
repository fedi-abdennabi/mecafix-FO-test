import React from 'react';

import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';


export const GirdStat = () => {
  const { t } = useTranslation(['DashboardTranslate']);
  return (
    <Grid data-type="Grid" templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4} py={4}>
      <GridItem data-type="GridItem">
        <Card
          data-type="Card"
          overflow="hidden"
          variant="outline"
          bg="gray.300"
          borderWidth={2}
          rounded={20}
          boxShadow={'md'}
          textAlign='center'
        >
          <CardBody data-type="CardBody">
            <Stat data-type="Stat" >
              <StatLabel data-type="StatLabel" color="gray.900">
              {t('DashboardTranslate:stats.arrivals')}
              </StatLabel>
              <StatNumber data-type="StatNumber" color="gray.900">
                180
              </StatNumber>
              <StatHelpText data-type="StatHelpText" color="gray.900">
                <StatArrow data-type="StatArrow" type="increase"></StatArrow>
                33.36%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem data-type="GridItem">
        <Card
          data-type="Card"
          overflow="hidden"
          variant="outline"
          bg="gray.300"
          borderWidth={2}
          rounded={20}
          boxShadow={'md'}
          textAlign='center'
        >
          <CardBody data-type="CardBody">
            <Stat data-type="Stat">
              <StatLabel data-type="StatLabel" color="gray.900">
                {t('DashboardTranslate:stats.simpleArrivals')}
              </StatLabel>
              <StatNumber data-type="StatNumber" color="gray.900">
                980
              </StatNumber>
              <StatHelpText data-type="StatHelpText" color="gray.900">
                <StatArrow data-type="StatArrow" type="increase"></StatArrow>
                74.85%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem data-type="GridItem">
        <Card
          data-type="Card"
          overflow="hidden"
          variant="outline"
          bg="gray.300"
          borderWidth={2}
          rounded={20}
          boxShadow={'md'}
          textAlign='center'
        >
          <CardBody data-type="CardBody">
            <Stat data-type="Stat">
              <StatLabel data-type="StatLabel" color="gray.900">
                {t('DashboardTranslate:faults.foundFaults')}
              </StatLabel>
              <StatNumber data-type="StatNumber" color="gray.900">
                560
              </StatNumber>
              <StatHelpText data-type="StatHelpText" color="gray.900">
                <StatArrow data-type="StatArrow" type="decrease"></StatArrow>
                63.12%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem data-type="GridItem">
        <Card
          data-type="Card"
          overflow="hidden"
          variant="outline"
          bg="gray.300"
          borderWidth={2}
          rounded={20}
          boxShadow={'md'}
          textAlign='center'
        >
          <CardBody data-type="CardBody">
            <Stat data-type="Stat">
              <StatLabel data-type="StatLabel" color="gray.900">
                {t('DashboardTranslate:faults.insolubleFailures')}
              </StatLabel>
              <StatNumber data-type="StatNumber" color="gray.900">
                15
              </StatNumber>
              <StatHelpText data-type="StatHelpText" color="gray.900">
                <StatArrow data-type="StatArrow" type="increase"></StatArrow>
                5.12%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
