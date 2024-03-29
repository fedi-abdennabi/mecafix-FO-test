import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { Page, PageContent, PageTopBar } from "../layout";
import { FieldInput } from '@/components/FieldInput';
import { isMaxLength, isMinLength, isNumber } from '@formiz/validations';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCarCreate } from '../Car/cars.service';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { FieldImage64bit } from '@/components/FieldImage64bit';

interface ErrorResponse {
    immatriculation: string[];
  }

export const PageAddCar = () => {
    const { t } = useTranslation(['common', 'car', 'account']);
    const navigate = useNavigate();
    const { clientId } = useParams();
    const myForm = useForm();
    const isValidRegistrationFormat = (value:TODO) => {
        const pattern = /^[0-9]{4}-[A-Za-z]{2}-[0-9]{4}$/;
        return pattern.test(value);
    };

    const toastError = useToastError();
    const toastSuccess = useToastSuccess();
    const { mutate: createCar } = useCarCreate(
        {
            onError: (error) => {
                if (error.response) {
                    toastError({
                        title:
                            (error?.response?.data as ErrorResponse)?.immatriculation?.[0] ||
                            t('common:use.errorOccurred'),
                    });
                }
            },
            
            onSuccess: () => {
                toastSuccess({
                    title: t('account:car.SuccessAdd'),
                });
                navigate(`/admin/clients/showClient/${clientId}`);
            },
        }
    );
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (values: TODO) => {
        createCar({ ...values, clientId });
    };

    return (
        <Page containerSize="lg">
            <PageTopBar w={"full"} m="1" showBack onBack={() => navigate(-1)}>
                <Text as='b' fontSize='xl'>{t('account:car.title')}</Text>
            </PageTopBar>
            <PageContent>
                <Formiz connect={myForm} onValidSubmit={handleSubmit}>
                    <Box
                        as="form"
                        p="6"
                        borderRadius="md"
                        boxShadow="md"
                        bg="white"
                        _dark={{ bg: 'blackAlpha.400' }}
                        onSubmit={myForm.submit}
                    >
                        <Stack spacing="4" mt="8">
                            <FieldInput
                                name="immatriculation"
                                label={t('account:car.registration.label')}
                                required={t('account:car.registration.required') as string}
                                validations={[
                                    {
                                        rule: (value) => isValidRegistrationFormat(value),
                                        message: t('account:car.registration.invalidFormat'),
                                    },
                                ]}
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
                                    required={t('account:car.mileage.required') as string}
                                    validations={[
                                        {
                                            rule: isNumber(),
                                            message: t('car:data.mileage.invalid'),
                                        },
                                        {
                                            rule: isMinLength(1),
                                            message: t('car:data.mileage.tooShort', { min: 1 }),
                                        },
                                        {
                                            rule: isMaxLength(10),
                                            message: t('car:data.mileage.tooLong', { min: 10 }),
                                        },
                                    ]}
                                />
                            </Stack>
                            <Stack>
                                <FieldImage64bit name="picture" label={t('account:car.picture')} />
                            </Stack>
                            <Button style={{ margin: '24px 2px' }} colorScheme='blue' type='submit'>{t('account:carte.submit-button')}</Button>
                        </Stack>
                    </Box>
                </Formiz>
            </PageContent>
        </Page>
    );
};
