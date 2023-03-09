import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { getRouterConf } from './router'

// @ts-ignore
document.fullscreenElement = jest.fn(() => Promise.resolve())

const MockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  Navigate: (props: any) => {
    MockedNavigate(props.to)
    return
  },
}))

let userId = 1

jest.mock('./hooks/useAppSelector', () => ({
  useAppSelector: () => {
    return userId
  },
}))

jest.mock('./utils/sound', () => ({
  fullScreenIn: () => {
    return
  },
  fullScreenOut: () => {
    return
  },
}))

const Testconf = [...getRouterConf('forTest')]

describe('Testing router ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Get index page', async () => {
    const router = createMemoryRouter(Testconf, {
      initialEntries: ['/'],
    })

    await act(() => {
      render(<RouterProvider router={router} />)
    })

    const element = screen.getByText('Правила игры')
    expect(element).toMatchSnapshot()
  })

  test('Private route with registered user', async () => {
    //user is registerd id - 1
    userId = 1

    // @ts-ignore
    global.fetch = jest.fn(() =>
      // fetch empty list of game
      Promise.resolve({ json: () => Promise.resolve([]) })
    )

    const router = createMemoryRouter(Testconf, {
      initialEntries: ['/game'],
    })

    await act(() => {
      render(<RouterProvider router={router} />)
    })

    const element = screen.getByText('Создать игру')
    expect(element).toMatchSnapshot()
  })

  test('Private route with unregistered user', async () => {
    //user is unregistered id - 0
    userId = 0

    const router = createMemoryRouter(Testconf, {
      initialEntries: ['/game'],
    })

    await act(() => {
      render(<RouterProvider router={router} />)
    })

    expect(MockedNavigate).toHaveBeenCalledWith('/signin')
  })
})
