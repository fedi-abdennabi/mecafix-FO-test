
import React, { FC, ReactElement, useState } from 'react';
import { Box, Flex, Stack, Button, Textarea, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Select } from '@chakra-ui/react';
import { FieldInput } from "@/components/FieldInput"
import { FieldImage64bit } from '@/components/FieldImage64bit';
import { FieldDayPicker } from '@/components/FieldDayPicker';
import { Formiz } from "@formiz/core";
import { useTranslation } from 'react-i18next';
import { Clients } from '../../Clients/client.type'
import { FieldRadios } from '@/components/FieldRadios';
import { Car } from '@/spa/Car/car.type';
import { useAddFolder } from '@/spa/folder/folder.service';
import { useNavigate } from 'react-router-dom';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { RecordView } from '../RecordView';
interface selectedClientProps {
    selectedClient: Clients;
}

export const Form: FC<selectedClientProps> = ({ selectedClient }) => {
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    const navigate = useNavigate();
    const { t } = useTranslation(['common', 'account']);
    const [fields, setFields] = useState<ReactElement[]>([]);
    const addField = () => {
        setFields([...fields, <FieldImage64bit key={fields.length} name={`test${fields.length}`} />]);
    };
    const [selectedCar, setSelectedCar] = useState(selectedClient?.car[0]);
    const handleCarSelection = (event: TODO) => {
        const selectedCarId = event.target.value;
        const car = selectedClient?.car.find(c => c.id.toString() === selectedCarId);
        setSelectedCar(car);
    };
    const clientId = selectedClient.id;
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
    const handleSubmit = (values: TODO) => {
        addFolder({ ...values, clientId });
    };

    return (
        <Formiz autoForm onValidSubmit={handleSubmit}>
            <Box
                p="6"
                borderRadius="md"
                boxShadow="md"
                bg="white"
                _dark={{ bg: 'blackAlpha.400' }}
            >
                {selectedClient && selectedClient?.car && (
                    <Stack spacing="8" mt="8">
                        <Heading size="sm">{t('account:carte.registration')}</Heading>
                        <Select onChange={handleCarSelection} value={selectedCar?.id.toString()}>
                            {selectedClient.car.map((car: Car) => (
                                <option key={car.id.toString()} value={car.id.toString()}>
                                    {car.immatriculation}
                                </option>
                            ))}
                        </Select>
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
                        <Flex direction={{ base: 'column', sm: 'column' }} alignItems="flex-start">
                            <Box >
                                <Button colorScheme='gray' mb="4" onClick={addField}>{t('account:carte.addImage')}</Button>
                            </Box>
                            <Box width="100%" overflowX="scroll">
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
                                    <Textarea placeholder={t('account:carte.note-placeholder')} defaultValue={selectedClient?.folder[0]?.notes} />
                                </TabPanel>
                                <TabPanel>
                                    <RecordView />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        <Button style={{ margin: '0 8px' }} colorScheme='blue' type='submit'>{t('account:carte.submit-button')}</Button>
                    </Stack>
                )}
            </Box>
        </Formiz>

    )

}
