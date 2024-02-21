import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Button,
    Slide,
    Box,
    useDisclosure,
    Text,
    Stack,
    Card,
    CardBody,
    Heading,
    Image,
    CardHeader,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react';
import {
    HiChevronDown,
    HiOutlineFolderOpen,
    HiOutlinePencilAlt,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineDocumentAdd,
    HiOutlineDocumentDownload,
    HiOutlineDocumentDuplicate
} from "react-icons/hi";
import { Page, PageContent, PageTopBar } from "../layout";
import { useNavigate, useParams } from "react-router-dom";
import { useClientRemove } from "./clients.service";
import { useClientFolder } from "../folder/folder.service";
import { t } from "i18next";
import { useCarRemove } from '../Car/cars.service';
import { Car } from '../Car/car.type';
import { Folder } from '../folder/folder.type';
import { useState } from 'react';
import { useToastError, useToastSuccess } from '@/components/Toast';

const PageShowClient = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { isOpen: isOpenSlide, onClose: onCloseSlide, onToggle: onToggleSlide } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenCar, onOpen: onOpenCar, onClose: onCloseCar } = useDisclosure();
    const clientId = params.clientId ? params.clientId : -1;
    const { response } = useClientFolder(clientId);
    const toast = useToast();
    const toastSuccess = useToastSuccess();
    const toastError = useToastError();
    const navigatePath = '/admin/Clients';
    const [selectedCarId, setSelectedCarId] = useState<number>();
    const { mutate: removeClient, isLoading: isRemoving } = useClientRemove(clientId, navigatePath,
        {
            onSuccess: () => {
                toastSuccess({
                    title: t('account:client.SuccessDelete'),
                });
            },
            onError: () => {
                toastError({
                    title: t('common:use.errorOccurred'),
                });
            },
        });

    const { mutate: removeCar, isLoading: isRemovingCar } = useCarRemove(selectedCarId,
        {
            onSuccess: () => {
                toastSuccess({
                    title: t('account:car.SuccessDelete'),
                });
                navigate(`/admin/clients/showClient/${clientId}`);
            },
            onError: () => {
                toastError({
                    title: t('common:use.errorOccurred'),
                });
            },
        });

        const handleOpenCarModal = (id:number) => {
            setSelectedCarId(id);
            onOpenCar();
        };

        const handleRemoveCar = () => {
            {selectedCarId && removeCar(selectedCarId); }
            onCloseCar();
        };

    const copyToClipboard = (text: TODO) => {
        navigator.clipboard.writeText(text).then(
            () => {
                toast({
                    title: "Copied to clipboard",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            },
            () => {
                toast({
                    title: "Failed to copy text",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        );
    };

    return (
        <>
            <Page containerSize="md">
                <PageTopBar m="1" showBack onBack={() => navigate(-1)}>
                    <Text as='b' fontSize='xl'>{response?.client?.firstName + ' ' + response?.client?.lastName}</Text>
                </PageTopBar>
                <PageContent>
                    <Tabs>
                        <TabList justifyContent='space-between'>
                            <Tab>{t('account:clientTabs.identity')}</Tab>
                            <Tab>{t('account:clientTabs.Vehicles')}</Tab>
                            <Tab>{t('account:clientTabs.contracts')}</Tab>
                        </TabList>
                        <TabPanels mt={'5'} mb={'5'}>
                            <TabPanel>
                                <Stack direction='row' mb={4} justifyContent={'space-between'}>
                                    <Stack direction='row'>
                                        <Text>{t('account:client.Type')}</Text>
                                        <Text as='b'>{response?.client?.type}</Text>
                                    </Stack>
                                    <Stack>
                                        <HiOutlineDocumentDuplicate onClick={() => copyToClipboard(response?.client?.type)} cursor='pointer' />
                                    </Stack>
                                </Stack>
                                <Stack direction='row' mb={4} justifyContent={'space-between'}>
                                    <Stack direction='row'>
                                        <Text>{t('account:client.firstname')}</Text>
                                        <Text as='b'>{response?.client?.firstName}</Text>
                                    </Stack>
                                    <Stack>
                                        <HiOutlineDocumentDuplicate onClick={() => copyToClipboard(response?.client?.firstName)} cursor='pointer' />
                                    </Stack>
                                </Stack>
                                <Stack direction='row' mb={4} justifyContent={'space-between'}>
                                    <Stack direction='row'>
                                        <Text>{t('account:client.lastname')}</Text>
                                        <Text as='b'>{response?.client?.lastName}</Text>
                                    </Stack>
                                    <Stack>
                                        <HiOutlineDocumentDuplicate onClick={() => copyToClipboard(response?.client?.lastName)} cursor='pointer' />
                                    </Stack>
                                </Stack>
                                <Stack direction='row' mb={4} justifyContent={'space-between'}>
                                    <Stack direction='row'>
                                        <Text>{t('account:client.email')}</Text>
                                        <Text as='b'>{response?.client?.email}</Text>
                                    </Stack>
                                    <Stack>
                                        <HiOutlineDocumentDuplicate onClick={() => copyToClipboard(response?.client?.email)} cursor='pointer' />
                                    </Stack>
                                </Stack>
                                <Stack direction='row' mb={4} justifyContent={'space-between'}>
                                    <Stack direction='row'>
                                        <Text>{t('account:client.phoneNumber.label')}</Text>
                                        <Text as='b'>{response?.client?.phone}</Text>
                                    </Stack>
                                    <Stack>
                                        <HiOutlineDocumentDuplicate onClick={() => copyToClipboard(response?.client?.phone)} cursor='pointer' />
                                    </Stack>
                                </Stack>
                                <Stack direction='row' mb={4} justifyContent={'space-between'}>
                                    <Stack direction='row'>
                                        <Text>{t('account:client.adresse.label')}</Text>
                                        <Text as='b'>{response?.client?.adress}</Text>
                                    </Stack>
                                    <Stack>
                                        <HiOutlineDocumentDuplicate onClick={() => copyToClipboard(response?.client?.adress)} cursor='pointer' />
                                    </Stack>
                                </Stack>
                                <Stack direction='row' mb={4} justifyContent={'space-between'}>
                                    <Stack direction='row'>
                                        <Text>{t('account:client.city.label')}</Text>
                                        <Text as='b'>{response?.client?.city}</Text>
                                    </Stack>
                                    <Stack>
                                        <HiOutlineDocumentDuplicate onClick={() => copyToClipboard(response?.client?.city)} cursor='pointer' />
                                    </Stack>
                                </Stack>
                                <Stack direction='row' mb={4} justifyContent={'space-between'}>
                                    <Stack direction='row'>
                                        <Text>{t('account:client.PostalCode.label')}</Text>
                                        <Text as='b'>{response?.client?.postalCode}</Text>
                                    </Stack>
                                    <Stack>
                                        <HiOutlineDocumentDuplicate onClick={() => copyToClipboard(response?.client?.postalCode)} cursor='pointer' />
                                    </Stack>
                                </Stack>
                            </TabPanel>
                            <TabPanel mb={'10'}>
                                <Card direction={{ base: 'row', sm: 'row' }}>
                                    <CardHeader w={'90%'}>
                                        <Text size='md'>{t('account:tabscontent.vehiclesTotal')}</Text>
                                    </CardHeader>
                                    <CardBody bgColor='gray.400'>
                                        <Stack spacing='4' w={'10%'}  >
                                            <Box >
                                                <Text as='b'>{response?.car?.length}</Text>
                                            </Box>
                                        </Stack>
                                    </CardBody>
                                </Card>
                                {response?.car?.map((car: Car) => (
                                    <>
                                        <Card
                                            key={car?.id}
                                            direction={{ base: 'row', sm: 'row' }}
                                            overflow='hidden'
                                            variant='outline'
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='space-between'
                                            py={2}
                                            px={4}
                                            m={2}
                                        >
                                            <Stack direction='row' width="70%" alignItems='center'>
                                                <CardBody>
                                                    <Heading size='sm'>{response?.car?.model}</Heading>
                                                    <Text py='2'>
                                                        {car.immatriculation}
                                                    </Text>
                                                    <Text pt='10'>
                                                        {t('account:car.Main vehicle')}
                                                    </Text>
                                                </CardBody>
                                            </Stack>

                                            <Stack width="30%">
                                                <Image src={car?.image} alt='car image' />
                                            </Stack>
                                        </Card>
                                        <Stack
                                            direction={{ base: 'row', sm: 'row' }} justifyContent='space-between'>
                                            <Button flex="1" colorScheme="blue" onClick={() => handleOpenCarModal(car.id)}>{t('account:button.delete')}</Button>
                                            <Modal isOpen={isOpenCar} onClose={onCloseCar}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>{t('account:deleteClientModal.title')}</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Text>{t('account:deleteClientModal.body')}</Text>
                                                    </ModalBody>

                                                    <ModalFooter>
                                                        <Button variant='ghost' mr={3} onClick={onCloseCar}>
                                                            {t('account:deleteClientModal.noButton')}
                                                        </Button>
                                                        <Button colorScheme='blue' onClick={handleRemoveCar} disabled={isRemovingCar}>{t('account:deleteClientModal.yesButton')}</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                            <Button flex="1" colorScheme="gray" onClick={() => navigate(`../${clientId}/updateCar/${car.id}`)}>{t('account:button.update')}</Button>
                                        </Stack>
                                    </>
                                ))}
                            </TabPanel>
                            <TabPanel>
                                <Card direction={{ base: 'row', sm: 'row' }}>
                                    <CardHeader w={'90%'}>
                                        <Text size='md'>{t('account:tabscontent.contractsTotal')}</Text>
                                    </CardHeader>
                                    <CardBody bgColor='gray.400'>
                                        <Stack spacing='4' w={'10%'}  >
                                            <Box >
                                                <Text as='b'>{response?.folders?.length}</Text>
                                            </Box>
                                        </Stack>
                                    </CardBody>
                                </Card>
                                {response?.folders?.map((folder: Folder) => (
                                    <Card
                                        key={folder.id}
                                        direction={{ base: 'row', sm: 'row' }}
                                        overflow='hidden'
                                        variant='outline'
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='space-between'
                                        cursor={'pointer'}
                                        onClick={() => navigate(`../folder/${folder.id}`)}
                                        py={2}
                                        px={4}
                                        m={2}
                                    >
                                        <Stack direction='row' width="70%" alignItems='center'>
                                            <CardBody>
                                                <Heading size='sm'>{response?.clients?.firstName}</Heading>
                                                <Text size='xs' py='2'>
                                                    {folder.car?.model}
                                                </Text>
                                                <Text size='xs' py='2'>
                                                    {folder.car?.immatriculation}
                                                </Text>
                                                <Text size='xs' py='2'>
                                                </Text>
                                            </CardBody>
                                        </Stack>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}>
                                            <HiOutlineFolderOpen size={40} />
                                            <Text>{t('account:folder.contrat')}{folder.id}</Text>
                                        </Stack>
                                    </Card>
                                ))}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Stack>
                        {!isOpenSlide && (
                            <Button
                                pos='fixed'
                                bottom='0'
                                w={{ base: '100%', sm: '50%' }}
                                zIndex={'1000'}
                                onClick={onToggleSlide}
                                style={{ backgroundColor: isOpenSlide ? 'white' : '#e2e8f0' }}
                            >
                                {!isOpenSlide ? <HiOutlinePencilAlt /> : <HiChevronDown />}
                            </Button>
                        )}
                        <Slide direction='bottom' in={isOpenSlide}>
                            <Stack overflowY={'auto'} p='40px' color='white' mt='4' ml={{ base: '11px', md: '250px' }} mr={3} bg="#012652" rounded='md' shadow='md' maxHeight={{ base: '300px', md: '500px' }}>
                                <Tabs size={'sm'} variant='soft-rounded' colorScheme='blue'>
                                    <Stack justifyContent='center' p='2'>
                                        <Button onClick={onCloseSlide} mb={'5'} >
                                            <HiChevronDown style={{ color: 'black' }} />
                                        </Button>
                                        <TabPanels>
                                            <Stack direction='column' spacing={4} >
                                                <Button onClick={() => navigate(`../updateClient/${clientId}`)}><HiOutlinePencil style={{ marginLeft: '10px', marginRight: '10px' }} /> {t('account:clientButtons.editButton')}</Button>
                                                <Button onClick={() => navigate(`../${clientId}/addCar`)}><HiOutlineDocumentDownload style={{ marginLeft: '10px', marginRight: '10px' }} />{t('account:clientButtons.addVehicle')}</Button>
                                                <Button onClick={() => navigate(`../client/${clientId}/addFolder`)}><HiOutlineDocumentAdd style={{ marginLeft: '10px', marginRight: '10px' }} />{t('account:clientButtons.newContractButton')}</Button>
                                                <Button onClick={onOpen}><HiOutlineTrash style={{ marginLeft: '10px', marginRight: '10px' }} />{t('account:clientButtons.removeClient')}</Button>
                                                <Modal isOpen={isOpen} onClose={onClose}>
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>{t('account:deleteClientModal.title')}</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            <Text>{t('account:deleteClientModal.body')}</Text>
                                                        </ModalBody>

                                                        <ModalFooter>
                                                            <Button variant='ghost' mr={3} onClick={onClose}>
                                                                {t('account:deleteClientModal.noButton')}
                                                            </Button>
                                                            <Button colorScheme='blue' onClick={() => removeClient(clientId)} disabled={isRemoving}>{t('account:deleteClientModal.yesButton')}</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </Stack>
                                        </TabPanels>
                                    </Stack>
                                </Tabs>
                            </Stack>
                        </Slide>
                    </Stack>
                </PageContent>
            </Page>
        </>
    )
}
export default PageShowClient;
