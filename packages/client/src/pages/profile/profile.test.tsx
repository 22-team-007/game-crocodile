import { ProfileComp } from './Profile'
import { render, screen } from '@testing-library/react'

const appContent = 'Профиль'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<ProfileComp />)
  expect(screen.getByText(appContent)).toBeDefined()
})
