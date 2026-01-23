/*
 * components/SidebarAnalytics.jsx - Sidebar com cards de analytics
 * Douglas Furbino - Economista e Cientista de Dados
 * 
 * Atualizado: 2026-01-22 - Gráfico Chart.js interativo com dados reais
 */

// Componente do Gráfico de Vida
const LifeAnalyticsChart = ({ isDarkMode }) => {
  const [period, setPeriod] = React.useState('monthly');
  const [category, setCategory] = React.useState('all');
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  // Dados carregados via variável global (evita CORS com file://)
  const lifeData = window.LIFE_ANALYTICS_DATA;

  // Cores das categorias
  const colors = {
    normal: '#3b82f6',   // Azul
    shorts: '#f97316',   // Laranja
    music: '#ef4444',    // Vermelho
    journal: isDarkMode ? '#ffffff' : '#374151'  // Branco/Cinza
  };

  // Labels do dropdown
  const categoryLabels = {
    normal: 'Normal',
    shorts: 'Shorts',
    music: 'Music',
    all: 'Todas'
  };

  // Obter dados baseado no período
  const getData = () => {
    return period === 'weekly' ? lifeData.weekly : lifeData.monthly;
  };

  // Obter correlação baseada na categoria e período
  const getCorrelation = () => {
    const correlations = period === 'weekly' 
      ? lifeData.stats.correlation_weekly 
      : lifeData.stats.correlation_monthly;
    
    const key = category === 'all' ? 'journal_vs_total' : `journal_vs_${category}`;
    return correlations[key];
  };

  // Construir datasets para o gráfico
  const buildDatasets = () => {
    const data = getData();
    const datasets = [];

    if (category === 'all') {
      // Mostrar todas as 4 linhas
      datasets.push({
        label: 'Normal',
        data: data.map(d => d.normal.normalized),
        borderColor: colors.normal,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
      datasets.push({
        label: 'Shorts',
        data: data.map(d => d.shorts.normalized),
        borderColor: colors.shorts,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
      datasets.push({
        label: 'Music',
        data: data.map(d => d.music.normalized),
        borderColor: colors.music,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
    } else {
      // Mostrar apenas a categoria selecionada
      datasets.push({
        label: categoryLabels[category],
        data: data.map(d => d[category].normalized),
        borderColor: colors[category],
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
    }

    // Sempre adicionar Journal
    datasets.push({
      label: 'Journal',
      data: data.map(d => d.journal.normalized),
      borderColor: colors.journal,
      backgroundColor: 'transparent',
      tension: 0.4,
      pointRadius: 0,
      borderDash: [5, 5]  // Linha tracejada para diferenciar
    });

    return datasets;
  };

  // Inicializar/Atualizar gráfico
  React.useEffect(() => {
    if (!chartRef.current || !lifeData) return;

    const ctx = chartRef.current.getContext('2d');
    const data = getData();

    // Destruir gráfico anterior se existir
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Criar novo gráfico
    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.label),
        datasets: buildDatasets()
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: isDarkMode ? 'rgba(26,26,30,0.9)' : 'rgba(255,255,255,0.9)',
            titleColor: isDarkMode ? '#fff' : '#111',
            bodyColor: isDarkMode ? '#ccc' : '#333',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const dataIndex = context.dataIndex;
                const datasetLabel = context.dataset.label.toLowerCase();
                const rawData = getData()[dataIndex];
                
                // Obter valor raw
                let rawValue;
                if (datasetLabel === 'journal') {
                  rawValue = rawData.journal.raw;
                } else if (datasetLabel === 'normal') {
                  rawValue = rawData.normal.raw;
                } else if (datasetLabel === 'shorts') {
                  rawValue = rawData.shorts.raw;
                } else if (datasetLabel === 'music') {
                  rawValue = rawData.music.raw;
                }
                
                return `${context.dataset.label}: ${rawValue} (${context.parsed.y.toFixed(1)}%)`;
              }
            }
          }
        },
        scales: {
          x: { display: false },
          y: { 
            display: false,
            min: 0,
            max: 100
          }
        },
        elements: {
          line: { borderWidth: 2 }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [period, category, isDarkMode, lifeData]);

  // Fechar dropdown ao clicar fora
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest('.category-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--primary)' }}>Life Analytics</h3>
        <button style={{ color: 'var(--text-muted)' }} aria-label="Informações sobre Life Analytics">
          <span className="material-symbols-outlined text-[16px]">info</span>
        </button>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between mb-3">
        {/* Dropdown de Categoria */}
        <div className="category-dropdown relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors"
            style={{
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)'
            }}
          >
            <span>{categoryLabels[category]}</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
          
          {dropdownOpen && (
            <div 
              className="absolute top-full left-0 mt-1 py-1 rounded shadow-lg z-50 min-w-[100px]"
              style={{
                backgroundColor: isDarkMode ? '#1a1a1e' : '#fff',
                border: '1px solid var(--border)'
              }}
            >
              {['normal', 'shorts', 'music', 'all'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-[11px] transition-colors hover:bg-[var(--primary)]/10"
                  style={{
                    color: category === cat ? 'var(--primary)' : 'var(--text-secondary)'
                  }}
                >
                  {category === cat && <span className="mr-1">✓</span>}
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Toggle de Período */}
        <div 
          className="flex rounded overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          {['weekly', 'monthly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-2 py-1 text-[10px] font-medium transition-colors"
              style={{
                backgroundColor: period === p 
                  ? (isDarkMode ? 'var(--primary)' : 'var(--primary)') 
                  : 'transparent',
                color: period === p 
                  ? '#fff' 
                  : 'var(--text-muted)'
              }}
            >
              {p === 'weekly' ? 'Semanal' : 'Mensal'}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico */}
      <div 
        className="h-28 w-full relative rounded overflow-hidden"
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(18,18,18,0.8)' : '#f9fafb',
          border: '1px solid var(--border)'
        }}
      >
        <canvas ref={chartRef}></canvas>
        
        {/* Legenda (quando "Todas" selecionado) */}
        {category === 'all' && (
          <div 
            className="absolute top-2 right-2 z-20 flex flex-col gap-1 items-end p-1.5 rounded backdrop-blur-sm shadow-sm"
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(26,26,30,0.8)' : 'rgba(255,255,255,0.9)',
              border: '1px solid var(--border)'
            }}
          >
            {[
              { color: colors.normal, label: 'Normal' },
              { color: colors.shorts, label: 'Shorts' },
              { color: colors.music, label: 'Music' },
              { color: colors.journal, label: 'Journal', dashed: true }
            ].map(({ color, label, dashed }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div 
                  className="w-3 h-0.5 rounded-full"
                  style={{ 
                    backgroundColor: color,
                    border: dashed ? `1px dashed ${color}` : 'none',
                    boxShadow: isDarkMode ? `0 0 8px ${color}` : 'none'
                  }}
                ></div>
                <span className="text-[9px] font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Correlação */}
      <div className="mt-2 flex items-center gap-1">
        <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
          Correlação (Pearson):
        </span>
        <span 
          className="text-[11px] font-bold"
          style={{ 
            color: getCorrelation() > 0.3 
              ? '#22c55e' 
              : getCorrelation() < -0.3 
                ? '#ef4444' 
                : 'var(--text-secondary)'
          }}
        >
          {getCorrelation().toFixed(3)}
        </span>
      </div>
    </div>
  );
};

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
    {/* Life Analytics - Componente Interativo */}
    <LifeAnalyticsChart isDarkMode={isDarkMode} />

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
