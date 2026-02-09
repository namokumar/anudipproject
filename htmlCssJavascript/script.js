// Mock Data
const mockData = [
    { id: 1, name: "Nova Systems", email: "contact@novasystems.io", status: "Active" },
    { id: 2, name: "Apex Logistics", email: "support@apex.com", status: "Open" },
    { id: 3, name: "Global Connect", email: "billing@global.net", status: "Inactive" },
    { id: 4, name: "Peak Solutions", email: "admin@peaksol.co", status: "Closed" }
];

// DOM Elements
const ticketList = document.getElementById('ticketList');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const selectedOption = statusFilter.querySelector('.selected-option');
const optionsContainer = statusFilter.querySelector('.options-container');
const options = document.querySelectorAll('.option');

// State
let currentStatus = 'All';

// Initialize
function init() {
    // Check Local Storage
    const storedTickets = localStorage.getItem('crmTickets');
    
    if (!storedTickets) {
        localStorage.setItem('crmTickets', JSON.stringify(mockData));
    }
    
    // Load data
    loadTickets();
    
    // Clear search input on refresh (browser usually keeps it, but requirement says it's lost)
    searchInput.value = ''; 
    
    setupEventListeners();
}

function getTickets() {
    const storedTickets = localStorage.getItem('crmTickets');
    return storedTickets ? JSON.parse(storedTickets) : [];
}

function loadTickets() {
    const tickets = getTickets();
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.name.toLowerCase().includes(searchTerm) || 
                              ticket.email.toLowerCase().includes(searchTerm);
        const matchesStatus = currentStatus === 'All' || ticket.status === currentStatus;
        
        return matchesSearch && matchesStatus;
    });
    
    renderTickets(filteredTickets);
}

function renderTickets(tickets) {
    ticketList.innerHTML = '';
    
    if (tickets.length === 0) {
        ticketList.innerHTML = '<div class="ticket-item" style="justify-content:center; color: var(--text-secondary);">No tickets found</div>';
        return;
    }
    
    tickets.forEach(ticket => {
        const item = document.createElement('div');
        item.className = 'ticket-item';
        
        // Determine status dot color class
        const statusClass = `status-${ticket.status.toLowerCase()}`;
        const dotClass = `dot-${ticket.status.toLowerCase()}`;
        
        item.innerHTML = `
            <div class="col name ticket-name">${ticket.name}</div>
            <div class="col email ticket-email">${ticket.email}</div>
            <div class="col status ticket-status ${statusClass}">
                <span class="status-dot ${dotClass}"></span>
                ${ticket.status}
            </div>
        `;
        
        ticketList.appendChild(item);
    });
}

function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', () => {
        loadTickets();
    });

    // Custom Select Toggle
    statusFilter.addEventListener('click', (e) => {
        optionsContainer.classList.toggle('hidden');
    });

    // Close select when clicking outside
    document.addEventListener('click', (e) => {
        if (!statusFilter.contains(e.target)) {
            optionsContainer.classList.add('hidden');
        }
    });

    // Option Selection
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggling the container immediately
            
            // Update UI
            currentStatus = option.getAttribute('data-value');
            selectedOption.textContent = option.textContent;
            optionsContainer.classList.add('hidden');
            
            // Filter
            loadTickets();
        });
    });
}

// Run Initialization
document.addEventListener('DOMContentLoaded', init);
