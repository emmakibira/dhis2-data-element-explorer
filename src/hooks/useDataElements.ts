import { useDataQuery } from '@dhis2/app-runtime'
import { dataElementsQuery } from '../api/dataElements'
import type { DataElementsResponse } from '../types/dataElement'

export function useDataElements() {
    const { data, loading, fetching, error, refetch } =
        useDataQuery<DataElementsResponse>(dataElementsQuery, {
            variables: { page: 1 },
        })

    return {
        dataElements: data?.dataElements.dataElements ?? [],
        pager: data?.dataElements.pager,
        loading,
        fetching,
        error,
        refetch,
    }
}
