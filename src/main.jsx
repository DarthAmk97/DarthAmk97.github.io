import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/space-grotesk';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import gsap from 'gsap';
import {
  ArrowUpRight,
  Atom,
  Brain,
  CaretLeft,
  CaretRight,
  Buildings,
  Code,
  DownloadSimple,
  GithubLogo,
  GlobeHemisphereWest,
  Graph,
  LinkedinLogo,
  Lightning,
  List,
  Newspaper,
  PenNib,
  RocketLaunch,
  SquaresFour,
  Stack,
  TerminalWindow,
  TreeStructure,
  X
} from '@phosphor-icons/react';
import { FaAws } from 'react-icons/fa';
import {
  SiAlibabacloud,
  SiAlibabadotcom,
  SiDocker,
  SiElectron,
  SiFastapi,
  SiGooglebigquery,
  SiGooglecloud,
  SiHuggingface,
  SiKeras,
  SiLangchain,
  SiMapbox,
  SiNextdotjs,
  SiOllama,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPytorch,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiStripe,
  SiTensorflow,
  SiTypescript,
  SiUdacity
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import './styles.css';
import { blogPosts } from './blogPosts.js';


const appBase = import.meta.env.BASE_URL || '/';
const cleanBase = appBase.endsWith('/') ? appBase.slice(0, -1) : appBase;
const publicUrl = (path) => `${appBase}${String(path).replace(/^\/+/, '')}`;
const stripBasePath = (pathname) => {
  if (!cleanBase || cleanBase === '/') return pathname || '/';
  if (pathname === cleanBase) return '/';
  if (pathname.startsWith(`${cleanBase}/`)) return pathname.slice(cleanBase.length) || '/';
  return pathname || '/';
};
const browserPath = (path) => {
  if (!cleanBase || cleanBase === '/') return path;
  return path === '/' ? `${cleanBase}/` : `${cleanBase}${path}`;
};

const links = {
  github: 'https://github.com/DarthAmk97',
  linkedin: 'https://linkedin.com/in/amkbelievesinml',
  contact: 'mailto:abdullah_mujeeb97@hotmail.com?subject=Have%20a%20challenge%3F',
  huggingface: 'https://huggingface.co/amkkk',
  substack: 'https://navigatingnoise.substack.com/',
  hackernoon: 'https://hackernoon.com/u/navigatingnoise',
  resume: publicUrl('resume/Abdullah_Khawaja_Resume_v0.1.pdf'),
  sortMoments: 'https://sortmoments.com/',
  sortMomentsGithub: 'https://github.com/DarthAmk97/sort-moments',
  weaveSkip: 'https://www.weaveskip.com/',
  neighbourFit: 'https://neighbourfit.co.uk',
  products: browserPath('/portfolio')
};

const brandIcons = {
  github: publicUrl('assets/icons/github.svg'),
  linkedin: publicUrl('assets/icons/linkedin.svg'),
  substack: publicUrl('assets/icons/substack.svg'),
  hackernoon: publicUrl('assets/icons/hackernoon.svg'),
  huggingface: publicUrl('assets/icons/huggingface.svg'),
  navigatingNoise: publicUrl('assets/icons/navigating-noise.png'),
  sortMoments: publicUrl('assets/icons/sortmoments-black.png'),
  neighbourFit: publicUrl('assets/icons/neighbourfit.png'),
  weaveSkip: publicUrl('assets/icons/weaveskip.png'),
  dpd: publicUrl('assets/icons/dpd.svg'),
  daraz: publicUrl('assets/icons/daraz.png'),
  alibaba: publicUrl('assets/icons/alibaba.svg'),
  dastgyr: publicUrl('assets/icons/dastgyr.jpg'),
  xgboost: publicUrl('assets/icons/xgboost.svg'),
  unsloth: publicUrl('assets/icons/unsloth.png'),
  avatar: publicUrl('assets/avatar-amk.png'),
  avatarHead: publicUrl('assets/avatar-amk-headshot.png')
};

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/papers', label: 'Papers' },
  { path: '/blogs', label: 'Blogs' },
  { path: '/resume', label: 'Resume' }
];

const techStack = [
  'Python', 'PyTorch', 'TensorFlow', 'Keras', 'XGBoost', 'scikit-learn',
  'React', 'TypeScript', 'Electron', 'SQL', 'Docker', 'GCP', 'Vertex AI',
  'BigQuery', 'AWS', 'Alibaba Cloud', 'LangChain', 'OpenAI', 'Ollama', 'Unsloth'
];

const makeTechInitials = (name) => name
  .replace(/[+.&/]/g, ' ')
  .split(/\s|-/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0])
  .join('')
  .toUpperCase();

const techIcons = {
  Python: { Icon: SiPython, color: '#3776AB' },
  PyTorch: { Icon: SiPytorch, color: '#EE4C2C' },
  TensorFlow: { Icon: SiTensorflow, color: '#FF6F00' },
  Keras: { Icon: SiKeras, color: '#D00000' },
  XGBoost: { src: brandIcons.xgboost, color: '#F26D21' },
  'scikit-learn': { Icon: SiScikitlearn, color: '#F7931E' },
  React: { Icon: SiReact, color: '#61DAFB' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  Electron: { Icon: SiElectron, color: '#9FEAF9' },
  SQL: { Icon: TbSql, color: '#7DD3FC' },
  Docker: { Icon: SiDocker, color: '#2496ED' },
  GCP: { Icon: SiGooglecloud, color: '#4285F4' },
  'Vertex AI': { Icon: SiGooglecloud, color: '#34A853' },
  BigQuery: { Icon: SiGooglebigquery, color: '#669DF6' },
  AWS: { Icon: FaAws, color: '#FF9900' },
  'Alibaba Cloud': { Icon: SiAlibabacloud, color: '#FF6A00' },
  LangChain: { Icon: SiLangchain, color: '#7AF7CF' },
  OpenAI: { Icon: SiOpenai, color: '#74E4C8' },
  Ollama: { Icon: SiOllama, color: '#E8E1D0' },
  Unsloth: { src: brandIcons.unsloth, color: '#B7F36A' },
  'Next.js': { Icon: SiNextdotjs, color: '#F7F0E0' },
  Prisma: { Icon: SiPrisma, color: '#8EB6C9' },
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1' },
  Redis: { Icon: SiRedis, color: '#FF4438' },
  Stripe: { Icon: SiStripe, color: '#635BFF' },
  FastAPI: { Icon: SiFastapi, color: '#009688' },
  PostGIS: { Icon: SiPostgresql, color: '#8DD6A5' },
  Mapbox: { Icon: SiMapbox, color: '#9DD4FF' },
  Gemma: { Icon: SiGooglecloud, color: '#F4B400' },
  Qwen: { Icon: SiAlibabacloud, color: '#FF6A00' },
  GGUF: { Icon: SiHuggingface, color: '#FFD21E' },
  OAuth: { Icon: Code, color: '#C8FF83' },
  LoRA: { Icon: Atom, color: '#C5A3FF' },
  'Fine-tuning': { Icon: Brain, color: '#C5A3FF' },
  'Tool Calls': { Icon: Code, color: '#7DD3FC' },
  Transformer: { Icon: Brain, color: '#B7F36A' },
  DeepFM: { Icon: Brain, color: '#FF6A00' },
  LTR: { Icon: Graph, color: '#FF8A1F' },
  'Search Tips': { Icon: Graph, color: '#7DD3FC' },
  Teaching: { Icon: SiUdacity, color: '#02B3E4' },
  'AI Programming': { Icon: SiUdacity, color: '#02B3E4' }
};

function TechChip({ name }) {
  const entry = techIcons[name] || {};
  const Icon = entry.Icon;
  const color = entry.color || '#F59E2E';

  return (
    <span className={`tech-chip ${Icon || entry.src ? 'has-icon' : 'has-mark'}`} data-tech={name} style={{ '--tech-color': color }}>
      {entry.src ? <img src={entry.src} alt="" aria-hidden="true" /> : Icon ? <Icon aria-hidden="true" /> : <strong aria-hidden="true">{makeTechInitials(name)}</strong>}
      <em>{name}</em>
    </span>
  );
}

const personalProjects = [
  {
    key: 'sort-moments',
    name: 'Sort Moments',
    tag: 'Event photos, sorted locally',
    icon: 'SM',
    iconPath: brandIcons.sortMoments,
    image: publicUrl('assets/project-device-shot.jpg'),
    link: links.sortMoments,
    source: links.sortMomentsGithub,
    tech: ['Python', 'PyQt6', 'RetinaFace', 'InsightFace', 'DirectML'],
    domain: 'event photo sorting',
    solves: 'Event folders become work nobody asked for: thousands of images, repeats, group shots, and people waiting for their pictures.',
    technical: 'Face detection, embeddings, clustering, DirectML where it helps, and a human review step because the model should not pretend it knows every face.'
  },
  {
    key: 'weaveskip',
    name: 'WeaveSkip',
    tag: 'One post, many drafts',
    icon: 'WS',
    iconPath: brandIcons.weaveSkip,
    image: publicUrl('assets/project-recommender-card.jpg'),
    link: links.weaveSkip,
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'OAuth', 'Stripe'],
    domain: 'content distribution',
    solves: 'Write once, then stop doing the same boring edit six times for six platforms.',
    technical: 'Next.js, queues, OAuth, BYOK, schedules, draft states, and review before anything goes out.'
  },
  {
    key: 'neighbourfit',
    name: 'NeighbourFit',
    tag: 'Area check before a viewing',
    icon: 'NF',
    iconPath: brandIcons.neighbourFit,
    image: publicUrl('assets/neighbourfit-poster.png'),
    link: links.neighbourFit,
    tech: ['React', 'TypeScript', 'FastAPI', 'PostGIS', 'Mapbox', 'OpenAI'],
    domain: 'postcode fit',
    solves: 'A flat is not just the flat. The commute, price, area, and daily routine matter before you lose a Saturday viewing it.',
    technical: 'React, FastAPI, PostGIS, Mapbox, preference scoring, maps, saved lists, and summaries that say where the data gets weak.'
  },
  {
    key: 'hf-releases',
    name: 'Hugging Face Releases',
    tag: 'Small models I can ship',
    icon: 'HF',
    iconPath: brandIcons.huggingface,
    image: publicUrl('assets/profile-visual.png'),
    link: links.huggingface,
    tech: ['Gemma', 'Qwen', 'LoRA', 'Ablation', 'Distillation', 'GGUF'],
    domain: 'small model releases',
    solves: 'A small model is only interesting if someone else can run it and see what changed.',
    technical: 'Gemma, Qwen, LoRA, ablation, distillation, quantization, GGUF files, and notes that do not hide the rough parts.'
  }
];

