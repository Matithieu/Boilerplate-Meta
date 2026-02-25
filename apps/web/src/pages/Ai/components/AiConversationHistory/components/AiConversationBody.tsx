import Button from '@/components/ui/button'
import { ConversationHistory } from '@/types/index.types'
import { PenLine } from 'lucide-react'
import { FC } from 'react'

import AiConversation from './AiConversation'

type AiConversationBodyProps = {
  isLoading: boolean
  conversations: Array<ConversationHistory> | undefined
  currentConversationId: string
  onDeleteConversation: (conversationId: string) => void
  onSelectConversation: (conversationId: string) => void
  onNewConversation: () => void
}

const AiConversationBody: FC<AiConversationBodyProps> = ({
  conversations,
  currentConversationId,
  isLoading,
  onDeleteConversation,
  onNewConversation,
  onSelectConversation,
}) => {
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!conversations || conversations.length === 0) {
    return <div>No conversations available.</div>
  }

  return (
    <>
      <ul>
        <li
          style={{
            padding: '10px',
            cursor: 'pointer',
            marginBottom: '10px',
            borderRadius: '4px',
          }}
          onClick={onNewConversation}
        >
          <Button style={{ width: '100%' }}>
            <PenLine
              style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }}
            />
            New Conversation
          </Button>
        </li>

        {conversations.map((conversation, index) => (
          <AiConversation
            key={index}
            conversation={conversation}
            currentConversationId={currentConversationId}
            onDeleteConversation={onDeleteConversation}
            onSelectConversation={onSelectConversation}
          />
        ))}
      </ul>
    </>
  )
}

export default AiConversationBody
