import { FC } from 'react'

import useUserStore from '../../stores/UserStore'

const DashboardPage: FC = () => {
  const { user } = useUserStore()

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>
        Welcome to your Dashboard, {user?.firstName}!
      </h1>
    </div>
  )
}

export default DashboardPage