const workProjects = [
  {
    key: 'dpd-churn',
    name: 'DPD Churn Meta-Ensemble',
    tag: '$650K retained revenue',
    domain: 'customer retention',
    company: 'DPD Group',
    icon: 'DPD',
    iconPath: brandIcons.dpd,
    image: publicUrl('assets/project-ml-comic.jpg'),
    tech: ['LightGBM', 'WaveNet', 'Logistic Hazard', 'XGBoost', 'Transformer'],
    solves: 'Warn retention teams early enough that the account is not already gone.',
    technical: 'Dual LightGBMs, WaveNet, logistic hazard, and a hybrid XGBoost-Transformer ensemble. 64% of flagged accounts were true churners; 67% of total churn was caught.'
  },
  {
    key: 'dpd-forecasting',
    name: 'DPD Volume Forecasting',
    tag: '+8% beat human benchmark',
    domain: 'volume forecasting',
    company: 'DPD Group',
    icon: 'DPD',
    iconPath: brandIcons.dpd,
    image: publicUrl('assets/project-recommender-card.jpg'),
    tech: ['Mixture of Experts', 'RNN', 'WaveNet', 'Event Lags'],
    solves: 'Parcel volume moves with events, holidays, and local habits. A fixed lag will miss too much.',
    technical: 'Mixture of experts, RNNs, WaveNet-style temporal layers, event lags, and daily forecasts across 80+ hubs.'
  },
  {
    key: 'daraz-rank',
    name: 'Daraz Ranking Systems',
    tag: 'Ranking, search, LTR',
    domain: 'marketplace ranking',
    company: 'Alibaba Group / Daraz',
    icon: <SiAlibabadotcom aria-hidden="true" />,
    iconPath: null,
    image: publicUrl('assets/project-recommender.jpg'),
    tech: ['DeepFM', 'LTR', 'Search Tips', 'Feature Engineering', 'A/B Testing'],
    solves: 'Ranking had to help buyers find the right product, not just make a dashboard look alive.',
    technical: 'DeepFM, LTR re-rank, Query2Query cleanup, Trending Now, dMart recommendations, Search Tips, negative sampling, and cold-start recall.'
  },
  {
    key: 'dastgyr-swing',
    name: 'Dastgyr Top For You',
    tag: '+22% AOV uplift',
    domain: 'B2B recommender',
    company: 'Dastgyr',
    icon: 'Dastgyr',
    iconPath: brandIcons.dastgyr,
    image: publicUrl('assets/project-device-shot.jpg'),
    tech: ['SWING CF', 'Experimentation', 'Roadmapping'],
    solves: 'Small shops reorder in patterns. The basket should learn from that instead of starting from zero every time.',
    technical: 'SWING collaborative filtering from scratch, +1.44% basket-size uplift, +22% AOV uplift, plus AI roadmap work.'
  },
  {
    key: 'dpd-chatbot',
    name: 'DPD Chatbot Cost Cut',
    tag: 'Cheaper serving path',
    domain: 'chatbot serving cost',
    company: 'DPD Group',
    icon: 'DPD',
    iconPath: brandIcons.dpd,
    image: publicUrl('assets/profile-visual.png'),
    tech: ['Gemma', 'Vertex AI', 'Fine-tuning', 'Tool Calls', 'Databooks'],
    solves: 'Cut the serving bill without breaking the bits people already relied on.',
    technical: 'Gemma 4 26B A4B IT prototype/pilot, 20K+ internal conversations, tool calls, databooks, Vertex AI inference, and projected lower serving spend.'
  },
  {
    key: 'udacity-ai-python',
    name: 'Udacity AI Programming',
    tag: 'Session lead',
    domain: 'AI education',
    company: 'Udacity',
    icon: <SiUdacity aria-hidden="true" />,
    iconPath: null,
    image: publicUrl('assets/profile-visual.png'),
    tech: ['Python', 'Teaching', 'AI Programming'],
    solves: 'Helped learners turn Python and ML basics into code that actually runs.',
    technical: 'Live sessions, Python, ML foundations, debugging help, and explanations small enough to use.'
  }
];

const interestCards = [
  { title: 'Recommenders', text: 'Daraz feeds, search, baskets, LTR, and the consumer clicking or buying, depending on what we were trying to move.', icon: Graph },
  { title: 'ML systems', text: 'Churn, forecasts, model serving, and the annoying gap between a decent notebook and a decision someone can act on.', icon: Brain },
  { title: 'LLMs', text: 'Fine-tuning smaller open-source models for the DPD chatbot, mostly to see how much closed-model spend we can avoid.', icon: Atom },
  { title: 'Local ML', text: 'Sort Moments thinking: private photos, local model, fewer files being thrown around.', icon: TerminalWindow },
  { title: 'Writing', text: 'Navigating Noise is where I slow down the AI claim before I accidentally start believing it.', icon: PenNib }
];

const aboutDebugCards = [
  {
    id: 'defaults',
    tab: 'defaults',
    command: 'node ./abdullah --print-defaults',
    title: 'Defaults',
    proof: 'Daraz ranking, DPD forecasting, Sort Moments on-device.',
    lines: [
      'Start with the user problem, then the model.',
      'Use the smaller model if it does the job.',
      'The interface is part of the system. People only use what the product lets them use.'
    ]
  },
  {
    id: 'failure-modes',
    tab: 'failure modes',
    command: 'grep -n "failure-mode" production.log',
    title: 'Failure modes',
    proof: 'Churn thresholds, postcode notes, model release notes.',
    lines: [
      'Can over-explain when the system is messy.',
      'Does not enjoy vague dashboards or AI demos with no eval set.',
      'Will ask where the number came from. It usually helps.'
    ]
  },
  {
    id: 'working-with-me',
    tab: 'working with me',
    command: 'cat collaboration.md',
    title: 'Working with me',
    proof: 'Product, ML, writing, and fewer pretty slides.',
    lines: [
      'Bring the constraint, the data shape, and what happens to the user.',
      'If there is a metric, show it early. If there is not, say we are guessing.',
      'Protect the user\'s time before protecting the architecture diagram.'
    ]
  }
];

const resultHighlights = [
  { domain: 'customer retention', label: 'saved', value: '$650K', detail: 'churn model tied to retained revenue', projectKey: 'dpd-churn' },
  { domain: 'volume forecasting', label: 'beat human benchmark', value: '+8%', detail: 'against a 12-year human baseline', projectKey: 'dpd-forecasting' },
  { domain: 'marketplace ranking', label: 'conversion lift', value: '~34%', detail: 'Daraz LTR re-rank over baseline', projectKey: 'daraz-rank' },
  { domain: 'chatbot serving cost', label: 'cost pressure', value: '-65%', detail: 'projected spend after model replacement', projectKey: 'dpd-chatbot' }
];

const openIssues = [
  {
    id: '#001',
    title: 'Recommendation systems are memory systems.',
    body: 'If the ranker forgets context, it becomes an expensive shuffle button.',
    tag: 'recsys'
  },
  {
    id: '#002',
    title: 'Small models need honest interfaces.',
    body: 'The useful part is knowing when the answer is cheap, good enough, or about to waste someone’s time.',
    tag: 'models'
  },
  {
    id: '#003',
    title: 'Local-first ML is not nostalgia.',
    body: 'Some data should stay on the machine it came from. That is not old fashioned. It is the point.',
    tag: 'privacy'
  },
  {
    id: '#004',
    title: 'AI writing needs checking.',
    body: 'Navigating Noise is where I slow the noise down and ask what is actually there.',
    tag: 'writing'
  }
];

const activityLog = [
  'Fine-tuned Gemma on customer-chatbot conversations with tool calls and databooks.',
  'Rebuilt recommender ranking when the old baseline stopped being enough.',
  'Built Sort Moments because 4,000 event photos should not become a weekend job.',
  'Turned neighbourhood search into a fit problem instead of a blind scroll.',
  'Write Navigating Noise for people trying to understand AI without pretending every tool is a revolution.'
];

const profileStats = [
  ['base', 'London / ML systems / show the numbers'],
  ['work', 'recommenders, forecasting, local-first ML'],
  ['now', 'making AI work after the demo'],
  ['writing', 'Navigating Noise + HackerNoon'],
  ['usual answer', 'show me the eval, then the interface']
];

const pinnedWork = [
  { label: 'Sort Moments', meta: 'local face clustering for event photos', target: links.sortMoments },
  { label: 'NeighbourFit', meta: 'postcode context before a viewing', target: links.neighbourFit },
  { label: 'WeaveSkip', meta: 'one source, many platform drafts', target: links.weaveSkip },
  { label: 'DPD churn', meta: '$650K saved from retained accounts', path: '/portfolio' }
];

const guestbookStamps = [
  {
    id: 'recsys',
    label: 'recsys survivor',
    output: 'Saved. You have seen ranking systems, trade-offs, and someone asking why CTR is not magic.'
  },
  {
    id: 'model',
    label: 'model handler',
    output: 'Saved. You know the demo is the easy bit. The hard bit is knowing when the output should be trusted.'
  },
  {
    id: 'noise',
    label: 'noise reader',
    output: 'Saved. You came for AI signal and left with less noise.'
  }
];

const maintainerDispatches = [
  {
    id: 'release',
    lane: 'release',
    command: 'gh release view shipped-work',
    title: 'Work that made it into use.',
    summary: 'DPD now. Alibaba/Daraz, Dastgyr, and Udacity before. The boring test is still the right one: did it help someone do the job?',
    proof: '$650K retained revenue, +8% forecast-accuracy lift, ~34% LTR conversion lift, projected 65% lower chatbot serving spend',
    status: 'live',
    work: 'DPD / Daraz / Dastgyr / chatbot cost work'
  },
  {
    id: 'personal',
    lane: 'personal',
    command: 'git switch problem-first-development',
    title: 'If a problem keeps annoying me, it usually becomes a build.',
    summary: 'Event photos became Sort Moments. Rewriting posts became WeaveSkip. Property-search guesswork became NeighbourFit. AI noise became Navigating Noise.',
    proof: 'local-first ML, posting systems, postcode context, writing',
    status: 'active',
    work: 'Sort Moments / WeaveSkip / NeighbourFit / writing'
  },
  {
    id: 'reading',
    lane: 'field notes',
    command: 'cat /notes/ai-noise.log',
    title: 'I write when the noise gets too loud.',
    summary: 'Navigating Noise is me trying to understand what is actually happening in AI, without pretending every tool is a revolution.',
    proof: 'Substack + HackerNoon',
    status: 'writing',
    work: 'Navigating Noise / HackerNoon'
  },
  {
    id: 'now',
    lane: 'open issue',
    command: 'gh issue list --label current-obsession',
    title: 'Current problem: make ML tools easier to trust.',
    summary: 'Less magic talk. More evals, cost control, and interfaces that do not hide the messy bit.',
    proof: 'model checks, interface trust, cheaper inference',
    status: 'building',
    work: 'Small models / eval loops / product trust'
  }
];

