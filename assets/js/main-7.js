/**
 * main-7.js
 * Logic for Personal Portfolio v7 (SPA Architecture)
 */

/* =========================================
   1. Data Engine (Hybrid)
   ========================================= */
const DataEngine = {
    // Mock Data Store
    data: {
        projects: [
            {
                title: "Behavioral Finance App",
                desc: "Aplicativo mobile que utiliza 'nudges' comportamentais para reduzir compras por impulso em 35%.",
                stack: ["React Native", "Python", "ML"],
                status: "Em Produção",
                link: "#"
            },
            {
                title: "Sentiment Analysis Bot",
                desc: "Bot de trading algorítmico que analisa sentimento do Twitter para prever tendências de criptoativos.",
                stack: ["NLP", "Docker", "AWS"],
                status: "MVP",
                link: "#"
            },
            {
                title: "Personal Data Warehouse",
                desc: "Pipeline ETL completa para agregar dados de vida pessoal (Fitbit, Bancos, RescueTime) em um único Data Lake.",
                stack: ["Airflow", "SQL", "Supabase"],
                status: "Concluído",
                link: "#"
            },
            {
                title: "Decision Fatigue Meter",
                desc: "Modelo preditivo que estima a qualidade das decisões baseada na carga cognitiva do dia.",
                stack: ["Scikit-Learn", "FastAPI"],
                status: "P&D",
                link: "#"
            }
        ],
        research: [
            {
                year: "2024",
                title: "Reinforcement Learning em Finanças Pessoais",
                abstract: "Investigação sobre como agentes de RL podem otimizar a taxa de poupança doméstica através de intervenções personalizadas.",
                link: "#"
            },
            {
                year: "2023",
                title: "O Viés do Presente na Programação",
                abstract: "Análise quantitativa de commits no GitHub mostrando a preferência por tarefas rápidas vs. refatoração de longo prazo.",
                link: "#"
            },
            {
                year: "2022",
                title: "Nudges Digitais: Ética e Eficácia",
                abstract: "Revisão sistemática sobre a aplicação de arquitetura de escolha em interfaces de usuário.",
                link: "#"
            }
        ],
        dashboard: {
            productivity: [65, 59, 80, 81, 56, 55, 40], // Weekly Trend
            domains: [90, 75, 60, 85, 70], // Health, Finance, Social, Learning, Career
            biases: [
                { name: "Present Bias", level: "Low", pct: 20 },
                { name: "Loss Aversion", level: "Med", pct: 45 },
                { name: "Confirmation Bias", level: "High", pct: 75 }
            ]
        },
        habits: [
            { name: "Deep Work (Morning)", streak: 12, icon: "sunny-outline" },
            { name: "Reading 30m", streak: 5, icon: "book-outline" },
            { name: "No Phone Bedtime", streak: 21, icon: "moon-outline" },
            { name: "Portfolio Update", streak: 2, icon: "code-working-outline" }
        ]
    },

    get: async function(key) {
        // Simulate Async Fetch
        return new Promise(resolve => setTimeout(() => resolve(this.data[key]), 300));
    }
};

/* =========================================
   2. UI Controller (SPA Router)
   ========================================= */
