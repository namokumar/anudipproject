import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: "SupportSaaS completely transformed how we handle customer inquiries. Our response time dropped by 40% in just two weeks.",
    name: "Sarah Jenkins",
    role: "Head of Support, TechFlow",
    initials: "SJ"
  },
  {
    quote: "The interface is incredibly intuitive. It feels like a tool built by people who actually understand customer support challenges.",
    name: "Marcus Chen",
    role: "CTO, CloudScale",
    initials: "MC"
  },
  {
    quote: "We were drowning in emails before SupportSaaS. Now everything is organized, prioritized, and our customers are happier than ever.",
    name: "Elena Rodriguez",
    role: "Founder, GreenSpace",
    initials: "ER"
  }
];

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Loved by Support Teams</h2>
          <p className={styles.subheadline}>
            Don't just take our word for it. See what high-growth teams are saying about SupportSaaS.
          </p>
        </div>
        
        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <div key={index} className={styles.card}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--primary-color)', opacity: 0.5 }}>format_quote</span>
              <p className={styles.quoteText}>"{item.quote}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{item.initials}</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{item.name}</span>
                  <span className={styles.authorRole}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
