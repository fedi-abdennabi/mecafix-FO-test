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
import {Categorys, CategorysListResult } from './categories.type';


const CategorysKeys = createQueryKeys('CategorysService', {
  all: () => ['CategorysService'] as const,
  Categorys: (params: { CategoryId?: number | string }) => [params],
  CategorysDetails: () => ['CategorysDetails'] as const,
  CategoryList: (params: { page: number }) => [params],
});
type CategorysKeys = inferQueryKeys<typeof CategorysKeys>;

export const useCategorysList = (
  id?: number | string,
  { page = 1 } = {},
  config: UseQueryOptions<
    CategorysListResult,
    AxiosError,
    CategorysListResult,
    CategorysKeys['CategoryList']['queryKey']
  > = {}
) => {
  const result = useQuery(
    CategorysKeys.CategoryList({page:page}).queryKey,
    (): Promise<CategorysListResult> =>
      Axios.get(`admin/category/${id}`, { params: { page } }),
    { keepPreviousData: true, ...config }
  );

  return {
    CategorysList: result.data,
    ...result,
  };
};


export const useCategoryCreate = (
  folderId?: number | string,
  config: UseMutationOptions<Categorys, AxiosError, Omit<Categorys, 'id'>> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post(`/admin/category/create/${folderId}`, payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(CategorysKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const useCategoryUpdate = (
  categoryId?: number,
  config: UseMutationOptions<Categorys, AxiosError, Omit<Categorys, 'id'>> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.put(`/admin/category/${categoryId}`, payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(CategorysKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const useCategoryDelete = (
  config: UseMutationOptions<TODO, AxiosError, TODO> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((categoryId ) => Axios.delete(`/admin/category/${categoryId}`), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(CategorysKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const useCategoryDetails = (
  id?: number | string,
  config: UseQueryOptions<
  Categorys,
    AxiosError,
    Categorys,
    CategorysKeys['CategorysDetails']['queryKey']
  > = {}
) => {
  const result = useQuery(
    CategorysKeys.CategorysDetails().queryKey,
    (): Promise<Categorys> => Axios.get(`/admin/category/${id}`),
    config
  );
  return {
    categorysDetails: result.data,
    ...result,
  }
};