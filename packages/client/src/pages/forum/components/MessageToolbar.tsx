// React
import { FC, useRef } from 'react'
// Components
import { Button, ButtonGroup, Dropdown, Form } from 'react-bootstrap'
// SVG
import svgH1 from './../../../assets/msgToolbar/format_h1.svg'
import svgH2 from './../../../assets/msgToolbar/format_h2.svg'
import svgH3 from './../../../assets/msgToolbar/format_h3.svg'
import svgI from './../../../assets/msgToolbar/format_italic.svg'
import svgB from './../../../assets/msgToolbar/format_bold.svg'
import svgLink from './../../../assets/msgToolbar/link.svg'
import svgCode from './../../../assets/msgToolbar/code.svg'
import svgImage from './../../../assets/msgToolbar/image.svg'

export type TextFormattingType =
  'header' |
  'link' |
  'italic' |
  'bold' |
  'insertText' |
  'color' |
  'code' |
  'image'

interface MessageToolbarProps {
  applyFormattingText: (type: TextFormattingType, value?: string | number ) => void,
}

const MessageToolbar: FC<MessageToolbarProps> = ({
  applyFormattingText,
  }) => {

  const colorPickerRef = useRef<HTMLInputElement | null>(null)

  const codes = [
    {
      value: ``,
      text: 'No syntax'
    },
    {
      value: `js`,
      text: 'JavaScript'
    },
    {
      value: `html`,
      text: 'HTML'
    },
    {
      value: `css`,
      text: 'CSS'
    },
  ]

  return (
    <div className="d-flex align-items-center">
      <ButtonGroup className="me-2 mb-1" aria-label="First group">
        <Button variant="light" size="sm" onClick={() => applyFormattingText('italic')}><img src={svgI} alt='italic' /></Button>
        <Button variant="light" size="sm" onClick={() => applyFormattingText('bold')}><img src={svgB} alt='bold' /></Button>
        <Button variant="light" size="sm" onClick={() => applyFormattingText('header', 1)}><img src={svgH1} alt='h1' /></Button>
        <Button variant="light" size="sm" onClick={() => applyFormattingText('header', 2)}><img src={svgH2} alt='h2' /></Button>
        <Button variant="light" size="sm" onClick={() => applyFormattingText('header', 3)}><img src={svgH3} alt='h3' /></Button>
        <Button variant="light" size="sm" onClick={() => applyFormattingText('image')}><img src={svgImage} alt='h3' /></Button>
        <Button variant="light" size="sm" onClick={() => applyFormattingText('link')}><img src={svgLink} alt='link' /></Button>
        <Dropdown>
          <Dropdown.Toggle variant="light" size="sm">
            <img src={svgCode} alt='code' />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {
              codes.map((item) =>
                <Dropdown.Item key={item.text} onClick={() => applyFormattingText('code', item.value)}>{item.text}</Dropdown.Item>
              )
            }
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>

      <Form.Control
        size='sm'
        type="color"
        defaultValue={localStorage.getItem('brushColor') || '#000000'}
        ref={colorPickerRef}
      />
      <Button variant="light" className="mx-1" size={'sm'} onClick={() => applyFormattingText('color', colorPickerRef.current?.value)}>применить цвет</Button>
    </div>
  )
}

export default MessageToolbar
