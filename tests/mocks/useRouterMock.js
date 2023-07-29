import { vi } from 'vitest'

const router = useRouter().

let useRouterMock = vi.fn(() => {
    return { 
        push: vi.fn((name) => name = 'index'),
        replace: vi.fn()
    }
})

export default useRouterMock