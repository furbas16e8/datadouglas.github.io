/*
 * components/Header.jsx - Componente de Navegação Superior
 * Douglas Furbino - Economista e Cientista de Dados
 */

const Header = ({ isDarkMode, onToggleTheme }) => (
  <header 
    className={[
      // Estilo base
      "header-glass",
      // Posicionamento
      "fixed top-0 left-0 right-0",
      // Z-index
      "z-50"
    ].join(" ")}
  >
    <div className="flex justify-center gap-1 h-12 px-4 w-full">
      {/* Slot Esquerdo - Alinhado com SidebarProfile (305px) */}
      <div className="w-[305px] hidden lg:flex items-center pl-4">
        <nav className="flex items-center gap-6">
          <a 
            className="text-sm font-medium hover:text-[var(--primary)] transition-colors" 
            style={{ color: 'var(--text-main)' }} 
            href="#/"
          >
            Home
          </a>
          <a 
            className="text-sm font-medium hover:text-[var(--text-main)] transition-colors" 
            style={{ color: 'var(--text-secondary)' }} 
            href="#/projects"
          >
            Projects
          </a>
          <a 
            className="text-sm font-medium hover:text-[var(--text-main)] transition-colors" 
            style={{ color: 'var(--text-secondary)' }} 
            href="#/research"
          >
            Research
          </a>
        </nav>
      </div>

      {/* Slot Central - Alinhado com Conteúdo Principal (720px) */}
      <div className="w-full max-w-[720px] flex items-center justify-center">
        {/* Placeholder para Logo se desejar futuramente */}
      </div>

      {/* Slot Direito - Alinhado com SidebarAnalytics (370px) */}
      <div className="w-[370px] hidden xl:flex items-center justify-end gap-3 pr-3">
        {/* Caixa de Busca */}
        <div 
          className="flex items-center gap-1 w-full max-w-[240px] px-3 h-8 rounded-lg border focus-within:border-[var(--primary)] transition-colors"
          style={{ 
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ color: 'var(--text-muted)' }}>search</span>
          <input 
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-[var(--text-muted)]"
            style={{ color: 'var(--text-main)' }}
          />
        </div>
        
        {/* Botão de Tema */}
        <button 
          className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors shrink-0"
          onClick={onToggleTheme}
        >
          <span 
            className="material-symbols-outlined text-[20px]" 
            style={{ color: isDarkMode ? 'var(--text-muted)' : 'var(--text-main)' }}
          >
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>

      {/* Mobile/Tablet View (quando as sidebars estão ocultas) */}
      <div className="flex lg:hidden w-full items-center justify-between">
        <a href="#/" className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>Doug.DS</a>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-[var(--surface)]" onClick={onToggleTheme}>
            <span className="material-symbols-outlined text-[20px]" style={{ color: 'var(--text-muted)' }}>
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button className="p-2 rounded-lg hover:bg-[var(--surface)]">
            <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>menu</span>
          </button>
        </div>
      </div>
    </div>
  </header>
);
