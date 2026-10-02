# Content to verify before it ships

Each row is a fact copied from the Vue site on `legacy-v1` (`origin/main` at tag `legacy-v1`). Confirm the value or delete the row. Unverified values must not appear on the public site as if they were true.

## Handles and contact

| Status | Field | Old value | Source |
| --- | --- | --- | --- |
| VERIFY | Email | kolidevanshu02@gmail.com | HomeView, Footer |
| VERIFY | GitHub | https://github.com/Devanshukoli | HomeView, Footer |
| VERIFY | LinkedIn | https://linkedin.com/in/devanshu-koli and https://linkedin.com/in/Devanshukoli | HomeView vs Footer disagree |
| VERIFY | X | https://x.com/Devanshukoli | Footer |
| TODO | X handle casing | operator asked for `devanshukoli` | this rebuild brief |
| TODO | dev.to | not on the old site | this rebuild brief |

## Time in role

| Status | Field | Old value | Source |
| --- | --- | --- | --- |
| VERIFY | Years | 3+ Years / 3+ | HomeView trust row, AboutView stats |
| TODO | About stack sentence | Most of my work is Node.js and TypeScript with Postgres, Redis and MongoDB. | operator brief, not on old site as one sentence |

## Employers, titles, dates

These three roles are on `src/data/experienceData.js` at `legacy-v1`. They are not on the new homepage until you confirm they are real.

| Status | Title | Company | Dates | Source |
| --- | --- | --- | --- | --- |
| VERIFY | Lead Backend & AI Systems Engineer | Nexus Intelligence Labs | 2024 to Present | experienceData.js |
| VERIFY | Senior Backend Microservices Specialist | Vanguard Systems & Microservices | 2023 to 2024 | experienceData.js |
| VERIFY | Software & API Developer | Aether Software Solutions | 2022 to 2023 | experienceData.js |

## Numbers from the old experience and skill files

| Status | Claim | Old value | Source |
| --- | --- | --- | --- |
| VERIFY | Uptime | 99.99% | experienceData.js Nexus role |
| VERIFY | Throughput | 1,200 req/sec | experienceData.js, skillsData.js, ProjectView |
| VERIFY | TTFT | 450ms to 95ms (-78%) | experienceData.js |
| VERIFY | Token savings | 35% Saved | experienceData.js |
| VERIFY | P99 latency | < 24ms | experienceData.js |
| VERIFY | Concurrent sockets | 10,000+ | experienceData.js Vanguard role |
| VERIFY | Cross-node latency | sub-15ms | experienceData.js |
| VERIFY | Test coverage | 92% | experienceData.js |
| VERIFY | Node.js years | 3.5 Yrs | skillsData.js |
| VERIFY | Node.js confidence | Expert (95%) | skillsData.js |
| VERIFY | Vue years | 2.5 Yrs | skillsData.js |
| VERIFY | Location | Remote (San Francisco, CA) | experienceData.js |

## Projects

Old featured titles (not InterviewLab, RepoText, or SkillBridge):

| Status | Title | Old extra | Source |
| --- | --- | --- | --- |
| VERIFY | Eisen-Hover Matrix API & Task Dispatcher | July 2024, v1.4.0, 1,200 req/sec | projectData.js |
| VERIFY | Intelligent AI Agent & Proxy Service | github.com/Devanshukoli only | ProjectView |
| VERIFY | Distributed Real-Time Presence & Messaging Engine | github.com/Devanshukoli only | ProjectView |
| VERIFY | Hardened Zero-Trust Auth Microservice | github.com/Devanshukoli only | ProjectView |
| TODO | InterviewLab | needs one proof point | operator brief |
| TODO | RepoText | needs one proof point | operator brief |
| TODO | SkillBridge | needs one proof point | operator brief |

## Writing

| Status | Field | Old value | Source |
| --- | --- | --- | --- |
| VERIFY | Carried markdown title | Understanding Modern JavaScript | data/blog and src/blogs |
| VERIFY | Carried markdown date | 2024-06-15 | same |
| TODO | First real postmortem | none published | operator brief |

## Resume and education

| Status | Field | Notes |
| --- | --- | --- |
| TODO | Resume PDF | not in the repo |
| TODO | Education | omit until you supply it |
