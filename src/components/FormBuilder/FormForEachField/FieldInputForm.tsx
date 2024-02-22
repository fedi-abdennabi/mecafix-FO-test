import React from 'react';
import { FieldInput } from "@/components/FieldInput";
import { Button, Checkbox, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { Formiz, useForm } from "@formiz/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface fieldInputFormProps {
  setIsOpenInputForm: TODO,
  updateInput: TODO,
  isUpdatedInput: boolean,
  id: number,
  getDetails: TODO,
  isOpenInputForm: boolean,
}

const FieldInputForm: FC<fieldInputFormProps> = ({ getDetails, isOpenInputForm, id, setIsOpenInputForm, isUpdatedInput, updateInput }) => {
  const { t } = useTranslation(['common', 'formBuilder']);
  const { onClose } = useDisclosure();
  const form = useForm();
  const [principalImage, setIsPrincipalImage] = React.useState<boolean>();
  const { data: detailsInput, isLoading: isDetailsInput } = getDetails(id);
  console.log("Nchlh takhdem : ", detailsInput);
  const submitCreateDefaultInput = (values: TODO) => {
    updateInput(id, { ...values, principalImage });
    setIsOpenInputForm(false);
  }
  const {
    values: { type },
  } = form;

  if (isDetailsInput && !isOpenInputForm) {
    return <Spinner />;
  }

  return (
    <>
      {(!isDetailsInput && isOpenInputForm) &&
        <Modal isOpen={true} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <Formiz connect={form} id="form" onValidSubmit={submitCreateDefaultInput}>
              <form noValidate onSubmit={form.submit}>
                <ModalHeader>{t('common:Inputs.Update')}</ModalHeader>
                <ModalBody pb={6}>
                  <FormControl>
                    <FieldInput mt={2} size="sm" name="name" label={t('common:Inputs.Name')} placeholder={t('common:Inputs.PlaceHolder')} required defaultValue={detailsInput?.inputName} />
                    <FieldInput mt={2} size="sm" name="label" label={t('common:Inputs.Label')} placeholder={t('common:Inputs.Label')} required defaultValue={detailsInput?.label} />
                    <FieldInput
                      mt={2}
                      size="sm"
                      name="helper"
                      label={t('formBuilder:Helper')}
                      helper={t('formBuilder:HelperMessage')}
                      defaultValue={detailsInput?.helper}
                    />
                    {detailsInput?.inputType == "FieldImage64bit" &&
                      <Checkbox
                        mt={2}
                        name="principalImage"
                        defaultChecked={detailsInput?.principalImage}
                        onChange={() => setIsPrincipalImage(!(detailsInput?.principalImage))}
                      >{t('formBuilder:principalImage')}</Checkbox>}
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button isLoading={isUpdatedInput} type="submit" colorScheme='blue' mr={3}>
                    {t('common:Inputs.Save')}
                  </Button>
                  <Button onClick={() => setIsOpenInputForm(false)} >{t('common:Inputs.Cancel')}</Button>
                </ModalFooter>
              </form>
            </Formiz>
          </ModalContent>
        </Modal>}
    </>
  )
}
export default FieldInputForm;
