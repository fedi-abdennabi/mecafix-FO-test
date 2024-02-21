import { FC, useState } from 'react';

import { Button, Stack } from '@chakra-ui/react';

import { FormBuilderProvider } from './FormBuilderContext';
import { FieldEditor } from './_patials/FieldEditor';
import { FieldViewer } from './_patials/FieldViewer';
import { useAccount } from '@/spa/account/account.service';
import { DefaultInput } from '@/spa/defaultCategories/defaultInput/DefaultInputs.type';

interface FormBuilderProps {
  subCategoryId?:number|string,
  getDetails: TODO,
  createInput?: TODO,
  createInputLoading?: boolean,
  defaultInputList?: DefaultInput[],
  changeDisplayStatus?: TODO,
  incrementOrder?: TODO,
  decrementOrder?: TODO,
  deleteInput?: TODO,
  updateInput?: TODO,
  isUpdateInputLoading?: TODO,
  isIncrementInputLoading?: TODO,
  isDecrementInputLoading?: TODO,
  isDeleteInputLoading?: TODO,
  isChangeDisplayStatus?: boolean,
}

export const FormBuilder: FC<FormBuilderProps> = ({
  subCategoryId,
  decrementOrder,
  incrementOrder,
  getDetails,
  isDecrementInputLoading,
  isIncrementInputLoading,
  isUpdateInputLoading,
  deleteInput,
  updateInput,
  isDeleteInputLoading,
  createInput,
  createInputLoading,
  defaultInputList,
  changeDisplayStatus,
  
}) => {

  const account = useAccount();
  const [isDisplayFormEditor, setIsDisplayFormEditor] = useState(false);
  const isAdmin = account.account?.role.roleName === "admin";

  return (
    <FormBuilderProvider>
      <Stack
        spacing="8"
        direction="row"
        w="full"
        bg="gray.100"
        p="4"
        borderRadius="8"
        boxShadow="md"
      >
        {((isAdmin && isDisplayFormEditor) || !isAdmin) && <Stack flex="4">
          <FieldEditor createInput={createInput} createInputLoading={createInputLoading} />
        </Stack>}
        <Stack flex={(isAdmin && !isDisplayFormEditor) ? "12" : "8"}>
          <FieldViewer
            subCategoryId={subCategoryId}
            getDetails={getDetails}
            isIncrementInputLoading={isIncrementInputLoading}
            isDecrementInputLoading={isDecrementInputLoading}
            incrementOrder={incrementOrder} decrementOrder={decrementOrder}
            isUpdateInputLoading={isUpdateInputLoading}
            isDeleteInputLoading={isDeleteInputLoading}
            changeDisplayStatus={changeDisplayStatus}
            deleteInput={deleteInput}
            updateInput={updateInput}
            defaultInputList={defaultInputList}
          />
        </Stack>
      </Stack>
      {isAdmin && <Button color={"green"} onClick={() => setIsDisplayFormEditor(!isDisplayFormEditor)}>Edit the form</Button>}
    </FormBuilderProvider>
  );
};
