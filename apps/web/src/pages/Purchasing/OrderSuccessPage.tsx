import Button from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2 } from 'lucide-react'
import { FC } from 'react'

import useAuthManager from '../../hooks/useAuthManager'
import { formatMessage } from '../../services/intl/intl'
import useUserStore from '../../stores/UserStore'
import purchasingMessages from './purchasing.messages'

const OrderSuccessPage: FC = () => {
  // const queryParams = new URLSearchParams(window.location.search)
  const { setUser } = useUserStore()
  const { signIn } = useAuthManager()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        marginTop: '7rem',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          borderRadius: '0.5rem',
          backgroundColor: 'hsl(var(--muted))',
          padding: '1.25rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <CheckCircle2
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '4rem',
              height: '4rem',
              color: 'rgb(34, 197, 94)',
            }}
          />
          <h4
            style={{
              marginBottom: '0.25rem',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
          >
            {formatMessage(purchasingMessages.thankYouForYourOrder)}
          </h4>
          <p style={{ fontSize: '0.875rem' }}>
            {formatMessage(purchasingMessages.thankYouForYourOrder)}
          </p>
        </div>

        <Separator style={{ marginBottom: '1.25rem' }} />

        <Button
          style={{ marginTop: '1.25rem', width: '100%' }}
          onClick={() => {
            setUser(null)
            // Going through signIn flow refresh the token inside the oauth2 proxy
            // Allowing the roles inside the token to be updated
            signIn()
          }}
        >
          Let&apos;s go !
        </Button>
      </div>
    </div>
  )
}

export default OrderSuccessPage
