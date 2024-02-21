
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
import { Categories, CategoriesListResult } from './Categories.type';


const DefaultCategoriesKeys = createQueryKeys('DefaultCategoriesService', {
    all: () => ['DefaultCategoriesService'] as const,
    DefaultCategories: (params: { DefaultCategoriesId?: number | string }) => [params],
    DefaultCategoriesDetails: () => ['DefaultCategoriesDetails'] as const,
});
type DefaultCategoriesKeys = inferQueryKeys<typeof DefaultCategoriesKeys>;

export const useDefaultCategoriesList = (
    { page = 1 } = {},
    config: UseQueryOptions<
        CategoriesListResult,
        AxiosError,
        CategoriesListResult,
        DefaultCategoriesKeys['all']['queryKey']
    > = {}
) => {
    const result = useQuery(
        DefaultCategoriesKeys.all().queryKey,
        (): Promise<CategoriesListResult> =>
            Axios.get(`superAdmin/categories`, { params: { page } }),
        { keepPreviousData: true, ...config }
    );

    return {
        defaultCategoriesList: result.data,
        ...result,
    };
};


export const useDefaultCategoriesCreate = (
    config: UseMutationOptions<Categories, AxiosError, Omit<Categories, 'id'>> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.post('/superAdmin/categories/create', payload), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultCategoriesKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDefaultCategoriesUpdate = (
    id:number,
    config: UseMutationOptions<Categories, AxiosError, Omit<Categories, 'id'>> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.put(`/superAdmin/categories/update/${id}`,payload), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultCategoriesKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDefaultCategoriesDelete = (
    id:number,
    config: UseMutationOptions<void, AxiosError,Categories > = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(({ id }) => Axios.delete(`/superAdmin/categories/delete/${id}`), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(DefaultCategoriesKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDefaultCategoryDetails = (
    id: number | string,
    config: UseQueryOptions<
        Categories,
        AxiosError,
        Categories,
        DefaultCategoriesKeys['DefaultCategoriesDetails']['queryKey']
    > = {}
) => {
    const result= useQuery(
        DefaultCategoriesKeys.DefaultCategoriesDetails().queryKey,
        (): Promise<Categories> => Axios.get(`superAdmin/categories/${id}`),
        config
    );
    return {
        categorieDetails : result.data, 
        ...result,
    }
};