import { Box, Grid, Heading , Stack, StackProps } from "@chakra-ui/react";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";
import { FC } from "react";

interface StepperWrapperProps extends StackProps{ 
    title : string,
}
export const StepperWrapper: FC<StepperWrapperProps> = ({ title, children, ...rest }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Stack {...rest}>
      {title && <Heading fontSize="md">{title}</Heading>}
      <Box bg="gray.50" p="4" borderRadius="md">
        <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
          <Box>
            <PreviousButton />
          </Box>
          {children}
          <Box textAlign="right">
            <NextButton onClick={scrollToTop} />
          </Box>
        </Grid>
      </Box>
    </Stack>
  );
};