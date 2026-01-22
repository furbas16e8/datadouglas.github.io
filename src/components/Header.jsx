/*
 * components/Header.jsx - Componente de Navegação Superior
 * Douglas Furbino - Economista e Cientista de Dados
 */

const Header = ({ isDarkMode, onToggleTheme }) => (
  <header className="header-glass fixed top-0 left-0 right-0 z-50">
    <div className="flex items-center px-4 h-16 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-3 shrink-0 mr-8">
        <div className="flex items-center justify-center size-8 rounded bg-[var(--primary-light)] border border-[var(--primary)]/20">
          <span className="material-symbols-outlined text-[var(--primary)] text-[20px]">terminal</span>
        </div>
        <a href="#/" className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>Doug.DS</a>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <a className="text-sm font-medium hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--text-main)' }} href="#/">Dashboard</a>
        <a className="text-sm font-medium hover:text-[var(--text-main)] transition-colors" style={{ color: 'var(--text-secondary)' }} href="#/projects">Projects</a>
        <a className="text-sm font-medium hover:text-[var(--text-main)] transition-colors" style={{ color: 'var(--text-secondary)' }} href="#/research">Research</a>
      </nav>
      
      <div className="flex items-center gap-2 ml-auto">
        <button 
          className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
          aria-label="Buscar no site"
        >
          <span 
            className="material-symbols-outlined text-[20px]" 
            style={{ color: isDarkMode ? 'var(--text-muted)' : 'var(--text-main)' }}
          >
            search
          </span>
        </button>
        <button 
          className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
          onClick={onToggleTheme}
          aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          <span 
            className="material-symbols-outlined text-[20px]" 
            style={{ color: isDarkMode ? 'var(--text-muted)' : 'var(--text-main)' }}
          >
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        {/* Botão mobile menu */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
          aria-label="Abrir menu de navegação"
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>menu</span>
        </button>
      </div>
    </div>
  </header>
);
