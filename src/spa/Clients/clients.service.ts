
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { createQueryKeys, inferQueryKeys } from '@lukemorales/query-key-factory';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ClientList, Clients } from './client.type';
import { useNavigate } from 'react-router-dom';

const ClientKeys = createQueryKeys('ClientService', {
  all: () => ['ClientService'] as const,
  Pack: (params: { PackId?: number | string }) => [params],
  PackUserDetails: () => ['ClientDetails'] as const,
  list: (params: { search?: string; orderBy?: string; order?: string; page?:number }) => [
    params,
  ],
  client: (params: { clientId?: number | string }) => [params],
});
type ClientKeys = inferQueryKeys<typeof ClientKeys>;

export const useClientList = (
  { search = '', orderBy = '', order = '', page = 1 } = {},
  config: UseQueryOptions<
    ClientList,
    AxiosError,
    ClientList,
    ClientKeys['list']['queryKey']
  > = {}
) => {
  const result = useQuery(
    ClientKeys.list({ search, orderBy, order, page }).queryKey,
    (): Promise<ClientList> =>
      axios.get("admin/clients/", {
        params: { search, orderBy, order, page },
      }),
    { keepPreviousData: true, ...config }
  );
  return {
    clientList: result.data,
    ...result,
  };
};

export const useRecentClient = (config = {}) => {
  const result = useQuery(
    ['recentClients'],
    (): Promise<Clients[]> => axios.get('admin/clients/recent'),
    { keepPreviousData: true, ...config }
  );

  return {
    recentClient: result.data,
    ...result,
  };
};


export const useClient = (
  id?: number | string,
  config: UseQueryOptions<
    Clients,
    AxiosError,
    Clients,
    ClientKeys['client']['queryKey']
  > = {}
) => {
  const result = useQuery(
    ClientKeys.client({ clientId: id }).queryKey,
    (): Promise<Clients> => axios.get(`admin/clients/${id}`),
    {
      ...config,
    }
  );

  return {
    client: result.data,
    ...result,
  };
};

export const useClientUpdate = (
  id?: number | string,
  config: UseMutationOptions<Clients, AxiosError, Clients> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => axios.put(`/admin/clients/update/${id}`, payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(ClientKeys.client({ clientId: id }));
      config?.onSuccess?.(...args);
    },
  });
};

export const useClientCreate = (
  config: UseMutationOptions<TODO, AxiosError, TODO> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => axios.post('admin/folder/create', payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(ClientKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const useClientRemove = (
  id: number | string,
  navigatePath: string,
  config: UseMutationOptions<void, unknown, TODO> = {}
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((): Promise<void> => axios.delete(`/admin/clients/delete/${id}`), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(ClientKeys.all._def);
      navigate(navigatePath);
      config?.onSuccess?.(...args);
    },
  });
};

