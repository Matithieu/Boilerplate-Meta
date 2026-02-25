import useConfigurationStore from '@/stores/ConfigurationStore'
import useUserStore from '@/stores/UserStore'
import posthog, { PostHogConfig } from 'posthog-js'
import { PostHogProvider as PostHog } from 'posthog-js/react'
import { FC, ReactNode, useEffect } from 'react'

type PostHogProps = {
  children: ReactNode
}

const PostHogProvider: FC<PostHogProps> = ({ children }) => {
  const { user } = useUserStore()
  const { configuration } = useConfigurationStore()

  const options: Partial<PostHogConfig> = {
    api_host: configuration?.publicPostHogHost,
  }

  useEffect(() => {
    if (user) posthog.identify(user.id, { email: user.email })
  }, [user])

  // Avoid sending events in development
  if (window.location.host.match('localhost')) return <>{children}</>

  return (
    <PostHog apiKey={configuration?.publicPostHogKey ?? ''} options={options}>
      {children}
    </PostHog>
  )
}

export default PostHogProvider
