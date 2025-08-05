// Demo Orders Data
const demoOrders = {
    'ORD001': {
        orderId: 'ORD001',
        customerName: 'John Smith',
        item: 'Electronics Package - Smartphone',
        weight: '0.5 kg',
        value: '$899.99',
        origin: 'New York Warehouse',
        destination: '12345 Main St, Boston, MA',
        status: 'Out for Delivery',
        estimatedDelivery: '2025-08-05',
        trackingHistory: [
            { status: 'Order Placed', date: '2025-08-01 09:00', location: 'New York' },
            { status: 'Processing', date: '2025-08-01 14:30', location: 'New York Warehouse' },
            { status: 'Shipped', date: '2025-08-02 08:15', location: 'New York Distribution Center' },
            { status: 'In Transit', date: '2025-08-03 12:00', location: 'Philadelphia Hub' },
            { status: 'Out for Delivery', date: '2025-08-04 08:30', location: 'Boston Local Facility' }
        ],
        deliveryPerson: {
            name: 'Mike Johnson',
            phone: '+1-555-0123',
            rating: 4.8
        }
    },
    'ORD002': {
        orderId: 'ORD002',
        customerName: 'Sarah Williams',
        item: 'Books Package - Technical Manuals',
        weight: '2.1 kg',
        value: '$249.99',
        origin: 'Chicago Warehouse',
        destination: '456 Oak Ave, Detroit, MI',
        status: 'Delivered',
        estimatedDelivery: '2025-08-03',
        actualDelivery: '2025-08-03 15:45',
        trackingHistory: [
            { status: 'Order Placed', date: '2025-07-30 11:20', location: 'Chicago' },
            { status: 'Processing', date: '2025-07-30 16:45', location: 'Chicago Warehouse' },
            { status: 'Shipped', date: '2025-07-31 09:30', location: 'Chicago Distribution Center' },
            { status: 'In Transit', date: '2025-08-01 14:15', location: 'Milwaukee Hub' },
            { status: 'Out for Delivery', date: '2025-08-03 09:00', location: 'Detroit Local Facility' },
            { status: 'Delivered', date: '2025-08-03 15:45', location: '456 Oak Ave, Detroit, MI' }
        ],
        deliveryPerson: {
            name: 'Lisa Chen',
            phone: '+1-555-0456',
            rating: 4.9
        }
    },
    'ORD003': {
        orderId: 'ORD003',
        customerName: 'David Brown',
        item: 'Clothing Package - Winter Jacket',
        weight: '1.2 kg',
        value: '$159.99',
        origin: 'Los Angeles Warehouse',
        destination: '789 Pine St, San Francisco, CA',
        status: 'In Transit',
        estimatedDelivery: '2025-08-06',
        trackingHistory: [
            { status: 'Order Placed', date: '2025-08-02 13:15', location: 'Los Angeles' },
            { status: 'Processing', date: '2025-08-02 18:30', location: 'Los Angeles Warehouse' },
            { status: 'Shipped', date: '2025-08-03 07:45', location: 'Los Angeles Distribution Center' },
            { status: 'In Transit', date: '2025-08-04 11:20', location: 'Fresno Hub' }
        ],
        deliveryPerson: null
    },
    'ORD004': {
        orderId: 'ORD004',
        customerName: 'Emma Davis',
        item: 'Home Appliance - Coffee Machine',
        weight: '4.5 kg',
        value: '$299.99',
        origin: 'Seattle Warehouse',
        destination: '321 Elm Dr, Portland, OR',
        status: 'Exception',
        estimatedDelivery: '2025-08-05',
        exception: 'Address verification required',
        trackingHistory: [
            { status: 'Order Placed', date: '2025-08-01 10:30', location: 'Seattle' },
            { status: 'Processing', date: '2025-08-01 15:15', location: 'Seattle Warehouse' },
            { status: 'Shipped', date: '2025-08-02 09:00', location: 'Seattle Distribution Center' },
            { status: 'In Transit', date: '2025-08-03 13:45', location: 'Portland Hub' },
            { status: 'Exception', date: '2025-08-04 10:15', location: 'Portland Local Facility' }
        ],
        deliveryPerson: {
            name: 'Tom Wilson',
            phone: '+1-555-0789',
            rating: 4.7
        }
    },
    'ORD005': {
        orderId: 'ORD005',
        customerName: 'Michael Garcia',
        item: 'Sports Equipment - Basketball',
        weight: '0.8 kg',
        value: '$89.99',
        origin: 'Miami Warehouse',
        destination: '654 Beach Blvd, Tampa, FL',
        status: 'Processing',
        estimatedDelivery: '2025-08-07',
        trackingHistory: [
            { status: 'Order Placed', date: '2025-08-04 14:20', location: 'Miami' },
            { status: 'Processing', date: '2025-08-04 16:45', location: 'Miami Warehouse' }
        ],
        deliveryPerson: null
    }
};

// Global Variables
let chatbotOpen = true;
let currentUser = null;
let orders = [];

// Complaint and Feedback Functionality
let complaints = [];
let feedbacks = [];

// Delivery Person Contact Functionality
let deliveryInstructions = [];

// Human Support Escalation and Real-Time Location
let supportTickets = [];
let locationUpdateInterval = null;

// Order Location Tracking
let orderLocationUpdateInterval = null;
let orderLocationData = {};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadDemoData();
});

// Initialize Application
function initializeApp() {
    console.log('LogiTrack Platform Initialized');
    
    // Check for saved user session
    const savedUser = localStorage.getItem('logitrack_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
    
    // Load saved orders
    const savedOrders = localStorage.getItem('logitrack_orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
    
    // Initialize chatbot
    initializeChatbot();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Form Event Listeners
    const trackingForm = document.getElementById('trackingForm');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const newOrderForm = document.getElementById('newOrderForm');
    const contactForm = document.getElementById('contactForm');
    
    if (trackingForm) {
        trackingForm.addEventListener('submit', handleTracking);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    if (newOrderForm) {
        newOrderForm.addEventListener('submit', handleNewOrder);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
    
    // Chat input enter key
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Complaint and Feedback Event Listeners
    const complaintForm = document.getElementById('complaintForm');
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (complaintForm) {
        complaintForm.addEventListener('submit', handleComplaint);
    }
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedback);
    }
    
    // Setup rating stars
    setupRatingStars();
    
    // Form validation
    setupFormValidation();
    
    // Delivery Instructions Event Listener
    const deliveryInstructionsForm = document.getElementById('deliveryInstructionsForm');
    if (deliveryInstructionsForm) {
        deliveryInstructionsForm.addEventListener('submit', handleDeliveryInstructions);
    }
    
    // Quick instruction buttons
    const instructionBtns = document.querySelectorAll('.instruction-btn');
    instructionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleInstructionButton(this);
        });
    });
    
    // Human Support Event Listener
    const humanSupportForm = document.getElementById('humanSupportForm');
    if (humanSupportForm) {
        humanSupportForm.addEventListener('submit', handleHumanSupportEscalation);
    }
}

// Handle Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '';
        navbar.style.backdropFilter = '';
    }
}

