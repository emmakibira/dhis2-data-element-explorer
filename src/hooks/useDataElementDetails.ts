import { useDataQuery } from '@dhis2/app-runtime'
import { dataElementDetailsQuery } from '../api/dataElements'
import type { DataElementDetailsResponse } from '../types/dataElement'

export function useDataElementDetails(id: string) {
    const { data, loading, fetching, error } =
        useDataQuery<DataElementDetailsResponse>(dataElementDetailsQuery, {
            variables: { id },
        })

    const details = data?.dataElement?.id === id ? data.dataElement : undefined

    return {
        details,
        loading: loading || fetching,
        error,
    }
}
