# 📋 BMad Method - Templates Práticos para Deu Bom!!

## Template 1: Sprint Planning

```
╔════════════════════════════════════════╗
║      DEU BOM!! - SPRINT [N]            ║
╠════════════════════════════════════════╣
║ Duração: [Data início] → [Data fim]    ║
║ Meta Sprint: [Descrição da meta]       ║
║ Velocity: [X] story points             ║
╚════════════════════════════════════════╝

### 📌 User Stories

#### Story: [Título]
- COMO [persona] 
- EU QUERO [ação]
- POR QUE [benefício]

Critérios de Aceitação:
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

Tasks:
- [ ] Task 1 (2 SP) - Dev 1
- [ ] Task 2 (3 SP) - Dev 2
- [ ] Task 3 (2 SP) - QA

Estimativa: [5 SP] | Status: [ ] To Do | [ ] In Progress | [ ] Done
```

### 👉 Uso Prático:

```
╔════════════════════════════════════════╗
║    DEU BOM!! - SPRINT 0 (MVP)          ║
╠════════════════════════════════════════╣
║ Duração: 06/04 → 19/04                 ║
║ Meta: Lançar MVP com autenticação      ║
║ Velocity: 21 story points              ║
╚════════════════════════════════════════╝

### 📌 User Stories

#### Story 1: Dashboard de Transações
- COMO usuário DO Deu Bom!!
- EU QUERO ver minhas transações do mês
- POR QUE para entender meu fluxo de caixa

Critérios de Aceitação:
- [ ] Exibir transações em lista com data, categoria, valor
- [ ] Filtrar por mês
- [ ] Calcular saldo automático
- [ ] Funcionar offline (sincroniza online)

Tasks:
- [ ] Backend: API GET /transactions (3 SP) - João
- [ ] Frontend: Componente ListaTransacoes (3 SP) - Maria
- [ ] DB: Schema transactions + sync logic (2 SP) - Pedro
- [ ] Testes: Cobertura 80% (2 SP) - QA Bot
- [ ] Deploy: Staging → Produção (1 SP) - DevOps

Estimativa: 11 SP | Status: [✓] Done
```

---

## Template 2: Solicitação para Agentes BMad

### 📞 Como Invocar um Agente

```
@bmad-[agent-name]

**Context:**
- Projeto: Deu Bom!! (fintech app)
- Fase: [Discovery|Architecture|Planning|Implementation|Deployment]
- Prioridade: [Critical|High|Medium|Low]

**Request:**
[Descreva o que precisa]

**Constraints:**
- Deadline: [Data]
- Budget: [Tempo/Recursos]
- Restrições técnicas: [Lista]

**Desired Output:**
[Especifique formato: documento, código, diagrama, etc.]
```

### 👉 Exemplos Reais:

```
@bmad-architect

**Context:**
- Projeto: Deu Bom!!
- Fase: Architecture
- Prioridade: Critical

**Request:**
Monte a arquitetura de backend para Deu Bom!! 
que suporte:
- 100K usuários simultâneos
- Sincronização offline-first
- Integração com Open Banking (futura)

**Constraints:**
- Stack: Node.js + PostgreSQL
- Deve rodar em container (Docker)
- Budget: Deploy em um único servidor t2.large AWS

**Desired Output:**
Diagrama C4, ADRs (Architecture Decision Records), 
lista de componentes com responsabilidades
```

---

```
@bmad-pm

**Context:**
- Projeto: Deu Bom!!
- Fase: Planning
- Prioridade: High

**Request:**
Crie roadmap de produto para 6 meses 
priorizando:
1. Retention: +40% em 30 dias
2. Revenue: Caminho para monetização
3. Risk: Derrubada de segurança

**Constraints:**
- Team: 3 devs, 1 designer, 1 PM
- Sprints: 2 semanas cada
- Budget: R$ 50K/mês

**Desired Output:**
Roadmap Gantt, MoSCoW prioritization, 
métricas de sucesso, risks & mitigation
```

