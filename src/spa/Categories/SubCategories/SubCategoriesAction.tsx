import { ActionsButton } from "@/components/ActionsButton";
import { ConfirmMenuItem } from "@/components/ConfirmMenuItem";
import { useToastError } from "@/components/Toast";
import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { SubCategorys } from "./subCategory.type";
import { Icon } from "@/components/Icons";
import { FiCheckCircle } from "react-icons/fi";
import { HiEye, HiEyeOff, HiPlusCircle } from "react-icons/hi";
interface SubCategorysActionProps {
  subCategorysDetails: SubCategorys;
  updateSubCategory?: TODO,
  isUpdateSubCategoryLoading?: boolean,
  setCurrentSubCategoryId?: TODO,
  removeSubCategory?: TODO,
  SubCategoryRemoveData?: TODO,
  subCategoryDone?: TODO,
  subCategoryNotDone?: TODO,
  duplicateSubCategory?: TODO,
}
export const SubCategoriesAction: FC<SubCategorysActionProps> = ({ duplicateSubCategory, subCategoryNotDone, subCategoryDone, updateSubCategory, isUpdateSubCategoryLoading, setCurrentSubCategoryId, removeSubCategory, subCategorysDetails }) => {
  const { t } = useTranslation(['common', 'pack']);
  const initialRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toastError = useToastError();
  const [oldSubCategoryName, setOldSubCategoryName] = useState("");
  const handleSubCategoryDone = () => subCategoryDone(subCategorysDetails);
  const handleSubCategoryNotDone = () => subCategoryNotDone(subCategorysDetails);

  useEffect(() => {
    setOldSubCategoryName(subCategorysDetails?.subCategoryName || "")
  }, [subCategorysDetails, subCategorysDetails.id])

  const updateSubCategorys = async () => {
    await setCurrentSubCategoryId(subCategorysDetails.id);
    const subCategory = initialRef.current?.value;
    if (subCategory) {
      updateSubCategory({ subCategoryName: subCategory });
      onClose();
    }
  };

  const deplicateSubCategory = () => {
    duplicateSubCategory(subCategorysDetails.id);
  }

  const displaySubCategory = async () =>{ 
    await setCurrentSubCategoryId(subCategorysDetails.id);
    updateSubCategory({ display: subCategorysDetails.display ? false : true });
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
              <Input
                ref={initialRef}
                value={oldSubCategoryName || ""}
                onChange={(e) => setOldSubCategoryName(e.target.value)}
              />
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
            {!subCategorysDetails.done && (
              <MenuItem
                onClick={handleSubCategoryDone}
                icon={
                  <Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />
                }
              >
                Done
              </MenuItem>
            )}
            {subCategorysDetails.done && (
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
              Duplicate
            </MenuItem>
            <MenuDivider />
            <MenuItem
              as={Link}
              onClick={displaySubCategory}
              icon={!subCategorysDetails.display ? <HiEye fontSize="lg" color="gray.400" /> : <HiEyeOff fontSize="lg" color="gray.400" />}
            >
              {!subCategorysDetails.display ? t('common:subCategories.Display') : t('common:subCategories.Hide')} 
            </MenuItem>
            <MenuDivider />
            <ConfirmMenuItem
              icon={<MdDeleteForever fontSize="lg" color="gray.400" />}
              onClick={() => removeSubCategory(subCategorysDetails.id)}
            >
              {t('common:actions.delete')}
            </ConfirmMenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  )
}




