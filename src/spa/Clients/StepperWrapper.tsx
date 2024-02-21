import { Box, Grid, Heading , Stack, StackProps } from "@chakra-ui/react";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";
import { FC } from "react";

interface StepperWrapperProps extends StackProps{ 
    title : string,
}
export const StepperWrapper : FC<StepperWrapperProps> = ({ title , children, ...rest }) => (
    <Stack {...rest}>
      {title && <Heading fontSize="md">{title}</Heading>}
      <Box bg="gray.50" p="4" borderRadius="md">
        <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
          <Box>
            <PreviousButton />
          </Box>
          {children}
          <Box textAlign="right">
            <NextButton />
          </Box>
        </Grid>
      </Box>
    </Stack>
  );