const portfolioStoryBeats = [
  {
    id: 'marketplace',
    commit: 'commit 01',
    title: 'Marketplace ranking made me suspicious.',
    period: 'Daraz / Dastgyr',
    body: 'CTR, conversion, basket size, discounts, inventory, country quirks. Recommenders were the first place I learned that a model can be technically right and still not help the product.',
    result: '~34% LTR conversion lift, +22% AOV, 50+ A/B tests',
    command: 'git log --grep ranking'
  },
  {
    id: 'logistics',
    commit: 'commit 02',
    title: 'Logistics made the suspicion measurable.',
    period: 'DPD',
    body: 'Forecasting and churn do not care about demo energy. They care about Monday morning, event lags, hubs, customer behaviour, and whether the person using the output can act in time.',
    result: '$650K saved, +8% against a 12-year human baseline',
    command: 'git diff notebook..production'
  },
  {
    id: 'chatbot',
    commit: 'commit 03',
    title: 'Chatbots made model cost painfully visible.',
    period: 'DPD chatbot cost work',
    body: 'Replacing a serving path means watching quality, latency, cost, and the person waiting on the answer all at once.',
    result: 'projected 65% lower chatbot spend',
    command: 'pnpm test --quality-and-cost'
  },
  {
    id: 'personal',
    commit: 'commit 04',
    title: 'Personal projects start when the annoyance repeats.',
    period: 'Sort Moments / WeaveSkip / NeighbourFit / writing',
    body: 'Event photos, platform posting, property search, and AI noise all kept asking for the same thing: a smaller tool that removes the repetitive bit.',
    result: 'local-first tools, writing, and less pretending',
    command: 'open ./personal-obsessions'
  }
];

const paletteActions = [
  { id: 'home', label: 'Home', detail: 'DarthAmk97 / README.md', path: '/', keys: 'home readme whoami root' },
  { id: 'about', label: 'About', detail: 'How I work, stack, links, and GitHub activity', path: '/about', keys: 'about manual principles whoami' },
  { id: 'portfolio', label: 'Portfolio', detail: 'Work, side projects, and case notes', path: '/portfolio', keys: 'portfolio projects cases work builds' },
  { id: 'papers', label: 'Papers I love', detail: 'Generalization, benchmark variance, model behaviour, anthropomorphism, and synthetic-user papers', path: '/papers', keys: 'papers research ml recommender llm' },
  { id: 'blogs', label: 'Blogs', detail: 'Navigating Noise, rewritten for this site', path: '/blogs', keys: 'blogs substack navigating noise writing articles' },
  { id: 'resume-page', label: 'Resume', detail: 'Read the PDF before downloading', path: '/resume', keys: 'resume cv pdf' },
  { id: 'resume-download', label: 'Download resume.pdf', detail: 'Save the PDF', href: links.resume, download: true, keys: 'download resume pdf cv' },
  { id: 'github', label: 'Open GitHub', detail: 'DarthAmk97', href: links.github, keys: 'github code repositories' },
  { id: 'linkedin', label: 'Open LinkedIn', detail: 'amkbelievesinml', href: links.linkedin, keys: 'linkedin work profile' },
  { id: 'substack', label: 'Open Navigating Noise', detail: 'AI noise, slowed down', href: links.substack, keys: 'substack writing essays' },
  { id: 'hackernoon', label: 'Open HackerNoon', detail: 'Longer AI notes', href: links.hackernoon, keys: 'hackernoon writing articles' },
  { id: 'huggingface', label: 'Open Hugging Face', detail: 'Small model releases', href: links.huggingface, keys: 'hugging face models ai releases' },
  { id: 'sortmoments', label: 'Open Sort Moments', detail: 'Local event-photo sorting', href: links.sortMoments, keys: 'sort moments photos face clustering' },
  { id: 'weaveskip', label: 'Open WeaveSkip', detail: 'Drafts for many platforms', href: links.weaveSkip, keys: 'weaveskip content social posting' },
  { id: 'neighbourfit', label: 'Open NeighbourFit', detail: 'Postcode context before viewings', href: links.neighbourFit, keys: 'neighbourfit maps property geospatial' }
];

const allProjects = [
  ...workProjects.map((project) => ({ ...project, branch: 'work' })),
  ...personalProjects.map((project) => ({ ...project, branch: 'personal' }))
];

const lovedPapers = [
  {
    title: 'Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets',
    authors: 'Power, Burda, Edwards et al., 2022',
    lane: 'grokking',
    why: 'Neural networks can sit at chance-level generalization after overfitting, then suddenly get it right much later.',
    note: 'Why I keep it: it separates memorization, training time, and generalization without pretending they are the same thing.',
    image: publicUrl('assets/paper-images/grokking-generalization.png'),
    link: 'https://arxiv.org/pdf/2201.02177'
  },
  {
    title: 'Torch.manual_seed(3407) is all you need: On the influence of random seeds in deep learning architectures for computer vision',
    authors: 'Picard, 2021',
    lane: 'seeds',
    why: 'On CIFAR-10 and ImageNet, changing the random seed can make the same architecture look unusually strong or weak.',
    note: 'Why I keep it: one lucky run is not a result. It is a warning label.',
    image: publicUrl('assets/paper-images/random-seeds.png'),
    link: 'https://arxiv.org/pdf/2109.08203'
  },
  {
    title: 'Tell me about yourself: LLMs are aware of their learned behaviors',
    authors: 'Betley, Bao, Soto et al., 2025',
    lane: 'model behaviour',
    why: 'Finetuned LLMs can sometimes describe behaviours they learned, even when the training data did not spell those behaviours out.',
    note: 'Why I keep it: self-reporting is useful only if you know where it breaks.',
    image: publicUrl('assets/paper-images/learned-behaviors.png'),
    link: 'https://arxiv.org/pdf/2501.11120'
  },
  {
    title: 'If LLMs Have Human-Like Attributes, Then So Does Age of Empires II',
    authors: 'de Wynter, 2026',
    lane: 'anthropomorphism',
    why: 'The paper pushes back on broad claims about human-like LLM traits by applying similar criteria to Age of Empires II.',
    note: 'Why I keep it: if the measurement also flatters a strategy game, the claim needs work.',
    image: publicUrl('assets/paper-images/age-of-empires.png'),
    link: 'https://arxiv.org/pdf/2605.31514'
  },
  {
    title: 'LLMs Reproduce Human Purchase Intent via Semantic Similarity Elicitation of Likert Ratings',
    authors: 'Maier, Aslak, Fiaschi, 2025',
    lane: 'synthetic users',
    why: 'Semantic similarity ratings map LLM text answers to Likert-style distributions and recover a lot of the human-survey signal.',
    note: 'Why I keep it: synthetic consumer research is interesting only when the measurement is honest.',
    image: publicUrl('assets/paper-images/purchase-intent.png'),
    link: 'https://arxiv.org/pdf/2510.08338'
  }
];


