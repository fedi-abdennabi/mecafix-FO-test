import { ActionsButton } from "@/components/ActionsButton";
import { ConfirmMenuItem } from "@/components/ConfirmMenuItem";
import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Spinner, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { Categories } from "../defaultCategories/Categories.type";
interface CategorysActionProps {
    categorysDetails: Categories,
    updateCategory?: TODO,
    isUpdateCategoryLoading?: boolean,
    setCurrentCategoryId?: TODO,
    removeCategory?: TODO,
    CategoryRemoveData?: TODO,
    isRemovingCategory?: boolean
}
export const CategoriesAction: FC<CategorysActionProps> = ({ categorysDetails, updateCategory, isUpdateCategoryLoading, setCurrentCategoryId, removeCategory, isRemovingCategory }) => {
    const { t } = useTranslation(['common', 'pack']);
    const initialRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [oldCategoryName, setOldCategoryName] = useState("");
    useEffect(() => {
        setOldCategoryName(categorysDetails?.categoryName || "");
    }, [categorysDetails,categorysDetails.id]);
    const updateCategorys = async () => {
        await setCurrentCategoryId(categorysDetails.id);
        const category = initialRef.current?.value;
        if (category) {
            updateCategory({ categoryName: category });
            onClose();
        }
    };
    const handleRemoveCategory = async () => {
        setIsLoading(true);
        await removeCategory(categorysDetails.id);
        setIsLoading(false);
        onClose();
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
                            <Input
                                ref={initialRef}
                                value={oldCategoryName || ""}
                                onChange={(e) => setOldCategoryName(e.target.value)}
                            />
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
                            icon={<HiOutlinePencilSquare fontSize="lg" color="gray.400" />}
                        >
                            {t('common:actions.edit')}
                        </MenuItem>
                        <MenuDivider />
                        <ConfirmMenuItem
                            icon={
                                isRemovingCategory ? (
                                    <Spinner size={'sm'} />
                                ) : (
                                    <MdDeleteForever fontSize="lg" color="gray.400" />
                                )
                            }
                            onClick={handleRemoveCategory}
                        >
                            {t('common:actions.delete')}
                        </ConfirmMenuItem>
                    </MenuList>
                </Portal>
            </Menu >
        </>
    )
}