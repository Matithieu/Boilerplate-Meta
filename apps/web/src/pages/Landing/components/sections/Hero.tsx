import { Badge } from '@/components/ui/badge'
import Button from '@/components/ui/button'
import useAuthManager from '@/hooks/useAuthManager'
import { makeStyles } from '@/theme/makeStyles'
import { ArrowRight } from 'lucide-react'

const useStyles = makeStyles()((theme) => ({
  section: {
    width: '100%',
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  inner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'grid',
    placeItems: 'center',
    gap: '2rem',
    paddingTop: '5rem',
    paddingBottom: '5rem',
    [theme.bp.md]: {
      paddingTop: '8rem',
      paddingBottom: '8rem',
      maxWidth: '1280px',
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    textAlign: 'center',
  },
  headline: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '768px',
    textAlign: 'center',
    '& h1': {
      margin: 0,
      fontSize: '2.25rem',
      fontWeight: 700,
      [theme.bp.md]: {
        fontSize: '3.75rem',
      },
    },
  },
  gradientText: {
    background: `linear-gradient(to right, #D247BF, ${theme.colors.primary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  subtitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '640px',
    fontSize: '1.25rem',
    color: theme.colors.mutedForeground,
  },
  ctaWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    [theme.bp.md]: {
      flexDirection: 'row',
      gap: '1rem',
    },
  },
  ctaButton: {
    width: '83.333%',
    fontWeight: 700,
    [theme.bp.md]: {
      width: '25%',
    },
  },
  arrowIcon: {
    marginLeft: '0.5rem',
    width: '1.25rem',
    height: '1.25rem',
    transition: 'transform 0.15s ease',
    'button:hover &': {
      transform: 'translateX(4px)',
    },
  },
}))

export const HeroSection = () => {
  const { signIn } = useAuthManager()
  const { classes } = useStyles()

  return (
    <section className={classes.section}>
      <div className={classes.inner}>
        <div className={classes.contentWrapper}>
          <Badge
            style={{
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              fontSize: '0.875rem',
            }}
            variant="outline"
          >
            <span style={{ marginRight: '0.5rem', color: 'var(--primary)' }}>
              <Badge>New</Badge>
            </span>
            <span> Your product tagline here </span>
          </Badge>

          <div className={classes.headline}>
            <h1>
              Build your
              <span className={classes.gradientText}>product</span>
              faster
            </h1>
          </div>

          <p className={classes.subtitle}>
            A modern full-stack boilerplate with authentication, payments, and
            AI out of the box. Replace this copy with your own value
            proposition.
          </p>

          <div className={classes.ctaWrapper}>
            <Button
              className={classes.ctaButton}
              onClick={() => {
                signIn()
              }}
            >
              Get started
              <ArrowRight className={classes.arrowIcon} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
