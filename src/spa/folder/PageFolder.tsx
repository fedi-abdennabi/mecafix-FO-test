import {
    Box, Button, Card, CardBody, CardFooter, Flex, Heading, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Slide, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast
} from "@chakra-ui/react";
import { t } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { HiBell, HiChevronDown, HiChevronUp, HiFilter, HiRefresh, HiShare } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalCreateCategorys from "../Categories/ModalCreateCategory";
import ModalCreateSubCategorys from "../Categories/SubCategories/ModalCreateSubCategory";
import { Page, PageContent, PageTopBar } from "../layout";
import { useCarStatusList, useFolderStatusUpdate } from "../carStatus/carStatus.service";
import { useCategoryCreate, useCategoryDelete, useCategoryUpdate } from "../Categories/categories.service";
import { useToastError, useToastSuccess } from "@/components/Toast";
import axios from "axios";
import { Folder } from "./folder.type";
import { useDuplicateSubCategoy, useSubCategoryCreate, useSubCategoryDelete, useSubCategoryDone, useSubCategoryNotDone, useSubCategoryUpdate } from "../Categories/SubCategories/subCategories.service";
import { CategoriesAction } from "../Categories/CategoriesAction";
import { SubCategoriesAction } from "../Categories/SubCategories/SubCategoriesAction";
import { ImageWithSpinner } from "./ImageWithSpinner";
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeGeneratorProps {
    url: string;
}



