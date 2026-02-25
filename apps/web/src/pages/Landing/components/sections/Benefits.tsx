import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { makeStyles } from '@/theme/makeStyles'
import { icons } from 'lucide-react'

interface BenefitsProps {
  icon: keyof typeof icons
  title: string
  description: string
}

const benefitList: BenefitsProps[] = [
  {
    icon: 'Shield',
    title: 'Secure by Default',
    description:
      'Authentication and authorization are handled out of the box with Keycloak. Role-based access control keeps your data safe.',
  },
  {
    icon: 'Zap',
    title: 'Fast to Ship',
    description:
      'Skip the boilerplate setup. Start building your core features on day one with a production-ready stack already configured.',
  },
  {
    icon: 'CreditCard',
    title: 'Payments Ready',
    description:
      'Stripe integration is pre-wired with subscription management, webhooks, and billing pages included.',
  },
  {
    icon: 'Bot',
    title: 'AI Built In',
    description:
      'LLM chat with conversation history is ready to use. Swap the model or extend the context to fit your use case.',
  },
]

const useStyles = makeStyles()((theme) => ({
  section: {
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '6rem',
    paddingBottom: '6rem',
    [theme.bp.sm]: {
      paddingTop: '8rem',
      paddingBottom: '8rem',
    },
  },
  grid: {
    display: 'grid',
    placeItems: 'center',
    [theme.bp.lg]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '6rem',
    },
  },
  sectionLabel: {
    marginBottom: '0.5rem',
    fontSize: '1.125rem',
    letterSpacing: '0.05em',
    color: theme.colors.primary,
  },
  sectionTitle: {
    marginBottom: '1rem',
    fontSize: '1.875rem',
    fontWeight: 700,
    [theme.bp.md]: {
      fontSize: '2.25rem',
    },
  },
  sectionSubtitle: {
    marginBottom: '2rem',
    fontSize: '1.25rem',
    color: theme.colors.mutedForeground,
  },
  cardsGrid: {
    display: 'grid',
    width: '100%',
    gap: '1rem',
    [theme.bp.lg]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  card: {
    backgroundColor: theme.colors.mutedAlpha50,
    transition: 'background-color 0.15s ease 75ms',
    '&:hover': {
      backgroundColor: theme.colors.background,
    },
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconEl: {
    marginBottom: '1.5rem',
    color: theme.colors.primary,
  },
  indexNumber: {
    fontSize: '3rem',
    fontWeight: 500,
    color: theme.colors.mutedForeground,
    opacity: 0.15,
    transition: 'opacity 0.15s ease 75ms',
    '$card:hover &': {
      opacity: 0.3,
    },
  },
  cardContent: {
    color: theme.colors.mutedForeground,
  },
}))

export const BenefitsSection = () => {
  const { classes, theme } = useStyles()

  return (
    <section className={classes.section} id="benefits">
      <div className={classes.grid}>
        <div>
          <h2 className={classes.sectionLabel}>Benefits</h2>

          <h2 className={classes.sectionTitle}>
            Everything you need, nothing you don&apos;t
          </h2>
          <p className={classes.sectionSubtitle}>
            This boilerplate covers the infrastructure every SaaS needs so you
            can focus entirely on what makes your product unique.
          </p>
        </div>

        <div className={classes.cardsGrid}>
          {benefitList.map(({ icon, title, description }, index) => (
            <Card key={title} className={classes.card}>
              <CardHeader>
                <div className={classes.cardHeaderRow}>
                  <Icon
                    className={classes.iconEl}
                    color={theme.colors.primary}
                    name={icon as keyof typeof icons}
                    size={32}
                  />
                  <span className={classes.indexNumber}>0{index + 1}</span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className={classes.cardContent}>
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
