/*
 * app.js - Lógica principal do Personal Site
 * Douglas Furbino - Economista e Cientista de Dados
 * 
 * Responsável por:
 * - Detecção de tema (prefers-color-scheme + localStorage)
 * - Estado global do tema (isDarkMode)
 * - Renderização do App
 */

const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

// ============================================
// LÓGICA DE DETECÇÃO DE TEMA
// ============================================

/**
 * Detecta o tema inicial baseado em:
 * 1. Valor salvo no localStorage (prioridade)
 * 2. Preferência do sistema (prefers-color-scheme)
 */
const getInitialTheme = () => {
  // Verifica se há tema salvo no localStorage
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme === 'dark';
  }
  
  // Caso contrário, usa a preferência do sistema
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  // Default: dark mode
  return true;
};

/**
 * Aplica o tema ao documento (classe .dark no :root)
 */
const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// ============================================
// APP COMPONENT
// ============================================
const App = () => {
  // Estado do tema
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const initial = getInitialTheme();
    // Aplica tema inicial imediatamente para evitar flash
    applyTheme(initial);
    return initial;
  });

  // Efeito para sincronizar tema com DOM e localStorage
  useEffect(() => {
    applyTheme(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Listener para mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Só aplica se não houver preferência salva pelo usuário
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };

    // Adiciona listener (compatibilidade com navegadores antigos)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Toggle handler
  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Portfolio 
      isDarkMode={isDarkMode} 
      onToggleTheme={handleToggleTheme} 
    />
  );
};

// ============================================
// INICIALIZAÇÃO
// ============================================

// Aplica tema inicial antes mesmo do React montar (evita flash de tema errado)
applyTheme(getInitialTheme());

// Monta o App
const root = createRoot(document.getElementById('root'));
root.render(<App />);
