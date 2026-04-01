// ===== Navigation =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll(
        '.tt-item, .recruit-card, .ticket-card, .food-content, .notes-card, .contact-content, .hero-info-card'
    );
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ===== Particle Background =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${['rgba(255,45,85,0.4)', 'rgba(0,243,255,0.4)', 'rgba(176,37,255,0.4)', 'rgba(255,215,0,0.3)'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleDrift ${Math.random() * 20 + 15}s linear infinite;
            opacity: ${Math.random() * 0.6 + 0.2};
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
    
    // Add the keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleDrift {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200}px, -100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ===== Active Nav Link Highlight =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                    link.style.color = 'var(--accent-red)';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Timetable Animation on Hover =====
document.querySelectorAll('.tt-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dot = item.querySelector('.tt-time::after');
        item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// ===== Ticket Card Hover Effect =====
document.querySelectorAll('.ticket-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