// Tracking Functionality
function handleTracking(e) {
    e.preventDefault();
    
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    const trackingResults = document.getElementById('trackingResults');
    const trackingDetails = document.getElementById('trackingDetails');
    
    if (!trackingNumber) {
        showAlert('Please enter a tracking number', 'danger');
        return;
    }
    
    // Simulate API call with loading state
    showLoading('Tracking your package...');
    
    setTimeout(() => {
        hideLoading();
        
        // Demo tracking data
        const trackingData = generateTrackingData(trackingNumber);
        
        trackingDetails.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <strong>Tracking Number:</strong> ${trackingData.trackingNumber}<br>
                    <strong>Status:</strong> <span class="badge bg-${trackingData.statusColor}">${trackingData.status}</span><br>
                    <strong>Estimated Delivery:</strong> ${trackingData.estimatedDelivery}
                </div>
                <div class="col-md-6">
                    <strong>From:</strong> ${trackingData.origin}<br>
                    <strong>To:</strong> ${trackingData.destination}<br>
                    <strong>Service:</strong> ${trackingData.service}
                </div>
            </div>
        `;
        
        trackingResults.classList.remove('d-none');
        trackingResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Show complaint section if applicable
        showComplaintSectionIfDelivered(trackingData);
        
        // Add to recent searches
        addToRecentSearches(trackingNumber);
        
    }, 1500);
}

// Show Delivery Person Contact based on delivery status
function showDeliveryPersonContactIfOutForDelivery(trackingData) {
    const deliveryPersonContact = document.getElementById('deliveryPersonContact');
    
    // Show delivery person contact if package is out for delivery
    if (trackingData.status === 'Out for Delivery') {
        deliveryPersonContact.classList.remove('d-none');
        
        // Generate random delivery person data
        const deliveryPerson = generateDeliveryPersonData();
        updateDeliveryPersonInfo(deliveryPerson, trackingData.trackingNumber);
        
        // Update ETA based on current time
        updateDeliveryETA();
        
    } else {
        deliveryPersonContact.classList.add('d-none');
    }
}

// Generate Demo Tracking Data
function generateTrackingData(trackingNumber) {
    // Check if the tracking number matches a demo order
    const upperTrackingNumber = trackingNumber.toUpperCase();
    if (demoOrders[upperTrackingNumber]) {
        const order = demoOrders[upperTrackingNumber];
        
        let statusColor = '';
        switch (order.status) {
            case 'Processing': statusColor = 'secondary'; break;
            case 'Shipped': statusColor = 'primary'; break;
            case 'In Transit': statusColor = 'info'; break;
            case 'Out for Delivery': statusColor = 'warning'; break;
            case 'Delivered': statusColor = 'success'; break;
            case 'Exception': statusColor = 'danger'; break;
            default: statusColor = 'secondary';
        }
        
        const trackingData = {
            trackingNumber: upperTrackingNumber,
            status: order.status,
            statusColor: statusColor,
            estimatedDelivery: order.estimatedDelivery,
            actualDelivery: order.actualDelivery,
            origin: order.origin,
            destination: order.destination,
            service: 'Express Delivery',
            item: order.item,
            customerName: order.customerName,
            weight: order.weight,
            value: order.value,
            trackingHistory: order.trackingHistory,
            deliveryPerson: order.deliveryPerson,
            exception: order.exception
        };
        
        // Show delivery person contact if out for delivery
        setTimeout(() => {
            showDeliveryPersonContactIfOutForDelivery(trackingData);
        }, 100);
        
        // Show complaint section if applicable
        setTimeout(() => {
            showComplaintSectionIfDelivered(trackingData);
        }, 200);
        
        return trackingData;
    }
    
    // Fallback to random data for other tracking numbers
    const statuses = [
        { status: 'Out for Delivery', color: 'warning' },
        { status: 'In Transit', color: 'info' },
        { status: 'Delivered', color: 'success' },
        { status: 'Processing', color: 'secondary' },
        { status: 'Delivery Attempted', color: 'warning' },
        { status: 'Exception', color: 'danger' }
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const trackingData = {
        trackingNumber: trackingNumber,
        status: randomStatus.status,
        statusColor: randomStatus.color,
        estimatedDelivery: getRandomDate(),
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        service: 'Express Delivery'
    };
    
    // Show delivery person contact if out for delivery
    setTimeout(() => {
        showDeliveryPersonContactIfOutForDelivery(trackingData);
    }, 100);
    
    // Show complaint section if applicable
    setTimeout(() => {
        showComplaintSectionIfDelivered(trackingData);
    }, 200);
    
    return trackingData;
}

// Generate Random Delivery Person Data
function generateDeliveryPersonData() {
    const deliveryPersons = [
        {
            name: 'John Smith',
            phone: '+1 (555) 123-4567',
            rating: '4.8',
            deliveries: '127',
            eta: '15-20 minutes'
        },
        {
            name: 'Maria Garcia',
            phone: '+1 (555) 987-6543',
            rating: '4.9',
            deliveries: '203',
            eta: '10-15 minutes'
        },
        {
            name: 'David Johnson',
            phone: '+1 (555) 456-7890',
            rating: '4.7',
            deliveries: '89',
            eta: '20-25 minutes'
        },
        {
            name: 'Sarah Williams',
            phone: '+1 (555) 321-0987',
            rating: '4.9',
            deliveries: '156',
            eta: '12-18 minutes'
        }
    ];
    
    return deliveryPersons[Math.floor(Math.random() * deliveryPersons.length)];
}

// Update Delivery Person Information
function updateDeliveryPersonInfo(deliveryPerson, trackingNumber) {
    document.getElementById('deliveryPersonName').textContent = deliveryPerson.name;
    document.getElementById('deliveryPersonPhone').textContent = deliveryPerson.phone;
    document.getElementById('deliveryETA').textContent = deliveryPerson.eta;
    
    // Update rating and deliveries
    const ratingElement = document.querySelector('.delivery-person-info p');
    ratingElement.textContent = `Delivery Executive • ${deliveryPerson.rating} ⭐ (${deliveryPerson.deliveries} deliveries)`;
    
    // Setup call functionality
    const callButton = document.getElementById('callDeliveryPerson');
    callButton.onclick = () => callDeliveryPerson(deliveryPerson.phone);
    
    // Pre-fill tracking number in delivery instructions
    const instructionTrackingInput = document.getElementById('instructionTrackingNumber');
    if (instructionTrackingInput) {
        instructionTrackingInput.value = trackingNumber;
    }
}

// Update Delivery ETA
function updateDeliveryETA() {
    // Simulate real-time ETA updates
    setInterval(() => {
        const etaElement = document.getElementById('deliveryETA');
        if (etaElement && !document.getElementById('deliveryPersonContact').classList.contains('d-none')) {
            const currentETA = etaElement.textContent;
            const minutes = parseInt(currentETA.split('-')[0]);
            
            if (minutes > 5) {
                const newMin = minutes - 1;
                const newMax = minutes + 3;
                etaElement.textContent = `${newMin}-${newMax} minutes`;
                
                // Update progress bar
                const progressBar = document.querySelector('#deliveryPersonContact .progress-bar');
                const currentWidth = parseInt(progressBar.style.width);
                if (currentWidth < 95) {
                    progressBar.style.width = (currentWidth + 2) + '%';
                }
                
                // Update last updated time
                const lastUpdated = document.querySelector('#deliveryPersonContact small');
                lastUpdated.textContent = 'Last updated: Just now';
            }
        }
    }, 60000); // Update every minute
}

// Login Functionality
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters', 'danger');
        return;
    }
    
    // Simulate API call
    showLoading('Signing in...');
    
    setTimeout(() => {
        hideLoading();
        
        // Demo login (accept any valid email/password)
        currentUser = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        };
        
        if (rememberMe) {
            localStorage.setItem('logitrack_user', JSON.stringify(currentUser));
        }
        
        updateUIForLoggedInUser();
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        showAlert('Welcome back! You have been successfully logged in.', 'success');
        
    }, 1000);
}

// Signup Functionality
function handleSignup(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    if (!firstName || !lastName) {
        showAlert('Please enter your full name', 'danger');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    if (!validatePhone(phone)) {
        showAlert('Please enter a valid phone number', 'danger');
        return;
    }
    
    if (password.length < 8) {
        showAlert('Password must be at least 8 characters long', 'danger');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }
    
    if (!agreeTerms) {
        showAlert('Please agree to the Terms of Service and Privacy Policy', 'danger');
        return;
    }
    
    // Simulate API call
    showLoading('Creating your account...');
    
    setTimeout(() => {
        hideLoading();
        
        currentUser = {
            id: Date.now(),
            email: email,
            name: `${firstName} ${lastName}`,
            phone: phone,
            signupTime: new Date().toISOString()
        };
        
        localStorage.setItem('logitrack_user', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
        showAlert('Account created successfully! Welcome to LogiTrack.', 'success');
        
    }, 1500);
}

// New Order Functionality
function handleNewOrder(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        id: generateOrderId(),
        senderName: document.getElementById('senderName').value,
        senderPhone: document.getElementById('senderPhone').value,
        senderAddress: document.getElementById('senderAddress').value,
        recipientName: document.getElementById('recipientName').value,
        recipientPhone: document.getElementById('recipientPhone').value,
        recipientAddress: document.getElementById('recipientAddress').value,
        packageType: document.getElementById('packageType').value,
        deliveryType: document.getElementById('deliveryType').value,
        weight: document.getElementById('weight').value,
        length: document.getElementById('length').value,
        width: document.getElementById('width').value,
        specialInstructions: document.getElementById('specialInstructions').value,
        status: 'Order Confirmed',
        createdAt: new Date().toISOString(),
        estimatedDelivery: calculateEstimatedDelivery(document.getElementById('deliveryType').value)
    };
    
    // Validation
    const requiredFields = ['senderName', 'senderPhone', 'senderAddress', 'recipientName', 'recipientPhone', 'recipientAddress', 'packageType', 'deliveryType', 'weight', 'length', 'width'];
    
    for (let field of requiredFields) {
        if (!orderData[field]) {
            showAlert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'danger');
            return;
        }
    }
    
    // Simulate API call
    showLoading('Creating your order...');
    
    setTimeout(() => {
        hideLoading();
        
        orders.push(orderData);
        localStorage.setItem('logitrack_orders', JSON.stringify(orders));
        
        bootstrap.Modal.getInstance(document.getElementById('newOrderModal')).hide();
        showOrderConfirmation(orderData);
        
        // Reset form
        e.target.reset();
        
    }, 2000);
}

// Contact Form Functionality
function handleContact(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !subject || !message) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // Simulate API call
    showLoading('Sending your message...');
    
    setTimeout(() => {
        hideLoading();
        showAlert('Thank you for your message! We will get back to you within 24 hours.', 'success');
        e.target.reset();
    }, 1000);
}

// Chatbot Functionality
function initializeChatbot() {
    const chatbotBody = document.getElementById('chatbotBody');
    const chatToggleIcon = document.getElementById('chatToggleIcon');
    
    if (!chatbotOpen) {
        chatbotBody.classList.add('collapsed');
        chatToggleIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

function toggleChat() {
    const chatbotBody = document.getElementById('chatbotBody');
    const chatToggleIcon = document.getElementById('chatToggleIcon');
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbotBody.classList.remove('collapsed');
        chatToggleIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        chatbotBody.classList.add('collapsed');
        chatToggleIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addChatMessage(botResponse, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (sender === 'bot') {
        messageContent.innerHTML = `<i class="fas fa-robot me-2"></i>${message}`;
        
        // Add FAQ buttons if this is an FAQ response
        if (message.includes('Frequently Asked Questions')) {
            setTimeout(() => {
                addFAQButtonsToChat();
            }, 500);
        }
    } else {
        messageContent.textContent = message;
    }
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add FAQ buttons to chat interface
function addFAQButtonsToChat() {
    const chatMessages = document.getElementById('chatMessages');
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'bot-message mt-2';
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'message-content bg-light p-3 rounded';
    
    let buttonsHTML = '<div class="faq-buttons-section">';
    buttonsHTML += '<h6 class="text-primary mb-2">📋 Quick Help:</h6>';
    buttonsHTML += '<div class="row g-2 mb-3">';
    
    // Interactive FAQ buttons with specific functions
    const topFAQs = [
        { function: 'handleTrackOrder', text: 'Track Order', icon: 'search', color: 'primary' },
        { function: 'handlePackageDelayed', text: 'Package Delayed', icon: 'clock', color: 'warning' },
        { function: 'handleMissingPackage', text: 'Missing Package', icon: 'question-circle', color: 'info' },
        { function: 'handleDamagedPackage', text: 'Damaged Package', icon: 'exclamation-triangle', color: 'danger' }
    ];
    
    topFAQs.forEach(faq => {
        buttonsHTML += `<div class="col-md-6 col-12">
            <button class="btn btn-outline-${faq.color} btn-sm w-100 text-start faq-btn" 
                    style="font-size: 0.85rem; padding: 0.5rem; white-space: normal;"
                    onclick="${faq.function}()">
                <i class="fas fa-${faq.icon} me-2"></i>${faq.text}
            </button>
        </div>`;
    });
    
    buttonsHTML += '</div><h6 class="text-warning mb-2">🔧 More Options:</h6><div class="row g-2">';
    
    const moreFAQs = [
        { function: 'handleChangeAddress', text: 'Change Address', icon: 'map-marker-alt' },
        { function: 'handleReschedule', text: 'Reschedule Delivery', icon: 'calendar' },
        { function: 'handleDeliveryInstructions', text: 'Delivery Instructions', icon: 'edit' },
        { function: 'handleMissedDelivery', text: 'Missed Delivery', icon: 'home' }
    ];
    
    moreFAQs.forEach(faq => {
        buttonsHTML += `<div class="col-md-6 col-12">
            <button class="btn btn-outline-warning btn-sm w-100 text-start faq-btn" 
                    style="font-size: 0.85rem; padding: 0.5rem;"
                    onclick="${faq.function}()">
                <i class="fas fa-${faq.icon} me-2"></i>${faq.text}
            </button>
        </div>`;
    });
    
    buttonsHTML += '</div><h6 class="text-danger mb-2 mt-2">🚨 Urgent Issues:</h6><div class="row g-2">';
    
    buttonsHTML += `<div class="col-md-6">
        <button class="btn btn-outline-danger btn-sm w-100 text-start faq-btn" 
                style="font-size: 0.85rem; padding: 0.5rem;"
                onclick="handlePerishableDelayed()">
            <i class="fas fa-snowflake me-2"></i>Perishable Delayed
        </button>
    </div>`;
    
    buttonsHTML += `<div class="col-md-6">
        <button class="btn btn-outline-danger btn-sm w-100 text-start faq-btn" 
                style="font-size: 0.85rem; padding: 0.5rem;"
                onclick="handleMedicalDelayed()">
            <i class="fas fa-pills me-2"></i>Medical Delayed
        </button>
    </div>`;
    
    buttonsHTML += '</div></div>';
    
    buttonsDiv.innerHTML = buttonsHTML;
    buttonContainer.appendChild(buttonsDiv);
    chatMessages.appendChild(buttonContainer);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle FAQ button selection
function selectFAQ(faqId) {
    document.getElementById('chatInput').value = faqId;
    sendMessage();
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if message contains an order ID
    const orderPattern = /ord\d{3}/i;
    const orderMatch = userMessage.match(orderPattern);
    
    if (orderMatch) {
        const orderId = orderMatch[0].toUpperCase();
        return getOrderStatusResponse(orderId);
    }
    
    // Handle FAQ requests
    if (lowerMessage.includes('faq') || lowerMessage.includes('help with') || lowerMessage.includes('questions')) {
        setTimeout(() => addFAQButtonsToChat(), 500);
        return "🤖 **I'm here to help!** Let me show you some quick options:";
    }
    
    // Handle specific FAQ selections
    if (lowerMessage.includes('faq_')) {
        const faqId = lowerMessage.match(/faq_[a-z]*_?\d+/);
        if (faqId) {
            setTimeout(() => addFAQButtonsToChat(), 500);
            return "💡 Let me show you the available options:";
        }
    }
    
    // Handle FAQ keyword searches
    if (lowerMessage.includes('general faq')) {
        setTimeout(() => addFAQButtonsToChat(), 500);
        return "📋 **General FAQ Options** - Here are the most common questions:";
    }
    
    if (lowerMessage.includes('urgent faq')) {
        setTimeout(() => addFAQButtonsToChat(), 500);
        return "🚨 **Urgent Issues** - Quick help for time-sensitive problems:";
    }
    
    // Search FAQs by keywords
    const faqKeywords = ['tracking', 'delayed', 'missing', 'damaged', 'address', 'reschedule', 'instructions', 'missed', 'perishable', 'medical'];
    for (let keyword of faqKeywords) {
        if (lowerMessage.includes(keyword)) {
            setTimeout(() => addFAQButtonsToChat(), 500);
            return `🔍 **Help with ${keyword}** - Let me show you the relevant options:`;
        }
    }
    
    // Handle predefined options after order status inquiry
    if (window.currentOrderId && lowerMessage.includes('agent details')) {
        return getAgentDetailsResponse();
    }
    
    if (window.currentOrderId && lowerMessage.includes('create ticket')) {
        return getCreateTicketResponse(window.currentOrderId);
    }
    
    if (window.currentOrderId && lowerMessage.includes('track location')) {
        return getTrackLocationResponse(window.currentOrderId);
    }
    
    if (window.currentOrderId && lowerMessage.includes('contact delivery')) {
        return getContactDeliveryResponse(window.currentOrderId);
    }
    
    if (window.currentOrderId && lowerMessage.includes('delivery updates')) {
        return getDeliveryUpdatesResponse(window.currentOrderId);
    }
    
    if (window.currentOrderId && lowerMessage.includes('order history')) {
        return getOrderHistoryResponse(window.currentOrderId);
    }
    
    // Check for order-related keywords
    if (lowerMessage.includes('order') && (lowerMessage.includes('status') || lowerMessage.includes('track'))) {
        return "📦 I can help you track your order! Please provide your order ID or try one of these demo orders:\n\n" +
               "• ORD001 - Out for Delivery 🚚\n" +
               "• ORD002 - Delivered ✅\n" +
               "• ORD003 - In Transit 🚛\n" +
               "• ORD004 - Exception ⚠️\n" +
               "• ORD005 - Processing 📋\n\n" +
               "Just type the order ID (e.g., 'ORD001') and I'll give you the current status!";
    }
    
    // Check for delivery person contact
    if (lowerMessage.includes('delivery') && (lowerMessage.includes('person') || lowerMessage.includes('driver') || lowerMessage.includes('contact'))) {
        return "📞 For orders that are 'Out for Delivery', you can contact the delivery person directly. Use the tracking feature to see delivery person contact details when your package is out for delivery.";
    }
    
    // Check for complaint-related queries
    if (lowerMessage.includes('complaint') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
        return "😔 I'm sorry to hear you're having an issue! For delivered packages, you can file a complaint using our complaint system. For urgent matters, I can escalate you to human support. What seems to be the problem?";
    }
    
    if (lowerMessage.includes('track') || lowerMessage.includes('tracking')) {
        return 'I can help you track your package! Please enter your tracking number in the tracking section above, or provide it here and I\'ll look it up for you.';
    } else if (lowerMessage.includes('order') || lowerMessage.includes('ship')) {
        return 'I can assist you with creating a new order! You can click the "New Order" button to get started, or I can guide you through the process here.';
    } else if (lowerMessage.includes('delivery') || lowerMessage.includes('time')) {
        return 'Our delivery times vary by service: Standard (3-5 days), Express (1-2 days), Overnight, and Same Day. Which service are you interested in?';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return 'Pricing depends on package size, weight, destination, and service type. I can provide a quote if you share your package details!';
    } else if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
        return 'I\'m here to help! I can assist with tracking packages, creating orders, answering questions about our services, or connecting you with a human agent. What do you need help with?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'Hello! I\'m your AI assistant. Write "faq" to start your journey!';
    } else {
        return 'I understand you\'re asking about "' + userMessage + '". While I\'m still learning, I can help you with tracking packages, creating orders, delivery information, and general support. Is there something specific I can assist you with?';
    }
}

// Function to get order status response for chatbot
function getOrderStatusResponse(orderId) {
    const order = demoOrders[orderId];
    
    if (!order) {
        return `❌ Sorry, I couldn't find an order with ID "${orderId}". Please check your order ID and try again.\n\n📦 Available demo orders: ORD001, ORD002, ORD003, ORD004, ORD005`;
    }
    
    let response = `📦 **Order Status for ${orderId}**\n\n`;
    response += `📋 **Item:** ${order.item}\n`;
    response += `👤 **Customer:** ${order.customerName}\n`;
    response += `📍 **From:** ${order.origin}\n`;
    response += `🏠 **To:** ${order.destination}\n`;
    response += `⚖️ **Weight:** ${order.weight}\n`;
    response += `💰 **Value:** ${order.value}\n\n`;
    
    // Status with emoji
    let statusEmoji = '';
    switch (order.status) {
        case 'Processing': statusEmoji = '📋'; break;
        case 'Shipped': statusEmoji = '📦'; break;
        case 'In Transit': statusEmoji = '🚛'; break;
        case 'Out for Delivery': statusEmoji = '🚚'; break;
        case 'Delivered': statusEmoji = '✅'; break;
        case 'Exception': statusEmoji = '⚠️'; break;
        default: statusEmoji = '📦';
    }
    
    response += `🔄 **Current Status:** ${statusEmoji} ${order.status}\n`;
    
    if (order.status === 'Exception' && order.exception) {
        response += `⚠️ **Issue:** ${order.exception}\n`;
    }
    
    if (order.status === 'Delivered' && order.actualDelivery) {
        response += `✅ **Delivered:** ${order.actualDelivery}\n`;
    } else if (order.estimatedDelivery) {
        response += `📅 **Estimated Delivery:** ${order.estimatedDelivery}\n`;
    }
    
    // Delivery person info for active deliveries
    if (order.deliveryPerson && (order.status === 'Out for Delivery' || order.status === 'Exception')) {
        response += `\n👨‍💼 **Delivery Person:** ${order.deliveryPerson.name}\n`;
        response += `📞 **Contact:** ${order.deliveryPerson.phone}\n`;
        response += `⭐ **Rating:** ${order.deliveryPerson.rating}/5.0\n`;
    }
    
    // Latest tracking update
    if (order.trackingHistory && order.trackingHistory.length > 0) {
        const latestUpdate = order.trackingHistory[order.trackingHistory.length - 1];
        response += `\n📍 **Latest Update:** ${latestUpdate.date}\n`;
        response += `📌 **Location:** ${latestUpdate.location}\n`;
    }
    
    // Add predefined options after order status
    response += `\n\n🔧 **What would you like to do next?**\n`;
    response += `Type one of these options:\n\n`;
    response += `• **"agent details"** - View available support agents\n`;
    response += `• **"create ticket"** - Create a support ticket for this order\n`;
    response += `• **"faq"** - View frequently asked questions\n`;
    response += `• **"track location"** - View real-time location (if out for delivery)\n`;
    response += `• **"contact delivery"** - Contact delivery person (if applicable)\n`;
    response += `• **"delivery updates"** - Get delivery notifications\n`;
    response += `• **"order history"** - View complete tracking history\n\n`;
    
    // Additional actions based on status
    if (order.status === 'Out for Delivery') {
        response += `💡 **Quick Actions:** You can also track real-time location or contact your delivery person directly!`;
    } else if (order.status === 'Delivered') {
        response += `💡 **Quick Actions:** File a complaint, provide feedback, or rate your delivery experience!`;
    } else if (order.status === 'Exception') {
        response += `💡 **Urgent:** I recommend creating a support ticket or viewing agent details to resolve this issue quickly.`;
    } else {
        response += `💡 **Tip:** Create a support ticket if you have any questions or concerns about your order.`;
    }
    
    // Store the current order ID for follow-up actions
    window.currentOrderId = orderId;
    
    return response;
}

// Helper functions for chatbot predefined options

function getAgentDetailsResponse() {
    const agents = [
        {
            name: 'Sarah Johnson',
            id: 'AGT001',
            specialization: 'Delivery Issues',
            rating: 4.9,
            experience: '5 years',
            languages: ['English', 'Spanish'],
            availability: 'Available Now',
            avgResponseTime: '2 minutes'
        },
        {
            name: 'Michael Chen',
            id: 'AGT002',
            specialization: 'Order Tracking',
            rating: 4.8,
            experience: '3 years',
            languages: ['English', 'Mandarin'],
            availability: 'Available Now',
            avgResponseTime: '3 minutes'
        },
        {
            name: 'Emily Rodriguez',
            id: 'AGT003',
            specialization: 'Complaints & Refunds',
            rating: 4.7,
            experience: '4 years',
            languages: ['English', 'Spanish', 'Portuguese'],
            availability: 'Busy (15 min wait)',
            avgResponseTime: '5 minutes'
        }
    ];
    
    let response = '👥 **Available Support Agents**\n\n';
    
    agents.forEach((agent, index) => {
        response += `**${index + 1}. ${agent.name}** (${agent.id})\n`;
        response += `🎯 **Specialization:** ${agent.specialization}\n`;
        response += `⭐ **Rating:** ${agent.rating}/5.0\n`;
        response += `📅 **Experience:** ${agent.experience}\n`;
        response += `🌍 **Languages:** ${agent.languages.join(', ')}\n`;
        response += `🔍 **Status:** ${agent.availability}\n`;
        response += `⏱️ **Avg Response:** ${agent.avgResponseTime}\n\n`;
    });
    
    response += '💡 **To connect with an agent, type:**\n';
    response += '• "connect agent 1" - Connect with Sarah Johnson\n';
    response += '• "connect agent 2" - Connect with Michael Chen\n';
    response += '• "connect agent 3" - Connect with Emily Rodriguez\n\n';
    response += '🎫 **Or type "create ticket" to submit a support request first.';
    
    return response;
}

function getCreateTicketResponse(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        return '❌ Order not found. Please provide a valid order ID first.';
    }
    
    // Generate a ticket ID
    const ticketId = 'TKT' + Date.now().toString().slice(-6);
    
    let response = `🎫 **Creating Support Ticket for ${orderId}**\n\n`;
    response += `**Ticket ID:** ${ticketId}\n`;
    response += `**Order:** ${orderId} - ${order.item}\n`;
    response += `**Current Status:** ${order.status}\n`;
    response += `**Created:** ${new Date().toLocaleString()}\n\n`;
    
    response += '📝 **Please describe your issue or concern:**\n\n';
    response += '**Common Issues:**\n';
    response += '• "Delayed delivery" - Package is late\n';
    response += '• "Damaged package" - Item arrived damaged\n';
    response += '• "Wrong address" - Delivery address issue\n';
    response += '• "Missing items" - Items missing from package\n';
    response += '• "Delivery person issue" - Problem with delivery person\n';
    response += '• "Tracking error" - Tracking information incorrect\n\n';
    
    response += '💬 **Type your comment or select from above.**\n';
    response += 'Example: "Delayed delivery - package was supposed to arrive yesterday"\n\n';
    
    response += '⚡ **Quick Actions:**\n';
    response += '• Type "urgent ticket" for high priority\n';
    response += '• Type "callback request" for phone support\n';
    response += '• Type "email update" for email notifications';
    
    // Store ticket info for follow-up
    window.currentTicketId = ticketId;
    
    return response;
}

