
import { useState } from 'react';
import { Box, Stack, Container, Link, Select } from '@chakra-ui/react';
import { Formiz } from "@formiz/core"
import { useTranslation } from 'react-i18next';
import { useClientList, useRecentClient } from '@/spa/Clients/clients.service';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { Form } from './form';
import { Clients } from '@/spa/Clients/client.type';

export const SelectClient = () => {
    const { clientList } = useClientList()
    const { recentClient } = useRecentClient()
    const [selectedClient, setSelectedClient] = useState<Clients>();
    const handleSelectChange = (event: TODO) => {
        const clientId = event.target.value;
        if (clientList) {
            const client = clientList.data.find(c => c.id.toString() === clientId);
            setSelectedClient(client);
        }
    };
    const { t } = useTranslation(['common', 'account']);
    const [isClient, setIsClient] = useState(false);

    const toggleClient = () => {
        setIsClient(!isClient);
    };

    return (
        <>
            <Formiz autoForm>
                <Box
                    p="6"
                    borderRadius="md"
                    boxShadow="md"
                    bg="white"
                    _dark={{ bg: 'blackAlpha.400' }}
                >
                    {isClient && (
                        <Container id='recent' display='flex' flexWrap='wrap'>
                            {recentClient?.map((clients) => (
                                <Box
                                    key={clients.id.toString()}
                                    as='button'
                                    display='flex' // Enables flexbox layout inside each Box
                                    alignItems='center'
                                    borderRadius='md'
                                    bg='gray.50'
                                    color='black'
                                    px={4}
                                    h={8}
                                    mr={2}
                                    mb={4}
                                >
                                    <HiOutlineUserAdd style={{ marginRight: '4px' }} />
                                    <span>{clients?.firstName + ' ' + clients?.lastName}</span>
                                </Box>
                            ))}
                        </Container>

                    )}
                    <Link color='blue.800' href='#' style={{ float: 'right' }} onClick={toggleClient}>
                        {isClient ? t('account:carte.close-recent') : t('account:carte.recent-client')}
                    </Link>
                    <Stack spacing="4" mt="8">
                        <Select
                            name="client"
                            placeholder="Select a client"
                            onChange={handleSelectChange}
                        >
                            {clientList?.data?.map((clients) => (
                                <option key={clients.id.toString()} value={clients.id.toString()}>
                                    {clients?.firstName + ' ' + clients?.lastName}
                                </option>
                            ))}
                        </Select>
                    </Stack>
                </Box>
            </Formiz>
            {selectedClient && <Form selectedClient={selectedClient} /> }
        </>

    )
}
