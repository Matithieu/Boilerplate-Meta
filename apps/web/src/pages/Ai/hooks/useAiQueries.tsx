import { useStreamAi } from '@/hooks/useStreamAi'
import { MessageHistory } from '@/types/index.types'
import {
  deleteConversationById,
  fetchAllUserConversationsDetails,
  fetchConversationDetails,
  fetchConversationMessages,
} from '@/utils/api/queries'
import { isNotNullOrUndefined } from '@/utils/assertion.util'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAllConversationsDetailsQuery = () =>
  useQuery({
    queryKey: ['conversationsHistory'],
    queryFn: () => fetchAllUserConversationsDetails(),
  })

type SingleConversationHistoryParams = {
  conversationId: string
  enabled: boolean
}
export const useConversationDetailsQuery = ({
  conversationId,
  enabled,
}: SingleConversationHistoryParams) =>
  useQuery({
    queryKey: ['singleConversationHistory', conversationId],
    queryFn: () => fetchConversationDetails({ conversationId }),
    enabled,
  })

export const useConversationMessagesQuery = (
  conversationId: string | undefined,
) =>
  useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () =>
      fetchConversationMessages({ conversationId: conversationId! }),
    enabled: isNotNullOrUndefined(conversationId),
  })

export const useAiConversationStream = (
  currentConversationId: string | undefined,
) =>
  useStreamAi({
    url: '/v1/conversations/{conversationId}/messages',
    parameters: {
      pathVariable: {
        conversationId: isNotNullOrUndefined(currentConversationId)
          ? currentConversationId
          : 'new', // 'new' is special case for creating a new conversation (backend handles it)
      },
    },
  })

type DeleteConversationMutationParams = {
  currentConversationId: string | undefined
  setCurrentConversationId: (conversationId: string | undefined) => void
  setCurrentConversation: (
    conversation: Array<MessageHistory> | undefined,
  ) => void
  allConversationsDetails:
    | Array<{
        conversationId: string
      }>
    | undefined
}

export const useDeleteConversationMutation = ({
  allConversationsDetails,
  currentConversationId,
  setCurrentConversation,
  setCurrentConversationId,
}: DeleteConversationMutationParams) =>
  useMutation({
    mutationFn: (conversationId: string) =>
      deleteConversationById({ conversationId }),
    onSuccess: (_, conversationId) => {
      // If the deleted conversation is the current one, reset the current conversation
      if (conversationId === currentConversationId) {
        setCurrentConversationId(undefined)
        setCurrentConversation(undefined)
        window.history.replaceState(null, '', window.location.pathname)
      }

      // Remove the conversation from the history
      if (allConversationsDetails) {
        const updatedConversations = allConversationsDetails.filter(
          (conv) => conv.conversationId !== conversationId,
        )
        allConversationsDetails.length = 0
        allConversationsDetails.push(...updatedConversations)
      }
    },
  })