function getTrackLocationResponse(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        return '❌ Order not found. Please provide a valid order ID first.';
    }
    
    if (order.status !== 'Out for Delivery') {
        return `📍 **Real-time location tracking is only available for packages that are "Out for Delivery".**\n\n` +
               `Your order ${orderId} is currently: **${order.status}**\n\n` +
               `🔄 Track location will be available once your package is out for delivery.`;
    }
    
    let response = `📍 **Real-Time Location Tracking for ${orderId}**\n\n`;
    response += `🚚 **Delivery Person:** ${order.deliveryPerson.name}\n`;
    response += `📱 **Contact:** ${order.deliveryPerson.phone}\n`;
    response += `⭐ **Rating:** ${order.deliveryPerson.rating}/5.0\n\n`;
    
    response += `🗺️ **Current Location:** 2.3 miles from your address\n`;
    response += `⏰ **Estimated Arrival:** 15-20 minutes\n`;
    response += `🛣️ **Route:** Via Main Street → Oak Avenue\n`;
    response += `🚦 **Traffic Status:** Light traffic\n\n`;
    
    response += `📊 **Live Updates:**\n`;
    response += `• 🔴 Last seen: 2 minutes ago\n`;
    response += `• 🛣️ Speed: 25 mph (residential area)\n`;
    response += `• 📍 Next stop: Your delivery address\n\n`;
    
    response += `💡 **Options:**\n`;
    response += `• Type "live map" to open tracking map\n`;
    response += `• Type "contact driver" to call delivery person\n`;
    response += `• Type "delivery instructions" to add special notes`;
    
    return response;
}

