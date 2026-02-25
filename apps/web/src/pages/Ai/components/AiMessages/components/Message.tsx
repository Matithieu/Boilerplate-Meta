import JumpingDots from '@/components/common/JumpingDots/JumpingDots'
import { MessageHistory } from '@/types/index.types'
import { FC, useState } from 'react'
import Markdown from 'react-markdown'

const Message: FC<MessageHistory> = ({ message, messageType, timestamp }) => {
  const [isMessageHovered, setIsMessageHovered] = useState<boolean>(false)

  return (
    <div
      style={{
        textAlign: messageType === 'USER' ? 'right' : 'left',
        backgroundColor: messageType === 'USER' ? '#e0f7fa' : '#f1f8e9',
        padding: '8px',
      }}
      onMouseEnter={() => setIsMessageHovered(true)}
      onMouseLeave={() => setIsMessageHovered(false)}
    >
      {/** The height is not the same, when switching from loading to text, the page jumps a little*/}
      <div style={{ minHeight: '24px' }}>
        {message.length === 0 ? (
          <JumpingDots />
        ) : (
          <Markdown
            components={{
              code: ({ ...props }) => (
                <code
                  style={{
                    display: 'block',
                    backgroundColor: '#f4f4f4',
                    padding: '10px',
                    borderRadius: '5px',
                    overflow: 'auto',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre',
                  }}
                  {...props}
                />
              ),
              p: ({ ...props }) => <p style={{ margin: '8px 0' }} {...props} />,
            }}
          >
            {message}
          </Markdown>
        )}
      </div>
      <div
        style={{
          fontSize: '0.8em',
          color: '#555',
          minHeight: '19px',
          opacity: isMessageHovered ? 1 : 0,
        }}
      >
        {new Date(timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  )
}

export default Message
