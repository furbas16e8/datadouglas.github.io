/*
 * components/SidebarAnalytics.jsx - Sidebar com cards de analytics
 * Douglas Furbino - Economista e Cientista de Dados
 */

const SidebarAnalytics = ({ isDarkMode }) => (
  <aside 
    className={[
      // Visibilidade / Responsividade
      "hidden xl:block",
      // Posicionamento
      "fixed right-[max(0px,calc(50%-680px))] top-16",
      // Dimensões
      "w-[370px] h-[calc(100vh-64px)]",
      // Scroll
      "overflow-y-auto no-scrollbar",
      // Espaçamento interno
      "py-6 px-3"
    ].join(" ")}
  >
    <div className="flex flex-col gap-4">
    {/* Life Analytics */}
    <div className="card p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--primary)' }}>Life Analytics</h3>
        <button style={{ color: 'var(--text-muted)' }} aria-label="Informações sobre Life Analytics">
          <span className="material-symbols-outlined text-[16px]">info</span>
        </button>
      </div>
      <div className="mb-0">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>YOUTUBE ACTIVITY</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>2.5M+</span>
            <span className="text-[10px] text-green-500 font-medium">▲ 12%</span>
          </div>
        </div>
        <div 
          className={[
            // Dimensões
            "h-28 w-full",
            // Posicionamento
            "relative",
            // Forma
            "rounded overflow-hidden",
            // Visual
            "shadow-inner"
          ].join(" ")}
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(18,18,18,0.8)' : '#f9fafb',
            border: '1px solid var(--border)'
          }}
        >
          <svg className="absolute inset-0 w-full h-full overflow-visible z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,100 L0,70 Q25,60 50,65 T100,60 L100,100 Z" fill="#ef4444" opacity={isDarkMode ? "0.1" : "0.05"}></path>
            <path d="M0,70 Q25,60 50,65 T100,60" fill="none" stroke="#ef4444" strokeWidth="1.5"></path>
            <path d="M0,70 Q25,60 50,65 T100,60 L100,45 Q75,40 50,45 T0,55 Z" fill={isDarkMode ? "#22c55e" : "#10b981"} opacity={isDarkMode ? "0.1" : "0.05"}></path>
            <path d="M0,55 Q25,45 50,45 T100,45" fill="none" stroke={isDarkMode ? "#22c55e" : "#10b981"} strokeWidth="1.5"></path>
            <path d="M0,55 Q25,45 50,45 T100,45 L100,20 Q75,15 50,25 T0,35 Z" fill="#3b82f6" opacity={isDarkMode ? "0.1" : "0.05"}></path>
            <path d="M0,35 Q25,25 50,25 T100,20" fill="none" stroke="#3b82f6" strokeWidth="1.5"></path>
          </svg>
          <div 
            className={[
              // Posicionamento
              "absolute top-2 right-2 z-20",
              // Layout
              "flex flex-col gap-1 items-end",
              // Espaçamento e forma
              "p-1.5 rounded",
              // Visual
              "backdrop-blur-sm shadow-sm"
            ].join(" ")}
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(26,26,30,0.8)' : 'rgba(255,255,255,0.9)',
              border: '1px solid var(--border)'
            }}
          >
            {[
              { color: '#3b82f6', label: 'Normal' },
              { color: '#22c55e', label: 'Shorts' },
              { color: '#ef4444', label: 'Music' }
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div 
                  className="size-1.5 rounded-full"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: isDarkMode ? `0 0 8px ${color}` : 'none'
                  }}
                ></div>
                <span className="text-[9px] font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Screen Time */}
    <div className="card p-5">
      <div className="flex justify-between items-end mb-3">
        <span className="text-[10px] font-medium tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>SCREEN TIME INTENSITY</span>
      </div>
      <div 
        className={[
          // Dimensões
          "h-32 w-full",
          // Forma
          "rounded",
          // Posicionamento
          "relative overflow-hidden",
          // Layout
          "flex items-center justify-center"
        ].join(" ")}
        style={{ 
          backgroundColor: isDarkMode ? 'var(--bg)' : '#f9fafb',
          border: '1px solid var(--border)'
        }}
      >
        <div 
          className={[
            // Posicionamento
            "absolute bottom-[20%] left-[20%]",
            // Dimensões e forma
            "size-14 rounded-full border",
            // Layout
            "flex flex-col items-center justify-center",
            // Interação
            "cursor-pointer",
            // Sombra condicional
            isDarkMode ? 'shadow-neon-blue' : 'shadow-sm'
          ].join(" ")}
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(59,130,246,0.1)' : '#dbeafe',
            borderColor: isDarkMode ? 'rgba(59,130,246,0.5)' : '#bfdbfe',
            color: isDarkMode ? '#60a5fa' : '#1d4ed8'
          }}
        >
          <span className="text-[9px] font-bold">Code</span>
          <span className="text-[7px]" style={{ opacity: 0.8 }}>6h 12m</span>
        </div>
        
        <div 
          className={[
            // Posicionamento
            "absolute top-[15%] right-[20%]",
            // Dimensões e forma
            "size-16 rounded-full border",
            // Layout
            "flex flex-col items-center justify-center",
            // Interação
            "cursor-pointer",
            // Sombra condicional
            isDarkMode ? 'shadow-neon-purple' : 'shadow-sm'
          ].join(" ")}
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(139,92,246,0.1)' : '#ede9fe',
            borderColor: isDarkMode ? 'rgba(139,92,246,0.5)' : '#c4b5fd',
            color: isDarkMode ? '#a78bfa' : '#6d28d9'
          }}
        >
          <span className="text-[10px] font-bold">Social</span>
          <span className="text-[7px]" style={{ opacity: 0.8 }}>3h 45m</span>
        </div>

        <div 
          className={[
            // Posicionamento
            "absolute bottom-[10%] right-[35%]",
            // Dimensões e forma
            "size-10 rounded-full border",
            // Layout
            "flex items-center justify-center",
            // Interação
            "cursor-pointer",
            // Sombra condicional
            isDarkMode ? 'shadow-neon-green' : 'shadow-sm'
          ].join(" ")}
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(34,197,94,0.1)' : '#dcfce7',
            borderColor: isDarkMode ? 'rgba(34,197,94,0.5)' : '#86efac',
            color: isDarkMode ? '#4ade80' : '#15803d'
          }}
        >
          <span className="text-[8px] font-bold">Media</span>
        </div>
      </div>
    </div>

    {/* Trending */}
    <div 
      className={[
        // Base
        "card p-4",
        // Layout
        "flex items-center justify-between",
        // Interação
        "group cursor-pointer",
        // Hover
        "hover:border-[var(--primary)]/50 transition-colors"
      ].join(" ")}
    >
      <div>
        <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--text-muted)' }}>Trending</div>
        <div 
          className={[
            // Tipografia
            "text-sm font-bold mt-0.5",
            // Interação
            "group-hover:text-[var(--primary)] transition-colors"
          ].join(" ")} 
          style={{ color: 'var(--text-main)' }}
        >
          Global AI Index
        </div>
      </div>
      <span className="material-symbols-outlined group-hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-muted)' }}>show_chart</span>
    </div>
    </div>
  </aside>
);
