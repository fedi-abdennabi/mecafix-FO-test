import { DefaultInput } from '@/spa/defaultCategories/defaultInput/DefaultInputs.type';
import { createContext, useCallback, useContext, useState } from 'react';

type FormBuilderContextValue = {
  inputs: TODO[];
  updateInputs(inputs: DefaultInput[]): void;
};

const FormBuilderContext = createContext<FormBuilderContextValue>(null as TODO);

export const useFormBuilderContext = () => useContext(FormBuilderContext);

export const FormBuilderProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {

  const [inputs, setInputs] = useState<DefaultInput[]>([]);

  const handleUpdateInputs = useCallback(
    (newInputs: DefaultInput[]) => {
      setInputs(newInputs);
    },
    [setInputs]
  );

  return (
    <FormBuilderContext.Provider
      value={{
        inputs,
        updateInputs: handleUpdateInputs,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};