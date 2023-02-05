import App from './App'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

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
  expect(dogImages).toHaveLength(10)
})
