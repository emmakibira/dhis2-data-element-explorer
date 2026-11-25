import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect, useRef, useState } from 'react'
import { dataElementsQuery } from '../api/dataElements'
import type { DataElementsResponse } from '../types/dataElement'
import { useDebounce } from './useDebounce'

export function useDataElements() {
    const [search, setSearch] = useState('')
    const [valueType, setValueType] = useState('All')

    const debouncedSearch = useDebounce(search, 300)

    const previousFilters = useRef({
        search: '',
        valueType: 'All',
    })

    const { data, loading, fetching, error, refetch } =
        useDataQuery<DataElementsResponse>(dataElementsQuery, {
            variables: {
                page: 1,
                search: '',
                valueType: 'All',
            },
        })

    useEffect(() => {
        if (
            previousFilters.current.search === debouncedSearch &&
            previousFilters.current.valueType === valueType
        ) {
            return
        }

        previousFilters.current = {
            search: debouncedSearch,
            valueType,
        }

        refetch({
            page: 1,
            search: debouncedSearch,
            valueType,
        })
    }, [debouncedSearch, valueType, refetch])

    function changePage(page: number) {
        refetch({
            page,
            search: debouncedSearch,
            valueType,
        })
    }

    return {
        dataElements: data?.dataElements.dataElements ?? [],
        pager: data?.dataElements.pager,
        loading,
        fetching,
        error,
        search,
        setSearch,
        valueType,
        setValueType,
        changePage,
    }
}
