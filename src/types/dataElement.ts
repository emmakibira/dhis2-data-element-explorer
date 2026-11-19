// Shapes of what the DHIS2 API sends back. Add new types here as you need them
// (for example DataElementDetails in milestone 3 and DataElementNote in milestone 4).

export interface Pager {
    page: number
    pageCount: number
    total: number
    pageSize: number
}

export interface DataElement {
    id: string
    displayName: string
    valueType: string
    domainType: string
}

export interface DataElementsResponse {
    dataElements: {
        pager: Pager
        dataElements: DataElement[]
    }
}
