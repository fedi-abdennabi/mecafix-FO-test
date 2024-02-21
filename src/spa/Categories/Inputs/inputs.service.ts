import {
    createQueryKeys,
    inferQueryKeys,
} from '@lukemorales/query-key-factory';
import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';
import { Input } from './inputs.type';
import { DefaultInput } from '@/spa/defaultCategories/defaultInput/DefaultInputs.type';


const InputKeys = createQueryKeys('InputService', {
    all: () => ['InputService'] as const,
    Inputs: (params: { InputId?: number | string }) => [params],
    InputsDetails: () => ['InputService'] as const,
});
type InputKeys = inferQueryKeys<typeof InputKeys>;


export const useInputList = (
    subCategoryId?: number | string,
    config: UseQueryOptions<
        DefaultInput[],
        AxiosError,
        DefaultInput[],
        InputKeys['all']['queryKey']
    > = {}
) => {
    const queryConfig = {
        ...config,
        cacheTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false, 
      };
    const fetchInput = (): Promise<DefaultInput[]> => {
        return Axios.get(`admin/input/all/${subCategoryId}`);
    };
    const result = useQuery(
        InputKeys.all().queryKey,
        fetchInput,
        { keepPreviousData: true, ...queryConfig }
    );
    return {
        defaultInputList: result.data,
        ...result,
    };
};

export const useInputCreate = (
    subCategoryId?: number | string,
    config: UseMutationOptions<Input, AxiosError, Input> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.post(`admin/input/create/${subCategoryId}`, payload), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(InputKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useInputDetails = (config?: UseQueryOptions<Input, AxiosError, Input, InputKeys['InputsDetails']['queryKey']>) => {
    const queryConfig = {
        ...config,
        cacheTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false, 
      };
    const GetDetails = (inputId: number | string) => {
        return useQuery(
            InputKeys.InputsDetails().queryKey,
            (): Promise<Input> => Axios.get(`/admin/input/${inputId}`),
            queryConfig
        );
    };

    return { GetDetails };
}

export const useInputUpdate = (
    config: UseMutationOptions<void, AxiosError, { id: number | string, values: Input }, Omit<Input, 'id'>> = {}
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(({ id, values }) => Axios.put(`/admin/input/${id}`, values), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(InputKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
    return {
        ...mutation,
        mutate: (id: number | string, values: Input) => mutation.mutate({ id, values }),
    };
};



export const useInputDelete = (
    config: UseMutationOptions<void, AxiosError, number | string> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((inputId) => Axios.delete(`/admin/input/${inputId}`), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(InputKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useInputDisplayToClient = (
    config: UseMutationOptions<void, AxiosError, number> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id) => Axios.post(`/admin/input/displayFieldToClient/${id}`),
        {
            ...config,
            onSuccess: (...args) => {
                queryClient.invalidateQueries(InputKeys.all._def);
                config?.onSuccess?.(...args);
            },
        }
    );
};

export const useInputIncrementOrder = (
    config: UseMutationOptions<void, AxiosError, number> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id) => Axios.post(`/admin/input/incrementOrder/${id}`),
        {
            ...config,
            onSuccess: (...args) => {
                queryClient.invalidateQueries(InputKeys.all._def);
                config?.onSuccess?.(...args);
            },
        }
    );
};


export const useInputDecrementOrder = (
    config: UseMutationOptions<void, AxiosError, number> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id) => Axios.post(`/admin/input/decrementOrder/${id}`),
        {
            ...config,
            onSuccess: (...args) => {
                queryClient.invalidateQueries(InputKeys.all._def);
                config?.onSuccess?.(...args);
            },
        }
    );
};

