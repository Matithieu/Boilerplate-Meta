import { Card } from '@/components/ui/card'
import { makeStyles } from '@/theme/makeStyles'
import { FC } from 'react'

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
    textAlign: 'center',
    fontSize: '1.875rem',
    fontWeight: 700,
    [theme.bp.md]: {
      fontSize: '2.25rem',
    },
  },
  videoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    [theme.bp.md]: {
      padding: '2rem',
    },
    [theme.bp.lg]: {
      padding: '3rem',
    },
  },
  card: {
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  iframe: {
    borderRadius: theme.radius.lg,
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    height: '16rem',
    width: '100%',
    [theme.bp.sm]: {
      height: '20rem',
    },
    [theme.bp.md]: {
      height: '450px',
      width: '700px',
    },
    [theme.bp.lg]: {
      height: '600px',
      width: '900px',
    },
  },
}))

const Tutorial: FC = () => {
  const { classes } = useStyles()

  return (
    <section className={classes.section}>
      <h2 className={classes.sectionLabel}>Tutorial</h2>

      <h2 className={classes.sectionTitle}>See it in action</h2>

      <div
        aria-label="Video Tutorial Section"
        className={classes.videoContainer}
        id="tutorial"
      >
        <Card className={classes.card}>
          {/* Replace the src with your own demo video URL */}
          <iframe
            allowFullScreen
            allow="autoplay; picture-in-picture;"
            className={classes.iframe}
            loading="lazy"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
            title="Product Demo"
          />
        </Card>
      </div>
    </section>
  )
}

export default Tutorial
