"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var getInitialTheme = function getInitialTheme() {
  var storedTheme = localStorage.getItem('theme');
  if (storedTheme) return storedTheme === 'dark';
  if (window.matchMedia) return window.matchMedia('(prefers-color-scheme: dark)').matches;
  return true;
};
var applyTheme = function applyTheme(isDark) {
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
var App = function App() {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;
  var _useState = useState(function () {
      var initial = getInitialTheme();
      applyTheme(initial);
      return initial;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    isDarkMode = _useState2[0],
    setIsDarkMode = _useState2[1];

  // Estado para controlar a rota atual (HashRouter manual)
  var _useState3 = useState(window.location.hash.slice(1) || '/'),
    _useState4 = _slicedToArray(_useState3, 2),
    currentRoute = _useState4[0],
    setCurrentRoute = _useState4[1];
  useEffect(function () {
    applyTheme(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Listener para mudanças na preferência do sistema
  useEffect(function () {
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var handleChange = function handleChange(e) {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    return function () {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Listener para mudanças de hash (navegação)
  useEffect(function () {
    var handleHashChange = function handleHashChange() {
      setCurrentRoute(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return function () {
      return window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  var handleToggleTheme = function handleToggleTheme() {
    setIsDarkMode(function (prev) {
      return !prev;
    });
  };

  // Renderiza a página baseado na rota atual
  var renderPage = function renderPage() {
    switch (currentRoute) {
      case '/projects':
        return /*#__PURE__*/React.createElement(Projects, {
          isDarkMode: isDarkMode
        });
      case '/research':
        return /*#__PURE__*/React.createElement(Research, {
          isDarkMode: isDarkMode
        });
      case '/':
      default:
        return /*#__PURE__*/React.createElement(Dashboard, {
          isDarkMode: isDarkMode
        });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: [
    // Layout base
    "min-h-screen",
    // Tipografia
    "font-display"].join(" "),
    style: {
      backgroundColor: 'var(--bg)',
      color: 'var(--text-main)'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    isDarkMode: isDarkMode,
    onToggleTheme: handleToggleTheme
  }), /*#__PURE__*/React.createElement(SidebarProfile, {
    isDarkMode: isDarkMode
  }), /*#__PURE__*/React.createElement(SidebarAnalytics, {
    isDarkMode: isDarkMode
  }), /*#__PURE__*/React.createElement("main", {
    className: [
    // Espaçamento do header
    "pt-16",
    // Margens responsivas para sidebars
    "lg:ml-[280px] xl:mr-[320px]",
    // Altura mínima
    "min-h-screen"].join(" ")
  }, renderPage()));
};

// ============================================
// INICIALIZAÇÃO
// ============================================
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
"use strict";

/*
 * components/Header.jsx - Componente de Navegação Superior
 * Douglas Furbino - Economista e Cientista de Dados
 */

var Header = function Header(_ref) {
  var isDarkMode = _ref.isDarkMode,
    onToggleTheme = _ref.onToggleTheme;
  return /*#__PURE__*/React.createElement("header", {
    className: [
    // Estilo base
    "header-glass",
    // Posicionamento
    "fixed top-0 left-0 right-0",
    // Z-index
    "z-50"].join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: [
    // Layout
    "flex items-center",
    // Espaçamento
    "px-4 h-16",
    // Container
    "max-w-7xl mx-auto w-full"].join(" ")
  }, /*#__PURE__*/React.createElement("nav", {
    className: [
    // Visibilidade
    "hidden md:flex",
    // Layout
    "items-center gap-6"].join(" ")
  }, /*#__PURE__*/React.createElement("a", {
    className: [
    // Tipografia
    "text-sm font-medium",
    // Interação
    "hover:text-[var(--primary)] transition-colors"].join(" "),
    style: {
      color: 'var(--text-main)'
    },
    href: "#/"
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    className: [
    // Tipografia
    "text-sm font-medium",
    // Interação
    "hover:text-[var(--text-main)] transition-colors"].join(" "),
    style: {
      color: 'var(--text-secondary)'
    },
    href: "#/projects"
  }, "Projects"), /*#__PURE__*/React.createElement("a", {
    className: [
    // Tipografia
    "text-sm font-medium",
    // Interação
    "hover:text-[var(--text-main)] transition-colors"].join(" "),
    style: {
      color: 'var(--text-secondary)'
    },
    href: "#/research"
  }, "Research")), /*#__PURE__*/React.createElement("div", {
    className: [
    // Layout
    "flex items-center gap-2",
    // Posicionamento
    "ml-auto"].join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: [
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
    "focus-within:border-[var(--primary)] transition-colors"].join(" "),
    style: {
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-[18px]",
    style: {
      color: 'var(--text-muted)'
    }
  }, "search"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search...",
    className: [
    // Reset
    "bg-transparent border-none outline-none",
    // Dimensões
    "w-full",
    // Tipografia
    "text-sm",
    // Placeholder
    "placeholder:text-[var(--text-muted)]"].join(" "),
    style: {
      color: 'var(--text-main)'
    },
    "aria-label": "Buscar no site"
  })), /*#__PURE__*/React.createElement("button", {
    className: [
    // Espaçamento
    "p-2",
    // Forma
    "rounded-lg",
    // Interação
    "hover:bg-[var(--surface)] transition-colors"].join(" "),
    onClick: onToggleTheme,
    "aria-label": isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-[20px]",
    style: {
      color: isDarkMode ? 'var(--text-muted)' : 'var(--text-main)'
    }
  }, isDarkMode ? 'light_mode' : 'dark_mode')), /*#__PURE__*/React.createElement("button", {
    className: [
    // Visibilidade
    "md:hidden",
    // Espaçamento
    "p-2",
    // Forma
    "rounded-lg",
    // Interação
    "hover:bg-[var(--surface)] transition-colors"].join(" "),
    "aria-label": "Abrir menu de navega\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "menu")))));
};
"use strict";

/*
 * components/MobileProfile.jsx - Versão mobile do perfil
 * Douglas Furbino - Economista e Cientista de Dados
 */

var MobileProfile = function MobileProfile(_ref) {
  var isDarkMode = _ref.isDarkMode;
  return /*#__PURE__*/React.createElement("section", {
    className: [
    // Visibilidade
    "lg:hidden",
    // Espaçamento
    "p-4",
    // Borda
    "border-b sm:rounded-lg sm:border sm:mb-0"].join(" "),
    style: {
      backgroundColor: isDarkMode ? 'rgba(26,26,30,0.5)' : 'var(--surface)',
      borderColor: 'var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative group cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    className: [
    // Dimensões
    "size-16",
    // Forma
    "rounded-full",
    // Background
    "bg-cover bg-center",
    // Borda
    "border-2"].join(" "),
    role: "img",
    "aria-label": "Foto de perfil de Douglas Furbino",
    style: {
      backgroundImage: "url('./assets/img/perfil.jpeg')",
      borderColor: isDarkMode ? 'rgba(0,255,128,0.2)' : 'rgba(16,185,129,0.2)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold leading-tight truncate",
    style: {
      color: 'var(--text-main)'
    }
  }, "Douglas Furbino"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-body mt-1",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Machine Learning Engineer passionate about turning complex data into actionable insights."))));
};
"use strict";

/*
 * components/PostArticle.jsx - Card de post/artigo do feed
 * Douglas Furbino - Economista e Cientista de Dados
 */

var PostArticle = function PostArticle(_ref) {
  var isDarkMode = _ref.isDarkMode,
    title = _ref.title,
    time = _ref.time,
    category = _ref.category,
    content = _ref.content,
    chart = _ref.chart,
    code = _ref.code,
    attachment = _ref.attachment;
  return /*#__PURE__*/React.createElement("article", {
    className: [
    // Espaçamento
    "p-5",
    // Borda
    "border-b sm:border sm:rounded-lg",
    // Interação
    "hover:border-[var(--border-hover)] transition-colors"].join(" "),
    style: {
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start mb-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-lg font-bold",
    style: {
      color: 'var(--text-main)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    style: {
      color: 'var(--text-muted)'
    },
    className: "hover:text-[var(--text-main)]",
    "aria-label": "Mais op\xE7\xF5es"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined"
  }, "more_horiz"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-4 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, time), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--border)'
    }
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    className: "cursor-pointer hover:underline font-medium",
    style: {
      color: 'var(--primary)'
    }
  }, category)), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-body leading-relaxed",
    style: {
      color: 'var(--text-secondary)'
    }
  }, content, /*#__PURE__*/React.createElement("button", {
    className: [
    // Layout
    "inline-flex items-center gap-0.5",
    // Tipografia
    "font-medium text-xs",
    // Espaçamento
    "ml-1",
    // Interação
    "transition-colors hover:underline"].join(" "),
    style: {
      color: 'var(--primary)'
    }
  }, "Ver mais"))), chart && /*#__PURE__*/React.createElement("div", {
    className: [
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
    "group"].join(" "),
    style: {
      backgroundColor: isDarkMode ? 'var(--surface)' : '#f9fafb',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-3 left-3 z-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase tracking-widest font-bold",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Model Performance")), /*#__PURE__*/React.createElement("div", {
    className: [
    // Layout
    "flex items-end justify-between",
    // Espaçamento
    "px-4 pb-0 pt-8",
    // Dimensões
    "h-full w-full",
    // Gap
    "gap-1"].join(" ")
  }, [40, 55, 35, 60, 75, 65, 87, 80].map(function (h, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "w-full rounded-t-sm transition-all ".concat(h === 87 ? 'relative group/bar' : ''),
      style: {
        height: "".concat(h, "%"),
        backgroundColor: h === 87 ? isDarkMode ? 'rgba(0,255,128,0.8)' : 'var(--primary)' : isDarkMode ? 'rgba(0,255,128,0.2)' : 'rgba(16,185,129,0.2)'
      }
    }, h === 87 && /*#__PURE__*/React.createElement("div", {
      className: [
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
      "transition-opacity"].join(" "),
      style: {
        backgroundColor: isDarkMode ? 'white' : 'var(--text-main)',
        color: isDarkMode ? 'black' : 'white'
      }
    }, "87%"));
  })), /*#__PURE__*/React.createElement("svg", {
    className: "absolute inset-0 w-full h-full pointer-events-none",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,120 Q40,110 80,90 T160,80 T240,60 T320,40",
    fill: "none",
    opacity: "0.5",
    stroke: "#8b5cf6",
    strokeDasharray: "4 4",
    strokeWidth: "2"
  })), isDarkMode && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 to-transparent pointer-events-none"
  })), code && /*#__PURE__*/React.createElement("div", {
    className: "code-block mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: [
    // Layout
    "flex items-center justify-between",
    // Espaçamento
    "px-3 py-2",
    // Visual
    "bg-white/5 border-b border-white/5"].join(" ")
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "pipeline.py"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "size-2.5 rounded-full bg-red-500/20 border border-red-500/50"
  }), /*#__PURE__*/React.createElement("div", {
    className: "size-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"
  }), /*#__PURE__*/React.createElement("div", {
    className: "size-2.5 rounded-full bg-green-500/20 border border-green-500/50"
  }))), /*#__PURE__*/React.createElement("div", {
    className: [
    // Espaçamento
    "p-3",
    // Scroll
    "overflow-x-auto",
    // Tipografia
    "text-gray-300 leading-relaxed font-mono text-xs"].join(" ")
  }, /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", {
    dangerouslySetInnerHTML: {
      __html: code
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-2 bg-white/5 border-t border-white/5 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: [
    // Tipografia
    "text-[10px] font-bold uppercase tracking-wider",
    // Interação
    "hover:text-white transition-colors"].join(" "),
    style: {
      color: 'var(--primary)'
    }
  }, "View Full Gist"))), attachment && /*#__PURE__*/React.createElement("a", {
    className: [
    // Layout
    "flex items-center gap-3",
    // Espaçamento
    "mt-3 p-3",
    // Forma
    "rounded",
    // Interação
    "group transition-colors"].join(" "),
    style: {
      backgroundColor: isDarkMode ? 'var(--surface)' : '#f9fafb',
      border: '1px solid var(--border)'
    },
    href: "#"
  }, /*#__PURE__*/React.createElement("div", {
    className: [
    // Layout
    "flex items-center justify-center",
    // Dimensões
    "size-10",
    // Forma
    "rounded shrink-0",
    // Interação
    "group-hover:bg-red-100 transition-colors"].join(" "),
    style: {
      backgroundColor: isDarkMode ? 'rgba(239,68,68,0.1)' : '#fef2f2',
      border: isDarkMode ? '1px solid rgba(239,68,68,0.2)' : '1px solid #fecaca',
      color: '#ef4444'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined"
  }, "picture_as_pdf")), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: [
    // Tipografia
    "text-sm font-bold truncate",
    // Interação
    "group-hover:text-red-600 transition-colors"].join(" "),
    style: {
      color: 'var(--text-main)'
    }
  }, attachment.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: 'var(--text-secondary)'
    }
  }, attachment.size))), /*#__PURE__*/React.createElement("div", {
    className: [
    // Layout
    "flex items-center justify-end",
    // Espaçamento
    "pt-3",
    // Borda
    "border-t"].join(" "),
    style: {
      borderColor: isDarkMode ? 'rgba(46,46,50,0.5)' : 'var(--border)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: [
    // Layout
    "flex items-center gap-1.5",
    // Interação
    "transition-colors hover:text-[var(--text-main)]"].join(" "),
    style: {
      color: 'var(--text-muted)'
    },
    "aria-label": "Compartilhar post"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-[18px]"
  }, "share"))));
};
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/*
 * components/SidebarAnalytics.jsx - Sidebar com cards de analytics
 * Douglas Furbino - Economista e Cientista de Dados
 * 
 * Atualizado: 2026-01-23 - Refatoração visual: botões toggle, eixos, correlação em lista
 */

