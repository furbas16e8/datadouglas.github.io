/**
 * Main JS for Portfolio v5 - Advanced Data Metrics
 * Handles interactive charts for ML Performance and Behavioral Insights.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMLChart();
    initFocusChart();
    
    console.log('Portfolio v5 Loaded - Behavioral & ML Metrics');
});

/**
 * Navigation logic for fixed sidebar
 */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            const section = item.getAttribute('data-section');
            history.pushState(null, null, `#${section}`);
        });
    });

    // Handle hash on page load
    const hash = window.location.hash.slice(1);
    if (hash) {
        navItems.forEach(item => {
            if (item.getAttribute('data-section') === hash) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

/**
 * ML Model Performance Line Chart
 */
function initMLChart() {
    const ctx = document.getElementById('mlPerformanceChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Validation Accuracy',
                data: [0.72, 0.75, 0.81, 0.79, 0.84, 0.88, 0.91],
                borderColor: '#B2E5F9',
                backgroundColor: 'rgba(178, 229, 249, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#B2E5F9'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 10 } }
                },
                y: {
                    min: 0.6,
                    max: 1.0,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { 
                        color: 'rgba(255,255,255,0.4)', 
                        font: { size: 10 },
                        callback: (value) => (value * 100) + '%'
                    }
                }
            }
        }
    });
}

/**
 * Areas of Focus (Radar Chart)
 */
function initFocusChart() {
    const ctx = document.getElementById('focusChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['ML Engineer', 'Data Science', 'Behav. Econ', 'Ethics', 'Frontend', 'Quant'],
            datasets: [{
                label: 'Core Skills',
                data: [90, 85, 80, 70, 65, 75],
                backgroundColor: 'rgba(178, 229, 249, 0.2)',
                borderColor: '#B2E5F9',
                pointBackgroundColor: '#B2E5F9',
                pointBorderColor: '#fff',
                pointHoverBorderColor: '#B2E5F9'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: {
                        color: 'rgba(255,255,255,0.7)',
                        font: { family: 'Urbanist', size: 11, weight: '600' }
                    },
                    ticks: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}
