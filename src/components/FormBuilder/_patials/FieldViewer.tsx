import { FC, useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useFormBuilderContext } from '../FormBuilderContext';
import { FieldFormViewer } from './FieldFormViewer';
import { DefaultInput } from '@/spa/defaultCategories/defaultInput/DefaultInputs.type';

interface FieldViewerProps {
  subCategoryId?: number | string,
  getDetails: TODO,
  defaultInputList?: DefaultInput[],
  changeDisplayStatus: TODO,
  updateInput: TODO,
  deleteInput: TODO,
  isUpdateInputLoading: boolean,
  isDeleteInputLoading: boolean,
  decrementOrder: TODO,
  incrementOrder: TODO,
  isDecrementInputLoading: boolean,
  isIncrementInputLoading: boolean,
}

export const FieldViewer: FC<FieldViewerProps> = ({
  getDetails,
  subCategoryId,
  isIncrementInputLoading,
  isDecrementInputLoading,
  incrementOrder,
  decrementOrder,
  defaultInputList,
  changeDisplayStatus,
  updateInput,
  deleteInput,
  isUpdateInputLoading,
  isDeleteInputLoading,
}) => {
  const { inputs, updateInputs } = useFormBuilderContext();
  const form = useForm();
  useEffect(() => {
    if (defaultInputList) {
      updateInputs(defaultInputList);
    }
  }, [defaultInputList,updateInputs]);

  return (
    <Stack borderRadius={6} bg="gray.50" boxShadow="md" p="4">
      <Formiz connect={form} autoForm>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          overflowY: 'auto',
          maxHeight: '300px',
        }}>
          {inputs?.filter(input => input.principalImage).map(({ id, inputType, inputName, inputValue, display, principalImage, ...rest }, index) => (
            <FieldFormViewer
              key={id}
              subCategoryId={subCategoryId}
              getDetails={getDetails}
              changeDisplayStatus={changeDisplayStatus}
              deleteInput={deleteInput}
              incrementOrder={incrementOrder}
              isDecrementInputLoading={isDecrementInputLoading}
              isDeleteInputLoading={isDeleteInputLoading}
              isIncrementInputLoading={isIncrementInputLoading}
              isUpdateInputLoading={isUpdateInputLoading}
              updateInput={updateInput}
              id={id}
              type={inputType}
              name={inputName}
              value={inputValue}
              isDisplayed={display}
              principalImage={principalImage}
              style={{
                flex: '0 0 33.333%',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
              {...rest}
            />
          ))}
        </div>
        {inputs?.filter(input => !input.principalImage).map(({ id, inputType, inputName, inputValue, display, principalImage, ...rest }, index) => (
          <FieldFormViewer
            key={index}
            getDetails={getDetails}
            principalImage={principalImage}
            changeDisplayStatus={changeDisplayStatus}
            decrementOrder={decrementOrder}
            deleteInput={deleteInput}
            incrementOrder={incrementOrder}
            isDecrementInputLoading={isDecrementInputLoading}
            isDeleteInputLoading={isDeleteInputLoading}
            isIncrementInputLoading={isIncrementInputLoading}
            isUpdateInputLoading={isUpdateInputLoading}
            updateInput={updateInput}
            id={id}
            type={inputType}
            name={inputName}
            value={inputValue}
            isDisplayed={display}
            {...rest}
          />
        ))}
      </Formiz>

    </Stack>
  );
};
