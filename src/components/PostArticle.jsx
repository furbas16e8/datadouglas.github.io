/*
 * components/PostArticle.jsx - Card de post/artigo do feed
 * Douglas Furbino - Economista e Cientista de Dados
 */

const PostArticle = ({ isDarkMode, title, time, category, content, contentExpanded, chart, code, codeAlt, codeFileName, codeAltFileName, codeLink, attachment }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
  <article 
    className={[
      // Espaçamento
      "p-5",
      // Borda
      "border-b sm:border sm:rounded-lg",
      // Interação
      "hover:border-[var(--border-hover)] transition-colors"
    ].join(" ")}
    style={{ 
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)'
    }}
  >
    {/* Header do Post */}
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>{title}</h4>
      <button 
        style={{ color: 'var(--text-muted)' }} 
        className="hover:text-[var(--text-main)]" 
        aria-label="Mais opções"
      >
        <span className="material-symbols-outlined">more_horiz</span>
      </button>
    </div>
    
    {/* Metadata */}
    <div className="flex items-center gap-2 mb-4 text-xs">
      <span style={{ color: 'var(--text-muted)' }}>{time}</span>
      <span style={{ color: 'var(--border)' }}>•</span>
      <span 
        className="cursor-pointer hover:underline font-medium" 
        style={{ color: 'var(--primary)' }}
      >
        {category}
      </span>
    </div>
    
    {/* Conteúdo */}
    <div className="mb-4">
      <p 
        className="text-sm font-body leading-relaxed" 
        style={{ color: 'var(--text-secondary)' }}
      >
        {content}
        {contentExpanded && !isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className={[
              // Layout
              "inline-flex items-center gap-0.5",
              // Tipografia
              "font-medium text-xs",
              // Espaçamento
              "ml-1",
              // Interação
              "transition-colors hover:underline"
            ].join(" ")} 
            style={{ color: 'var(--primary)' }}
          >
            Ver mais
          </button>
        )}
        {contentExpanded && isExpanded && (
          <>
            {' '}{contentExpanded}
            <button 
              onClick={() => setIsExpanded(false)}
              className={[
                // Layout
                "inline-flex items-center gap-0.5",
                // Tipografia
                "font-medium text-xs",
                // Espaçamento
                "ml-1",
                // Interação
                "transition-colors hover:underline"
              ].join(" ")} 
              style={{ color: 'var(--primary)' }}
            >
              Ver menos
            </button>
          </>
        )}
        {!contentExpanded && (
          <button 
            className={[
              // Layout
              "inline-flex items-center gap-0.5",
              // Tipografia
              "font-medium text-xs",
              // Espaçamento
              "ml-1",
              // Interação
              "transition-colors hover:underline"
            ].join(" ")} 
            style={{ color: 'var(--primary)' }}
          >
            Ver mais
          </button>
        )}
      </p>
    </div>
    
    {/* Chart visualization */}
    {chart && (
      <div 
        className={[
          // Posicionamento
          "relative",
          // Dimensões
          "w-full h-48",
          // Forma
          "rounded",
          // Espaçamento
          "mb-4",
          // Visual
          "overflow-hidden",
          // Interação
          "group"
        ].join(" ")}
        style={{ 
          backgroundColor: isDarkMode ? 'var(--surface)' : '#f9fafb',
          border: '1px solid var(--border)'
        }}
      >
        <div className="absolute top-3 left-3 z-10">
          <span 
            className="text-[10px] uppercase tracking-widest font-bold" 
            style={{ color: 'var(--text-muted)' }}
          >
            Model Performance
          </span>
        </div>
        <div 
          className={[
            // Layout
            "flex items-end justify-between",
            // Espaçamento
            "px-4 pb-0 pt-8",
            // Dimensões
            "h-full w-full",
            // Gap
            "gap-1"
          ].join(" ")}
        >
          {[40, 55, 35, 60, 75, 65, 87, 80].map((h, i) => (
            <div 
              key={i}
              className={`w-full rounded-t-sm transition-all ${h === 87 ? 'relative group/bar' : ''}`}
              style={{ 
                height: `${h}%`,
                backgroundColor: h === 87 
                  ? (isDarkMode ? 'rgba(0,255,128,0.8)' : 'var(--primary)')
                  : (isDarkMode ? 'rgba(0,255,128,0.2)' : 'rgba(16,185,129,0.2)')
              }}
            >
              {h === 87 && (
                <div 
                  className={[
                    // Posicionamento
                    "absolute -top-8 left-1/2 -translate-x-1/2",
                    // Tipografia
                    "text-[10px] font-bold",
                    // Espaçamento
                    "px-1.5 py-0.5",
                    // Forma
                    "rounded",
                    // Visibilidade
                    "opacity-0 group-hover/bar:opacity-100",
                    // Transição
                    "transition-opacity"
                  ].join(" ")}
                  style={{ 
                    backgroundColor: isDarkMode ? 'white' : 'var(--text-main)',
                    color: isDarkMode ? 'black' : 'white'
                  }}
                >
                  87%
                </div>
              )}
            </div>
          ))}
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <path d="M0,120 Q40,110 80,90 T160,80 T240,60 T320,40" fill="none" opacity="0.5" stroke="#8b5cf6" strokeDasharray="4 4" strokeWidth="2"></path>
        </svg>
        {isDarkMode && <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 to-transparent pointer-events-none"></div>}
      </div>
    )}
    
    {/* Code block with tabs */}
    {code && (
      <CodeBlockWithTabs 
        code={code}
        codeAlt={codeAlt}
        codeFileName={codeFileName}
        codeAltFileName={codeAltFileName}
        codeLink={codeLink}
      />
    )}
    
    
    {/* Attachment */}
    {attachment && (
      <a 
        className={[
          // Layout
          "flex items-center gap-3",
          // Espaçamento
          "mt-3 p-3",
          // Forma
          "rounded",
          // Interação
          "group transition-colors"
        ].join(" ")}
        style={{ 
          backgroundColor: isDarkMode ? 'var(--surface)' : '#f9fafb',
          border: '1px solid var(--border)'
        }}
        href="#"
      >
        <div 
          className={[
            // Layout
            "flex items-center justify-center",
            // Dimensões
            "size-10",
            // Forma
            "rounded shrink-0",
            // Interação
            "group-hover:bg-red-100 transition-colors"
          ].join(" ")}
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(239,68,68,0.1)' : '#fef2f2',
            border: isDarkMode ? '1px solid rgba(239,68,68,0.2)' : '1px solid #fecaca',
            color: '#ef4444'
          }}
        >
          <span className="material-symbols-outlined">picture_as_pdf</span>
        </div>
        <div className="min-w-0">
          <p 
            className={[
              // Tipografia
              "text-sm font-bold truncate",
              // Interação
              "group-hover:text-red-600 transition-colors"
            ].join(" ")} 
            style={{ color: 'var(--text-main)' }}
          >
            {attachment.name}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{attachment.size}</p>
        </div>
      </a>
    )}
    
    {/* Footer */}
    <div 
      className={[
        // Layout
        "flex items-center justify-end",
        // Espaçamento
        "pt-3",
        // Borda
        "border-t"
      ].join(" ")} 
      style={{ borderColor: isDarkMode ? 'rgba(46,46,50,0.5)' : 'var(--border)' }}
    >
      <button 
        className={[
          // Layout
          "flex items-center gap-1.5",
          // Interação
          "transition-colors hover:text-[var(--text-main)]"
        ].join(" ")} 
        style={{ color: 'var(--text-muted)' }} 
        aria-label="Compartilhar post"
      >
        <span className="material-symbols-outlined text-[18px]">share</span>
      </button>
    </div>
  </article>
);
};