// Componente do Gráfico de Vida
var LifeAnalyticsChart = function LifeAnalyticsChart(_ref) {
  var isDarkMode = _ref.isDarkMode;
  var _React$useState = React.useState('monthly'),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    period = _React$useState2[0],
    setPeriod = _React$useState2[1];
  var _React$useState3 = React.useState({
      normal: true,
      shorts: true,
      music: true
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    activeCategories = _React$useState4[0],
    setActiveCategories = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    showTooltip = _React$useState6[0],
    setShowTooltip = _React$useState6[1];
  var chartRef = React.useRef(null);
  var chartInstanceRef = React.useRef(null);

  // Dados carregados via variável global (evita CORS com file://)
  var lifeData = window.LIFE_ANALYTICS_DATA;

  // Cores neon dark-tech
  var colors = {
    normal: '#60a5fa',
    // Azul neon
    shorts: '#fb923c',
    // Laranja neon
    music: '#f87171',
    // Vermelho neon
    journal: '#a855f7' // Roxo neon
  };

  // Converter hex para rgb
  var hexToRgb = function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "".concat(parseInt(result[1], 16), ", ").concat(parseInt(result[2], 16), ", ").concat(parseInt(result[3], 16)) : '0, 0, 0';
  };

  // Toggle categoria
  var toggleCategory = function toggleCategory(cat) {
    setActiveCategories(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, cat, !prev[cat]));
    });
  };

  // Obter dados baseado no período
  var getData = function getData() {
    return period === 'weekly' ? lifeData.weekly : lifeData.monthly;
  };

  // Formatar label para "Out.24"
  var formatLabel = function formatLabel(label) {
    // Label mensal: "Out/2024" -> "Out.24"
    // Label semanal: "S42/2024" -> manter ou converter
    if (label.includes('/')) {
      var parts = label.split('/');
      if (parts[0].startsWith('S')) {
        // Semanal: "S42/2024" -> "S42"
        return parts[0];
      } else {
        // Mensal: "Out/2024" -> "Out.24"
        var month = parts[0];
        var year = parts[1].slice(-2);
        return "".concat(month, ".").concat(year);
      }
    }
    return label;
  };

  // Obter correlações das categorias ativas (retorna array de objetos)
  var getCorrelations = function getCorrelations() {
    var correlations = period === 'weekly' ? lifeData.stats.correlation_weekly : lifeData.stats.correlation_monthly;
    var active = [];
    if (activeCategories.normal) active.push({
      value: correlations.journal_vs_normal,
      color: colors.normal
    });
    if (activeCategories.shorts) active.push({
      value: correlations.journal_vs_shorts,
      color: colors.shorts
    });
    if (activeCategories.music) active.push({
      value: correlations.journal_vs_music,
      color: colors.music
    });
    return active;
  };

  // Construir datasets para o gráfico
  var buildDatasets = function buildDatasets() {
    var data = getData();
    var datasets = [];

    // Adicionar categorias ativas
    if (activeCategories.normal) {
      datasets.push({
        label: 'Normal',
        data: data.map(function (d) {
          return d.normal.normalized;
        }),
        borderColor: colors.normal,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
    }
    if (activeCategories.shorts) {
      datasets.push({
        label: 'Shorts',
        data: data.map(function (d) {
          return d.shorts.normalized;
        }),
        borderColor: colors.shorts,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
    }
    if (activeCategories.music) {
      datasets.push({
        label: 'Music',
        data: data.map(function (d) {
          return d.music.normalized;
        }),
        borderColor: colors.music,
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0
      });
    }

    // Sempre adicionar Journal
    datasets.push({
      label: 'Journal',
      data: data.map(function (d) {
        return d.journal.normalized;
      }),
      borderColor: colors.journal,
      backgroundColor: 'transparent',
      tension: 0.4,
      pointRadius: 0,
      borderDash: [5, 5]
    });
    return datasets;
  };

  // Inicializar/Atualizar gráfico
  React.useEffect(function () {
    if (!chartRef.current || !lifeData) return;
    var ctx = chartRef.current.getContext('2d');
    var data = getData();

    // Destruir gráfico anterior se existir
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Criar novo gráfico
    chartInstanceRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(function (d) {
          return formatLabel(d.label);
        }),
        datasets: buildDatasets()
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: isDarkMode ? 'rgba(26,26,30,0.9)' : 'rgba(255,255,255,0.9)',
            titleColor: isDarkMode ? '#fff' : '#111',
            bodyColor: isDarkMode ? '#ccc' : '#333',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            callbacks: {
              label: function label(context) {
                var dataIndex = context.dataIndex;
                var datasetLabel = context.dataset.label.toLowerCase();
                var rawData = getData()[dataIndex];
                var rawValue;
                if (datasetLabel === 'journal') {
                  rawValue = rawData.journal.raw;
                } else if (datasetLabel === 'normal') {
                  rawValue = rawData.normal.raw;
                } else if (datasetLabel === 'shorts') {
                  rawValue = rawData.shorts.raw;
                } else if (datasetLabel === 'music') {
                  rawValue = rawData.music.raw;
                }
                return "".concat(context.dataset.label, ": ").concat(rawValue, " (").concat(context.parsed.y.toFixed(1), "%)");
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            ticks: {
              font: {
                size: 8
              },
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6
            },
            grid: {
              display: false
            }
          },
          y: {
            display: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 50,
              font: {
                size: 8
              },
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              callback: function callback(value) {
                return value + '%';
              }
            },
            grid: {
              color: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
            }
          }
        },
        elements: {
          line: {
            borderWidth: 2
          }
        }
      }
    });
    return function () {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [period, activeCategories, isDarkMode, lifeData]);
  return /*#__PURE__*/React.createElement("div", {
    className: "card p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-bold uppercase tracking-widest",
    style: {
      color: 'var(--primary)'
    }
  }, "Life Analytics"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      color: 'var(--text-muted)'
    },
    "aria-label": "Informa\xE7\xF5es sobre Life Analytics",
    onMouseEnter: function onMouseEnter() {
      return setShowTooltip(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowTooltip(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-[16px]"
  }, "info")), showTooltip && /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 top-full mt-1 p-2 rounded shadow-lg z-50 w-48 text-[9px]",
    style: {
      backgroundColor: isDarkMode ? '#1a1a1e' : '#fff',
      border: '1px solid var(--border)',
      color: 'var(--text-secondary)'
    }
  }, "Correla\xE7\xE3o de Pearson entre vari\xE1veis: journaling (registros) e consumo de m\xEDdia (visualiza\xE7\xF5es normalizadas via Min-Max)."))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex rounded overflow-hidden",
    style: {
      border: '1px solid var(--border)'
    }
  }, ['normal', 'shorts', 'music'].map(function (cat) {
    return /*#__PURE__*/React.createElement("button", {
      key: cat,
      onClick: function onClick() {
        return toggleCategory(cat);
      },
      className: "px-2 py-1 text-[10px] font-medium transition-all capitalize",
      style: {
        backgroundColor: activeCategories[cat] ? "rgba(".concat(hexToRgb(colors[cat]), ", 0.15)") : 'transparent',
        borderRight: '1px solid var(--border)',
        color: activeCategories[cat] ? colors[cat] : 'var(--text-muted)'
      }
    }, cat === 'normal' ? 'Normal' : cat === 'shorts' ? 'Shorts' : 'Music');
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex rounded overflow-hidden",
    style: {
      border: '1px solid var(--border)'
    }
  }, ['weekly', 'monthly'].map(function (p) {
    return /*#__PURE__*/React.createElement("button", {
      key: p,
      onClick: function onClick() {
        return setPeriod(p);
      },
      className: "px-2 py-1 text-[10px] font-medium transition-colors",
      style: {
        backgroundColor: period === p ? 'var(--primary)' : 'transparent',
        color: period === p ? '#fff' : 'var(--text-muted)'
      }
    }, p === 'weekly' ? 'Semanal' : 'Mensal');
  }))), /*#__PURE__*/React.createElement("div", {
    className: "h-32 w-full relative rounded overflow-hidden",
    style: {
      backgroundColor: isDarkMode ? 'rgba(18,18,18,0.8)' : '#f9fafb',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: chartRef
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex items-center gap-1 flex-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-medium",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Correla\xE7\xE3o (Pearson):"), getCorrelations().length > 0 ? getCorrelations().map(function (item, index) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, index > 0 && /*#__PURE__*/React.createElement("span", {
      className: "text-[10px]",
      style: {
        color: 'var(--text-muted)'
      }
    }, "|"), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold",
      style: {
        color: item.color
      }
    }, item.value.toFixed(2)));
  }) : /*#__PURE__*/React.createElement("span", {
    className: "text-[10px]",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u2014")));
};
var SidebarAnalytics = function SidebarAnalytics(_ref2) {
  var isDarkMode = _ref2.isDarkMode;
  return /*#__PURE__*/React.createElement("aside", {
    className: [
    // Visibilidade / Responsividade
    "hidden xl:block",
    // Posicionamento
    "fixed right-[max(0px,calc(50%-680px))] top-16",
    // Dimensões
    "w-[370px] h-[calc(100vh-64px)]",
    // Scroll
    "overflow-y-auto no-scrollbar",
    // Espaçamento interno
    "py-6 px-3"].join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement(LifeAnalyticsChart, {
    isDarkMode: isDarkMode
  }), /*#__PURE__*/React.createElement("div", {
    className: "card p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-end mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-medium tracking-wide uppercase",
    style: {
      color: 'var(--text-muted)'
    }
  }, "SCREEN TIME INTENSITY")), /*#__PURE__*/React.createElement("div", {
    className: [
    // Dimensões
    "h-32 w-full",
    // Forma
    "rounded",
    // Posicionamento
    "relative overflow-hidden",
    // Layout
    "flex items-center justify-center"].join(" "),
    style: {
      backgroundColor: isDarkMode ? 'var(--bg)' : '#f9fafb',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: [
    // Posicionamento
    "absolute bottom-[20%] left-[20%]",
    // Dimensões e forma
    "size-14 rounded-full border",
    // Layout
    "flex flex-col items-center justify-center",
    // Interação
    "cursor-pointer",
    // Sombra condicional
    isDarkMode ? 'shadow-neon-blue' : 'shadow-sm'].join(" "),
    style: {
      backgroundColor: isDarkMode ? 'rgba(59,130,246,0.1)' : '#dbeafe',
      borderColor: isDarkMode ? 'rgba(59,130,246,0.5)' : '#bfdbfe',
      color: isDarkMode ? '#60a5fa' : '#1d4ed8'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] font-bold"
  }, "Code"), /*#__PURE__*/React.createElement("span", {
    className: "text-[7px]",
    style: {
      opacity: 0.8
    }
  }, "6h 12m")), /*#__PURE__*/React.createElement("div", {
    className: [
    // Posicionamento
    "absolute top-[15%] right-[20%]",
    // Dimensões e forma
    "size-16 rounded-full border",
    // Layout
    "flex flex-col items-center justify-center",
    // Interação
    "cursor-pointer",
    // Sombra condicional
    isDarkMode ? 'shadow-neon-purple' : 'shadow-sm'].join(" "),
    style: {
      backgroundColor: isDarkMode ? 'rgba(139,92,246,0.1)' : '#ede9fe',
      borderColor: isDarkMode ? 'rgba(139,92,246,0.5)' : '#c4b5fd',
      color: isDarkMode ? '#a78bfa' : '#6d28d9'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold"
  }, "Social"), /*#__PURE__*/React.createElement("span", {
    className: "text-[7px]",
    style: {
      opacity: 0.8
    }
  }, "3h 45m")), /*#__PURE__*/React.createElement("div", {
    className: [
    // Posicionamento
    "absolute bottom-[10%] right-[35%]",
    // Dimensões e forma
    "size-10 rounded-full border",
    // Layout
    "flex items-center justify-center",
    // Interação
    "cursor-pointer",
    // Sombra condicional
    isDarkMode ? 'shadow-neon-green' : 'shadow-sm'].join(" "),
    style: {
      backgroundColor: isDarkMode ? 'rgba(34,197,94,0.1)' : '#dcfce7',
      borderColor: isDarkMode ? 'rgba(34,197,94,0.5)' : '#86efac',
      color: isDarkMode ? '#4ade80' : '#15803d'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[8px] font-bold"
  }, "Media")))), /*#__PURE__*/React.createElement("div", {
    className: [
    // Base
    "card p-4",
    // Layout
    "flex items-center justify-between",
    // Interação
    "group cursor-pointer",
    // Hover
    "hover:border-[var(--primary)]/50 transition-colors"].join(" ")
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-widest font-bold",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Trending"), /*#__PURE__*/React.createElement("div", {
    className: [
    // Tipografia
    "text-sm font-bold mt-0.5",
    // Interação
    "group-hover:text-[var(--primary)] transition-colors"].join(" "),
    style: {
      color: 'var(--text-main)'
    }
  }, "Global AI Index")), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined group-hover:text-[var(--primary)] transition-colors",
    style: {
      color: 'var(--text-muted)'
    }
  }, "show_chart"))));
};
"use strict";

