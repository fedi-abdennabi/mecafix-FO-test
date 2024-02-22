import React, { useState } from 'react';
import { Page, PageTopBar, PageContent } from '@/spa/layout';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading, Image, Input, Select, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Formiz } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { FieldDayPicker } from '@/components/FieldDayPicker';
import { FieldTextarea } from '@/components/FieldTextarea';
import { FieldRadios } from '@/components/FieldRadios';
import { useAddFolder, useClientFolder } from '../folder/folder.service';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Car } from '../Car/car.type';
import { Folder } from '../folder/folder.type';


const PageAddFolder = () => {
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    const navigate = useNavigate();
    const { t } = useTranslation(['common', 'account']);
    const [images, setImages] = useState<string[]>([]);

    const params = useParams();
    const clientId = params.clientId;
    const { response } = useClientFolder(clientId);
    const { mutate: addFolder } = useAddFolder(clientId, {
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
                title: t('common:folder.SuccessAdd') as string,
            });
            navigate(-1);
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const files = Array.from(event.target.files);

        const fileReaders = files.map((file: Blob) => { // Explicitly type 'file' as Blob, which is a parent type of File
            return new Promise<string | ArrayBuffer | null>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file); // 'file' is now guaranteed to be a Blob
            });
        });

        Promise.all(fileReaders).then(results => {
            setImages(results.map(result => {
                // Ensure 'result' is treated as a string before calling toString(), which is redundant for strings
                if (typeof result === 'string') {
                    return result;
                } else {
                    // Handle non-string results or throw an error
                    console.error('File read result is not a string.');
                    return '';
                }
            }));
        });
    };
    const [selectedCar, setSelectedCar] = useState(response?.car[0]);
    const handleCarSelection = (event: TODO) => {
        const selectedCarId = event.target.value;
        const car = response?.car.find((c:TODO) => c.id.toString() === selectedCarId);
        setSelectedCar(car);
    };
    const handleSubmit = (values: Folder) => {
        const updatedValues = { ...values, images, clientId };
        addFolder(updatedValues);
    };


    return (
        <Page containerSize="lg">
            <PageTopBar w={"full"} m="1" showBack onBack={() => navigate(-1)}>
                <Text as={'b'} fontSize='xl'> {t('account:folder.ContractCreationTitle')} </Text>
            </PageTopBar>
            <PageContent>
                <PageContent>
                    <Formiz autoForm onValidSubmit={handleSubmit}>
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
                                    defaultValue={response?.client?.firstName + ' ' + response?.client?.lastName}
                                    isDisabled
                                />
                            </Stack>
                            <Stack spacing="5" mt="8">
                                
                                {response && response?.car && (
                                    <>
                                        <Heading size="sm">{t('account:carte.registration')}</Heading>
                                        <Select onChange={handleCarSelection} value={response?.car?.id}>
                                            {response?.car.map((car: Car) => (
                                                <option key={car.id.toString()} value={car.id.toString()}>
                                                    {car.immatriculation}
                                                </option>
                                            ))}
                                        </Select>
                                    </>
                                )}
                                <Heading size="sm">{t('account:carte.details-heading')}</Heading>
                                {selectedCar && (
                            <>
                                <Flex direction='row'>
                                    <Box borderRadius='lg' bg='white' color='black' px={4} py={2} mr={4} bgColor='gray.100'>
                                        {selectedCar.model}
                                    </Box>
                                    <Box borderRadius='lg' bg='white' color='black' px={4} py={2} mr={4} bgColor='gray.100'>
                                        {selectedCar.brand}
                                    </Box>
                                    <Box borderRadius='lg' bg='white' color='black' px={4} py={2} mr={4} bgColor='gray.100'>
                                        {selectedCar.immatriculation}
                                    </Box>
                                </Flex>
                                <FieldInput
                                    name="mileage"
                                    label={t('account:carte.mileage')}
                                    defaultValue={selectedCar.mileage}
                                />
                            </>
                        )}
                                <FieldRadios
                                    name="panne"
                                    label={t('account:carte.fault')}
                                    options={[
                                        { value: '1', label: t('account:carte.fault-response.1') },
                                        { value: '0', label: t('account:carte.fault-response.0') },
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
                                <Flex direction={{ base: 'column', sm: 'row' }}>
                                    <Flex w="40%">
                                        <Input type="file" onChange={handleFileChange} multiple accept="image/*" />
                                    </Flex>
                                    <Flex w="60%">
                                        {images.map((image, index) => (
                                            <Image key={index} src={image} alt={`Preview ${index}`} boxSize="150px" m="2" objectFit="cover" />
                                        ))}
                                    </Flex>
                                </Flex>
                                <FieldTextarea
                                    label={t('account:carte.note')}
                                    name='notes'
                                    placeholder={t('account:carte.note-placeholder')}
                                />
                                <Button style={{ margin: '0 8px' }} colorScheme='blue' type='submit' >{t('account:carte.submit-button')}</Button>
                            </Stack>
                        </Box>
                    </Formiz>
                </PageContent>
            </PageContent>
        </Page>
    )
}

export default PageAddFolder;