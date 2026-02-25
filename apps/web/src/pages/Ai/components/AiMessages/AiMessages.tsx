import { MessageHistory } from '@/types/index.types'
import { FC } from 'react'

import Message from './components/Message'

type AIMessageProps = { messages: Array<MessageHistory> | undefined }

const AiMessages: FC<AIMessageProps> = ({ messages }) => {
  if (messages === undefined || null) {
    return (
      <div
        style={{
          color: 'gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90%',
        }}
      >
        How is your day going ?
      </div>
    )
  }

  return (
    <div
      style={{
        borderWidth: '1px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {messages.map(({ message, messageType, timestamp }, index) => (
        <Message
          key={index}
          message={message}
          messageType={messageType}
          timestamp={timestamp}
        />
      ))}
    </div>
  )
}

export default AiMessages
