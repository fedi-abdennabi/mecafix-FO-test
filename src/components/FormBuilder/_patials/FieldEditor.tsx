import { Button, Flex, Stack } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { Formiz, useForm } from '@formiz/core';

import { FieldBooleanCheckbox } from '@/components/FieldBooleanCheckbox';
import { FieldHidden } from '@/components/FieldHidden';
import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';

import { useFormBuilderContext } from '../FormBuilderContext';
import { FieldSelector } from '../fieldSelector';
import { FieldPropsSelector } from './FieldPropsSelector';
import { FC, useState } from 'react';
import ScrollToFirstError from '@/components/ScrollToFirstError';
import { useTranslation } from 'react-i18next';

interface FieldEditorProps {
  createInputLoading: TODO,
  createInput: TODO
}

export const FieldEditor: FC<FieldEditorProps> = ({ createInput, createInputLoading }) => {
  const { inputs, updateInputs } = useFormBuilderContext();
  const [invalidForm, setInvalidForm] = useState(false);
  const { t } = useTranslation(['formBuilder']);
  const form = useForm();

  const fieldMappings: { [key: string]: { label: string; icon: string } } = {
    FieldInput: { label: t('formBuilder:Input'), icon: 'icon-input' },
    FieldSelect: { label: t('formBuilder:Select'), icon: 'icon-select' },
    FieldCheckboxes: { label: t('formBuilder:Checkboxes'), icon: 'icon-checkboxes' },
    FieldImage64bit: { label: t('formBuilder:Image'), icon: 'icon-image' },
    FieldRadios: { label: t('formBuilder:RadioButtons'), icon: 'icon-radio' },
    FieldTextarea: { label: t('formBuilder:Textarea'), icon: 'icon-textarea' },
    FieldDayPicker: { label: t('formBuilder:DatePicker'), icon: 'icon-date' },
    FieldEditor: { label: t('formBuilder:TextEditor'), icon: 'icon-editor' },
    FieldVideo: { label: t('formBuilder:Video'), icon: 'icon-editor' }
  };

  const {
    values: { type },
  } = form;

  const componentOptions = Object.keys(FieldSelector).map((key) => ({
    label: fieldMappings[key]?.label,
    value: key,
  }));

  const addNewField = (values: TODO) => {
    updateInputs([...inputs, values]);
  };

  const submitCreateDefaultInput = async (values: TODO) => {
    const newDefaultInput = {
      inputName: values.name,
      inputType: values.type,
      inputValue: null,
      ...values
    };
    await createInput(newDefaultInput);
    addNewField(values);
    form.reset();
  }

  return (
    <Flex
      minW={{ base: 'full', md: '25%' }}
      p="4"
      borderRadius={6}
      bg="gray.50"
      boxShadow="md"
    >
      <Formiz connect={form} id="form" onValidSubmit={submitCreateDefaultInput}>
        <form noValidate onSubmit={form.submit}>
          <Stack spacing="2" alignItems="flex-start">
            <FieldHidden name="id" defaultValue={faker.datatype.uuid()} />
            <FieldSelect
              label={t('formBuilder:Components')}
              selectProps={{ size: 'sm' }}
              name="type"
              options={componentOptions}
              required
            />
            <FieldInput size="sm" name="inputName" label={t('formBuilder:Name')} required />
            <FieldInput size="sm" name="label" label={t('formBuilder:Label')} required />
            <FieldBooleanCheckbox
              name="display"
              label={t('formBuilder:Display')}
              helper={t('formBuilder:HelperDisplay')}
            />
            {(type == "FieldImage64bit" || type == "FieldVideo") && <FieldBooleanCheckbox
              name="principalImage"
              label={t('formBuilder:principalImage')}
              helper={t('formBuilder:HelperImage')}
            />}
            <FieldInput
              size="sm"
              name="helper"
              label={t('formBuilder:Helper')}
              helper={t('formBuilder:HelperMessage')}
            />
            {!!type && <FieldPropsSelector type={type} />}
            <Button
              type="submit"
              variant="@primary"
              isLoading={createInputLoading}
              onClick={() => {
                setInvalidForm(true);
                setTimeout(() => {
                  setInvalidForm(false);
                }, 100);
              }} >{t('formBuilder:Add')}</Button>
            {invalidForm && <ScrollToFirstError />}
          </Stack>
        </form>
      </Formiz>
    </Flex>
  );
};
