import LoadingCircular from '@/components/common/Loading/LoadingCircular'
import useConfigurationStore from '@/stores/ConfigurationStore'
import { fetchConfiguration } from '@/utils/api/queries'
import { useQuery } from '@tanstack/react-query'
import { FC, ReactNode, useEffect } from 'react'

import { loadEnvConfigFallback } from './configurationProvider.util'

type ConfigurationProps = {
  children: ReactNode
}

const ConfigurationProvider: FC<ConfigurationProps> = ({ children }) => {
  const { configuration, setConfiguration } = useConfigurationStore()

  const { data, error, isPending } = useQuery({
    queryKey: ['env'],
    queryFn: () => fetchConfiguration(),
    enabled: !configuration,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data && !error) setConfiguration(loadEnvConfigFallback(data))
  }, [data, error, setConfiguration])

  if (isPending || !configuration) {
    return <LoadingCircular />
  }

  return <>{children}</>
}

export default ConfigurationProvider
