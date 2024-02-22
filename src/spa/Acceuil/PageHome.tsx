import { useState } from 'react';

import {
    DataList,
    DataListCell,
    DataListHeader,
    DataListRow,
} from '@/components/DataList';
import { Sort, SortValue } from '@/components/Sort';
import {
    Button,
    Center,
    Flex,
    Heading,
    LinkBox,
    Spinner,
    Stack
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { HiDocumentAdd, HiTruck, HiUserAdd } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { SearchFolderInputs } from '../folder/SearchFolderInputs';
import { useFolderList } from "../folder/folder.service";
import { Page, PageContent } from "../layout";
import { DrawerSearch } from '../folder/FilterSearch';

const PageHome = () => {
    const { t } = useTranslation(['mainMenu', 'filter']);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string | undefined>('');
    const sortOptions = [
        { value: 'created_at', label: t('filter:CreationDate') },
        { value: 'alphabetical_order', label: t('filter:AlphabiticalOrder') },
    ];

    const [sort, setSort] = useState<SortValue>({
        by: 'created_at',
        order: 'desc',
    });
    const { folderList, isLoading: isFolderLoading } = useFolderList({
        search,
        orderBy: sort.by,
        order: sort.order,
    });


    return (
        <Page containerSize="full">
            <PageContent>
                <Stack>
                    <Flex>
                        <Heading size='md' fontSize='25px' pl={"12px"} pt={"10px"}>
                            {t('mainMenu:Hello')},
                        </Heading>
                        <Heading size='md' fontSize='25px' color={"blue.900"} pl={"4px"} pt={"10px"}>
                            Majdi
                        </Heading>
                    </Flex>
                    <Flex pt={"12px"} px={"12px"}>
                        <SearchFolderInputs value={search} onChange={setSearch} />
                    </Flex>
                    <Flex>
                        <Button onClick={() => navigate("/admin/Clients/addClient")} colorScheme='blue' ml={"12px"} mr={"12px"} w={"200px"} h={"100px"} mt={"10px"} ><HiUserAdd size={"50px"} /></Button>
                        <Button onClick={() => navigate("/admin/card")} colorScheme='blue' ml={"12px"} mr={"12px"} w={"200px"} h={"100px"} mt={"10px"} ><HiTruck size={"50px"} /></Button>
                        <Button onClick={() => navigate("/admin/folder/generatepdf")} colorScheme='blue' ml={"12px"} mr={"12px"} w={"200px"} h={"100px"} mt={"10px"} ><HiDocumentAdd size={"50px"} /></Button>
                    </Flex>
                    <Stack direction={'row'} justifyContent='space-between'>
                        <Heading size='sm' pl={"12px"} pt={"10px"}>
                            {t('mainMenu:YourActivity')} :
                        </Heading>
                        <Stack direction={'row'}>
                            <DrawerSearch />
                            <Sort
                                sort={sort}
                                onChange={setSort}
                                options={sortOptions}
                                ascIcon={<FaSortUp />}
                                descIcon={<FaSortDown />}
                            />
                        </Stack>
                    </Stack>

                    {isFolderLoading && (
                        <Center>
                            <Spinner size="xl" color="blue" />
                        </Center>
                    )}
                    {!isFolderLoading && (
                        <DataList overflowY="scroll" flexWrap="wrap">
                            <DataListHeader>
                                <DataListCell colName="number" colWidth={'20%'}>
                                    {t('mainMenu:folderNumber')}
                                </DataListCell>
                                <DataListCell colName="Client" colWidth={'20%'}>
                                    {t('mainMenu:client')}
                                </DataListCell>
                                <DataListCell  colName="model" colWidth={'20%'}>
                                    {t('mainMenu:model')}
                                </DataListCell>
                                <DataListCell  colName="registration" colWidth={'20%'}>
                                    {t('mainMenu:registration')}
                                </DataListCell>
                                <DataListCell  colName="Status" colWidth={'20%'}>
                                    Status
                                </DataListCell>
                            </DataListHeader>
                            {folderList?.map((folder) => (
                                <button key={folder?.id} onClick={() => navigate(`/admin/folder/${folder.id}`)}>
                                    <DataListRow
                                        as={LinkBox}
                                        key={folder.id.toString()}
                                    >
                                        <DataListCell colName="number">
                                            {folder.id.toString()}
                                        </DataListCell>
                                        <DataListCell colName="Client">
                                            {folder?.clients?.firstName} {folder?.clients?.lastName}
                                        </DataListCell>
                                        <DataListCell colName="model">
                                            {folder?.car?.brand} {folder?.car?.model}
                                        </DataListCell>
                                        <DataListCell colName="registration">
                                            {folder?.car?.immatriculation}
                                        </DataListCell>
                                        <DataListCell colName="Status">
                                            {folder?.statusValue}
                                        </DataListCell>
                                    </DataListRow>
                                </button>
                            ))}
                        </DataList>
                    )}
                </Stack>
            </PageContent>
        </Page>
    )
}
export default PageHome; 
