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
import { DefaultInput } from './DefaultInputs.type';

export const DefaultInputKeys = createQueryKeys('DefaultInputService', {
    all: () => ['DefaultInputService'] as const,
    DefaultInputs: (params: { DefaultInputId?: number | string }) => [params],
    DefaultInputsDetails: () => ['DefaultInputService'] as const,
}); 

type DefaultInputKeys = inferQueryKeys<typeof DefaultInputKeys>;

export const useDefaultInputList = (
    id?: number | string,
    { page = 1 } = {},
    config: UseQueryOptions<
        DefaultInput[],
        AxiosError,
        DefaultInput[],
        DefaultInputKeys['all']['queryKey']
    > = {}
) => {
    const fetchDefaultInput = (): Promise<DefaultInput[]> => {
        return Axios.get(`superAdmin/subCategorie/${id}`, { params: { page } });
    };

    const result = useQuery(
        DefaultInputKeys.all().queryKey,
        fetchDefaultInput,
        { keepPreviousData: true, ...config }
    );

    return {
        defaultInputList: result.data,
        ...result,
    };
};

export const useDefaultInputCreate = (
    id?: number | string,
    config: UseMutationOptions<DefaultInput, AxiosError, DefaultInput> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.post(`superAdmin/subCategorie/${id}`, payload), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultInputKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDefaultInputDetails = (config?: UseQueryOptions<DefaultInput, AxiosError, DefaultInput, DefaultInputKeys['DefaultInputsDetails']['queryKey']>) => {
    const queryConfig = {
        ...config,
        cacheTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
    };
    const GetDetails = (inputId: number | string) => {
        return useQuery(
            DefaultInputKeys.DefaultInputsDetails().queryKey,
            (): Promise<DefaultInput> => Axios.get(`/superAdmin/subCategorie/input/${inputId}`),
            queryConfig
        );
    };

    return { GetDetails };
}

export const useDefaultInputUpdate = (
    config: UseMutationOptions<void, AxiosError, { id: number | string, values: DefaultInput }, Omit<DefaultInput, 'id'>> = {}
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(({ id, values }) => Axios.put(`/superAdmin/subCategorie/update/${id}`, values), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultInputKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });

    return {
        ...mutation,
        mutate: (id: number | string, values: DefaultInput) => mutation.mutate({ id, values }),
    };
};

export const useDefaultInputDelete = (
    defaultSubCategoryId?: number | string,
    config: UseMutationOptions<void, AxiosError, number | string> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((defaultSubCategoryId) => Axios.delete(`/superAdmin/subCategorie/${defaultSubCategoryId}`), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultInputKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDefaultInputIncrementOrder = (
    config: UseMutationOptions<void, AxiosError, number> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id) => Axios.post(`/superAdmin/subCategorie/incrementOrder/${id}`),
        {
            ...config,
            onSuccess: (...args) => {
                queryClient.invalidateQueries(DefaultInputKeys.all._def);
                config?.onSuccess?.(...args);
            },
        }
    );
};


export const useDefaultInputDecrementOrder = (
    config: UseMutationOptions<void, AxiosError, number> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id) => Axios.post(`/superAdmin/subCategorie/decrementOrder/${id}`),
        {
            ...config,
            onSuccess: (...args) => {
                queryClient.invalidateQueries(DefaultInputKeys.all._def);
                config?.onSuccess?.(...args);
            },
        }
    );
};

export const useDefaultInputDisplayToClient = (
    config: UseMutationOptions<void, AxiosError, number> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id) => Axios.post(`/superAdmin/subCategorie/displayFieldToClient/${id}`),
        {
            ...config,
            onSuccess: (...args) => {
                queryClient.invalidateQueries(DefaultInputKeys.all._def);
                config?.onSuccess?.(...args);
            },
        }
    );
};


