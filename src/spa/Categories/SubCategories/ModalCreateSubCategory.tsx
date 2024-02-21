import React, { FC, useRef } from 'react';
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

interface modalCreateSubCategoryProps {
    categoryId: number ,
    setCurrentCategoryId?: TODO,
    createSubCategory?: TODO,
    isCreatingSubCategory?: boolean,
}
const ModalCreateSubCategorys: FC<modalCreateSubCategoryProps> = ({ setCurrentCategoryId, categoryId, isCreatingSubCategory, createSubCategory }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation(['common', 'pack']);
    const addSubCategory = async () => {
        await setCurrentCategoryId(categoryId);
        const subCategory = initialRef.current?.value;
        if (subCategory) {
             createSubCategory({ categoryId: categoryId, subCategoryName: subCategory });
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
                        <Button colorScheme='blue' mr={3} onClick={addSubCategory} isLoading={isCreatingSubCategory}>
                            {t('common:subCategories.save')}
                        </Button>
                        <Button onClick={onClose}>{t('common:subCategories.cancel')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCreateSubCategorys;