/**
 * main-8.js
 * Logic for Personal Portfolio v8 (Heatmap Edition)
 */

const DataEngine = {
    // Mock Data Store
    data: {
        dashboard: {
            productivity: [65, 59, 80, 81, 56, 55, 40],
            domains: [90, 75, 60, 85, 70],
            biases: [
                { name: "Present Bias", level: "Low", pct: 20 },
                { name: "Loss Aversion", level: "Med", pct: 45 },
                { name: "Sunk Cost", level: "Low", pct: 15 },
                { name: "Confirmation Bias", level: "High", pct: 75 }
            ],
            heatmap: [] // Generated on init
        },
        habits: [
            { name: "Deep Work", streak: 12, icon: "sunny-outline" },
            { name: "Reading", streak: 5, icon: "book-outline" },
            { name: "No Phone", streak: 21, icon: "moon-outline" }
        ],
        projects: [
            {
                title: "Behavioral Finance App",
                desc: "Nudges comportamentais p/ economia.",
                stack: ["React Native", "ML"],
                status: "Prod",
                link: "#"
            },
            {
                title: "Sentiment Bot",
                desc: "Análise de cripto via Twitter.",
                stack: ["NLP", "Python"],
                status: "MVP",
                link: "#"
            },
            {
                title: "Life Data Warehouse",
                desc: "ETL de dados pessoais.",
                stack: ["SQL", "Airflow"],
                status: "Concluído",
                link: "#"
            }
        ],
        research: [
            {
                year: "2024",
                title: "RL em Finanças",
                abstract: "Otimização de poupança com Reinforcement Learning.",
                link: "#"
            },
            {
                year: "2023",
                title: "Viés do Presente",
                abstract: "Análise quantitativa de procrastinação em devs.",
                link: "#"
            }
        ]
    },

    init: function() {
        // Generate Mock Heatmap Data (364 days)
        // Levels: 0 (Empty), 1 (Low), 2 (Med), 3 (High), 4 (Max)
        const heatmapData = [];
        for(let i=0; i<364; i++) {
            // Randomly assign levels with weight towards 0 and 1-2
            const chance = Math.random();
            let level = 0;
            if(chance > 0.8) level = 4;
            else if(chance > 0.6) level = 3;
            else if(chance > 0.4) level = 2;
            else if(chance > 0.2) level = 1;
            heatmapData.push(level);
        }
        this.data.dashboard.heatmap = heatmapData;
    },

    get: async function(key) {
        return new Promise(resolve => setTimeout(() => resolve(this.data[key]), 300));
    }
};

