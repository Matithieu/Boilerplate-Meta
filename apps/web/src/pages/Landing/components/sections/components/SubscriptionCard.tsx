import Button from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import useAuthManager from '@/hooks/useAuthManager'
import useUserStore from '@/stores/UserStore'
import { makeStyles } from '@/theme/makeStyles'
import { startStripeSubscription } from '@/utils/api/queries'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { FC } from 'react'

import { PlanProps, PopularPlan } from '../Pricing'
type SubscriptionCardProps = {
  subscriptionItem: PlanProps
  isDisabled: boolean
  onCardClick: () => void
}

const useStyles = makeStyles()((theme) => ({
  popularCard: {
    borderWidth: '1.5px',
    borderColor: theme.colors.primary,
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    [theme.bp.lg]: {
      transform: 'scale(1.1)',
    },
  },
  cardTitle: {
    paddingBottom: '0.5rem',
  },
  cardDescription: {
    paddingBottom: '1rem',
  },
  price: {
    fontSize: '1.875rem',
    fontWeight: theme.fontWeight.bold,
  },
  priceUnit: {
    color: theme.colors.mutedForeground,
  },
  content: {
    display: 'flex',
  },
  benefitList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  benefit: {
    display: 'flex',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: '0.5rem',
    color: theme.colors.primary,
  },
  button: {
    width: '100%',
  },
}))

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  subscriptionItem: item,
  isDisabled,
  onCardClick,
}) => {
  const { user } = useUserStore()
  const { signIn } = useAuthManager()
  const { classes, cx } = useStyles()

  const { refetch } = useQuery({
    queryKey: ['sub' + item.id],
    queryFn: () => startStripeSubscription({ 'X-priceId': item.id }),
    enabled: false,
  })

  const handleClick = async () => {
    if (user) {
      onCardClick()

      const result = await refetch()

      if (result.isSuccess && result.data) {
        window.location.href = result.data
      }
    } else {
      signIn()
    }
  }

  return (
    <Card
      key={item.title}
      className={cx(item.popular === PopularPlan?.YES && classes.popularCard)}
    >
      <CardHeader>
        <CardTitle className={classes.cardTitle}>{item.title}</CardTitle>

        <CardDescription className={classes.cardDescription}>
          {item.description}
        </CardDescription>

        <div>
          <span className={classes.price}>${item.price}</span>
          <span className={classes.priceUnit}> / month</span>
        </div>
      </CardHeader>

      <CardContent className={classes.content}>
        <div className={classes.benefitList}>
          {item.benefitList.map((benefit) => (
            <span key={benefit} className={classes.benefit}>
              <Check className={classes.checkIcon} />
              <h3>{benefit}</h3>
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className={classes.button}
          disabled={isDisabled}
          style={
            item.popular
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : {}
          }
          onClick={handleClick}
        >
          {item.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SubscriptionCard
