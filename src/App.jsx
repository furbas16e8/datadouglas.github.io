/*
 * App.jsx - Componente principal com roteamento
 * Douglas Furbino - Economista e Cientista de Dados
 * 
 * Este arquivo é o ponto de entrada do React.
 * Usa HashRouter para compatibilidade com GitHub Pages.
 */

// ============================================
// LÓGICA DE TEMA
// ============================================
const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) return storedTheme === 'dark';
  if (window.matchMedia) return window.matchMedia('(prefers-color-scheme: dark)').matches;
  return true;
};

const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Aplica tema antes do React montar (evita flash)
applyTheme(getInitialTheme());

// ============================================
// COMPONENTE PRINCIPAL DO APP
// ============================================
const App = () => {
  const { useState, useEffect } = React;
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    return initial;
  });

  // Estado para controlar a rota atual (HashRouter manual)
  const [currentRoute, setCurrentRoute] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    applyTheme(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Listener para mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Listener para mudanças de hash (navegação)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.slice(1) || '/');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Renderiza a página baseado na rota atual
  const renderPage = () => {
    switch (currentRoute) {
      case '/projects':
        return <Projects isDarkMode={isDarkMode} />;
      case '/research':
        return <Research isDarkMode={isDarkMode} />;
      case '/':
      default:
        return <Dashboard isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div 
      className={[
        // Layout base
        "min-h-screen",
        // Tipografia
        "font-display"
      ].join(" ")}
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}
    >
      <Header isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
      
      {/* Sidebars fixas */}
      <SidebarProfile isDarkMode={isDarkMode} />
      <SidebarAnalytics isDarkMode={isDarkMode} />
      
      {/* Main com scroll - centralizado entre as sidebars */}
      <main 
        className={[
          // Espaçamento do header
          "pt-16",
          // Margens responsivas para sidebars
          "lg:ml-[280px] xl:mr-[320px]",
          // Altura mínima
          "min-h-screen"
        ].join(" ")}
      >
        {renderPage()}
      </main>
    </div>
  );
};

// ============================================
// INICIALIZAÇÃO
// ============================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
