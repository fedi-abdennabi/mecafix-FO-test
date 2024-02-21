import {
    Box, Button, Card, CardBody, CardFooter, Center, Flex, Heading, Image, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Slide, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure
} from "@chakra-ui/react";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { HiBell, HiChevronDown, HiChevronUp, HiFilter, HiRefresh, HiShare } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalCreateCategorys from "../Categories/ModalCreateCategory";
import ModalCreateSubCategorys from "../Categories/SubCategories/ModalCreateSubCategory";
import { SubCategorysActions } from "../Categories/SubCategories/RemoveUpdateSubCategory";
import { CategorysActions } from "../Categories/UpdateRemoveCategories";
import { Page, PageContent, PageTopBar } from "../layout";
import { Formiz } from "@formiz/core";
import { FieldInput } from "@/components/FieldInput";
import { useCarStatusList } from "../carStatus/carStatus.service";
import { useCategoryCreate, useCategoryDelete, useCategoryUpdate } from "../Categories/categories.service";
import { useToastError, useToastSuccess } from "@/components/Toast";
import axios from "axios";
import { Folder } from "./folder.type";
import { useDuplicateSubCategoy, useSubCategoryCreate, useSubCategoryDelete, useSubCategoryDone, useSubCategoryNotDone, useSubCategoryUpdate, useSubCategorysDetails } from "../Categories/SubCategories/subCategories.service";

