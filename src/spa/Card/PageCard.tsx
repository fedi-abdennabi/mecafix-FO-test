import React from 'react';
import { SelectClient } from "./CardForms/SelectClientForm";
import { Page, PageTopBar, PageContent } from '@/spa/layout';
import { useNavigate } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const PageCard = () => {
    const { t } = useTranslation(['account']);
    const navigate = useNavigate();
    return (
        <Page containerSize="lg">
            <PageContent>
            <PageTopBar m="1" showBack onBack={() => navigate(-1)}>
                <Text as='b' fontSize='xl'>{t('account:carte.title')}</Text>
            </PageTopBar>
            <SelectClient />       
            </PageContent>
        </Page>
    )
}
