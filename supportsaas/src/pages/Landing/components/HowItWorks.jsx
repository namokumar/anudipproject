import styles from './HowItWorks.module.css';

const steps = [
  {
    number: 1,
    title: "Connect Your Channels",
    description: "Link your email, Slack, WhatsApp, and other communication tools in one click. No coding required."
  },
  {
    number: 2,
    title: "Automate Workflows",
    description: "Set up AI rules to tag, prioritize, and route tickets instantly to the right team members."
  },
  {
    number: 3,
    title: "Resolve Faster",
    description: "Use AI-suggested responses and unified context to close tickets in record time."
  }
];

const HowItWorks = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>How It Works</h2>
          <p className={styles.subheadline}>
            Get up and running in minutes. Our platform is designed for simplicity without sacrificing power.
          </p>
        </div>
        
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
