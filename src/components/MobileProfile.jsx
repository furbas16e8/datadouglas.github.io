/*
 * components/MobileProfile.jsx - Versão mobile do perfil
 * Douglas Furbino - Economista e Cientista de Dados
 */

const MobileProfile = ({ isDarkMode }) => (
  <section 
    className="lg:hidden p-4 border-b sm:rounded-lg sm:border sm:mb-0"
    style={{ 
      backgroundColor: isDarkMode ? 'rgba(26,26,30,0.5)' : 'var(--surface)',
      borderColor: 'var(--border)'
    }}
  >
    <div className="flex items-start gap-4">
      <div className="relative group cursor-pointer">
        <div 
          className="size-16 rounded-full bg-cover bg-center border-2"
          role="img"
          aria-label="Foto de perfil de Douglas Furbino"
          style={{ 
            backgroundImage: "url('./assets/img/perfil.jpeg')",
            borderColor: isDarkMode ? 'rgba(0,255,128,0.2)' : 'rgba(16,185,129,0.2)'
          }}
        ></div>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold leading-tight truncate" style={{ color: 'var(--text-main)' }}>Douglas Furbino</h2>
        <p className="text-xs font-body mt-1" style={{ color: 'var(--text-secondary)' }}>
          Machine Learning Engineer passionate about turning complex data into actionable insights.
        </p>
      </div>
    </div>
  </section>
);
