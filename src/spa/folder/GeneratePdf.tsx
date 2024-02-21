import { SortValue } from "@/components/Sort";
import { Stack, Text, Box, Spinner, Tab, Tabs } from "@chakra-ui/react";
import { t } from "i18next";
import { useState } from "react";
import { Page, PageContent } from "../layout";
import { SearchFolderInputs } from "./SearchFolderInputs";
import { useFolderList } from "./folder.service";

export const GeneratePdf = () => {
    const [search, setSearch] = useState<string | undefined>('');
    const sortOptions = [
        { value: 'created_at', label: t('filter:CreationDate') },
        { value: 'alphabetical_order', label: t('filter:AlphabiticalOrder') },
    ];
    const [sort, setSort] = useState<SortValue>({
        by: 'created_at',
        order: 'desc',
    });
    const { folderList, isLoading: isFolderLoading, isError } = useFolderList({
        search,
        orderBy: sort.by,
        order: sort.order,
    });

    return (
        <Page containerSize="md">
    <PageContent>
        <Stack>
            <SearchFolderInputs value={search} onChange={setSearch} />
            
            {isFolderLoading && <Spinner size="lg" />}
            
            {isError && <Text>Error loading folders</Text>}
            
            {!isFolderLoading && !isError && folderList && (
                folderList.length === 0 ? (
                    <Text>No folders found</Text>
                ) : (
                    <Tabs>
                           <Tab>
                        {folderList.map(folder => (
                            <Text key={folder.id}>{folder.number}</Text>
                        ))}
                    </Tab>
                    </Tabs>
                )
            )}
        </Stack>
    </PageContent>
</Page>

    );
};
