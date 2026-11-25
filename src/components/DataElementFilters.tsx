import i18n from '@dhis2/d2-i18n'
import { InputField, SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import React from 'react'

interface DataElementFiltersProps {
    search: string
    valueType: string
    onSearchChange: (search: string) => void
    onValueTypeChange: (valueType: string) => void
}

export function DataElementFilters({
    search,
    valueType,
    onSearchChange,
    onValueTypeChange,
}: DataElementFiltersProps) {
    return (
        <div
            style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '16px',
                flexWrap: 'wrap',
            }}
        >
            <div style={{ flex: '1', minWidth: '240px' }}>
                <InputField
                    name="search"
                    label={i18n.t('Search by name')}
                    placeholder={i18n.t('Search data elements...')}
                    value={search}
                    onChange={({ value }: { value?: string }) =>
                        onSearchChange(value ?? '')
                    }
                />
            </div>

            <div style={{ minWidth: '200px' }}>
                <SingleSelectField
                    label={i18n.t('Value type')}
                    selected={valueType}
                    onChange={({ selected }: { selected: string }) =>
                        onValueTypeChange(selected)
                    }
                >
                    <SingleSelectOption label={i18n.t('All')} value="All" />
                    <SingleSelectOption label={i18n.t('TEXT')} value="TEXT" />
                    <SingleSelectOption
                        label={i18n.t('NUMBER')}
                        value="NUMBER"
                    />
                    <SingleSelectOption
                        label={i18n.t('INTEGER')}
                        value="INTEGER"
                    />
                    <SingleSelectOption
                        label={i18n.t('BOOLEAN')}
                        value="BOOLEAN"
                    />
                    <SingleSelectOption label={i18n.t('DATE')} value="DATE" />
                </SingleSelectField>
            </div>
        </div>
    )
}
