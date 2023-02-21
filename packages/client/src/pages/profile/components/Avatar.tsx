import { ChangeEvent, FC } from 'react'
import { Form, Image } from 'react-bootstrap'
import api from '../../../api'
import avatarImage from './../../../assets/images/avatar.png'

interface AvatarProps {
  src: string;
  setValue: (k: string, v: string) => void;
}

const Avatar: FC<AvatarProps> = ({src, setValue}) => {
  const selectAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    //upload by API
    const file = e?.target?.files![0]
    api.users.avatar(file).then(() => {
      // для мгновенного отображения нового аватара
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setValue(e.target.id, fileReader.result as string)
      }
      fileReader.readAsDataURL(file)
    })
  }

  return <Form.Group controlId="avatar" className="mb-3">
    <Form.Label className="avatar-edit">
      <Image src={src || avatarImage}/>
      <Form.Control onChange={selectAvatar} type="file" accept="image/*"/>
    </Form.Label>
  </Form.Group>
}

export default Avatar
