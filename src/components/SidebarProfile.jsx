/*
 * components/SidebarProfile.jsx - Sidebar com perfil do usuário
 * Douglas Furbino - Economista e Cientista de Dados
 */

const SidebarProfile = ({ isDarkMode }) => (
  <aside 
    className={[
      // Visibilidade / Responsividade
      "hidden lg:block",
      // Posicionamento
      "sticky top-16 self-start",
      // Dimensões
      "w-[305px] h-[calc(100vh-64px)]",
      // Scroll
      "overflow-y-auto no-scrollbar",
      // Espaçamento interno
      "py-6 px-3"
    ].join(" ")}
  >
    <div className="flex flex-col gap-4">
    {/* Profile Card */}
    <div className="card overflow-hidden relative group">
      <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        {isDarkMode && <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/90 to-transparent"></div>}
      </div>
      
      <div className="px-4 pb-5">
        <div className="relative -mt-12 mb-3">
          <div 
            className={[
              // Dimensões
              "size-24",
              // Forma e borda
              "rounded-full border-[4px]",
              // Background
              "bg-cover bg-center",
              // Sombra
              "shadow-lg"
            ].join(" ")}
            role="img"
            aria-label="Foto de perfil de Douglas Furbino"
            style={{ 
              borderColor: 'var(--surface)',
              backgroundImage: "url('./assets/img/perfil.jpeg')"
            }}
          ></div>
        </div>
        
        <div>
          <h2 
            className={[
              // Tipografia
              "text-xl font-bold leading-tight",
              // Layout
              "flex items-center gap-1.5"
            ].join(" ")} 
            style={{ color: 'var(--text-main)' }}
          >
            Douglas Furbino
          </h2>
          {/*<p className="text-[13px] font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Economista e Cientista de Dados
          </p>*/}
          <div 
            className={[
              // Layout
              "flex items-center gap-1",
              // Espaçamento
              "mt-2 mb-3",
              // Tipografia
              "text-xs"
            ].join(" ")} 
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="material-symbols-outlined text-[12px]">location_on</span>
            Governador Valadares, MG
          </div>
          <p 
            className="text-xs font-body leading-relaxed border-t pt-3"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
          >
            Economista pela UFJF especializado em Ciência de Dados. Trabalho com modelagem preditiva, desenvolvimento web e automação de fluxos de trabalho.
          </p>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between mt-5 pt-0 px-2 pb-2">
          {[
            { value: '12', label: 'Projects' },
            { value: '450+', label: 'Commits' },
            { value: '8', label: 'Papers' }
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="w-px h-8" style={{ backgroundColor: 'var(--border)' }}></div>}
              <div className="text-center group cursor-default">
                <div 
                  className={[
                    // Tipografia
                    "text-sm font-bold font-mono",
                    // Interação
                    "group-hover:text-[var(--primary)] transition-colors"
                  ].join(" ")} 
                  style={{ color: 'var(--text-main)' }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        
        {/* Social Buttons */}
        <div 
          className={[
            // Espaçamento
            "mt-4 pt-4",
            // Borda
            "border-t",
            // Layout Grid
            "grid grid-cols-2 gap-3"
          ].join(" ")} 
          style={{ borderColor: 'var(--border)' }}
        >
          <a 
            href="https://github.com/furbas16e8" 
            target="_blank" 
            rel="noopener noreferrer"
            className={[
              // Layout
              "flex items-center justify-center gap-2",
              // Espaçamento
              "py-1.5 px-4",
              // Borda e forma
              "border rounded-md",
              // Dimensões
              "h-[34px]",
              // Interação
              "hover:opacity-90 transition-all"
            ].join(" ")}
            style={{ 
              backgroundColor: '#24292e',
              borderColor: '#444c56'
            }}
          >
            <i className="devicon-github-original text-white text-lg"></i>
            <span className="text-[13px] font-semibold text-white">GitHub</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/dfurbino/"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              // Layout
              "flex items-center justify-center gap-2",
              // Espaçamento
              "py-1.5 px-4",
              // Borda e forma
              "border rounded-md",
              // Dimensões
              "h-[34px]",
              // Interação
              "transition-all"
            ].join(" ")}
            style={{ 
              backgroundColor: 'rgba(10,102,194,0.05)',
              borderColor: 'rgba(10,102,194,0.2)'
            }}
          >
            <i className="devicon-linkedin-plain text-[#0a66c2] text-lg"></i>
            <span className="text-[13px] font-semibold text-[#0a66c2]">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
    
    {/* Site Activity */}
    <div className="card p-4 h-[180px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Site Activity
        </span>
      </div>
      <div className="h-full w-full relative">
        <div className="grid grid-rows-7 grid-flow-col gap-[3px] h-[110px]" style={{ opacity: isDarkMode ? 0.7 : 1 }}>
          {ACTIVITY_DATA.map((opacity, i) => (
            <div 
              key={i} 
              className={`activity-dot activity-dot-${opacity}`}
            ></div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex justify-between text-[9px]" style={{ color: 'var(--text-muted)' }}>
        <span>Less</span>
        <div className="flex gap-[2px]">
          {[10, 30, 60, 90].map(o => (
            <div key={o} className={`size-2 rounded-[1px] activity-dot-${o}`} style={{ backgroundColor: 'var(--primary)' }}></div>
          ))}
        </div>
        <span>More</span>
      </div>
      <div className="mt-2 text-[10px] text-center" style={{ color: 'var(--text-muted)' }}>
        © 2026 Doug.DS Portfolio.
      </div>
    </div>
    </div>
  </aside>
);
