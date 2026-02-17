import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', description: '', priority: 'Medium' });

  useEffect(() => {
    fetchTickets();

    // Set up Realtime subscription
    const subscription = supabase
      .channel('tickets-realtime')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'tickets'
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          // Refresh the list to catch any complex RLS changes or just append if simple
          fetchTickets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (err) {
      console.error('Error fetching tickets:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('tickets').insert([{
        ...newTicket,
        user_id: user.id,
        status: 'Open'
      }]);
      if (error) throw error;
      setNewTicket({ subject: '', description: '', priority: 'Medium' });
      setIsModalOpen(false);
      fetchTickets();
    } catch (err) {
      alert('Error creating ticket: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Stats calculation
  const totalTickets = tickets.length;
  const openCount = tickets.filter(t => t.status === 'Open').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarP6}>
          <div className={styles.logoBox}>
            <span className="material-symbols-outlined">support_agent</span>
          </div>
          <h1 className={styles.logoText}>HelpDesk</h1>
        </div>
        
        <nav className={styles.sidebarNav}>
          <a className={styles.navLinkActive} href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className={styles.navLink} href="#">
            <span className="material-symbols-outlined">confirmation_number</span>
            <span>Tickets</span>
          </a>
          <a className={styles.navLink} href="#">
            <span className="material-symbols-outlined">analytics</span>
            <span>Analytics</span>
          </a>
          <a className={styles.navLink} href="#">
            <span className="material-symbols-outlined">group</span>
            <span>Customers</span>
          </a>
          
          <div className={styles.navSectionLabel}>Account</div>
          
          <a className={styles.navLink} href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </nav>

        <div className={styles.sidebarUser}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>
              {user?.user_metadata?.full_name?.charAt(0) || 'A'}
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user?.user_metadata?.full_name || 'User'}</p>
              <p className={styles.userRole}>Support Agent</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.mainHeader}>
          <div className={styles.headerTitleBox}>
            <h2 className={styles.headerTitle}>Dashboard Overview</h2>
            <p className={styles.headerSubtitle}>Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}. Here's the latest.</p>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              <input className={styles.searchInput} placeholder="Search tickets..." type="text"/>
            </div>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined">notifications</span>
              <span className={styles.notificationDot}></span>
            </button>
            <button className={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
              <span className="material-symbols-outlined">add</span>
              <span>New Ticket</span>
            </button>
          </div>
        </header>

        {/* Dashboard Panels */}
        <div className={styles.dashboardGutter}>
          {/* Stats Row */}
          <section className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Total Tickets</p>
                <h3 className={styles.statValue}>{totalTickets}</h3>
                <div className={styles.statTrendUp}>
                  <span className="material-symbols-outlined">trending_up</span>
                  <span>+12%</span>
                </div>
              </div>
              <div className={`${styles.statIconBox} ${styles.blueIcon}`}>
                <span className="material-symbols-outlined">confirmation_number</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Open Tickets</p>
                <h3 className={styles.statValue}>{openCount}</h3>
                <div className={styles.statTrendAmber}>
                  <span className="material-symbols-outlined">pending_actions</span>
                  <span>{openCount > 10 ? 'High Traffic' : 'On Track'}</span>
                </div>
              </div>
              <div className={`${styles.statIconBox} ${styles.amberIcon}`}>
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Resolved</p>
                <h3 className={styles.statValue}>{resolvedCount}</h3>
                <div className={styles.statTrendEmerald}>
                  <span className="material-symbols-outlined">verified</span>
                  <span>98% CSAT</span>
                </div>
              </div>
              <div className={`${styles.statIconBox} ${styles.emeraldIcon}`}>
                <span className="material-symbols-outlined">check_circle</span>
              </div>
            </div>
          </section>

          {/* Grid Layout for feed and sidebar */}
          <div className={styles.dashboardGrid}>
            {/* Recent Activity / Ticket Table */}
            <div className={styles.activityPanel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Recent Tickets</h3>
                <button className={styles.textBtn}>View All</button>
              </div>

              <div className={styles.ticketList}>
                {loading ? (
                  <div className={styles.loading}>Loading tickets...</div>
                ) : tickets.length === 0 ? (
                  <div className={styles.empty}>No tickets found.</div>
                ) : (
                  tickets.slice(0, 5).map(ticket => (
                    <div key={ticket.id} className={styles.ticketItem}>
                      <div className={`${styles.activityIcon} ${styles[ticket.priority.toLowerCase()]}`}>
                        <span className="material-symbols-outlined">
                          {ticket.status === 'Resolved' ? 'task_alt' : 'confirmation_number'}
                        </span>
                      </div>
                      <div className={styles.ticketDetails}>
                        <div className={styles.ticketTitleRow}>
                          <p className={styles.ticketTitle}>#{ticket.id} - {ticket.subject}</p>
                          <span className={styles.ticketTime}>{new Date(ticket.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className={styles.ticketSnippet}>{ticket.description.substring(0, 100)}...</p>
                        <div className={styles.ticketBadges}>
                          <span className={`${styles.badge} ${styles.priorityBadge} ${styles[ticket.priority.toLowerCase()]}`}>
                            {ticket.priority}
                          </span>
                          <span className={`${styles.badge} ${styles.statusBadge} ${styles[ticket.status.toLowerCase().replace(' ', '')]}`}>
                            {ticket.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Side Widgets */}
            <div className={styles.widgetCol}>
              <div className={styles.metricsCard}>
                <h4 className={styles.widgetTitle}>Avg. Response</h4>
                <div className={styles.metricsContent}>
                  <span className={styles.metricsLarge}>14m</span>
                  <span className={styles.metricsMuted}>Average</span>
                </div>
                <div className={styles.progressBarBox}>
                  <div className={styles.progressLabel}>
                    <span>Target: &lt; 30m</span>
                    <span className={styles.bold}>On track</span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div className={styles.progressBarFill} style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div className={styles.assignedCard}>
                <h4 className={styles.widgetTitle}>Your Open Tickets</h4>
                <div className={styles.miniList}>
                  {tickets.filter(t => t.status === 'Open').slice(0, 3).map(t => (
                    <div key={t.id} className={styles.miniItem}>
                      <div className={styles.miniInfo}>
                        <p className={styles.miniTitle}>#{t.id} {t.subject}</p>
                        <p className={styles.miniSub}>Updated {new Date(t.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <span className={`${styles.statusDot} ${styles[t.priority.toLowerCase()]}`}></span>
                    </div>
                  ))}
                  {tickets.filter(t => t.status === 'Open').length === 0 && (
                     <p className={styles.miniEmpty}>Cleared!</p>
                  )}
                </div>
                <button className={styles.secondaryBtn}>View Workspace</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Create New Ticket</h3>
              <button onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleCreateTicket} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <input 
                  required
                  placeholder="e.g. Can't login to dashboard"
                  value={newTicket.subject}
                  onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Priority</label>
                <select 
                  value={newTicket.priority} 
                  onChange={e => setNewTicket({...newTicket, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea 
                  required
                  placeholder="Describe the issue in detail..."
                  rows="4"
                  value={newTicket.description}
                  onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                ></textarea>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Create Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
