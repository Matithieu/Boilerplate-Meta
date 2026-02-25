import {
  LoginButton,
  LogoutButton,
} from '@/components/common/Buttons/AuthButtons'
import Button from '@/components/ui/button'
// TODO: navigation-menu component needs to be created or replaced
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShadCNModeToggle } from '@/containers/ShadCN/mode-toggle'
import useToggle from '@/hooks/useToggle'
import useUserStore from '@/stores/UserStore'
import { makeStyles } from '@/theme/makeStyles'
import { ChevronsDown, Menu } from 'lucide-react'
import { useEffect } from 'react'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: '/ui#testimonials',
    label: 'Témoinages',
  },
  {
    href: '/ui#pricing',
    label: 'Pricing',
  },
  {
    href: '/ui#faq',
    label: 'FAQ',
  },
]

const useStyles = makeStyles()((theme) => ({
  header: {
    position: 'sticky',
    top: '1.25rem',
    zIndex: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.xl,
    border: `1px solid ${theme.colors.secondary}`,
    backgroundColor: theme.colors.card,
    padding: '0.5rem',
    boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    [theme.bp.md]: {
      width: '70%',
    },
    [theme.bp.lg]: {
      width: '75%',
      maxWidth: '1280px',
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.125rem',
    fontWeight: 700,
  },
  logoIcon: {
    marginRight: '0.5rem',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.secondary}`,
    background: `linear-gradient(to top right, ${theme.colors.primary}, ${theme.colors.primary})`,
    color: '#ffffff',
  },
  mobileContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.bp.lg]: {
      display: 'none',
    },
  },
  menuIcon: {
    cursor: 'pointer',
  },
  sheetNavList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  navLink: {
    color: theme.colors.foreground,
    textDecoration: 'none',
    '&:hover': {
      color: theme.colors.primary,
    },
  },
  sheetFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '1rem',
  },
  desktopNav: {
    display: 'none',
    [theme.bp.lg]: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  desktopNavLink: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    fontSize: '1rem',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  desktopActions: {
    display: 'none',
    gap: '1rem',
    [theme.bp.lg]: {
      display: 'flex',
    },
  },
}))

export const Navbar = () => {
  const [isOpen, setIsOpen] = useToggle()
  const { user } = useUserStore()
  const { classes } = useStyles()

  const ButtonToDisplay = () => {
    return user ? <LogoutButton /> : <LoginButton />
  }

  /**
   * When navigating to /ui#hash, scroll to the element with the id of hash
   * The hash can be #pricing, #faq, #testimonials...
   */
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash

      if (hash) {
        const element = document.querySelector(hash)

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)

    // On component mount, handle the current hash
    handleHashChange()

    // Cleanup listener on unmount
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <ChevronsDown className={classes.logoIcon} />
        Web
      </div>

      {/* Mobile */}
      <div className={classes.mobileContainer}>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Menu
              className={classes.menuIcon}
              onClick={() => setIsOpen(!isOpen)}
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTopRightRadius: '1rem',
              borderBottomRightRadius: '1rem',
              borderColor: 'var(--secondary)',
            }}
          >
            <div>
              <SheetHeader style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
                <SheetTitle>
                  <div className={classes.logo}>
                    <ChevronsDown className={classes.logoIcon} />
                    Web
                  </div>
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <div className={classes.sheetNavList}>
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    style={{ justifyContent: 'flex-start', fontSize: '1rem' }}
                    onClick={() => setIsOpen(false)}
                  >
                    <a className={classes.navLink} href={href}>
                      {label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className={classes.sheetFooter}>
              <Separator style={{ marginBottom: '0.5rem' }} />

              <ShadCNModeToggle />
              <ButtonToDisplay />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <nav className={classes.desktopNav}>
        <ul>
          {routeList.map(({ href, label }) => (
            <li key={href}>
              <a className={classes.desktopNavLink} href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={classes.desktopActions}>
        <ShadCNModeToggle />

        <ButtonToDisplay />
      </div>
    </header>
  )
}
