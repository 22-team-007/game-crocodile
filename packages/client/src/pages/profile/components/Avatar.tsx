import { ChangeEvent, FC } from 'react'
import { Form, Image } from 'react-bootstrap'
import api from '../../../api'

interface AvatarProps {
  src: string
  setValue: (k: string, v: string) => void
}

const Avatar: FC<AvatarProps> = ({ src, setValue }) => {
  const selectAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    //upload by API
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      api.users.avatar(file).then(url => {
        setValue(e.target.id, api.resources.url(url))
      })
    }
  }

  return (
    <Form.Group controlId="avatar" className="mb-3">
      <Form.Label className="avatar-edit">
        <Image src={src} />
        <Form.Control onChange={selectAvatar} type="file" accept="image/*" />
      </Form.Label>
    </Form.Group>
  )
}

export default Avatar
