import { ComponentType } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div className="container">
      <h2>Что-то пошло не так:</h2>
      <hr />
      <pre>{error?.message}</pre>
    </div>
  )
}

export default function withErrorBoundary(WrappedComponent: ComponentType) {
  const Component = () => {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <WrappedComponent />
      </ErrorBoundary>
    )
  }

  return Component
}
