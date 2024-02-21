import { useState } from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';
import { FormizStep, useForm } from '@formiz/core';
import { isEmail, isMaxLength, isMinLength, isNumber } from '@formiz/validations';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';
import { Page, PageContent, PageTopBar } from '@/spa/layout';
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
  const { t } = useTranslation(['common', 'account']);
  const [isCompany, setIsCompany] = useState(false);
  const form = useForm();
  const navigate = useNavigate();

  const handleTypeChange = (selectedValue: any) => {
    setIsCompany(selectedValue === 'company');
  };

  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar m="1" showBack onBack={() => navigate(-1)}>
        </PageTopBar>
        <FormizStep name="step1" label="step1" >
          <Box
            p="6"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            _dark={{ bg: 'blackAlpha.400' }}
          >
            <Heading size="lg">
              {t('account:client.title')}
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
                required={t('account:type.required') as string}
              />

              {!isCompany && (
                <>
                  <FieldInput
                    name="firstName"
                    label={t('account:client.firstname')}
                    required={t('account:data.firstname.required') as string}
                  />
                  <FieldInput
                    name="lastName"
                    label={t('account:client.lastname')}
                    required={t('account:data.lastname.required') as string}
                  />
                </>
              )}
              <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                {isCompany && (
                  <FieldInput
                    name="campanyName"
                    label={t('account:client.company.label')}
                    required={t('account:client.company.required') as string}
                  />
                )}
                <FieldInput
                  name="email"
                  label={t('account:client.email')}
                  required={t('account:data.email.required') as string}
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
                  name="phoneNumber"
                  required={t('account:client.phoneNumber.required') as string}
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
                  name="adresse"
                  required={t('account:client.adresse.required') as string}
                  label={t('account:client.adresse.label') as string}
                />
                <FieldInput
                  name="city"
                  label={t('account:client.city.label') as string}
                  required={t('account:client.city.required') as string}
                />
                <FieldInput
                  name="postalCode"
                  required={t('account:client.PostalCode.required') as string}
                  label={t('account:client.PostalCode.label')}
                />
              </Stack>
            </Stack>
          </Box>
        </FormizStep>
      </PageContent >
    </Page >

  );
};
export default ClientForm;
