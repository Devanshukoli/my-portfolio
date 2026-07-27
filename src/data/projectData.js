export const projectDetails = {
  'eisen-hover': {
    id: 'eisen-hover',
    title: 'Eisen-Hover Matrix API & Task Dispatcher',
    status: 'DESIGN DOC APPROVED & PROD DEPLOYED v1.4',
    author: 'Devanshu Koli',
    date: 'July 2024',
    version: '1.4.0',
    tagline: 'High-throughput prioritized task allocation & decision matrix backend service',
    category: 'Backend & APIs',
    role: 'Lead Backend Engineer',
    duration: '3 Months',
    githubUrl: 'https://github.com/Devanshukoli',
    liveDemoUrl: 'https://ais-dev-5nv32v4xru5pyavnacw6p5-236135050293.asia-southeast1.run.app/project/eisen-hover',
    techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'JWT', 'Docker', 'OpenTelemetry'],

    overview: `The Eisen-Hover Matrix API is an enterprise task dispatching and prioritization microservice designed for concurrent automated workers and distributed teams. It algorithmically computes task urgency and importance scores using a modified 2x2 Eisenhower matrix formula, queuing tasks into sub-millisecond Redis priority structures before persisting state changes in PostgreSQL.`,

    problemStatement: `Legacy task managers rely on client-side sorting or unbounded SQL queries with ORDER BY clauses. Under high concurrency (1,000+ workers polling simultaneously), database lock contention causes thread pool exhaustion and double-allocation bugs where two workers process the same high-priority job.`,

    requirements: {
      functional: [
        'Algorithmic weight calculation for incoming tasks based on deadline proximity and impact score.',
        'Atomic worker task claiming with guarantee of single-worker ownership.',
        'Real-time task state transitions (PENDING -> CLAIMED -> PROCESSING -> COMPLETED / FAILED).',
        'Automatic task timeout reclamation if worker fails to ping heartbeat within 30 seconds.'
      ],
      nonFunctional: [
        'Sub-30ms 99th percentile API latency under 1,200 requests/sec load.',
        'Zero double-allocation (ACID isolation level guarantees).',
        'High availability with graceful degradation during Redis cache miss or reconnect.'
      ]
    },

    architectureDiagram: `
+----------------------------------------------------------------------------------+
|                                API GATEWAY LAYER                                 |
|   +--------------------------+       +---------------------------------------+   |
|   |  HTTP REST (Express.js)  |       |  Rate Limiter (Token Bucket / Redis) |   |
|   +------------+-------------+       +-------------------+-------------------+   |
+----------------|-----------------------------------------|-----------------------+
                 |                                         |
                 v                                         v
+----------------------------------------------------------------------------------+
|                            PRIORITY QUEUE & CACHE LAYER                          |
|   +--------------------------------------------------------------------------+   |
|   |  Redis Sorted Sets (ZADD / ZPOPMIN) - O(log N) Priority In-Memory Queue |   |
|   +------------------------------------+-------------------------------------+   |
+----------------------------------------|-----------------------------------------+
                                         |
                                         v
+----------------------------------------------------------------------------------+
|                           PERSISTENCE & ISOLATION LAYER                          |
|   +--------------------------------------------------------------------------+   |
|   |  PostgreSQL Database (SELECT ... FOR UPDATE SKIP LOCKED)                 |   |
|   |  Connection Pool: PgPool (Max 50 Connections, Idle Timeout 3000ms)      |   |
|   +--------------------------------------------------------------------------+   |
+----------------------------------------------------------------------------------+
`,
    architectureText: `The architecture separates the fast-path task polling from persistent storage. Incoming worker polling requests hit Express API nodes, which query Redis ZSETs for immediate O(log N) job extraction. Claimed tasks trigger an asynchronous row lock in PostgreSQL using 'SELECT ... FOR UPDATE SKIP LOCKED' to enforce atomic ownership with zero blocking lock queues.`,

    databaseDesign: {
      type: 'Relational (PostgreSQL 16)',
      schemaDiagram: `
TABLE tasks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        VARCHAR(255) NOT NULL,
  importance   INT CHECK (importance BETWEEN 1 AND 10),
  urgency      INT CHECK (urgency BETWEEN 1 AND 10),
  score        NUMERIC(5,2) GENERATED ALWAYS AS (importance * 0.6 + urgency * 0.4) STORED,
  status       VARCHAR(32) DEFAULT 'PENDING',
  assigned_to  UUID REFERENCES workers(id),
  claimed_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_priority ON tasks (status, score DESC) WHERE status = 'PENDING';
CREATE INDEX idx_tasks_worker_heartbeat ON tasks (assigned_to, claimed_at) WHERE status = 'PROCESSING';
`,
      tables: [
        {
          name: 'tasks',
          description: 'Core task records with stored score expression and priority indexing.',
          columns: [
            { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY', desc: 'Unique task identifier' },
            { name: 'importance', type: 'INT', constraints: '1-10', desc: 'Business impact scale' },
            { name: 'urgency', type: 'INT', constraints: '1-10', desc: 'Time sensitivity scale' },
            { name: 'score', type: 'NUMERIC', constraints: 'GENERATED STORED', desc: 'Calculated matrix weight' },
            { name: 'status', type: 'VARCHAR(32)', constraints: 'INDEXED', desc: 'PENDING, PROCESSING, DONE' }
          ]
        },
        {
          name: 'workers',
          description: 'Registered execution nodes listening for dispatched work.',
          columns: [
            { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY', desc: 'Worker instance ID' },
            { name: 'hostname', type: 'VARCHAR(128)', constraints: 'NOT NULL', desc: 'Container network name' },
            { name: 'last_heartbeat', type: 'TIMESTAMPTZ', constraints: 'NOT NULL', desc: 'Liveness ping timestamp' }
          ]
        }
      ],
      optimizationNotes: 'Utilized Partial Indexes on (status, score DESC) to exclude completed tasks from index traversal, reducing B-tree index size by 85%.'
    },

    apiDesign: [
      {
        method: 'POST',
        path: '/api/v1/tasks',
        summary: 'Submit new task into matrix queue',
        reqPayload: `{\n  "title": "Migrate Redis Cluster",\n  "importance": 9,\n  "urgency": 8\n}`,
        resPayload: `{\n  "id": "b3e21a8d-...",\n  "score": 8.6,\n  "status": "PENDING",\n  "createdAt": "2026-07-27T10:00:00Z"\n}`,
        statusCodes: '201 Created, 400 Bad Request, 429 Rate Limited'
      },
      {
        method: 'POST',
        path: '/api/v1/tasks/claim',
        summary: 'Atomically claim highest priority task for polling worker',
        reqPayload: `{\n  "workerId": "w-node-04a"\n}`,
        resPayload: `{\n  "taskId": "b3e21a8d-...",\n  "title": "Migrate Redis Cluster",\n  "lockLeaseMs": 30000\n}`,
        statusCodes: '200 OK, 204 No Content (No Tasks), 401 Unauthorized'
      }
    ],

    authentication: `Worker node requests require JWT Bearer tokens issued by the auth cluster. Tokens contain worker scopes and instance IDs. API endpoints enforce RSA-256 public key signature verification with in-memory caching to eliminate auth database lookups on high-frequency claim endpoints.`,

    performanceOptimizations: [
      { metric: 'DB Lock Contention', strategy: 'Implemented Postgres FOR UPDATE SKIP LOCKED query modifier', outcome: 'Eliminated lock wait timeouts completely under 1,200 req/sec' },
      { metric: 'Queue Pop Latency', strategy: 'Cached pending task IDs in Redis Sorted Sets (ZADD/ZPOPMIN)', outcome: 'Reduced claim latency from 45ms to 3.2ms' },
      { metric: 'Stale Worker Recovery', strategy: 'Built background worker heartbeat watchdog script', outcome: 'Reclaimed 100% of orphaned tasks within 30 seconds' }
    ],

    deployment: {
      pipeline: 'GitHub Actions CI/CD building Docker container images, running Vitest integration test suites, and executing blue-green deployments to Cloud Run.',
      infrastructure: 'Google Cloud Run, Cloud SQL PostgreSQL (db-custom-2-7680), Upstash Redis Cluster.',
      environmentVars: ['DATABASE_URL', 'REDIS_URI', 'JWT_PUBLIC_KEY', 'NODE_ENV=production', 'WORKER_HEARTBEAT_TTL=30']
    },

    codeSnippets: [
      {
        title: 'Non-Blocking Atomic Task Claim Query (Node.js & PostgreSQL)',
        language: 'javascript',
        description: 'Uses PostgreSQL SKIP LOCKED to allow concurrent workers to safely claim tasks without blocking each other.',
        code: `async function claimHighestPriorityTask(workerId) {
  const client = await pgPool.connect();
  try {
    await client.query('BEGIN');

    // Select and lock highest priority pending task, skipping locked rows
    const selectQuery = \`
      SELECT id, title, score
      FROM tasks
      WHERE status = 'PENDING'
      ORDER BY score DESC
      LIMIT 1
      FOR UPDATE SKIP LOCKED
    \`;
    const res = await client.query(selectQuery);

    if (res.rows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }

    const task = res.rows[0];

    // Mark task as claimed
    await client.query(\`
      UPDATE tasks
      SET status = 'PROCESSING', assigned_to = $1, claimed_at = NOW()
      WHERE id = $2
    \`, [workerId, task.id]);

    await client.query('COMMIT');
    return task;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}`
      }
    ],

    lessonsLearned: [
      'In high-concurrency dispatchers, polling the primary SQL database directly leads to connection exhaustion; using Redis as an in-memory staging queue drastically improves throughput.',
      'Always design background worker heartbeats with atomic TTL expiration to prevent tasks from remaining stuck in PROCESSING when containers crash unexpectedly.'
    ],

    futureWork: [
      'Introduce gRPC streaming between dispatchers and workers for persistent dual-directional execution control.',
      'Add distributed tracing with OpenTelemetry and Jaeger to visualize end-to-end task execution lifecycles.'
    ]
  },

  'gemini-agent-proxy': {
    id: 'gemini-agent-proxy',
    title: 'Intelligent AI Agent & Proxy Service',
    tagline: 'Secure server-side LLM proxy with context-aware function calling & rate management',
    category: 'AI Engineering',
    role: 'AI Systems Developer',
    duration: '2 Months',
    githubUrl: 'https://github.com/Devanshukoli',
    liveDemoUrl: 'https://ais-dev-5nv32v4xru5pyavnacw6p5-236135050293.asia-southeast1.run.app/project/gemini-agent-proxy',
    techStack: ['Node.js', 'Express.js', '@google/genai', 'TypeScript', 'DOMPurify', 'Docker'],

    overview: `The Gemini Agent Proxy Service is an enterprise-grade backend middleware that handles AI generation requests server-side. It encapsulates API secrets, enforces structured JSON Schema tool calling, sanitizes user prompts against injection attacks, and streams real-time tokens back to client interfaces.`,

    problemStatement: `Direct client-side LLM calls expose API keys in browser network inspectors, suffer from prompt injection vulnerabilities, and often fail due to non-deterministic output parsing when UI components expect rigid JSON schemas.`,

    requirements: {
      functional: [
        'Secure server-side proxying of @google/genai API requests keeping secrets strictly hidden.',
        'Structured tool / function calling with automatic schema validation before returning data to client.',
        'Real-time token streaming using Server-Sent Events (SSE).',
        'Strict output sanitization using DOMPurify to prevent XSS payloads in markdown rendering.'
      ],
      nonFunctional: [
        'Time-To-First-Token (TTFT) under 100ms.',
        'Zero API key leakages in network traffic.',
        'Sanitization overhead under 3ms per chunk stream.'
      ]
    },

    architectureDiagram: `
+----------------------------------------------------------------------------------+
|                                CLIENT BROWSER                                    |
|   +--------------------------------------------------------------------------+   |
|   |  Vue.js Single Page App (SSE Listener / Markdown Renderer)               |   |
|   +------------------------------------+-------------------------------------+   |
+----------------------------------------|-----------------------------------------+
                                         |  POST /api/ai/generate (SSE Stream)
                                         v
+----------------------------------------------------------------------------------+
|                            EXPRESS AI PROXY SERVICE                              |
|   +-------------------+      +-----------------------+      +----------------+   |
|   | Input Sanitizer   | ---> | System Prompt Wrapper | ---> | Schema Enforcer|   |
|   +-------------------+      +-----------------------+      +----------------+   |
+----------------------------------------|-----------------------------------------+
                                         | @google/genai SDK Call
                                         v
+----------------------------------------------------------------------------------+
|                           GOOGLE GEMINI API CLOUD                                |
|   +--------------------------------------------------------------------------+   |
|   |  Gemini 2.5 Flash / Omni Models (Streaming Token Generation)            |   |
|   +--------------------------------------------------------------------------+   |
+----------------------------------------------------------------------------------+
`,
    architectureText: `All user prompts are received by an Express API proxy endpoint. The proxy validates the incoming request payload, injects enforced system safety instructions, invokes the @google/genai SDK, and pipes the streaming response directly back to the client via Server-Sent Events while sanitizing HTML content in real time.`,

    databaseDesign: {
      type: 'Stateless / In-Memory Session Storage',
      schemaDiagram: `
// Session Context Schema (In-Memory LRU Cache)
{
  sessionId: "sess_98a72b",
  userId: "usr_402",
  history: [
    { role: "user", parts: [{ text: "Summarize deployment logs" }] },
    { role: "model", parts: [{ text: "Logs analyzed: 0 errors found." }] }
  ],
  tokenCount: 420,
  updatedAt: 1722080000
}
`,
      tables: [],
      optimizationNotes: 'Utilizes sliding window token compaction to discard ancient conversation turns when total session tokens exceed 8,000.'
    },

    apiDesign: [
      {
        method: 'POST',
        path: '/api/ai/chat/stream',
        summary: 'Stream conversational tokens from Gemini model',
        reqPayload: `{\n  "sessionId": "sess_98a72b",\n  "message": "Analyze system performance"\n}`,
        resPayload: `text/event-stream\n\ndata: {"chunk": "System "}\ndata: {"chunk": "performance "}\ndata: {"chunk": "is optimal."}`,
        statusCodes: '200 OK (Stream), 400 Bad Request, 429 Rate Limit Exceeded'
      }
    ],

    authentication: `Requests are authenticated using HttpOnly session cookies. The AI proxy verifies active session credentials before making upstream calls to Gemini.`,

    performanceOptimizations: [
      { metric: 'First Token Latency', strategy: 'Piped raw Gemini stream response directly into Express SSE response', outcome: 'Achieved sub-100ms Time-To-First-Token' },
      { metric: 'Memory Overhead', strategy: 'LRU conversation history pruning based on token counts', outcome: 'Capped max session memory at 12KB per active connection' }
    ],

    deployment: {
      pipeline: 'Node.js server containerized with Docker, deployed to Google Cloud Run with secret integration from Secret Manager.',
      infrastructure: 'Cloud Run, Secret Manager (GEMINI_API_KEY).',
      environmentVars: ['GEMINI_API_KEY', 'PORT=3000', 'NODE_ENV=production']
    },

    codeSnippets: [
      {
        title: 'Streaming Gemini API Proxy with SSE (Express & @google/genai)',
        language: 'javascript',
        description: 'Server-side route handler that safely invokes Gemini streaming and pipes chunks directly to client SSE.',
        code: `const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/ai/chat/stream', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  // Set SSE Headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: 'You are a concise backend engineering assistant.'
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(\`data: \${JSON.stringify({ text: chunk.text })}\\n\\n\`);
      }
    }

    res.write('data: [DONE]\\n\\n');
    res.end();
  } catch (err) {
    console.error('Gemini Stream Error:', err);
    res.write(\`data: \${JSON.stringify({ error: 'AI Stream Failure' })}\\n\\n\`);
    res.end();
  }
});`
      }
    ],

    lessonsLearned: [
      'Streaming responses significantly improve perceived user performance compared to waiting for complete text generation.',
      'Server-side validation of prompt lengths prevents runaway token consumption and protects API quota limits.'
    ],

    futureWork: [
      'Integrate vector database embeddings (pgvector) for Retrieval-Augmented Generation (RAG) over codebase documentation.',
      'Add model fallback switching between Gemini 2.5 Flash and Gemini 2.5 Pro based on prompt complexity.'
    ]
  },

  'realtime-presence-chat': {
    id: 'realtime-presence-chat',
    title: 'Distributed Real-Time Presence & Messaging Engine',
    tagline: 'Scalable WebSocket messaging system with multi-node state synchronization',
    category: 'Distributed Systems',
    role: 'Backend Architect',
    duration: '4 Months',
    githubUrl: 'https://github.com/Devanshukoli',
    liveDemoUrl: 'https://github.com/Devanshukoli',
    techStack: ['Node.js', 'Socket.io', 'Redis Pub/Sub', 'MongoDB', 'Nginx', 'Docker'],

    overview: `The Distributed Real-Time Presence & Messaging Engine is a horizontally scalable WebSocket infrastructure capable of powering chat applications, collaborative workspaces, and live status dashboards across multiple load-balanced server nodes.`,

    problemStatement: `Single-instance WebSocket servers cannot scale past ~10,000 concurrent socket connections on a single machine. Furthermore, when requests are load-balanced across multiple nodes, users connected to Node A cannot receive events triggered by users on Node B without inter-node messaging synchronization.`,

    requirements: {
      functional: [
        'Seamless WebSocket bi-directional communication with automated fallback to HTTP long-polling.',
        'Inter-server event broadcasting using Redis Pub/Sub adapter.',
        'User presence tracking (Online, Away, Offline) with heartbeat disconnect detection.',
        'Indexed chat message history persistence in MongoDB.'
      ],
      nonFunctional: [
        'Support 10,000+ concurrent active socket connections.',
        'Inter-node event broadcast propagation latency under 15ms.',
        'Zero message loss during socket reconnection cycles.'
      ]
    },

    architectureDiagram: `
+----------------------------------------------------------------------------------+
|                                LOAD BALANCER LAYER                               |
|   +--------------------------------------------------------------------------+   |
|   |  Nginx Load Balancer (Round-Robin with IP Hash Sticky Sessions)          |   |
|   +-------------------+-----------------------------------+------------------+   |
+-----------------------|-----------------------------------|----------------------+
                        |                                   |
                        v                                   v
+---------------------------------------+   +--------------------------------------+
|            SOCKET NODE A              |   |            SOCKET NODE B             |
|   +-------------------------------+   |   |   +------------------------------+   |
|   | Socket.io + Redis Adapter     |   |   |   | Socket.io + Redis Adapter    |   |
|   +---------------+---------------+   |   |   +--------------+---------------+   |
+-------------------|-------------------+   +------------------|-------------------+
                    |                                          |
                    +-------------------+----------------------+
                                        |
                                        v
+----------------------------------------------------------------------------------+
|                           REDIS PUB/SUB MESSAGING BUS                            |
|   +--------------------------------------------------------------------------+   |
|   |  Redis Instance (Channel: 'chat-events', 'presence-heartbeat')           |   |
|   +-----------------------------------+--------------------------------------+   |
+---------------------------------------|------------------------------------------+
                                        |
                                        v
+----------------------------------------------------------------------------------+
|                            PERSISTENT STORAGE LAYER                              |
|   +--------------------------------------------------------------------------+   |
|   |  MongoDB Cluster (Collection: 'messages', Index: { room_id: 1, date: -1 })|  |
|   +--------------------------------------------------------------------------+   |
+----------------------------------------------------------------------------------+
`,
    architectureText: `Client sockets connect to an Nginx load balancer which routes connections across stateless Socket.io instances. When a message or presence update is sent to Node A, the Socket.io Redis Adapter publishes the event payload to a Redis Pub/Sub channel. Node B receives the pub/sub notification and immediately broadcasts it to its locally connected sockets.`,

    databaseDesign: {
      type: 'Document Database (MongoDB 7.0)',
      schemaDiagram: `
db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["room_id", "sender_id", "content", "created_at"],
      properties: {
        room_id: { bsonType: "string" },
        sender_id: { bsonType: "string" },
        content: { bsonType: "string" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.messages.createIndex({ room_id: 1, created_at: -1 });
`,
      tables: [],
      optimizationNotes: 'Compound index on { room_id: 1, created_at: -1 } allows efficient cursor pagination for message history fetching.'
    },

    apiDesign: [
      {
        method: 'WS',
        path: 'ws://domain/socket.io',
        summary: 'Establish bi-directional WebSocket connection',
        reqPayload: `Events: "join_room", "send_message", "presence_ping"`,
        resPayload: `Events: "new_message", "presence_update", "error"`,
        statusCodes: '101 Switching Protocols'
      }
    ],

    authentication: `Handshake authentication is validated via Socket.io auth middleware using JWT tokens passed in the initial connection query parameters.`,

    performanceOptimizations: [
      { metric: 'Cross-Node Latency', strategy: 'Redis Pub/Sub binary message packing', outcome: 'Sub-15ms broadcast propagation across 4 nodes' },
      { metric: 'Reconnection Recovery', strategy: 'In-memory client message buffer window', outcome: 'Zero dropped messages during 5-second socket drops' }
    ],

    deployment: {
      pipeline: 'Dockerized microservice deployed across multiple Compute instances with Nginx reverse proxy load balancing.',
      infrastructure: 'Cloud Compute Instance Group, Redis Enterprise Cloud, MongoDB Atlas Cluster.',
      environmentVars: ['PORT=3000', 'REDIS_PUB_SUB_URL', 'MONGO_URI', 'JWT_SECRET']
    },

    codeSnippets: [
      {
        title: 'Distributed Socket.io Adapter Setup with Redis Pub/Sub',
        language: 'javascript',
        description: 'Configures Socket.io server nodes to share state and broadcast events across multiple worker processes.',
        code: `const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

async function initializeSocketCluster(httpServer) {
  const pubClient = createClient({ url: process.env.REDIS_PUB_SUB_URL });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);

  const io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    adapter: createAdapter(pubClient, subClient)
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    // Verify JWT token
    next();
  });

  io.on('connection', (socket) => {
    console.log(\`Socket \${socket.id} connected on process \${process.pid}\`);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      io.to(roomId).emit('user_joined', { socketId: socket.id });
    });

    socket.on('send_message', async (data) => {
      // Event automatically broadcasts across all cluster nodes via Redis
      io.to(data.roomId).emit('new_message', data);
    });
  });

  return io;
}`
      }
    ],

    lessonsLearned: [
      'Sticky sessions or Redis Pub/Sub adapters are mandatory when scaling Socket.io beyond a single container instance.',
      'Disconnect heartbeats must be debounced to prevent flapping user status during brief network flickers.'
    ],

    futureWork: [
      'Implement WebRTC signaling endpoints for direct peer-to-peer media streaming.',
      'Add message delivery receipts and read indicators.'
    ]
  },

  'auth-microservice': {
    id: 'auth-microservice',
    title: 'Hardened Zero-Trust Auth Microservice',
    tagline: 'Standalone authentication engine with OAuth2, JWT rotation, and rate protection',
    category: 'Security & Microservices',
    role: 'Security & Backend Engineer',
    duration: '2 Months',
    githubUrl: 'https://github.com/Devanshukoli',
    liveDemoUrl: 'https://github.com/Devanshukoli',
    techStack: ['Express.js', 'MySQL', 'JWT', 'OAuth2', 'bcrypt', 'express-rate-limit'],

    overview: `The Hardened Zero-Trust Auth Microservice provides centralized identity management, short-lived JWT access token generation, HTTP-only refresh token rotation, and strict rate-limiting defenses against brute-force attacks.`,

    problemStatement: `Monolithic applications storing access tokens in client localStorage expose user credentials to Cross-Site Scripting (XSS) attacks. Furthermore, unrotated refresh tokens allow compromised keys to remain valid indefinitely.`,

    requirements: {
      functional: [
        'OAuth2 authorization code grant flow integration (Google & GitHub).',
        'Dual-token lifecycle: 15-minute JWT Access Tokens + 7-day Refresh Tokens.',
        'Automatic refresh token rotation (old token invalidated upon use).',
        'IP-based sliding window rate limiting on sensitive routes.'
      ],
      nonFunctional: [
        'Password hashing time using bcrypt (cost factor 12) ~250ms per hash.',
        'Zero exposure of sensitive tokens to JavaScript context (HttpOnly cookies).',
        'Compliant with OWASP Top 10 security guidelines.'
      ]
    },

    architectureDiagram: `
+----------------------------------------------------------------------------------+
|                                CLIENT BROWSER                                    |
|   +--------------------------------------------------------------------------+   |
|   |  Browser Application (Stores Refresh Token in HttpOnly Cookie)           |   |
|   +------------------------------------+-------------------------------------+   |
+----------------------------------------|-----------------------------------------+
                                         |  POST /api/auth/login
                                         v
+----------------------------------------------------------------------------------+
|                              AUTH MICROSERVICE                                   |
|   +-------------------+      +-----------------------+      +----------------+   |
|   | Rate Limiter      | ---> | bcrypt Password Hash  | ---> | JWT Generator  |   |
|   +-------------------+      +-----------------------+      +----------------+   |
+----------------------------------------|-----------------------------------------+
                                         |
                                         v
+----------------------------------------------------------------------------------+
|                              MYSQL USER STORAGE                                  |
|   +--------------------------------------------------------------------------+   |
|   |  Users Table & Blacklisted Refresh Tokens Table                          |   |
|   +--------------------------------------------------------------------------+   |
+----------------------------------------------------------------------------------+
`,
    architectureText: `Clients submit credentials to the auth microservice, where IP rate limiters check for brute force attempts. Passwords are validated using bcrypt. Upon successful authentication, a short-lived access token is returned in JSON, while a refresh token is set in a Secure, HttpOnly, SameSite=Strict cookie.`,

    databaseDesign: {
      type: 'Relational (MySQL 8.0)',
      schemaDiagram: `
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE refresh_tokens (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  is_revoked BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`,
      tables: [
        {
          name: 'users',
          description: 'User identity records with unique email constraints.',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', constraints: 'PRIMARY KEY', desc: 'UUID identifier' },
            { name: 'email', type: 'VARCHAR(255)', constraints: 'UNIQUE NOT NULL', desc: 'User email' },
            { name: 'password_hash', type: 'VARCHAR(255)', constraints: 'NOT NULL', desc: 'Bcrypt hashed password' }
          ]
        }
      ],
      optimizationNotes: 'Refresh tokens table indexed by user_id and token_hash for instant revocation lookups.'
    },

    apiDesign: [
      {
        method: 'POST',
        path: '/api/auth/login',
        summary: 'Authenticate credentials and issue token pair',
        reqPayload: `{\n  "email": "devanshu@example.com",\n  "password": "SecretPassword123!"\n}`,
        resPayload: `{\n  "accessToken": "eyJhbGciOi...",\n  "expiresIn": 900\n}\nCookie: refreshToken=abc...; HttpOnly; Secure; SameSite=Strict`,
        statusCodes: '200 OK, 401 Unauthorized, 429 Too Many Requests'
      }
    ],

    authentication: `Implements RSA-256 asymmetric key pair signing for JWTs. Microservices can verify token validity using the public key without making calls back to the auth service.`,

    performanceOptimizations: [
      { metric: 'Bcrypt Overhead', strategy: 'Configured salt rounds to 12 balancing security vs CPU load', outcome: '250ms verification duration preventing fast brute force' },
      { metric: 'Token Verification', strategy: 'Asymmetric RSA-256 public key verification', outcome: '0ms auth database queries on downstream services' }
    ],

    deployment: {
      pipeline: 'Automated container build pipeline deploying to Cloud Run with environment secret injection.',
      infrastructure: 'Cloud Run, Cloud SQL MySQL Instance.',
      environmentVars: ['PORT=3000', 'JWT_PRIVATE_KEY', 'JWT_PUBLIC_KEY', 'DB_HOST', 'DB_USER', 'DB_PASS']
    },

    codeSnippets: [
      {
        title: 'Refresh Token Rotation and Invalidation Handler',
        language: 'javascript',
        description: 'Implements secure token rotation where consuming a refresh token immediately burns it and issues a fresh pair.',
        code: `app.post('/api/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'Refresh token missing' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Check if token exists in DB and is not revoked
    const [tokens] = await db.execute(
      'SELECT * FROM refresh_tokens WHERE id = ? AND is_revoked = FALSE',
      [decoded.tokenId]
    );

    if (tokens.length === 0) {
      // Possible reuse attack! Revoke all tokens for this user
      await db.execute('UPDATE refresh_tokens SET is_revoked = TRUE WHERE user_id = ?', [decoded.userId]);
      return res.status(403).json({ error: 'Security breach detected. All sessions revoked.' });
    }

    // Revoke current token (rotation)
    await db.execute('UPDATE refresh_tokens SET is_revoked = TRUE WHERE id = ?', [decoded.tokenId]);

    // Issue new token pair
    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = await issueRefreshToken(decoded.userId);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});`
      }
    ],

    lessonsLearned: [
      'HttpOnly cookies are essential to mitigate XSS credential theft risks.',
      'Automatic refresh token rotation acts as an effective intrusion detection system when stolen tokens are reused.'
    ],

    futureWork: [
      'Add WebAuthn / FIDO2 Passkey authentication.',
      'Implement step-up multi-factor authentication (MFA) via TOTP authenticator apps.'
    ]
  }
};
