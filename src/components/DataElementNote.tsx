import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    CircularLoader,
    NoticeBox,
    TextAreaField,
} from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useNote } from '../hooks/useNote'

interface DataElementNoteProps {
    id: string
}

export function DataElementNote({ id }: DataElementNoteProps) {
    const { note, loading, busy, error, saveNote, removeNote } = useNote(id)

    const [draft, setDraft] = useState<string | null>(null)
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(() => {
        setDraft(null)
        setConfirmDelete(false)
    }, [note])

    const text = draft ?? note?.text ?? ''

    return (
        <section
            style={{
                borderTop: '1px solid #d5dde5',
                marginTop: '24px',
                paddingTop: '16px',
            }}
        >
            <h3>{i18n.t('Notes')}</h3>

            {loading && !note ? (
                <CircularLoader small />
            ) : error ? (
                <NoticeBox error title={i18n.t('Unable to load note')}>
                    {error.message}
                </NoticeBox>
            ) : (
                <>
                    <TextAreaField
                        label={i18n.t('Data element note')}
                        placeholder={i18n.t('Write a note here...')}
                        value={text}
                        onChange={({ value }) => setDraft(value ?? '')}
                        disabled={busy || confirmDelete}
                        rows={4}
                    />

                    {note && (
                        <p style={{ fontSize: '12px' }}>
                            {i18n.t('Last updated')}:{' '}
                            {new Date(note.updatedAt).toLocaleString()}
                        </p>
                    )}

                    <div style={{ marginTop: '12px' }}>
                        {confirmDelete ? (
                            <NoticeBox warning title={i18n.t('Delete note?')}>
                                <p>
                                    {i18n.t(
                                        'Are you sure you want to delete this note?'
                                    )}
                                </p>

                                <ButtonStrip end>
                                    <Button
                                        secondary
                                        disabled={busy}
                                        onClick={() => setConfirmDelete(false)}
                                    >
                                        {i18n.t('Cancel')}
                                    </Button>

                                    <Button
                                        destructive
                                        disabled={busy}
                                        onClick={() => {
                                            setConfirmDelete(false)
                                            removeNote()
                                        }}
                                    >
                                        {i18n.t('Confirm delete')}
                                    </Button>
                                </ButtonStrip>
                            </NoticeBox>
                        ) : (
                            <ButtonStrip end>
                                <Button
                                    destructive
                                    disabled={busy || !note}
                                    onClick={() => setConfirmDelete(true)}
                                >
                                    {i18n.t('Delete')}
                                </Button>

                                <Button
                                    primary
                                    disabled={
                                        busy ||
                                        !text.trim() ||
                                        text.trim() === note?.text
                                    }
                                    onClick={() => saveNote(text)}
                                >
                                    {i18n.t('Save')}
                                </Button>
                            </ButtonStrip>
                        )}
                    </div>
                </>
            )}
        </section>
    )
}
