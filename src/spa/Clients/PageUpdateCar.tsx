import { Box, Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { Page, PageContent, PageTopBar } from "../layout";
import { FieldInput } from '@/components/FieldInput';
import { isNumber } from '@formiz/validations';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClient } from './clients.service';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { useCarUpdate } from '../Car/cars.service';
import { Car } from '../Car/car.type';

export const PageUpdateCar = () => {
    const { t } = useTranslation(['common', 'car', 'account']);
    const navigate = useNavigate();
    const params = useParams();
    const clientId = params.clientId;
    const carId = params.carId;
    const { client } = useClient(clientId);
    const [currentCar, setCurrentCar] = useState<Car>();
    //const id = response?.car?.carId;
    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    useEffect(() => {
        if (client && client.car) {
            const carToUpdate = client.car.find(car => car.id.toString() === carId);
            setCurrentCar(carToUpdate);
        }
    }, [client, carId]);
    const { mutate: updateCar, isLoading: updateCarLoading } = useCarUpdate(
        currentCar?.id,
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
                    title: t('account:car.successUpdate'),
                });
                navigate(`/admin/clients/showClient/${clientId}#car`);
            },
        }
    );
    const submitUpdateCar = (values: TODO) => {
        const newCar = {
            id: carId,
            ...values,
        };
        updateCar(newCar);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!currentCar) return <Page containerSize="xl">
        <PageContent alignItems={'center'} justifyContent={'center'}>
            <Flex>
                <Spinner />
            </Flex>

        </PageContent>
    </Page>;
    return (
        <Page containerSize="xl">
            <PageTopBar w={"full"} m="1" showBack onBack={() => navigate(-1)}>
                <Text as='b' fontSize='xl'>{t('account:car.update')}</Text>
            </PageTopBar>
            <PageContent>
                <Formiz key={currentCar?.id} autoForm onValidSubmit={submitUpdateCar} initialValues={{
                    carType: currentCar.carType || '',
                    immatriculation: currentCar.immatriculation || '',
                    brand: currentCar.brand || '',
                    model: currentCar.model || '',
                    box: currentCar.box || '',
                    mileage: currentCar.mileage || '',
                }}>
                    <Box
                        p="6"
                        borderRadius="md"
                        boxShadow="md"
                        bg="white"
                        _dark={{ bg: 'blackAlpha.400' }}
                    >
                        <Stack spacing="4" mt="8">
                            <FieldInput
                                name="immatriculation"
                                label={t('account:car.registration.label')}
                                required
                            />
                            <FieldInput
                                name="carType"
                                label={t('car:carType.label')}
                            />
                            <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                                <FieldInput
                                    name="brand"
                                    label={t('account:car.brand.label')}
                                    required
                                />

                                <FieldInput
                                    name="model"
                                    label={t('account:car.model.label')}
                                    required
                                />

                            </Stack>
                            <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                                <FieldInput name="box" label={t('account:car.box')} />
                                <FieldInput
                                    name="mileage"
                                    label={t('account:car.mileage.label')}
                                    validations={[
                                        {
                                            rule: isNumber(),
                                            message: t('car:data.mileage.invalid'),
                                        },
                                        // {
                                        //     rule: isMinLength(1),
                                        //     message: t('car:data.mileage.tooShort', { min: 1 }),
                                        // },
                                        // {
                                        //     rule: isMaxLength(10),
                                        //     message: t('car:data.mileage.tooLong', { min: 10 }),
                                        // },
                                    ]}
                                    required
                                />
                            </Stack>
                            <Button style={{ margin: '24px 2px' }} colorScheme='blue' isLoading={updateCarLoading} type='submit' >{t('account:carte.submit-button')}</Button>
                        </Stack>
                    </Box>
                </Formiz>
            </PageContent>
        </Page>
    );
};
