import { create } from 'zustand'

import { User } from '../types/index.types'

type Store = {
  user: User | null
  setUser: (user: Partial<User> | null) => void
}

const useUserStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user as User | null })),
}))

export default useUserStore
