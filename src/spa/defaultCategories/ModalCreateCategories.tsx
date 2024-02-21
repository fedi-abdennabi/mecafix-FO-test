import React, { useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useDefaultCategoriesCreate } from './Categories.service';
import { useToastError, useToastSuccess } from '@/components/Toast';

const ModalCreateCategories = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation(['common', 'pack']);
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();

    const { mutate: createDefaultCategory, isLoading: isCreatingCategory } = useDefaultCategoriesCreate({
        onError: () => {
            toastError({ title: t('common:use.errorOccurred') });
        },
        onSuccess: () => {
            toastSuccess({ title: t('common:categories.SuccessAdd') });
            onClose();
        },
    });

    const addDefaultCategory = () => {
        const category = initialRef.current?.value;
        if (category) {
            createDefaultCategory({ categoryName: category});
        } else {
            toastError({ title: t('common:use.errorOccurred') });
        }
    };

    return (
        <>
            <Button onClick={onOpen}>{t('common:categories.addCategory')}</Button>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('common:categories.createCategory')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>{t('common:categories.categoryName')}</FormLabel>
                            <Input ref={initialRef} placeholder={t('common:categories.categoryPlaceHolder') as string} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={addDefaultCategory} isLoading={isCreatingCategory}>
                            {t('common:categories.save')}
                        </Button>
                        <Button onClick={onClose}>{t('common:categories.cancel')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCreateCategories;
