import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Status } from "./carStatus.type";
import axios, { AxiosError }  from "axios";
import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory";

const StatusKeys = createQueryKeys('StatusService', {
    all: () => ['StatusService', 'folder'] as const,
  });
  type StatusKeys = inferQueryKeys<typeof StatusKeys>;

export const useCarStatusList = (
    config: UseQueryOptions<
      Status[],
      AxiosError,
      Status[],
      StatusKeys['all']['queryKey']
    > = {}
  ) => {
    const result = useQuery(
      StatusKeys.all().queryKey,
      (): Promise<Status[]> =>
        axios.get("admin/status/"),
      { keepPreviousData: true, ...config }
    );
    return {
      statusData: result.data,
      ...result,
    };
  };

  export const useFolderStatusUpdate = (
    folderId?: string,
    config: UseMutationOptions<string, AxiosError, {inputValue?:string,statusId?:number}> = {}
  ) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => axios.put(`admin/folder/status/update/${folderId}`, payload), {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(StatusKeys.all._def);
        config?.onSuccess?.(...args);
      },
    });
  };