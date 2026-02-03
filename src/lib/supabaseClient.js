/*
 * lib/supabaseClient.js - Cliente Supabase com inicialização lazy
 * Douglas Furbino - Economista e Cientista de Dados
 * 
 * Inicializa o cliente apenas quando solicitado, garantindo que
 * todas as dependências (window.supabase SDK, window.ENV) estejam carregadas.
 */

/**
 * Obtém ou cria o cliente Supabase
 * @returns {Object|null} Cliente Supabase ou null se não for possível criar
 */
const getSupabaseClient = () => {
  // Se já existe um cliente criado, retorna ele
  if (window._supabaseClient) {
    return window._supabaseClient;
  }

  // Verifica se o SDK do Supabase está disponível
  if (typeof window === 'undefined' || !window.supabase) {
    console.error('[Supabase] SDK não encontrado. Certifique-se de carregar:');
    console.error('  <script src="https://unpkg.com/@supabase/supabase-js@2.91.1/dist/umd/supabase.min.js"></script>');
    return null;
  }

  // Verifica se as variáveis de ambiente estão disponíveis
  if (!window.ENV || !window.ENV.SUPABASE_URL || !window.ENV.SUPABASE_KEY) {
    console.error('[Supabase] Variáveis de ambiente não encontradas. Certifique-se de:');
    console.error('  1. Carregar env.js antes deste script');
    console.error('  2. Verificar se window.ENV.SUPABASE_URL e window.ENV.SUPABASE_KEY existem');
    return null;
  }

  try {
    // Cria o cliente
    const client = window.supabase.createClient(
      window.ENV.SUPABASE_URL,
      window.ENV.SUPABASE_KEY
    );
    
    // Armazena para reuso
    window._supabaseClient = client;
    console.log('[Supabase] Cliente inicializado com sucesso');
    
    return client;
  } catch (error) {
    console.error('[Supabase] Erro ao criar cliente:', error);
    return null;
  }
};

// Exporta a função
window.getSupabaseClient = getSupabaseClient;
