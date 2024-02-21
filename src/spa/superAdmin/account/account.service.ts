import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import Axios, { AxiosError } from 'axios';
import { Account } from "./account.type";
import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory";

const AccountKeys = createQueryKeys('AccountService', {
    all: () => ['AccountService'] as const,
    Account: (params: { PackId?: number | string }) => [params],
    AccountDetails: () => ['AccountDetails'] as const,
  });

  type AccountKeys = inferQueryKeys<typeof AccountKeys>;

export const useAccountCreate = (
    config: UseMutationOptions<Account, AxiosError, Account> = {}
  ) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.post('/superAdmin/users/create', payload), {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(AccountKeys.all._def);
        config?.onSuccess?.(...args);
      },
    });
  };