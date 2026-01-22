/*
 * components/MobileProfile.jsx - Versão mobile do perfil
 * Douglas Furbino - Economista e Cientista de Dados
 */

const MobileProfile = ({ isDarkMode }) => (
  <section 
    className={[
      // Visibilidade
      "lg:hidden",
      // Espaçamento
      "p-4",
      // Borda
      "border-b sm:rounded-lg sm:border sm:mb-0"
    ].join(" ")}
    style={{ 
      backgroundColor: isDarkMode ? 'rgba(26,26,30,0.5)' : 'var(--surface)',
      borderColor: 'var(--border)'
    }}
  >
    <div className="flex items-start gap-4">
      {/* Avatar */}
      <div className="relative group cursor-pointer">
        <div 
          className={[
            // Dimensões
            "size-16",
            // Forma
            "rounded-full",
            // Background
            "bg-cover bg-center",
            // Borda
            "border-2"
          ].join(" ")}
          role="img"
          aria-label="Foto de perfil de Douglas Furbino"
          style={{ 
            backgroundImage: "url('./assets/img/perfil.jpeg')",
            borderColor: isDarkMode ? 'rgba(0,255,128,0.2)' : 'rgba(16,185,129,0.2)'
          }}
        ></div>
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h2 
          className="text-xl font-bold leading-tight truncate" 
          style={{ color: 'var(--text-main)' }}
        >
          Douglas Furbino
        </h2>
        <p 
          className="text-xs font-body mt-1" 
          style={{ color: 'var(--text-secondary)' }}
        >
          Machine Learning Engineer passionate about turning complex data into actionable insights.
        </p>
      </div>
    </div>
  </section>
);
