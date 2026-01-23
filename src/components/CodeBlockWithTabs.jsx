/*
 * components/CodeBlockWithTabs.jsx - Bloco de código com abas
 * Douglas Furbino - Economista e Cientista de Dados
 */

const CodeBlockWithTabs = ({ code, codeAlt, codeFileName, codeAltFileName, codeLink }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  
  const tabs = [
    { name: codeFileName || 'code.py', content: code },
  ];
  
  if (codeAlt) {
    tabs.push({ name: codeAltFileName || 'data.json', content: codeAlt });
  }
  
  return (
    <div className="code-block mb-3">
      {/* Tabs Header */}
      <div 
        className={[
          // Layout
          "flex items-center justify-between",
          // Espaçamento
          "px-3 py-2",
          // Visual
          "bg-white/5 border-b border-white/5"
        ].join(" ")}
      >
        <div className="flex gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={[
                "text-xs px-2 py-1 rounded transition-colors",
                activeTab === index 
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:text-gray-300"
              ].join(" ")}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="size-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="size-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>
      
      {/* Code Content */}
      <div 
        className={[
          // Espaçamento
          "p-3",
          // Scroll
          "overflow-x-auto",
          // Tipografia
          "text-gray-300 leading-relaxed font-mono text-xs"
        ].join(" ")}
      >
        <pre><code dangerouslySetInnerHTML={{ __html: tabs[activeTab].content }}></code></pre>
      </div>
      
      {/* Footer with link */}
      <div className="px-3 py-2 bg-white/5 border-t border-white/5 text-center">
        {codeLink ? (
          <a 
            href={codeLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              // Tipografia
              "text-[10px] font-bold uppercase tracking-wider",
              // Interação
              "hover:text-white transition-colors"
            ].join(" ")} 
            style={{ color: 'var(--primary)' }}
          >
            {codeLink.text}
          </a>
        ) : (
          <button 
            className={[
              // Tipografia
              "text-[10px] font-bold uppercase tracking-wider",
              // Interação
              "hover:text-white transition-colors"
            ].join(" ")} 
            style={{ color: 'var(--primary)' }}
          >
            View Full Gist
          </button>
        )}
      </div>
    </div>
  );
};