/*
 * components/SidebarProfile.jsx - Sidebar com perfil do usuário
 * Douglas Furbino - Economista e Cientista de Dados
 */

var SidebarProfile = function SidebarProfile(_ref) {
  var isDarkMode = _ref.isDarkMode;
  return /*#__PURE__*/React.createElement("aside", {
    className: [
    // Visibilidade / Responsividade
    "hidden lg:block",
    // Posicionamento
    "fixed left-[max(0px,calc(50%-655px))] top-16",
    // Dimensões
    "w-[305px] h-[calc(100vh-64px)]",
    // Scroll
    "overflow-y-auto no-scrollbar",
    // Espaçamento interno
    "py-6 px-3"].join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card overflow-hidden relative group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-24 bg-gradient-to-r from-slate-800 to-slate-700 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"
  }), isDarkMode && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-[var(--surface)]/90 to-transparent"
  })), /*#__PURE__*/React.createElement("div", {
    className: "px-4 pb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative -mt-12 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: [
    // Dimensões
    "size-24",
    // Forma e borda
    "rounded-full border-[4px]",
    // Background
    "bg-cover bg-center",
    // Sombra
    "shadow-lg"].join(" "),
    role: "img",
    "aria-label": "Foto de perfil de Douglas Furbino",
    style: {
      borderColor: 'var(--surface)',
      backgroundImage: "url('./assets/img/perfil.jpeg')"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: [
    // Tipografia
    "text-xl font-bold leading-tight",
    // Layout
    "flex items-center gap-1.5"].join(" "),
    style: {
      color: 'var(--text-main)'
    }
  }, "Douglas Furbino"), /*#__PURE__*/React.createElement("p", {
    className: "text-[13px] font-medium mt-0.5",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Economista e Cientista de Dados"), /*#__PURE__*/React.createElement("div", {
    className: [
    // Layout
    "flex items-center gap-1",
    // Espaçamento
    "mt-2 mb-3",
    // Tipografia
    "text-xs"].join(" "),
    style: {
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined text-[12px]"
  }, "location_on"), "Governador Valadares, MG"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-body leading-relaxed border-t pt-3",
    style: {
      color: 'var(--text-secondary)',
      borderColor: 'var(--border)'
    }
  }, "Machine Learning Engineer passionate about turning complex data into actionable insights.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-5 pt-0 px-2 pb-2"
  }, [{
    value: '12',
    label: 'Projects'
  }, {
    value: '450+',
    label: 'Commits'
  }, {
    value: '8',
    label: 'Papers'
  }].map(function (stat, i) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: stat.label
    }, i > 0 && /*#__PURE__*/React.createElement("div", {
      className: "w-px h-8",
      style: {
        backgroundColor: 'var(--border)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "text-center group cursor-default"
    }, /*#__PURE__*/React.createElement("div", {
      className: [
      // Tipografia
      "text-sm font-bold font-mono",
      // Interação
      "group-hover:text-[var(--primary)] transition-colors"].join(" "),
      style: {
        color: 'var(--text-main)'
      }
    }, stat.value), /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] font-medium",
      style: {
        color: 'var(--text-muted)'
      }
    }, stat.label)));
  })), /*#__PURE__*/React.createElement("div", {
    className: [
    // Espaçamento
    "mt-4 pt-4",
    // Borda
    "border-t",
    // Layout Grid
    "grid grid-cols-2 gap-3"].join(" "),
    style: {
      borderColor: 'var(--border)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/furbas16e8",
    target: "_blank",
    rel: "noopener noreferrer",
    className: [
    // Layout
    "flex items-center justify-center gap-2",
    // Espaçamento
    "py-1.5 px-4",
    // Borda e forma
    "border rounded-md",
    // Dimensões
    "h-[34px]",
    // Interação
    "hover:opacity-90 transition-all"].join(" "),
    style: {
      backgroundColor: '#24292e',
      borderColor: '#444c56'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "devicon-github-original text-white text-lg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[13px] font-semibold text-white"
  }, "GitHub")), /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/dfurbino/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: [
    // Layout
    "flex items-center justify-center gap-2",
    // Espaçamento
    "py-1.5 px-4",
    // Borda e forma
    "border rounded-md",
    // Dimensões
    "h-[34px]",
    // Interação
    "transition-all"].join(" "),
    style: {
      backgroundColor: 'rgba(10,102,194,0.05)',
      borderColor: 'rgba(10,102,194,0.2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "devicon-linkedin-plain text-[#0a66c2] text-lg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[13px] font-semibold text-[#0a66c2]"
  }, "LinkedIn"))))), /*#__PURE__*/React.createElement("div", {
    className: "card p-4 h-[180px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold uppercase tracking-wider",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Site Activity")), /*#__PURE__*/React.createElement("div", {
    className: "h-full w-full relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-rows-7 grid-flow-col gap-[3px] h-[110px]",
    style: {
      opacity: isDarkMode ? 0.7 : 1
    }
  }, ACTIVITY_DATA.map(function (opacity, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "activity-dot activity-dot-".concat(opacity)
    });
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 flex justify-between text-[9px]",
    style: {
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Less"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-[2px]"
  }, [10, 30, 60, 90].map(function (o) {
    return /*#__PURE__*/React.createElement("div", {
      key: o,
      className: "size-2 rounded-[1px] activity-dot-".concat(o),
      style: {
        backgroundColor: 'var(--primary)'
      }
    });
  })), /*#__PURE__*/React.createElement("span", null, "More")), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-[10px] text-center",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\xA9 2026 Doug.DS Portfolio."))));
};
"use strict";

