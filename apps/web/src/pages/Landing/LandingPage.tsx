import { makeStyles } from '@/theme/makeStyles'
import { FC } from 'react'

import { BenefitsSection } from './components/sections/Benefits'
import { FAQSection } from './components/sections/Faq'
import { FeaturesSection } from './components/sections/Features'
import { FooterSection } from './components/sections/Footer'
import { HeroSection } from './components/sections/Hero'
import { PricingSection } from './components/sections/Pricing'
import { TestimonialSection } from './components/sections/Testimonial'
import Tutorial from './components/sections/Tutorial'
import { Navbar } from './Navbar'

const useStyles = makeStyles()((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    fontFamily: 'Poppins',
  },
}))

const LandingPage: FC = () => {
  const { classes } = useStyles()

  return (
    <>
      {/* Inspired by https://github.com/nobruf/shadcn-landing-page/ */}
      <div suppressHydrationWarning lang="en">
        <div className={classes.root}>
          <Navbar />

          <HeroSection />
          <BenefitsSection />
          <FeaturesSection />
          <TestimonialSection />
          <Tutorial />
          {/* <TeamSection /> */}
          <PricingSection />
          <FAQSection />
          <FooterSection />
          {/* <CookieConsent /> */}
        </div>
      </div>
    </>
  )
}

export default LandingPage
