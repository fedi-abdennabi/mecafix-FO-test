
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
interface selectedClientProps {
    selectedClient: Clients;
}

export const Form : FC<selectedClientProps> = ({ selectedClient }) => {
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

    console.log(selectedClient.car);
    return (
        <Formiz autoForm >
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
                                    <Box as='button' borderRadius='lg' bg='white' color='black' px={4} h={8} mr={4} name='model' bgColor='gray.100'>
                                        {selectedCar.model}
                                    </Box>
                                    <Box as='button' borderRadius='lg' bg='white' color='black' px={4} h={8} mr={4} name='brand' bgColor='gray.100'>
                                        {selectedCar.brand}
                                    </Box>
                                    <Box as='button' borderRadius='lg' bg='white' color='black' px={4} h={8} mr={4} name='immatriculation' bgColor='gray.100'>
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
                                    <p>audio</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        <Button style={{ margin: '0 8px' }} colorScheme='blue'>{t('account:carte.submit-button')}</Button>
                    </Stack>
                )}
            </Box>
        </Formiz>

    )

}
