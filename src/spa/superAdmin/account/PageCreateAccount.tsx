import { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMaxLength, isMinLength, isNumber } from '@formiz/validations';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageTopBar } from '@/spa/layout';
import { useAccountCreate } from './account.service';

interface ErrorResponseData {
  clientEmail?: string[];
  adminEmail?: string[];
}

export const PageCreateAccountUser = () => {
  const toastError = useToastError();
  const toastSuccess = useToastSuccess();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['common', 'account']);
  const form = useForm({
    subscribe: { form: true, fields: ['langKey'] },
  });
  const [invalidForm, setInvalidForm] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(form.values?.langKey);
  }, [i18n, form.values?.langKey]);

  const { mutate: createNewAccount, isLoading: createAccountLoading } =
    useAccountCreate({
      onError: (error) => {
        if (error.response) {
          const responseData = error.response.data as ErrorResponseData;
          const clientErrorMessage = responseData.clientEmail?.[0] as string;
          const adminErrorMessage = responseData.adminEmail?.[0] as string;
          const errorMessage = clientErrorMessage || adminErrorMessage || t('common:use.errorOccurred');
          
          toastError({
            title: errorMessage,
          });
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: t('account:SuccessAdd'),
        });
        navigate(-1);
      },
    });

  const submitCreateUser = async (values: TODO) => {
    const newAccount = {
      ...values,
    };
    await createNewAccount(newAccount);
  };

  return (
    <Page containerSize="full">
      <PageTopBar m="2" showBack onBack={() => navigate(-1)}>
        <Heading size="lg" mb="4">
          {t('account:data.addNewUser')}
        </Heading>
      </PageTopBar>
      <Stack>
        <Box p="2" pb="4rem">
          <Formiz
            id="register-form"
            autoForm
            onValidSubmit={submitCreateUser}
            connect={form}
          >
            <Box
              p="6"
              borderRadius="md"
              boxShadow="md"
              bg="white"
              _dark={{ bg: 'blackAlpha.400' }}
            >
              <Stack spacing="4">
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                  <FieldSelect
                    name="langKey"
                    label={t('account:data.language.label')}
                    options={[
                      {
                        label: t(`common:languages.FR`),
                        value: 'FR',
                      },
                      {
                        label: t(`common:languages.en`),
                        value: 'en',
                      },
                    ]}
                    defaultValue={i18n.language}
                  />
                  <FieldSelect
                    name="gender"
                    label={t('account:data.gender.label')}
                    options={[
                      {
                        label: t(`account:data.gender.options.women`),
                        value: 'Women',
                      },
                      {
                        label: t(`account:data.gender.options.men`),
                        value: 'Men',
                      },
                    ]}
                    defaultValue={i18n.language}
                  />
                </Stack>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                  <FieldInput
                    name="firstName"
                    label={t('account:data.firstname.label')}
                    required={t('account:data.firstname.required') as string}
                  />
                  <FieldInput
                    name="lastName"
                    label={t('account:data.lastname.label')}
                    required={t('account:data.lastname.required') as string}
                  />
                </Stack>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                  <FieldInput
                    name="adresse"
                    label={t('account:data.adresse.label')}
                    required={'Champ obligatoire' as string}
                  />
                  <FieldInput
                    name="city"
                    label={t('account:data.city.label')}
                    required={'Champ obligatoire' as string}
                  />
                </Stack>
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
                <Heading size="md" my="6">
                  {t('account:data.accessAdmin')}
                </Heading>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                  <FieldInput
                    name="adminEmail"
                    label={t('account:data.adminEmail.label')}
                    required={t('account:data.adminEmail.required') as string}
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
                  <FieldInput
                    name="adminPassword"
                    type="password"
                    label={t('account:data.adminPassword.label')}
                    required={
                      t('account:data.adminPassword.required') as string
                    }
                    validations={[
                      {
                        rule: isMinLength(4),
                        message: t('account:data.adminPassword.tooShort', {
                          min: 4,
                        }),
                      },
                      {
                        rule: isMaxLength(50),
                        message: t('account:data.adminPassword.tooLong', {
                          min: 50,
                        }),
                      },
                    ]}
                  />
                </Stack>
                <Heading size="md" my="6">
                  {t('account:data.accessClient')}
                </Heading>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                  <FieldInput
                    name="clientEmail"
                    label={t('account:data.clientEmail.label')}
                    required={t('account:data.clientEmail.required') as string}
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
                  <FieldInput
                    name="clientPassword"
                    type="password"
                    label={t('account:data.clientPassword.label')}

                    required={
                      t('account:data.clientPassword.required') as string
                    }
                    validations={[
                      {
                        rule: isMinLength(4),
                        message: t('account:data.adminPassword.tooShort', {
                          min: 4,
                        }),
                      },
                      {
                        rule: isMaxLength(50),
                        message: t('account:data.adminPassword.tooLong', {
                          min: 50,
                        }),
                      },
                    ]}
                  />
                </Stack>

                <Flex>
                  <Button
                    isLoading={createAccountLoading}
                    isDisabled={form.isSubmitted && !form.isValid}
                    type="submit"
                    variant="@primary"
                    ms="auto"
                    onClick={() => {
                      setInvalidForm(true);
                      setTimeout(() => {
                        setInvalidForm(false);
                      }, 100);
                    }}
                  >
                    {t('account:register.actions.create')}
                  </Button>
                </Flex>
                {invalidForm && <ScrollToFirstError />}
              </Stack>
            </Box>
          </Formiz>
        </Box>
      </Stack>
    </Page>
  );
};