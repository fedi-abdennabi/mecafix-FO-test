import React, { useContext } from 'react';

import {
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Stack,
  useTheme,
} from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import useMeasure from 'react-use-measure';

import { useRtl } from '@/hooks/useRtl';
import { useFocusMode, useLayoutContext } from '@/spa/layout';

type PageContextValue = {
  nav: React.ReactNode;
  hideContainer: boolean;
  containerSize: keyof typeof containerSizes;
};

const PageContext = React.createContext<PageContextValue>({ nav: null, hideContainer: false, containerSize: "md", });

const containerSizes = {
  sm: '60ch',
  md: '80ch',
  lg: '100ch',
  xl: '140ch',
  full: '100%',
} as const;

const PageContainer = ({ children, ...rest }: FlexProps) => {
  const context = useContext(PageContext);

  // Assurez-vous que le contexte n'est pas nul avant de déstructurer
  if (!context) {
    console.error('PageContainer doit être utilisé à lintérieur dun PageContext.Provider');
    return null;
  }
  const { hideContainer, containerSize } = context;

  //   const { hideContainer, containerSize } = context;

  // const PageContainer = ({ children, ...rest }: FlexProps) => {
  //   const { hideContainer, containerSize } = useContext(PageContext);

  if (hideContainer) return <>{children}</>;

  return (
    <Flex
      direction="column"
      flex="1"
      w="full"
      px="6"
      mx="auto"
      maxW={containerSizes[containerSize]}
      {...rest}
    >
      {children}
    </Flex>
  );
};

type PageTopBarProps = FlexProps & {
  onBack?(): void;
  showBack?: boolean;
  isFixed?: boolean;
};

export const PageTopBar = ({
  children,
  onBack = () => undefined,
  showBack = false,
  isFixed = false,
  ...rest
}: PageTopBarProps) => {
  const { isFocusMode } = useLayoutContext();
  const theme = useTheme();
  const [ref, { height }] = useMeasure();

  const { rtlValue } = useRtl();

  return (
    <>
      {isFixed && <Box h={`${height}px`} />}
      <Flex
        // zIndex="2"
        direction="column"
        pt="4"
        pb="4"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.05)"
        bg="white"
        ref={ref}
        _dark={{ bg: 'gray.900' }}
        {...(isFixed
          ? {
            top: !isFocusMode ? theme.layout.topBar.height : '0',
            position: 'fixed',
            right: '0',
            left: '0',
          }
          : {})}
        {...rest}
      >
        <Box w="full" h="0" pb="safe-top" />
        <PageContainer>
          <HStack spacing="4">
            {showBack && (
              <Box ms={0}>
                <IconButton
                  aria-label="Go Back"
                  icon={rtlValue(<FiArrowLeft />, <FiArrowRight />)}
                  variant="ghost"
                  onClick={() => onBack()}
                />
              </Box>
            )}
            <Box flex="1">{children}</Box>
          </HStack>
        </PageContainer>
      </Flex>
    </>
  );
};

type PageContentProps = FlexProps & {
  onBack?(): void;
  showBack?: boolean;
};

export const PageContent = ({ children, ...rest }: PageContentProps) => {
  const { nav } = useContext(PageContext);
  return (
    <Flex zIndex="1" direction="column" flex="1" py="4" {...rest}>
      <PageContainer>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '4', lg: '8' }}
          flex="1"
        >
          {nav && (
            <Flex direction="column" minW="0" w={{ base: 'full', lg: '12rem' }}>
              {nav}
            </Flex>
          )}
          <Flex direction="column" flex="1" minW="0">
            {children}
          </Flex>
        </Stack>
      </PageContainer>
      <Box w="full" h="0" pb="safe-bottom" />
    </Flex>
  );
};

export const PageBottomBar = ({ children, ...rest }: FlexProps) => {
  const [ref, { height }] = useMeasure();

  return (
    <>
      <Box h={`${height}px`} />
      <Flex
        zIndex="3"
        ref={ref}
        direction="column"
        mt="auto"
        position="fixed"
        bottom="0"
        insetStart="0"
        insetEnd="0"
        py="2"
        boxShadow="0 -4px 20px rgba(0, 0, 0, 0.05)"
        bg="white"
        _dark={{ bg: 'gray.900' }}
        {...rest}
      >
        <PageContainer>{children}</PageContainer>
        <Box w="full" h="0" pb="safe-bottom" />
      </Flex>
    </>
  );
};

type PageProps = FlexProps & {
  isFocusMode?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideContainer?: boolean;
  nav?: React.ReactNode;
};

export const Page = ({
  isFocusMode = false,
  hideContainer = false,
  containerSize = 'md',
  nav = null,
  ...rest
}: PageProps) => {
  useFocusMode(isFocusMode);
  return (
    <PageContext.Provider
      value={{
        nav,
        hideContainer,
        containerSize,
      }}
    >
      <Flex direction="column" flex="1" position="relative" {...rest} />
    </PageContext.Provider>
  );
};
