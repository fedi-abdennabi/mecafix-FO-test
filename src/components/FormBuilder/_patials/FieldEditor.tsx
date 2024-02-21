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

interface FieldEditorProps{
  createInputLoading:TODO ,
  createInput:TODO
}

export const FieldEditor :FC<FieldEditorProps> = ({ createInput,createInputLoading }) => {
  const { inputs, updateInputs } = useFormBuilderContext();
  const [invalidForm, setInvalidForm] = useState(false);
  const form = useForm();

  const fieldMappings: { [key: string]: { label: string; icon: string } } = {
    FieldInput: { label: 'Input', icon: 'icon-input' },
    FieldSelect: { label: 'Select', icon: 'icon-select' },
    FieldCheckboxes: { label: 'Checkboxes', icon: 'icon-checkboxes' },
    FieldImage64bit: { label: 'Image Upload', icon: 'icon-image' },
    FieldRadios: { label: 'Radio Buttons', icon: 'icon-radio' },
    FieldTextarea: { label: 'Textarea', icon: 'icon-textarea' },
    FieldDayPicker: { label: 'Date Picker', icon: 'icon-date' },
    FieldEditor: { label: 'Text Editor', icon: 'icon-editor' },
    FieldVideo: { label: 'Video', icon: 'icon-editor' }
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
              label="Components"
              selectProps={{ size: 'sm' }}
              name="type"
              options={componentOptions}
              required
            />
            <FieldInput size="sm" name="name" label="Name" required />
            <FieldInput size="sm" name="label" label="Label" required />
            <FieldBooleanCheckbox
              name="display"
              label="Display"
              helper="to specify if this field is display to the client or not"
            />
            {(type == "FieldImage64bit" || type == "FieldVideo") && <FieldBooleanCheckbox
              name="principalImage"
              label="principal Image"
              helper="to specify if this image is principal or not "
            />}
            <FieldInput
              size="sm"
              name="helper"
              label="Helper"
              helper="Small text will show under the field exactly like this text."
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
              }} >add</Button>
            {invalidForm && <ScrollToFirstError />}
          </Stack>
        </form>
      </Formiz>
    </Flex>
  );
};
