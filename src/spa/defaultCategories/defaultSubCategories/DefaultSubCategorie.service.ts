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
import { DefaultSubCategories, DefaultSubCategoriesListResult } from './DefaultSubCategorie.type';


const DefaultSubCategoriesKeys = createQueryKeys('DefaultCategoriesService', {
    all: () => ['DefaultCategoriesService'] as const,
    DefaultCategories: (params: { DefaultCategoriesId?: number | string }) => [params],
    DefaultSubCategoriesDetails: () => ['DefaultCategoriesDetails'] as const,
});
type DefaultSubCategoriesKeys = inferQueryKeys<typeof DefaultSubCategoriesKeys>;

export const useDefaultSubCategoriesList = (
    id?: number | string,
    { page = 1 } = {},
    config: UseQueryOptions<
        DefaultSubCategoriesListResult,
        AxiosError,
        DefaultSubCategoriesListResult,
        DefaultSubCategoriesKeys['all']['queryKey']
    > = {}
) => {
    const fetchSubCategories = (): Promise<DefaultSubCategoriesListResult> => {
        return Axios.get(`superAdmin/categories/subCategories/${id}`, { params: { page } });
    };

    const result = useQuery(
        DefaultSubCategoriesKeys.all().queryKey,
        fetchSubCategories,
        { keepPreviousData: true, ...config }
    );

    return {
        defaultSubCategoriesList: result.data,
        ...result,
    };
};

export const useDefaultSubCategoriesCreate = (
    id?: number | string,
    config: UseMutationOptions<DefaultSubCategories, AxiosError, DefaultSubCategories> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.post(`superAdmin/categories/subCategories/${id}/create`, payload), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultSubCategoriesKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDefaultSubCategoriesDelete = (
    id?: number,
    config: UseMutationOptions<void, AxiosError, DefaultSubCategories> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(({ id }) => Axios.delete(`/superAdmin/categories/subCategories/delete/${id}`), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultSubCategoriesKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDefaultSubCategoriesUpdate = (
    id?: number,
    config: UseMutationOptions<DefaultSubCategories, AxiosError, Omit<DefaultSubCategories, 'id'>> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.put(`/superAdmin/categories/subCategories/update/${id}`, payload), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultSubCategoriesKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDefaultSubCategoryDetails = (
    id?: number | string,
    config: UseQueryOptions<
        DefaultSubCategories,
        AxiosError,
        DefaultSubCategories,
        DefaultSubCategoriesKeys['DefaultSubCategoriesDetails']['queryKey']
    > = {}
) => {
    const result = useQuery(
        DefaultSubCategoriesKeys.DefaultSubCategoriesDetails().queryKey,
        (): Promise<DefaultSubCategories> => Axios.get(`/superAdmin/categories/subCategorie/${id}`),
        config
    );
    return {
        subCategorieDetails: result.data,
        ...result,
    }
};