---

```
@bmad-developer

**Context:**
- Projeto: Deu Bom!!
- Fase: Implementation
- Prioridade: High

**Request:**
Implemente categorização automática de transações
usando IA com 95%+ acurácia.

**Constraints:**
- Framework: Não usar dependências pesadas
- Performance: < 100ms por categorização
- Dados: Treinar com 10K transações históricas

**Desired Output:**
Código pronto (backend + frontend),
testes unitários, integration tests,
PR review, documentação
```

---

## Template 3: Daily Standup (BMad Agile)

```
╔═══════════════════════════════════════╗
║    DAILY STANDUP - SPRINT [N]         ║
╠═══════════════════════════════════════╣
║ Data: [Data] | Time: 09:30 AM (15min) ║
║ Facilitador: [Nome]                   ║
╚═══════════════════════════════════════╝

### 👤 João (Backend Developer)
✅ Ontem:     API de autenticação 90% pronto
🔄 Hoje:      Testar conexão com DB, push em produção
🚨 Bloqueios:  Aguardando credenciais AWS de prod

### 👤 Maria (Frontend Developer)
✅ Ontem:     Dashboard UI mockado, inicio integração API
🔄 Hoje:      Conectar com API de João, testes E2E
🚨 Bloqueios:  Nenhum

### 👤 Pedro (DevOps/QA)
✅ Ontem:     CI/CD pipeline funcionando, Dockerfile otimizado
🔄 Hoje:      Fazer deployment em staging, teste de carga
🚨 Bloqueios:  Aguard certificado SSL

### 📊 Sprint Status
- Progresso: ████████░░ 80% (17/21 SP concluído)
- Velocity: On track
- Risco: BAIXO (1 bloqueio menor)

### ⚠️ Decisões Rápidas
- [ ] Realocar Pedro para ajudar João? SIM (1h)
- [ ] Estender deadline de João? NÃO
- [ ] Avisar stakeholders? NÃO (tudo ok)
```

---

## Template 4: Retrospectiva Sprint (BMad Improvement)

```
╔═══════════════════════════════════════╗
║    RETROSPECTIVA - SPRINT [N]         ║
╠═══════════════════════════════════════╣
║ Data: [Data] | Time: 14:00 (1h)       ║
║ Facilitador: PM                       ║
╚═══════════════════════════════════════╝

### 🟢 O que foi bem?
1. Comunicação do time foi excelente
   → Continuar daily standups
   
2. Arquitetura escalável permitiu mudanças rápidas
   → Reutilizar padrão em próximo sprint

3. Testes automatizados evitaram bugs em produção
   → Aumentar cobertura para 90%

### 🔴 O que não foi bem?
1. Estimativas pessimistas (10 SP / 21 completados)
   → Refinar processo de estimation
   
2. Mudanças de requisito no meio do sprint
   → Implementar change control mais rigoroso
   
3. Falta de documentação de API
   → Criar DOD (Definition of Done) com docs obrigatória

### 🟡 O que melhorar?
1. [ ] PR review < 2h (era 6h)
2. [ ] Daily > 15min para ser exato
3. [ ] Incluir QA dev mais cedo no desenho

### 📈 Métricas Sprint
- Velocity: 21 SP (Target: 18 SP, ✅ +16%)
- Bugs: 2 críticos resolvidos
- Coverage: 75% → 82%
- Uptime: 99.8%

### 🎯 Ações para Próximo Sprint
1. [ ] João: Semana ágil + estimation training
2. [ ] Maria: Documentar API com Swagger
3. [ ] Pedro: Setup auto-scaling em produção
4. [ ] PM: Implementar change freeze (últimas 48h sprint)
```

---

## Template 5: Backlog Priorization (MoSCoW)

