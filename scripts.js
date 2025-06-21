// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Enhanced counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                counter.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 100);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
                // Add final animation
                counter.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    counter.style.animation = '';
                }, 500);
            }
        };
        
        updateCounter();
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('about-stats')) {
                // Only animate once
                if (!entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    setTimeout(() => {
                        animateCounters();
                    }, 300);
                }
            }
            
            // Trigger team member animation
            if (entry.target.classList.contains('team-member')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            
            // Animate feature cards
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            
            // Animate how-to-use section
            if (entry.target.classList.contains('video-container')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
            
            if (entry.target.classList.contains('instructions')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .about-stats, .stat-item, .team-member, .video-container, .instructions').forEach(el => {
    observer.observe(el);
});

// Video play functionality
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.demo-video');
const playButton = document.querySelector('.play-button');
const videoOverlay = document.querySelector('.video-overlay');

if (videoContainer && video && playButton) {
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            videoOverlay.style.opacity = '0';
        } else {
            video.pause();
            videoOverlay.style.opacity = '1';
        }
    });
    
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            videoOverlay.style.opacity = '0';
        } else {
            video.pause();
            videoOverlay.style.opacity = '1';
        }
    });
    
    video.addEventListener('play', () => {
        videoOverlay.style.opacity = '0';
    });
    
    video.addEventListener('pause', () => {
        videoOverlay.style.opacity = '1';
    });
    
    video.addEventListener('ended', () => {
        videoOverlay.style.opacity = '1';
    });
}

// Download button click tracking
document.querySelectorAll('a[download]').forEach(button => {
    button.addEventListener('click', () => {
        // Add download animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Show download feedback
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = 'linear-gradient(45deg, var(--primary-red), var(--light-red))';
        }, 2000);
        
        console.log('EzRec download initiated');
    });
});

// Learn more button scroll to how-to-use section
document.getElementById('learnMoreBtn').addEventListener('click', () => {
    const howToUseSection = document.getElementById('how-to-use');
    const offsetTop = howToUseSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg-animation');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.title-line, .hero-description, .hero-buttons');
        heroElements.forEach((el, index) => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});

// Enhanced floating cards movement
setInterval(() => {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach(card => {
        const randomX = (Math.random() - 0.5) * 30;
        const randomY = (Math.random() - 0.5) * 30;
        card.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}, 4000);

// Add hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Profile image hover effect
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('mouseenter', () => {
        profileImg.style.transform = 'scale(1.05) rotate(5deg)';
    });
    
    profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Add glitch effect on logo hover
document.querySelector('.nav-logo').addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s ease-in-out';
    setTimeout(() => {
        this.style.animation = '';
    }, 300);
});

// Add click effect to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        link.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, var(--primary-red), var(--light-red))';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// Initialize scroll progress
createScrollProgress();

// Step animations on scroll
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, index * 200);
            });
            
            const proTips = entry.target.querySelector('.pro-tips');
            if (proTips) {
                setTimeout(() => {
                    proTips.style.opacity = '1';
                    proTips.style.transform = 'translateY(0)';
                }, steps.length * 200 + 300);
            }
        }
    });
}, { threshold: 0.3 });

const instructionsElement = document.querySelector('.instructions');
if (instructionsElement) {
    stepObserver.observe(instructionsElement);
}

// Auto-scroll animation for smooth experience
let isAutoScrolling = false;

const autoScrollToSection = (targetId) => {
    if (isAutoScrolling) return;
    
    isAutoScrolling = true;
    const target = document.getElementById(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 70;
        
        // Smooth scroll with easing
        const startPosition = window.pageYOffset;
        const distance = offsetTop - startPosition;
        const duration = 1000;
        let start = null;
        
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                isAutoScrolling = false;
            }
        };
        
        requestAnimationFrame(animation);
    }
};

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .feature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .feature-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .step {
        transition: all 0.6s ease;
    }
    
    .pro-tips {
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(style);

// Performance optimization for mobile
if (window.innerWidth <= 768) {
    // Reduce animation frequency on mobile
    const reducedAnimations = document.querySelectorAll('.floating-card, .hero-bg-animation');
    reducedAnimations.forEach(el => {
        el.style.animationDuration = '6s';
    });
}

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            autoScrollToSection(nextSection);
        }
    } else if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = getPrevSection(currentSection);
        if (prevSection) {
            autoScrollToSection(prevSection);
        }
    }
});

// Helper functions for keyboard navigation
const getCurrentSection = () => {
    const sections = ['home', 'how-to-use', 'features', 'about', 'team', 'download'];
    const scrollPosition = window.pageYOffset + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
            return sections[i];
        }
    }
    return 'home';
};

const getNextSection = (currentSection) => {
    const sections = ['home', 'how-to-use', 'features', 'about', 'team', 'download'];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
};

const getPrevSection = (currentSection) => {
    const sections = ['home', 'features', 'about', 'team', 'download'];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
};

document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.demo-video');
    const videoContainer = document.querySelector('.video-container');
    const playButton = document.querySelector('.play-button');
    
    if (playButton && video) {
        playButton.addEventListener('click', function() {
            video.play();
            videoContainer.classList.add('playing');
        });
        
        video.addEventListener('play', function() {
            videoContainer.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            videoContainer.classList.remove('playing');
        });
    }
});

// Add visual feedback for video interaction
const addVideoInteractionFeedback = () => {
    const video = document.querySelector('.demo-video');
    if (video) {
        video.addEventListener('loadstart', () => {
            console.log('Video loading started');
        });
        
        video.addEventListener('canplay', () => {
            console.log('Video ready to play');
        });
        
        video.addEventListener('error', (e) => {
            console.error('Video error:', e);
            // Show fallback message
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.innerHTML = `
                    <div style="
                        width: 100%;
                        height: 300px;
                        background: var(--medium-gray);
                        border-radius: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--text-gray);
                        font-size: 1.2rem;
                    ">
                        <div style="text-align: center;">
                            <i class="fas fa-video" style="font-size: 3rem; margin-bottom: 20px; color: var(--primary-red);"></i>
                            <p>Demo video will be available soon</p>
                        </div>
                    </div>
                `;
            }
        });
    }
};


// Initialize video feedback
addVideoInteractionFeedback();