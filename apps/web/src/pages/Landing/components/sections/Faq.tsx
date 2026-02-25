import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { makeStyles } from '@/theme/makeStyles'

interface FAQProps {
  question: string
  answer: string
  value: string
}

const FAQList: FAQProps[] = [
  {
    question: 'Do I need to enter a credit card to try it?',
    answer:
      'No, you can try the platform for free without entering any payment information.',
    value: 'item-1',
  },
  {
    question: 'Which authentication provider is used?',
    answer:
      'Authentication is handled by Keycloak, an open-source identity provider supporting OAuth2 and OpenID Connect. You can self-host it or connect to an existing realm.',
    value: 'item-2',
  },
  {
    question: 'Which AI models are supported?',
    answer:
      'The API uses Spring AI with an OpenAI-compatible interface. By default it points to a local Ollama instance, but you can switch to any OpenAI-compatible endpoint by changing the base URL and model in application.properties.',
    value: 'item-3',
  },
  {
    question: 'Can I self-host the entire stack?',
    answer:
      'Yes. Docker Compose files for both development and production are included. The production compose adds Traefik as a reverse proxy with automatic TLS.',
    value: 'item-4',
  },
  {
    question: 'How do I customize the subscription plans?',
    answer:
      'Stripe products and prices are managed in your Stripe dashboard. Update the price IDs in the environment variables and adjust the UI copy in the Pricing section.',
    value: 'item-5',
  },
]

const useStyles = makeStyles()((theme) => ({
  section: {
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '6rem',
    paddingBottom: '6rem',
    [theme.bp.sm]: {
      paddingTop: '8rem',
      paddingBottom: '8rem',
    },
    [theme.bp.md]: {
      maxWidth: '700px',
    },
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  label: {
    marginBottom: '0.5rem',
    fontSize: theme.fontSize.lg,
    letterSpacing: '0.05em',
    color: theme.colors.primary,
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: theme.fontWeight.bold,
    [theme.bp.md]: {
      fontSize: '2.25rem',
    },
  },
  trigger: {
    textAlign: 'left',
  },
}))

export const FAQSection = () => {
  const { classes } = useStyles()

  return (
    <section className={classes.section} id="faq">
      <div className={classes.header}>
        <h2 className={classes.label}>FAQ</h2>

        <h2 className={classes.title}>Frequently asked questions</h2>
      </div>

      <Accordion>
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className={classes.trigger}>
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
