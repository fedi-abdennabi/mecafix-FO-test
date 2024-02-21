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
import { SubCategorys, SubCategorysListResult } from './subCategory.type';


const SubCategorysKeys = createQueryKeys('CategorysService', {
    all: () => ['CategorysService'] as const,
    Categorys: (params: { CategoryId?: number | string }) => [params],
    SubCategorysDetails: () => ['CategorysDetails'] as const,
});
type SubCategorysKeys = inferQueryKeys<typeof SubCategorysKeys>;

export const useSubCategorysList = (
    id?: number | string,
    { page = 1 } = {},
    config: UseQueryOptions<
        SubCategorysListResult,
        AxiosError,
        SubCategorysListResult,
        SubCategorysKeys['all']['queryKey']
    > = {}
) => {
    const fetchSubCategorys = (): Promise<SubCategorysListResult> => {
        return Axios.get(`/admin/subcategory/${id}`, { params: { page } });
    };

    const result = useQuery(
        SubCategorysKeys.all().queryKey,
        fetchSubCategorys,
        { keepPreviousData: true, ...config }
    );

    return {
        subCategorysList: result.data,
        ...result,
    };
};

export const useSubCategoryCreate = (
    categoryId?: number,
    config: UseMutationOptions<SubCategorys, AxiosError, Omit<SubCategorys, 'id'>> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.post(`/admin/subcategory/${categoryId}/create`, payload), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(SubCategorysKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useDuplicateSubCategoy = (
    config: UseMutationOptions<SubCategorys, AxiosError, Omit<SubCategorys, 'id'>> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((subCategoryId) => Axios.post(`/admin/subcategory/deplicate-${subCategoryId}`), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(SubCategorysKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useSubCategoryDelete = (
    config: UseMutationOptions<TODO, AxiosError, TODO> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((subCategoryId) => Axios.delete(`/admin/subcategory/${subCategoryId}`), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(SubCategorysKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useSubCategoryUpdate = (
    subCategoryId?: number,
    config: UseMutationOptions<SubCategorys, AxiosError, Omit<SubCategorys, 'id'>> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation((payload) => Axios.put(`/admin/subcategory/${subCategoryId}`, payload), {
        ...config,
        onSuccess: (...args) => {
            queryClient.invalidateQueries(SubCategorysKeys.all._def);
            config?.onSuccess?.(...args);
        },
    });
};

export const useSubCategorysDetails = (
    id?: number | string,
    config: UseQueryOptions<
        SubCategorys,
        AxiosError,
        SubCategorys,
        SubCategorysKeys['SubCategorysDetails']['queryKey']
    > = {}
) => {
    const result = useQuery(
        SubCategorysKeys.SubCategorysDetails().queryKey,
        (): Promise<SubCategorys> => Axios.get(`/admin/subcategory/${id}`),
        config
    );
    return {
        subCategorysDetails: result.data,
        ...result,
    }
};

export const useSubCategoryNotDone = (
    config: UseMutationOptions<void, unknown, SubCategorys> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (subCategorys: SubCategorys): Promise<void> =>
            Axios.post(`/admin/subcategory/notDone-${subCategorys.id}`),
        {
            ...config,
            onSuccess: (...args) => {
                queryClient.invalidateQueries(SubCategorysKeys.all._def);
                config?.onSuccess?.(...args);
            },
        }
    );
}

export const useSubCategoryDone = (
    config: UseMutationOptions<void, unknown, SubCategorys> = {}
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (subCategorys: SubCategorys): Promise<void> =>
            Axios.post(`/admin/subcategory/done-${subCategorys.id}`),
        {
            ...config,
            onSuccess: (...args) => {
                queryClient.invalidateQueries(SubCategorysKeys.all._def);
                config?.onSuccess?.(...args);
            },
        }
    );
}


