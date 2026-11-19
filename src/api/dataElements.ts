// Queries and mutations live here as named constants, never inline in a component.
// Worked example for milestone 1: use it with useDataQuery and change it as you go.

export const PAGE_SIZE = 20

export interface DataElementsVariables {
    page: number
}

export const dataElementsQuery = {
    dataElements: {
        resource: 'dataElements',
        params: ({ page }: DataElementsVariables) => ({
            page,
            pageSize: PAGE_SIZE,
            fields: 'id,displayName,valueType,domainType',
            order: 'displayName:asc',
        }),
    },
}
