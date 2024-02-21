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
import { useToastError, useToastSuccess } from '@/components/Toast';
import { useParams } from 'react-router-dom';
import { useDefaultSubCategoriesCreate } from './DefaultSubCategorie.service';

const ModalCreateDefaultSubCategories = () => {
    const { id } = useParams();
    const parsedId = id ? parseInt(id) : undefined;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation(['common', 'pack']);
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();

    const { mutate: createDefaultSubCategory, isLoading: isCreatingSefaultSubCategory } = useDefaultSubCategoriesCreate(parsedId, {
        onError: () => {
            toastError({ title: t('common:use.errorOccurred') });
        },
        onSuccess: () => {
            toastSuccess({ title: t('common:subCategories.SuccessAdd') });
            onClose();
        },
    });

    const addDefaultCategory = () => {
        const defaultSubCategory = initialRef.current?.value;
        if (defaultSubCategory) {
            createDefaultSubCategory({ subCategoryName: defaultSubCategory });
        } else {
            toastError({ title: t('common:use.errorOccurred') });
        }
    };

    return (
        <>
            <Button onClick={onOpen}>{t('common:subCategories.addSubCategory')}</Button>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('common:subCategories.createSubCategory')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>{t('common:subCategories.SubCategoryName')}</FormLabel>
                            <Input ref={initialRef} placeholder={t('common:subCategories.SubCategoryPlaceHolder') as string} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={addDefaultCategory} isLoading={isCreatingSefaultSubCategory}>
                            {t('common:subCategories.save')}
                        </Button>
                        <Button onClick={onClose}>{t('common:subCategories.cancel')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCreateDefaultSubCategories;
