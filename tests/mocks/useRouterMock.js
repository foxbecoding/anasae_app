import { vi } from 'vitest'

let useRouterMock = vi.fn(() => {
    return { 
        push: vi.fn((name) => name = 'index'),
        replace: vi.fn()
    }
})

export default useRouterMock