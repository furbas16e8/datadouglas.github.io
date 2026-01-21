/**
 * main-6.js
 * Logic for Personal Behavioral Dashboard v6
 * Handles Data Fetching (Supabase/Mock), Chart Rendering, and UI Interactions.
 */

/* =========================================
   1. Data Engine (Hybrid: Mock + Supabase)
   ========================================= */
const DataEngine = {
    mode: 'mock', // 'mock' or 'live'
    
    // Fallback Mock Data
    mock: {
        behavioral: {
            presentBias: 25,
            lossAversion: 55,
            sunkCost: 15,
            decisionFatigue: 40
        },
        domains: {
            labels: ['Saúde', 'Finanças', 'Estudos', 'Social', 'Carreira'],
            data: [85, 90, 75, 60, 95]
        },
        productivity: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            data: [7.5, 8.2, 6.8, 9.0, 8.5, 4.0, 5.5] // Deep Work Hours
        },
        habits: [
            { name: "Deep Work Morning", icon: "sunny-outline", streak: 12, status: "active" },
            { name: "Reading (Research)", icon: "book-outline", streak: 5, status: "active" },
            { name: "Gym / Health", icon: "barbell-outline", streak: 21, status: "active" },
            { name: "Investment Check", icon: "wallet-outline", streak: 2, status: "warning" }
        ],
        projects: [
            { 
                title: "Behavioral Finance App", 
                desc: "App mobile que usa 'nudges' para evitar compras por impulso.", 
                tags: ["React Native", "Python", "ML"],
                link: "#" 
            },
            { 
                title: "Sentiment Analysis Bot", 
                desc: "Bot de trade que analisa sentimento do Twitter para cripto.", 
                tags: ["NLP", "Python", "Docker"],
                link: "#" 
            },
            { 
                title: "Personal Data Warehouse", 
                desc: "ETL pipeline de vida pessoal (Fitbit, Banks, RescueTime).", 
                tags: ["SQL", "Airflow", "Supabase"],
                link: "#" 
            }
        ]
    },

    // Initialize (Check Supabase connection in future)
    init: async function() {
        console.log(`[DataEngine] Initialized in ${this.mode} mode.`);
        // In real implementations, we would check Supabase auth here.
        return true;
    },

    getMetrics: async function() {
        // Simulate API delay
        return new Promise(resolve => setTimeout(() => resolve(this.mock), 800));
    }
};

/* =========================================
   2. Chart Renderers (Chart.js)
   ========================================= */
const ChartManager = {
    colors: {
        primary: '#38bdf8', // Sky 400
        secondary: '#c084fc', // Purple 400
        grid: 'rgba(255, 255, 255, 0.1)',
        text: '#94a3b8' // Slate 400
    },

    initRadar: function(ctx, data) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Balance Score',
                    data: data.data,
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    borderColor: this.colors.primary,
                    pointBackgroundColor: this.colors.secondary,
                    borderWidth: 2,
                    pointRadius: 3
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: this.colors.grid },
                        grid: { color: this.colors.grid },
                        pointLabels: { color: this.colors.text, font: { size: 12 } },
                        ticks: { display: false, backdropColor: 'transparent' }
                    }
                },
                plugins: { legend: { display: false } },
                maintainAspectRatio: false
            }
        });
    },

    initLine: function(ctx, data) {
        // Create Gradient
        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(192, 132, 252, 0.5)'); // Purple
        gradient.addColorStop(1, 'rgba(192, 132, 252, 0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Deep Work (Horas)',
                    data: data.data,
                    backgroundColor: gradient,
                    borderColor: this.colors.secondary,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4 // Smooth curve
                }]
            },
            options: {
                scales: {
                    y: { 
                        beginAtZero: true, 
                        grid: { color: this.colors.grid },
                        ticks: { color: this.colors.text }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: { color: this.colors.text }
                    }
                },
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' }
            }
        });
    }
};

/* =========================================
   3. UI Controller
   ========================================= */
const UI = {
    init: function() {
        this.bindEvents();
        this.loadData();
    },

    bindEvents: function() {
        // Sidebar Navigation
        document.querySelectorAll('.nav-btn[data-target]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = btn.getAttribute('data-target');
                this.switchView(targetId);
                
                // Update specific active class
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Modals
        document.querySelectorAll('[data-action="open-modal"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = `modal-${btn.getAttribute('data-modal')}`;
                const modal = document.getElementById(modalId);
                if(modal) modal.classList.add('active');
            });
        });

        document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal-backdrop');
                modal.classList.remove('active');
            });
        });

        // Close modal on backdrop click
        document.querySelectorAll('.modal-backdrop').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if(e.target === modal) modal.classList.remove('active');
            });
        });
    },

    switchView: function(viewId) {
        // Simple view switcher
        if(viewId === 'dashboard') {
            document.querySelector('.bento-grid').style.display = 'grid';
            document.getElementById('projects-view').classList.remove('active');
            document.querySelector('.crumb-current').textContent = 'Behavioral Overview';
        } else if(viewId === 'projects') {
            document.querySelector('.bento-grid').style.display = 'none';
            document.getElementById('projects-view').classList.add('active');
            document.querySelector('.crumb-current').textContent = 'Full Portfolio';
            this.renderProjects(); // Ensure projects are rendered
        }
    },

    loadData: async function() {
        const data = await DataEngine.getMetrics();
        
        // Render Charts
        const ctxRadar = document.getElementById('domainsChart');
        if(ctxRadar) ChartManager.initRadar(ctxRadar, data.domains);

        const ctxLine = document.getElementById('productivityChart');
        if(ctxLine) ChartManager.initLine(ctxLine, data.productivity);

        // Render Habits
        this.renderHabits(data.habits);
        
        // Render Projects Data (into internal store for 'projects' view)
        this.projectsData = data.projects;
    },

    renderHabits: function(habits) {
        const container = document.getElementById('habits-list');
        if(!container) return;

        container.innerHTML = habits.map(habit => `
            <div class="habit-item">
                <div class="habit-icon"><ion-icon name="${habit.icon}"></ion-icon></div>
                <div class="habit-info">
                    <h4>${habit.name}</h4>
                    <p>Status: ${habit.status}</p>
                </div>
                <span class="habit-streak">${habit.streak}d 🔥</span>
            </div>
        `).join('');
    },

    renderProjects: function() {
        const container = document.getElementById('projects-grid');
        if(!container || container.innerHTML.trim() !== "") return; // Avoid re-render

        container.innerHTML = (this.projectsData || []).map(proj => `
            <div class="card project-card">
                <div class="card-header">
                    <h3 class="card-title">${proj.title}</h3>
                </div>
                <p style="color:var(--text-secondary); margin-bottom:1rem; font-size:0.9rem;">${proj.desc}</p>
                <div class="tags-cloud" style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1rem;">
                    ${proj.tags.map(t => `<span style="background:rgba(255,255,255,0.05); padding:4px 8px; border-radius:4px; font-size:0.75rem;">${t}</span>`).join('')}
                </div>
                <a href="${proj.link}" class="btn-primary" style="padding:6px 12px; font-size:0.85rem;">Ver Projeto</a>
            </div>
        `).join('');
    }
};

// Start Application
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
