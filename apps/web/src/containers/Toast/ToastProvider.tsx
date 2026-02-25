import { FC } from 'react'
import { ToastContainer } from 'react-toastify'

const ToastProvider: FC = () => {
  return (
    <ToastContainer
      closeOnClick
      draggable
      pauseOnFocusLoss
      pauseOnHover
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      position="top-right"
      rtl={false}
    />
  )
}

export default ToastProvider