const UI = {
    charts: {},

    init: function() {
        DataEngine.init();
        this.bindNav();
        this.switchView('dashboard');
    },

    bindNav: function() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.getAttribute('data-view');
                if(view) this.switchView(view);
            });
        });
    },

    switchView: async function(viewId) {
        // Nav State
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.nav-btn[data-view="${viewId}"]`)?.classList.add('active');

        // View Visibility
        document.querySelectorAll('.spa-view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');

        // Header Update
        const titles = {
            'dashboard': 'Dashboard',
            'projects': 'Projetos',
            'research': 'Pesquisas',
            'about': 'Sobre'
        };
        document.getElementById('page-title').textContent = titles[viewId];

        // Load Data
        if(viewId === 'dashboard') {
            const dashData = await DataEngine.get('dashboard');
            const habits = await DataEngine.get('habits');
            this.renderCharts(dashData);
            this.renderHeatmap(dashData.heatmap);
            this.renderInsightsHorizontal(dashData.biases);
            this.renderHabits(habits);
        } else if(viewId === 'projects') {
            const projs = await DataEngine.get('projects');
            this.renderProjects(projs);
        } else if(viewId === 'research') {
            const res = await DataEngine.get('research');
            this.renderTimeline(res);
        }
    },

    /* --- RENDERERS --- */

    renderCharts: function(data) {
        // Destroy old
        if(this.charts.prod) this.charts.prod.destroy();
        if(this.charts.radar) this.charts.radar.destroy();

        // Line Chart
        const ctxProd = document.getElementById('productivityChart').getContext('2d');
        const grad = ctxProd.createLinearGradient(0,0,0,200);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        this.charts.prod = new Chart(ctxProd, {
            type: 'line',
            data: {
                labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
                datasets: [{
                    label: 'Focus',
                    data: data.productivity,
                    borderColor: '#38bdf8',
                    backgroundColor: grad,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } },
                layout: { padding: 0 }
            }
        });

        // Radar Chart
        const ctxRadar = document.getElementById('domainsChart').getContext('2d');
        this.charts.radar = new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['Saúde', 'Finanças', 'Social', 'Estudo', 'Carreira'],
                datasets: [{
                    label: 'Score',
                    data: data.domains,
                    borderColor: '#c084fc',
                    backgroundColor: 'rgba(192, 132, 252, 0.2)',
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: '#334155' },
                        grid: { color: '#334155' },
                        pointLabels: { color: '#94a3b8', font: { size: 10 } },
                        ticks: { display: false, backdropColor: 'transparent' }
                    }
                }
            }
        });
    },

    renderHeatmap: function(data) {
        const container = document.getElementById('heatmap-grid');
        if(!container) return;
        
        container.innerHTML = data.map(level => 
            `<div class="heat-cell" data-level="${level}"></div>`
        ).join('');
    },

    renderInsightsHorizontal: function(biases) {
        const container = document.getElementById('dashboard-insights');
        if(!container) return;
        
        container.innerHTML = biases.map(b => `
            <div class="insight-h-item">
                <div class="insight-h-label">
                    <span style="color:#f8fafc;">${b.name}</span>
                    <span style="color:${this.getColor(b.level)};">${b.level}</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width:${b.pct}%; background:${this.getColor(b.level)};"></div>
                </div>
            </div>
        `).join('');
    },

    getColor: function(level) {
        if(level === 'Low') return '#10b981';
        if(level === 'Med') return '#facc15';
        return '#ef4444';
    },

    renderHabits: function(habits) {
        const container = document.getElementById('dashboard-habits');
        if(!container) return;
        
        container.innerHTML = habits.map(h => `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:0.75rem; font-size:0.9rem;">
                <ion-icon name="${h.icon}" style="color:#c084fc;"></ion-icon>
                <span style="flex:1; color:#f8fafc;">${h.name}</span>
                <span style="color:#facc15; font-weight:600;">${h.streak}d</span>
            </div>
        `).join('');
    },

    renderProjects: function(projs) {
        const container = document.getElementById('projects-container');
        if(container.innerHTML.trim() !== "") return;
        
        container.innerHTML = projs.map(p => `
            <div class="card project-card">
                <div style="height:140px; background:#1e293b; display:flex; align-items:center; justify-content:center; color:#475569;">
                    <ion-icon name="code-slash-outline" style="font-size:2rem;"></ion-icon>
                </div>
                <div style="padding:1.25rem; flex:1; display:flex; flex-direction:column;">
                    <h3 style="color:#f8fafc; font-size:1rem; margin-bottom:0.5rem;">${p.title}</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; margin-bottom:1rem; flex:1;">${p.desc}</p>
                    <div style="display:flex; gap:0.5rem;">
                        ${p.stack.map(s => `<span style="font-size:0.7rem; background:rgba(255,255,255,0.05); padding:2px 6px; border-radius:4px; color:#cbd5e1;">${s}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderTimeline: function(items) {
        const container = document.getElementById('timeline-content');
        if(container.innerHTML.trim() !== "") return;
        
        container.innerHTML = items.map(item => `
            <div style="position:relative; margin-bottom:2rem; padding-left:40px;">
                <div style="position:absolute; left:7px; top:0; width:12px; height:12px; background:#38bdf8; border-radius:50%; box-shadow:0 0 0 4px #0f172a;"></div>
                <div style="background:#1e293b; padding:1.25rem; border-radius:12px; border:1px solid #334155;">
                    <span style="color:#38bdf8; font-size:0.8rem; font-weight:700;">${item.year}</span>
                    <h3 style="color:#f8fafc; font-size:1rem; margin:0.25rem 0;">${item.title}</h3>
                    <p style="color:#94a3b8; font-size:0.9rem;">${item.abstract}</p>
                </div>
            </div>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', () => UI.init());
