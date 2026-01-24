/*
 * pages/Projects.jsx - Página de projetos
 * Douglas Furbino - Economista e Cientista de Dados
 */

const Projects = ({ isDarkMode }) => {
  const projects = [
    {
      title: 'Life Analytics',
      description: 'Análise de padrões de consumo de mídia com dados do YouTube e Google Search.',
      tags: ['Python', 'Polars', 'ML'],
      status: 'Em desenvolvimento'
    },
    {
      title: 'Predictive Market Model',
      description: 'Modelo LSTM para previsão de volatilidade de criptomoedas.',
      tags: ['Python', 'TensorFlow', 'Time Series'],
      status: 'Concluído'
    },
    {
      title: 'ETL Pipeline Optimizer',
      description: 'Pipeline de dados otimizado usando Polars para processamento 12x mais rápido.',
      tags: ['Python', 'Polars', 'Data Engineering'],
      status: 'Concluído'
    },
    {
      title: 'Multi-Agent RL Research',
      description: 'Pesquisa em aprendizado por reforço em ambientes multi-agente.',
      tags: ['Python', 'PyTorch', 'RL', 'Research'],
      status: 'Em desenvolvimento'
    }
  ];

  return (
    <div 
      className={[
        // Container
        "max-w-[720px] mx-auto", 
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
          Projects
        </h2>
        <p 
          className="text-sm" 
          style={{ color: 'var(--text-secondary)' }}
        >
          Uma seleção dos meus projetos de Data Science e Machine Learning.
        </p>
      </div>
      
      {/* Lista de Projetos */}
      <div className="flex flex-col gap-4">
        {projects.map((project, i) => (
          <article 
            key={i}
            className={[
              // Base
              "card p-5",
              // Interação
              "hover:border-[var(--primary)]/50 transition-colors cursor-pointer"
            ].join(" ")}
          >
            {/* Header do Card */}
            <div className="flex justify-between items-start mb-2">
              <h3 
                className="text-lg font-bold" 
                style={{ color: 'var(--text-main)' }}
              >
                {project.title}
              </h3>
              <span 
                className={[
                  // Tipografia
                  "text-[10px] font-medium",
                  // Espaçamento
                  "px-2 py-1",
                  // Forma
                  "rounded-full",
                  // Cores condicionais
                  project.status === 'Concluído' 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                ].join(" ")}
              >
                {project.status}
              </span>
            </div>
            
            {/* Descrição */}
            <p 
              className="text-sm mb-4" 
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, j) => (
                <span 
                  key={j}
                  className={[
                    // Tipografia
                    "text-[10px] font-medium",
                    // Espaçamento
                    "px-2 py-1",
                    // Forma
                    "rounded"
                  ].join(" ")}
                  style={{ 
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
