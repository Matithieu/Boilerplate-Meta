import { Separator } from '@/components/ui/separator'
import { makeStyles } from '@/theme/makeStyles'
import { ChevronsDownIcon } from 'lucide-react'

const useStyles = makeStyles()((theme) => ({
  footer: {
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
  card: {
    borderRadius: '1rem',
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.card,
    padding: '2.5rem',
  },
  grid: {
    display: 'grid',
    columnGap: '3rem',
    rowGap: '2rem',
    [theme.bp.md]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  logoSection: {
    [theme.bp.md]: {
      gridColumn: 'span 1',
    },
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: theme.fontWeight.bold,
  },
  icon: {
    marginRight: '0.5rem',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    background: `linear-gradient(to top right, ${theme.colors.primary}, hsl(var(--primary) / 0.7), ${theme.colors.primary})`,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    [theme.bp.md]: {
      gridColumn: 'span 3',
    },
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  linkList: {
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  link: {
    opacity: 0.6,
    transition: theme.transitions.fast,
    '&:hover': {
      opacity: 1,
    },
  },
  separator: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  },
}))

export const FooterSection = () => {
  const { classes } = useStyles()

  return (
    <footer className={classes.footer} id="footer">
      <div className={classes.card}>
        <div className={classes.grid}>
          <div className={classes.logoSection}>
            <a className={classes.logoLink} href="#">
              <ChevronsDownIcon className={classes.icon} />
              <h3 className={classes.title}>Boilerplate</h3>
            </a>
          </div>

          <div className={classes.linksGrid}>
            <div>
              <h3 className={classes.sectionTitle}>Contact</h3>
              <ul className={classes.linkList}>
                <li>
                  <a className={classes.link} href="#" target="_blank">
                    Github
                  </a>
                </li>
                <li>
                  <a className={classes.link} href="#" target="_blank">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={classes.sectionTitle}>Help</h3>
              <ul className={classes.linkList}>
                <li>
                  <a className={classes.link} href="#">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className={classes.link} href="#">
                    FAQ
                  </a>
                </li>
                <li>
                  <a className={classes.link} href="#">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className={classes.separator} />
        <section>
          <h3>&copy; {new Date().getFullYear()} Boilerplate</h3>
        </section>
      </div>
    </footer>
  )
}
