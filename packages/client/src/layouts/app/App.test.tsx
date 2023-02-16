import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(
    <Router>
      <App />
    </Router>
  )

  const dogImages = screen.getAllByRole('link')
  expect(dogImages).toHaveLength(5)
})
