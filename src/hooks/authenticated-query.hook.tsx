import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useAuth } from "./auth.hook";

export function useAuthenticatedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "initialData"
  > & { initialData?: () => undefined }
): UseQueryResult<TData, TError> {
  const { isAuthenticated, authData } = useAuth();

  const isDisabled = options.enabled === false;
  const queryKey = options?.queryKey
    ? typeof options.queryKey === "object"
      ? [...options.queryKey]
      : [options.queryKey]
    : [];

  return useQuery({
    ...options,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    queryKey: [...queryKey, authData?.token],
    enabled: isAuthenticated && !isDisabled,
  });
}
