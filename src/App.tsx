import i18n from '@dhis2/d2-i18n'
import { CircularLoader, NoticeBox, Pagination } from '@dhis2/ui'
import React, { FC } from 'react'
import { DataElementFilters } from './components/DataElementFilters'
import { DataElementsTable } from './components/DataElementsTable'
import { useDataElements } from './hooks/useDataElements'
import classes from '@/App.module.css'

const App: FC = () => {
    const {
        dataElements,
        pager,
        loading,
        fetching,
        error,
        search,
        setSearch,
        valueType,
        setValueType,
        changePage,
    } = useDataElements()

    return (
        <div className={classes.container}>
            <h1>{i18n.t('Data Element Explorer')}</h1>

            <DataElementFilters
                search={search}
                valueType={valueType}
                onSearchChange={setSearch}
                onValueTypeChange={setValueType}
            />

            {loading || fetching ? (
                <CircularLoader />
            ) : error ? (
                <NoticeBox error title={i18n.t('Unable to load data elements')}>
                    {error.message}
                </NoticeBox>
            ) : (
                <>
                    <DataElementsTable dataElements={dataElements} />

                    {pager && pager.pageCount > 0 && (
                        <Pagination
                            page={pager.page}
                            pageCount={pager.pageCount}
                            pageSize={pager.pageSize}
                            total={pager.total}
                            onPageChange={changePage}
                            hidePageSizeSelect
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default App