const UI = {
    charts: {}, // Store chart instances

    init: function() {
        this.bindNav();
        this.loadInitialView();
    },

    bindNav: function() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetView = btn.getAttribute('data-view');
                if(targetView) this.switchView(targetView);
            });
        });
    },

    loadInitialView: function() {
        // Load default view (Dashboard)
        this.switchView('dashboard');
    },

    switchView: function(viewId) {
        // 1. Update Buttons
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.nav-btn[data-view="${viewId}"]`)?.classList.add('active');

        // 2. Hide all Views
        document.querySelectorAll('.spa-view').forEach(v => v.classList.remove('active'));

        // 3. Show Target View
        const targetSection = document.getElementById(`view-${viewId}`);
        if(targetSection) targetSection.classList.add('active');

        // 4. Update Header
        const titles = {
            'dashboard': 'Dashboard Overview',
            'projects': 'Portfolio de Projetos',
            'research': 'Publicações & Estudos',
            'about': 'Minha História'
        };
        document.getElementById('page-title').textContent = titles[viewId] || 'Overview';

        // 5. Load Data/Charts for the view
        this.loadViewData(viewId);
    },

    loadViewData: async function(viewId) {
        if(viewId === 'dashboard') {
            const data = await DataEngine.get('dashboard');
            const habits = await DataEngine.get('habits');
            this.renderCharts(data);
            this.renderInsights(data.biases);
            this.renderHabits(habits);
        } 
        else if (viewId === 'projects') {
            const data = await DataEngine.get('projects');
            this.renderProjects(data);
        }
        else if (viewId === 'research') {
            const data = await DataEngine.get('research');
            this.renderTimeline(data);
        }
    },

    /* --- Renderers --- */

    renderCharts: function(data) {
        // Destroy existing to prevent duplicates
        if(this.charts.prod) this.charts.prod.destroy();
        if(this.charts.radar) this.charts.radar.destroy();

        // 1. Productivity Line Chart
        const ctxProd = document.getElementById('productivityChart').getContext('2d');
        const gradient = ctxProd.createLinearGradient(0,0,0,300);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.5)'); // Sky
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

        this.charts.prod = new Chart(ctxProd, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
                datasets: [{
                    label: 'Focus Score',
                    data: data.productivity,
                    borderColor: '#38bdf8',
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
                }
            }
        });

        // 2. Radar Chart
        const ctxRadar = document.getElementById('domainsChart').getContext('2d');
        this.charts.radar = new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['Saúde', 'Finanças', 'Social', 'Estudo', 'Carreira'],
                datasets: [{
                    label: 'Rating',
                    data: data.domains,
                    borderColor: '#c084fc',
                    backgroundColor: 'rgba(192, 132, 252, 0.2)'
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: '#334155' },
                        grid: { color: '#334155' },
                        pointLabels: { color: '#f8fafc' },
                        ticks: { display: false, backdropColor: 'transparent' }
                    }
                }
            }
        });
    },

    renderInsights: function(biases) {
        const container = document.getElementById('dashboard-insights');
        if(!container) return;
        container.innerHTML = biases.map(b => `
            <div style="margin-bottom: 1rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
                    <span style="font-size:0.9rem; color:#f8fafc;">${b.name}</span>
                    <span style="font-size:0.8rem; color:#38bdf8;">${b.level}</span>
                </div>
                <div style="height:6px; background:#334155; border-radius:3px;">
                    <div style="width:${b.pct}%; height:100%; background:#38bdf8; border-radius:3px;"></div>
                </div>
            </div>
        `).join('');
    },

    renderHabits: function(habits) {
        const container = document.getElementById('dashboard-habits');
        if(!container) return;
        container.innerHTML = habits.map(h => `
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:1rem; padding:8px; background:rgba(255,255,255,0.03); border-radius:8px;">
                <div style="color:#c084fc; font-size:1.2rem;"><ion-icon name="${h.icon}"></ion-icon></div>
                <div style="flex:1;">
                    <h4 style="font-size:0.9rem; color:#f8fafc; font-weight:500;">${h.name}</h4>
                </div>
                <div style="font-size:0.85rem; color:#facc15; font-weight:700;">${h.streak}d</div>
            </div>
        `).join('');
    },

    renderProjects: function(projects) {
        const container = document.getElementById('projects-container');
        if(container.innerHTML.trim() !== "") return; // Avoid re-render

        container.innerHTML = projects.map(p => `
            <div class="card project-card">
                <div class="project-img-placeholder">
                    <ion-icon name="code-slash-outline"></ion-icon>
                </div>
                <div class="project-body">
                    <h3 style="color:#f8fafc; font-size:1.1rem; margin-bottom:0.5rem;">${p.title}</h3>
                    <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:1rem;">${p.desc}</p>
                    <div class="project-tabs">
                        ${p.stack.map(s => `<span class="tech-tag">${s}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderTimeline: function(items) {
        const container = document.getElementById('timeline-content');
        if(container.innerHTML.trim() !== "") return;

        container.innerHTML = items.map(item => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="research-card">
                    <div class="research-year">${item.year}</div>
                    <h3 style="color:#f8fafc; font-size:1.1rem; margin:0.5rem 0;">${item.title}</h3>
                    <p style="color:#94a3b8; font-size:0.95rem; margin-bottom:1rem;">${item.abstract}</p>
                    <a href="${item.link}" style="color:#38bdf8; text-decoration:none; font-size:0.9rem;">
                        Ler Publicação &rarr;
                    </a>
                </div>
            </div>
        `).join('');
    }
};

// Start
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
