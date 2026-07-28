export const experiences = [
  {
    id: 'lead-backend-aetheria',
    title: 'Lead Backend & AI Systems Engineer',
    company: 'Nexus Intelligence Labs',
    period: '2024 — Present',
    location: 'Remote (San Francisco, CA)',
    type: 'Full-time',

    businessContext: `Nexus Intelligence Labs develops enterprise-grade generative AI orchestration platforms for B2B SaaS clients handling millions of automated API transactions daily. The core backend infrastructure must balance strict AI response latency budgets, secret security, and high-concurrency database throughput.`,

    responsibilities: [
      'Architected server-side AI proxy services wrapping Google Gemini 2.5 Flash / Pro models for enterprise clients.',
      'Designed non-blocking task queue algorithms in Redis and PostgreSQL to dispatch high-priority background jobs.',
      'Maintained 99.99% system availability across Cloud Run container clusters handling 1,200+ requests/second.',
      'Mentored junior backend engineers on Node.js event loop health, SQL query indexing, and security best practices.'
    ],

    problemsSolved: [
      'Prevented client-side API secret leakage by proxying all Gemini API calls through stateless Express middleware.',
      'Eliminated worker double-allocation bugs during high-concurrency task claim surges using PostgreSQL atomic row locks.',
      'Mitigated memory leak spikes caused by unbounded SSE (Server-Sent Events) streaming connection buffers.'
    ],

    technologies: [
      'Node.js',
      'Express.js',
      '@google/genai',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Cloud Run',
      'OpenTelemetry'
    ],

    architecture: `Stateless Express.js microservices deployed on Google Cloud Run containers behind an Nginx reverse proxy. Requests are authenticated using RSA-256 JWTs before querying in-memory Redis Sorted Sets for sub-millisecond priority queue popping. Persistent task states and logs are committed to PostgreSQL using connection pooling with PgPool.`,

    achievements: [
      'Reduced average Time-To-First-Token (TTFT) for streaming AI responses from 450ms to 95ms (-78%).',
      'Engineered a non-blocking PostgreSQL claim query (FOR UPDATE SKIP LOCKED) that eliminated 100% of lock-wait timeouts.',
      'Implemented automated worker heartbeat watchdogs, recovering orphaned crashed jobs within 30 seconds TTL.'
    ],

    interestingBugsFixed: {
      title: 'The Silent Node.js SSE Memory Exhaustion Under Network Throttling',
      description: 'Under simulated network throttling, client browsers connected to SSE streaming endpoints stopped reading socket buffers. Express res.write() continued buffering LLM token streams into Node.js V8 heap memory without backpressure checks, causing container OOM crashes.',
      solution: 'Implemented backpressure monitoring using res.write() return values paired with res.on("drain") events to pause upstream Gemini SDK streaming chunks whenever the socket buffer filled up.'
    },

    metrics: [
      { label: 'P99 Latency', value: '< 24ms', description: 'API gateway response time' },
      { label: 'Throughput', value: '1,200 req/sec', description: 'Peak worker polling load' },
      { label: 'Uptime', value: '99.99%', description: 'Production SLA reliability' },
      { label: 'Token Optimization', value: '35% Saved', description: 'Context window pruning' }
    ],

    lessonsLearned: 'In high-concurrency event-driven systems, backpressure checks on network sockets are just as critical as database connection pool limits. Always decouple worker task state from socket longevity.'
  },

  {
    id: 'backend-vanguard',
    title: 'Senior Backend Microservices Specialist',
    company: 'Vanguard Systems & Microservices',
    period: '2023 — 2024',
    location: 'Remote',
    type: 'Full-time',

    businessContext: `Vanguard builds distributed messaging and identity authorization microservices for real-time collaboration platforms. The platform required resilient user presence tracking and low-latency chat routing across multi-node server clusters.`,

    responsibilities: [
      'Engineered scalable Socket.io messaging infrastructure backed by Redis Pub/Sub for multi-server node synchronization.',
      'Designed a zero-trust OAuth2 & JWT auth microservice featuring automatic refresh token rotation and revocation blacklists.',
      'Optimized MongoDB document schemas and compound indexes to support instant message history pagination.',
      'Established IP-based sliding window rate limiters to shield login routes against automated brute-force attempts.'
    ],

    problemsSolved: [
      'Solved cross-node WebSocket isolation where users on Server A could not receive real-time messages from users on Server B.',
      'Eliminated Cross-Site Scripting (XSS) token vulnerability risks by enforcing HttpOnly SameSite=Strict cookie rotation.',
      'Reduced database CPU spikes during peak chat hours by implementing compound indexing on { room_id: 1, created_at: -1 }.'
    ],

    technologies: [
      'Node.js',
      'Socket.io',
      'Redis Pub/Sub',
      'MongoDB',
      'MySQL',
      'Nginx',
      'JWT / OAuth2',
      'Vitest'
    ],

    architecture: `Horizontal Socket.io server nodes balanced by Nginx IP-hash sticky load balancers. Inter-node communications are handled by the Socket.io Redis Adapter over Pub/Sub channels. User identity and refresh token revocation logs are maintained in MySQL, while room chat history is stored in MongoDB Atlas clusters.`,

    achievements: [
      'Scaled WebSocket cluster infrastructure to support 10,000+ concurrent active socket connections.',
      'Maintained sub-15ms cross-node message propagation latency across 4 load-balanced worker processes.',
      'Built unit and integration test suites with Vitest achieving 92% code coverage across all auth routes.'
    ],

    interestingBugsFixed: {
      title: 'The Socket.io Disconnect Heartbeat Flapping Cascade',
      description: 'Mobile clients experiencing brief 1-second cell tower handoffs triggered Socket.io disconnect events, notifying the entire channel that the user was offline, only to reconnect 500ms later. This caused notification spam and excessive MongoDB presence write load.',
      solution: 'Introduced a 5-second debounced presence TTL in Redis. Disconnections only broadcast an offline status if the client fails to reconnect within the 5-second grace window.'
    },

    metrics: [
      { label: 'Concurrent Sockets', value: '10,000+', description: 'Active concurrent sockets' },
      { label: 'Inter-Node Latency', value: '< 15ms', description: 'Redis Pub/Sub broadcast' },
      { label: 'Test Coverage', value: '92%', description: 'Vitest route integration' },
      { label: 'Auth Latency', value: '0ms DB', description: 'Asymmetric RSA verification' }
    ],

    lessonsLearned: 'Decoupling client socket connections from application presence state via Redis TTL timers prevents state flapping and dramatically reduces downstream database writes.'
  },

  {
    id: 'fullstack-dev-aether',
    title: 'Software & API Developer',
    company: 'Aether Software Solutions',
    period: '2022 — 2023',
    location: 'Hybrid',
    type: 'Full-time',

    businessContext: `Aether Software delivers custom web applications and administrative management dashboards for regional business clients transition from legacy offline databases to cloud web platforms.`,

    responsibilities: [
      'Built single-page frontend applications using Vue.js and Tailwind CSS integrated with Node.js REST APIs.',
      'Designed relational database schemas in MySQL and PostgreSQL with strict data integrity rules and foreign keys.',
      'Implemented automated email notification dispatchers and PDF report generation background queues.',
      'Integrated third-party payment gateways (Stripe API) and Webhooks with signature validation.'
    ],

    problemsSolved: [
      'Migrated legacy offline desktop database records (50,000+ rows) into normalized MySQL tables with zero data corruption.',
      'Optimized front-end asset bundles and lazy-loaded routes, improving Google Lighthouse performance score from 62 to 98.',
      'Prevented duplicate payment processing by implementing strict server-side Stripe webhook idempotency keys.'
    ],

    technologies: [
      'Vue.js',
      'JavaScript (ES6+)',
      'Node.js',
      'Express.js',
      'MySQL',
      'PostgreSQL',
      'Tailwind CSS',
      'Postman'
    ],

    architecture: `Full-stack Vue.js single page application serving assets over CDN, calling Node.js Express REST API endpoints hosted on Docker containers. Transactional business data stored in MySQL with automated nightly dumps to Cloud Storage.`,

    achievements: [
      'Successfully delivered 8 client web application projects on schedule with zero critical post-release defects.',
      'Improved page load performance by 65% across client management portals through route code-splitting and asset compression.',
      'Authored comprehensive Postman API documentation and OpenAPI contracts for client integrations.'
    ],

    interestingBugsFixed: {
      title: 'The Double-Charge Webhook Race Condition',
      description: 'Stripe webhook retries sent two identical charge events within 50 milliseconds of each other when the initial HTTP ACK was slightly delayed, leading to duplicate database invoice entries.',
      solution: 'Created an Express idempotency middleware that logs incoming webhook event IDs into Redis with an atomic SETNX key before processing transactions.'
    },

    metrics: [
      { label: 'Lighthouse Score', value: '98 / 100', description: 'Frontend performance' },
      { label: 'Projects Shipped', value: '8 Completed', description: 'On-time delivery rate' },
      { label: 'Load Time', value: '-65%', description: 'Page asset optimization' }
    ],

    lessonsLearned: 'Always treat external webhooks as un-trusted and non-idempotent until validated with server-side atomic lock keys.'
  }
];
