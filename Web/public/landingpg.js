 // Ensure video plays on mobile devices
 document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('chipsVideo');
    if (video) {
        video.play().catch(error => {
            console.log('Video autoplay failed:', error);
        });
    }

    // Dropdown functionality
    const profileDropdown = document.getElementById('profileDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    let hideTimeout;
    
    function showDropdown() {
        clearTimeout(hideTimeout);
        dropdownMenu.classList.remove('hidden');
    }
    
    function hideDropdown() {
        // Add a small delay before hiding to allow moving to the dropdown
        hideTimeout = setTimeout(() => {
            if (!profileDropdown.matches(':hover') && !dropdownMenu.matches(':hover')) {
                dropdownMenu.classList.add('hidden');
            }
        }, 300);
    }
    
    // Toggle dropdown on click for mobile
    document.getElementById('profileButton').addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });
    
    // Show/hide on hover for desktop
    profileDropdown.addEventListener('mouseenter', showDropdown);
    dropdownMenu.addEventListener('mouseenter', showDropdown);
    
    profileDropdown.addEventListener('mouseleave', hideDropdown);
    dropdownMenu.addEventListener('mouseleave', hideDropdown);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileDropdown.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
});