export const PageFolder = () => {
    const params = useParams();
    const navigate = useNavigate();
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
    const { isOpen: isOpenQr, onOpen: onOpenQr, onClose: onCloseQr } = useDisclosure();
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    const [currentCategory, setCurrentCategory] = useState();
    const [isFolderLoading, setIsFolderLoading] = useState(false);
    const initialRef = useRef<HTMLInputElement>(null);
    const [statusId, setStatusId] = useState<number>();
    const { statusData } = useCarStatusList();
    const { mutate: updateFolderStatus, isLoading: isUpdateFolderStatusLaoding } = useFolderStatusUpdate(folderId, {
        onError: (error) => {
            if (error.response) {
                toastError({
                    title: (error?.response?.data as string) || t('common:status.error')
                });
            }
        },
        onSuccess: () => {
            toastSuccess({ title: t('common:status.Success') });
            onCloseBell();
        },
    })

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
            toastSuccess({ title: t('common:categories.SuccessAdd') });
            setRefetchTrigger(oldTrigger => oldTrigger + 1);
        },
    });

    const { mutate: duplicateSubCategory, isLoading: isDuplicatingSubCategory } = useDuplicateSubCategoy(
        {
            onError: (error) => {
                toastError({ title: t('common:use.errorOccurred') });
            },
            onSuccess: () => {
                toastSuccess({ title: t('common:subCategories.SuccessDuplicate') });
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
                toastSuccess({ title: t('common:categories.SuccessUpdate') });
                setRefetchTrigger(oldTrigger => oldTrigger + 1);
            },
        })
    const { mutate: removeCategory, isLoading: isRemovingCategory, ...CategoryRemoveData } = useCategoryDelete({
        onSuccess: () => {
            toastSuccess({
                title: t('common:categories.SuccessDelete'),
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

    const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url }) => {
        return <QRCodeCanvas value={url} />;
    };
    const myURL = `https://mecafix.cleverapps.io/app/admin/folder/${folderId}/history`;

    const handleSave = () => {
        const selectedStatus = statusData?.find((status) => status.id === statusId);
        if (selectedStatus) {
            const statusValue = initialRef.current?.value;
            const valueToSend = selectedStatus.hasSpecificValue ? statusValue : selectedStatus.statusName;
            const data = {
                statusValue: valueToSend,
                statusId: statusId,
            }
            updateFolderStatus(data);
            console.log(data);
        }
    };
    const selectedStatus = (id: number) => {
        setStatusId(id);
    };

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleEmailClick = () => {
        const mailtoLink = `mailto:${folder?.clients.email}`;
        window.location.href = mailtoLink;
    };

    const toast = useToast();
    const handleCopyText = async () => {
        try {
            await navigator.clipboard.writeText(myURL);
            toast({
                title: t('account:client.copyToClipBoard'),
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            toast({
                title: "Failed to copy text",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

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
                                                <RadioGroup>
                                                    <Stack>
                                                        {statusData?.map((status) => (
                                                            <div key={status.id}>
                                                                <Radio onChange={() => selectedStatus(status.id)} isChecked={statusId === status.id}>{status.statusName}</Radio>
                                                                {status.hasSpecificValue === 1 && (
                                                                    <Input
                                                                        ref={initialRef}
                                                                        name="statusValue"
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </Stack>
                                                </RadioGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme="blue" mr={"3"} onClick={handleSave}>
                                                    save
                                                </Button>
                                                <Button colorScheme='blue' mr={3} onClick={onCloseBell}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                    <button style={{ margin: '0 8px' }}><HiFilter /></button>
                                    <button style={{ margin: '0 8px' }} onClick={onOpenQr}><HiShare /></button>
                                    <Modal isOpen={isOpenQr} onClose={onCloseQr}>
                                        <ModalOverlay />
                                        <ModalContent py={5} px={3}>
                                            <ModalHeader>
                                                <Stack direction={'row'} spacing={5}>
                                                    <Box display="flex" alignItems="start" gap="2">
                                                        <IoCopyOutline /><Text cursor={'pointer'} fontSize={'small'} onClick={handleCopyText}>Copier lien</Text>
                                                    </Box>
                                                    <Box display="flex" alignItems="start" gap="2">
                                                        <MdOutlineEmail /><Text onClick={handleEmailClick} cursor={'pointer'} fontSize={'small'}>E-mail</Text>
                                                    </Box>
                                                    <Box display="flex" alignItems="start" gap="2">
                                                        <FiPrinter /><Text cursor={'pointer'} fontSize={'small'} onClick={() => window.print()}>Imprimer ticket</Text>
                                                    </Box>
                                                </Stack>
                                            </ModalHeader>
                                            <ModalBody>
                                                <Box my={3}>
                                                    <Text >Nom: </Text>
                                                    <Text as={'b'}>{folder?.clients.firstName + " " + folder?.clients.lastName}</Text>
                                                </Box>
                                                <Box my={3}>
                                                    <Text>Véhicule: </Text>
                                                    <Text as={'b'}>{folder?.car.brand + " " + folder?.car.model}</Text>
                                                </Box>
                                                <Box my={3}>
                                                    <Text>Immatriculation: </Text>
                                                    <Text as={'b'}>{folder?.car.immatriculation}</Text>
                                                </Box>
                                                <Box my={3}>
                                                    <Text>Contrat créé le: </Text>
                                                    <Text as={'b'}>{folder?.created_at ? formatDate(folder.created_at) : ''}</Text>
                                                </Box>
                                                <Box my={3}>
                                                    <Text>Total tests réalisés: </Text>
                                                    <Text as={'b'}>{folder?.carId}</Text>
                                                </Box>
                                                <Box my={3}>
                                                    <Text as={'b'}>{folder?.car.mileage}</Text> Km
                                                </Box>
                                                <Box display="flex" flexDirection="column" alignItems="center" my={3}>
                                                    <Text as={'b'}>Contrat n° : {folder?.id} </Text>
                                                    <QRCodeGenerator url={myURL} />
                                                </Box>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme='blue' mr={3} onClick={onCloseQr}>
                                                    Fermer
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                    <button style={{ margin: '0 8px' }} onClick={() => navigate(`./history-404`)}><HiRefresh /></button>
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
                                            {folder?.statusValue}
                                        </Text>
                                    </Stack>
                                </CardFooter>
                            </Stack>
                            <Stack>
                                <Heading size='sm' pt='8' pl='2.5'>{folder?.car?.mileage} km</Heading>
                                {folder?.car?.image ? (
                                    <ImageWithSpinner src={folder?.car?.image} alt="Car Image" />
                                ) : (
                                    <ImageWithSpinner src='/default-vehicle.png' alt="Default Vehicle" />
                                )}
                            </Stack>
                        </Card>
                        <Stack direction={'row'} spacing='4px' w="full" paddingBottom='3'>
                            <Flex flex={18} p='10px'>
                                <Button w='full' colorScheme='blue' onClick={() => navigate(`/admin/card/update-404/${folderId}`)}>{t('account:folder.card-button')}</Button>
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
                                    pos='fixed'
                                    bottom='0'
                                    width={"50%"}
                                    zIndex={'1000'}
                                    onClick={onToggleSlide}
                                    style={{ backgroundColor: isOpenSlide ? 'white' : '#1E88E5' }}
                                >
                                    {!isOpenSlide ? <HiChevronUp style={{ fontSize: '40px', color: 'white' }} /> : <HiChevronDown style={{ color: 'gray' }} />}
                                </Button>
                            )}
                            <Slide direction='bottom' in={isOpenSlide}>
                                <Stack color='white' mt='3' ml={{ base: '11px', md: '250px' }} mr='3' bg="#012652" rounded='md' shadow='md' maxHeight={{ base: '300px', md: '500px' }}>
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
                                                            <CategoriesAction categorysDetails={category} isRemovingCategory={isRemovingCategory} setCurrentCategoryId={setCurrentCategoryId} isUpdateCategoryLoading={isUpdateCategoryLoading} updateCategory={updateCategory} removeCategory={removeCategory} />
                                                        </Tab>
                                                    </Stack>
                                                ))}
                                            </TabList>
                                        </Stack>
                                        <TabPanels py={5}>
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
                                                                        <Button as={Link} to={`/admin/folder/category/subCategory/${subCategory.id}`} size={"sm"} w={'full'} h={'auto'} textColor="#012652" bg={'transparent'}>{subCategory.subCategoryName}
                                                                        </Button>
                                                                        <Stack direction={'row'} >
                                                                            <SubCategoriesAction subCategorysDetails={subCategory}
                                                                                setCurrentSubCategoryId={setCurrentSubCategoryId}
                                                                                isUpdateSubCategoryLoading={isUpdateSubCategoryLoading}
                                                                                updateSubCategory={updateSubCategory}
                                                                                removeSubCategory={removeSubCategory}
                                                                                subCategoryNotDone={subCategoryNotDone}
                                                                                subCategoryDone={subCategoryDone}
                                                                                duplicateSubCategory={duplicateSubCategory} />
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


