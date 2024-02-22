import { Box, Flex, Spinner, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useToastError } from '@/components/Toast';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { DotsStepper } from './DotsStepper';
import { StepperWrapper } from './StepperWrapper';
import { useClientCreate,} from './clients.service';
import { CarForm } from './form/CarForm';
import ClientForm from './form/ClientForm';
import { useState } from 'react';
import { useAccount } from '../account/account.service';
interface ErrorResponse {
  email: string[];
}

const PageCreateClient = () => {
  const form = useForm({ subscribe: 'form' });
  const toastError = useToastError();
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'account', 'folder']);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const { account } = useAccount();

  const handleFormSuccess = () => {
    if (account?.role.roleName !== 'admin') {
      setIsThankYouModalOpen(true);
      setTimeout(() => {
        setIsThankYouModalOpen(false);
        navigate(`/client/home/addClient`);
      }, 2500);
    } else {
      navigate(`/admin/home`);
    }
  };

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
      handleFormSuccess();
    },
  });

  return (
    <>
      <Modal isOpen={isThankYouModalOpen} onClose={() => setIsThankYouModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('account:modalSuccessAddFolder.modalTitle')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {t('account:modalSuccessAddFolder.modalContent')}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsThankYouModalOpen(false)}>
              {t('account:modalNoData.closeButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
    </>
  );
};
export default PageCreateClient;
