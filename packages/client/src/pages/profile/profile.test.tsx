import { render, screen } from '@testing-library/react'
import Profile from './Profile'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const appContent = 'Профиль'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

describe('Example test', () => {
  const initialState = {
    userData: {
      user: {
        id: 1,
      },
    },
  }
  const mockStore = configureStore()
  let store

  it('Shows appContent', () => {
    store = mockStore(initialState)
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )

    expect(screen.getByText(appContent)).toBeDefined()
  })
})
