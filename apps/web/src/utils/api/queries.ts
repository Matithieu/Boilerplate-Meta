import { operations } from '@/types/codegen/api'

import { customFetch } from './network/customFetch'

/**
 *
 * User
 *
 */
export async function fetchUser() {
  return await customFetch('/v1/users/me', 'get')
}

export async function updateUser(
  query: operations['updateUser']['parameters']['query'],
) {
  return await customFetch('/v1/users/me', 'put', {
    parameters: { query },
  })
}

// Configuration
export async function fetchConfiguration() {
  return await customFetch('/v1/configuration/', 'get')
}

// Stripe
export async function startStripeSubscription(
  header: operations['newSubscriptionWithTrial']['parameters']['header'],
) {
  return await customFetch('/v1/payments/subscriptions/trial', 'post', {
    parameters: { header },
  })
}

// AI
export async function fetchConversationDetails(
  path: operations['getSingleConversation']['parameters']['path'],
) {
  return await customFetch(`/v1/conversations/{conversationId}`, 'get', {
    parameters: { path },
  })
}

export async function fetchConversationMessages(
  path: operations['getConversationHistory']['parameters']['path'],
) {
  return await customFetch(
    `/v1/conversations/{conversationId}/messages`,
    'get',
    {
      parameters: { path },
    },
  )
}

export async function fetchAllUserConversationsDetails() {
  return await customFetch('/v1/conversations/', 'get')
}

export async function deleteConversationById(
  path: operations['deleteConversation']['parameters']['path'],
) {
  return await customFetch(`/v1/conversations/{conversationId}`, 'delete', {
    parameters: { path },
  })
}