/*
 * data/posts.js - Dados dos posts do feed
 * Douglas Furbino - Economista e Cientista de Dados
 */

// Dados de exemplo para o feed de atividades
var POSTS_DATA = [{
  title: 'Predictive Market Volatility Model',
  time: '2h ago',
  category: 'Market Analysis',
  content: 'Deployed a new LSTM model to predict crypto volatility indices. Achieving 87% accuracy on test sets compared to the baseline ARIMA model.',
  chart: true
}, {
  title: 'Optimizing Data Pipelines',
  time: '5h ago',
  category: 'Data Engineering',
  content: 'Refactored the ETL pipeline to use Polars instead of Pandas. Saw a 12x speed improvement on the daily ingestion jobs.',
  code: "<span class=\"text-pink-400\">import</span> polars <span class=\"text-pink-400\">as</span> pl\n<span class=\"text-gray-500\"># Lazy evaluation for memory efficiency</span>\ndf = pl.scan_csv(<span class=\"text-green-400\">\"large_dataset.csv\"</span>)\n    .filter(pl.col(<span class=\"text-green-400\">\"status\"</span>) == <span class=\"text-green-400\">\"active\"</span>)\n    .groupby(<span class=\"text-green-400\">\"region\"</span>)\n    .agg([\n        pl.col(<span class=\"text-green-400\">\"sales\"</span>).sum().alias(<span class=\"text-green-400\">\"total\"</span>)\n    ])\n    .collect()"
}, {
  title: 'Multi-Agent RL Research',
  time: '1d ago',
  category: 'Research',
  content: "Just published a new paper on arXiv regarding reinforcement learning in multi-agent environments. Check it out if you're into game theory! #AI #Research",
  attachment: {
    name: 'Multi-Agent RL Optimization.pdf',
    size: '2.4 MB • PDF Document'
  }
}];

