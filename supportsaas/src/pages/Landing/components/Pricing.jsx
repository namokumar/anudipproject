import styles from './Pricing.module.css';

const plans = [
  {
    name: "Starter",
    desc: "Perfect for small teams getting started",
    price: "$49",
    period: "/month",
    features: [
      "Up to 5 agents",
      "2 channel integrations",
      "Basic automation",
      "Email support",
      "7-day ticket history"
    ]
  },
  {
    name: "Pro",
    desc: "For growing teams that need more power",
    price: "$149",
    period: "/month",
    popular: true,
    features: [
      "Unlimited agents",
      "Unlimited integrations",
      "Advanced AI automation",
      "Priority 24/7 support",
      "Unlimited ticket history",
      "Custom workflows",
      "Real-time analytics"
    ]
  },
  {
    name: "Enterprise",
    desc: "Custom solutions for large organizations",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "Advanced security (SSO, SAML)",
      "On-premise deployment option",
      "White-label branding"
    ]
  }
];

const Pricing = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Simple, transparent pricing</h2>
          <p className={styles.subheadline}>
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </div>
        
        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <div key={index} className={styles.pricingCard}>
              {plan.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planDesc}>{plan.desc}</p>
              
              <div className={styles.priceRow}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              
              <button className={styles.ctaButton}>
                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
              </button>
              
              <div className={styles.features}>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className={styles.feature}>
                    <span className={`material-symbols-outlined ${styles.checkIcon}`}>
                      check_circle
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
