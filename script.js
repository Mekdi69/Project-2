// Constants for Intel brand colors
const INTEL_BLUE = '#0071c5';
const INTEL_LIGHT_BLUE = '#00c7fd';
const INTEL_BLUE_TRANSPARENT = 'rgba(0, 113, 197, 0.3)';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    addScrollAnimations();
    addInteractiveEffects();
});

// Initialize timeline animations
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add entrance animations
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Add scroll-based animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger animation
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add interactive hover and click effects
function addInteractiveEffects() {
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        // Click to expand/highlight
        content.addEventListener('click', function() {
            // Remove active class from all items
            timelineContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add pulse animation
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });

        // Enhanced hover effect
        content.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
            }
        });

        content.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add parallax effect to timeline line
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const timelineLine = document.querySelector('.timeline-line');
    
    if (timelineLine) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrolled / maxScroll) * 100;
        
        // Update timeline line gradient based on scroll
        timelineLine.style.background = `linear-gradient(180deg, 
            ${INTEL_BLUE} 0%, 
            ${INTEL_LIGHT_BLUE} ${scrollPercentage}%, 
            ${INTEL_BLUE_TRANSPARENT} ${scrollPercentage}%, 
            ${INTEL_BLUE_TRANSPARENT} 100%)`;
    }
});

// Add pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .timeline-content.active {
        box-shadow: 0 15px 50px rgba(0, 113, 197, 0.4);
        border: 2px solid #00c7fd;
    }
    
    .visible {
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const timelineItems = document.querySelectorAll('.timeline-content');
    const activeItem = document.querySelector('.timeline-content.active');
    let currentIndex = Array.from(timelineItems).indexOf(activeItem);
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        // If no item is active, start from 0, otherwise move to next
        currentIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % timelineItems.length;
        timelineItems[currentIndex].click();
        timelineItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        // If no item is active, start from last, otherwise move to previous
        currentIndex = currentIndex === -1 ? timelineItems.length - 1 : (currentIndex - 1 + timelineItems.length) % timelineItems.length;
        timelineItems[currentIndex].click();
        timelineItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Log initialization
console.log('Intel Sustainability Timeline initialized successfully!');
console.log('Features enabled: Scroll animations, Interactive hover effects, Keyboard navigation (Arrow keys)');