const projectCasebook = {
  'sort-moments': {
    command: 'case / sort-moments / local-first',
    pain: 'Large event shoots create thousands of repeats, solo shots, group shots, and folders nobody wants to sort by hand.',
    result: 'Built for 4,000+ image event sets with local detection, clustering, correction, and no automatic cloud upload.',
    build: 'RetinaFace detects faces. InsightFace/Buffalo Large creates embeddings. PyQt6 keeps it on desktop. DirectML helps on supported machines.',
    highlights: [
      ['domain', 'event photo sorting'],
      ['scale', '4,000+ image sets'],
      ['privacy', 'local-first workflow'],
      ['review', 'human cluster correction']
    ],
    limit: 'Face grouping still needs review. The tool speeds up correction; it does not pretend every cluster is perfect.'
  },
  weaveskip: {
    command: 'case / weaveskip / distribution',
    pain: 'Writing the source is the hard part. Reshaping it for six platforms is usually boring work with a new shirt on.',
    result: 'One article, RSS feed, or manual source becomes platform-native drafts. Review comes before publish.',
    build: 'Next.js, TypeScript, Prisma, PostgreSQL, Redis/BullMQ, NextAuth, OAuth, S3, Stripe, Zod, BYOK config, queues, and review states.',
    highlights: [
      ['domain', 'content distribution'],
      ['source', 'article, RSS, or manual'],
      ['guardrail', 'review before publish'],
      ['stack', 'Next.js + queues']
    ],
    limit: 'Publishing rules change. The product needs previews, guardrails, and a clear off switch.'
  },
  neighbourfit: {
    command: 'case / neighbourfit / postcode-context',
    pain: 'Property portals show the flat. They do not explain whether the area fits the commute, budget, habits, and daily trade-offs.',
    result: 'Preference capture, geospatial scoring, commute and amenity context, explainable fit breakdowns, maps, and saved lists.',
    build: 'React, TypeScript, FastAPI, PostgreSQL/PostGIS, Mapbox, OpenAI, scikit-learn, and source-aware summaries with caveats.',
    highlights: [
      ['domain', 'postcode fit'],
      ['checks', 'commute + amenities'],
      ['style', 'source-aware caveats'],
      ['promise', 'context, not a verdict']
    ],
    limit: 'A postcode is context, not a verdict. Missing data means more checking, not comfort.'
  },
  'hf-releases': {
    command: 'case / model-releases / small-models',
    pain: 'Small models only matter if someone can run them, compare them, and understand what changed.',
    result: 'Public releases with fine-tunes, ablations, distillation notes, GGUF packages, and files people can run.',
    build: 'Gemma, Qwen, LoRA/fine-tuning, ablation, distillation, quantization, packaging, and release notes.',
    highlights: [
      ['domain', 'small model releases'],
      ['formats', 'GGUF packages'],
      ['method', 'LoRA + ablation'],
      ['rule', 'weak evals get named']
    ],
    limit: 'If the eval is weak, the note should say so.'
  },
  'dpd-churn': {
    command: 'case / dpd-churn / retention',
    pain: 'Retention teams need risk signals while there is still time to act.',
    result: '$650K recorded savings so far; 64% of flagged customers were true churners; 67% of total churn cases were captured.',
    build: 'Dual LightGBMs, WaveNet, logistic hazard, hybrid XGBoost-Transformer, and meta-ensemble scoring that retention teams could actually act on.',
    highlights: [
      ['domain', 'customer retention'],
      ['saved', '$650K recorded'],
      ['precision', '64% flagged were churners'],
      ['coverage', '67% churn captured']
    ],
    limit: 'False positives waste attention. False negatives lose customers. The trade-off has to be visible.'
  },
  'dpd-forecasting': {
    command: 'case / dpd-forecasting / hub-volume',
    pain: 'Parcel volume changes around events, holidays, and hub-level behaviour. Fixed lags miss too much.',
    result: '+8% beat human benchmark across daily hub-volume forecasting.',
    build: 'Mixture-of-experts, RNN, WaveNet-style layers, and event lags for Prime Day, Bank Holidays, and seasonality.',
    highlights: [
      ['domain', 'volume forecasting'],
      ['impact', '+8% beat human benchmark'],
      ['scope', '80+ hubs'],
      ['baseline', '12-year human benchmark']
    ],
    limit: 'Aggregate accuracy can hide local pain. Forecasting needs hub-level misses in view.'
  },
  'daraz-rank': {
    command: 'case / daraz-ranking / recommendations',
    pain: 'Daraz was not one recommender problem. It was feed ranking, search demand, product discovery, and the system work around all of it.',
    result: 'Four lanes: ranking models, search cleanup, discovery surfaces, and quality/cost controls.',
    build: 'Each lane had its own metric and failure mode. Putting all of it into one block was the mistake.',
    limit: 'A recommender only matters if the experiment shows it changed buyer behaviour.',
    modules: [
      {
        lane: 'ranking',
        title: 'Feed ranking moved past the old baseline.',
        summary: 'DeepFM handled product assortment ranking. LTR gave operators more control over click, add-to-cart, and order trade-offs.',
        points: ['DeepFM: +5% CTR over logistic regression', 'LTR re-rank: ~34% conversion lift']
      },
      {
        lane: 'search',
        title: 'Search needed cleaner rewrites.',
        summary: 'Query2Query cleanup removed harmful rewrites. Search Tips used recommendation recall to refine or replace user queries.',
        points: ['Query2Query: +2% search conversion on rewrites', 'Search Tips: +5% overall Search CR']
      },
      {
        lane: 'discovery',
        title: 'Discovery surfaces became recommendation products.',
        summary: 'Trending Now and dMart were backend recommendation systems, not decorative homepage slots.',
        points: ['Trending Now: +26% CR / +46% CTR vs single category', 'dMart: +30% CTR and +100% relative CR vs hot-items baseline']
      },
      {
        lane: 'quality',
        title: 'The quiet work kept the metrics honest.',
        summary: 'Negative sampling, backup logic, and content-based cold start kept the system cheaper and less biased toward already-seen items.',
        points: ['Class imbalance improved from 1:50 to 1:10', 'Cold-start recall gave zero-view products visibility']
      }
    ],
    highlights: [
      ['DeepFM', '+5% CTR over logistic regression'],
      ['LTR re-rank', '~34% conversion lift'],
      ['Search Tips', '+5% overall Search CR'],
      ['Trending Now', '+26% CR / +46% CTR vs single-category'],
      ['dMart', '+30% CTR; +100% relative CR vs hot-items baseline'],
      ['Query2Query', '+2% search conversion from bad rewrite cleanup']
    ]
  },
  'dastgyr-swing': {
    command: 'case / dastgyr-top-for-you / swing',
    pain: 'B2B buyers reorder in patterns, but sparse behaviour and operations make generic recommendation logic weak.',
    result: '+1.44% basket-size uplift and +22% average order value uplift from the Top For You module.',
    build: 'SWING collaborative filtering implemented from scratch, with experiments around forecasting and out-of-stock reduction.',
    highlights: [
      ['domain', 'B2B recommender'],
      ['basket size', '+1.44% uplift'],
      ['AOV', '+22% uplift'],
      ['method', 'SWING from scratch']
    ],
    limit: 'Pretty recommendation cards do not fix weak signals. The method has to match repeat purchase behaviour.'
  },
  'dpd-chatbot': {
    command: 'case / dpd-chatbot-cost / serving-cost',
    pain: 'A support chatbot becomes expensive fast if every answer needs the costly serving path.',
    result: 'Fine-tuned on 20K+ internal conversations with tool calls and databooks; forecasts project 65% lower chatbot spend.',
    build: 'Gemma 4 26B A4B IT, custom databooks at response time, tool calls, and economical Vertex AI inference.',
    highlights: [
      ['training data', '20K+ internal conversations'],
      ['serving', 'Vertex AI'],
      ['cost', 'projected 65% lower spend'],
      ['guardrail', 'preserve tool behaviour']
    ],
    limit: 'Lower cost is not a win if tool behaviour or context breaks. The engine change has to keep the parts people use.'
  },
  'udacity-ai-python': {
    command: 'case / udacity / ai-programming-python',
    pain: 'AI programming learners need examples that work in a notebook, not just slides.',
    result: 'Led AI Programming with Python sessions at Udacity.',
    build: 'Python fundamentals, ML foundations, debugging help, and learner-facing explanations.',
    limit: 'Teaching works when the explanation is smaller than the confusion it removes.',
    gallery: [
      {
        src: publicUrl('assets/gallery/udacity-student-reviews.png'),
        alt: 'Udacity student reviews showing five-star feedback for AI Programming with Python sessions'
      },
      {
        src: publicUrl('assets/gallery/udacity-dashboard-session.png'),
        alt: 'Udacity mentor dashboard screenshot for AI Programming with Python session',
        fit: 'contain'
      }
    ],
    highlights: [
      ['role', 'session lead'],
      ['course', 'AI Programming with Python'],
      ['focus', 'Python + ML foundations'],
      ['mode', 'learner support']
    ]
  }
};

const caseLensLabels = {
  pain: 'Why',
  result: 'Result',
  build: 'Build',
  limit: 'Limit'
};

function useRoute() {
  const [path, setPath] = useState(() => stripBasePath(window.location.pathname) || '/');
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      const target = redirect.startsWith('/') ? redirect : `/${redirect}`;
      window.history.replaceState({}, '', browserPath(target));
      setPath(target);
    }
    const onPop = () => setPath(stripBasePath(window.location.pathname) || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = (nextPath) => {
    if (nextPath === path) return;
    window.history.pushState({}, '', browserPath(nextPath));
    setPath(nextPath);
  };
  return { path, navigate };
}

function App() {
  const { path, navigate } = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  useGsapPage(path);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
    return () => window.cancelAnimationFrame(frame);
  }, [path]);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setPaletteOpen(false);
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);
  const runPaletteAction = (action) => {
    setPaletteOpen(false);
    if (action.path) {
      navigate(action.path);
      return;
    }
    if (action.href && action.download) {
      const link = document.createElement('a');
      link.href = action.href;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }
    if (action.href) {
      window.open(action.href, '_blank', 'noreferrer');
    }
  };
  const page = useMemo(() => {
    if (path === '/') return <Home navigate={navigate} />;
    if (path === '/about') return <About navigate={navigate} />;
    if (path === '/portfolio') return <Portfolio />;
    if (path === '/papers') return <PapersPage navigate={navigate} />;
    if (path === '/blogs') return <BlogsPage navigate={navigate} />;
    if (path === '/resume') return <ResumePage />;
    if (path === '/contribution-snake') return <About navigate={navigate} />;
    return <Home navigate={navigate} />;
  }, [path, navigate]);

  return (
    <main className="app-shell overflow-lock">
      <ShaderField />
      <NoiseLayer />
      <Nav path={path} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onPaletteOpen={() => setPaletteOpen(true)} />
      {page}
      {!['/portfolio', '/about', '/papers', '/blogs', '/resume', '/contribution-snake'].includes(path) && <Footer navigate={navigate} />}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onRun={runPaletteAction} />
    </main>
  );
}

function useGsapPage(path) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { opacity: 1, y: 0, filter: 'none', clearProps: 'transform,filter' });
    });
    return () => ctx.revert();
  }, [path]);
}

function ShaderField() {
  return (
    <div className="shader-field" aria-hidden="true">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="amoled-vignette" />
    </div>
  );
}

function NoiseLayer() {
  return <div className="noise-layer" aria-hidden="true" />;
}

function Nav({ path, navigate, menuOpen, setMenuOpen, onPaletteOpen }) {
  const closeNavigate = (next) => {
    setMenuOpen(false);
    navigate(next);
  };
  return (
    <header className="nav-wrap" data-reveal>
      <button className="brand-pill" onClick={() => closeNavigate('/')} aria-label="Go home">
        <span className="brand-mark"><img src={brandIcons.avatarHead} alt="" /></span>
        <span>Abdullah Khawaja</span>
      </button>
      <nav className="nav-pill" aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.path} className={path === item.path ? 'nav-link active' : 'nav-link'} onClick={() => closeNavigate(item.path)}>
            {item.label}
          </button>
        ))}
      </nav>
      <button className="palette-launch" onClick={onPaletteOpen} aria-label="Open command palette">
        <TerminalWindow size={16} />
        <span>jump</span>
      </button>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
        <span className={menuOpen ? 'line line-a open' : 'line line-a'} />
        <span className={menuOpen ? 'line line-b open' : 'line line-b'} />
      </button>
      <div
        className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        {navItems.map((item, index) => (
          <button key={item.path} type="button" style={{ '--delay': `${index * 80}ms` }} onClick={() => closeNavigate(item.path)}>
            {item.label}
          </button>
        ))}
        <button type="button" style={{ '--delay': `${navItems.length * 80}ms` }} onClick={() => { setMenuOpen(false); onPaletteOpen(); }}>
          Command palette
        </button>
      </div>
    </header>
  );
}


