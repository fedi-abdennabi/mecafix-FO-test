import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface modalCreateCategoryProps {
    folderId?: number,
    isCreatingCategory?:boolean, 
    createCategory?:TODO,
}
const ModalCreateCategorys :FC<modalCreateCategoryProps>= ({folderId, isCreatingCategory,createCategory}) => {
    const initialRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation(['common', 'pack']);
    const addCategory = () => {
        const category = initialRef.current?.value;
        if (category) {
            createCategory({folderId:folderId, categoryName: category });
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
                        <Button colorScheme='blue' mr={3} onClick={addCategory} isLoading={isCreatingCategory}>
                            {t('common:categories.save')}
                        </Button>
                        <Button onClick={onClose}>{t('common:categories.cancel')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCreateCategorys;