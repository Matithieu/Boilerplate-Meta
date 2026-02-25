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
  subsection: {
    marginBottom: '0.25rem',
    fontSize: theme.fontSize.base,
  },
}))

const PrivacyPolicy: React.FC = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h4 className={classes.title}>Privacy Policy</h4>
        <p className={classes.date}>Effective Date: September 3, 2023</p>
        <p className={classes.paragraph}>
          This Privacy Policy (&quot;Policy&quot;) outlines how mat
          (&quot;mat,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
          collects, uses, discloses, and protects your personal information when
          you access and use the website located at web.com (the
          &quot;Website&quot;). By accessing or using the Website, you consent
          to the practices described in this Policy.
        </p>
        <h6 className={classes.sectionTitle}>1. Use of the Website</h6>
        <p className={classes.paragraph}>
          This Privacy Policy (&quot;Policy&quot;) outlines how mat
          (&quot;mat,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
          collects, uses, discloses, and protects your personal information when
          you access and use the website located at web.com (the
          &quot;Website&quot;). By accessing or using the Website, you consent
          to the practices described in this Policy.
        </p>
        <h6 className={classes.sectionTitle}>2. Information We Collect</h6>
        <p className={classes.subsection}>2.1. Personal Information</p>
        <p className={classes.paragraph}>
          We may collect personal information that you provide voluntarily when
          you use the Website, including but not limited to your name, email
          address, and contact information.
        </p>
        <p className={classes.subsection}>
          2.2. Automatically Collected Information
        </p>
        <p className={classes.paragraph}>
          We may also collect certain information automatically when you visit
          the Website, including your IP address, browser type, and device
          information. We may use cookies and similar tracking technologies to
          collect this information.
        </p>
        <h6 className={classes.sectionTitle}>3. How We Use Your Information</h6>
        <p className={classes.subsection}>3.1. To Provide Services</p>
        <p className={classes.paragraph}>
          We may use your personal information to provide you with the services
          offered on the Website, respond to your inquiries, and fulfill your
          requests.
        </p>
        <p className={classes.subsection}>3.2. To Improve Our Services</p>
        <p className={classes.paragraph}>
          We may use your information to analyze user trends, conduct research,
          and improve the quality of the Website and our services.
        </p>
        <h6 className={classes.sectionTitle}>
          4. Disclosure of Your Information
        </h6>
        <p className={classes.subsection}>4.1. Third-Party Service Providers</p>
        <p className={classes.paragraph}>
          We may share your personal information with third-party service
          providers who assist us in providing and improving our services. These
          service providers are obligated to protect your information.
        </p>
        <p className={classes.subsection}>4.2. Legal Requirements</p>
        <p className={classes.paragraph}>
          We may disclose your information when required by law, court order, or
          government regulation.
        </p>
        <h6 className={classes.sectionTitle}>5. Your Choices</h6>
        <p className={classes.subsection}>5.1. Opt-Out</p>
        <p className={classes.paragraph}>
          You may choose to opt-out of receiving promotional emails from us by
          following the instructions provided in the emails.
        </p>
        <p className={classes.subsection}>5.2. Cookies</p>
        <p className={classes.paragraph}>
          Most web browsers allow you to control cookies through their settings.
          You can set your browser to refuse all cookies or to indicate when a
          cookie is being sent.
        </p>
        <h6 className={classes.sectionTitle}>6. Data Security</h6>
        <p className={classes.subsection}>6.1. Security Measures</p>
        <p className={classes.paragraph}>
          We implement reasonable security measures to protect your personal
          information from unauthorized access and disclosure.
        </p>
        <h6 className={classes.sectionTitle}>7. Children&#39;s Privacy</h6>
        <p className={classes.subsection}>7.1. Children Under 18</p>
        <p className={classes.paragraph}>
          The Website is not intended for children under the age of 18. We do
          not knowingly collect personal information from children under 18
          without parental consent.
        </p>
        <h6 className={classes.sectionTitle}>8. Changes to this Policy</h6>
        <p className={classes.subsection}>8.1. Updates</p>
        <p className={classes.paragraph}>
          We may update this Policy from time to time to reflect changes in our
          practices or for other operational, legal, or regulatory reasons. The
          updated Policy will be posted on the Website with the effective date.
        </p>
        <h6 className={classes.sectionTitle}>9. Contact Us</h6>
        <p className={classes.subsection}>9.1. Questions</p>
        <p className={classes.paragraph}>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at contact@web.com.
        </p>
        <p className={classes.paragraph}>
          By using the Website, you acknowledge that you have read, understood,
          and agree to this Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
