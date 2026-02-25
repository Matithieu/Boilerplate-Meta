import { makeStyles } from '@/theme/makeStyles'
import React from 'react'

const useStyles = makeStyles()((theme) => ({
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  content: {
    padding: '1.25rem',
  },
  title: {
    marginBottom: '0.25rem',
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
  },
  date: {
    marginBottom: '0.25rem',
    fontSize: theme.fontSize.base,
  },
  sectionTitle: {
    marginBottom: '0.25rem',
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },
  paragraph: {
    marginBottom: '1rem',
  },
}))

const LegalInformation: React.FC = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h4 className={classes.title}>Legal Information</h4>
        <p className={classes.date}>Effective Date: September 3, 2023</p>

        <h6 className={classes.sectionTitle}>Website Editor</h6>
        <p className={classes.paragraph}>The website web.com is edited by:</p>
        <p className={classes.paragraph}>
          Social denomination: Mathieu
          <br />
          Legal status:
          <br />
          Share capital:
          <br />
          Head office: in redaction
          <br />
          RCS:
          <br />
          Siret:
          <br />
          VAT number:
        </p>

        <h6 className={classes.sectionTitle}>Publication Director</h6>
        <p className={classes.paragraph}>
          The website web.com is published by:
        </p>
        <p className={classes.paragraph}>
          Physical person: Mathieu
          <br />
          Status: Director
          <br />
          Head office: in redaction
          <br />
          Email:
        </p>

        <h6 className={classes.sectionTitle}>Website Hosting</h6>
        <p className={classes.paragraph}>The website web.com is hosted by:</p>
        <p className={classes.paragraph}>
          Social denomination:
          <br />
          Head office:
        </p>
      </div>
    </div>
  )
}

export default LegalInformation
