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
    <div 
      className={[
        // Layout
        "flex items-center",
        // Espaçamento
        "px-4 h-16",
        // Container
        "max-w-7xl mx-auto w-full"
      ].join(" ")}
    >

      
      {/* Navegação Desktop */}
      <nav 
        className={[
          // Visibilidade
          "hidden md:flex",
          // Layout
          "items-center gap-6"
        ].join(" ")}
      >
        <a 
          className={[
            // Tipografia
            "text-sm font-medium",
            // Interação
            "hover:text-[var(--primary)] transition-colors"
          ].join(" ")} 
          style={{ color: 'var(--text-main)' }} 
          href="#/"
        >
          Home
        </a>
        <a 
          className={[
            // Tipografia
            "text-sm font-medium",
            // Interação
            "hover:text-[var(--text-main)] transition-colors"
          ].join(" ")} 
          style={{ color: 'var(--text-secondary)' }} 
          href="#/projects"
        >
          Projects
        </a>
        <a 
          className={[
            // Tipografia
            "text-sm font-medium",
            // Interação
            "hover:text-[var(--text-main)] transition-colors"
          ].join(" ")} 
          style={{ color: 'var(--text-secondary)' }} 
          href="#/research"
        >
          Research
        </a>
      </nav>
      
      {/* Ações do Header */}
      <div 
        className={[
          // Layout
          "flex items-center gap-2",
          // Posicionamento
          "ml-auto"
        ].join(" ")}
      >
        {/* Caixa de Busca */}
        <div 
          className={[
            // Layout
            "hidden sm:flex items-center gap-2",
            // Dimensões
            "w-48 lg:w-64",
            // Espaçamento
            "px-3 py-1",
            // Forma
            "rounded-lg",
            // Borda
            "border",
            // Interação
            "focus-within:border-[var(--primary)] transition-colors"
          ].join(" ")}
          style={{ 
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
        >
          <span 
            className="material-symbols-outlined text-[18px]" 
            style={{ color: 'var(--text-muted)' }}
          >
            search
          </span>
          <input 
            type="text"
            placeholder="Search..."
            className={[
              // Reset
              "bg-transparent border-none outline-none",
              // Dimensões
              "w-full",
              // Tipografia
              "text-sm",
              // Placeholder
              "placeholder:text-[var(--text-muted)]"
            ].join(" ")}
            style={{ color: 'var(--text-main)' }}
            aria-label="Buscar no site"
          />
        </div>
        
        {/* Botão de Tema */}
        <button 
          className={[
            // Espaçamento
            "p-2",
            // Forma
            "rounded-lg",
            // Interação
            "hover:bg-[var(--surface)] transition-colors"
          ].join(" ")}
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
        
        {/* Botão Mobile Menu */}
        <button 
          className={[
            // Visibilidade
            "md:hidden",
            // Espaçamento
            "p-2",
            // Forma
            "rounded-lg",
            // Interação
            "hover:bg-[var(--surface)] transition-colors"
          ].join(" ")}
          aria-label="Abrir menu de navegação"
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>menu</span>
        </button>
      </div>
    </div>
  </header>
);
