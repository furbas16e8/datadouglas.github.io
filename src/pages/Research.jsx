/*
 * pages/Research.jsx - Página de pesquisas e papers
 * Douglas Furbino - Economista e Cientista de Dados
 */

const Research = ({ isDarkMode }) => {
  const papers = [
    {
      title: 'Multi-Agent Reinforcement Learning in Competitive Environments',
      venue: 'arXiv Preprint',
      year: '2026',
      abstract: 'Exploramos estratégias de aprendizado por reforço em ambientes competitivos multi-agente, com aplicações em teoria dos jogos.',
      link: '#'
    },
    {
      title: 'Predicting Cryptocurrency Volatility Using Deep Learning',
      venue: 'Journal of Financial Data Science',
      year: '2025',
      abstract: 'Modelo LSTM para previsão de volatilidade de criptomoedas com 87% de acurácia.',
      link: '#'
    },
    {
      title: 'Efficient Data Pipelines with Lazy Evaluation',
      venue: 'Data Engineering Conference',
      year: '2025',
      abstract: 'Comparação de performance entre Pandas e Polars para pipelines de ETL em larga escala.',
      link: '#'
    }
  ];

  return (
    <div 
      className={[
        // Container
        "max-w-2xl mx-auto",
        // Espaçamento
        "px-4 py-6"
      ].join(" ")}
    >
      {/* Header da Página */}
      <div className="mb-6">
        <h2 
          className="text-2xl font-bold mb-2" 
          style={{ color: 'var(--text-main)' }}
        >
          Research
        </h2>
        <p 
          className="text-sm" 
          style={{ color: 'var(--text-secondary)' }}
        >
          Publicações acadêmicas e pesquisas em andamento.
        </p>
      </div>
      
      {/* Lista de Papers */}
      <div className="flex flex-col gap-4">
        {papers.map((paper, i) => (
          <article 
            key={i}
            className={[
              // Base
              "card p-5",
              // Interação
              "hover:border-[var(--primary)]/50 transition-colors"
            ].join(" ")}
          >
            {/* Header do Paper */}
            <div className="flex items-start gap-3 mb-3">
              {/* Ícone PDF */}
              <div 
                className={[
                  // Layout
                  "flex items-center justify-center",
                  // Dimensões
                  "size-10",
                  // Forma
                  "rounded shrink-0"
                ].join(" ")}
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(239,68,68,0.1)' : '#fef2f2',
                  border: isDarkMode ? '1px solid rgba(239,68,68,0.2)' : '1px solid #fecaca',
                  color: '#ef4444'
                }}
              >
                <span className="material-symbols-outlined">description</span>
              </div>
              
              {/* Info do Paper */}
              <div>
                <h3 
                  className="text-base font-bold leading-tight mb-1" 
                  style={{ color: 'var(--text-main)' }}
                >
                  {paper.title}
                </h3>
                <div 
                  className="flex items-center gap-2 text-xs" 
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span>{paper.venue}</span>
                  <span>•</span>
                  <span>{paper.year}</span>
                </div>
              </div>
            </div>
            
            {/* Abstract */}
            <p 
              className="text-sm mb-3" 
              style={{ color: 'var(--text-secondary)' }}
            >
              {paper.abstract}
            </p>
            
            {/* Link */}
            <a 
              href={paper.link}
              className={[
                // Layout
                "inline-flex items-center gap-1",
                // Tipografia
                "text-xs font-medium",
                // Interação
                "hover:underline"
              ].join(" ")}
              style={{ color: 'var(--primary)' }}
            >
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              Ver paper completo
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};