function ReactBitsProfileCard({ onHome }) {
  const cardRef = useRef(null);
  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--rb-x', `${Math.max(0, Math.min(100, x))}%`);
    card.style.setProperty('--rb-y', `${Math.max(0, Math.min(100, y))}%`);
    card.style.setProperty('--rb-ry', `${(x - 50) / 18}deg`);
    card.style.setProperty('--rb-rx', `${(50 - y) / 16}deg`);
  };
  const resetPointer = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rb-x', '50%');
    card.style.setProperty('--rb-y', '50%');
    card.style.setProperty('--rb-rx', '0deg');
    card.style.setProperty('--rb-ry', '0deg');
  };

  return (
    <div
      ref={cardRef}
      className="rb-profile-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Abdullah Mujeeb Khawaja profile card"
    >
      <button className="rb-profile-avatar" onClick={onHome} aria-label="Go home">
        <img src={brandIcons.avatarHead} alt="Illustrated avatar of Abdullah Mujeeb Khawaja" />
      </button>
      <div className="rb-profile-copy">
        <strong>Abdullah Mujeeb Khawaja</strong>
        <span>ML Engineer · DPD UK</span>
        <small>Birmingham</small>
      </div>
      <a className="rb-profile-cta" href={links.contact} aria-label="Email Abdullah Mujeeb Khawaja">
        Have a challenge? Try me.
      </a>
    </div>
  );
}

function CommandPalette({ open, onClose, onRun }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const filteredActions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return paletteActions;
    return paletteActions.filter((action) => (
      `${action.label} ${action.detail} ${action.keys}`.toLowerCase().includes(normalized)
    ));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  const activeAction = filteredActions[activeIndex] || filteredActions[0];
  const handleInputKey = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, filteredActions.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    }
    if (event.key === 'Enter' && activeAction) {
      event.preventDefault();
      onRun(activeAction);
    }
  };

  return (
    <div className="palette-backdrop" onMouseDown={onClose} role="presentation">
      <section className="palette-panel" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}>
        <div className="readme-topbar">
          <span className="traffic red" />
          <span className="traffic amber" />
          <span className="traffic green" />
          <code>portfolio-jump-table</code>
          <button className="palette-close" onClick={onClose} aria-label="Close command palette"><X size={16} /></button>
        </div>
        <div className="palette-search">
          <TerminalWindow size={22} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKey}
            placeholder="Try work, writing, resume, GitHub..."
            aria-label="Search commands"
          />
          <kbd>Enter</kbd>
        </div>
        <div className="palette-layout">
          <div className="palette-results" role="listbox" aria-label="Available actions">
            {filteredActions.length ? filteredActions.map((action, index) => (
              <button
                key={action.id}
                className={index === activeIndex ? 'palette-result active' : 'palette-result'}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onRun(action)}
                role="option"
                aria-selected={index === activeIndex}
              >
                <span>{action.label}</span>
                <small>{action.detail}</small>
              </button>
            )) : (
              <div className="palette-empty">
                <strong>No match.</strong>
                <p>Try resume, portfolio, GitHub, or writing.</p>
              </div>
            )}
          </div>
          <aside className="palette-preview" aria-live="polite">
            <p className="micro-copy">selected</p>
            <h3>{activeAction?.label || 'No command'}</h3>
            <p>{activeAction?.detail || 'Try another search.'}</p>
            <code>{activeAction?.path || activeAction?.href || 'no route'}</code>
          </aside>
        </div>
      </section>
    </div>
  );
}

function ContributionPreview({ compact = false }) {
  const [contrib, setContrib] = useState({ cells: [], total: null, status: 'loading' });
  useEffect(() => {
    let cancelled = false;
    fetch('https://github-contributions-api.jogruber.de/v4/DarthAmk97?y=last')
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub contribution API returned ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setContrib({
          cells: (data.contributions || []).slice(-364),
          total: data.total?.lastYear ?? null,
          status: 'live'
        });
      })
      .catch(() => {
        if (cancelled) return;
        setContrib({ cells: [], total: null, status: 'unavailable' });
      });
    return () => { cancelled = true; };
  }, []);

  const cells = contrib.cells.length ? contrib.cells : Array.from({ length: 364 }, (_, index) => ({
    date: `pending-${index}`,
    count: 0,
    level: 0
  }));

  return (
    <article className={compact ? 'profile-contrib-preview compact' : 'profile-contrib-preview'} aria-label="Live GitHub contribution preview">
      <div>
        <p className="profile-kicker">public GitHub</p>
        <h3>{contrib.total ?? '...'} contributions</h3>
        <span>{contrib.status === 'live' ? 'last year, live loaded' : contrib.status}</span>
      </div>
      <div className="profile-mini-graph" aria-hidden="true">
        {cells.map((cell) => (
          <i key={cell.date} className={`level-${cell.level || 0}${cell.count > 0 ? ' active' : ''}`} />
        ))}
      </div>
    </article>
  );
}