```
╔════════════════════════════════════════════════╗
║   DEU BOM!! - PRODUCT BACKLOG PRIORITIZATION  ║
╠════════════════════════════════════════════════╣
║ Sprint: 0-3 | Priorização: MoSCoW + Value/Effort
╚════════════════════════════════════════════════╝

### 🔴 MUST HAVE (MVP - Fazer agora)
| # | Feature | Value | Effort | SP | Sprint |
|---|---------|-------|--------|----|----|
| 1 | Autenticação OAuth2 | 10 | 5 | 5 | S0 |
| 2 | CRUD Transações | 9 | 4 | 3 | S0 |
| 3 | Dashboard | 9 | 3 | 2 | S0 |
| 4 | Categorização Manual | 8 | 3 | 2 | S0 |
| 5 | Relatório Mensal | 8 | 2 | 1 | S0 |

### 🟡 SHOULD HAVE (Importante - Próximo)
| # | Feature | Value | Effort | SP | Sprint |
|---|---------|-------|--------|----|----|
| 6 | Categorização IA | 9 | 8 | 8 | S1 |
| 7 | Previsão Despesas | 8 | 6 | 5 | S1 |
| 8 | Backup Cloud | 7 | 4 | 3 | S1 |
| 9 | Alertas | 7 | 3 | 2 | S1 |

### 🟢 COULD HAVE (Nice-to-have - Depois)
| # | Feature | Value | Effort | SP | Sprint |
|---|---------|-------|--------|----|----|
| 10 | Multi-conta bancária | 6 | 7 | 5 | S2 |
| 11 | Compartilhamento Família | 5 | 5 | 3 | S2 |
| 12 | Dark Mode | 4 | 2 | 1 | S2 |

### ⚪ WON'T HAVE (Descartado ou futuro)
- Integração cripto (complexo, risco regulatório)
- Robo-advisor (sem escala)
- Gamificação (não é MVP)

### 📊 Análise
- MUST HAVE: 13 SP → Sprint 0 (80% capacity)
- SHOULD HAVE: 18 SP → Sprint 1-2
- Total roadmap 6m: ~45 SP
```

---

## Template 6: Architecture Decision Record (ADR)

```
# ADR-001: Escolher React vs Vue para Frontend

## Status: **ACCEPTED**

## Context
Deu Bom!! precisa de frontend rápido, escalável e com bom suporte 
para PWA offline-first.

## Decision
**Usar REACT + Vite + TypeScript**

## Rationale
- Ecossistema maduro para financial apps
- TypeScript para type safety (crítico em fintech)
- Vite: 10x mais rápido que Webpack
- React Query ideal para sincronização offline
- Community grande = fácil encontrar Devs

## Alternatives Considered
1. Vue.js: ✅ Simples, ❌ menor comunidade financeira
2. Svelte: ✅ Performático, ❌ menos maduro
3. Vanilla JS: ❌ Difícil de manter, ❌ sem type safety

## Consequences
- ✅ Onboarding mais rápido (React é popular)
- ✅ Type safety = menos bugs em produção
- ❌ Bundle size maior (~50KB gzipped)
- ❌ Build time mais longo (mitigado com Vite)

## Implementation Plan
1. Setup Vite + React template
2. Configurar TypeScript + ESLint + Prettier
3. Implementar React Query para data fetching
4. Setup Vitest para testes unitários

## Decision Date: 2024-06-04
## Reviewed By: Arquiteto + Tech Lead
```

---

## Template 7: Testing Strategy (BMad QA)

