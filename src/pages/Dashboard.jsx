/*
 * pages/Dashboard.jsx - Página inicial (feed de posts)
 * Douglas Furbino - Economista e Cientista de Dados
 */

const Dashboard = ({ isDarkMode }) => (
  <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
    <MobileProfile isDarkMode={isDarkMode} />
    
    {POSTS_DATA.map((post, i) => (
      <PostArticle key={i} isDarkMode={isDarkMode} {...post} />
    ))}
    
    <div className="h-20 flex items-center justify-center text-xs" style={{ color: 'var(--text-muted)' }}>
      <p>End of Feed</p>
    </div>
  </div>
);
