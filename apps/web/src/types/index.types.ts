import { components } from './codegen/api'

export type User = components['schemas']['UserDTO']
export type Configuration = components['schemas']['Configuration']

export type ChatStreamResponse = components['schemas']['ChatStreamResponseDTO']
export type MessageHistory = components['schemas']['MessageDTO']
export type ConversationHistory = components['schemas']['ConversationDTO']
