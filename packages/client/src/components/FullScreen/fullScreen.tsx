import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import sound from '../../utils/sound'

const FullScreen = () => {
  const [isFs, setIsFs] = useState(false)

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownHandler)

    return () => window.removeEventListener('keydown', onKeyDownHandler)
  })

  const toggleFS = () => {
    if (
      !document.fullscreenElement &&
      document.documentElement.requestFullscreen
    ) {
      document.documentElement.requestFullscreen()
      sound.fullScreenIn()
      setIsFs(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      sound.fullScreenOut()
      setIsFs(false)
    }
  }

  const onKeyDownHandler = (e: KeyboardEvent) => {
    if (e.key === 'F10') {
      toggleFS()
    }
  }

  const style = isFs ? 'info' : 'outline-info'

  return (
    <Button onClick={toggleFS} variant={style} className="ms-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
        />
      </svg>
    </Button>
  )
}

export default FullScreen
