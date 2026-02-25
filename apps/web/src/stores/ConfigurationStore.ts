import { create } from 'zustand'

import { Configuration } from '../types/index.types'

type Store = {
  configuration: Configuration | null
  setConfiguration: (env: Partial<Configuration> | null) => void
}

const useConfigurationStore = create<Store>((set) => ({
  configuration: null,
  setConfiguration: (configuration) =>
    set(() => ({ configuration: configuration as Configuration | null })),
}))

export default useConfigurationStore
