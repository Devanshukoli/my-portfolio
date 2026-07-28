export const skillsByDiscipline = [
  {
    discipline: 'Backend Engineering',
    id: 'backend',
    description: 'High-concurrency server architectures, event loops, and robust endpoint design.',
    skills: [
      {
        name: 'Node.js',
        years: '3.5 Yrs',
        confidence: 'Expert (95%)',
        confidenceValue: 95,
        project: 'Eisen-Hover Matrix API',
        tooltip: 'Asynchronous event-driven runtime used to build non-blocking microservices and task execution dispatchers under 1,200 req/sec load.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'Express.js',
        years: '3.5 Yrs',
        confidence: 'Expert (95%)',
        confidenceValue: 95,
        project: 'Hardened Zero-Trust Auth Service',
        tooltip: 'REST API framework utilized for robust routing, custom error handling, and security middleware orchestration.',
        link: { text: 'Auth Microservice', url: '/project/auth-microservice' }
      },
      {
        name: 'RESTful API Design',
        years: '3.5 Yrs',
        confidence: 'Expert (95%)',
        confidenceValue: 95,
        project: 'All Portfolio Microservices',
        tooltip: 'Designing standardized JSON contracts, idempotency keys, RFC 7807 error responses, and HTTP status handling.',
        link: { text: 'Gemini Agent Proxy', url: '/project/gemini-agent-proxy' }
      },
      {
        name: 'WebSockets & Socket.io',
        years: '2.5 Yrs',
        confidence: 'Proficient (88%)',
        confidenceValue: 88,
        project: 'Distributed Real-Time Presence Chat',
        tooltip: 'Full-duplex persistent socket communication with reconnect buffering and multi-node Redis broadcasting.',
        link: { text: 'Realtime Chat Engine', url: '/project/realtime-presence-chat' }
      }
    ]
  },
  {
    discipline: 'Frontend',
    id: 'frontend',
    description: 'Clean, responsive user interfaces and modern single-page applications.',
    skills: [
      {
        name: 'Vue.js & Vue Router',
        years: '2.5 Yrs',
        confidence: 'Proficient (90%)',
        confidenceValue: 90,
        project: 'Engineering Portfolio & Design System',
        tooltip: 'Composition API setup, reactive state management, scoped styling, and client-side single-page routing.',
        link: { text: 'Live Engineering Portfolio', url: '/' }
      },
      {
        name: 'JavaScript / TypeScript',
        years: '3.5 Yrs',
        confidence: 'Expert (92%)',
        confidenceValue: 92,
        project: 'Gemini Agent Proxy & Vue UI',
        tooltip: 'Strong typing, ESNext features, async/await patterns, and type-safe SDK integrations across full stack.',
        link: { text: 'Gemini Agent Proxy', url: '/project/gemini-agent-proxy' }
      },
      {
        name: 'HTML5 & CSS / Tailwind',
        years: '3.5 Yrs',
        confidence: 'Expert (92%)',
        confidenceValue: 92,
        project: 'Responsive Portfolio Layouts',
        tooltip: 'Semantic HTML5 structure, CSS custom properties, fluid typography, and mobile-first responsive design.',
        link: null
      }
    ]
  },
  {
    discipline: 'Cloud',
    id: 'cloud',
    description: 'Serverless containers, managed secrets, and load balancing in cloud environments.',
    skills: [
      {
        name: 'Google Cloud Run',
        years: '2.0 Yrs',
        confidence: 'Proficient (88%)',
        confidenceValue: 88,
        project: 'Production Microservice Deployments',
        tooltip: 'Fully managed serverless container deployment with auto-scaling down to zero and instant HTTP traffic routing.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'Secret Manager',
        years: '2.0 Yrs',
        confidence: 'Proficient (85%)',
        confidenceValue: 85,
        project: 'Gemini Agent Proxy Service',
        tooltip: 'Injecting API keys and private RSA keys dynamically into runtime containers without exposing secrets in code.',
        link: { text: 'Gemini Agent Proxy', url: '/project/gemini-agent-proxy' }
      },
      {
        name: 'Nginx Reverse Proxy',
        years: '2.5 Yrs',
        confidence: 'Proficient (85%)',
        confidenceValue: 85,
        project: 'Socket Node Load Balancing Cluster',
        tooltip: 'Configuring reverse proxies, SSL termination, sticky sessions, and IP hash routing across worker nodes.',
        link: { text: 'Realtime Chat Engine', url: '/project/realtime-presence-chat' }
      }
    ]
  },
  {
    discipline: 'Testing',
    id: 'testing',
    description: 'Ensuring software correctness through automated test suites and contract checks.',
    skills: [
      {
        name: 'Vitest / Jest',
        years: '2.5 Yrs',
        confidence: 'Proficient (88%)',
        confidenceValue: 88,
        project: 'API Integration Test Suites',
        tooltip: 'Blazing fast unit and integration testing of async route handlers, middleware mocks, and database queries.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'Postman & Bruno',
        years: '3.5 Yrs',
        confidence: 'Expert (95%)',
        confidenceValue: 95,
        project: 'API Contract & Load Verification',
        tooltip: 'Building automated collection runs, environment variables, JWT bearer flows, and endpoint assertions.',
        link: { text: 'Auth Microservice', url: '/project/auth-microservice' }
      }
    ]
  },
  {
    discipline: 'DevOps',
    id: 'devops',
    description: 'Containerization, continuous integration, and version-controlled environments.',
    skills: [
      {
        name: 'Docker & Containerization',
        years: '3.0 Yrs',
        confidence: 'Proficient (90%)',
        confidenceValue: 90,
        project: 'Multi-Stage Microservice Images',
        tooltip: 'Writing multi-stage Dockerfiles, optimizing layer caching, alpine Linux base images, and docker-compose stacks.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'GitHub Actions CI/CD',
        years: '2.0 Yrs',
        confidence: 'Proficient (85%)',
        confidenceValue: 85,
        project: 'Automated Build & Deploy Pipeline',
        tooltip: 'Building automated workflows for linting, running Vitest suites, pushing Docker containers, and Cloud Run deploy.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'Git & GitHub Workflows',
        years: '3.5 Yrs',
        confidence: 'Expert (95%)',
        confidenceValue: 95,
        project: 'Branching Strategy & PR Reviews',
        tooltip: 'Git rebase strategies, feature branching, semver tagging, and commit hooks.',
        link: { text: 'GitHub Profile', url: 'https://github.com/Devanshukoli' }
      }
    ]
  },
  {
    discipline: 'Databases',
    id: 'databases',
    description: 'Relational ACID isolation, high-speed Redis caching, and NoSQL document storage.',
    skills: [
      {
        name: 'PostgreSQL',
        years: '3.0 Yrs',
        confidence: 'Expert (92%)',
        confidenceValue: 92,
        project: 'Eisen-Hover Task Allocation Engine',
        tooltip: 'Complex SQL queries, SELECT FOR UPDATE SKIP LOCKED, generated columns, partial indexes, and transaction isolation.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'Redis',
        years: '3.0 Yrs',
        confidence: 'Expert (92%)',
        confidenceValue: 92,
        project: 'Priority Queues & Pub/Sub Adapter',
        tooltip: 'Redis Sorted Sets (ZADD/ZPOPMIN), Redis Pub/Sub channels, sliding window rate limiters, and session caches.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'MongoDB',
        years: '2.5 Yrs',
        confidence: 'Proficient (88%)',
        confidenceValue: 88,
        project: 'Distributed Chat Message Storage',
        tooltip: 'Document schema validation, compound indexing for cursor pagination, and aggregation pipelines.',
        link: { text: 'Realtime Chat Engine', url: '/project/realtime-presence-chat' }
      },
      {
        name: 'MySQL',
        years: '3.0 Yrs',
        confidence: 'Proficient (90%)',
        confidenceValue: 90,
        project: 'Zero-Trust User & Auth Store',
        tooltip: 'Relational schema design, foreign key cascades, refresh token revocation indexing, and query optimization.',
        link: { text: 'Auth Microservice', url: '/project/auth-microservice' }
      }
    ]
  },
  {
    discipline: 'AI',
    id: 'ai',
    description: 'Server-side LLM proxying, tool function calling, prompt defense, and streaming token responses.',
    skills: [
      {
        name: 'Google Gemini API SDK',
        years: '1.5 Yrs',
        confidence: 'Expert (92%)',
        confidenceValue: 92,
        project: 'Gemini Agent Proxy Service',
        tooltip: '@google/genai TypeScript SDK integration, Gemini 2.5 Flash model invocation, streaming chunk piping, and system prompts.',
        link: { text: 'Gemini Agent Proxy', url: '/project/gemini-agent-proxy' }
      },
      {
        name: 'LLM Function Calling',
        years: '1.5 Yrs',
        confidence: 'Expert (90%)',
        confidenceValue: 90,
        project: 'Structured Agent Workflows',
        tooltip: 'Enforcing strict JSON Schema definitions for tool declarations, parameter validation, and deterministic output parsing.',
        link: { text: 'Gemini Agent Proxy', url: '/project/gemini-agent-proxy' }
      },
      {
        name: 'Prompt Defense & Sanitization',
        years: '1.5 Yrs',
        confidence: 'Proficient (88%)',
        confidenceValue: 88,
        project: 'Secure AI Proxy Middleware',
        tooltip: 'System prompt guardrails against prompt injection attacks and real-time DOMPurify sanitization of generated markdown.',
        link: { text: 'Gemini Agent Proxy', url: '/project/gemini-agent-proxy' }
      }
    ]
  },
  {
    discipline: 'System Design',
    id: 'system-design',
    description: 'Designing distributed, fault-tolerant backends with zero single points of failure.',
    skills: [
      {
        name: 'Microservices Architecture',
        years: '2.5 Yrs',
        confidence: 'Proficient (90%)',
        confidenceValue: 90,
        project: 'Distributed Portfolio Backend',
        tooltip: 'Decoupling domain logic into independent microservices communicating via HTTP REST, Redis Pub/Sub, and JWT trust.',
        link: { text: 'Auth Microservice', url: '/project/auth-microservice' }
      },
      {
        name: 'Concurrency & Locking',
        years: '3.0 Yrs',
        confidence: 'Expert (92%)',
        confidenceValue: 92,
        project: 'Eisen-Hover Matrix Task Allocator',
        tooltip: 'Solving double-allocation bugs using ACID database isolation, SELECT FOR UPDATE SKIP LOCKED, and Redis atomic operators.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'Rate Limiting & Throttling',
        years: '3.0 Yrs',
        confidence: 'Expert (92%)',
        confidenceValue: 92,
        project: 'Token Bucket Rate Protection',
        tooltip: 'Sliding window algorithms in Redis and Express middleware protecting endpoints against brute force and DDoS.',
        link: { text: 'Auth Microservice', url: '/project/auth-microservice' }
      }
    ]
  },
  {
    discipline: 'Observability',
    id: 'observability',
    description: 'Telemetry, structured log formats, metric tracking, and background worker health monitoring.',
    skills: [
      {
        name: 'OpenTelemetry & Tracing',
        years: '1.5 Yrs',
        confidence: 'Proficient (82%)',
        confidenceValue: 82,
        project: 'Eisen-Hover Distributed Tracing',
        tooltip: 'Instrumenting HTTP routes and database calls with span contexts to visualize request latency across microservices.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      },
      {
        name: 'Structured Logging (Winston/Pino)',
        years: '3.0 Yrs',
        confidence: 'Expert (90%)',
        confidenceValue: 90,
        project: 'All Production Services',
        tooltip: 'JSON-formatted log streaming with log levels, request IDs, correlation IDs, and error stack trace capturing.',
        link: { text: 'Auth Microservice', url: '/project/auth-microservice' }
      },
      {
        name: 'Worker Heartbeat Watchdogs',
        years: '2.0 Yrs',
        confidence: 'Proficient (88%)',
        confidenceValue: 88,
        project: 'Task Worker Liveness Monitoring',
        tooltip: 'Background daemon scripts monitoring worker ping heartbeats and reclaiming orphaned tasks automatically after 30s TTL.',
        link: { text: 'Eisen-Hover Matrix', url: '/project/eisen-hover' }
      }
    ]
  }
];
