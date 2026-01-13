/**
 * main-12.js
 * Logic for v12 Dashboard (2x2 Grid with Biases)
 */

const Engine = {
    analysisData: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        forecast: [7.5, 8.2, 6.8, 9.0, 8.5, 4.2, 5.5],
        focus: [4, 6, 8, 7, 6, 2, 3]
    },

    biasesData: {
        labels: ['Sunk Cost', 'Confirmation', 'Anchoring', 'Halo Effort'],
        values: [20, 75, 45, 60] // Heuristic scores
    },
    
    projectStories: [
        {
            title: "Behavioral Finance Nudges",
            desc: "Sistema de recomendação financeira usando Reinforcement Learning para otimizar poupança.",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "Sentiment Crypto Bot",
            desc: "Bot que analisa twitter e reddit para prever movimentos de mercado com NLP.",
            img: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "Life Tracker ETL",
            desc: "Pipeline de dados pessoais unificando saúde, finanças e produtividade.",
            img: "assets/img/study-setup.jpg" // Local fallback
        }
    ],

    habits: [
        { n: "Deep Work", i: "laptop" },
        { n: "Leitura", i: "book" },
        { n: "Treino", i: "barbell" },
        { n: "Meditação", i: "water" }
    ],

    // --- RENDERERS ---

    renderAnalysis: function() {
        const container = document.getElementById('analysis-carousel-container');
        
        // Slide 1: Line Chart
        const s1 = document.createElement('div'); s1.className = 'chart-slide active'; s1.id = 'slide-analysis-0';
        s1.innerHTML = '<div class="chart-canvas-container"><canvas id="c1"></canvas></div>';
        container.appendChild(s1);

        // Slide 2: Bar Chart
        const s2 = document.createElement('div'); s2.className = 'chart-slide'; s2.id = 'slide-analysis-1';
        s2.innerHTML = '<div class="chart-canvas-container"><canvas id="c2"></canvas></div>';
        container.appendChild(s2);

        this.initMainCharts();
    },

    initMainCharts: function() {
        // C1
        new Chart(document.getElementById('c1'), {
            type: 'line',
            data: {
                labels: this.analysisData.labels,
                datasets: [{
                    data: this.analysisData.forecast,
                    borderColor: '#a855f7',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    fill: {target: 'origin', above: 'rgba(168, 85, 247, 0.1)'}
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: {legend:false}, scales: {x:{display:true, grid:{color:'rgba(255,255,255,0.05)'}}, y:{display:true, grid:{color:'rgba(255,255,255,0.05)'}, min:0, max:10}} }
        });

        // C2
        new Chart(document.getElementById('c2'), {
            type: 'bar',
            data: {
                labels: this.analysisData.labels,
                datasets: [{
                    data: this.analysisData.focus,
                    backgroundColor: '#10b981',
                    borderRadius: 6
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: {legend:false}, scales: {x:{display:true}, y:{display:false}} }
        });
    },

    renderBiases: function() {
        new Chart(document.getElementById('biasesChart'), {
            type: 'bar',
            indexAxis: 'y', // Horizontal
            data: {
                labels: this.biasesData.labels,
                datasets: [{
                    data: this.biasesData.values,
                    backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'],
                    borderRadius: 4,
                    barThickness: 15
                }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, 
                plugins: {legend:false}, 
                scales: {
                    x:{display:false, max:100}, 
                    y:{grid:{display:false}, ticks:{color:'#94a3b8', font:{size:11}}}
                } 
            }
        });
    },

    renderRadar: function() {
        new Chart(document.getElementById('radarChart'), {
            type: 'radar',
            data: {
                labels: ['Work', 'Fin', 'Soc', 'Edu', 'Hth'],
                datasets: [{
                    data: [90, 80, 60, 95, 85],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10b981',
                    pointRadius: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: {legend:false}, scales: {r:{angleLines:{color:'#334155'}, grid:{color:'#334155'}, ticks:{display:false}, pointLabels:{color:'#94a3b8', font:{size:10}}}} }
        });
    },

    renderMonthlyHeatmap: function() {
        const c = document.getElementById('heatmap-grid-monthly');
        const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        let html = '';
        
        // Headers
        days.forEach(d => {
            html += `<div class="day-label">${d}</div>`;
        });

        // 30 Days (random intensity)
        for(let i=0; i<30; i++) {
            const l = Math.random() > 0.6 ? 2 : (Math.random() > 0.3 ? 1 : 0);
            html += `<div class="m-cell l${l}" title="Day ${30-i}"></div>`;
        }
        c.innerHTML = html;
    },

    renderHabits: function() {
        const c = document.getElementById('habits-list');
        c.innerHTML = this.habits.map(h => `<div class="h-item"><ion-icon name="${h.i}" class="h-icon"></ion-icon> ${h.n}</div>`).join('');
    }
};

const Carousel = {
    analysisIdx: 0,
    projectIdx: 0,
    projTimer: null,
    
    init: function() {
        // Analysis Switcher (Every 5s)
        setInterval(() => {
            this.analysisIdx = this.analysisIdx === 0 ? 1 : 0;
            document.querySelectorAll('.chart-slide').forEach(s => s.classList.remove('active'));
            document.getElementById(`slide-analysis-${this.analysisIdx}`).classList.add('active');
            
            const title = this.analysisIdx === 1 ? "Foco Real vs Meta" : "Forecast de Produtividade";
            document.getElementById('analysis-title').innerText = title;
        }, 5000);

        // Project Carousel Setup
        this.renderProjectSlides();
        this.startProjectLoop();
    },

    renderProjectSlides: function() {
        const c = document.getElementById('project-carousel');
        Engine.projectStories.forEach((p, i) => {
            const div = document.createElement('div');
            div.className = `story-slide ${i===0?'active':''}`;
            div.style.backgroundImage = `url('${p.img}')`;
            div.id = `proj-slide-${i}`;
            c.appendChild(div);
        });
        this.updateProjectInfo(0);
    },

    startProjectLoop: function() {
        const bar = document.getElementById('story-progress');
        let width = 0;
        
        this.projTimer = setInterval(() => {
            width += 1;
            bar.style.width = width + '%';
            
            if(width >= 100) {
                width = 0;
                this.nextProject();
            }
        }, 60);
    },

    nextProject: function() {
        const total = Engine.projectStories.length;
        let next = this.projectIdx + 1;
        if(next >= total) next = 0;
        
        document.querySelectorAll('.story-slide').forEach(s => s.classList.remove('active'));
        document.getElementById(`proj-slide-${next}`).classList.add('active');
        
        this.updateProjectInfo(next);
        this.projectIdx = next;
    },

    updateProjectInfo: function(idx) {
        const p = Engine.projectStories[idx];
        document.getElementById('story-project-title').innerText = p.title;
        document.getElementById('story-project-desc').innerText = p.desc;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Engine.renderAnalysis();
    Engine.renderBiases();
    Engine.renderRadar();
    Engine.renderMonthlyHeatmap();
    Engine.renderHabits();
    Carousel.init();
});
