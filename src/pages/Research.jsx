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
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>Research</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Publicações acadêmicas e pesquisas em andamento.
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        {papers.map((paper, i) => (
          <article 
            key={i}
            className="card p-5 hover:border-[var(--primary)]/50 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div 
                className="flex items-center justify-center size-10 rounded shrink-0"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(239,68,68,0.1)' : '#fef2f2',
                  border: isDarkMode ? '1px solid rgba(239,68,68,0.2)' : '1px solid #fecaca',
                  color: '#ef4444'
                }}
              >
                <span className="material-symbols-outlined">description</span>
              </div>
              <div>
                <h3 className="text-base font-bold leading-tight mb-1" style={{ color: 'var(--text-main)' }}>
                  {paper.title}
                </h3>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>{paper.venue}</span>
                  <span>•</span>
                  <span>{paper.year}</span>
                </div>
              </div>
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              {paper.abstract}
            </p>
            <a 
              href={paper.link}
              className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
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
