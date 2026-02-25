import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { makeStyles } from '@/theme/makeStyles'
import { Star } from 'lucide-react'

interface ReviewProps {
  image: string
  name: string
  userName: string
  comment: string
  rating: number
}

const reviewList: ReviewProps[] = [
  {
    image: 'https://github.com/shadcn.png',
    name: 'Alex Johnson',
    userName: 'Founder',
    comment:
      'This boilerplate saved us weeks of setup. Authentication, payments, and AI were all ready on day one.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Maria Garcia',
    userName: 'Full-Stack Developer',
    comment:
      'The monorepo structure and Docker Compose setup made local development a breeze. Highly recommended.',
    rating: 4.8,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Chris Lee',
    userName: 'CTO',
    comment:
      'Keycloak and Stripe are already wired up correctly. We just swapped in our branding and shipped.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Sam Rivera',
    userName: 'Product Engineer',
    comment:
      'The AI chat with conversation history gave us a great starting point for our assistant feature.',
    rating: 4.7,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Jordan Kim',
    userName: 'Solo Founder',
    comment:
      'Going from zero to a deployed SaaS in a weekend was possible because of this stack.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Taylor Brown',
    userName: 'Backend Engineer',
    comment:
      'Spring Boot with Keycloak OAuth2 is handled cleanly. The security config is easy to extend.',
    rating: 4.5,
  },
]

const useStyles = makeStyles()((theme) => ({
  section: {
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
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  sectionLabel: {
    marginBottom: '0.5rem',
    textAlign: 'center',
    fontSize: '1.125rem',
    letterSpacing: '0.05em',
    color: theme.colors.primary,
  },
  sectionTitle: {
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '1.875rem',
    fontWeight: 700,
    [theme.bp.md]: {
      fontSize: '2.25rem',
    },
  },
  carousel: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    [theme.bp.sm]: {
      width: '90%',
    },
    [theme.bp.lg]: {
      maxWidth: '1280px',
    },
  },
  carouselItem: {
    flexBasis: '100%',
    [theme.bp.md]: {
      flexBasis: '50%',
    },
    [theme.bp.lg]: {
      flexBasis: '33.333%',
    },
  },
  card: {
    backgroundColor: theme.colors.mutedAlpha50,
  },
  starsRow: {
    display: 'flex',
    gap: '0.25rem',
    paddingBottom: '1.5rem',
  },
  starFilled: {
    width: '1rem',
    height: '1rem',
    fill: theme.colors.primary,
    color: theme.colors.primary,
  },
  starEmpty: {
    width: '1rem',
    height: '1rem',
    fill: theme.colors.muted,
    color: theme.colors.muted,
  },
  reviewerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
  },
  reviewerInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export const TestimonialSection = () => {
  const { classes } = useStyles()

  return (
    <section className={classes.section} id="testimonials">
      <div className={classes.header}>
        <h2 className={classes.sectionLabel}>Testimonials</h2>

        <h2 className={classes.sectionTitle}>What builders are saying</h2>
      </div>

      <Carousel
        className={classes.carousel}
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem key={review.name} className={classes.carouselItem}>
              <Card className={classes.card}>
                <CardContent style={{ paddingBottom: 0, paddingTop: '1.5rem' }}>
                  <div className={classes.starsRow}>
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={
                          index < review.rating
                            ? classes.starFilled
                            : classes.starEmpty
                        }
                      />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className={classes.reviewerRow}>
                    <Avatar>
                      <AvatarImage
                        alt="radix"
                        src="https://avatars.githubusercontent.com/u/75042455?v=4"
                      />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar>

                    <div className={classes.reviewerInfo}>
                      <CardTitle style={{ fontSize: '1.125rem' }}>
                        {review.name}
                      </CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
