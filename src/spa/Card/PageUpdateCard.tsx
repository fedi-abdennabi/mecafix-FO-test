import React, { ReactElement, useState } from 'react';
import { Page, PageTopBar, PageContent } from '@/spa/layout';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Formiz } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { FieldDayPicker } from '@/components/FieldDayPicker';
import { FieldImage64bit } from '@/components/FieldImage64bit';
import { useFolder, useFolderUpdate } from '../folder/folder.service';
import { FieldTextarea } from '@/components/FieldTextarea';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { FieldRadios } from '@/components/FieldRadios';
import { AiFillCar, AiFillSetting, AiFillWarning } from "react-icons/ai";
import { Folder } from '../folder/folder.type';
import { RecordView } from './RecordView';


export const PageUpdateCard = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(['common', 'account']);
    const [fields, setFields] = useState<ReactElement[]>([]);
    const addField = () => {
        setFields([...fields, <FieldImage64bit key={fields.length} name='picture' />]);
    };
    const params = useParams();
    const id = params.folderId;
    const { folder } = useFolder(id);
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    const { mutate: updateFolder, isLoading: updateFolderLoading } = useFolderUpdate(
        id,
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
                    title: t('account:folder.SuccessUpdate'),
                });
                navigate(`/admin/folder/${id}`);
            },
        }
    );


    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    const submitUpdateFolder = async (values: Folder) => {
        const newFolder = {
            ...values,
        };
        await updateFolder(newFolder);
    };

    return (
        <Page containerSize="md">
            <PageContent>
                <PageTopBar w={"full"} m="1" showBack onBack={() => navigate(-1)}>
                    {t('account:folder.card-button')}
                </PageTopBar>
                <PageContent>
                    <Formiz autoForm
                        onValidSubmit={submitUpdateFolder}
                        initialValues={{
                            notes: folder?.notes,
                            notesVocal: folder?.notesVocal,
                            date: folder?.updated_at ? formatDate(folder.updated_at) : '',
                            panne: folder?.panne ? '1' : '0',
                            picture: folder?.car?.image ? folder?.car?.image : ''
                        }}
                        key={folder?.id}>
                        <Box
                            p="6"
                            borderRadius="md"
                            boxShadow="md"
                            bg="white"
                            _dark={{ bg: 'blackAlpha.400' }}
                        >
                            <Stack spacing="4" mt="8">
                                <FieldInput
                                    name='firstName'
                                    label='Client'
                                    defaultValue={folder?.clients?.firstName + ' ' + folder?.clients.lastName}
                                    isDisabled
                                />
                            </Stack>
                            <Stack spacing="8" mt="8">
                                <Heading size="sm">{t('account:carte.details-heading')}</Heading>
                                <Flex direction={{ base: 'column', sm: 'row' }}>
                                    <Box borderRadius='50px' bg='gray.100' color='black' px={4} py={2} mr={4} display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
                                        <AiFillCar />
                                        {folder?.car.immatriculation}
                                    </Box>
                                    <Box borderRadius='50px' bg='gray.100' color='black' px={4} py={2} mr={4} display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
                                        <AiFillSetting />
                                        {folder?.car.model}
                                    </Box>
                                    <Box borderRadius='50px' bg='gray.100' color='black' px={4} py={2} mr={4} display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2}>
                                        <AiFillWarning />
                                        {folder?.car.brand}
                                    </Box>
                                </Flex>
                                <FieldInput
                                    name="mileage"
                                    label={t('account:carte.mileage')}
                                    defaultValue={folder?.car.mileage}
                                />
                                <FieldRadios
                                    name="panne"
                                    label={t('account:carte.fault')}
                                    options={[
                                        { value: '1', label: t('account:carte.fault-response.1') },
                                        { value: '0', label: t('account:carte.fault-response.0') },
                                    ]}
                                    required
                                />
                                <Heading size="sm">Date</Heading>
                                <Flex>
                                    <Box w='full'>
                                        <FieldDayPicker
                                            name="date"
                                            placeholder={t('account:carte.date')}
                                        />
                                    </Box>
                                </Flex>
                                <Heading size="sm">{t('account:carte.image')}</Heading>
                                {folder?.car?.image && (
                                    <FieldImage64bit name='picture' isDisabled />
                                )}
                                <Flex direction={{ base: 'column', sm: 'column' }} alignItems="flex-start">
                                    <Box >
                                        <Button colorScheme='gray' mb="4" onClick={addField}>{t('account:carte.addImage')}</Button>
                                    </Box>
                                    <Box width="100%" overflowX="scroll" >
                                        <Flex direction="row">
                                            {fields.map((field, index) => (
                                                <Box key={index} marginRight="10px">
                                                    {field}
                                                </Box>
                                            ))}
                                        </Flex>
                                    </Box>
                                </Flex>

                                <Tabs variant='soft-rounded' colorScheme='blue'>
                                    <TabList>
                                        <Tab>{t('account:carte.note')}</Tab>
                                        <Tab>{t('account:carte.audio')}</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <FieldTextarea
                                                name='notes'
                                                placeholder={t('account:carte.note-placeholder')} />
                                        </TabPanel>
                                        <TabPanel>
                                            <RecordView />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>

                                <Button style={{ margin: '0 8px' }} colorScheme='blue' isLoading={updateFolderLoading} type='submit' >{t('account:carte.submit-button')}</Button>
                            </Stack>
                        </Box>
                    </Formiz>
                </PageContent>
            </PageContent>
        </Page>
    )
}