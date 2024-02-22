import { Box, Button, Card, CardBody, CardFooter, Flex, Spacer, Text } from "@chakra-ui/react"
import { Page, PageContent, PageTopBar } from "../layout"
import { useNavigate, useParams, } from "react-router-dom";
import axios from "axios";
import { Folder } from "./folder.type";
import { useEffect, useState } from "react";

export const PageHistoryFolder = () => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const handleChange = () => {
        setIsContentVisible(!isContentVisible);
        setIsOpenForm(false);
    }
    const params = useParams();
    const folderId = params.folderId;
    const navigate = useNavigate();
    const [folder, setFolder] = useState<Folder>();
    const [refetchTrigger, setRefetchTrigger] = useState(0);
    const fetchFolderData = async () => {
        try {
            const response = await axios.get<Folder>(`admin/folder/${folderId}`);
            console.log("response - - - - ", response)
            setFolder(response);
        } catch (error) {
            console.error('Error fetching folder data:', error);
        }
    };
    useEffect(() => {
        fetchFolderData();
    }, [refetchTrigger, folderId]);

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <Page containerSize="md">
            <PageContent>
                <PageTopBar w={"full"} m="1" showBack onBack={() => navigate(-1)}>
                    <Text as='b' fontSize='lg'>Historique</Text>
                </PageTopBar>
                <PageContent>
                    <Flex direction={{ base: "column", sm: "row" }} justifyContent={"space-between"} pt={5}>
                        <Box>
                            <Text fontWeight={"bold"}> Contract n° {folder?.id}</Text>
                            <Text> {folder?.clients.firstName + ' ' + folder?.clients.lastName}</Text>
                        </Box>
                        <Box>
                            <Text>{folder?.updated_at ? formatDate(folder.created_at) : ''}</Text>
                            <Text> {folder?.car.immatriculation}</Text>
                            <Text> {folder?.car.mileage} km</Text>
                        </Box>
                    </Flex>
                    <Spacer />
                    <Flex alignItems={"center"} justifyContent={"center"}>
                        <Button colorScheme="blue"> Go to last diagnosis</Button>
                    </Flex>
                    <Spacer />
                    <Flex>
                        <Text> Statut: {folder?.statusValue}</Text>
                    </Flex>
                    <Spacer />
                    <Flex flexDirection={{ base: 'column', md: 'row' }}>
                        {folder?.category?.map((category) => (
                            <Box flexDirection='column' m={3} key={category.id.toString()}>
                                <Card boxShadow='lg' p={2} rounded='md' bg='white' onClick={() => navigate(`./diagnosis`)} cursor={"pointer"}>
                                    <CardBody onClick={() => handleChange()}>
                                        {category.categoryName}
                                    </CardBody>
                                    <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%' }}>
                                        <Text>1/2</Text>
                                    </CardFooter>
                                </Card>
                            </Box>
                        ))}
                    </Flex>
                </PageContent >
            </PageContent >
        </Page>
    )
}