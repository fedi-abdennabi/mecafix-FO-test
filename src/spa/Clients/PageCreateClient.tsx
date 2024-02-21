import { Box, Flex, Spinner, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useToastError, useToastSuccess } from '@/components/Toast';

import { DotsStepper } from './DotsStepper';
import { StepperWrapper } from './StepperWrapper';
import { useClientCreate } from './clients.service';
import { CarForm } from './form/CarForm';
import ClientForm from './form/ClientForm';
interface ErrorResponse {
  email: string[];
}

const PageCreateClient = () => {
  const form = useForm({ subscribe: 'form' });
  const toastError = useToastError();
  const toastSuccess = useToastSuccess();
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'folder']);
  const { mutate: saveClientData, isLoading: isFormLoading } = useClientCreate({
    onError: (error) => {
      if (error.response) {
        toastError({
          title:
          (error.response?.data as ErrorResponse)?.email?.[0] || t('common:use.errorOccurred'),
        });
      }
    },
    onSuccess: () => {
      toastSuccess({
        title: t('folder:SuccessAdd'),
      });
      navigate(-1);
    },
  });

  return (
    <Box>
      {isFormLoading && (
        <Flex align="center" justify="center" height="100vh">
          <Spinner size="xl" color="blue" />
        </Flex>
      )}
      {!isFormLoading && (
        <Formiz id="register-form" connect={form} onValidSubmit={saveClientData}>
          <form noValidate onSubmit={form.submitStep}>
            <ClientForm />
            <CarForm />
            <Stack spacing="6" mt="8">
              <StepperWrapper title="">
                <DotsStepper />
              </StepperWrapper>
            </Stack>
          </form>
        </Formiz>
      )}
    </Box>
  );
};
export default PageCreateClient;
