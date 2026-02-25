import { FC } from 'react'

import { useAppNavigate } from '../../hooks/useAppNavigate'

const OrderFailurePage: FC = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const { navigation } = useAppNavigate()

  return (
    <div>
      <h1>Payment failed</h1>
      <p>{queryParams.toString().split('&').join('\n')}</p>
      <button onClick={() => navigation.toHome()}>Go back to home page</button>
    </div>
  )
}

export default OrderFailurePage
