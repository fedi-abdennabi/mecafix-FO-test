import { Button, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Spinner, Stack, Table, TableContainer, Tbody, Td, Th, Tr, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Formiz, useForm } from "@formiz/core";
import { FieldInput } from "@/components/FieldInput";
import { Icon } from "@/components/Icons";
import { useToastError } from "@/components/Toast";

interface fieldOptionsFormProps {
  setIsOpenOptions: TODO,
  updateInput: TODO,
  getDetails: TODO,
  isUpdatedInputLoading: boolean,
  id: number,
  isOpenOptionsForm: boolean,
}

const FieldOptionsForm: FC<fieldOptionsFormProps> = ({ isOpenOptionsForm, getDetails, id, isUpdatedInputLoading, setIsOpenOptions, updateInput }) => {
  const { t } = useTranslation(['common', 'formBuilder']);
  const toastError = useToastError();
  const formOptions = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formEditOption = useForm();
  const form = useForm();
  const { data: detailsInput, isLoading: isDetailsInput } = getDetails(id);

  const [options, setOptions] = useState<{ label: string; value: string }[]>(detailsInput?.options || []);

  useEffect(() => {
    if (detailsInput && detailsInput.options) {
      setOptions(detailsInput.options);
    }
  }, [detailsInput]);

  const {
    values: { type },
  } = form;

  const onAddOption = () => {
    const optionExists = options.some(option =>
      option.label === formOptions.values.label || option.value === formOptions.values.value
    );

    if (optionExists) {
      toastError({
        title: t('formBuilder:optionErrorMessage'),
      });
    } else {
      setOptions([...options, formOptions.values]);
    }
  };

  const onEditOption = (index: number) => {
    if (index !== null) {
      const updatedOptions = [...options];
      updatedOptions[index] = formEditOption.values;
      setOptions(updatedOptions);
    }
    onClose();
  };

  const submitCreateDefaultInput = (values: TODO) => {
    values.options = options;
    updateInput(id, values);
    setIsOpenOptions(false);
  }

  if (isDetailsInput && !isOpenOptionsForm) {
    return <Spinner />;
  }
  return (
    <>
      {(!isDetailsInput && isOpenOptionsForm)
        &&
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Formiz connect={form} id="form" onValidSubmit={submitCreateDefaultInput}>
              <form noValidate onSubmit={form.submit}>
                <ModalHeader>{t('common:Inputs.Update')}</ModalHeader>
                <ModalBody pb={6}>
                  <FieldInput mt={2} size="sm" name="name" label={t('common:Inputs.Name')} placeholder={t('common:Inputs.PlaceHolder')} required defaultValue={detailsInput?.inputName} />
                  <FieldInput mt={2} size="sm" name="label" label={t('common:Inputs.Label')} placeholder={t('common:Inputs.Label')} required defaultValue={detailsInput?.label} />
                  <FieldInput
                    size="sm"
                    name="helper"
                    label={t('formBuilder:Helper')}
                    helper={t('formBuilder:HelperMessage')}
                    defaultValue={detailsInput?.helper}
                  />
                  <Popover placement="right-end" >
                    <PopoverTrigger>
                      <Stack justifyContent={"flex-end"} direction={"row"}>
                        <Button my={3} size={'sm'}  >Add options</Button>
                      </Stack>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Formiz
                          connect={formOptions}
                          id="FormOfOptions"
                          autoForm
                          onValidSubmit={onAddOption}
                        >
                          <Stack spacing="2" alignItems="flex-start">
                            <Stack spacing="2">
                              <FieldInput size="sm" name="label" label={t('common:Inputs.Label')} required />
                              <FieldInput size="sm" name="value" label={t('common:Inputs.Value')} required />
                            </Stack>

                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                !!formOptions.isValid && onAddOption();
                              }}
                              type="submit"
                            >
                              {t('common:Inputs.Save')}
                            </Button>
                          </Stack>
                        </Formiz>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>

                  <TableContainer>
                    <Table variant="simple">
                      <Tbody>
                        {!!options?.length && (
                          <Tr>
                            <Th>{t('common:Inputs.Key')}</Th>
                            <Th>{t('common:Inputs.Value')}</Th>
                            <Th>{t('common:Inputs.Actions')}</Th>
                          </Tr>
                        )}
                        {options?.map((option: TODO, index: number) => (
                          <Tr key={index}>
                            <Td>{option.value}</Td>
                            <Td>{option.label}</Td>
                            <Td>

                              <IconButton
                                aria-label="close"
                                colorScheme="error"
                                icon={<Icon icon={FiTrash2} />}
                                onClick={() => {
                                  setOptions(
                                    options.filter(
                                      (item: TODO, i: number) => i !== index
                                    ),
                                  );
                                }}
                                size="xs"
                              />
                              <Popover isOpen={isOpen} onClose={onClose} placement="right-end" >
                                <PopoverTrigger>
                                  <IconButton
                                    onClick={onOpen}
                                    aria-label="close"
                                    size="xs"
                                    ml={3}
                                    colorScheme="success"
                                    icon={<Icon icon={FiEdit} />}
                                  />
                                </PopoverTrigger>
                                <PopoverContent>
                                  <PopoverArrow />
                                  <PopoverCloseButton />
                                  <PopoverBody>
                                    <Formiz
                                      connect={formEditOption}
                                      id="FormOfEditOptions"
                                      autoForm
                                      onValidSubmit={() => onEditOption(index)}
                                    >
                                      <Stack spacing="2" alignItems="flex-start">
                                        <Stack spacing="2">
                                          <FieldInput size="sm" name="label" label={t('common:Inputs.Label')} required defaultValue={option?.label} />
                                          <FieldInput size="sm" name="value" label={t('common:Inputs.Value')} required defaultValue={option?.value} />
                                        </Stack>

                                        <Button
                                          size={'sm'}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            !!formEditOption.isValid && onEditOption(index);
                                          }
                                          }
                                          type='submit'
                                        >
                                          {t('common:Inputs.Save')}
                                        </Button>
                                      </Stack>
                                    </Formiz>
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme='blue'
                    mr={3}
                    type="submit"
                    isLoading={isUpdatedInputLoading}
                  >
                    {t('common:Inputs.Save')}
                  </Button>
                  <Button onClick={() => setIsOpenOptions(false)} >{t('common:Inputs.Cancel')}</Button>
                </ModalFooter>
              </form>
            </Formiz>
          </ModalContent>
        </Modal >}
    </>
  )

}

export default FieldOptionsForm;
