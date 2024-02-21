import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import axios, { AxiosError } from "axios";
import { Folder } from "./folder.type";
const folderKeys = createQueryKeys('folderKeysService', {
  all: () => ['folderKeysService'] as const,
  list: (params: { search?: string; orderBy?: string; order?: string }) => [
    params,
  ],
  folder: (params: { folderId?: number | string }) => [params],
});

type FolderKeys = inferQueryKeys<typeof folderKeys>;

export const useFolderList = (
  { search = '', orderBy = '', order = '' } = {},
  config: UseQueryOptions<
    Folder[],
    AxiosError,
    Folder[],
    FolderKeys['list']['queryKey']
  > = {}
) => {
  const result = useQuery(
    folderKeys.list({ search, orderBy, order }).queryKey,
    (): Promise<Folder[]> =>
      axios.get("admin/folder", {
        params: { search, orderBy, order },
      }),
    { keepPreviousData: true, ...config }
  );
  return {
    folderList: result.data,
    ...result,
  };
};

export const useFolder = (
  id?: number | string,
  config: UseQueryOptions<
    Folder,
    AxiosError,
    Folder,
    FolderKeys['folder']['queryKey']
  > = {}
) => {
  const result = useQuery(
    folderKeys.folder({ folderId: id }).queryKey,
    (): Promise<Folder> => axios.get(`admin/folder/${id}`),
    {
      ...config,
    }
  );

  return {
    folder: result.data,
    ...result,
  };
};

export const useFolderUpdate = (
  id?: number | string,
  config: UseMutationOptions<Folder, AxiosError, Folder> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => axios.put(`/admin/folder/update/${id}`, payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(folderKeys.folder({ folderId: id }));
      config?.onSuccess?.(...args);
    },
  });
};

export const useClientFolder = (
  id?: number | string,
  config: UseQueryOptions<
    TODO,
    AxiosError,
    TODO,
    FolderKeys['folder']['queryKey']
  > = {}
) => {
  const result = useQuery(
    folderKeys.folder({ folderId: id }).queryKey,
    (): Promise<Folder> => axios.get(`admin/folder/client/${id}`),
    {
      ...config,
    }
  );

  return {
    response: result.data,
    ...result,
  };
};

