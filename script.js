/* ==========================================================================
   Riverbend Yoga Studio - Interactive Features & Validation
   ========================================================================== */

// --- 1. DATA MANAGEMENT (Array of Objects) ---
const workshops = [
    {
        id: "mindful",
        title: "Beginner's Mindful Movement",
        level: "beginner",
        date: "First Saturday of the month, 10:00 AM - 12:00 PM",
        description: "A gentle introduction to foundational postures and breathwork."
    },
    {
        id: "restorative",
        title: "Restorative Weekend Reset",
        level: "all",
        date: "Third Sunday of the month, 4:00 PM - 6:00 PM",
        description: "Deep relaxation using props. Suitable for all experience levels."
    },
    {
        id: "chair",
        title: "Chair Yoga for Seniors",
        level: "beginner",
        date: "Every Tuesday, 11:00 AM - 12:00 PM",
        description: "Accessible yoga practiced entirely from a seated position."
    },
    {
        id: "vinyasa",
        title: "Advanced Vinyasa Flow",
        level: "advanced",
        date: "Second Saturday of the month, 9:00 AM - 10:30 AM",
        description: "A dynamic, challenging sequence for experienced practitioners."
    }
];

// --- 2. INTERACTIVE FEATURE: Workshop Filter ---

// Function to render the workshops based on a filter
function renderWorkshops(filterLevel) {
    const listContainer = document.getElementById('workshop-list');
    if (!listContainer) return; // Exit if not on the events page

    // Clear current list
    listContainer.innerHTML = '';

    // Filter the data array
    const filteredWorkshops = workshops.filter(workshop => 
        filterLevel === 'all' || workshop.level === filterLevel || workshop.level === 'all'
    );

    // Handle empty results
    if (filteredWorkshops.length === 0) {
        listContainer.innerHTML = '<li>No workshops found for this level. Please check back later!</li>';
        return;
    }

    // Create and append new list items
    filteredWorkshops.forEach(workshop => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${workshop.title}:</strong> ${workshop.date}<br>
            <em>${workshop.description}</em>
        `;
        listContainer.appendChild(li);
    });
}

// Function to handle the filter change event
function handleFilterChange(event) {
    const selectedLevel = event.target.value;
    
    // Update the DOM
    renderWorkshops(selectedLevel);
    
    // Save preference to localStorage
    localStorage.setItem('preferredWorkshopLevel', selectedLevel);
}

// Function to initialize the filter on page load
function initWorkshopFilter() {
    const filterSelect = document.getElementById('workshop-filter');
    if (!filterSelect) return; // Exit if not on the events page

    // 1. Check localStorage for saved preference
    const savedLevel = localStorage.getItem('preferredWorkshopLevel');
    
    // 2. Set the dropdown to the saved level (or default to 'all')
    if (savedLevel) {
        filterSelect.value = savedLevel;
    }

    // 3. Render the workshops based on the current selection
    renderWorkshops(filterSelect.value);

    // 4. Add event listener for future changes
    filterSelect.addEventListener('change', handleFilterChange);
}

// --- 3. FORM VALIDATION ---

function validateForm(event) {
    event.preventDefault(); // Prevent form submission by default

    let isValid = true;

    // Get fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const interestInput = document.getElementById('interest');
    
    // Get error containers
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const interestError = document.getElementById('interest-error');

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    interestError.textContent = '';

    // 1. Required Field Check (Name)
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your full name.';
        isValid = false;
    }

    // 2. Required Field & Email Format Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address (e.g., name@example.com).';
        isValid = false;
    }

    // 3. Required Field Check (Interest Dropdown)
    if (interestInput.value === '') {
        interestError.textContent = 'Please select a workshop.';
        isValid = false;
    }

    // If valid, simulate successful submission
    if (isValid) {
        alert('Thank you! Your spot request has been submitted. We will contact you soon.');
        document.getElementById('registration-form').reset();
    }
}

// Function to clear errors as the user types
function clearErrorOnInput(event) {
    const fieldName = event.target.id;
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// --- 4. INITIALIZATION ---

// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize the workshop filter (runs only if elements exist)
    initWorkshopFilter();

    // Attach form validation
    const form = document.getElementById('registration-form');
    if (form) {
        form.addEventListener('submit', validateForm);
        
        // Add input listeners to clear errors dynamically
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', clearErrorOnInput);
        });
    }
});