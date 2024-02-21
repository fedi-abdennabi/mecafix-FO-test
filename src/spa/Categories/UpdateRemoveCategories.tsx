import { ConfirmMenuItem } from "@/components/ConfirmMenuItem";
import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, useDisclosure } from "@chakra-ui/react";
import { useToastError } from "@/components/Toast";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ActionsButton } from "@/components/ActionsButton";
import { Link } from "react-router-dom";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";


interface CategorysActionProps {
    categoryId?: number | string ,
    updateCategory?: TODO,
    isUpdateCategoryLoading?: boolean,
    setCurrentCategoryId?: TODO,
    removeCategory?: TODO,
    CategoryRemoveData?: TODO,
    CategorysDetails?: TODO,
}
export const CategorysActions: FC<CategorysActionProps> = ({ categoryId, updateCategory, isUpdateCategoryLoading, setCurrentCategoryId, removeCategory,CategorysDetails }) => {
    const { t } = useTranslation(['common', 'pack']);
    const initialRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toastError = useToastError();
    const updateCategorys = async () => {
        await setCurrentCategoryId(categoryId);
        const category = initialRef.current?.value;
        if (category) {
            updateCategory({ categoryName: category });
        } else {
            toastError({ title: t('common:use.errorOccurred') });
        }

    };
    return (
        <>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('common:categories.updateCategory')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>{t('common:subCategories.SubCategoryName')}</FormLabel>
                            <Input ref={initialRef} placeholder={t('common:subCategories.SubCategoryPlaceHolder') as string} defaultValue={CategorysDetails?.categoryName} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={updateCategorys} isLoading={isUpdateCategoryLoading}>
                            {t('common:subCategories.save')}
                        </Button>
                        <Button onClick={onClose}>{t('common:categories.cancel')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Menu isLazy placement="left-start" >
                <MenuButton as={ActionsButton} color="black" />
                <Portal>
                <MenuList>
                        <MenuItem
                            as={Link}
                            onClick={onOpen}
                            icon={<HiOutlinePencilSquare  fontSize="lg" color="gray.400"  />}
                        >
                            {t('common:actions.edit')}
                        </MenuItem>
                        <MenuDivider />
                        <ConfirmMenuItem
                            icon={<MdDeleteForever  fontSize="lg" color="gray.400" />}
                            onClick={()=>{removeCategory(categoryId)}}
                        >
                            {t('common:actions.delete')}
                        </ConfirmMenuItem>
                    </MenuList>
                </Portal>
            </Menu>
        </>
    )
}
