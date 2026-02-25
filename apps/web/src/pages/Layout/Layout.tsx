import { makeStyles } from '@/theme/makeStyles'
import { FC } from 'react'
import { Outlet } from 'react-router'

import Header from './components/LayoutHeader'
import LayoutSidebar from './components/LayoutSideBar'

const useStyles = makeStyles()((_) => ({
  root: {
    display: 'flex',
    height: '100svh',
    overflow: 'hidden',
    fontFamily: "'Poppins', sans-serif",
  },
  main: {
    display: 'flex',
    minWidth: 0,
    flex: 1,
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    fontFamily: "'Poppins', sans-serif",
  },
}))

const Layout: FC = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      <LayoutSidebar />
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