function getContactDeliveryResponse(orderId) {
    const order = demoOrders[orderId];
    if (!order || !order.deliveryPerson) {
        return `📞 **Delivery person contact is not available for this order.**\n\n` +
               `This could be because:\n` +
               `• Package is not yet out for delivery\n` +
               `• Package has already been delivered\n` +
               `• No delivery person assigned yet`;
    }
    
    let response = `📞 **Contact Delivery Person for ${orderId}**\n\n`;
    response += `👨‍💼 **Name:** ${order.deliveryPerson.name}\n`;
    response += `📱 **Phone:** ${order.deliveryPerson.phone}\n`;
    response += `⭐ **Rating:** ${order.deliveryPerson.rating}/5.0\n`;
    response += `🚚 **Status:** ${order.status}\n\n`;
    
    response += `💬 **Contact Options:**\n`;
    response += `• Type "call driver" - Direct phone call\n`;
    response += `• Type "text driver" - Send SMS message\n`;
    response += `• Type "chat driver" - In-app messaging\n\n`;
    
    response += `📝 **Quick Messages:**\n`;
    response += `• "Safe place delivery" - Leave in safe location\n`;
    response += `• "Delivery instructions" - Special delivery notes\n`;
    response += `• "Reschedule delivery" - Change delivery time\n`;
    response += `• "Contact on arrival" - Call when you arrive\n\n`;
    
    response += `⚠️ **Please be polite and respectful when contacting delivery personnel.**`;
    
    return response;
}

