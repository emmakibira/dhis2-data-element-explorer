export const PAGE_SIZE = 20

export interface DataElementsVariables {
    page: number
    search?: string
    valueType?: string
}

export const dataElementsQuery = {
    dataElements: {
        resource: 'dataElements',
        params: (variables: object) => {
            const page =
                'page' in variables && typeof variables.page === 'number'
                    ? variables.page
                    : 1

            const search =
                'search' in variables && typeof variables.search === 'string'
                    ? variables.search.trim()
                    : ''

            const valueType =
                'valueType' in variables &&
                typeof variables.valueType === 'string'
                    ? variables.valueType
                    : ''

            const filters: string[] = []

            if (search) {
                filters.push(`displayName:ilike:${search}`)
            }

            if (valueType && valueType !== 'All') {
                filters.push(`valueType:eq:${valueType}`)
            }

            return {
                page,
                pageSize: PAGE_SIZE,
                fields: 'id,displayName,valueType,domainType',
                order: 'displayName:asc',
                ...(filters.length > 0 ? { filter: filters } : {}),
            }
        },
    },
}

export const dataElementDetailsQuery = {
    dataElement: {
        resource: 'dataElements',
        id: (variables: object) => {
            if ('id' in variables && typeof variables.id === 'string') {
                return variables.id
            }

            throw new Error('A data element ID is required')
        },
        params: {
            fields: 'id,name,shortName,code,description,valueType,aggregationType,categoryCombo[name],created,lastUpdated',
        },
    },
}
