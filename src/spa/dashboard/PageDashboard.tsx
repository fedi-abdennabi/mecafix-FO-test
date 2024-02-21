import { ContractsGrid } from '../admin/components/ContractsGrid';
import { FooterStack } from '../admin/components/FooterSatack';
import { GirdStat } from '../admin/components/GridStat';
import { HeaderGrid } from '../admin/components/HeaderGrid';
import { ProgressCercles } from '../admin/components/ProgressCercles';
import {UserTabs} from '../admin/components/UserTabs';
import { Page, PageContent, PageTopBar } from '../layout';
import {usersData} from '../admin/components/UserTabs/index';
import { useNavigate } from 'react-router-dom';

export const PageDashboard = () => {
  const navigate=useNavigate();
  return (
    <Page containerSize="xl"> 
      <PageTopBar m="1" showBack onBack={() => navigate(-1)}>
      </PageTopBar>
      <PageContent>
        <HeaderGrid />
        <GirdStat />
        <ProgressCercles />
        <ContractsGrid />
        <UserTabs users={usersData} />
        <FooterStack />
      </PageContent>
    </Page>
  );
};
