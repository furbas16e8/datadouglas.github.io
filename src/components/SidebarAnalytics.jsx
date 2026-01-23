/*
 * components/SidebarAnalytics.jsx - Sidebar com cards de analytics
 * Douglas Furbino - Economista e Cientista de Dados
 * 
 * Atualizado: 2026-01-23 - Refatoração visual: botões toggle, eixos, correlação em lista
 */

// Componente do Gráfico de Vida
const LifeAnalyticsChart = ({ isDarkMode }) => {
  const [period, setPeriod] = React.useState('monthly');
  const [activeCategories, setActiveCategories] = React.useState({
    normal: true,
    shorts: true,
    music: true
  });
  const [showTooltip, setShowTooltip] = React.useState(false);
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

  // Toggle categoria
  const toggleCategory = (cat) => {
    setActiveCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  // Obter dados baseado no período
  const getData = () => {
    return period === 'weekly' ? lifeData.weekly : lifeData.monthly;
  };

  // Formatar label para "Out.24"
  const formatLabel = (label) => {
    // Label mensal: "Out/2024" -> "Out.24"
    // Label semanal: "S42/2024" -> manter ou converter
    if (label.includes('/')) {
      const parts = label.split('/');
      if (parts[0].startsWith('S')) {
        // Semanal: "S42/2024" -> "S42"
        return parts[0];
      } else {
        // Mensal: "Out/2024" -> "Out.24"
        const month = parts[0];
        const year = parts[1].slice(-2);
        return `${month}.${year}`;
      }
    }
    return label;
  };

  // Obter correlações das categorias ativas
  const getCorrelations = () => {
    const correlations = period === 'weekly' 
      ? lifeData.stats.correlation_weekly 
      : lifeData.stats.correlation_monthly;
    
    const active = [];
    if (activeCategories.normal) active.push(`Normal: ${correlations.journal_vs_normal.toFixed(2)}`);
    if (activeCategories.shorts) active.push(`Shorts: ${correlations.journal_vs_shorts.toFixed(2)}`);
    if (activeCategories.music) active.push(`Music: ${correlations.journal_vs_music.toFixed(2)}`);
    
    return active.length > 0 ? active.join(' | ') : '—';
  };

  // Construir datasets para o gráfico
  const buildDatasets = () => {
    const data = getData();
    const datasets = [];

    // Adicionar categorias ativas
    if (activeCategories.normal) {
      datasets.push({
        label: 'Normal',
        data: data.map(d => d.normal.normalized),
        borderColor: colors.normal,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
    }
    if (activeCategories.shorts) {
      datasets.push({
        label: 'Shorts',
        data: data.map(d => d.shorts.normalized),
        borderColor: colors.shorts,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
    }
    if (activeCategories.music) {
      datasets.push({
        label: 'Music',
        data: data.map(d => d.music.normalized),
        borderColor: colors.music,
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
      borderDash: [5, 5]
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
        labels: data.map(d => formatLabel(d.label)),
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
          x: { 
            display: true,
            ticks: {
              font: { size: 8 },
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6
            },
            grid: { display: false }
          },
          y: { 
            display: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 50,
              font: { size: 8 },
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              callback: (value) => value + '%'
            },
            grid: { 
              color: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
            }
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
  }, [period, activeCategories, isDarkMode, lifeData]);

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--primary)' }}>Life Analytics</h3>
        <div className="relative">
          <button 
            style={{ color: 'var(--text-muted)' }} 
            aria-label="Informações sobre Life Analytics"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <span className="material-symbols-outlined text-[16px]">info</span>
          </button>
          {showTooltip && (
            <div 
              className="absolute right-0 top-full mt-1 p-2 rounded shadow-lg z-50 w-48 text-[9px]"
              style={{
                backgroundColor: isDarkMode ? '#1a1a1e' : '#fff',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)'
              }}
            >
              Correlação de Pearson entre variáveis: journaling (registros) e consumo de mídia (visualizações normalizadas via Min-Max).
            </div>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between mb-3">
        {/* Botões de Categoria */}
        <div className="flex rounded overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {['normal', 'shorts', 'music'].map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="px-2 py-1 text-[10px] font-medium transition-colors capitalize"
              style={{
                backgroundColor: activeCategories[cat] ? colors[cat] : 'transparent',
                color: activeCategories[cat] ? '#fff' : 'var(--text-muted)'
              }}
            >
              {cat === 'normal' ? 'Normal' : cat === 'shorts' ? 'Shorts' : 'Music'}
            </button>
          ))}
        </div>

        {/* Toggle de Período */}
        <div className="flex rounded overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {['weekly', 'monthly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-2 py-1 text-[10px] font-medium transition-colors"
              style={{
                backgroundColor: period === p ? 'var(--primary)' : 'transparent',
                color: period === p ? '#fff' : 'var(--text-muted)'
              }}
            >
              {p === 'weekly' ? 'Semanal' : 'Mensal'}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico */}
      <div 
        className="h-32 w-full relative rounded overflow-hidden"
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(18,18,18,0.8)' : '#f9fafb',
          border: '1px solid var(--border)'
        }}
      >
        <canvas ref={chartRef}></canvas>
      </div>

      {/* Correlação */}
      <div className="mt-2">
        <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
          Correlação (Pearson):
        </span>
        <div className="text-[10px] font-bold mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {getCorrelations()}
        </div>
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
