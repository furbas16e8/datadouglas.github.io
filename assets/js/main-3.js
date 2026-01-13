/**
 * Main JS for Portfolio Redesign (v3)
 * Handles theme toggling and scroll-based navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.page-section');
    const mainContent = document.querySelector('.main-content');

    // ========================================
    // Theme Toggle
    // ========================================
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', initialTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 100);
    });

    // ========================================
    // Scroll-Based Navigation
    // ========================================
    
    // Update active nav item based on scroll position
    function updateActiveNav() {
        const scrollTop = mainContent.scrollTop;
        const offset = 150; // Trigger point from top
        
        let currentSection = 'inicio';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                currentSection = section.id;
            }
        });

        // Update nav items
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });

        // Update URL hash silently
        if (window.location.hash.slice(1) !== currentSection) {
            history.replaceState(null, null, `#${currentSection}`);
        }
    }

    // Scroll listener with throttle
    let scrollTimeout;
    mainContent.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            updateActiveNav();
            scrollTimeout = null;
        }, 50);
    });

    // Click navigation: smooth scroll to section
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Handle internal hash links (like "Ver todos")
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        if (!link.hasAttribute('data-section')) {
            link.addEventListener('click', (e) => {
                const hash = link.getAttribute('href').slice(1);
                const target = document.getElementById(hash);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });

    // Initial: scroll to hash if present
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
        const target = document.getElementById(initialHash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Initial update
    updateActiveNav();

    console.log('Portfolio v3 Loaded - Continuous Scroll Active');
});
