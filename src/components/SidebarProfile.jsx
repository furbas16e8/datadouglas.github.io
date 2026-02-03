/*
 * components/SidebarProfile.jsx - Sidebar com perfil do usuário
 * Douglas Furbino - Economista e Cientista de Dados
 */

const { useState, useEffect } = React;

const SidebarProfile = ({ isDarkMode }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca métricas do Supabase
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const supabase = typeof window.getSupabaseClient === 'function' 
          ? window.getSupabaseClient() 
          : null;
        
        if (!supabase) {
          console.warn('Supabase client not available');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('portfolio_metrics')
          .select('*')
          .single();

        if (error) {
          console.error('Error fetching metrics:', error);
        } else if (data) {
          setMetrics(data);
        }
      } catch (err) {
        console.error('Failed to fetch metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Componente Skeleton
  const SkeletonValue = () => (
    <div className="h-5 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
  );

  // Configuração das métricas
  const statsConfig = [
    { key: 'projects', label: 'Projects', value: metrics?.projects ?? '-' },
    { key: 'work_sessions', label: 'Work Sessions', value: metrics?.work_sessions ?? '-' },
    { key: 'streak', label: 'Streak', value: metrics?.streak ?? '-' }
  ];

  return (
    <aside 
      className={[
        "hidden lg:block",
        "sticky top-16 self-start",
        "w-[305px] h-[calc(100vh-64px)]",
        "overflow-y-auto no-scrollbar",
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
              <h2 
                className="text-xl font-bold leading-tight flex items-center gap-1.5"
                style={{ color: 'var(--text-main)' }}
              >
                Douglas Furbino
              </h2>
              
              <div 
                className="flex items-center gap-1 mt-2 mb-3 text-xs"
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
              {statsConfig.map((stat, i) => (
                <React.Fragment key={stat.key}>
                  {i > 0 && <div className="w-px h-8" style={{ backgroundColor: 'var(--border)' }}></div>}
                  <div className="text-center group cursor-default min-w-[60px]">
                    <div 
                      className="text-sm font-bold font-mono group-hover:text-[var(--primary)] transition-colors h-5 flex items-center justify-center"
                      style={{ color: 'var(--text-main)' }}
                    >
                      {loading ? <SkeletonValue /> : stat.value}
                    </div>
                    <div className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            
            {/* Social Buttons */}
            <div 
              className="mt-4 pt-4 border-t grid grid-cols-2 gap-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <a 
                href="https://github.com/furbas16e8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-1.5 px-4 border rounded-md h-[34px] hover:opacity-90 transition-all"
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
                className="flex items-center justify-center gap-2 py-1.5 px-4 border rounded-md h-[34px] transition-all"
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
};
