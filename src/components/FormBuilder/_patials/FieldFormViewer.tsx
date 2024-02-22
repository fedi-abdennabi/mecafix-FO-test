import { FC, useState } from 'react';

import { Box, Button, IconButton, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react';
import { FiArrowDown, FiArrowUp, FiEdit, FiEye, FiEyeOff, FiTrash } from 'react-icons/fi';

import { Icon } from '@/components/Icons';
import { InputType } from '@/types/formBuilder';

import { FieldSelector } from '../fieldSelector';
import FieldInputForm from '../FormForEachField/FieldInputForm';
import FieldOptionsForm from '../FormForEachField/FieldOptionsForm';
import { DefaultInput } from '@/spa/defaultCategories/defaultInput/DefaultInputs.type';
import { useTranslation } from 'react-i18next';

interface FieldFormViewerProps {
  type: InputType,
  subCategoryId?:number|string,
  name: string;
  isDisplayed: boolean;
  id: number;
  value: string;
  principalImage?: boolean,
  decrementOrder?: TODO,
  incrementOrder: TODO,
  changeDisplayStatus: TODO,
  updateInput: TODO,
  deleteInput: TODO,
  isIncrementInputLoading: boolean,
  isDecrementInputLoading: boolean,
  isUpdateInputLoading: boolean,
  isDeleteInputLoading: boolean,
  detailsInput: DefaultInput,
  isDetailsInput: boolean,
  getDetails: TODO,

}

export const FieldFormViewer: FC<FieldFormViewerProps> = ({
  type,
  name,
  getDetails,
  id,
  value,
  isDisplayed,
  principalImage,
  decrementOrder,
  incrementOrder,
  changeDisplayStatus,
  deleteInput,
  updateInput,
  isDeleteInputLoading,
  isUpdateInputLoading,
  ...rest
}) => {

  const RenderInput = FieldSelector[type as keyof typeof FieldSelector];
  const [isValueChange, setIsValueChange] = useState(false);
  const [isOpenInputForm, setIsOpenInputForm] = useState(false);
  const [isOpenOptionsForm, setIsOpenOptions] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState(value);
  const {t}=useTranslation(['formBuilder']);
  const leftValue = !principalImage ? { base: "55%", sm: "55%", md: "55%", lg: "67%", xl: "73%" } : "85%";

  const handleInputChange = (e: TODO) => {
    setCurrentInputValue(e);
    setIsValueChange(true);
  }

  const saveFieldValue = async () => {
    updateInput(id,{ inputValue: currentInputValue });
    setIsValueChange(false);
  }

  const handleDisplayStatus = () => {
    changeDisplayStatus(id);
  }

  const handleIncrementOrder = () => {
    incrementOrder(id);
  };

  const handleDecrementOrder = () => {
    decrementOrder(id);
  };

  const removeInput = () => {
    deleteInput(id);
  };

  const handleEditForm = () => {
    (type == "FieldRadios" || type == "FieldSelect" || type == "FieldCheckboxes") ? setIsOpenOptions(true) : setIsOpenInputForm(true);
  }
  return (
    <>
      {isOpenInputForm && <FieldInputForm isOpenInputForm={isOpenInputForm} getDetails={getDetails} id={id}  isUpdatedInput={isUpdateInputLoading} updateInput={updateInput} setIsOpenInputForm={setIsOpenInputForm} />}
      {isOpenOptionsForm && <FieldOptionsForm isOpenOptionsForm={isOpenOptionsForm} getDetails={getDetails} id={id}  isUpdatedInputLoading={isUpdateInputLoading} updateInput={updateInput} setIsOpenOptions={setIsOpenOptions} />}
      <Box position="relative" pb={'4'} >
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="remove"
              icon={<Icon icon={FiTrash} />}
              position="absolute"
              top="0"
              left={{ base: "85%", sm: "85%", md: "85%", lg: "91%", xl: "91%" }}
              zIndex={99}
              size="2"
            />
          </PopoverTrigger>
          <PopoverContent w='full'>
            <PopoverArrow />
            <PopoverCloseButton size={'sm'} />
            <Button onClick={removeInput} colorScheme='error' size={'xs'} mt={4} mx={2} isLoading={isDeleteInputLoading} >
              Click to confirm delete</Button>
          </PopoverContent>
        </Popover>

        <IconButton
          aria-label="edit"
          icon={<Icon icon={FiEdit} />}
          onClick={handleEditForm}
          position="absolute"
          top="0"
          left={{ base: "95%", sm: "95%", md: "95%", lg: "97%", xl: "97%" }}
          zIndex={99}
          size="2"
        />

        {!principalImage && <IconButton
          aria-label="orderDown"
          icon={<Icon icon={FiArrowDown} />}
          position="absolute"
          onClick={handleIncrementOrder}
          top="0"
          left={{ base: "75%", sm: "75%", md: "75%", lg: "85%", xl: "85%" }}
          zIndex={99}
          size="2"
        />}

        {!principalImage && <IconButton
          aria-label="orderDown"
          icon={ <Icon icon={FiArrowUp} />}
          position="absolute"
          onClick={handleDecrementOrder}
          top="0"
          left={{ base: "65%", sm: "65%", md: "65%", lg: "79%", xl: "79%" }}
          zIndex={99}
          size="2"
        />
        }

        <IconButton
          aria-label="display"
          icon={isDisplayed ? <Icon icon={FiEye} /> : <Icon icon={FiEyeOff} />}
          position="absolute"
          onClick={handleDisplayStatus}
          top="0"
          left={leftValue}
          zIndex={99}
          size="2"
        />

        {!!RenderInput && <RenderInput onClick={() => setIsValueChange(true)} onChange={handleInputChange} name={name} type={type} defaultValue={currentInputValue} {...rest} />}
        <Stack direction={'row'} justifyContent={'flex-end'}>
          {isValueChange && <Button onClick={() => setIsValueChange(false)} colorScheme='blackAlpha' size={'xs'} >{t('formBuilder:Cancel')}</Button>}
          {isValueChange && <Button onClick={() => saveFieldValue()} colorScheme='whatsapp' size={'xs'} px={'4'}>{t('formBuilder:Save')}</Button>}
        </Stack>
      </Box>
    </>

  );
};