// Dados pré-definidos para Activity Grid (opacidades estáveis)
var ACTIVITY_DATA = [10, 30, 10, 60, 10, 20, 10, 50, 10, 80, 20, 40, 10, 10, 20, 90, 30, 10, 60, 20, 40, 10, 10, 30, 70, 10, 20, 50, 80, 40, 10, 20, 90, 30, 10, 10, 60, 20, 80, 40, 10, 50, 30, 70, 10, 20, 90, 50, 10, 20, 40, 80, 10, 60, 30, 70, 10, 30, 10, 60, 10, 20, 10, 50, 10, 80, 20, 40, 10, 10, 20, 90, 30, 10, 60, 20, 40, 10, 10, 30, 70, 10, 20, 50, 80, 40, 10, 20, 90, 30];
"use strict";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/*
 * pages/Dashboard.jsx - Página inicial (feed de posts)
 * Douglas Furbino - Economista e Cientista de Dados
 */

var Dashboard = function Dashboard(_ref) {
  var isDarkMode = _ref.isDarkMode;
  return /*#__PURE__*/React.createElement("div", {
    className: [
    // Container
    "max-w-2xl mx-auto",
    // Espaçamento
    "px-4 py-6",
    // Layout
    "flex flex-col gap-4"].join(" ")
  }, /*#__PURE__*/React.createElement(MobileProfile, {
    isDarkMode: isDarkMode
  }), POSTS_DATA.map(function (post, i) {
    return /*#__PURE__*/React.createElement(PostArticle, _extends({
      key: i,
      isDarkMode: isDarkMode
    }, post));
  }), /*#__PURE__*/React.createElement("div", {
    className: [
    // Dimensões
    "h-20",
    // Layout
    "flex items-center justify-center",
    // Tipografia
    "text-xs"].join(" "),
    style: {
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("p", null, "End of Feed")));
};
"use strict";

/*
 * pages/Projects.jsx - Página de projetos
 * Douglas Furbino - Economista e Cientista de Dados
 */

var Projects = function Projects(_ref) {
  var isDarkMode = _ref.isDarkMode;
  var projects = [{
    title: 'Life Analytics',
    description: 'Análise de padrões de consumo de mídia com dados do YouTube e Google Search.',
    tags: ['Python', 'Polars', 'ML'],
    status: 'Em desenvolvimento'
  }, {
    title: 'Predictive Market Model',
    description: 'Modelo LSTM para previsão de volatilidade de criptomoedas.',
    tags: ['Python', 'TensorFlow', 'Time Series'],
    status: 'Concluído'
  }, {
    title: 'ETL Pipeline Optimizer',
    description: 'Pipeline de dados otimizado usando Polars para processamento 12x mais rápido.',
    tags: ['Python', 'Polars', 'Data Engineering'],
    status: 'Concluído'
  }, {
    title: 'Multi-Agent RL Research',
    description: 'Pesquisa em aprendizado por reforço em ambientes multi-agente.',
    tags: ['Python', 'PyTorch', 'RL', 'Research'],
    status: 'Em desenvolvimento'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: [
    // Container
    "max-w-2xl mx-auto",
    // Espaçamento
    "px-4 py-6"].join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold mb-2",
    style: {
      color: 'var(--text-main)'
    }
  }, "Projects"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Uma sele\xE7\xE3o dos meus projetos de Data Science e Machine Learning.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4"
  }, projects.map(function (project, i) {
    return /*#__PURE__*/React.createElement("article", {
      key: i,
      className: [
      // Base
      "card p-5",
      // Interação
      "hover:border-[var(--primary)]/50 transition-colors cursor-pointer"].join(" ")
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start mb-2"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold",
      style: {
        color: 'var(--text-main)'
      }
    }, project.title), /*#__PURE__*/React.createElement("span", {
      className: [
      // Tipografia
      "text-[10px] font-medium",
      // Espaçamento
      "px-2 py-1",
      // Forma
      "rounded-full",
      // Cores condicionais
      project.status === 'Concluído' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'].join(" ")
    }, project.status)), /*#__PURE__*/React.createElement("p", {
      className: "text-sm mb-4",
      style: {
        color: 'var(--text-secondary)'
      }
    }, project.description), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-2"
    }, project.tags.map(function (tag, j) {
      return /*#__PURE__*/React.createElement("span", {
        key: j,
        className: [
        // Tipografia
        "text-[10px] font-medium",
        // Espaçamento
        "px-2 py-1",
        // Forma
        "rounded"].join(" "),
        style: {
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)'
        }
      }, tag);
    })));
  })));
};
"use strict";

