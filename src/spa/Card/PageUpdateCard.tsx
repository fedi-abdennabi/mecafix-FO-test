import React, { ReactElement, useState } from 'react';
import { Page, PageTopBar, PageContent } from '@/spa/layout';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Formiz } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { FieldDayPicker } from '@/components/FieldDayPicker';
import { FieldImage64bit } from '@/components/FieldImage64bit';
import { useFolder, useFolderUpdate } from '../folder/folder.service';
import { FieldTextarea } from '@/components/FieldTextarea';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { FieldRadios } from '@/components/FieldRadios';


export const PageUpdateCard = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(['common', 'account']);
    const [fields, setFields] = useState<ReactElement[]>([]);
    const addField = () => {
        setFields([...fields, <FieldImage64bit key={fields.length} name={`test${fields.length}`} />]);
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
    const submitUpdateFolder = async (values: TODO) => {
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
                    <Formiz autoForm onValidSubmit={submitUpdateFolder} initialValues={{ notes: folder?.notes }}>
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
                                <Flex direction='row'>
                                    <Box as='button' borderRadius='50px' bg='gray.100' color='black' px={4} h={8} mr={4} name='registration'>
                                        {folder?.car.immatriculation}
                                    </Box>
                                    <Box as='button' borderRadius='50px' bg='gray.100' color='black' px={4} h={8} mr={4} name='model'>
                                        {folder?.car.model}
                                    </Box>
                                    <Box as='button' borderRadius='50px' bg='gray.100' color='black' px={4} h={8} mr={4} name='brand'>
                                        {folder?.car.brand}
                                    </Box>
                                </Flex>
                                <FieldInput
                                    name="mileage"
                                    label={t('account:carte.mileage')}
                                    defaultValue={folder?.mileage}
                                />
                                <FieldRadios
                                    name="Dépanneuse"
                                    label={t('account:carte.fault')}
                                    options={[
                                        { value: 'oui', label: t('account:carte.fault-response.1') },
                                        { value: 'non', label: t('account:carte.fault-response.0') },
                                    ]}
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
                                <Flex >
                                    <Box w='30%' >
                                        <Button style={{ margin: '0 8px' }} colorScheme='gray' onClick={addField}>{t('account:carte.addImage')}</Button>
                                    </Box>
                                    {/* <Spacer /> */}
                                    <Box w='70%'>
                                        {fields.map(field => field)}
                                    </Box>
                                </Flex>
                                <FieldTextarea
                                    label={t('account:carte.note')}
                                    name='notes'
                                    placeholder={t('account:carte.note-placeholder')} />
                                <Button style={{ margin: '0 8px' }} colorScheme='blue' isLoading={updateFolderLoading} type='submit' >{t('account:carte.submit-button')}</Button>
                            </Stack>
                        </Box>
                    </Formiz>
                </PageContent>
            </PageContent>
        </Page>
    )
}