import { Button, ButtonProps } from "@chakra-ui/react";
import { useForm } from "@formiz/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const NextButton: FC<ButtonProps> = (props) => {
  const form = useForm({ subscribe: 'form' });
  const { t } = useTranslation(['car']);

  return (
    <Button
      type="submit"
      size="sm"
      colorScheme="brand"
      isDisabled={
        (form.isLastStep ? !form.isValid : !form.isStepValid)
        && form.isStepSubmitted
      }
      {...props}
    >
      {form.isLastStep ? 'Submit' : t('car:button.next') }
    </Button>
  );
};
