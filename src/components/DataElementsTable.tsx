import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    DataTableHead,
    DataTableBody,
    DataTableRow,
    DataTableColumnHeader,
    DataTableCell,
} from '@dhis2/ui'
import React from 'react'
import type { DataElement } from '../types/dataElement'

interface DataElementsTableProps {
    dataElements: DataElement[]
}

export function DataElementsTable({ dataElements }: DataElementsTableProps) {
    return (
        <DataTable>
            <DataTableHead>
                <DataTableRow>
                    <DataTableColumnHeader>
                        {i18n.t('Name')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t('Value type')}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t('Domain type')}
                    </DataTableColumnHeader>
                </DataTableRow>
            </DataTableHead>

            <DataTableBody>
                {dataElements.length === 0 ? (
                    <DataTableRow>
                        <DataTableCell colSpan="3" align="center">
                            {i18n.t('No data elements found')}
                        </DataTableCell>
                    </DataTableRow>
                ) : (
                    dataElements.map((element) => (
                        <DataTableRow key={element.id}>
                            <DataTableCell>{element.displayName}</DataTableCell>
                            <DataTableCell>{element.valueType}</DataTableCell>
                            <DataTableCell>{element.domainType}</DataTableCell>
                        </DataTableRow>
                    ))
                )}
            </DataTableBody>
        </DataTable>
    )
}
