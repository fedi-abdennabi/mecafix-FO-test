import { ActionsButton } from "@/components/ActionsButton";
import { ConfirmMenuItem } from "@/components/ConfirmMenuItem";
import { useToastError } from "@/components/Toast";
import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, useDisclosure } from "@chakra-ui/react";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { SubCategorys } from "./subCategory.type";
import { FiCheckCircle } from "react-icons/fi";
import { Icon } from "@/components/Icons";
import {  HiPlusCircle } from "react-icons/hi";

interface SubCategorysActionProps {
    subCategoryId: number,
    subCategory: SubCategorys,
    updateSubCategory?: TODO,
    isUpdateSubCategoryLoading?: boolean,
    setCurrentSubCategoryId?: TODO,
    removeSubCategory?: TODO,
    SubCategoryRemoveData?: TODO,
    subCategorysDetails?: TODO,
    subCategoryDone?: TODO,
    subCategoryNotDone?: TODO,
    duplicateSubCategory?: TODO
}

export const SubCategorysActions: FC<SubCategorysActionProps> = ({ duplicateSubCategory, subCategoryNotDone, subCategoryDone, subCategory, subCategoryId, updateSubCategory, isUpdateSubCategoryLoading, setCurrentSubCategoryId, removeSubCategory, subCategorysDetails }) => {

    const { t } = useTranslation(['common', 'pack']);
    const initialRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toastError = useToastError();

    const handleSubCategoryDone = () => subCategoryDone(subCategory);
    const handleSubCategoryNotDone = () => subCategoryNotDone(subCategory);

    const updateSubCategorys = async () => {
        await setCurrentSubCategoryId(subCategoryId);
        const subCategory = initialRef.current?.value;
        if (subCategory) {
            updateSubCategory({ subCategoryName: subCategory });
        } else {
            toastError({ title: t('common:use.errorOccurred') });
        }

    };

    const deplicateSubCategory = () => {
        duplicateSubCategory(subCategoryId);
    }

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
                            <Input ref={initialRef} placeholder={t('common:subCategories.SubCategoryPlaceHolder') as string} defaultValue={subCategorysDetails?.subCategoryName} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={updateSubCategorys} isLoading={isUpdateSubCategoryLoading}>
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
                        {!subCategory.done && (
                            <MenuItem
                                onClick={handleSubCategoryDone}
                                icon={
                                    <Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />
                                }
                            >
                                Done
                            </MenuItem>
                        )}
                        {subCategory.done && (
                            <MenuItem
                                onClick={handleSubCategoryNotDone}
                                icon={
                                    <Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />
                                }
                            >
                                Not Done
                            </MenuItem>
                        )}
                        <MenuDivider />
                        <MenuItem
                            as={Link}
                            onClick={onOpen}
                            icon={<HiOutlinePencilSquare fontSize="lg" color="gray.400" />}
                        >
                            {t('common:actions.edit')}
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                            as={Link}
                            onClick={deplicateSubCategory}
                            icon={<HiPlusCircle fontSize="lg" color="gray.400" />}
                        >
                            Deplicate
                        </MenuItem>
                        <MenuDivider />
                        <ConfirmMenuItem
                            icon={<MdDeleteForever fontSize="lg" color="gray.400" />}
                            onClick={() => { removeSubCategory(subCategoryId) }}
                        >
                            {t('common:actions.delete')}
                        </ConfirmMenuItem>
                    </MenuList>
                </Portal>
            </Menu>
        </>
    )
}
