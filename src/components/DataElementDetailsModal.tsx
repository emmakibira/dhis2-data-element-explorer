import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    CircularLoader,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    NoticeBox,
} from '@dhis2/ui'
import React from 'react'
import { useDataElementDetails } from '../hooks/useDataElementDetails'

interface DataElementDetailsModalProps {
    id: string
    onClose: () => void
}

function formatTimestamp(value?: string | null) {
    return value
        ?.trim()
        .replace('T', ' ')
        .replace(/\.\d+$/, '')
}

export function DataElementDetailsModal({
    id,
    onClose,
}: DataElementDetailsModalProps) {
    const { details, loading, error } = useDataElementDetails(id)

    const fields = [
        {
            label: i18n.t('Name'),
            value: details?.name,
        },
        {
            label: i18n.t('Short name'),
            value: details?.shortName,
        },
        {
            label: i18n.t('Code'),
            value: details?.code,
        },
        {
            label: i18n.t('Description'),
            value: details?.description,
        },
        {
            label: i18n.t('Value type'),
            value: details?.valueType,
        },
        {
            label: i18n.t('Aggregation type'),
            value: details?.aggregationType,
        },
        {
            label: i18n.t('Category combination'),
            value: details?.categoryCombo?.name,
        },
        {
            label: i18n.t('Created'),
            value: formatTimestamp(details?.created),
        },
        {
            label: i18n.t('Last updated'),
            value: formatTimestamp(details?.lastUpdated),
        },
    ]

    return (
        <Modal onClose={onClose}>
            <ModalTitle>{i18n.t('Data element details')}</ModalTitle>

            <ModalContent>
                {loading ? (
                    <CircularLoader />
                ) : error || !details ? (
                    <NoticeBox
                        error
                        title={i18n.t('Unable to load data element details')}
                    >
                        {error?.message ?? i18n.t('No details were returned')}
                    </NoticeBox>
                ) : (
                    <dl
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr',
                            gap: '16px',
                            margin: 0,
                        }}
                    >
                        {fields.map(({ label, value }) => (
                            <React.Fragment key={label}>
                                <dt style={{ fontWeight: 600 }}>{label}</dt>
                                <dd
                                    style={{
                                        margin: 0,
                                        overflowWrap: 'anywhere',
                                    }}
                                >
                                    {value?.trim() || '—'}
                                </dd>
                            </React.Fragment>
                        ))}
                    </dl>
                )}
            </ModalContent>

            <ModalActions>
                <ButtonStrip end>
                    <Button onClick={onClose}>{i18n.t('Close')}</Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}
