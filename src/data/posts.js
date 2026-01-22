/*
 * data/posts.js - Dados dos posts do feed
 * Douglas Furbino - Economista e Cientista de Dados
 */

// Dados de exemplo para o feed de atividades
const POSTS_DATA = [
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
