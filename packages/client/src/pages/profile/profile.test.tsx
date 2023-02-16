import { render, screen } from '@testing-library/react'
import Profile from './Profile'

const appContent = 'Профиль'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<Profile />)
  expect(screen.getByText(appContent)).toBeDefined()
})
