import { ChangeEvent, FC } from 'react'
import { Form, Image } from 'react-bootstrap'
import api from '../../../api'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector'
import { usertActions } from '../../../store/actions'


interface AvatarProps {
  src: string
  setValue: (k: string, v: string) => void
}

const Avatar: FC<AvatarProps> = ({ src, setValue }) => {

  const dispatch = useAppDispatch()
  const avatar = useAppSelector(state => state.userData.userAvatar)
  
  const selectAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    //upload by API
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      api.users.avatar(file).then(response => {
        dispatch(usertActions.setAvatar(response))
        setValue(e.target.id, api.resources.url(response))
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
