/**
 * main-13.js
 * Logic for v13 Dashboard (Stacked Analytics)
 */

const Engine = {
    // Shared Data
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    forecastData: [7.5, 8.2, 6.8, 9.0, 8.5, 4.2, 5.5],
    focusData: [4, 6, 8, 7, 6, 2, 3],
    
    biasesData: {
        labels: ['Sunk Cost', 'Confirmation', 'Anchoring', 'Halo Effort'],
        values: [20, 75, 45, 60]
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
        { n: "Deep Work Block", i: "laptop-outline" },
        { n: "Leitura (30min)", i: "book-outline" },
        { n: "Treino de Força", i: "barbell-outline" },
        { n: "Meditação", i: "water-outline" }
    ],

    // --- RENDERERS ---

    initCharts: function() {
        this.renderForecast();
        this.renderFocus();
        this.renderBiases();
        this.renderRadar();
        this.renderHabits();
    },

    renderForecast: function() {
        new Chart(document.getElementById('forecastChart'), {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    data: this.forecastData,
                    borderColor: '#a855f7',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    fill: {target: 'origin', above: 'rgba(168, 85, 247, 0.1)'}
                }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, 
                plugins: {legend:false, tooltip:{mode:'index', intersect:false}}, 
                scales: {
                    x:{display:true, grid:{display:false}, ticks:{color:'#64748b', font:{size:10}}}, 
                    y:{display:true, grid:{color:'rgba(255,255,255,0.05)'}, min:0, max:10, ticks:{display:false}}
                },
                layout: { padding: { top: 20, bottom: 0, left: 0, right: 0 } }
            }
        });
    },

    renderFocus: function() {
        new Chart(document.getElementById('focusChart'), {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [{
                    data: this.focusData,
                    backgroundColor: '#10b981',
                    borderRadius: 4,
                    barThickness: 20
                }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, 
                plugins: {legend:false}, 
                scales: {
                    x:{display:true, grid:{display:false}, ticks:{color:'#64748b', font:{size:10}}}, 
                    y:{display:false}
                } 
            }
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
                    barThickness: 12
                }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, 
                plugins: {legend:false}, 
                scales: {
                    x:{display:false, max:100}, 
                    y:{grid:{display:false}, ticks:{color:'#94a3b8', font:{size:11}}}
                },
                layout: { padding: {left: -10} } // Tweak to fit
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
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, 
                plugins: {legend:false}, 
                scales: {
                    r: {
                        angleLines:{color:'#334155'}, 
                        grid:{color:'#334155'}, 
                        ticks:{display:false}, 
                        pointLabels:{color:'#94a3b8', font:{size:10}}
                    }
                } 
            }
        });
    },

    renderHabits: function() {
        const c = document.getElementById('habits-list');
        c.innerHTML = this.habits.map(h => `
            <div class="h-item">
                <ion-icon name="${h.i}" class="h-icon"></ion-icon> 
                <span>${h.n}</span>
            </div>
        `).join('');
    }
};

const ProjectCarousel = {
    idx: 0,
    timer: null,
    
    init: function() {
        this.renderSlides();
        this.startLoop();
    },

    renderSlides: function() {
        const c = document.getElementById('project-carousel');
        Engine.projectStories.forEach((p, i) => {
            const div = document.createElement('div');
            div.className = `story-slide ${i===0?'active':''}`;
            div.style.backgroundImage = `url('${p.img}')`;
            div.id = `proj-slide-${i}`;
            c.appendChild(div);
        });
        this.updateInfo(0);
    },

    startLoop: function() {
        const bar = document.getElementById('story-progress');
        let width = 0;
        
        this.timer = setInterval(() => {
            width += 0.5; // Slower
            bar.style.width = width + '%';
            
            if(width >= 100) {
                width = 0;
                this.next();
            }
        }, 50);
    },

    next: function() {
        const total = Engine.projectStories.length;
        let next = this.idx + 1;
        if(next >= total) next = 0;
        
        document.querySelectorAll('.story-slide').forEach(s => s.classList.remove('active'));
        document.getElementById(`proj-slide-${next}`).classList.add('active');
        
        this.updateInfo(next);
        this.idx = next;
    },

    updateInfo: function(idx) {
        const p = Engine.projectStories[idx];
        document.getElementById('story-project-title').innerText = p.title;
        document.getElementById('story-project-desc').innerText = p.desc;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Engine.initCharts();
    ProjectCarousel.init();
});