/*
 * pages/Research.jsx - Página de pesquisas e papers
 * Douglas Furbino - Economista e Cientista de Dados
 */

var Research = function Research(_ref) {
  var isDarkMode = _ref.isDarkMode;
  var papers = [{
    title: 'Multi-Agent Reinforcement Learning in Competitive Environments',
    venue: 'arXiv Preprint',
    year: '2026',
    "abstract": 'Exploramos estratégias de aprendizado por reforço em ambientes competitivos multi-agente, com aplicações em teoria dos jogos.',
    link: '#'
  }, {
    title: 'Predicting Cryptocurrency Volatility Using Deep Learning',
    venue: 'Journal of Financial Data Science',
    year: '2025',
    "abstract": 'Modelo LSTM para previsão de volatilidade de criptomoedas com 87% de acurácia.',
    link: '#'
  }, {
    title: 'Efficient Data Pipelines with Lazy Evaluation',
    venue: 'Data Engineering Conference',
    year: '2025',
    "abstract": 'Comparação de performance entre Pandas e Polars para pipelines de ETL em larga escala.',
    link: '#'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: [
    // Container
    "max-w-2xl mx-auto",
    // Espaçamento
    "px-4 py-6"].join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold mb-2",
    style: {
      color: 'var(--text-main)'
    }
  }, "Research"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Publica\xE7\xF5es acad\xEAmicas e pesquisas em andamento.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4"
  }, papers.map(function (paper, i) {
    return /*#__PURE__*/React.createElement("article", {
      key: i,
      className: [
      // Base
      "card p-5",
      // Interação
      "hover:border-[var(--primary)]/50 transition-colors"].join(" ")
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: [
      // Layout
      "flex items-center justify-center",
      // Dimensões
      "size-10",
      // Forma
      "rounded shrink-0"].join(" "),
      style: {
        backgroundColor: isDarkMode ? 'rgba(239,68,68,0.1)' : '#fef2f2',
        border: isDarkMode ? '1px solid rgba(239,68,68,0.2)' : '1px solid #fecaca',
        color: '#ef4444'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-outlined"
    }, "description")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-base font-bold leading-tight mb-1",
      style: {
        color: 'var(--text-main)'
      }
    }, paper.title), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-xs",
      style: {
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", null, paper.venue), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, paper.year)))), /*#__PURE__*/React.createElement("p", {
      className: "text-sm mb-3",
      style: {
        color: 'var(--text-secondary)'
      }
    }, paper["abstract"]), /*#__PURE__*/React.createElement("a", {
      href: paper.link,
      className: [
      // Layout
      "inline-flex items-center gap-1",
      // Tipografia
      "text-xs font-medium",
      // Interação
      "hover:underline"].join(" "),
      style: {
        color: 'var(--primary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-outlined text-[14px]"
    }, "open_in_new"), "Ver paper completo"));
  })));
};
