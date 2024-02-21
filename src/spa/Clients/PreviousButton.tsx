import { Box, Button, ButtonProps } from "@chakra-ui/react";
import { useForm } from "@formiz/core";
import { FC } from "react";

export const PreviousButton : FC<ButtonProps> = (props) => {
    const form = useForm({ subscribe: 'form' });
  
    if (form.isFirstStep) {
      return <Box />;
    }
  
    return (
      <Button size="sm" onClick={form.prevStep} variant="ghost" color="gray.800" {...props}>
        Previous
      </Button>
    );
  };
  