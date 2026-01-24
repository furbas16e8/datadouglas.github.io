/*
 * pages/Dashboard.jsx - Página inicial (feed de posts)
 * Douglas Furbino - Economista e Cientista de Dados
 */

const Dashboard = ({ isDarkMode }) => (
  <div 
    className={[
      // Container
      "max-w-[720px] mx-auto", 
      // Espaçamento
      "py-6 sm:px-4",
      // Layout
      "flex flex-col gap-4"
    ].join(" ")}
  >
    <MobileProfile isDarkMode={isDarkMode} />
    
    {POSTS_DATA.map((post, i) => (
      <PostArticle key={i} isDarkMode={isDarkMode} {...post} />
    ))}
    
    {/* End of Feed */}
    <div 
      className={[
        // Dimensões
        "h-20",
        // Layout
        "flex items-center justify-center",
        // Tipografia
        "text-xs"
      ].join(" ")} 
      style={{ color: 'var(--text-muted)' }}
    >
      <p>End of Feed</p>
    </div>
  </div>
);
