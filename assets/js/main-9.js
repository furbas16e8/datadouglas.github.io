/**
 * main-9.js
 * Logic for Personal Portfolio v9 (Glass & Green Stories)
 */

const DataEngine = {
    // Mock Data Store - more complex correlations
    data: {
        dashboard: {
            domains: [85, 90, 65, 95, 80], // Health, Finance, Social, Study, Work
            stories: {
                story1: { labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'], sleep: [6, 7, 5, 8, 7, 9, 8], prod: [40, 60, 30, 85, 75, 50, 20] },
                story2: { labels: ['Bad', 'Neut', 'Good', 'Exc'], commits: [2, 5, 12, 18] }, // Avg commits per mood
                story3: { labels: ['Next 24h'], prob: 88 } // Forecast
            },
            heatmap: [] 
        },
        habits: [
            { name: "Deep Work", streak: 14, icon: "sunny-outline" },
            { name: "Reading", streak: 6, icon: "book-outline" },
            { name: "Gym", streak: 3, icon: "barbell-outline" },
            { name: "Meditation", streak: 21, icon: "infinite-outline" }
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
        // Generate Mock Heatmap Data
        const heatmapData = [];
        for(let i=0; i<364; i++) {
            const chance = Math.random();
            let level = 0;
            if(chance > 0.85) level = 4;
            else if(chance > 0.65) level = 3;
            else if(chance > 0.45) level = 2;
            else if(chance > 0.25) level = 1;
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
    carouselInterval: null,
    currentSlide: 0,
    totalSlides: 3,

    init: function() {
        DataEngine.init();
        this.bindNav();
        this.switchView('dashboard');
    },

    bindNav: function() {
        // View Nav
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.getAttribute('data-view');
                if(view) this.switchView(view);
            });
        });

        // Carousel Dot Nav
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.getAttribute('data-slide'));
                this.forceSlide(slideIndex);
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

        // Update Title
        const titles = {'dashboard': 'Dashboard', 'projects': 'Projetos', 'research': 'Pesquisas', 'about': 'Sobre'};
        document.getElementById('page-title').textContent = titles[viewId];

        // Load Content
        if(viewId === 'dashboard') {
            const dashData = await DataEngine.get('dashboard');
            const habits = await DataEngine.get('habits');
            
            this.renderFixedCharts(dashData);
            this.renderStories(dashData.stories);
            this.renderHeatmap(dashData.heatmap);
            this.renderHabits(habits);
            
            // Start Carousel
            this.startCarousel();
        } else {
            // Stop Carousel to save resources
            this.stopCarousel();
            
            if(viewId === 'projects') {
                const projs = await DataEngine.get('projects');
                this.renderProjects(projs);
            } else if(viewId === 'research') {
                const res = await DataEngine.get('research');
                this.renderTimeline(res);
            }
        }
    },

    // --- CAROUSEL LOGIC ---
    startCarousel: function() {
        if(this.carouselInterval) clearInterval(this.carouselInterval);
        this.carouselInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 seconds per slide for better readability
    },

    stopCarousel: function() {
        if(this.carouselInterval) clearInterval(this.carouselInterval);
    },

    nextSlide: function() {
        let next = this.currentSlide + 1;
        if(next >= this.totalSlides) next = 0;
        this.changeSlide(next);
    },

    forceSlide: function(index) {
        this.stopCarousel(); // Pause on interaction
        this.changeSlide(index);
        this.startCarousel(); // Restart
    },

    changeSlide: function(index) {
        // Update Classes
        document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
        document.getElementById(`slide-${index}`).classList.add('active');

        // Update Dots
        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        document.querySelector(`.dot[data-slide="${index}"]`).classList.add('active');

        this.currentSlide = index;
    },

    // --- RENDERERS ---

    renderFixedCharts: function(data) {
        // Radar Chart (Green Palette)
        if(this.charts.radar) this.charts.radar.destroy();
        const ctxRadar = document.getElementById('domainsChart').getContext('2d');
        
        this.charts.radar = new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['Saúde', 'Finanças', 'Social', 'Estudo', 'Trabalho'],
                datasets: [{
                    label: 'Score',
                    data: data.domains,
                    borderColor: '#10b981', // Emerald 500
                    backgroundColor: 'rgba(16, 185, 129, 0.2)', // Emerald with opacity
                    pointBackgroundColor: '#10b981',
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(51, 65, 85, 0.5)' },
                        grid: { color: 'rgba(51, 65, 85, 0.5)' },
                        pointLabels: { color: '#94a3b8', font: { size: 10 } },
                        ticks: { display: false, backdropColor: 'transparent' }
                    }
                }
            }
        });
    },

    renderStories: function(stories) {
        // Story 1: Sleep (Bar) vs Prod (Line)
        if(this.charts.story1) this.charts.story1.destroy();
        const ctx1 = document.getElementById('chartStory1').getContext('2d');
        
        this.charts.story1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: stories.story1.labels,
                datasets: [
                    {
                        type: 'line',
                        label: 'Produtividade',
                        data: stories.story1.prod,
                        borderColor: '#10b981',
                        borderWidth: 2,
                        yAxisID: 'y'
                    },
                    {
                        type: 'bar',
                        label: 'Hrs Sono',
                        data: stories.story1.sleep,
                        backgroundColor: 'rgba(14, 165, 233, 0.4)', // Sky blue
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: true, grid: { display: false } },
                    y: { display: false },
                    y1: { display: false, position: 'right' }
                }
            }
        });

        // Story 2: Mood vs Commits (Line)
        if(this.charts.story2) this.charts.story2.destroy();
        const ctx2 = document.getElementById('chartStory2').getContext('2d');
        
        this.charts.story2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: stories.story2.labels,
                datasets: [{
                    label: 'Commits',
                    data: stories.story2.commits,
                    borderColor: '#f59e0b', // Amber
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { display: true, grid: { color: 'rgba(255,255,255,0.05)' } }, y: { display: false } }
            }
        });

        // Story 3: Forecast (Doughnut/Gauge)
        if(this.charts.story3) this.charts.story3.destroy();
        const ctx3 = document.getElementById('chartStory3').getContext('2d');
        
        this.charts.story3 = new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['Foco', 'Distração'],
                datasets: [{
                    data: [stories.story3.prob, 100 - stories.story3.prob],
                    backgroundColor: ['#10b981', 'rgba(255,255,255,0.05)'],
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '70%',
                plugins: { legend: { display: false } }
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

    renderHabits: function(habits) {
        const container = document.getElementById('dashboard-habits');
        if(!container) return;
        
        container.innerHTML = habits.map(h => `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:0.75rem; font-size:0.9rem;">
                <ion-icon name="${h.icon}" style="color:#0ea5e9;"></ion-icon>
                <span style="flex:1; color:#f8fafc;">${h.name}</span>
                <span style="color:#10b981; font-weight:600;">${h.streak}d</span>
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
                <div style="position:absolute; left:7px; top:0; width:12px; height:12px; background:#10b981; border-radius:50%; box-shadow:0 0 0 4px #0f172a;"></div>
                <div style="background:#1e293b; padding:1.25rem; border-radius:12px; border:1px solid #334155;">
                    <span style="color:#10b981; font-size:0.8rem; font-weight:700;">${item.year}</span>
                    <h3 style="color:#f8fafc; font-size:1rem; margin:0.25rem 0;">${item.title}</h3>
                    <p style="color:#94a3b8; font-size:0.9rem;">${item.abstract}</p>
                </div>
            </div>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', () => UI.init());
