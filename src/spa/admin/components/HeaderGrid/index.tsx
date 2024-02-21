import { Icon } from '@/components/Icons';
import { useClientList } from '@/spa/Clients/clients.service';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { FaCheckCircle, FaUsers } from 'react-icons/fa';
import { RiEditCircleFill, RiSettingsFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';


export const HeaderGrid = () => {
  const { t } = useTranslation(['DashboardTranslate']);
  const params = useParams();
  const clientId = params.clientId;
  const { clientList } = useClientList();

  return (
    <Stack direction={{ base: "column", md: "row" }} p="2" >

      <Stack
        bg="#012652"
        direction={{ base: "column", sm: "row" }}
        justifyContent="space-around"
        alignItems="center"
        borderWidth={2}
        rounded={20}
        boxShadow={'md'}
      >
        <CircularProgress
          value={60}
          size="120px"
          color="gray.100"
          trackColor="gray.400"
          thickness="16px"
          px={4}
          py={2}
        ><CircularProgressLabel color={'white'}>60%</CircularProgressLabel>
        </CircularProgress>
        <CircularProgress
          value={40}
          size="120px"
          color="gray.100"
          trackColor="gray.400"
          thickness="16px"
          px={4}
          py={2}
        ><CircularProgressLabel color={'white'}>40%</CircularProgressLabel></CircularProgress>
      </Stack>
      <Stack
        flex="1"
        overflowX="auto"
      >
        <Stack
          direction="row"
          bg="#012652"
          color="white"
          borderWidth={2}
          alignItems="center"
          rounded={20}
          px={10}
          py={4}
          boxShadow={'md'}
        >
          <FaUsers />
          <Flex direction={'column'} align={'center'}>
            <Text>{t('DashboardTranslate:clients.title')}</Text>
            {/* <Text>{clientList?.length}</Text> */}
          </Flex>
        </Stack >
        <Stack alignItems="stretch"
          direction="row" wrap="wrap" justifyContent="space-around" gap={4}>
          <FolderStatc icon={RiSettingsFill} text={t('DashboardTranslate:clients.folderOpened')} />
          <FolderStatc icon={FaCheckCircle} text={t('DashboardTranslate:clients.folderClosed')} />
          <FolderStatc icon={RiEditCircleFill} text={t('DashboardTranslate:clients.contract')} />
        </Stack>
      </Stack>

    </Stack>
  );
};

type FolderStatcProps = {
  icon: IconType;
  text: string;
};
const FolderStatc: FC<FolderStatcProps> = ({ icon, text }) => <Stack alignItems="center" p="4" flex="1" direction="row" bg="gray.300" boxShadow={'md'} rounded={20}>
  <Icon icon={icon} /><Text>{text}</Text>
</Stack>
