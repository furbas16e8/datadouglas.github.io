/*
 * components/SidebarProfile.jsx - Sidebar com perfil do usuário
 * Douglas Furbino - Economista e Cientista de Dados
 */

const SidebarProfile = ({ isDarkMode }) => (
  <aside className="hidden lg:block fixed left-[max(0px,calc(50%-650px))] top-16 w-[280px] h-[calc(100vh-64px)] overflow-y-auto no-scrollbar py-6 px-4">
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
            className="size-24 rounded-full border-[4px] bg-cover bg-center shadow-lg"
            role="img"
            aria-label="Foto de perfil de Douglas Furbino"
            style={{ 
              borderColor: 'var(--surface)',
              backgroundImage: "url('./assets/img/perfil.jpeg')"
            }}
          ></div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold leading-tight flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
            Douglas Furbino
          </h2>
          <p className="text-[13px] font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Economista e Cientista de Dados
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            Governador Valadares, MG
          </div>
          <p 
            className="text-xs font-body leading-relaxed border-t pt-3"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
          >
            Machine Learning Engineer passionate about turning complex data into actionable insights.
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
                <div className="text-sm font-bold font-mono group-hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-main)' }}>
                  {stat.value}
                </div>
                <div className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        
        {/* Social Buttons */}
        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-3" style={{ borderColor: 'var(--border)' }}>
          <a 
            href="https://github.com/furbas16e8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-1.5 px-4 bg-[#24292e] border border-[#444c56] rounded-md hover:bg-[#2f363d] transition-all h-[34px]"
          >
            <svg className="size-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-[13px] font-semibold text-white">GitHub</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/dfurbino/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-1.5 px-4 border rounded-md transition-all h-[34px]"
            style={{ 
              backgroundColor: 'rgba(10,102,194,0.05)',
              borderColor: 'rgba(10,102,194,0.2)'
            }}
          >
            <svg className="size-5 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
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
