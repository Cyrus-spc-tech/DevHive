// Event Management System

// Sample events data (in a real app, this would come from a backend)
const events = [
    {
        id: 1,
        title: 'Web Development Workshop',
        date: '2025-01-15',
        time: '10:00',
        description: 'Learn modern web development with React, Node.js, and MongoDB. Build a full-stack application from scratch.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        status: 'upcoming'
    },
    {
        id: 2,
        title: 'Hack The Hive 2.0',
        date: '2025-01-08',
        time: '09:00',
        description: 'Annual 24-hour coding competition where developers compete to build innovative projects.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        status: 'ongoing'
    },
    {
        id: 3,
        title: 'AI/ML Bootcamp',
        date: '2024-12-20',
        time: '14:00',
        description: 'Introduction to machine learning and artificial intelligence with hands-on projects.',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        status: 'previous'
    },
    {
        id: 4,
        title: 'Mobile App Development',
        date: '2025-01-20',
        time: '11:00',
        description: 'Learn to build cross-platform mobile applications using React Native.',
        image: 'https://images.unsplash.com/photo-1512941937309-5f597a2fcc2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        status: 'upcoming'
    },
    {
        id: 5,
        title: 'Data Science Workshop',
        date: '2024-12-10',
        time: '15:00',
        description: 'Explore data analysis, visualization, and statistical modeling with Python.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        status: 'previous'
    }
];

// Initialize page
function init() {
    renderEvents();
    addEventListeners();
}

// Add event listeners
function addEventListeners() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabBtns.forEach(t => {
                t.classList.remove('bg-purple-600', 'text-white');
                t.classList.add('text-gray-300');
            });
            
            // Add active class to clicked tab
            btn.classList.remove('text-gray-300');
            btn.classList.add('bg-purple-600', 'text-white');
            
            // Show corresponding content
            const tabName = btn.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(tabName).classList.remove('hidden');
        });
    });

    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
}

// Render events by category
function renderEvents() {
    const ongoingEvents = events.filter(event => event.status === 'ongoing');
    const upcomingEvents = events.filter(event => event.status === 'upcoming');
    const previousEvents = events.filter(event => event.status === 'previous');

    renderEventCategory('ongoingEvents', ongoingEvents, 'ongoing');
    renderEventCategory('upcomingEvents', upcomingEvents, 'upcoming');
    renderEventCategory('previousEvents', previousEvents, 'previous');
}

// Render events in a specific category
function renderEventCategory(containerId, categoryEvents, status) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (categoryEvents.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-gray-500 text-lg">
                    <i class="fas fa-calendar-times text-4xl mb-4 block"></i>
                    No ${status} events found
                </div>
            </div>
        `;
        return;
    }
    
    categoryEvents.forEach(event => {
        const eventCard = createEventCard(event, status);
        container.appendChild(eventCard);
    });
}

// Create event card element
function createEventCard(event, status) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    const card = document.createElement('div');
    card.className = 'bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1';
    
    const statusBadge = status === 'ongoing' 
        ? '<span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Ongoing</span>'
        : status === 'upcoming' 
        ? '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Upcoming</span>'
        : '<span class="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">Completed</span>';
    
    card.innerHTML = `
        <div class="relative">
            <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover">
            <div class="absolute top-4 right-4">
                ${statusBadge}
            </div>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-gray-400 text-sm">
                    <i class="far fa-calendar mr-2"></i>${formattedDate}
                </span>
                <span class="text-gray-400 text-sm">
                    <i class="far fa-clock mr-2"></i>${event.time}
                </span>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">${event.title}</h3>
            <p class="text-gray-300 mb-4 line-clamp-3">${event.description}</p>
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4 text-gray-400 text-sm">
                    <span><i class="fas fa-users mr-1"></i> ${Math.floor(Math.random() * 50) + 10} registered</span>
                    <span><i class="fas fa-laptop mr-1"></i> ${status === 'previous' ? 'Offline' : 'Online'}</span>
                </div>
                ${status !== 'previous' ? `
                    <button onclick="openRegistrationModal('${event.title.replace(/'/g, "\\'")}')" 
                            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                        Register
                    </button>
                ` : `
                    <button disabled class="bg-gray-600 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                        Completed
                    </button>
                `}
            </div>
        </div>
    `;
    
    return card;
}

// Open registration modal
function openRegistrationModal(eventTitle) {
    const modal = document.getElementById('registrationModal');
    const titleElement = document.getElementById('eventTitle');
    
    if (modal && titleElement) {
        titleElement.textContent = eventTitle;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Reset form if it's registration form
        if (modalId === 'registrationModal') {
            const form = document.getElementById('registrationForm');
            if (form) {
                form.reset();
            }
        }
    }
}

// Handle registration form submission
function handleRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const registration = {
        eventTitle: document.getElementById('eventTitle').textContent,
        fullName: e.target[0].value,
        email: e.target[1].value,
        phone: e.target[2].value,
        college: e.target[3].value,
        year: e.target[4].value,
        teamMembers: e.target[5].value,
        comments: e.target[6].value,
        timestamp: new Date().toISOString()
    };
    
    // In a real app, you would send this data to your backend
    console.log('Registration submitted:', registration);
    
    // Store in localStorage for demo purposes
    let registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    registrations.push(registration);
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    
    // Close modal and reset form
    closeModal('registrationModal');
    e.target.reset();
    
    // Show success message
    showNotification('Registration submitted successfully! We will contact you soon.', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    } text-white`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.id === 'registrationModal') {
        closeModal('registrationModal');
    }
});

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
