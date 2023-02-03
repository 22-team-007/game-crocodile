import { ChangeEvent } from 'react'
import { Form, Image } from 'react-bootstrap'

function Avatar({src, setValue}: Record<string, any>) {
  const selectAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    //upload by API
    fetch(`/`).then(() => {
      setValue(e.target.id, `https://thispersondoesnotexist.com/image?q=${new Date().getTime()}`)
    })
  }
  return <Form.Group controlId="avatar" className="mb-3">
    <Form.Label className="avatar-edit">
      <Image src={src}/>
      <Form.Control onChange={selectAvatar} type="file" accept="image/*"/>
    </Form.Label>
  </Form.Group>
}

export default Avatar