function getDeliveryUpdatesResponse(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        return '❌ Order not found. Please provide a valid order ID first.';
    }
    
    let response = `🔔 **Delivery Updates for ${orderId}**\n\n`;
    response += `📦 **Current Status:** ${order.status}\n`;
    response += `📅 **Estimated Delivery:** ${order.estimatedDelivery}\n\n`;
    
    response += `📢 **Notification Preferences:**\n`;
    response += `• ✅ SMS notifications (enabled)\n`;
    response += `• ✅ Email updates (enabled)\n`;
    response += `• ❌ Push notifications (disabled)\n`;
    response += `• ✅ Real-time tracking (enabled)\n\n`;
    
    response += `🎯 **Update Types:**\n`;
    response += `• 📦 Status changes (shipped, in transit, etc.)\n`;
    response += `• 🚚 Out for delivery notifications\n`;
    response += `• 📍 Location updates\n`;
    response += `• ⚠️ Delivery exceptions\n`;
    response += `• ✅ Delivery confirmations\n\n`;
    
    response += `⚙️ **Manage Notifications:**\n`;
    response += `• Type "enable push" - Enable push notifications\n`;
    response += `• Type "disable sms" - Turn off SMS alerts\n`;
    response += `• Type "email only" - Email notifications only\n`;
    response += `• Type "all notifications" - Enable everything\n\n`;
    
    response += `📱 **Delivery Day Alerts:**\n`;
    response += `• 30-minute delivery window alert\n`;
    response += `• Driver en route notification\n`;
    response += `• Delivery attempt alerts\n`;
    response += `• Package delivered confirmation`;
    
    return response;
}

function getOrderHistoryResponse(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        return '❌ Order not found. Please provide a valid order ID first.';
    }
    
    let response = `📋 **Complete Tracking History for ${orderId}**\n\n`;
    response += `📦 **Order Details:**\n`;
    response += `• Item: ${order.item}\n`;
    response += `• Weight: ${order.weight}\n`;
    response += `• Value: ${order.value}\n`;
    response += `• Customer: ${order.customerName}\n\n`;
    
    response += `🗺️ **Journey:**\n`;
    response += `📍 **From:** ${order.origin}\n`;
    response += `🏠 **To:** ${order.destination}\n\n`;
    
    response += `📅 **Timeline:**\n`;
    order.trackingHistory.forEach((event, index) => {
        const isLatest = index === order.trackingHistory.length - 1;
        const icon = isLatest ? '🔴' : '✅';
        response += `${icon} **${event.status}**\n`;
        response += `   📅 ${event.date}\n`;
        response += `   📍 ${event.location}\n\n`;
    });
    
    if (order.exception) {
        response += `⚠️ **Current Issue:** ${order.exception}\n\n`;
    }
    
    if (order.actualDelivery) {
        response += `✅ **Delivered:** ${order.actualDelivery}\n\n`;
    }
    
    response += `📊 **Summary:**\n`;
    response += `• Total tracking events: ${order.trackingHistory.length}\n`;
    response += `• Days in transit: ${calculateTransitDays(order)}\n`;
    response += `• Current status: ${order.status}\n\n`;
    
    response += `💡 **Need help?**\n`;
    response += `• Type "create ticket" for support\n`;
    response += `• Type "agent details" to speak with someone\n`;
    response += `• Type "delivery updates" for notifications`;
    
    return response;
}

