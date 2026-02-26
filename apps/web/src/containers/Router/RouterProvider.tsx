import AccountPage from '@/pages/Account/AccountPage'
import Ai from '@/pages/Ai/Ai'
import DashboardPage from '@/pages/Dashboard/DashboardPage'
import Page404 from '@/pages/Error/404'
import LandingPage from '@/pages/Landing/LandingPage'
import Layout from '@/pages/Layout/Layout'
import LegalInformation from '@/pages/Legal/legal'
import PrivacyPolicy from '@/pages/Legal/privacy'
import TermsAndConditions from '@/pages/Legal/terms'
import OrderFailurePage from '@/pages/Purchasing/OrderFailurePage'
import OrderSuccessPage from '@/pages/Purchasing/OrderSuccessPage'
import SettingsPage from '@/pages/Settings/SettingsPage'
import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import ToastProvider from '../Toast/ToastProvider'
import { AuthenticateUser } from './components/AuthenticateUser'
import {
  ProtectedApplicationRoutes,
  ProtectedSubscriptionRoutes,
} from './components/ProtectedRoutes'

const AppRouter: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate replace to="/ui" />} path="/" />
          <Route loader element={<AuthenticateUser />}>
            <Route path="/ui">
              <Route index element={<LandingPage />} />
              <Route element={<TermsAndConditions />} path="terms" />
              <Route element={<PrivacyPolicy />} path="privacy" />
              <Route element={<LegalInformation />} path="legal" />

              <Route element={<ProtectedSubscriptionRoutes />}>
                <Route element={<OrderFailurePage />} path="failure" />
                <Route element={<OrderSuccessPage />} path="completion" />
              </Route>

              <Route element={<ProtectedApplicationRoutes />}>
                <Route element={<Layout />}>
                  <Route element={<Ai />} path="ai" />
                  <Route element={<SettingsPage />} path="settings" />
                  <Route element={<AccountPage />} path="account" />
                  <Route element={<DashboardPage />} path="dashboard" />
                </Route>
              </Route>

              <Route element={<Page404 />} path="*" />
            </Route>
          </Route>
        </Routes>

        {/* ToastProvider has useAppNavigate inside to it needs to be there */}
        <ToastProvider />
      </BrowserRouter>
    </>
  )
}

export default AppRouter
