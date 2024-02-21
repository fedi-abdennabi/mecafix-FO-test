import { Link, useNavigate, useParams } from "react-router-dom";
import { useDefaultSubCategoriesDelete, useDefaultSubCategoriesList, useDefaultSubCategoriesUpdate, useDefaultSubCategoryDetails } from "./DefaultSubCategorie.service";
import { useEffect, useRef, useState } from "react";
import { Page, PageContent, PageTopBar } from "@/spa/layout";
import { Button, Center, FormControl, FormLabel, HStack, Heading,  Icon,  Input, LinkBox, LinkOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, MenuProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Spinner, useDisclosure } from "@chakra-ui/react";
import { DataList, DataListCell, DataListFooter, DataListHeader, DataListRow } from "@/components/DataList";
import { useTranslation } from "react-i18next";
import { Pagination, PaginationButtonFirstPage, PaginationButtonLastPage, PaginationButtonNextPage, PaginationButtonPrevPage, PaginationInfo } from "@/components/Pagination";
import { DefaultSubCategories } from "./DefaultSubCategorie.type";
import ModalCreateDefaultSubCategories from "./ModalCreateDefaultSubCategory";
import { useToastError, useToastSuccess } from "@/components/Toast";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { ActionsButton } from "@/components/ActionsButton";
import { ConfirmMenuItem } from "@/components/ConfirmMenuItem";

type DefaultSubCategoriesActionProps = Omit<MenuProps, 'children'> & {
    defaultSubCategories: DefaultSubCategories;
};

const DefaultSubCategoriesActions = ({ defaultSubCategories, ...rest }: DefaultSubCategoriesActionProps) => {
    const { t } = useTranslation(['common', 'pack']);
    const toastSuccess = useToastSuccess();
    const initialRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toastError = useToastError();

    const { subCategorieDetails} = useDefaultSubCategoryDetails( defaultSubCategories.id);

    const { mutate: updateSubCategorie, isLoading: isUpdateSubCategorieLoading } = useDefaultSubCategoriesUpdate(
        defaultSubCategories.id,
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
                    title: t('common:subCategories.SuccessUpdate'),
                });
                onClose();
            },
        })

    const { mutate: DefaultSubCategoriesRemove, ...DefaultCategoriesRemoveData } = useDefaultSubCategoriesDelete(defaultSubCategories.id, {
        onSuccess: () => {
            toastSuccess({
                title: t('common:subCategories.SuccessDelete'),
            });
        },
        onError: () => {
            toastError({
                title: t('common:use.errorOccurred'),
            });
        },
    });
    const removeSubCategorie = () => DefaultSubCategoriesRemove(defaultSubCategories);
    const isRemovalLoading = DefaultCategoriesRemoveData.isLoading;
    const updateDefaultSubCategory = () => {
        const subCategory = initialRef.current?.value;
        if (subCategory) {
            updateSubCategorie({ subCategoryName: subCategory });
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
                            <Input ref={initialRef} placeholder={t('common:subCategories.SubCategoryPlaceHolder') as string} defaultValue={subCategorieDetails?.subCategoryName} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={updateDefaultSubCategory} isLoading={isUpdateSubCategorieLoading}>
                            {t('common:subCategories.save')}
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
                            icon={<Icon as={FiCheckCircle} fontSize="lg" color="gray.400" />}
                        >
                            {t('common:actions.edit')}
                        </MenuItem>

                        <MenuDivider />
                        <ConfirmMenuItem
                            icon={<Icon as={FiTrash2} fontSize="lg" color="gray.400" />}
                            onClick={removeSubCategorie}
                        >
                            {t('common:actions.delete')}
                        </ConfirmMenuItem>
                    </MenuList>
                </Portal>
            </Menu>
        </>


    );
};

const PageDefaultSubCategorie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { t } = useTranslation(['common', 'pack']);
    const {
        defaultSubCategoriesList,
        isLoading: isDefaultSubCategoriesLoading,
        refetch
    } = useDefaultSubCategoriesList(id, { page });

    useEffect(() => {
        refetch();
    }, [page, refetch]);

    return (
        <Page containerSize="xl">
            <PageContent>
                <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
                    <HStack justifyContent="space-between" zIndex="99">
                        <Heading size="md">{t('common:subCategories.categoryManagment')}</Heading>
                    </HStack>
                </PageTopBar>
                <HStack mb="4" justifyContent={'flex-end'}>
                    <ModalCreateDefaultSubCategories />
                </HStack>
                {isDefaultSubCategoriesLoading && (
                    <Center>
                        <Spinner size="xl" color="blue" />
                    </Center>
                )}
                {!isDefaultSubCategoriesLoading && (
                    <DataList overflowY="scroll" flexWrap="wrap">
                        <DataListHeader>
                            <DataListCell colName="number">{t('pack:Number')}</DataListCell>
                            <DataListCell colName="name">{t('common:subCategories.SubCategoryName')}</DataListCell>
                            <DataListCell
                                colName="actions"
                                colWidth="4rem"
                                align="flex-end"
                            />
                        </DataListHeader>
                        {defaultSubCategoriesList?.data?.length === 0 && (
                            <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
                                <DataListCell
                                    alignItems={'stretch'}
                                    textAlign={'center'}
                                    width={'100%'}
                                    colName="noData"
                                >
                                    {t('common:subCategories.NoSubCategory')}
                                </DataListCell>
                            </DataListRow>
                        )}
                        {defaultSubCategoriesList?.data?.length !== 0 &&
                            defaultSubCategoriesList?.data?.map((defaultSubCategories) => (
                                <DataListRow as={LinkBox} key={defaultSubCategories.id}>
                                    <DataListCell colName="number">
                                        <LinkOverlay
                                            as={Link}
                                            to={`/superAdmin/categories/subCategorie/${defaultSubCategories.id}`}
                                        >
                                            {defaultSubCategories.id}
                                        </LinkOverlay>
                                    </DataListCell>
                                    <DataListCell colName="name">{defaultSubCategories.subCategoryName}</DataListCell>
                                    <DataListCell colName="actions">
                                        <DefaultSubCategoriesActions defaultSubCategories={defaultSubCategories} />
                                    </DataListCell>
                                </DataListRow>
                            ))}
                        <DataListFooter>
                            <Pagination
                                isLoadingPage={isDefaultSubCategoriesLoading}
                                setPage={setPage}
                                page={defaultSubCategoriesList?.current_page}
                                pageSize={defaultSubCategoriesList?.per_page}
                                totalItems={defaultSubCategoriesList?.total}
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
    );
};

export default PageDefaultSubCategorie;
