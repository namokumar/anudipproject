import styles from './TrustedBy.module.css';

const companies = [
  { name: 'Acme Corp', logo: 'https://placehold.co/120x40/white/white?text=Acme+Corp' },
  { name: 'GlobalScale', logo: 'https://placehold.co/120x40/white/white?text=GlobalScale' },
  { name: 'TechNext', logo: 'https://placehold.co/120x40/white/white?text=TechNext' },
  { name: 'Visionary', logo: 'https://placehold.co/120x40/white/white?text=Visionary' },
  { name: 'FutureWorks', logo: 'https://placehold.co/120x40/white/white?text=FutureWorks' },
];

const TrustedBy = () => {
  return (
    <section className={styles.section}>
      <p className={styles.headline}>Trusted by 2,000+ support teams worldwide</p>
      <div className={styles.logoGrid}>
        {companies.map((company, index) => (
          <div key={index} className={styles.logoItem}>
            {/* 
              In a real application, you would use actual company logo SVGs here.
              For this demo, we use placeholder text images but style them to look like logos.
              Ideally replace with <img src={logoUrl} alt={company.name} />
            */}
             <span style={{ 
                color: 'white', 
                fontSize: '1.5rem', 
                fontWeight: '800', 
                fontFamily: 'Inter, sans-serif'
             }}>
                {company.name}
             </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedBy;
