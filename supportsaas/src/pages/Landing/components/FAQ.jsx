import styles from './FAQ.module.css';

const faqs = [
  {
    question: "How much does SupportSaaS cost?",
    answer: "We offer flexible pricing starting at $49/month for small teams (up to 5 agents). Our Pro plan is $149/month for unlimited agents. Enterprise pricing is available for custom needs. All plans include a 14-day free trial—no credit card required."
  },
  {
    question: "How long does it take to set up?",
    answer: "Most teams are up and running in under 15 minutes. Simply connect your email and communication channels, invite your team, and you're ready to go. Our onboarding wizard guides you through every step."
  },
  {
    question: "Can I migrate from Zendesk or Freshdesk?",
    answer: "Absolutely! We offer free migration assistance for all paid plans. Our team will help you import your tickets, customer data, and historical conversations with zero downtime."
  },
  {
    question: "Is my customer data secure?",
    answer: "Yes. We use bank-level AES-256 encryption for data at rest and TLS 1.3 for data in transit. We're SOC 2 Type II certified and GDPR compliant. Your data is backed up daily and stored in secure, geo-redundant data centers."
  },
  {
    question: "What if I need help or have questions?",
    answer: "We practice what we preach! Our support team is available 24/7 via live chat, email, and our own SupportSaaS inbox. Average response time is under 2 minutes. Plus, we have extensive documentation and video tutorials."
  }
];

const FAQ = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Frequently Asked Questions</h2>
          <p className={styles.subheadline}>
            Everything you need to know before getting started.
          </p>
        </div>
        
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <h3 className={styles.question}>
                <span className={`material-symbols-outlined ${styles.questionIcon}`}>
                  help
                </span>
                {faq.question}
              </h3>
              <p className={styles.answer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
