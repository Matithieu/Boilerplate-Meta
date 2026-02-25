import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { makeStyles } from '@/theme/makeStyles'
import { icons } from 'lucide-react'

interface FeaturesProps {
  icon: keyof typeof icons
  title: string
  description: string
}

const featureList: FeaturesProps[] = [
  {
    icon: 'KeyRound',
    title: 'Keycloak Auth',
    description:
      'OAuth2/OIDC authentication with JWT, role-based access control, and user management through Keycloak.',
  },
  {
    icon: 'CreditCard',
    title: 'Stripe Payments',
    description:
      'Subscription billing with trial support, webhook handling, and order confirmation flows.',
  },
  {
    icon: 'Bot',
    title: 'AI Chat',
    description:
      'LLM-powered chat with persistent conversation history. Plug in any OpenAI-compatible model.',
  },
  {
    icon: 'Users',
    title: 'User Profiles',
    description:
      'Account management, profile editing, and user settings pages ready out of the box.',
  },
  {
    icon: 'Globe',
    title: 'Internationalization',
    description:
      'React Intl is set up with message extraction. Add new locales by dropping in a translation file.',
  },
  {
    icon: 'ChartBar',
    title: 'Observability',
    description:
      'Prometheus metrics and Grafana dashboards pre-configured for both the API and Keycloak.',
  },
]

const useStyles = makeStyles()((theme) => ({
  section: {
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    [theme.bp.sm]: {
      paddingTop: '4rem',
      paddingBottom: '4rem',
    },
  },
  sectionLabel: {
    marginBottom: '0.5rem',
    textAlign: 'center',
    fontSize: '1.125rem',
    letterSpacing: '0.05em',
    color: theme.colors.primary,
  },
  sectionTitle: {
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '1.875rem',
    fontWeight: 700,
    [theme.bp.md]: {
      fontSize: '2.25rem',
    },
  },
  sectionSubtitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2rem',
    textAlign: 'center',
    fontSize: '1.25rem',
    color: theme.colors.mutedForeground,
    [theme.bp.md]: {
      width: '50%',
    },
  },
  grid: {
    display: 'grid',
    gap: '1rem',
    [theme.bp.sm]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.bp.lg]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  card: {
    height: '100%',
    border: 0,
    backgroundColor: theme.colors.background,
    boxShadow: 'none',
  },
  iconWrapper: {
    marginBottom: '1rem',
    borderRadius: '9999px',
    padding: '0.5rem',
    boxShadow: `0 0 0 8px`,
  },
  cardContent: {
    textAlign: 'center',
    color: theme.colors.mutedForeground,
  },
}))

export const FeaturesSection = () => {
  const { classes, theme } = useStyles()

  return (
    <section className={classes.section} id="features">
      <h2 className={classes.sectionLabel}>Features</h2>

      <h2 className={classes.sectionTitle}>What&apos;s included</h2>

      <h3 className={classes.sectionSubtitle}>
        Every layer of the stack is pre-configured and wired together so you can
        focus on your product instead of infrastructure.
      </h3>

      <div className={classes.grid}>
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className={classes.card}>
              <CardHeader
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div className={classes.iconWrapper}>
                  <Icon
                    color={theme.colors.primary}
                    name={icon as keyof typeof icons}
                    size={24}
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className={classes.cardContent}>
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