export const PageFolder = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { statusData } = useCarStatusList();
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const { isOpen: isOpenSlide, onClose: onCloseSlide, onToggle: onToggleSlide } = useDisclosure();
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const folderId = params.folderId;
    const [currentCatgeoryId, setCurrentCategoryId] = useState<number>();
    const [currentSubCatgeoryId, setCurrentSubCategoryId] = useState<number>();
    const [folder, setFolder] = useState<Folder>();
    const [refetchTrigger, setRefetchTrigger] = useState(0);
    const { isOpen: isOpenBell, onOpen: onOpenBell, onClose: onCloseBell } = useDisclosure();
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    const [isFolderLoading, setIsFolderLoading] = useState(false);

    const fetchFolderData = async () => {
        try {
            setIsFolderLoading(false)
            const response = await axios.get<Folder>(`admin/folder/${folderId}`);
            setFolder(response);
            setIsFolderLoading(true);
        } catch (error) {
            console.error('Error fetching folder data:', error);
        }
    };

    useEffect(() => {
        fetchFolderData();
    }, [refetchTrigger, folderId]);

    const handleChange = () => {
        setIsContentVisible(!isContentVisible);
        setIsOpenForm(false);
    }

    const { mutate: createCategory, isLoading: isCreatingCategory } = useCategoryCreate(folderId, {
        onError: (error) => {
            toastError({ title: t('common:use.errorOccurred') });
        },
        onSuccess: () => {
            toastSuccess({ title: t('common:subCategories.SuccessAdd') });
            setRefetchTrigger(oldTrigger => oldTrigger + 1);
        },
    });

    const { mutate: duplicateSubCategory, isLoading: isDuplicatingSubCategory } = useDuplicateSubCategoy(
        {
            onError: (error) => {
                toastError({ title: t('common:use.errorOccurred') });
            },
            onSuccess: () => {
                toastSuccess({ title: t('common:subCategories.SuccessAdd') });
                setRefetchTrigger(oldTrigger => oldTrigger + 1);
            },
        });

    const { mutate: createSubCategory, isLoading: isCreatingSubCategory } = useSubCategoryCreate(currentCatgeoryId, {
        onError: (error) => {
            toastError({ title: t('common:use.errorOccurred') });
        },
        onSuccess: () => {
            toastSuccess({ title: t('common:subCategories.SuccessAdd') });
            setRefetchTrigger(oldTrigger => oldTrigger + 1);
        },
    });

    const { mutate: updateCategory, isLoading: isUpdateCategoryLoading } = useCategoryUpdate(
        currentCatgeoryId,
        {
            onError: (error) => {
                if (error.response) {
                    toastError({
                        title: (error?.response?.data as string) || t('common:use.errorOccurred')
                    });
                }
            },
            onSuccess: () => {
                toastSuccess({ title: t('common:subCategories.SuccessUpdate') });
                setRefetchTrigger(oldTrigger => oldTrigger + 1);
            },
        })
    const { mutate: removeCategory, ...CategoryRemoveData } = useCategoryDelete({
        onSuccess: () => {
            toastSuccess({
                title: t('common:subCategories.SuccessDelete'),
            });
            setRefetchTrigger(oldTrigger => oldTrigger + 1);
        },
        onError: () => {
            toastError({
                title: t('common:use.errorOccurred'),
            });
        },
    });
    const { mutate: updateSubCategory, isLoading: isUpdateSubCategoryLoading } = useSubCategoryUpdate(
        currentSubCatgeoryId,
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
                setRefetchTrigger(oldTrigger => oldTrigger + 1);
            },
        })

    const { mutate: removeSubCategory, ...SubCategoryRemoveData } = useSubCategoryDelete({
        onSuccess: () => {
            toastSuccess({
                title: t('common:subCategories.SuccessDelete'),
            });
            setRefetchTrigger(oldTrigger => oldTrigger + 1);
        },
        onError: () => {
            toastError({
                title: t('common:use.errorOccurred'),
            });
        },
    });

    const { mutate: subCategoryDone, ...isSubCategoryDone } = useSubCategoryDone({
        onSuccess: () => {
            toastSuccess({
                title: "updated successfully",
                description: "sub-category updated to done",
            });
            setRefetchTrigger(oldTrigger => oldTrigger + 1);
        },
        onError: () => {
            toastError({
                title: "failed actions ! ",
                description: "something wrong went !",
            });
        },
    });


    const { mutate: subCategoryNotDone, ...isSubCategoryNotDone } = useSubCategoryNotDone({
        onSuccess: () => {
            toastSuccess({
                description: "sub-category updated to not done yet !",
            });
            setRefetchTrigger(oldTrigger => oldTrigger + 1);
        },
        onError: () => {
            toastError({
                description: "something wrong went !",
            });
        },
    });

    const goToUpdateCardPage = () => {
        navigate(`/admin/card/update/${folderId}`);
    }

    const [value, setValue] = React.useState('6')
    return (
        <Page containerSize="md">
            <PageContent>
                {!isFolderLoading && (
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '100vh' 
                    }}>
                        <Spinner />
                    </div>
                )}
                {isFolderLoading && <>
                    <PageTopBar w={"full"} m="1" showBack onBack={() => navigate(-1)}>
                        <Text as='b' fontSize='lg'>{folder?.clients?.firstName + ' ' + folder?.clients?.lastName}</Text>
                    </PageTopBar>
                    <PageContent >
                        <PageTopBar rounded={8} borderWidth={2}>
                            <Flex justifyContent="space-between">
                                <button>
                                    <Heading size="sm">{t('account:folder.heading')}</Heading>
                                </button>
                                <Flex>
                                    <button style={{ margin: '0 8px' }} onClick={onOpenBell} ><HiBell /></button>
                                    <Modal isOpen={isOpenBell} onClose={onCloseBell}>
                                        <ModalOverlay />
                                        <ModalContent py={5} px={10}>
                                            <ModalHeader>Choissisez le status</ModalHeader>
                                            <ModalBody>
                                                <RadioGroup onChange={setValue} value={value}>
                                                    <Stack>
                                                        <Formiz>
                                                            {statusData?.map((status: TODO) => (
                                                                <div key={status.id}>
                                                                    <Radio value={status.id}>{status.statusName}</Radio>
                                                                    {status?.hasSpecificValue == 1 && (
                                                                        <FieldInput
                                                                            name="statusValue"
                                                                            required
                                                                        />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </Formiz>
                                                    </Stack>
                                                </RadioGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme='blue' mr={3} onClick={onCloseBell}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                    <button style={{ margin: '0 8px' }}><HiFilter /></button>
                                    <button style={{ margin: '0 8px' }}><HiShare /></button>
                                    <button style={{ margin: '0 8px' }} onClick={() => navigate(`./history`)}><HiRefresh /></button>
                                </Flex>
                            </Flex>
                        </PageTopBar>
                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            overflow='hidden'
                            variant='outline'
                        >
                            <Stack>
                                <CardBody marginBottom={-8}>
                                    <Text py='2' color={"gray.500"}>
                                        {t('account:folder.contrat')} {folder?.id}
                                    </Text>
                                    <Heading size='md'>{folder?.car?.immatriculation}</Heading>
                                    <Text py='2'>
                                        {folder?.car?.brand} {folder?.car?.model}
                                    </Text>
                                </CardBody>
                                <CardBody marginBottom={-8}>
                                    <Heading size='md'>Note</Heading>
                                    <Text py='2'>
                                        {folder?.notes}
                                    </Text>
                                </CardBody>
                                <CardFooter>
                                    <Stack>
                                        <Text py='2' color={"gray.500"}>
                                            {t('account:folder.service')}
                                        </Text>
                                    </Stack>
                                </CardFooter>
                            </Stack>
                            <Stack>
                                <Heading size='sm' pt='8' pl='2.5'>{folder?.mileage} km</Heading>
                                <Image
                                    p={3}
                                    rounded={20}
                                    objectFit='cover'
                                    maxW={{ base: '100%', sm: '300px' }}
                                    src={folder?.car?.image}
                                    alt='tesla'
                                />
                            </Stack>
                        </Card>
                        <Stack direction={'row'} spacing='4px' w="full" paddingBottom='3'>
                            <Flex flex={18} p='10px'>
                                <Button w='full' colorScheme='blue' onClick={goToUpdateCardPage}>{t('account:folder.card-button')}</Button>
                            </Flex>
                            <Flex flex={10} p='10px'>
                                <Button w='full' colorScheme='blue' onClick={onOpenModal}>Hashtag</Button>
                            </Flex>
                        </Stack>
                        <Modal isOpen={isOpenModal} onClose={onCloseModal}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader textAlign="center">{t('account:folder.hashtag-popup-title')}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Flex direction="row" justify="center">
                                        <Box as='button' borderRadius='2xl' bg='black' color='white' px={4} h={8} mb={4} mr={4}>
                                            {t('account:folder.hashtag-1')}
                                        </Box>
                                        <Box as='button' borderRadius='2xl' bg='black' color='white' px={4} h={8}>
                                            {t('account:folder.hashtag-2')}
                                        </Box>
                                    </Flex>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onCloseModal}>
                                        {t('account:folder.hashtag-popup-close')}
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Stack >
                            {!isOpenSlide && (
                                <Button
                                    justifyContent='center'
                                    bottom='0'
                                    size='lg'
                                    zIndex={'1000'}
                                    onClick={onToggleSlide}
                                    style={{ backgroundColor: isOpenSlide ? 'white' : '#1E88E5' }}
                                >
                                    {!isOpenSlide ? <HiChevronUp style={{ color: 'white' }} /> : <HiChevronDown style={{ color: '#012652' }} />}
                                </Button>
                            )}

                            <Slide direction='bottom' in={isOpenSlide}>
                                <Stack overflowY={'auto'} color='white' mt='3' ml={{ base: '11px', md: '250px' }} mr='3' bg="#012652" rounded='md' shadow='md' maxHeight={{ base: '300px', md: '500px' }}>
                                    <Tabs size={'sm'} variant='soft-rounded' colorScheme='blue'>
                                        <Stack justifyContent='center' p='2'>
                                            <Button colorScheme="gray" onClick={onCloseSlide} bg='transparent'>
                                                <HiChevronDown style={{ color: 'grey.600', fontSize: '20px' }} />
                                            </Button>
                                        </Stack>
                                        <Stack align={'flex-end'} paddingBottom={4} mr='4'>
                                            <ModalCreateCategorys folderId={folder?.id} createCategory={createCategory} isCreatingCategory={isCreatingCategory} />
                                        </Stack>
                                        <Stack overflowX={'auto'} direction={'row'} alignItems={'center'} >
                                            <TabList display={'flex'} mr='3' ml='3'>
                                                {folder?.category.map((category) => (
                                                    <Stack key={category.id.toString()}>
                                                        <Tab onClick={() => handleChange()}>
                                                            {category.categoryName}
                                                            <CategorysActions categoryId={category.id} setCurrentCategoryId={setCurrentCategoryId} isUpdateCategoryLoading={isUpdateCategoryLoading} updateCategory={updateCategory} removeCategory={removeCategory} />
                                                        </Tab>
                                                    </Stack>
                                                ))}
                                            </TabList>
                                        </Stack>
                                        <TabPanels >
                                            {folder?.category.map(category => (
                                                <TabPanel key={category.id.toString()}>
                                                    {!isOpenForm && (
                                                        <Flex direction='column'>
                                                            <Stack position={'relative'} align={'flex-end'} paddingBottom={4}>
                                                                <ModalCreateSubCategorys setCurrentCategoryId={setCurrentCategoryId} categoryId={category.id} createSubCategory={createSubCategory} isCreatingSubCategory={isCreatingSubCategory} />
                                                            </Stack>
                                                            <Box maxHeight="300px" overflowY="auto" p={2}>
                                                                {category.sub_category?.map(subCategory => (
                                                                    <Stack key={subCategory.id} pl='1' py='1' bg="white" rounded={8} borderWidth={1} my={2} direction={'row'} justifyContent="space-between">
                                                                        <Button as={Link} to={`/admin/folder/category/subCategory/${subCategory.id}`} size={"sm"} textColor="#012652" bg={'transparent'}>{subCategory.subCategoryName}
                                                                        </Button>
                                                                        <Stack direction={'row'} >
                                                                            <SubCategorysActions subCategory={subCategory} subCategoryId={subCategory.id} setCurrentSubCategoryId={setCurrentSubCategoryId} isUpdateSubCategoryLoading={isUpdateSubCategoryLoading} updateSubCategory={updateSubCategory} removeSubCategory={removeSubCategory} subCategoryNotDone={subCategoryNotDone} subCategoryDone={subCategoryDone} duplicateSubCategory={duplicateSubCategory} />
                                                                        </Stack>
                                                                    </Stack>
                                                                ))}
                                                            </Box>
                                                        </Flex>
                                                    )}
                                                </TabPanel>
                                            ))}
                                        </TabPanels>
                                    </Tabs>
                                </Stack >
                            </Slide >
                        </Stack>
                    </PageContent >
                </>}
            </PageContent >
        </Page >
    )
}