function calculateTransitDays(order) {
    if (order.trackingHistory.length < 2) return 0;
    
    const firstEvent = new Date(order.trackingHistory[0].date);
    const lastEvent = new Date(order.trackingHistory[order.trackingHistory.length - 1].date);
    const diffTime = Math.abs(lastEvent - firstEvent);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// UI Update Functions
function updateUIForLoggedInUser() {
    const loginButton = document.querySelector('[data-bs-target="#loginModal"]');
    if (loginButton && currentUser) {
        loginButton.innerHTML = `<i class="fas fa-user me-1"></i>${currentUser.name}`;
        loginButton.classList.remove('btn-outline-light');
        loginButton.classList.add('btn-light', 'text-primary');
        
        // Add dropdown functionality for logged-in user
        loginButton.removeAttribute('data-bs-toggle');
        loginButton.removeAttribute('data-bs-target');
        loginButton.onclick = showUserMenu;
    }
}

function showUserMenu() {
    // Create a simple user menu (in a real app, this would be a proper dropdown)
    const menu = confirm(`Welcome ${currentUser.name}!\n\nChoose an option:\nOK - View Orders\nCancel - Logout`);
    
    if (menu) {
        showUserOrders();
    } else {
        logout();
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('logitrack_user');
    location.reload();
}

function showUserOrders() {
    if (orders.length === 0) {
        showAlert('You have no orders yet. Create your first order!', 'info');
        return;
    }
    
    let ordersList = 'Your Orders:\n\n';
    orders.forEach(order => {
        ordersList += `Order #${order.id}\n`;
        ordersList += `Status: ${order.status}\n`;
        ordersList += `To: ${order.recipientName}\n`;
        ordersList += `Created: ${new Date(order.createdAt).toLocaleDateString()}\n\n`;
    });
    
    alert(ordersList);
}

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function generateOrderId() {
    return 'LT' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
}

function calculateEstimatedDelivery(deliveryType) {
    const today = new Date();
    let days = 3; // default
    
    switch(deliveryType) {
        case 'same-day':
            days = 0;
            break;
        case 'overnight':
            days = 1;
            break;
        case 'express':
            days = 2;
            break;
        case 'standard':
            days = 5;
            break;
    }
    
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);
    return deliveryDate.toDateString();
}

function getRandomDate() {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 7) + 1);
    return futureDate.toDateString();
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function showLoading(message = 'Loading...') {
    // Create loading overlay
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingOverlay';
    loadingDiv.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center';
    loadingDiv.style.cssText = 'background: rgba(0,0,0,0.5); z-index: 9999;';
    
    loadingDiv.innerHTML = `
        <div class="text-center text-white">
            <div class="spinner-border mb-3" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div>${message}</div>
        </div>
    `;
    
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.getElementById('loadingOverlay');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function showOrderConfirmation(orderData) {
    const confirmationMessage = `
        Order Created Successfully! 🎉
        
        Order ID: ${orderData.id}
        From: ${orderData.senderName}
        To: ${orderData.recipientName}
        Service: ${orderData.deliveryType}
        Estimated Delivery: ${orderData.estimatedDelivery}
        
        You can track your order using ID: ${orderData.id}
    `;
    
    showAlert(confirmationMessage, 'success');
}

function addToRecentSearches(trackingNumber) {
    let recentSearches = JSON.parse(localStorage.getItem('logitrack_recent_searches')) || [];
    
    // Add to beginning of array, remove duplicates
    recentSearches = recentSearches.filter(search => search !== trackingNumber);
    recentSearches.unshift(trackingNumber);
    
    // Keep only last 5 searches
    if (recentSearches.length > 5) {
        recentSearches = recentSearches.slice(0, 5);
    }
    
    localStorage.setItem('logitrack_recent_searches', JSON.stringify(recentSearches));
}

// FAQ buttons for general FAQ display
function addFAQButtons() {
    addFAQButtonsToChat();
}

// Interactive FAQ Handler Functions

// Track Order Function
function handleTrackOrder() {
    addChatMessage('🔍 **Track Your Order**\n\nPlease enter your order ID to track your package:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('track');
    }, 500);
}

// Package Delayed Function
function handlePackageDelayed() {
    addChatMessage('⏰ **Package Delayed Help**\n\nTo help you with your delayed package, please provide your order ID:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('delayed');
    }, 500);
}

// Missing Package Function
function handleMissingPackage() {
    addChatMessage('📦 **Missing Package Report**\n\nI\'ll help you report a missing package. Please enter your order ID:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('missing');
    }, 500);
}

// Damaged Package Function
function handleDamagedPackage() {
    addChatMessage('📦 **Damaged Package Claim**\n\nI\'ll help you file a damage claim. Please enter your order ID first:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('damaged');
    }, 500);
}

// Change Address Function
function handleChangeAddress() {
    addChatMessage('🏠 **Change Delivery Address**\n\nTo change your delivery address, please provide your order ID:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('address');
    }, 500);
}

// Reschedule Delivery Function
function handleReschedule() {
    addChatMessage('📅 **Reschedule Delivery**\n\nTo reschedule your delivery, please enter your order ID:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('reschedule');
    }, 500);
}

// Delivery Instructions Function
function handleDeliveryInstructions() {
    addChatMessage('📝 **Add Delivery Instructions**\n\nTo add special delivery instructions, please enter your order ID:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('instructions');
    }, 500);
}

// Missed Delivery Function
function handleMissedDelivery() {
    addChatMessage('🏠 **Missed Delivery Help**\n\nTo help with your missed delivery, please enter your order ID:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('missed');
    }, 500);
}

// Perishable Delayed Function
function handlePerishableDelayed() {
    addChatMessage('🧊 **URGENT: Perishable Items Delayed**\n\nThis is a high priority issue. Please enter your order ID immediately:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('perishable');
    }, 500);
}

// Medical Delayed Function
function handleMedicalDelayed() {
    addChatMessage('💊 **URGENT: Medical Supplies Delayed**\n\nThis is a critical priority. Please enter your order ID for immediate assistance:', 'bot');
    
    setTimeout(() => {
        addOrderIdInputForm('medical');
    }, 500);
}

// Generic Order ID Input Form
function addOrderIdInputForm(action) {
    const chatMessages = document.getElementById('chatMessages');
    
    const formContainer = document.createElement('div');
    formContainer.className = 'bot-message mt-2';
    
    const formDiv = document.createElement('div');
    formDiv.className = 'message-content bg-white p-3 rounded border';
    
    let formHTML = `
        <div class="order-id-form">
            <h6 class="text-primary mb-3">📝 Enter Order Information:</h6>
            <div class="mb-3">
                <label for="orderIdInput_${action}" class="form-label">Order ID:</label>
                <input type="text" class="form-control" id="orderIdInput_${action}" 
                       placeholder="e.g., ORD001, ORD002..." maxlength="10">
                <div class="form-text">Try demo orders: ORD001, ORD002, ORD003, ORD004, ORD005</div>
            </div>
            <div class="d-flex gap-2">
                <button type="button" class="btn btn-primary btn-sm" 
                        onclick="processOrderIdForm('${action}', document.getElementById('orderIdInput_${action}').value)">
                    <i class="fas fa-search me-1"></i>Continue
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" 
                        onclick="this.closest('.bot-message').remove()">
                    <i class="fas fa-times me-1"></i>Cancel
                </button>
            </div>
        </div>
    `;
    
    formDiv.innerHTML = formHTML;
    formContainer.appendChild(formDiv);
    chatMessages.appendChild(formContainer);
    
    // Focus on input
    setTimeout(() => {
        document.getElementById(`orderIdInput_${action}`).focus();
    }, 100);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process Order ID Form Submission
function processOrderIdForm(action, orderId) {
    if (!orderId || orderId.trim() === '') {
        addChatMessage('❌ Please enter a valid order ID to continue.', 'bot');
        return;
    }
    
    const orderIdUpper = orderId.trim().toUpperCase();
    
    // Remove the form
    document.querySelector('.order-id-form').closest('.bot-message').remove();
    
    // Add user message showing what they entered
    addChatMessage(`Order ID: ${orderIdUpper}`, 'user');
    
    // Process based on action type
    setTimeout(() => {
        switch(action) {
            case 'track':
                handleTrackOrderWithId(orderIdUpper);
                break;
            case 'delayed':
                handleDelayedOrderWithId(orderIdUpper);
                break;
            case 'missing':
                handleMissingOrderWithId(orderIdUpper);
                break;
            case 'damaged':
                handleDamagedOrderWithId(orderIdUpper);
                break;
            case 'address':
                handleAddressChangeWithId(orderIdUpper);
                break;
            case 'reschedule':
                handleRescheduleWithId(orderIdUpper);
                break;
            case 'instructions':
                handleInstructionsWithId(orderIdUpper);
                break;
            case 'missed':
                handleMissedDeliveryWithId(orderIdUpper);
                break;
            case 'perishable':
                handlePerishableWithId(orderIdUpper);
                break;
            case 'medical':
                handleMedicalWithId(orderIdUpper);
                break;
            default:
                addChatMessage('❌ Unknown action. Please try again.', 'bot');
        }
    }, 1000);
}

// Specific Action Handlers

function handleTrackOrderWithId(orderId) {
    // Use existing order status response
    const response = getOrderStatusResponse(orderId);
    addChatMessage(response, 'bot');
}

function handleDelayedOrderWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    let response = `⏰ **Delayed Package Support for ${orderId}**\n\n`;
    response += `📦 **Item:** ${order.item}\n`;
    response += `🔄 **Current Status:** ${order.status}\n`;
    response += `📅 **Expected Delivery:** ${order.estimatedDelivery}\n\n`;
    
    response += `💡 **What we can do:**\n`;
    response += `• Check for weather/holiday delays\n`;
    response += `• Expedite your package (if possible)\n`;
    response += `• Provide compensation for significant delays\n`;
    response += `• Set up delivery notifications\n\n`;
    
    response += `🎯 **Next Steps:**\n`;
    response += `• Type "create ticket" to report delay\n`;
    response += `• Type "agent details" for human support\n`;
    response += `• Type "track location" for real-time updates`;
    
    addChatMessage(response, 'bot');
}

function handleMissingOrderWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    let response = `🔍 **Missing Package Investigation for ${orderId}**\n\n`;
    response += `📦 **Item:** ${order.item}\n`;
    response += `🔄 **Status:** ${order.status}\n`;
    
    if (order.status === 'Delivered') {
        response += `✅ **Delivered:** ${order.actualDelivery}\n\n`;
        response += `🕵️ **Investigation Steps:**\n`;
        response += `• Check with neighbors\n`;
        response += `• Look in mailroom/reception\n`;
        response += `• Check all delivery areas\n`;
        response += `• Contact building management\n\n`;
        response += `🚨 **If still missing:** Type "missing package emergency"`;
    } else {
        response += `\n📍 **Current Location:** Package not yet delivered\n`;
        response += `💡 **Your package is still in transit. Please wait for delivery.`;
    }
    
    addChatMessage(response, 'bot');
}

function handleDamagedOrderWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    addChatMessage(`📦 **Damage Claim for ${orderId}**\n\nI'll help you file a damage claim. Please provide details about the damage:`, 'bot');
    
    setTimeout(() => {
        addDamageClaimForm(orderId, order);
    }, 500);
}

function handleAddressChangeWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    let response = `🏠 **Address Change Request for ${orderId}**\n\n`;
    response += `📦 **Item:** ${order.item}\n`;
    response += `🔄 **Current Status:** ${order.status}\n`;
    response += `📍 **Current Address:** ${order.destination}\n\n`;
    
    if (order.status === 'Processing' || order.status === 'Shipped') {
        response += `✅ **Good news!** Address changes are available for your order.\n\n`;
        response += `💡 **Options:**\n`;
        response += `• Change to new address (same city)\n`;
        response += `• Hold at pickup facility\n`;
        response += `• Redirect to workplace\n\n`;
        response += `📝 **Type "address change request" to proceed`;
    } else {
        response += `⚠️ **Address changes not available**\n`;
        response += `Current status (${order.status}) doesn't allow address changes.\n\n`;
        response += `💡 **Alternatives:**\n`;
        response += `• Add delivery instructions\n`;
        response += `• Contact delivery person when out for delivery`;
    }
    
    addChatMessage(response, 'bot');
}

function handleRescheduleWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    let response = `📅 **Reschedule Delivery for ${orderId}**\n\n`;
    response += `📦 **Item:** ${order.item}\n`;
    response += `🔄 **Status:** ${order.status}\n`;
    response += `📅 **Estimated Delivery:** ${order.estimatedDelivery}\n\n`;
    
    if (order.status === 'Out for Delivery') {
        response += `🚚 **Currently out for delivery!**\n`;
        response += `Contact delivery person: ${order.deliveryPerson?.phone || 'Not available'}\n\n`;
        response += `💡 **Quick options:**\n`;
        response += `• Type "contact delivery" to reach driver\n`;
        response += `• Type "delivery instructions" for special notes`;
    } else {
        response += `✅ **Rescheduling available!**\n\n`;
        response += `📋 **Available time slots:**\n`;
        response += `• Morning (8 AM - 12 PM)\n`;
        response += `• Afternoon (12 PM - 5 PM)\n`;
        response += `• Evening (5 PM - 8 PM)\n\n`;
        response += `📝 **Type "reschedule delivery" to choose a time slot`;
    }
    
    addChatMessage(response, 'bot');
}

function handleInstructionsWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    addChatMessage(`📝 **Add Delivery Instructions for ${orderId}**\n\nPlease specify your delivery instructions:`, 'bot');
    
    setTimeout(() => {
        addDeliveryInstructionsForm(orderId);
    }, 500);
}

function handleMissedDeliveryWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    let response = `🏠 **Missed Delivery Help for ${orderId}**\n\n`;
    response += `📦 **Item:** ${order.item}\n`;
    response += `🔄 **Status:** ${order.status}\n\n`;
    
    response += `💡 **Your options:**\n`;
    response += `• **Automatic redelivery** - Next business day\n`;
    response += `• **Schedule redelivery** - Choose specific time\n`;
    response += `• **Pick up at facility** - Available now\n`;
    response += `• **Redirect delivery** - Send to different address\n\n`;
    
    response += `📍 **Pickup locations nearby:**\n`;
    response += `• Local distribution center (2.3 miles)\n`;
    response += `• Partner retail store (1.8 miles)\n`;
    response += `• UPS Store (0.9 miles)\n\n`;
    
    response += `🎯 **Quick actions:**\n`;
    response += `• Type "redelivery tomorrow" for next day\n`;
    response += `• Type "pickup location" for facility details`;
    
    addChatMessage(response, 'bot');
}

function handlePerishableWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
               addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    let response = `🧊 **URGENT: Perishable Items - ${orderId}**\n\n`;
    response += `📦 **Item:** ${order.item}\n`;
    response += `🔄 **Status:** ${order.status}\n`;
    response += `⚠️ **Priority:** CRITICAL\n\n`;
    
    response += `🚨 **Immediate actions taken:**\n`;
    response += `• Priority investigation launched\n`;
    response += `• Cold chain monitoring activated\n`;
    response += `• Supervisor notified immediately\n`;
    response += `• Compensation pre-approved\n\n`;
    
    response += `💰 **Guaranteed resolution:**\n`;
    response += `• Full refund for spoiled items\n`;
    response += `• Emergency replacement order\n`;
    response += `• Express delivery at no charge\n`;
    response += `• $25 service credit applied\n\n`;
    
    response += `📞 **Emergency contact:** 1-800-COLD-HELP (24/7)\n`;
    response += `🎫 **Type "urgent ticket" for immediate escalation`;
    
    addChatMessage(response, 'bot');
}

function handleMedicalWithId(orderId) {
    const order = demoOrders[orderId];
    if (!order) {
        addChatMessage(`❌ Order ${orderId} not found. Please check your order ID.`, 'bot');
        return;
    }
    
    let response = `💊 **URGENT: Medical Supplies - ${orderId}**\n\n`;
    response += `📦 **Item:** ${order.item}\n`;
    response += `🔄 **Status:** ${order.status}\n`;
    response += `⚠️ **Priority:** MEDICAL EMERGENCY\n\n`;
    
    response += `🚨 **Critical response activated:**\n`;
    response += `• Medical emergency protocol initiated\n`;
    response += `• Healthcare partnerships engaged\n`;
    response += `• Local pharmacy coordination\n`;
    response += `• Same-day courier dispatched\n\n`;
    
    response += `🏥 **Immediate support:**\n`;
    response += `• Emergency prescription transfer\n`;
    response += `• Local pharmacy pickup available\n`;
    response += `• All costs covered by us\n`;
    response += `• Healthcare provider notification\n\n`;
    
    response += `📞 **Medical Emergency Line:** 1-800-MED-URGENT (24/7)\n`;
    response += `⚠️ **Do not delay medical care - call immediately if critical**`;
    
    addChatMessage(response, 'bot');
}

