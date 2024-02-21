import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react"
import { Page, PageContent, PageTopBar } from "../layout"
import { useNavigate } from "react-router-dom";

export const PageHistoryFolder = () => {
    const navigate = useNavigate();
    return (
        <Page containerSize="md">
            <PageContent>
                <PageTopBar w={"full"} m="1" showBack onBack={() => navigate(-1)}>
                    <Text as='b' fontSize='lg'>Historique</Text>
                </PageTopBar>
                <PageContent>
                    <Flex flexDirection={{ base: 'column', md: 'row' }}>
                        <Box flexDirection='column' m={3}>
                            <Card boxShadow='lg' p={2} rounded='md' bg='white'>
                                <CardBody>
                                    <Text>View a summary of all your customers over the last month.</Text>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box m={3}>
                            <Card boxShadow='lg' p={2} rounded='md' bg='white'>
                                <CardBody>
                                    <Text>View a summary of all your customers over the last month.</Text>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box m={3}>
                            <Card boxShadow='lg' p={2} rounded='md' bg='white'>
                                <CardBody>
                                    <Text>View a summary of all your customers over the last month.</Text>
                                </CardBody>
                            </Card>
                        </Box>
                    </Flex>
                </PageContent >
            </PageContent >
        </Page>
    )
}