function Home({ navigate }) {
  const spotlightProjects = [
    workProjects.find((project) => project.key === 'dpd-churn') || workProjects[0],
    workProjects.find((project) => project.key === 'daraz-rank') || workProjects[1],
    personalProjects.find((project) => project.key === 'neighbourfit') || personalProjects[2],
    personalProjects.find((project) => project.key === 'sort-moments') || personalProjects[0]
  ];
  const profileLinks = [
    { label: 'GitHub', href: links.github, icon: brandIcons.github },
    { label: 'LinkedIn', href: links.linkedin, icon: brandIcons.linkedin },
    { label: 'Substack', href: links.substack, icon: brandIcons.substack },
    { label: 'HackerNoon', href: links.hackernoon, icon: brandIcons.hackernoon },
    { label: 'Products', href: links.products, iconComponent: SquaresFour, internal: true }
  ];
  const openProject = (projectKey, focusHighlights = false) => {
    if (projectKey) sessionStorage.setItem('portfolio-selected', projectKey);
    if (focusHighlights) sessionStorage.setItem('portfolio-focus', 'highlights');
    navigate('/portfolio');
  };
  return (
    <section className="home-v24 section-pad" data-chapter="README" data-chapter-id="home-readme">
      <div className="home-v24-shell" data-reveal>
        <aside className="home-v24-id" aria-label="Profile identity">
          <div className="home-v24-avatar-wrap">
            <img className="home-v24-avatar" src={brandIcons.avatar} alt="Cartoon avatar of Abdullah Khawaja" />
          </div>
          <div className="home-v24-name">
            <p className="profile-kicker">DarthAmk97</p>
            <h2>Abdullah Khawaja</h2>
            <span>DPD UK / recsys, churn, forecasting</span>
          </div>
          <div className="home-v24-socials" aria-label="External links">
            {profileLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.internal ? undefined : '_blank'}
                rel={item.internal ? undefined : 'noreferrer'}
                aria-label={item.label}
              >
                {item.iconComponent ? <item.iconComponent size={19} aria-hidden="true" /> : <BrandIcon src={item.icon} label={item.label} />}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </aside>

        <main className="home-v24-main">
          <div className="home-v24-path">
            <code>~/portfolio/README.md</code>
            <span>dusty Pentium 3 / FAST / Daraz / DPD UK</span>
          </div>
          <h1>How I got here, roughly.</h1>
          <p className="home-v24-lede">
            You are probably tired of personal summaries that sound like ChatGPT wrote them, so I will keep this closer to how I would say it. I have always been interested in computers; you could probably fault my dad for that, because it really started with a dusty Pentium 3 in the house, 56kbps internet that shared its wires with the telephone, and three broken systems down the hall that I kept trying to bring back to life.
          </p>
          <p className="home-v24-lede secondary">
            That interest stayed. I studied computer science at FAST, kept building pet projects, worked on recommender systems at Daraz/Alibaba Group, moved to the UK for postgrad, and now work on machine learning problems at DPD UK. I still like the same part I liked then: figuring out what works, putting the pieces together, and watching something useful come alive.
          </p>
          <div className="home-v24-actions">
            <button onClick={() => navigate('/portfolio')}>Open the work <ArrowUpRight size={17} /></button>
            <a href={links.resume} download>Download resume <DownloadSimple size={17} /></a>
            <button className="quiet" onClick={() => navigate('/about')}>Read the story <ArrowUpRight size={17} /></button>
          </div>
        </main>

        <aside className="home-v24-proof" aria-label="Pinned work and live contribution preview">
          <div className="home-v24-proof-head">
            <p className="profile-kicker">quick start</p>
            <h2>Start here.</h2>
          </div>
          <div className="home-v24-projects">
            {spotlightProjects.map((project) => (
              <button key={project.key} onClick={() => openProject(project.key)}>
                <span className="home-v24-project-icon">{project.iconPath ? <img src={project.iconPath} alt="" aria-hidden="true" /> : project.icon}</span>
                <span><strong>{project.name}</strong><small>{project.tag}</small></span>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <div className="home-v24-receipts" aria-label="Clickable work highlights">
            {resultHighlights.slice(0, 4).map((result) => (
              <button key={result.label} onClick={() => openProject(result.projectKey, true)} aria-label={`Open ${result.domain} highlight`}>
                <code>{result.domain}</code>
                <span>{result.label}</span>
                <strong>{result.value}</strong>
                <small>{result.detail}</small>
              </button>
            ))}
          </div>
          <ContributionPreview compact />
        </aside>
      </div>
    </section>
  );
}


function About({ navigate }) {
  const principles = [
    {
      title: 'The computer at home',
      text: 'My dad is probably to blame for the computer part. There was a dusty Pentium 3 in the house, 56kbps internet sharing wires with the telephone, and three broken systems down the hall. I kept swapping parts until one came back to life.'
    },
    {
      title: 'FAST and the dots coming together',
      text: 'FAST was where I tried to figure out which part of computer science I actually wanted to stay with. I tried Arduino, text correction in C, personality prediction, gait recognition, and a final-year project that mixed object detection, image captioning, and face recognition.'
    },
    {
      title: 'Daraz / Alibaba Group',
      text: 'Daraz was the first place where data science stopped being coursework and started affecting buyers, sellers, campaigns, and search results. I worked around recommendations and search: ranking, recall, New User Journey, dMart, Search Tips, seller cold start, and price matching. It taught me that a model only matters when the product and business can feel it.'
    },
    {
      title: 'DPD UK and now',
      text: 'After growing into the Daraz role, I moved to the UK for postgrad and eventually landed at DPD UK. The problems are more logistics-shaped now: churn prediction, volume forecasting, chatbot cost, and fine-tuning.'
    }
  ];
  const stackGroups = [
    ['model', ['Python', 'PyTorch', 'TensorFlow', 'Keras', 'XGBoost', 'scikit-learn']],
    ['app / data', ['React', 'TypeScript', 'Electron', 'SQL', 'Docker']],
    ['cloud', ['GCP', 'Vertex AI', 'BigQuery', 'AWS', 'Alibaba Cloud']],
    ['llm / local', ['LangChain', 'OpenAI', 'Ollama', 'Unsloth']]
  ];
  const linkItems = [
    { label: 'GitHub', href: links.github, icon: brandIcons.github },
    { label: 'LinkedIn', href: links.linkedin, icon: brandIcons.linkedin },
    { label: 'Substack', href: links.substack, icon: brandIcons.substack },
    { label: 'HackerNoon', href: links.hackernoon, icon: brandIcons.hackernoon },
    { label: 'Sort Moments', href: links.sortMoments, icon: brandIcons.sortMoments },
    { label: 'WeaveSkip', href: links.weaveSkip, icon: brandIcons.weaveSkip },
    { label: 'NeighbourFit', href: links.neighbourFit, icon: brandIcons.neighbourFit },
    { label: 'Hugging Face', href: links.huggingface, icon: brandIcons.huggingface }
  ];

  return (
    <section className="about-v25 about-v32 section-pad" data-chapter="About" data-chapter-id="about-readme">
      <div className="about-v32-shell" data-reveal>
        <aside className="about-v32-profile" aria-label="About Abdullah">
          <img src={brandIcons.avatar} alt="Illustrated avatar of Abdullah Khawaja" />
          <p className="profile-kicker">about</p>
          <h1>Abdullah Khawaja.</h1>
          <p>Machine Learning Engineer at DPD UK. Before that, Daraz/Alibaba Group, FAST Karachi, too many pet projects, and a childhood habit of taking broken computers seriously.</p>
          <div className="about-v32-links" aria-label="External links">
            {linkItems.map((item) => (
              <a key={item.label} href={item.href} target={item.internal ? undefined : '_blank'} rel={item.internal ? undefined : 'noreferrer'}>
                {item.iconComponent ? <item.iconComponent size={19} aria-hidden="true" /> : <BrandIcon src={item.icon} label={item.label} />}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          <a className="about-v32-resume" href={links.resume} download>
            Download resume <DownloadSimple size={16} />
          </a>
        </aside>

        <main className="about-v32-main">
          <section className="about-v32-principles" aria-label="Working notes">
            <div className="about-v32-headline">
              <code>how it went</code>
              <h2>How I ended up here.</h2>
            </div>
            <div className="about-v32-lines">
              {principles.map(({ title, text }) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-v32-stack" aria-label="Tech stack">
            <div className="about-v32-headline compact">
              <code>tools</code>
              <h2>What I use.</h2>
            </div>
            <div className="about-v32-stack-cloud">
              {stackGroups.flatMap(([, items]) => items).map((item) => <TechChip key={item} name={item} />)}
            </div>
          </section>
        </main>

        <aside className="about-v32-right" aria-label="Live activity and interests">
          <div className="about-v45-lanyard" aria-label="Profile card">
            <ReactBitsProfileCard onHome={() => navigate('/')} />
          </div>
          <ContributionPreview compact />
          <section className="about-v32-tabs" aria-label="Current interests">
            <p className="profile-kicker">still open</p>
            {interestCards.map(({ title, text, icon: Icon }) => (
              <article key={title}>
                <Icon size={18} />
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </section>
        </aside>
      </div>
    </section>
  );
}

function Portfolio() {
  const initialProject = () => {
    const target = sessionStorage.getItem('portfolio-selected');
    return allProjects.find((project) => project.key === target) || workProjects[0];
  };
  const [branch, setBranch] = useState(() => initialProject().branch || 'all');
  const [selected, setSelected] = useState(initialProject);
  const [highlightTargeted, setHighlightTargeted] = useState(() => sessionStorage.getItem('portfolio-focus') === 'highlights');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const projects = useMemo(() => {
    if (branch === 'all') return allProjects;
    return allProjects.filter((project) => project.branch === branch);
  }, [branch]);
  const selectedCase = selected ? projectCasebook[selected.key] : null;
  const galleryItems = selectedCase?.gallery || [];
  const activeGalleryIndex = galleryItems.length ? Math.min(galleryIndex, galleryItems.length - 1) : 0;
  const activeGalleryItem = galleryItems[activeGalleryIndex];
  const branchCounts = {
    all: allProjects.length,
    personal: personalProjects.length,
    work: workProjects.length
  };
  const branchLabels = {
    all: { label: 'all', detail: `${branchCounts.all} items` },
    work: { label: 'work', detail: 'companies' },
    personal: { label: 'after work', detail: 'own builds' }
  };
  const branchGroups = [
    { key: 'work', eyebrow: 'work', title: 'Company work', items: workProjects },
    { key: 'personal', eyebrow: 'after work', title: 'My own builds', items: personalProjects }
  ];

  useEffect(() => {
    const target = sessionStorage.getItem('portfolio-selected');
    if (target) {
      sessionStorage.removeItem('portfolio-selected');
      const targetProject = allProjects.find((project) => project.key === target);
      if (targetProject) {
        setBranch(targetProject.branch);
        setSelected(targetProject);
        if (sessionStorage.getItem('portfolio-focus') === 'highlights') {
          sessionStorage.removeItem('portfolio-focus');
          setHighlightTargeted(true);
        }
        return;
      }
    }
    if (!projects.some((project) => project.key === selected?.key)) {
      setSelected(projects[0]);
    }
  }, [branch, projects, selected?.key]);

  useEffect(() => {
    if (!highlightTargeted) return undefined;
    const timer = window.setTimeout(() => setHighlightTargeted(false), 1800);
    return () => window.clearTimeout(timer);
  }, [highlightTargeted, selected?.key]);

  useEffect(() => {
    setGalleryIndex(0);
    setGalleryOpen(false);
  }, [selected?.key]);

  const moveGallery = (direction) => {
    if (galleryItems.length < 2) return;
    setGalleryIndex((index) => (index + direction + galleryItems.length) % galleryItems.length);
  };

  const pickProject = (project) => {
    setHighlightTargeted(false);
    setSelected(project);
  };

  return (
    <section className="portfolio-v24 section-pad" data-chapter="Work map" data-chapter-id="portfolio-hero">
      <div className="portfolio-v24-shell" data-reveal>
        <header className="portfolio-v24-intro">
          <div className="portfolio-v24-profile-banner">
            <ReactBitsProfileCard onHome={() => navigate('/')} />
          </div>
          <p className="profile-kicker">work</p>
          <h1>Things I can talk through.</h1>
          <p>
            DPD now. Daraz, Dastgyr, Udacity before. Sort Moments, WeaveSkip, NeighbourFit when the day job leaves enough brain.
          </p>
          <div className="portfolio-v24-filters" role="group" aria-label="Project filters">
            {Object.entries(branchLabels).map(([key, item]) => (
              <button key={key} className={branch === key ? 'active' : ''} onClick={() => setBranch(key)}>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </button>
            ))}
          </div>
        </header>

        <main className="portfolio-v24-workbench">
          <section className="portfolio-v24-map" aria-label="Project branches">
            <div className="portfolio-v24-root">
              <img src={brandIcons.avatar} alt="" aria-hidden="true" />
              <div><code>root</code><strong>Abdullah Khawaja</strong></div>
            </div>
            {branchGroups.map((group) => {
              const visible = branch === 'all' || branch === group.key;
              return (
                <div key={group.key} className={`portfolio-v24-lane ${visible ? '' : 'muted'}`}>
                  <div className="portfolio-v24-lane-head">
                    <code>{group.eyebrow}</code>
                    <strong>{group.title}</strong>
                  </div>
                  <div className="portfolio-v24-nodes">
                    {group.items.map((project) => (
                      <button
                        key={project.key}
                        className={`${selected?.key === project.key ? 'active' : ''}`}
                        onClick={() => { setBranch(branch === 'all' ? branch : group.key); pickProject(project); }}
                      >
                        <span>{project.iconPath ? <img src={project.iconPath} alt="" aria-hidden="true" /> : project.icon}</span>
                        <strong>{project.name}</strong>
                        <small>{project.tag}</small>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {selected && (
            <article className={`portfolio-v24-case${selectedCase?.gallery ? ' has-gallery' : ''}`} aria-label={`${selected.name} details`}>
              <div className="portfolio-v24-case-head">
                <span className="portfolio-v24-case-icon">{selected.iconPath ? <img src={selected.iconPath} alt="" aria-hidden="true" /> : selected.icon}</span>
                <div>
                  <code>{selected.domain || selected.company || (selected.branch === 'work' ? 'company work' : 'after-work project')}</code>
                  <h2>{selected.name}</h2>
                  <span className="portfolio-v35-case-tag">{selected.tag}</span>
                </div>
                <div className="portfolio-v24-actions">
                  {selected.link && <a href={selected.link} target="_blank" rel="noreferrer">open <ArrowUpRight size={14} /></a>}
                  {selected.source && <a href={selected.source} target="_blank" rel="noreferrer">source <GithubLogo size={14} /></a>}
                </div>
              </div>

              {selectedCase?.modules ? (
                <div className={highlightTargeted ? 'portfolio-v41-workstreams is-targeted' : 'portfolio-v41-workstreams'} id="portfolio-highlights" aria-label={`${selected.name} workstreams`}>
                  {selectedCase.modules.map((module) => (
                    <section key={module.lane}>
                      <code>{module.lane}</code>
                      <h3>{module.title}</h3>
                      <p>{module.summary}</p>
                      <ul>
                        {module.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    </section>
                  ))}
                </div>
              ) : (
                <>
                  <div className="portfolio-v31-detail-grid">
                    <section>
                      <code>problem</code>
                      <p>{selected.solves}</p>
                    </section>
                    <section>
                      <code>build</code>
                      <p>{selected.technical}</p>
                    </section>
                  </div>

                  {selectedCase && (
                    <div className={highlightTargeted ? 'portfolio-v31-receipt-strip is-targeted' : 'portfolio-v31-receipt-strip'} id="portfolio-highlights">
                      <div>
                        <code>result</code>
                        <p>{selectedCase.result}</p>
                      </div>
                      <div>
                        <code>limit</code>
                        <p>{selectedCase.limit}</p>
                      </div>
                    </div>
                  )}

                  {selectedCase?.highlights && (
                    <div className={highlightTargeted ? 'portfolio-v35-highlights is-targeted' : 'portfolio-v35-highlights'} aria-label={`${selected.name} highlights`}>
                      {selectedCase.highlights.slice(0, 6).map(([label, value]) => (
                        <div key={label}>
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  {galleryItems.length > 0 && (
                    <div className="portfolio-v55-gallery portfolio-v64-evidence" aria-label={`${selected.name} gallery`}>
                      {galleryItems.map((item, index) => (
                        <button
                          key={item.src}
                          type="button"
                          className={activeGalleryIndex === index ? 'active' : ''}
                          onMouseEnter={() => setGalleryIndex(index)}
                          onFocus={() => setGalleryIndex(index)}
                          onClick={() => { setGalleryIndex(index); setGalleryOpen(true); }}
                        >
                          <span className="portfolio-v64-shot">
                            <img src={item.src} alt={item.alt} />
                          </span>
                          <span className="portfolio-v64-meta">
                            <strong>{index === 0 ? 'student reviews' : 'mentor dashboard'}</strong>
                            <small>open the screenshot</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="portfolio-v24-tech" aria-label={`${selected.name} tech stack`}>
                {selected.tech.map((item) => <TechChip key={item} name={item} />)}
              </div>
            </article>
          )}
        </main>
      </div>

      {galleryOpen && activeGalleryItem && (
        <div className="portfolio-v64-lightbox" role="dialog" aria-modal="true" aria-label={`${selected.name} gallery image`} onClick={() => setGalleryOpen(false)}>
          <div className="portfolio-v64-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <div className="portfolio-v64-lightbox-top">
              <strong>{selected.name}</strong>
              <span>{activeGalleryIndex + 1}/{galleryItems.length}</span>
              <button type="button" onClick={() => setGalleryOpen(false)} aria-label="Close gallery"><X size={18} weight="bold" /></button>
            </div>
            <button className="portfolio-v64-lightbox-control prev" type="button" onClick={() => moveGallery(-1)} aria-label="Previous gallery image"><CaretLeft size={24} weight="bold" /></button>
            <div className="portfolio-v64-lightbox-stage">
              <img src={activeGalleryItem.src} alt={activeGalleryItem.alt} />
            </div>
            <button className="portfolio-v64-lightbox-control next" type="button" onClick={() => moveGallery(1)} aria-label="Next gallery image"><CaretRight size={24} weight="bold" /></button>
          </div>
        </div>
      )}
    </section>
  );
}


function ProjectCard({ project, index, onOpen }) {
  return (
    <article className="stack-card" style={{ '--i': index }} data-reveal>
      <div className="project-visual">
        <img src={project.image} alt={`${project.name} visual`} />
      </div>
      <div className="project-copy">
        <div className="project-icon">{project.icon}</div>
        <p>{project.tag}</p>
        <h3>{project.name}</h3>
        <div className="project-tech-row">
          {project.tech.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
        </div>
        <button className="button solid compact" onClick={onOpen}><span>Read the case</span><span className="button-icon"><ArrowUpRight size={15} /></span></button>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  const [view, setView] = useState('solves');
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="project-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${project.name} details`}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <div className="modal-media"><img src={project.image} alt="" /></div>
        <div className="modal-content">
          <p className="micro-copy">{project.tag}</p>
          <h2>{project.name}</h2>
          <div className="view-toggle">
            <button className={view === 'solves' ? 'active' : ''} onClick={() => setView('solves')}>Problem</button>
            <button className={view === 'technical' ? 'active' : ''} onClick={() => setView('technical')}>Build</button>
          </div>
          <p className="modal-text">{view === 'solves' ? project.solves : project.technical}</p>
          <div className="project-tech-row wrap">
            {project.tech.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="cta-row wrap">
            {project.link && <a className="button solid compact" href={project.link} target="_blank" rel="noreferrer"><span>Open project</span><span className="button-icon"><ArrowUpRight size={14} /></span></a>}
            {project.source && <a className="button ghost compact" href={project.source} target="_blank" rel="noreferrer"><span>Source</span><span className="button-icon"><GithubLogo size={14} /></span></a>}
          </div>
        </div>
      </div>
    </div>
  );
}

function PapersPage({ navigate }) {
  return (
    <section className="papers-v72 section-pad" data-chapter="Papers" data-chapter-id="papers">
      <div className="papers-v72-shell" data-reveal>
        <aside className="papers-v72-intro" aria-label="Papers introduction">
          <ReactBitsProfileCard onHome={() => navigate('/')} />
          <p className="profile-kicker">papers</p>
          <h1>Papers I come back to.</h1>
          <p>
            Five papers I keep around because they make clean ML claims feel a little less clean.
          </p>
          <button type="button" onClick={() => navigate('/blogs')}>
            Open blogs <ArrowUpRight size={16} />
          </button>
        </aside>

        <main className="papers-v72-list" aria-label="Favourite papers">
          {lovedPapers.map((paper, index) => (
            <a
              key={paper.title}
              className="papers-v72-card"
              href={paper.link}
              target="_blank"
              rel="noreferrer"
              style={{ '--i': index }}
            >
              <figure className="papers-v79-banner" aria-hidden="true">
                <img src={paper.image} alt="" loading="lazy" />
                <figcaption><span>{String(index + 1).padStart(2, '0')}</span><code>{paper.lane}</code></figcaption>
              </figure>
              <div className="papers-v72-body">
                <div className="papers-v72-top"><span>{paper.authors}</span><strong>open PDF <ArrowUpRight size={14} /></strong></div>
                <h2>{paper.title}</h2>
                <p>{paper.why}</p>
                <small>{paper.note}</small>
              </div>
            </a>
          ))}
        </main>
      </div>
    </section>
  );
}

function ArticleBody({ post, html }) {
  return (
    <div className="blog-v72-article-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="blog-v73-source-note">
        <code>source</code>
        <p>Mirrored from Navigating Noise with the article images. Source links stay above the title.</p>
      </div>
    </div>
  );
}

function ArticleSourceLinks({ post }) {
  const sourceLinks = [
    { label: 'Substack', href: post.source, icon: brandIcons.substack },
    { label: 'HackerNoon', href: post.hackernoon || links.hackernoon, icon: brandIcons.hackernoon }
  ].filter((item) => item.href);

  return (
    <div className="blog-v75-source-links" aria-label="Read this article elsewhere">
      <span>Read on</span>
      {sourceLinks.map((item) => (
        <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
          <BrandIcon src={item.icon} label="" />
          <strong>{item.label}</strong>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function getBlogBannerImage(post) {
  if (!post?.images?.length) return brandIcons.navigatingNoise;
  const seed = [...post.slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return post.images[seed % post.images.length]?.src || post.images[0].src;
}

function BlogsPage({ navigate }) {
  const collectionPosts = blogPosts.filter((post) => post.slug !== 'coming-soon');
  const [activeSlug, setActiveSlug] = useState('');
  const [textScale, setTextScale] = useState('base');
  const activePost = collectionPosts.find((post) => post.slug === activeSlug) || collectionPosts[0];
  const articleHtml = activePost.html;

  if (!activeSlug) {
    return (
      <section className="blog-v72 blog-v79 section-pad" data-chapter="Blogs" data-chapter-id="blogs">
        <div className="blog-v79-shell" data-reveal>
          <aside className="blog-v79-intro" aria-label="Blog collection introduction">
            <ReactBitsProfileCard onHome={() => navigate('/')} />
            <p className="profile-kicker">navigating noise</p>
            <h1>Navigating Noise.</h1>
            <p>A few posts from Substack, mirrored here with the images because half a thought should not become a broken preview card.</p>
          </aside>

          <main className="blog-v79-grid" aria-label="Blog collection">
            {collectionPosts.map((post) => (
              <button key={post.slug} type="button" className="blog-v79-card" onClick={() => setActiveSlug(post.slug)}>
                <figure>
                  <img src={getBlogBannerImage(post)} alt="" loading="lazy" />
                  <figcaption><code>{post.lane}</code><span>{post.date}</span></figcaption>
                </figure>
                <div>
                  <h2>{post.originalTitle || post.title}</h2>
                  <p>{post.dek}</p>
                  <small>{post.images?.length || 0} article image{post.images?.length === 1 ? '' : 's'} / read here</small>
                </div>
              </button>
            ))}
          </main>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-v72 section-pad" data-chapter="Blogs" data-chapter-id="blogs">
      <div className="blog-v72-shell" data-reveal>
        <aside className="blog-v72-rail" aria-label="Blog posts">
          <ReactBitsProfileCard onHome={() => navigate('/')} />
          <div className="blog-v72-rail-copy">
            <p className="profile-kicker">navigating noise</p>
            <h1>The posts live here.</h1>
            <p>Full posts, original images, and source links back to Substack or HackerNoon when you want the original room.</p>
          </div>
          <div className="blog-v72-post-list" role="tablist" aria-label="Navigating Noise posts">
            <button type="button" className="blog-v79-back" onClick={() => setActiveSlug('')}>
              <code>all posts</code>
              <span>Back to collection</span>
              <small>cards + article images</small>
            </button>
            {collectionPosts.map((post) => (
              <button
                key={post.slug}
                type="button"
                className={post.slug === activePost.slug ? 'active' : ''}
                onClick={() => setActiveSlug(post.slug)}
                role="tab"
                aria-selected={post.slug === activePost.slug}
              >
                <code>{post.lane}</code>
                <span>{post.title}</span>
                <small>{post.date}{post.images?.length ? ` / ${post.images.length} image${post.images.length === 1 ? '' : 's'}` : ''}</small>
              </button>
            ))}
          </div>
        </aside>

        <main className="blog-v72-reader" aria-label="Navigating Noise article reader">
          <div className="blog-v72-toolbar" aria-label="Article controls">
            <div>
              <code>{activePost.date}</code>
              <strong>{activePost.lane}{activePost.images?.length ? ` / ${activePost.images.length} images` : ''}</strong>
            </div>
            <div className="blog-v72-control-group" role="group" aria-label="Text size">
              {['tight', 'base', 'large'].map((size) => (
                <button key={size} type="button" className={textScale === size ? 'active' : ''} onClick={() => setTextScale(size)}>{size}</button>
              ))}
            </div>
          </div>

          <article className={`blog-v72-article text-${textScale}`}>
            <ArticleSourceLinks post={activePost} />
            <p className="profile-kicker">article</p>
            <h2>{activePost.originalTitle || activePost.title}</h2>
            <p className="blog-v72-dek">{activePost.dek}</p>
            <ArticleBody post={activePost} html={articleHtml} />
          </article>
        </main>
      </div>
    </section>
  );
}


function ResumePage() {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const resumeFacts = [
    ['current', 'Machine Learning Engineer at DPD Group'],
    ['results', '$650K retained revenue, +8% forecast-accuracy lift, ~34% LTR conversion lift'],
    ['history', 'DPD, Alibaba/Daraz, Dastgyr, Udacity, Sort Moments, WeaveSkip, NeighbourFit'],
    ['file', '2 pages from the PDF']
  ];
  const resumeLinks = [
    { label: 'GitHub', href: links.github, icon: brandIcons.github },
    { label: 'LinkedIn', href: links.linkedin, icon: brandIcons.linkedin },
    { label: 'Hugging Face', href: links.huggingface, icon: brandIcons.huggingface },
    { label: 'Substack', href: links.substack, icon: brandIcons.substack },
    { label: 'HackerNoon', href: links.hackernoon, icon: brandIcons.hackernoon },
    { label: 'Products', href: links.products, iconComponent: SquaresFour, internal: true }
  ];
  const pages = [
    { label: 'page 1', src: publicUrl('assets/resume-preview-page-1.png') },
    { label: 'page 2', src: publicUrl('assets/resume-preview-page-2.png') }
  ];
  const mobileResumeSections = [
    {
      label: 'work',
      title: 'Machine Learning Engineer — DPD Group',
      items: [
        'Fine-tuned Gemma for internal SQL/query generation and cut base-model token use by 40%.',
        'Built the churn meta-ensemble that caught 67% of total churn cases; $650K saved so far.',
        'Built volume forecasting that beat a 12-year human benchmark by +8% across 80+ hubs.'
      ]
    },
    {
      label: 'before',
      title: 'Daraz, Dastgyr, Udacity',
      items: [
        'Daraz: Wide & Deep ranking, LTR, 50+ A/B tests, and about +35% conversion lift.',
        'Dastgyr: SWING recommender for Top For You, +1.44% basket-size uplift and +22% AOV.',
        'Udacity: led AI/Python learning sessions and helped learners get code running.'
      ]
    },
    {
      label: 'projects',
      title: 'Things I built outside work',
      items: [
        'Sort Moments: local-first event photo sorting for 4,000+ image sets.',
        'WeaveSkip: turns one source into platform-native drafts with review before publish.',
        'Hugging Face releases and Navigating Noise: small-model experiments and writing.'
      ]
    },
    {
      label: 'education',
      title: 'Education',
      items: [
        'MSc Data Science, University of Essex — Distinction.',
        'BS Computer Science, FAST-NU.'
      ]
    }
  ];
  const activePage = pages[activePageIndex] || pages[0];

  return (
    <section className="resume-v25 resume-v32 section-pad" data-chapter="Resume" data-chapter-id="resume-release">
      <div className="resume-v32-shell" data-reveal>
        <aside className="resume-v32-side" aria-label="Resume actions and facts">
          <p className="profile-kicker">resume.pdf</p>
          <h1>Resume.</h1>
          <p>Skim it here. Download it if you want the formal version.</p>
          <div className="resume-v32-actions">
            <a href={links.resume} download>Download PDF <DownloadSimple size={17} /></a>
            <a className="quiet" href={links.resume} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight size={17} /></a>
          </div>
          <div className="resume-v32-facts">
            {resumeFacts.map(([label, value]) => (
              <div key={label}><code>{label}</code><span>{value}</span></div>
            ))}
          </div>
          <div className="resume-v32-links" aria-label="Resume profile links">
            {resumeLinks.map((item) => (
              <a key={item.label} href={item.href} target={item.internal ? undefined : '_blank'} rel={item.internal ? undefined : 'noreferrer'}>
                {item.iconComponent ? <item.iconComponent size={19} aria-hidden="true" /> : <BrandIcon src={item.icon} label={item.label} />}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </aside>

        <main className="resume-v32-pages resume-v42-viewer" aria-label="Rendered resume pages">
          <div className="resume-v42-toolbar" aria-label="Resume page controls">
            <div>
              <code>pdf preview</code>
              <strong>{activePage.label}</strong>
            </div>
            <div className="resume-v42-page-tabs" role="tablist" aria-label="Resume pages">
              {pages.map((page, index) => (
                <button
                  key={page.label}
                  type="button"
                  className={index === activePageIndex ? 'active' : ''}
                  onClick={() => setActivePageIndex(index)}
                  role="tab"
                  aria-selected={index === activePageIndex}
                  aria-controls="resume-page-view"
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>
          <section className="resume-v44-mobile-read" aria-label="Mobile-readable resume">
            <div className="resume-v44-mobile-head">
              <code>mobile version</code>
              <h2>Readable version.</h2>
              <p>Same resume content, rebuilt as text for phone screens.</p>
            </div>
            {mobileResumeSections.map((section) => (
              <article key={section.label}>
                <code>{section.label}</code>
                <h3>{section.title}</h3>
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </section>
          <a
            id="resume-page-view"
            className="resume-v32-page resume-v42-page"
            href={links.resume}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open resume PDF ${activePage.label}`}
          >
            <img src={activePage.src} alt={`Abdullah Khawaja resume ${activePage.label}`} />
            <span>{activePage.label}</span>
          </a>
        </main>
      </div>
    </section>
  );
}

function ContributionSnake() {
  const [snakeMode, setSnakeMode] = useState('ship');
  const [paused, setPaused] = useState(false);
  const [contrib, setContrib] = useState({ cells: [], total: null, status: 'loading' });
  useEffect(() => {
    let cancelled = false;
    fetch('https://github-contributions-api.jogruber.de/v4/DarthAmk97?y=last')
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub contribution API returned ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setContrib({
          cells: (data.contributions || []).slice(-364),
          total: data.total?.lastYear ?? null,
          status: 'live'
        });
      })
      .catch(() => {
        if (cancelled) return;
        setContrib({ cells: [], total: null, status: 'unavailable' });
      });
    return () => { cancelled = true; };
  }, []);
  const snakeModes = {
    ship: {
      label: 'live data',
      command: 'fetch github contributions --user DarthAmk97',
      status: 'Reading the public GitHub contribution calendar. The squares are loaded from GitHub.',
      log: [
        'source: github-contributions-api.jogruber.de',
        'user: DarthAmk97',
        'window: last 364 days'
      ]
    },
    noise: {
      label: 'quiet days',
      command: 'filter level=0',
      status: 'Empty public cells do not mean nothing happened. Work also happens in private repos and company systems.',
      log: [
        'private repos exist',
        'employment exists',
        'shipping does not always leave a public square'
      ]
    },
    active: {
      label: 'active days',
      command: 'filter level>0',
      status: 'Darker cells mean more public commits that day. That is the whole thing.',
      log: [
        'no random trail',
        'no made-up streak',
        'no decorative contribution data'
      ]
    }
  };
  const activeSnake = snakeModes[snakeMode];
  const activeCells = contrib.cells.length ? contrib.cells : Array.from({ length: 364 }, (_, index) => ({
    date: `pending-${index}`,
    count: 0,
    level: 0
  }));
  const activeCount = contrib.cells.filter((cell) => cell.count > 0).length;
  return (
    <section className="page-section snake-page-v4 section-pad" data-chapter="Contribution snake" data-chapter-id="snake-lab">
      <div className="snake-lab" data-reveal>
        <div className="snake-copy">
          <p className="micro-copy">public GitHub graph</p>
          <h1>Public squares.</h1>
          <p className="large-copy">This reads my public GitHub calendar for the last year. Useful, but not holy. Private repos and company work do not always leave green pixels.</p>
          <div className="cta-row wrap">
            <a className="button solid" href={links.github} target="_blank" rel="noreferrer"><span>Open GitHub</span><span className="button-icon"><GithubLogo size={16} /></span></a>
            <button className="button ghost" onClick={() => setPaused((current) => !current)}>
              <span>{paused ? 'Resume motion' : 'Freeze motion'}</span><span className="button-icon"><TerminalWindow size={16} /></span>
            </button>
          </div>
          <div className="snake-legend">
            <span><i className="hot" /> public contribution day</span>
            <span><i /> quiet public day</span>
            <span><i className="head-dot" /> live API</span>
          </div>
        </div>
        <div className={`snake-terminal mode-${snakeMode}${paused ? ' paused' : ''}`} aria-label="Animated contribution snake">
          <div className="readme-topbar">
            <span className="traffic red" />
            <span className="traffic amber" />
            <span className="traffic green" />
            <code>{activeSnake.command}</code>
          </div>
          <div className="snake-control-strip" role="group" aria-label="Snake modes">
            {Object.entries(snakeModes).map(([key, mode]) => (
              <button key={key} className={snakeMode === key ? 'active' : ''} onClick={() => setSnakeMode(key)}>
                {mode.label}
              </button>
            ))}
          </div>
          <div className="snake-device">
            <div className="snake-grid real-contrib-grid" aria-label="GitHub contributions for the last year">
              {activeCells.map((cell) => (
                <span
                  key={cell.date}
                  className={`snake-cell level-${cell.level || 0}${cell.count > 0 ? ' trail' : ''}`}
                  title={`${cell.date}: ${cell.count} contribution${cell.count === 1 ? '' : 's'}`}
                />
              ))}
            </div>
            <aside className="snake-status-card">
              <p className="micro-copy">count</p>
              <h2>{activeSnake.label}</h2>
              <p>{paused ? 'Paused. The data is still from GitHub.' : activeSnake.status}</p>
              <div className="contrib-receipt">
                <strong>{contrib.total ?? '...'}</strong>
                <span>public contributions in the last year</span>
                <small>{contrib.status === 'live' ? `${activeCount} active public days loaded live` : contrib.status}</small>
              </div>
              <ul>
                {activeSnake.log.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ children, onClick }) {
  return <button className="button solid" onClick={onClick}><span>{children}</span><span className="button-icon"><ArrowUpRight size={16} /></span></button>;
}

function BrandIcon({ src, label, className = 'brand-icon' }) {
  return <img className={className} src={src} alt="" aria-hidden="true" loading="lazy" />;
}

function SocialLink({ href, icon, iconSrc, label }) {
  return (
    <a className="social-link" href={href} target="_blank" rel="noreferrer">
      {iconSrc ? <BrandIcon src={iconSrc} label={label} /> : icon}
      <span>{label}</span>
    </a>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer site-footer-v29" data-reveal>
      <div className="footer-signoff">
        <strong>Abdullah Khawaja</strong>
        <span>ML systems, side projects, writing.</span>
      </div>
      <div className="footer-actions">
        <button className="button ghost compact" onClick={() => navigate('/portfolio')}><span>Portfolio</span><span className="button-icon"><SquaresFour size={14} /></span></button>
        <a className="button ghost compact" href={links.github} target="_blank" rel="noreferrer"><span>GitHub</span><span className="button-icon"><GithubLogo size={14} /></span></a>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);









