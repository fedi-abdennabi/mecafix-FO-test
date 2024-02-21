import { Card, CardBody, Stack, Heading, Text, HStack, Flex } from '@chakra-ui/react'
import { HiOutlineUserCircle, HiOutlineChevronRight, HiSortDescending } from "react-icons/hi";
import { Page, PageContent, PageTopBar } from "../layout";
import { useClientList } from '@/spa/Clients/clients.service';
import { useNavigate } from "react-router-dom";
import { SearchInput } from '@/components/SearchInput';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sort, SortValue } from '@/components/Sort';
import { Pagination, PaginationButtonFirstPage, PaginationButtonLastPage, PaginationButtonNextPage, PaginationButtonPrevPage, PaginationInfo } from '@/components/Pagination';

const PageClients = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState<string | undefined>('');
    const sortOptions = [
        { value: 'firstName', label: 'Prénom' },
        { value: 'lastName', label: 'Nom' },
        { value: 'created_at', label: 'date' },
    ];
    const [sort, setSort] = useState<SortValue>({
        by: 'created_at',
        order: 'desc',
    });

    const { clientList, isLoading: isClientLoading } = useClientList({
        page,
        search,
        orderBy: sort.by,
        order: sort.order,
    });
    const navigate = useNavigate();
    const { t } = useTranslation(['common', 'account']);


    return (
        <>
            <Page containerSize="md">
                <PageTopBar m="1" showBack onBack={() => navigate(-1)}>
                    <Text as='b' fontSize='xl'>Clients</Text>
                </PageTopBar>
                <PageContent>
                    <HStack mb="4">
                        <SearchInput value={search} onChange={setSearch} />
                    </HStack>
                    <HStack mb="4" mt="4" justifyContent="space-between">
                        <Text>{t('account:client.sort')}</Text>
                        <Sort
                            sort={sort}
                            onChange={setSort}
                            options={sortOptions}
                            ascIcon={<HiSortDescending size={"20"} />}
                            descIcon={<HiSortDescending size={"20"} />}
                        />
                    </HStack>
                    {clientList?.data?.map((client) => (
                        <Card
                            key={client.id.toString()}
                            direction={{ base: 'row', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            py={2}
                            px={4}
                            m={2}
                            onClick={() => navigate(`/admin/Clients/showClient/${client.id}`)}
                            cursor='pointer'
                        >
                            <Stack direction='row' flex='1' alignItems='center'>
                                <HiOutlineUserCircle size={"30px"} />
                                <CardBody>
                                    <Heading size='sm'>{client?.firstName + ' ' + client?.lastName}</Heading>
                                    <Text py='2'>
                                        {client?.type}
                                    </Text>
                                </CardBody>
                            </Stack>

                            <Stack>
                                <HiOutlineChevronRight />
                            </Stack>
                        </Card>
                    ))}
                    <Flex>
                    <Pagination
                        isLoadingPage={isClientLoading}
                        setPage={setPage}
                        page={clientList?.current_page}
                        pageSize={clientList?.per_page}
                        totalItems={clientList?.total}
                    >
                        <PaginationButtonFirstPage />
                        <PaginationButtonPrevPage />
                        <PaginationInfo flex="1" />
                        <PaginationButtonNextPage />
                        <PaginationButtonLastPage />
                    </Pagination>
                    </Flex>
                </PageContent>
            </Page >
        </>
    )
}
export default PageClients;
