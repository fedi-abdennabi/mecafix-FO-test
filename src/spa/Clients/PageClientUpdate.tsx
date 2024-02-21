import { useState } from 'react';

import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { isEmail, isMaxLength, isMinLength, isNumber } from '@formiz/validations';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';
import { Page, PageContent, PageTopBar } from '@/spa/layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useClient, useClientUpdate } from "./clients.service";
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Clients } from './client.type';

const PageUpdateClient = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'account']);
  const [isCompany, setIsCompany] = useState(false);
  const params = useParams();
  const clientId = params.clientId;
  const { client } = useClient(clientId);

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();
  const { mutate: updateClient, isLoading: updateClientLoading } = useClientUpdate(
    clientId,
    {
      onError: (error) => {
        if (error.response) {
          toastError({
            title:
              (error?.response?.data as string) ||
              t('common:use.errorOccurred'),
          });
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: t('account:client.successUpdate'),
        });
        navigate(`/admin/clients/showClient/${clientId}`);
      },
    }
  );
  const submitUpdateClient = async (values: Clients) => {
    const newClient = {
      ...values,
    };
    await updateClient(newClient);
  };

  const handleTypeChange = (selectedValue: TODO) => {
    setIsCompany(selectedValue === 'company');
  };

  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar m="1" showBack onBack={() => navigate(-1)}>
        </PageTopBar>
        <Formiz autoForm onValidSubmit={submitUpdateClient} initialValues={{
          type: client?.type || '',
          firstName: client?.firstName || '',
          lastName: client?.lastName || '',
          email: client?.email || '',
          phone: client?.phone || '',
          adress: client?.adress || '',
          city: client?.city || '',
          postalCode: client?.postalCode || ''
        }} >
          <Box
            p="6"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            _dark={{ bg: 'blackAlpha.400' }}
          >
            <Heading size="lg">
              {t('account:client.update')}
            </Heading>
            <Stack spacing="4" mt="8">
              <FieldSelect
                name="type"
                label={t('account:type.label')}
                options={[
                  {
                    label: t(`account:type.Men`),
                    value: 'men',
                  },
                  {
                    label: t(`account:type.Women`),
                    value: 'women',
                  },
                  {
                    label: t(`account:type.Company`),
                    value: 'company',
                  },
                ]}
                onChange={handleTypeChange}
              />

              {!isCompany && (
                <>
                  <FieldInput
                    name="firstName"
                    label={t('account:client.firstname')}
                  />
                  <FieldInput
                    name="lastName"
                    label={t('account:client.lastname')}
                    defaultValue={client?.lastName}
                  />
                </>
              )}
              <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                {isCompany && (
                  <FieldInput
                    name="campanyName"
                    label={t('account:client.company.label')}
                  />
                )}
                <FieldInput
                  name="email"
                  label={t('account:client.email')}
                  validations={[
                    {
                      rule: isEmail(),
                      message: t('account:data.email.invalid'),
                    },
                    {
                      rule: isMinLength(5),
                      message: t('account:data.email.tooShort', { min: 5 }),
                    },
                    {
                      rule: isMaxLength(254),
                      message: t('account:data.email.tooLong', { min: 254 }),
                    },
                  ]}
                />
              </Stack>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                <FieldInput
                  name="phone"
                  label={t('account:client.phoneNumber.label')}
                  validations={[
                    {
                      rule: isNumber(),
                      message: t('account:client.phoneNumber.isNumber'),
                    },
                  ]}
                />
                {isCompany && (
                  <FieldInput
                    name="registrationNumber"
                    label={t('account:client.RegistrationNumber')}
                  />
                )}
              </Stack>
              {isCompany && (
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                  <FieldInput
                    name="sectorOfActivity"
                    label={t('account:client.SectorOfActivity')}
                  />
                  <FieldInput
                    name="headquartersAddress"
                    label={t('account:client.HeadquartersAddress')}
                  />
                </Stack>
              )}
              <Stack direction={{ base: 'column', sm: 'row' }} spacing="4">
                <FieldInput
                  name="adress"
                  label={t('account:client.adresse.label') as string}
                />
                <FieldInput
                  name="city"
                  label={t('account:client.city.label') as string}
                />
                <FieldInput
                  name="postalCode"
                  label={t('account:client.PostalCode.label')}
                />
              </Stack>
              <Button style={{ margin: '24px 2px' }} colorScheme='blue' isLoading={updateClientLoading} type='submit' >{t('account:carte.submit-button')}</Button>
            </Stack>
          </Box>
        </Formiz>
      </PageContent >
    </Page >

  );
};
export default PageUpdateClient;
