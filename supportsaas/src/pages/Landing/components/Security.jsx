import styles from './Security.module.css';

const features = [
  {
    icon: "lock",
    title: "Enterprise-Grade Encryption",
    description: "AES-256 encryption at rest and TLS 1.3 in transit. Your data is protected with the same security standards used by banks."
  },
  {
    icon: "verified_user",
    title: "SOC 2 Type II Certified",
    description: "Independently audited and certified for security, availability, and confidentiality. We meet the highest industry standards."
  },
  {
    icon: "shield",
    title: "GDPR & CCPA Compliant",
    description: "Full compliance with global data protection regulations. We respect your customers' privacy as much as you do."
  },
  {
    icon: "backup",
    title: "Daily Automated Backups",
    description: "Your data is backed up every 24 hours to geo-redundant data centers. 99.99% uptime SLA guaranteed."
  }
];

const badges = [
  { icon: "verified", label: "SOC 2 Type II" },
  { icon: "privacy_tip", label: "GDPR Compliant" },
  { icon: "security", label: "ISO 27001" },
  { icon: "cloud_done", label: "99.99% Uptime" }
];

const Security = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Security you can trust</h2>
          <p className={styles.subheadline}>
            Your customers trust you. You can trust us to keep their data safe.
          </p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <span className={`material-symbols-outlined ${styles.icon}`}>
                  {feature.icon}
                </span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.badges}>
          {badges.map((badge, index) => (
            <div key={index} className={styles.badge}>
              <span className={`material-symbols-outlined ${styles.badgeIcon}`}>
                {badge.icon}
              </span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Security;
