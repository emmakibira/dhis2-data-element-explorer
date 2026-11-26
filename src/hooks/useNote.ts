import { useAlert, useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    createNoteMutation,
    deleteNoteMutation,
    noteQuery,
    updateNoteMutation,
} from '../api/notes'
import type { DataElementNoteResponse } from '../types/dataElement'

function isNotFound(error: unknown): boolean {
    if (!error || typeof error !== 'object') {
        return false
    }

    if ('type' in error && error.type === 'not-found') {
        return true
    }

    if ('status' in error && error.status === 404) {
        return true
    }

    if ('details' in error) {
        const details = error.details

        return (
            typeof details === 'object' &&
            details !== null &&
            'httpStatusCode' in details &&
            details.httpStatusCode === 404
        )
    }

    return false
}

export function useNote(id: string) {
    const { show: showSaved } = useAlert(i18n.t('Note saved successfully'), {
        success: true,
    })

    const { show: showDeleted } = useAlert(
        i18n.t('Note deleted successfully'),
        { success: true }
    )

    const { show: showError } = useAlert(
        i18n.t('Unable to complete the note request'),
        { critical: true }
    )

    const { data, loading, fetching, error, refetch } =
        useDataQuery<DataElementNoteResponse>(noteQuery, {
            variables: { id },
            onError: (queryError) => {
                if (!isNotFound(queryError)) {
                    showError()
                }
            },
        })

    const handleSaved = () => {
        showSaved()
        void refetch()
    }

    const [createNote, { loading: creating }] = useDataMutation(
        createNoteMutation(id),
        {
            onComplete: handleSaved,
            onError: () => showError(),
        }
    )

    const [updateNote, { loading: updating }] = useDataMutation(
        updateNoteMutation(id),
        {
            onComplete: handleSaved,
            onError: () => showError(),
        }
    )

    const [deleteNote, { loading: deleting }] = useDataMutation(
        deleteNoteMutation(id),
        {
            onComplete: () => {
                showDeleted()
                void refetch()
            },
            onError: () => showError(),
        }
    )

    const missing = isNotFound(error)
    const note = missing ? null : (data?.note ?? null)
    const loadError = missing ? undefined : error
    const busy = loading || fetching || creating || updating || deleting

    const saveNote = (text: string) => {
        if (busy || loadError || !text.trim()) {
            return
        }

        const variables = {
            id,
            text: text.trim(),
            updatedAt: new Date().toISOString(),
        }

        if (note) {
            void updateNote(variables)
        } else {
            void createNote(variables)
        }
    }

    const removeNote = () => {
        if (busy || loadError || !note) {
            return
        }

        void deleteNote({ id })
    }

    return {
        note,
        loading: loading || fetching,
        busy,
        error: loadError,
        saveNote,
        removeNote,
    }
}
