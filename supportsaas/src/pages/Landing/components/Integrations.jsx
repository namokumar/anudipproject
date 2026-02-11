import styles from './Integrations.module.css';

const integrations = [
  { name: 'Slack', icon: 'chat', desc: 'Team messaging' },
  { name: 'Gmail', icon: 'mail', desc: 'Email support' },
  { name: 'WhatsApp', icon: 'chat_bubble', desc: 'Instant messaging' },
  { name: 'Jira', icon: 'task', desc: 'Issue tracking' },
  { name: 'GitHub', icon: 'code', desc: 'Developer tools' },
  { name: 'Intercom', icon: 'forum', desc: 'Customer messaging' },
  { name: 'Zendesk', icon: 'support_agent', desc: 'Legacy migration' },
  { name: 'Salesforce', icon: 'analytics', desc: 'CRM integration' },
];

const Integrations = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Works with the tools you already use</h2>
          <p className={styles.subheadline}>
            Seamlessly integrate with your existing workflow. No disruption, just enhancement.
          </p>
        </div>
        
        <div className={styles.grid}>
          {integrations.map((integration, index) => (
            <div key={index} className={styles.integrationCard}>
              <div className={styles.iconWrapper}>
                <span className={`material-symbols-outlined ${styles.icon}`}>
                  {integration.icon}
                </span>
              </div>
              <div className={styles.integrationInfo}>
                <h3 className={styles.integrationName}>{integration.name}</h3>
                <p className={styles.integrationDesc}>{integration.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
