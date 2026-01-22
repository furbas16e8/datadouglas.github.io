/*
 * components/PostArticle.jsx - Card de post/artigo do feed
 * Douglas Furbino - Economista e Cientista de Dados
 */

const PostArticle = ({ isDarkMode, title, time, category, content, chart, code, attachment }) => (
  <article 
    className="p-5 border-b sm:border sm:rounded-lg hover:border-[var(--border-hover)] transition-colors"
    style={{ 
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)'
    }}
  >
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>{title}</h4>
      <button style={{ color: 'var(--text-muted)' }} className="hover:text-[var(--text-main)]" aria-label="Mais opções">
        <span className="material-symbols-outlined">more_horiz</span>
      </button>
    </div>
    <div className="flex items-center gap-2 mb-4 text-xs">
      <span style={{ color: 'var(--text-muted)' }}>{time}</span>
      <span style={{ color: 'var(--border)' }}>•</span>
      <span className="cursor-pointer hover:underline font-medium" style={{ color: 'var(--primary)' }}>{category}</span>
    </div>
    <div className="mb-4">
      <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {content}
        <button className="inline-flex items-center gap-0.5 font-medium text-xs ml-1 transition-colors hover:underline" style={{ color: 'var(--primary)' }}>
          Ver mais
        </button>
      </p>
    </div>
    
    {/* Chart visualization */}
    {chart && (
      <div 
        className="relative w-full h-48 rounded mb-4 overflow-hidden group"
        style={{ 
          backgroundColor: isDarkMode ? 'var(--surface)' : '#f9fafb',
          border: '1px solid var(--border)'
        }}
      >
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--text-muted)' }}>Model Performance</span>
        </div>
        <div className="flex items-end justify-between px-4 pb-0 h-full w-full gap-1 pt-8">
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
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity"
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
    
    {/* Code block - usando texto pré-formatado em vez de dangerouslySetInnerHTML */}
    {code && (
      <div className="code-block mb-3">
        <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
          <span className="text-gray-400">pipeline.py</span>
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="size-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="size-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
        </div>
        <div className="p-3 overflow-x-auto text-gray-300 leading-relaxed font-mono text-xs">
          <pre><code dangerouslySetInnerHTML={{ __html: code }}></code></pre>
        </div>
        <div className="px-3 py-2 bg-white/5 border-t border-white/5 text-center">
          <button className="text-[10px] font-bold uppercase tracking-wider hover:text-white transition-colors" style={{ color: 'var(--primary)' }}>
            View Full Gist
          </button>
        </div>
      </div>
    )}
    
    {/* Attachment */}
    {attachment && (
      <a 
        className="flex items-center gap-3 mt-3 p-3 rounded group transition-colors"
        style={{ 
          backgroundColor: isDarkMode ? 'var(--surface)' : '#f9fafb',
          border: '1px solid var(--border)'
        }}
        href="#"
      >
        <div 
          className="flex items-center justify-center size-10 rounded shrink-0 group-hover:bg-red-100 transition-colors"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(239,68,68,0.1)' : '#fef2f2',
            border: isDarkMode ? '1px solid rgba(239,68,68,0.2)' : '1px solid #fecaca',
            color: '#ef4444'
          }}
        >
          <span className="material-symbols-outlined">picture_as_pdf</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold truncate group-hover:text-red-600 transition-colors" style={{ color: 'var(--text-main)' }}>
            {attachment.name}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{attachment.size}</p>
        </div>
      </a>
    )}
    
    <div className="flex items-center justify-end pt-3 border-t" style={{ borderColor: isDarkMode ? 'rgba(46,46,50,0.5)' : 'var(--border)' }}>
      <button className="flex items-center gap-1.5 transition-colors hover:text-[var(--text-main)]" style={{ color: 'var(--text-muted)' }} aria-label="Compartilhar post">
        <span className="material-symbols-outlined text-[18px]">share</span>
      </button>
    </div>
  </article>
);