```
╔═════════════════════════════════════════╗
║   DEU BOM!! - TESTING STRATEGY          ║
╠═════════════════════════════════════════╣
║ Target Coverage: 80%+ | Environments: 3 ║
╚═════════════════════════════════════════╝

### 🔵 Unit Tests (60%)
**O:** Cada função e componente isolado
**Stack:** Vitest (frontend) + Jest (backend)
**Exemplo:**
```javascript
describe('categorizeTransaction', () => {
  it('should categorize food expense', () => {
    const tx = { description: "Ifood", amount: 50 };
    expect(categorizeTransaction(tx)).toBe("Food");
  });
});
```

### 🟢 Integration Tests (20%)
**O:** Fluxo entre componentes > API > DB
**Stack:** Cypress (E2E) + Supertest (API)
**Exemplo:**
```javascript
it('should create transaction and update dashboard', () => {
  cy.login('user@test.com');
  cy.get('[data-cy=new-tx]').click();
  cy.get('[data-cy=amount]').type('100');
  cy.get('[data-cy=submit]').click();
  cy.contains('R$ 100.00');
});
```

### 🟡 Performance Tests (10%)
**O:** LightHouse > 90, TTI < 3s, Stress test 1000 users
**Stack:** Lighthouse CI + K6
**Targets:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Largest Contentful Paint: < 2.5s

### 🔴 Security Tests (10%)
**O:** OWASP Top 10, SQL injection, XSS
**Stack:** Snyk + CSRF tokens
**Checklist:**
- [ ] Rate limiting ativado
- [ ] Sem secrets em código
- [ ] Validação de input
- [ ] SQL parametrizado

### 📊 Coverage Report
```
File                          | % Stmts | % Branch | % Funcs
—————————————————————————————————————————————————————————————
All files                     |   82.1  |   76.3   |   85.2
 models/Transaction.ts        |   95.0  |   92.0   |  100
 components/Dashboard.tsx     |   78.0  |   65.0   |   85
 services/CategoryAI.ts       |   72.0  |   60.0   |   75
```
```

---

## Template 8: Release Notes (BMad Communication)

```
╔═════════════════════════════════════════╗
║  🎉 DEU BOM!! v1.0.0 - ALPHA RELEASE   ║
╠═════════════════════════════════════════╣
║ Data: 2024-06-19 | Tipo: MVP Launch     ║
╚═════════════════════════════════════════╝

## ✨ O que há de novo

### 🔐 Autenticação
- Login com Google / Apple
- Recuperação de senha 2FA
- Modo offline suportado

### 💰 Gerenciamento de Transações
- Adicionar/Editar/Deletar transações
- Categorização manual (16 categorias)
- Sincronização automática online/offline
- Relatório mensal PDF exportável

### 📊 Dashboard
- Visão geral do mês atual
- Gráfico pizza categorizado
- Saldo disponível em tempo real
- Dark mode automático

## 🐛 Bug Fixes
- Corrigido erro de sincronização na abertura (#143)
- Melhorado performance em 50+ transações (#156)
- Suporte a valores com casas decimais (#167)

## 📈 Performance
- 25% mais rápido que protótipo
- 60% redução em tamanho de bundle
- Suporte offline completo
- Uptime: 99.8%

## 🚀 Conhecido Issues
- [ ] Integração bancária ainda em beta
- [ ] Suporte a múltiplas moedas: v1.1
- [ ] Compartilhamento em família: v1.2

## 📲 Como Instalar
1. Acesse: https://deubom.app
2. "Instalar app" (PWA) ou Play Store
3. Faça login com Google
4. Inicie!

## 🙏 Agradecimentos
Obrigado aos early adopters e ao time!

---

**⬆️ Próxima Release:** v1.1 (Categorização IA) - Julho/2024
```

---

## 🎓 Como Usar Estes Templates

1. **sprint-planning.md** → Planning Meeting (Início do sprint)
2. **daily-standup.md** → Daily (Todos os dias 09:30)
3. **retrospective.md** → Fim do sprint (Aprender + Melhorar)
4. **backlog-prioritization.md** → Refinement (Preparar próximo sprint)
5. **adr.md** → Decisões técnicas importantes
6. **testing-strategy.md** → QA planning
7. **release-notes.md** → Comunicar valor

---

**💡 Dica Final:**
Customize estes templates para seu contexto. BMad não é rígido — é um framework que se adapta!

*Boa sorte com Deu Bom!! 🚀*
