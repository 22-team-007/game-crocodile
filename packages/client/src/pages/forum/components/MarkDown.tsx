import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import ReactMarkdown from 'react-markdown'
import { FC } from 'react'

interface MarkDownProps {
  text: string
}

const MarkDown: FC<MarkDownProps> = ({text}) => {
  return (
    <ReactMarkdown
      children={text}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            // @ts-ignore
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    />
  )
}

export default MarkDown
