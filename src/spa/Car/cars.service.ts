
import {
    UseMutationOptions,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query';
  import axios, { AxiosError } from 'axios';
  import { createQueryKeys, inferQueryKeys } from '@lukemorales/query-key-factory';
  import { UseQueryOptions, useQuery } from '@tanstack/react-query';
  import { Car } from './car.type';
  import { useNavigate } from 'react-router-dom';
  
  const CarKeys = createQueryKeys('CarService', {
    all: () => ['CarService'] as const,
    Pack: (params: { PackId?: number | string }) => [params],
    list: (params: { search?: string; orderBy?: string; order?: string }) => [
      params,
    ],
    car: (params: { carId?: number | string }) => [params],
  });
  type CarKeys = inferQueryKeys<typeof CarKeys>;
  
  export const useCarList = (
    { search = '', orderBy = '', order = '' } = {},
    config: UseQueryOptions<
      Car[],
      AxiosError,
      Car[],
      CarKeys['list']['queryKey']
    > = {}
  ) => {
    const result = useQuery(
      CarKeys.list({ search, orderBy, order }).queryKey,
      (): Promise<Car[]> =>
        axios.get("admin/cars/", {
          params: { search, orderBy, order },
        }),
      { keepPreviousData: true, ...config }
    );
    return {
      carList: result.data,
      ...result,
    };
  };
  
  
  export const useCarUpdate = (
    id?: number | string,
    config: UseMutationOptions<Car, AxiosError, Car> = {}
  ) => {
    const queryCar = useQueryClient();
    return useMutation((payload) => axios.put(`/admin/cars/update/${id}`, payload), {
      ...config,
      onSuccess: (...args) => {
        queryCar.invalidateQueries(CarKeys.car({ carId: id }));
        config?.onSuccess?.(...args);
      },
    });
  };

  export const useCarCreate = (
    config: UseMutationOptions<TODO, AxiosError, TODO> = {}
  ) => {
    const queryCar = useQueryClient();
    return useMutation((payload) => axios.post('admin/cars/create', payload), {
      ...config,
      onSuccess: (...args) => {
        queryCar.invalidateQueries(CarKeys.all._def);
        config?.onSuccess?.(...args);
      },
    });
  };
  
  export const useCarRemove = (
    id?: number | string,
    config: UseMutationOptions<void, unknown, number> = {}
  ) => {
    const queryCar = useQueryClient();
    return useMutation((): Promise<void> => axios.delete(`/admin/cars/delete/${id}`), {
      ...config,
      onSuccess: (...args) => {
        queryCar.invalidateQueries(CarKeys.all._def);
        config?.onSuccess?.(...args);
      },
    });
  };
  
  