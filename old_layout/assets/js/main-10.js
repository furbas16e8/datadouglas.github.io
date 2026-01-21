/**
 * main-10.js
 * Logic for Personal Portfolio v10 (Asymmetric Grid & Mini Heatmap)
 */

const DataEngine = {
    data: {
        dashboard: {
            domains: [95, 80, 60, 90, 75], // Stronger emphasis on Work/Study
            heatmapMonthly: [], // 30 days
            stories: {
                // Story 1: Nice curved area chart
                story1: { labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'], values: [30, 45, 35, 80, 70, 40, 50] }, 
                // Story 2: Bar chart
                story2: { labels: ['1', '2', '3', '4', '5'], values: [10, 25, 45, 30, 55] },
                // Story 3: Doughnut forecast
                story3: 88
            }
        },
        habits: [
            { name: "Deep Work", time: "4h 20m", icon: "laptop-outline" },
            { name: "Leitura", time: "45m", icon: "book-outline" },
            { name: "Treino", time: "1h", icon: "barbell-outline" },
            { name: "Meditação", time: "15m", icon: "water-outline" }
        ],
        projects: [
            { title: "Behavioral App", desc: "React Native + ML", stack: ["JS", "Python"] },
            { title: "Crypto Bot", desc: "Sentiment Analysis", stack: ["NLP"] }
        ]
    },

    init: function() {
        // Generate 30 days heatmap data (0, 1, 2)
        const days = [];
        for(let i=0; i<35; i++) { // 35 slots for 7x5 grid
            if(i < 30) {
                const r = Math.random();
                days.push(r > 0.7 ? 2 : (r > 0.3 ? 1 : 0));
            } else {
                days.push(0); // Empty pad
            }
        }
        this.data.dashboard.heatmapMonthly = days;
    },

    get: async function(key) {
        return new Promise(r => setTimeout(() => r(this.data[key]), 200));
    }
};

const UI = {
    charts: {},
    carouselInterval: null,
    currentSlide: 0,

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
        
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.forceSlide(parseInt(dot.getAttribute('data-slide')));
            });
        });
    },

    switchView: async function(viewId) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.nav-btn[data-view="${viewId}"]`)?.classList.add('active');
        
        document.querySelectorAll('.spa-view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');

        if(viewId === 'dashboard') {
            const d = await DataEngine.get('dashboard');
            const h = await DataEngine.get('habits');
            
            this.renderStories(d.stories);
            this.renderHeatmap(d.heatmapMonthly);
            this.renderRadar(d.domains);
            this.renderHabits(h);
            this.startCarousel();
        } else {
            this.stopCarousel();
            // ... load other views
            if(viewId === 'projects') this.renderProjects(await DataEngine.get('projects'));
        }
    },

    // --- CAROUSEL ENGINE ---
    startCarousel: function() {
        this.stopCarousel();
        this.carouselInterval = setInterval(() => this.nextSlide(), 6000);
    },
    stopCarousel: function() { if(this.carouselInterval) clearInterval(this.carouselInterval); },
    
    nextSlide: function() {
        let n = this.currentSlide + 1;
        if(n > 2) n = 0;
        this.changeSlide(n);
    },
    forceSlide: function(n) {
        this.stopCarousel();
        this.changeSlide(n);
        this.startCarousel();
    },
    changeSlide: function(n) {
        document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
        document.getElementById(`slide-${n}`).classList.add('active');
        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        document.querySelector(`.dot[data-slide="${n}"]`).classList.add('active');
        this.currentSlide = n;
    },

    // --- RENDERERS ---

    renderHeatmap: function(data) {
        const c = document.getElementById('heatmap-grid');
        if(!c) return;
        c.innerHTML = data.map(val => `<div class="heat-cell-m" data-l="${val}"></div>`).join('');
    },

    renderHabits: function(list) {
        const c = document.getElementById('dashboard-habits');
        if(!c) return;
        c.innerHTML = list.map(h => `
            <div class="habit-item">
                <ion-icon name="${h.icon}" class="habit-icon"></ion-icon>
                <span class="habit-name">${h.name}</span>
                <span class="habit-pill">${h.time}</span>
            </div>
        `).join('');
    },

    renderRadar: function(data) {
        if(this.charts.radar) this.charts.radar.destroy();
        const ctx = document.getElementById('domainsChart').getContext('2d');
        this.charts.radar = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Work', 'Fin', 'Soc', 'Edu', 'Health'],
                datasets: [{
                    data: data,
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10b981',
                    pointBackgroundColor: '#10b981'
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255,255,255,0.1)' },
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        pointLabels: { color: '#94a3b8', font: { size: 10 } },
                        ticks: { display: false, backdropColor: 'transparent' }
                    }
                }
            }
        });
    },

    renderStories: function(stories) {
        // 1. Spline Area Chart (Sleep vs Prod)
        if(this.charts.s1) this.charts.s1.destroy();
        const ctx1 = document.getElementById('chartStory1').getContext('2d');
        const grad1 = ctx1.createLinearGradient(0,0,0,300);
        grad1.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
        grad1.addColorStop(1, 'rgba(16, 185, 129, 0)');

        this.charts.s1 = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: stories.story1.labels,
                datasets: [{
                    data: stories.story1.values,
                    borderColor: '#10b981',
                    borderWidth: 3,
                    backgroundColor: grad1,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: false },
                scales: { x: { display: false }, y: { display: false } },
                layout: { padding: 0 }
            }
        });

        // 2. Bar Chart (Blue/Purple)
        if(this.charts.s2) this.charts.s2.destroy();
        const ctx2 = document.getElementById('chartStory2').getContext('2d');
        this.charts.s2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: stories.story2.labels,
                datasets: [{
                    data: stories.story2.values,
                    backgroundColor: '#6366f1',
                    borderRadius: 4,
                    barThickness: 20
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: false },
                scales: { x: { display: false }, y: { display: false } }
            }
        });

        // 3. Doughnut Forecast
        if(this.charts.s3) this.charts.s3.destroy();
        const ctx3 = document.getElementById('chartStory3').getContext('2d');
        this.charts.s3 = new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['Likely', 'Unlikely'],
                datasets: [{
                    data: [88, 12],
                    backgroundColor: ['#10b981', 'rgba(255,255,255,0.05)'],
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '75%',
                plugins: { legend: false },
                layout: { padding: 20 }
            }
        });
    },

    renderProjects: function(projs) {
        const c = document.getElementById('projects-container');
        if(c.innerHTML !== "") return;
        c.innerHTML = projs.map(p => `<div class="card"><h3 style="color:#fff">${p.title}</h3><p style="color:#94a3b8">${p.desc}</p></div>`).join('');
    }
};

document.addEventListener('DOMContentLoaded', () => UI.init());
