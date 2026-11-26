const NOTES_RESOURCE = 'dataStore/data-element-explorer'

const getNoteId = (variables: object): string => {
    if ('id' in variables && typeof variables.id === 'string') {
        return variables.id
    }

    throw new Error('A data element ID is required')
}

const getNoteData = (variables: object) => {
    if (
        'text' in variables &&
        typeof variables.text === 'string' &&
        'updatedAt' in variables &&
        typeof variables.updatedAt === 'string'
    ) {
        return {
            text: variables.text,
            updatedAt: variables.updatedAt,
        }
    }

    throw new Error('Valid note data is required')
}

export const noteQuery = {
    note: {
        resource: NOTES_RESOURCE,
        id: getNoteId,
    },
}

export const createNoteMutation = (id: string) => ({
    resource: `${NOTES_RESOURCE}/${id}`,
    type: 'create' as const,
    data: getNoteData,
})

export const updateNoteMutation = (id: string) => ({
    resource: NOTES_RESOURCE,
    type: 'update' as const,
    id,
    data: getNoteData,
})

export const deleteNoteMutation = (id: string) => ({
    resource: NOTES_RESOURCE,
    type: 'delete' as const,
    id,
})
