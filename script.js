/**
 * Company Intranet Portal - JavaScript Interactivity
 * Provides enhanced user experience with navigation, animations, and event handling
 */

// Initialize the website when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeButtons();
    initializeScrollEffects();
    addAccessibilityFeatures();
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleNavigation(this);
        });
        
        // Add keyboard navigation support
        button.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleNavigation(this);
            }
        });
    });
}

/**
 * Handle navigation button clicks
 */
function handleNavigation(button) {
    const buttonTitle = button.getAttribute('title');
    const section = button.querySelector('span:last-child').textContent;
    
    // Add active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // Log navigation action (for future analytics)
    console.log(`Navigating to: ${section}`);
    
    // Smooth scroll to section
    smoothScrollToTop();
    
    // Show a notification (optional)
    showNotification(`Opened: ${section}`);
}

/**
 * Initialize button hover effects
 */
function initializeButtons() {
    const buttons = document.querySelectorAll('button, a');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    // Fade-in effect on scroll
    const contentSections = document.querySelectorAll('.content-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    contentSections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Add accessibility features
 */
function addAccessibilityFeatures() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main content if not present
    const mainContent = document.querySelector('.content-area');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Add ARIA labels to buttons
    document.querySelectorAll('.nav-btn').forEach(button => {
        const label = button.querySelector('span:last-child').textContent;
        button.setAttribute('aria-label', `Navigate to ${label}`);
    });
}

/**
 * Smooth scroll to top
 */
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Show temporary notification
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Add animations
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: #667eea;
            color: white;
            padding: 8px;
            z-index: 100;
        }
        
        .skip-link:focus {
            top: 0;
        }
        
        .nav-btn.active .nav-circle {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: transparent;
        }
        
        .nav-btn.active {
            color: #667eea;
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);
}

// Call animation setup
addAnimationStyles();

/**
 * Handle back to top functionality (if implemented)
 */
function handleBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', smoothScrollToTop);
}

/**
 * Add search functionality placeholder
 */
function initializeSearch() {
    // This can be expanded later for search functionality
    console.log('Search functionality can be added here');
}

/**
 * Handle section collapsing/expanding
 */
function initializeSectionToggle() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const content = section.querySelector('.section-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            section.classList.toggle('collapsed');
        });
    });
}

/**
 * Initialize tooltips for navigation buttons
 */
function initializeTooltips() {
    const buttons = document.querySelectorAll('.nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = title;
            tooltip.style.cssText = `
                position: absolute;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.85rem;
                white-space: nowrap;
                pointer-events: none;
                z-index: 1000;
                margin-top: 10px;
            `;
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        button.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// Additional utility functions can be added here as needed
