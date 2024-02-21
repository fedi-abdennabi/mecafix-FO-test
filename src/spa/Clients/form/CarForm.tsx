import { Box, Heading, Stack } from '@chakra-ui/react';
import { FormizStep } from '@formiz/core';
import { useTranslation } from 'react-i18next';

import { FieldImage64bit } from '@/components/FieldImage64bit';
import { FieldInput } from '@/components/FieldInput';
import { isMaxLength, isMinLength, isNumber } from '@formiz/validations';
import { useEffect } from 'react';
import { Page, PageContent } from '@/spa/layout';

export const CarForm = () => {
  const { t, i18n } = useTranslation(['common', 'car', 'account']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page containerSize="xl">
      <PageContent>
        <FormizStep name="step2" label="step2" >
          <Box
            p="6"
            borderRadius="md"
            boxShadow="md"
            bg="white"
            _dark={{ bg: 'blackAlpha.400' }}
          >
            <Heading size="lg" mb="8">
              {t('account:car.title')}
            </Heading>
            <Stack spacing="4" mt="8">
              <FieldInput
                name="registration"
                label={t('account:car.registration.label')}
                required={t('account:car.registration.required') as string}
              />
              <FieldInput
                name="carType"
                label={t('car:carType.label')}
              />
              <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                <FieldInput
                  name="brand"
                  label={t('account:car.brand.label')}
                  required={t('account:car.brand.required') as string}
                />

                <FieldInput
                  name="model"
                  label={t('account:car.model.label')}
                  required={t('account:car.model.required') as string}
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
              <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
                <FieldInput name="cylinder" label={t('account:car.cylinder')} />
                <FieldInput name="energy" label={t('account:car.energy')} />
              </Stack>
              <FieldImage64bit name="picture" label={t('account:car.picture')} />
            </Stack>
          </Box>
        </FormizStep>
      </PageContent>
    </Page>
  );
};
