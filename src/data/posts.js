/*
 * data/posts.js - Dados dos posts do feed
 * Douglas Furbino - Economista e Cientista de Dados
 */

// Dados de exemplo para o feed de atividades
const POSTS_DATA = [
  {
    title: 'Open Source: Life Analytics Pipeline',
    time: 'Agora',
    category: 'Data Engineering',
    content: 'Publiquei os scripts de extração do meu projeto pessoal de análise de dados do YouTube. Com destaque para algoritmo de "burst detection" que identifica sessões de consumo de Shorts usando uma janela deslizante de 60 segundos. ',
    contentExpanded: 'A lógica usa threshold dinâmico (5 vídeos normalmente, 3 se o anterior era Short) para capturar o padrão comportamental de scroll infinito típico do formato curto. Os dados vêm do Google Takeout e são processados em pipeline Python puro, sem dependências externas.',
    codeFileName: 'burst_detection.py',
    codeAltFileName: 'watch-history.json',
    codeLink: { text: 'Ver no GitHub', url: 'https://github.com/furbas16e8/life-analytics-public' },
    code: `<span class="text-gray-500"># Detecção de Shorts via padrão de Burst</span>
<span class="text-pink-400">def</span> detect_burst_shorts(data):
    <span class="text-pink-400">for</span> i, row <span class="text-pink-400">in</span> enumerate(data):
        <span class="text-gray-500"># Janela deslizante de 60 segundos</span>
        count = count_videos_in_window(
            data, i, BURST_WINDOW_SECONDS
        )
        <span class="text-gray-500"># Threshold dinâmico: 5 ou 3</span>
        threshold = <span class="text-amber-400">3</span> <span class="text-pink-400">if</span> prev_is_short <span class="text-pink-400">else</span> <span class="text-amber-400">5</span>
        <span class="text-pink-400">if</span> count >= threshold:
            row[<span class="text-green-400">'is_short'</span>] = <span class="text-amber-400">True</span>`,
    codeAlt: `<span class="text-gray-500">// Estrutura do Google Takeout</span>
[{
  <span class="text-cyan-400">"header"</span>: <span class="text-green-400">"YouTube"</span>,
  <span class="text-cyan-400">"title"</span>: <span class="text-green-400">"Watched POV você acordou cedo"</span>,
  <span class="text-cyan-400">"titleUrl"</span>: <span class="text-green-400">"https://youtube.com/..."</span>,
  <span class="text-cyan-400">"time"</span>: <span class="text-green-400">"2024-10-16T10:00:05.000Z"</span>,
  <span class="text-cyan-400">"subtitles"</span>: [{
    <span class="text-cyan-400">"name"</span>: <span class="text-green-400">"Memes BR"</span>
  }]
}]`
  },
  {
    title: 'Predictive Market Volatility Model',
    time: '2h ago',
    category: 'Market Analysis',
    content: 'Deployed a new LSTM model to predict crypto volatility indices. Achieving 87% accuracy on test sets compared to the baseline ARIMA model.',
    chart: true
  },
  {
    title: 'Optimizing Data Pipelines',
    time: '5h ago',
    category: 'Data Engineering',
    content: 'Refactored the ETL pipeline to use Polars instead of Pandas. Saw a 12x speed improvement on the daily ingestion jobs.',
    code: `<span class="text-pink-400">import</span> polars <span class="text-pink-400">as</span> pl
<span class="text-gray-500"># Lazy evaluation for memory efficiency</span>
df = pl.scan_csv(<span class="text-green-400">"large_dataset.csv"</span>)
    .filter(pl.col(<span class="text-green-400">"status"</span>) == <span class="text-green-400">"active"</span>)
    .groupby(<span class="text-green-400">"region"</span>)
    .agg([
        pl.col(<span class="text-green-400">"sales"</span>).sum().alias(<span class="text-green-400">"total"</span>)
    ])
    .collect()`
  },
  {
    title: 'Multi-Agent RL Research',
    time: '1d ago',
    category: 'Research',
    content: "Just published a new paper on arXiv regarding reinforcement learning in multi-agent environments. Check it out if you're into game theory! #AI #Research",
    attachment: { name: 'Multi-Agent RL Optimization.pdf', size: '2.4 MB • PDF Document' }
  }
];


// Dados pré-definidos para Activity Grid (opacidades estáveis)
const ACTIVITY_DATA = [
  10, 30, 10, 60, 10, 20, 10, 50, 10, 80, 20, 40, 10, 10, 20, 90, 30, 10,
  60, 20, 40, 10, 10, 30, 70, 10, 20, 50, 80, 40, 10, 20, 90, 30, 10, 10,
  60, 20, 80, 40, 10, 50, 30, 70, 10, 20, 90, 50, 10, 20, 40, 80, 10, 60,
  30, 70, 10, 30, 10, 60, 10, 20, 10, 50, 10, 80, 20, 40, 10, 10, 20, 90,
  30, 10, 60, 20, 40, 10, 10, 30, 70, 10, 20, 50, 80, 40, 10, 20, 90, 30
];
