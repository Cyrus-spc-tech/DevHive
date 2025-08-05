// Event Management System

// DOM Elements
const eventsGrid = document.getElementById('eventsGrid');
const adminControls = document.getElementById('adminControls');
const adminPanelLink = document.getElementById('adminPanelLink');
const addEventForm = document.getElementById('addEventForm');
const applyForm = document.getElementById('applyForm');

// Sample events data (in a real app, this would come from a backend)
let events = [
    {
        id: 1,
        title: 'Hack The Hive 1.0',
        date: '2025-09-01',
        time: '09:00',
        description: 'Annual coding competition where developers compete to build innovative projects in 24 hours.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
];

// Check if user is admin (in a real app, this would be handled by authentication)
const isAdmin = true; // Set to false to see user view

// Initialize the page
function init() {
    // Show/hide admin controls based on user role
    if (isAdmin && adminControls) {
        adminControls.classList.remove('hidden');
    }
    if (isAdmin && adminPanelLink) {
        adminPanelLink.classList.remove('hidden');
    }
    
    // Render events
    renderEvents();
    
    // Add event listeners
    addEventListeners();
}

// Add event listeners
function addEventListeners() {
    // Add event form submission
    if (addEventForm) {
        addEventForm.addEventListener('submit', handleAddEvent);
    }
    
    // Apply form submission
    if (applyForm) {
        applyForm.addEventListener('submit', handleApply);
    }
}

// Render events in the grid
function renderEvents() {
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        eventsGrid.innerHTML = '<p class="text-gray-500 text-center col-span-3 py-8">No events found. Check back later!</p>';
        return;
    }
    
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        const eventElement = document.createElement('div');
        eventElement.className = 'event-card';
        eventElement.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <span class="event-date">${formattedDate} • ${event.time}</span>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-actions">
                    <button onclick="openApplyModal(${event.id}, '${event.title.replace(/'/g, "\\'")}')" class="btn btn-primary">
                        Apply Now
                    </button>
                    ${isAdmin ? `
                    <div class="flex space-x-2">
                        <button onclick="editEvent(${event.id})" class="btn btn-outline">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteEvent(${event.id})" class="btn btn-outline text-red-500">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        eventsGrid.appendChild(eventElement);
    });
}

// Open add event modal
function openAddEventModal() {
    const modal = document.getElementById('addEventModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Open apply modal
function openApplyModal(eventId, eventTitle) {
    const modal = document.getElementById('applyModal');
    const titleElement = document.getElementById('eventTitle');
    
    if (modal && titleElement) {
        titleElement.textContent = eventTitle;
        modal.dataset.eventId = eventId;
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
        
        // Reset form if it's the add event form
        if (modalId === 'addEventModal' && addEventForm) {
            addEventForm.reset();
        }
    }
}

// Handle add event form submission
function handleAddEvent(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newEvent = {
        id: Date.now(), // Generate a unique ID
        title: formData.get('title') || 'Untitled Event',
        date: formData.get('date') || new Date().toISOString().split('T')[0],
        time: formData.get('time') || '12:00',
        description: formData.get('description') || 'No description provided.',
        image: formData.get('image') || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    };
    
    // Add the new event
    events.unshift(newEvent);
    
    // Re-render events
    renderEvents();
    
    // Close the modal and reset the form
    closeModal('addEventModal');
    
    // Show success message
    alert('Event added successfully!');
}

// Handle apply form submission
function handleApply(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const application = {
        eventId: document.getElementById('applyModal').dataset.eventId,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        teamName: formData.get('teamName'),
        teamMembers: formData.get('teamMembers').split(',').map(member => member.trim())
    };
    
    // In a real app, you would send this data to your backend
    console.log('Application submitted:', application);
    
    // Close the modal and reset the form
    closeModal('applyModal');
    e.target.reset();
    
    // Show success message
    alert('Your application has been submitted successfully!');
}

// Edit event
function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    // In a real app, you would open an edit form with the event data
    alert(`Editing event: ${event.title}`);
    console.log('Edit event:', event);
    
    // For demo purposes, we'll just open the add event form with the event data
    const modal = document.getElementById('addEventModal');
    if (modal) {
        // Set form values
        const form = document.getElementById('addEventForm');
        if (form) {
            form.querySelector('input[type="text"]').value = event.title;
            form.querySelector('input[type="date"]').value = event.date;
            form.querySelector('input[type="time"]').value = event.time;
            form.querySelector('textarea').value = event.description;
            form.querySelector('input[type="url"]').value = event.image;
            
            // Change form title and submit button
            modal.querySelector('h2').textContent = 'Edit Event';
            const submitBtn = modal.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Update Event';
            }
            
            // Store the event ID in the form
            form.dataset.eventId = eventId;
            
            // Open the modal
            openAddEventModal();
        }
    }
}

// Delete event
function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(event => event.id !== eventId);
        renderEvents();
        alert('Event deleted successfully!');
    }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
