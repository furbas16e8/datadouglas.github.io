/**
 * Main JS for Portfolio v4 - Finexa Style
 * Handles sidebar navigation and active states.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item[data-section]');

    // Handle nav clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active to clicked
            item.classList.add('active');
            
            // Update URL hash (for bookmarking)
            const section = item.getAttribute('data-section');
            history.pushState(null, null, `#${section}`);
        });
    });

    // Handle hash on page load
    const hash = window.location.hash.slice(1);
    if (hash) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === hash) {
                item.classList.add('active');
            }
        });
    }

    // Handle internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        if (!link.hasAttribute('data-section')) {
            link.addEventListener('click', (e) => {
                const hash = link.getAttribute('href').slice(1);
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-section') === hash) {
                        item.classList.add('active');
                    }
                });
            });
        }
    });

    // --- Chart.js Initialization ---
    const ctx = document.getElementById('focusChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Dev', 'Data', 'Econ', 'Life', 'Study'],
                datasets: [{
                    label: 'Esforço Atual',
                    data: [90, 80, 65, 70, 85],
                    fill: true,
                    backgroundColor: 'rgba(178, 229, 249, 0.2)',
                    borderColor: '#B2E5F9',
                    pointBackgroundColor: '#B2E5F9',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#B2E5F9'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                family: 'Urbanist',
                                size: 12
                            }
                        },
                        ticks: {
                            display: false,
                            stepSize: 20
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    console.log('Portfolio v4 Loaded - Finexa Style');
});
