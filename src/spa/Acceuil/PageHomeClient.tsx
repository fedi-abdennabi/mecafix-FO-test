import {
    Button,
    Flex,
    Heading,
    Stack
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { HiUserAdd } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Page, PageContent } from "../layout";

const PageHomeClient = () => {
    const { t } = useTranslation(['mainMenu', 'filter']);
    const navigate = useNavigate();


    return (
        <Page containerSize="full">
            <PageContent>
                <Stack>
                    <Flex>
                        <Heading size='md' fontSize='25px' pl={"12px"} pt={"10px"}>
                            {t('mainMenu:Hello')},
                        </Heading>
                    </Flex>
                    <Flex>
                        <Button onClick={() => navigate("./addClient")} colorScheme='blue' ml={"12px"} mr={"12px"} w={"200px"} h={"100px"} mt={"10px"} >
                            <HiUserAdd size={"50px"} />
                        </Button>
                    </Flex>
                </Stack>
            </PageContent>
        </Page>
    )
}
export default PageHomeClient; 
