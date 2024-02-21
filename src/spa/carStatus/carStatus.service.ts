import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { status } from "./carStatus.type";
import axios, { AxiosError }  from "axios";
import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory";

const StatusKeys = createQueryKeys('StatusService', {
    all: () => ['StatusService'] as const,
  });
  type StatusKeys = inferQueryKeys<typeof StatusKeys>;

export const useCarStatusList = (
    config: UseQueryOptions<
      status[],
      AxiosError,
      status[],
      StatusKeys['all']['queryKey']
    > = {}
  ) => {
    const result = useQuery(
      StatusKeys.all().queryKey,
      (): Promise<status[]> =>
        axios.get("admin/status/"),
      { keepPreviousData: true, ...config }
    );
    return {
      statusData: result.data,
      ...result,
    };
  };