// Damage Claim Form
function addDamageClaimForm(orderId, order) {
    const chatMessages = document.getElementById('chatMessages');
    
    const formContainer = document.createElement('div');
    formContainer.className = 'bot-message mt-2';
    
    const formDiv = document.createElement('div');
    formDiv.className = 'message-content bg-white p-3 rounded border';
    
    let formHTML = `
        <div class="damage-claim-form">
            <h6 class="text-danger mb-3">📦 Damage Claim Form - ${orderId}</h6>
            <div class="mb-3">
                <label class="form-label">Type of Damage:</label>
                <select class="form-select" id="damageType_${orderId}">
                    <option value="">Select damage type...</option>
                    <option value="exterior_damage">Exterior package damage</option>
                    <option value="interior_damage">Interior item damage</option>
                    <option value="missing_parts">Missing parts/components</option>
                    <option value="completely_destroyed">Completely destroyed</option>
                    <option value="liquid_damage">Liquid/water damage</option>
                    <option value="crushed">Package was crushed</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Describe the damage:</label>
                <textarea class="form-control" id="damageDescription_${orderId}" rows="3" 
                          placeholder="Please describe the damage in detail..."></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Estimated damage value:</label>
                <select class="form-select" id="damageValue_${orderId}">
                    <option value="">Select value range...</option>
                    <option value="under_50">Under $50</option>
                    <option value="50_100">$50 - $100</option>
                    <option value="100_250">$100 - $250</option>
                    <option value="250_500">$250 - $500</option>
                    <option value="over_500">Over $500</option>
                </select>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="hasPhotos_${orderId}">
                    <label class="form-check-label" for="hasPhotos_${orderId}">
                        I have photos of the damage
                    </label>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button type="button" class="btn btn-danger btn-sm" 
                        onclick="submitDamageClaim('${orderId}')">
                    <i class="fas fa-file-alt me-1"></i>Submit Claim
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" 
                        onclick="this.closest('.bot-message').remove()">
                    <i class="fas fa-times me-1"></i>Cancel
                </button>
            </div>
        </div>
    `;
    
    formDiv.innerHTML = formHTML;
    formContainer.appendChild(formDiv);
    chatMessages.appendChild(formContainer);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Submit Damage Claim
function submitDamageClaim(orderId) {
    const damageType = document.getElementById(`damageType_${orderId}`).value;
    const damageDescription = document.getElementById(`damageDescription_${orderId}`).value;
    const damageValue = document.getElementById(`damageValue_${orderId}`).value;
    const hasPhotos = document.getElementById(`hasPhotos_${orderId}`).checked;
    
    if (!damageType || !damageDescription || !damageValue) {
        addChatMessage('❌ Please fill in all required fields to submit your damage claim.', 'bot');
        return;
    }
    
    // Remove the form
    document.querySelector('.damage-claim-form').closest('.bot-message').remove();
    
    // Generate claim number
    const claimNumber = 'DMG' + Date.now().toString().slice(-6);
    
    // Add user message
    addChatMessage(`Damage claim submitted for ${orderId}`, 'user');
    
    // Process claim
    setTimeout(() => {
        let response = `✅ **Damage Claim Submitted Successfully!**\n\n`;
        response += `🎫 **Claim Number:** ${claimNumber}\n`;
        response += `📦 **Order:** ${orderId}\n`;
        response += `🔧 **Damage Type:** ${damageType.replace('_', ' ')}\n`;
        response += `💰 **Value Range:** ${damageValue.replace('_', ' - $')}\n`;
        response += `📷 **Photos:** ${hasPhotos ? 'Yes' : 'No'}\n\n`;
        
        response += `⏰ **Next Steps:**\n`;
        response += `• Claim review: 24-48 hours\n`;
        response += `• Resolution decision: 2-3 business days\n`;
        response += `• Refund processing: 3-5 business days\n\n`;
        
        response += `📧 **You will receive:**\n`;
        response += `• Email confirmation within 30 minutes\n`;
        response += `• SMS updates on claim progress\n`;
        response += `• Resolution notification\n\n`;
        
        response += `💡 **Need help?** Type "claim status ${claimNumber}" to check progress`;
        
        addChatMessage(response, 'bot');
    }, 1000);
}

// Delivery Instructions Form
function addDeliveryInstructionsForm(orderId) {
    const chatMessages = document.getElementById('chatMessages');
    
    const formContainer = document.createElement('div');
    formContainer.className = 'bot-message mt-2';
    
    const formDiv = document.createElement('div');
    formDiv.className = 'message-content bg-white p-3 rounded border';
    
    let formHTML = `
        <div class="delivery-instructions-form">
            <h6 class="text-primary mb-3">📝 Delivery Instructions - ${orderId}</h6>
            <div class="mb-3">
                <label class="form-label">Instruction Type:</label>
                <select class="form-select" id="instructionType_${orderId}">
                    <option value="">Select instruction type...</option>
                    <option value="safe_place">Safe place delivery</option>
                    <option value="neighbor">Leave with neighbor</option>
                    <option value="building_access">Building access code</option>
                    <option value="contact_on_arrival">Contact on arrival</option>
                    <option value="signature_required">Signature required</option>
                    <option value="dont_leave_if_weather">Don't leave if weather is bad</option>
                    <option value="custom">Custom instructions</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Detailed Instructions:</label>
                <textarea class="form-control" id="instructionText_${orderId}" rows="3" 
                          placeholder="Enter specific delivery instructions..." maxlength="200"></textarea>
                <div class="form-text">Maximum 200 characters</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Contact Phone (optional):</label>
                <input type="tel" class="form-control" id="contactPhone_${orderId}" 
                       placeholder="e.g., +1-555-0123">
            </div>
            <div class="d-flex gap-2">
                <button type="button" class="btn btn-primary btn-sm" 
                        onclick="submitDeliveryInstructions('${orderId}')">
                    <i class="fas fa-save me-1"></i>Save Instructions
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm" 
                        onclick="this.closest('.bot-message').remove()">
                    <i class="fas fa-times me-1"></i>Cancel
                </button>
            </div>
        </div>
    `;
    
    formDiv.innerHTML = formHTML;
    formContainer.appendChild(formDiv);
    chatMessages.appendChild(formContainer);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Submit Delivery Instructions
function submitDeliveryInstructions(orderId) {
    const instructionType = document.getElementById(`instructionType_${orderId}`).value;
    const instructionText = document.getElementById(`instructionText_${orderId}`).value;
    const contactPhone = document.getElementById(`contactPhone_${orderId}`).value;
    
    if (!instructionType || !instructionText) {
        addChatMessage('❌ Please select instruction type and provide detailed instructions.', 'bot');
        return;
    }
    
    // Remove the form
    document.querySelector('.delivery-instructions-form').closest('.bot-message').remove();
    
    // Add user message
    addChatMessage(`Delivery instructions added for ${orderId}`, 'user');
    
    // Process instructions
    setTimeout(() => {
        let response = `✅ **Delivery Instructions Saved!**\n\n`;
        response += `📦 **Order:** ${orderId}\n`;
        response += `📝 **Type:** ${instructionType.replace('_', ' ')}\n`;
        response += `💬 **Instructions:** ${instructionText}\n`;
        
        if (contactPhone) {
            response += `📞 **Contact:** ${contactPhone}\n`;
        }
        
        response += `\n⏰ **When will this apply?**\n`;
        response += `• Instructions added to delivery manifest\n`;
        response += `• Driver will see notes before delivery\n`;
        response += `• SMS confirmation sent to you\n\n`;
        
        response += `💡 **Note:** Instructions are effective immediately for packages not yet out for delivery.`;
        
        addChatMessage(response, 'bot');
    }, 1000);
}