// React
import { ChangeEvent, FC, useCallback, useRef } from 'react'
// Components
import { Button, Form, Tab, Tabs } from 'react-bootstrap'
import { MarkDown, MessageToolbar } from './index'
import { TextFormattingType } from './MessageToolbar'
// Hooks
import { useController, UseControllerProps } from 'react-hook-form'

type MessageFormType = 'create' | 'edit' | 'comment'

interface MessageFormProps {
  editMode?: boolean
  mode?: MessageFormType
  customRegister: UseControllerProps<FormFieldsTheme>
}

const MessageForm: FC<MessageFormProps> = ({ mode = 'comment', customRegister }) => {

  const {field: messageField} = useController(customRegister)

  const messageRef = useRef<HTMLTextAreaElement | null>(null)

  const applyFormattingText = useCallback((type: TextFormattingType = 'insertText', value?: string | number) => {
    if (messageRef.current) {
      //ищем первое положение выделенного символа
      const start = messageRef.current.selectionStart

      //ищем последнее положение выделенного символа
      const end = messageRef.current.selectionEnd

      // выделенный текст
      const selection = messageRef.current.value.substring(start, end)

      let finText: string
      let selectionOffset: number = selection.length

      switch (type) {
        case 'insertText':
          finText = messageRef.current.value.substring(0, start) + value + messageRef.current.value.substring(end)
          selectionOffset = (value as string).length
          break
        case 'bold':
          finText = messageRef.current.value.substring(0, start) + '**' + selection + '**' + messageRef.current.value.substring(end)
          selectionOffset = 2
          break
        case 'italic':
          finText = messageRef.current.value.substring(0, start) + '_' + selection + '_' + messageRef.current.value.substring(end)
          selectionOffset = 2
          break
        case 'header':
          finText = messageRef.current.value.substring(0, start) + '#'.repeat(value as number) + ' ' + selection + messageRef.current.value.substring(end)
          selectionOffset = selection.length + (value as number)
          break
        case 'color':
          finText = messageRef.current.value.substring(0, start) + `<span style='color:${value}'>${selection}</span>` + messageRef.current.value.substring(end)
          break
        case 'link':
          finText = messageRef.current.value.substring(0, start) + `[${selection}](url)` + messageRef.current.value.substring(end)
          break
        case 'code':
          finText = messageRef.current.value.substring(0, start) + `\n~~~${value}\n${selection}\n~~~\n` + messageRef.current.value.substring(end)
          break
        case 'image':
          finText = messageRef.current.value.substring(0, start) + '![image](url)' + messageRef.current.value.substring(end)
          break
        default:
          return
      }

      // подмена значения
      messageField.onChange(finText)

      // возвращаем фокус на элемент
      messageRef.current.focus()

      // возвращаем курсор на место - учитываем выделили ли текст или просто курсор поставили
      messageRef.current.selectionEnd = (start == end) ? (end + selectionOffset) : end
    }
  }, [])

  const onChangeMessageHandler = (event: ChangeEvent) => {
    messageField.onChange(event)
  }

  return (
    <>
      <Tabs defaultActiveKey='message' className='mb-3 mt-3'>
        <Tab eventKey='message' title={mode === 'comment' ? 'Комментарий' : 'Содержание темы'}>
          <Form>
            <Form.Group className='mb-3' controlId='comment'>
              <MessageToolbar
                applyFormattingText={applyFormattingText}
              />
              <Form.Control
                style={{ height: '200px' }}
                as='textarea'
                placeholder='Ваше сообщение'
                ref={messageRef}
                value={messageField.value}
                onChange={onChangeMessageHandler}
              />
            </Form.Group>
          </Form>
        </Tab>

        <Tab className='preview-block' eventKey='preview' title='Предпросмотр'>
          {
            messageField.value ?
              <MarkDown text={messageField.value} />
              :
              <p>Для отображения предпросмотра напишите сообщение в соседней вкладке</p>
          }
        </Tab>
      </Tabs>
    </>
  )
}

export default MessageForm
