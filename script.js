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


// ===== Lineup Auto-Release Mechanism =====
document.addEventListener('DOMContentLoaded', () => {
    // Release date: May 22, 2026, 20:00 JST
    const targetTime = new Date('2026-05-22T20:00:00+09:00').getTime();
    const container = document.getElementById('lineup-container');
    if (!container) return;

    // Encoded HTML representation of the lineup to prevent easy spoilers
    const base64Html = "PGgzIGNsYXNzPSJsaW5ldXAtdGl0bGUiPkFSVElTVCBMSU5FVVA8L2gzPgo8ZGl2IGNsYXNzPSJsaW5ldXAtZ3JpZCI+CiAgICA8YSBocmVmPSJodHRwczovL3guY29tL2hpcm9taV9zb3VuZCIgdGFyZ2V0PSJfYmxhbmsiIGNsYXNzPSJsaW5ldXAtY2FyZCI+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWF2YXRhci1jb250YWluZXIiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtYXZhdGFyLWZhbGxiYWNrIj7wn4y4PC9kaXY+CiAgICAgICAgICAgIDxpbWcgc3JjPSJodHRwczovL3VuYXZhdGFyLmlvL3R3aXR0ZXIvaGlyb21pX3NvdW5kIiBjbGFzcz0ibGluZXVwLWF2YXRhciIgYWx0PSJISVJPTUkiIG9ubG9hZD0idGhpcy5zdHlsZS5vcGFjaXR5PScxJzsiIC8+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLW5hbWUiPkhJUk9NSTwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1oYW5kbGUiPkBoaXJvbWlfc291bmQ8L2Rpdj4KICAgIDwvYT4KICAgIDxhIGhyZWY9Imh0dHBzOi8veC5jb20vMjUyNWZhbWlseV94IiB0YXJnZXQ9Il9ibGFuayIgY2xhc3M9ImxpbmV1cC1jYXJkIj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtYXZhdGFyLWNvbnRhaW5lciI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1hdmF0YXItZmFsbGJhY2siPvCfkao8L2Rpdj4KICAgICAgICAgICAgPGltZyBzcmM9Imh0dHBzOi8vdW5hdmF0YXIuaW8vdHdpdHRlci8yNTI1ZmFtaWx5X3giIGNsYXNzPSJsaW5ldXAtYXZhdGFyIiBhbHQ9IjI1MjVmYW1pbHkiIG9ubG9hZD0idGhpcy5zdHlsZS5vcGFjaXR5PScxJzsiIC8+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLW5hbWUiPjI1MjVmYW1pbHk8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtaGFuZGxlIj5AMjUyNWZhbWlseV94PC9kaXY+CiAgICA8L2E+CiAgICA8YSBocmVmPSJodHRwczovL3guY29tL3RyaWxsaW9uX211c2ljIiB0YXJnZXQ9Il9ibGFuayIgY2xhc3M9ImxpbmV1cC1jYXJkIj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtYXZhdGFyLWNvbnRhaW5lciI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1hdmF0YXItZmFsbGJhY2siPvCfjrk8L2Rpdj4KICAgICAgICAgICAgPGltZyBzcmM9Imh0dHBzOi8vdW5hdmF0YXIuaW8vdHdpdHRlci90cmlsbGlvbl9tdXNpYyIgY2xhc3M9ImxpbmV1cC1hdmF0YXIiIGFsdD0iTWFrb3RvQUkiIG9ubG9hZD0idGhpcy5zdHlsZS5vcGFjaXR5PScxJzsiIC8+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLW5hbWUiPk1ha290b0FJPGJyPu+8iOODnuOCs+ODiOOCouOCpO+8iTwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1oYW5kbGUiPkB0cmlsbGlvbl9tdXNpYzwvZGl2PgogICAgPC9hPgogICAgPGEgaHJlZj0iaHR0cHM6Ly94LmNvbS9kYWVtb25fYWltdXNpYyIgdGFyZ2V0PSJfYmxhbmsiIGNsYXNzPSJsaW5ldXAtY2FyZCI+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWF2YXRhci1jb250YWluZXIiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtYXZhdGFyLWZhbGxiYWNrIj7wn5G/PC9kaXY+CiAgICAgICAgICAgIDxpbWcgc3JjPSJodHRwczovL3VuYXZhdGFyLmlvL3R3aXR0ZXIvZGFlbW9uX2FpbXVzaWMiIGNsYXNzPSJsaW5ldXAtYXZhdGFyIiBhbHQ9IuOBp+OCguOCkyIgb25sb2FkPSJ0aGlzLnN0eWxlLm9wYWNpdHk9JzEnOyIgLz4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtbmFtZSI+44Gn44KC44KTPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWhhbmRsZSI+QGRhZW1vbl9haW11c2ljPC9kaXY+CiAgICA8L2E+CiAgICA8YSBocmVmPSJodHRwczovL3guY29tL211c2ljX2luZGV4X3NucyIgdGFyZ2V0PSJfYmxhbmsiIGNsYXNzPSJsaW5ldXAtY2FyZCI+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWF2YXRhci1jb250YWluZXIiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtYXZhdGFyLWZhbGxiYWNrIj7wn461PC9kaXY+CiAgICAgICAgICAgIDxpbWcgc3JjPSJodHRwczovL3VuYXZhdGFyLmlvL3R3aXR0ZXIvbXVzaWNfaW5kZXhfc25zIiBjbGFzcz0ibGluZXVwLWF2YXRhciIgYWx0PSJpbmRleCBtdXNpYyIgb25sb2FkPSJ0aGlzLnN0eWxlLm9wYWNpdHk9JzEnOyIgLz4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtbmFtZSI+aW5kZXggbXVzaWM8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtaGFuZGxlIj5AbXVzaWNfaW5kZXhfc25zPC9kaXY+CiAgICA8L2E+CiAgICA8YSBocmVmPSJodHRwczovL3guY29tL2x1eGFpb3MiIHRhcmdldD0iX2JsYW5rIiBjbGFzcz0ibGluZXVwLWNhcmQiPgogICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1hdmF0YXItY29udGFpbmVyIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWF2YXRhci1mYWxsYmFjayI+8J+Rge+4jzwvZGl2PgogICAgICAgICAgICA8aW1nIHNyYz0iaHR0cHM6Ly91bmF2YXRhci5pby90d2l0dGVyL2x1eGFpb3MiIGNsYXNzPSJsaW5ldXAtYXZhdGFyIiBhbHQ9IkxVQ1kiIG9ubG9hZD0idGhpcy5zdHlsZS5vcGFjaXR5PScxJzsiIC8+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLW5hbWUiPkxVQ1k8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtaGFuZGxlIj5AbHV4YWlvczwvZGl2PgogICAgPC9hPgogICAgPGEgaHJlZj0iaHR0cHM6Ly94LmNvbS9hb2tpX3Rvc2giIHRhcmdldD0iX2JsYW5rIiBjbGFzcz0ibGluZXVwLWNhcmQiPgogICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1hdmF0YXItY29udGFpbmVyIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWF2YXRhci1mYWxsYmFjayI+8J+MgDwvZGl2PgogICAgICAgICAgICA8aW1nIHNyYz0iaHR0cHM6Ly91bmF2YXRhci5pby90d2l0dGVyL2Fva2lfdG9zaCIgY2xhc3M9ImxpbmV1cC1hdmF0YXIiIGFsdD0iQW9LacK54oGw4oG0IiBvbmxvYWQ9InRoaXMuc3R5bGUub3BhY2l0eT0nMSc7IiAvPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1uYW1lIj5Bb0tpwrnigbDigbQ8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtaGFuZGxlIj5AYW9raV90b3NoPC9kaXY+CiAgICA8L2E+CiAgICA8YSBocmVmPSJodHRwczovL3guY29tL2ljaGlqb2ppX20iIHRhcmdldD0iX2JsYW5rIiBjbGFzcz0ibGluZXVwLWNhcmQiPgogICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1hdmF0YXItY29udGFpbmVyIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWF2YXRhci1mYWxsYmFjayI+8J+TnDwvZGl2PgogICAgICAgICAgICA8aW1nIHNyYz0iaHR0cHM6Ly91bmF2YXRhci5pby90d2l0dGVyL2ljaGlqb2ppX20iIGNsYXNzPSJsaW5ldXAtYXZhdGFyIiBhbHQ9IuaXp+mbheS5iyIgb25sb2FkPSJ0aGlzLnN0eWxlLm9wYWNpdHk9JzEnOyIgLz4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtbmFtZSI+5pen6ZuF5LmLPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWhhbmRsZSI+QGljaGlqb2ppX208L2Rpdj4KICAgIDwvYT4KICAgIDxhIGhyZWY9Imh0dHBzOi8veC5jb20vdW5pZ2FtZTYxOTIzMiIgdGFyZ2V0PSJfYmxhbmsiIGNsYXNzPSJsaW5ldXAtY2FyZCI+CiAgICAgICAgPGRpdiBjbGFzcz0ibGluZXVwLWF2YXRhci1jb250YWluZXIiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtYXZhdGFyLWZhbGxiYWNrIj7wn46uPC9kaXY+CiAgICAgICAgICAgIDxpbWcgc3JjPSJodHRwczovL3VuYXZhdGFyLmlvL3R3aXR0ZXIvdW5pZ2FtZTYxOTIzMiIgY2xhc3M9ImxpbmV1cC1hdmF0YXIiIGFsdD0idW5pZ2FtZSIgb25sb2FkPSJ0aGlzLnN0eWxlLm9wYWNpdHk9JzEnOyIgLz4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtbmFtZSI+dW5pZ2FtZTwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1oYW5kbGUiPkB1bmlnYW1lNjE5MjMyPC9kaXY+CiAgICA8L2E+CiAgICA8YSBocmVmPSJodHRwczovL3guY29tL0FzaF9mcmVlQkdNIiB0YXJnZXQ9Il9ibGFuayIgY2xhc3M9ImxpbmV1cC1jYXJkIj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtYXZhdGFyLWNvbnRhaW5lciI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1hdmF0YXItZmFsbGJhY2siPvCfkIjigI3irJs8L2Rpdj4KICAgICAgICAgICAgPGltZyBzcmM9Imh0dHBzOi8vdW5hdmF0YXIuaW8vdHdpdHRlci9Bc2hfZnJlZUJHTSIgY2xhc3M9ImxpbmV1cC1hdmF0YXIiIGFsdD0i44Ki44OD44K344Ol44O744Kr44Op44OO44ON44KzIiBvbmxvYWQ9InRoaXMuc3R5bGUub3BhY2l0eT0nMSc7IiAvPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImxpbmV1cC1uYW1lIj7jgqLjg4Pjgrfjg6Xjg7vjgqvjg6njg47jg43jgrM8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJsaW5ldXAtaGFuZGxlIj5AQXNoX2ZyZWVCR008L2Rpdj4KICAgIDwvYT4KPC9kaXY+";

    function revealLineup() {
        try {
            // Decode Base64 containing UTF-8 characters
            const decodedHtml = decodeURIComponent(atob(base64Html).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            container.innerHTML = decodedHtml;
            // Force browser layout calculation then show with transition
            void container.offsetWidth;
            container.classList.add('show');
            
            // Add scroll-animation fade-in to the newly added cards
            if (typeof observer !== 'undefined') {
                const newCards = container.querySelectorAll('.lineup-card');
                newCards.forEach(card => {
                    card.classList.add('fade-in');
                    observer.observe(card);
                });
            }
        } catch (e) {
            console.error("Failed to decode lineup content:", e);
        }
    }

    const now = Date.now();
    if (now >= targetTime) {
        revealLineup();
    } else {
        const delay = targetTime - now;
        console.log("Lineup will be revealed in " + (delay / 1000) + " seconds.");
        setTimeout(() => {
            revealLineup();
        }, delay);
    }
});
