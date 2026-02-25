import useToggle from '@/hooks/useToggle'
import useConfigurationStore from '@/stores/ConfigurationStore'
import { FC } from 'react'

import SubscriptionCard from './components/SubscriptionCard'

export enum PopularPlan {
  NO = 0,
  YES = 1,
}

export interface PlanProps {
  id: string
  title: string
  popular: PopularPlan
  price: number
  description: string
  buttonText: string
  benefitList: string[]
}

type PriceIds = {
  stripePriceIdFree: string
  stripePriceIdBasic: string
  stripePriceIdPremium: string
}

const getPlans = ({
  stripePriceIdFree,
  stripePriceIdBasic,
  stripePriceIdPremium,
}: PriceIds): PlanProps[] => {
  return [
    {
      id: stripePriceIdFree,
      title: 'Free',
      popular: PopularPlan.NO,
      price: 0,
      description: 'Try the platform for free. No credit card required.',
      buttonText: 'Start free',
      benefitList: ['15 requests/day'],
    },
    {
      id: stripePriceIdBasic,
      title: 'Premium',
      popular: PopularPlan.YES,
      price: 25,
      description: 'For individuals who need more power.',
      buttonText: 'Get started',
      benefitList: ['100 requests/day'],
    },
    {
      id: stripePriceIdPremium,
      title: 'Enterprise',
      popular: PopularPlan.NO,
      price: 35,
      description: 'For teams that need higher limits and collaboration.',
      buttonText: 'Contact us',
      benefitList: ['200 requests/day'],
    },
  ]
}

// const plans: PlanProps[] =

export const PricingSection: FC = () => {
  const [buttonClicked, setButtonClicked] = useToggle()
  const { configuration } = useConfigurationStore()

  const handleCardClick = () => {
    setButtonClicked(true)
  }

  const plans = getPlans({
    stripePriceIdFree: configuration?.stripePriceIdFree ?? '',
    stripePriceIdBasic: configuration?.stripePriceIdBasic ?? '',
    stripePriceIdPremium: configuration?.stripePriceIdPremium ?? '',
  })

  return (
    <section
      id="pricing"
      style={{
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '3rem',
        paddingBottom: '4rem',
      }}
    >
      <h2
        style={{
          marginBottom: '0.5rem',
          textAlign: 'center',
          fontSize: '1.125rem',
          letterSpacing: '0.05em',
          color: 'hsl(var(--primary))',
        }}
      >
        Pricing
      </h2>

      <h2
        style={{
          marginBottom: '1rem',
          textAlign: 'center',
          fontSize: '1.875rem',
          fontWeight: 'bold',
        }}
      >
        Simple, transparent pricing
      </h2>

      <h3
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingBottom: '3.5rem',
          textAlign: 'center',
          fontSize: '1.25rem',
          color: 'hsl(var(--muted-foreground))',
          maxWidth: '50%',
        }}
      >
        Choose the plan that fits your needs. Upgrade or downgrade at any time.
      </h3>

      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {plans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            isDisabled={buttonClicked}
            subscriptionItem={plan}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </section>
  )
}
