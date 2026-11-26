import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { useDebounce } from './useDebounce'

function DebounceProbe({ value }: { value: string }) {
    const debouncedValue = useDebounce(value, 300)

    return <span>{debouncedValue}</span>
}

it('updates the value 300ms after the last change', async () => {
    const testGlobals = globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT?: boolean
    }
    const previous = testGlobals.IS_REACT_ACT_ENVIRONMENT

    testGlobals.IS_REACT_ACT_ENVIRONMENT = true
    jest.useFakeTimers()

    const container = document.createElement('div')
    const root = createRoot(container)

    try {
        await act(async () => {
            root.render(<DebounceProbe value="" />)
        })

        await act(async () => {
            root.render(<DebounceProbe value="mal" />)
        })

        await act(async () => {
            jest.advanceTimersByTime(100)
        })

        expect(container.textContent).toBe('')

        await act(async () => {
            root.render(<DebounceProbe value="malaria" />)
        })

        await act(async () => {
            jest.advanceTimersByTime(299)
        })

        expect(container.textContent).toBe('')

        await act(async () => {
            jest.advanceTimersByTime(1)
        })

        expect(container.textContent).toBe('malaria')
    } finally {
        await act(async () => {
            root.unmount()
        })

        jest.useRealTimers()
        testGlobals.IS_REACT_ACT_ENVIRONMENT = previous
    }
})
