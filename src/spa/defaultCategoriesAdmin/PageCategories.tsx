import { Button, Center, FormControl, FormLabel, HStack, Heading, Icon, Input, LinkBox, LinkOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Spinner, useDisclosure } from "@chakra-ui/react";
import { Page, PageContent, PageTopBar } from "../layout";
import { DataList, DataListCell, DataListFooter, DataListHeader, DataListRow } from "@/components/DataList";
import { Pagination, PaginationButtonFirstPage, PaginationButtonLastPage, PaginationButtonNextPage, PaginationButtonPrevPage, PaginationInfo } from "@/components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useToastError, useToastSuccess } from "@/components/Toast";
import { Categories } from "./Categories.type";
import { useEffect, useRef, useState } from "react";
import { useDefaultCategoriesDelete, useDefaultCategoriesList, useDefaultCategoriesUpdate, useDefaultCategoryDetails } from "./Categories.service";
import ModalCreateCategories from "./ModalCreateCategories";
import { ConfirmMenuItem } from "@/components/ConfirmMenuItem";
import { ActionsButton } from "@/components/ActionsButton";

type DefaultCategoriesActionProps = Omit<MenuProps, 'children'> & {
    defaultCategories: Categories;
};

const CategoriesActions = ({ defaultCategories, ...rest }: DefaultCategoriesActionProps) => {
    const { t } = useTranslation(['common', 'pack']);
    const toastSuccess = useToastSuccess();
    const initialRef = useRef<HTMLInputElement>(null);
    const toastError = useToastError();
    const { categorieDetails } = useDefaultCategoryDetails(defaultCategories.id);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { mutate: updateCategorie, isLoading: isUpdateCategorieLoading } = useDefaultCategoriesUpdate(
        defaultCategories.id,
        {
            onError: (error) => {
                if (error.response) {
                    toastError({
                        title:
                            (error?.response?.data as string) ||
                            t('common:use.errorOccurred'),
                    });
                }
            },
            onSuccess: () => {
                toastSuccess({
                    title: t('common:categories.SuccessUpdate'),
                });
                onClose();
            },
        })
    const { mutate: DefaultCategoriesRemove, ...DefaultCategoriesRemoveData } = useDefaultCategoriesDelete(defaultCategories.id, {
        onSuccess: () => {
            toastSuccess({
                title: t('common:categories.SuccessDelete'),
            });
            onClose();
        },
        onError: () => {
            toastError({
                title: t('common:use.errorOccurred'),
            });
            onClose();
        },
    });
    const removeCategorie = () => DefaultCategoriesRemove(defaultCategories);
    const isRemovalLoading = DefaultCategoriesRemoveData.isLoading;

    const updateDefaultCategory = () => {
        const category = initialRef.current?.value;
        if (category) {
            updateCategorie({ categoryName: category });
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
                            <FormLabel>{t('common:categories.categoryName')}</FormLabel>
                            <Input ref={initialRef} placeholder={t('common:categories.categoryPlaceHolder') as string} defaultValue={categorieDetails?.categoryName} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={updateDefaultCategory} isLoading={isUpdateCategorieLoading}>
                            {t('common:categories.save')}
                        </Button>
                        <Button onClick={onClose}>{t('common:categories.cancel')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Menu isLazy placement="left-start" {...rest}>
                <MenuButton as={ActionsButton} isLoading={isRemovalLoading} />
                <Portal>
                    <MenuList>
                        <MenuItem
                            as={Link}
                            onClick={onOpen}
                            icon={<Icon as={FiCheckCircle} w={6} h={6} color="gray.400" />}
                        >
                            {t('common:actions.edit')}
                        </MenuItem>
                        <MenuDivider />
                        <ConfirmMenuItem
                            icon={<Icon as={FiTrash2} w={6} h={6} color="gray.400" />}
                            onClick={removeCategorie}
                        >
                            {t('common:actions.delete')}
                        </ConfirmMenuItem>
                    </MenuList>
                </Portal>
            </Menu>
        </>

    );
};

const PageCategories = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { t } = useTranslation(['common']);
    const { defaultCategoriesList, isLoading: isDefaultCategoriesLoading, refetch } = useDefaultCategoriesList({ page });

    useEffect(() => {
        refetch();
    }, [page, refetch]);

    return (
        <Page containerSize="xl">
            <PageContent>
                <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
                    <HStack justifyContent="space-between" zIndex="99">
                        <Heading size="md">{t('common:categories.categoryManagment')}</Heading>
                    </HStack>
                </PageTopBar>
                <HStack mb="4" justifyContent={'flex-end'}>
                    <ModalCreateCategories />
                </HStack>
                {isDefaultCategoriesLoading && (
                    <Center>
                        <Spinner size="xl" color="blue" />
                    </Center>
                )}
                {!isDefaultCategoriesLoading && (
                    <DataList overflowY="scroll" flexWrap="wrap">
                        <DataListHeader>
                            <DataListCell colName="number">{t('common:categories.categoryManagment')}</DataListCell>
                            <DataListCell colName="name">{t('common:categories.categoryName')}</DataListCell>
                            <DataListCell
                                colName="actions"
                                colWidth="4rem"
                                align="flex-end"
                            />
                        </DataListHeader>
                        {defaultCategoriesList?.data && defaultCategoriesList.data.length === 0 && (
                            <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
                                <DataListCell
                                    alignItems={'stretch'}
                                    textAlign={'center'}
                                    width={'100%'}
                                    colName="noData"
                                >
                                    {t('common:categories.noCategories')}
                                </DataListCell>
                            </DataListRow>
                        )}
                        {defaultCategoriesList?.data?.length !== 0 &&
                            defaultCategoriesList?.data?.map((defaultCategories) => (
                                <DataListRow as={LinkBox} key={defaultCategories.id}>
                                    <DataListCell colName="number">
                                        <LinkOverlay
                                            as={Link}
                                            to={`/admin/categories/${defaultCategories.id}`}
                                        >
                                            {defaultCategories.id}
                                        </LinkOverlay>
                                    </DataListCell>
                                    <DataListCell colName="name">{defaultCategories.categoryName}</DataListCell>
                                    <DataListCell colName="actions">
                                        <CategoriesActions defaultCategories={defaultCategories} />
                                    </DataListCell>
                                </DataListRow>
                            ))}
                        <DataListFooter>
                            <Pagination
                                isLoadingPage={isDefaultCategoriesLoading}
                                setPage={setPage}
                                page={defaultCategoriesList?.current_page}
                                pageSize={defaultCategoriesList?.per_page}
                                totalItems={defaultCategoriesList?.total}
                            >
                                <PaginationButtonFirstPage />
                                <PaginationButtonPrevPage />
                                <PaginationInfo flex="1" />
                                <PaginationButtonNextPage />
                                <PaginationButtonLastPage />
                            </Pagination>
                        </DataListFooter>
                    </DataList>
                )}
            </PageContent>
        </Page>
    )
}
export default PageCategories;
