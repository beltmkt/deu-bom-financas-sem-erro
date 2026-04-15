# 🎨 FASE 2: Redesenho de Páginas - Plano de Execução

> **Status:** 📋 PRONTO PARA IMPLEMENTAR  
> **Duração:** 2 semanas (20 horas dev)  
> **Responsável:** Dev + Designer + UX  
> **Pré-requisito:** FASE 1 implementada

---

## 📊 Visão Geral FASE 2

### O que vai mudar?

| Página | Situação | Mudança | Impacto |
|--------|----------|---------|---------|
| **HOME** | Caótica | Hierarquia clara | +40% engajamento |
| **DASHBOARD** | Redundante | → TRANSACTIONS | -30% conf. usuário |
| **ANALYTICS** | Não existe | Nova página | +50% retenção |

### Resultado esperado

```
ANTES: Usuário confuso, onde clicar?
DEPOIS: Usuário sabe exatamente o que fazer ✅
```

---

## 🎯 Objetivo Geral

Redesenhar 3 páginas do DEU BOM!! com:
- ✅ Hierarquia visual cristalina
- ✅ Sem redundâncias
- ✅ Componentes reutilizáveis da FASE 1
- ✅ Responsivo em 4 breakpoints
- ✅ Acessibilidade WCAG 2.1 AA
- ✅ Dark mode compatível

---

## 📋 Estrutura FASE 2

### 1️⃣ Página HOME - Redesenho
**Tempo:** 5 horas  
**Complexidade:** ⭐⭐⭐ Média  
**Componentes:** BalanceCard (novo layout) + TransactionList (preview)

#### Mudanças Principais:
```
ANTES:
├─ Header padrão
├─ Saldo pequeno (H4)
├─ Gasto + Receita lado-a-lado
├─ Últimas TX (limite 5)
└─ Resumo do mês

DEPOIS:
├─ Header minimalista
├─ Saldo GRANDE (H1 - 48px)
├─ Label clara: "SALDO ATUAL"
├─ Gasto + Receita (2º nível)
├─ Últimas 3 TX (preview)
├─ CTAs claras ("Ver mais", "Nova TX")
└─ Bootom nav com 3 abas
```

#### Layout específico:
```jsx
// Home Layout
<Page>
  <Header /> {/* Minimalista */}
  
  <Section>
    <BalanceCard 
      size="large"           // Novo: large
      variant="primary"
      amount={1500}
      label="SALDO ATUAL"
      subtext="Atualizado há 2 min"
    />
  </Section>
  
  <Section>
    <Row>
      <BalanceCard size="medium" variant="income" ... />
      <BalanceCard size="medium" variant="expense" ... />
    </Row>
  </Section>
  
  <Section>
    <TransactionList 
      limit={3}
      transactions={[...]}
      showViewMore={true}
    />
  </Section>
  
  <BottomNav /> {/* 3 abas: Home, Transactions, Analytics */}
</Page>
```

---

### 2️⃣ Página TRANSACTIONS - Redesenho (era Dashboard)
**Tempo:** 7 horas  
**Complexidade:** ⭐⭐⭐⭐ Alta  
**Componentes:** FilterBar + TransactionList (full mode)

#### Mudanças Principais:
```
ANTES:
├─ Saldo duplicado (ERRO!)
├─ Lista simples de 20 TX
├─ Sem filtros
├─ Sem ações

DEPOIS:
├─ SEM saldo (evita confusão)
├─ Filtros inteligentes (Período, Categoria)
├─ Busca por descrição
├─ Seleção múltipla
├─ Ações em massa (delete, tag)
├─ Paginação inteligente
└─ Exportar data
```

#### Componentes novos:
```jsx
// Novo componente: FilterBar
<FilterBar
  periods={['Últimos 30d', 'Este mês', 'Custom']}
  categories={[...]}
  onFilter={(filter) => {...}}
/>

// TransactionList em modo "full"
<TransactionList
  limit={null}              // Mostrar tudo
  transactions={[...]}
  grouped={false}
  selectable={true}         // Checkboxes
  editable={true}           // Botões edit/delete
  onSelectionChange={...}
/>

// Ações em massa
<ActionBar
  selectedCount={2}
  actions={[
    { label: 'Deletar', icon: '🗑', handler: () => {...} },
    { label: 'Categorizar', icon: '🏷', handler: () => {...} },
  ]}
/>
```

---

### 3️⃣ Página ANALYTICS - Nova ✨
**Tempo:** 8 horas  
**Complexidade:** ⭐⭐⭐⭐⭐ Alta  
**Componentes:** CategoryChart (novo) + TrendChart (novo) + InsightCard (novo)

#### Estrutura:
```jsx
// Analytics Layout
<Page>
  <Header title="Análise" />
  
  <FilterBar periods={[...]} /> {/* Reutiliza FilterBar */}
  
  <Section>
    <CategoryChart 
      data={gastosPorCategoria}
      type="pie"  // ou "donut"
    />
  </Section>
  
  <Section>
    <TrendChart
      data={tendencia3meses}
      metric="gastos"
    />
  </Section>
  
  <Section>
    <InsightCard icon="💡" 
      text="Você gastou 15% a mais em Comida" 
    />
    <InsightCard icon="⚠️" 
      text="Próximo limite de crédito em 5 dias" 
    />
  </Section>
  
  <Section>
    <Button onClick={exportData}>💾 Exportar</Button>
  </Section>
  
  <BottomNav />
</Page>
```

#### Componentes novos a criar:

**1. CategoryChart.jsx** (100 linhas)
```jsx
// Gráfico de pizza/donut por categoria
export function CategoryChart({ data, type = 'pie' }) {
  // data = [
  //   { category: 'Comida', amount: 350, color: '#10B981' },
  //   { category: 'Transporte', amount: 250, color: '#EF4444' },
  //   ...
  // ]
}
```

**2. TrendChart.jsx** (120 linhas)
```jsx
// Gráfico de linha com tendência
export function TrendChart({ data, metric = 'gastos' }) {
  // data = [
  //   { month: 'Jan', value: 1500 },
  //   { month: 'Fev', value: 1750 },
  //   ...
  // ]
}
```

**3. InsightCard.jsx** (50 linhas)
```jsx
// Card com insight gerado por IA
export function InsightCard({ icon, text, action = null }) {
  // Exemplo: 💡 "Você gastou 15% a mais em Comida"
}
```

**4. FilterBar.jsx** (150 linhas)
```jsx
// Barra de filtros reutilizável para 2 páginas
export function FilterBar({ periods, categories, onFilter }) {
  // Dropdown de período
  // Checkboxes de categoria
  // Reset button
}
```

---

## 🛠️ Componentes Necessários

### Componentes REUTILIZÁVEIS (já existem da FASE 1)
- ✅ BalanceCard
- ✅ TransactionList
- ✅ theme.js (CSS variables)
- ✅ globals.css (estilos base)

### Componentes NOVOS (criar em FASE 2)
- 🆕 **FilterBar** (reutilizável em 2 páginas)
- 🆕 **CategoryChart** (gráfico pizza/donut)
- 🆕 **TrendChart** (gráfico de linha)
- 🆕 **InsightCard** (card com insights)
- 🆕 **ActionBar** (ações em massa)
- 🆕 **BottomNav** (navegação inferior)

### Componentes MODIFICADOS (da FASE 1)
- 📝 BalanceCard: adicionar `size="large"` variant
- 📝 TransactionList: adicionar modo `grouped` para Analytics

---

## 📁 Arquitetura de Pastas

```
src/
├── components/
│   ├── financial/            ← FASE 1
│   │   ├── BalanceCard.jsx
│   │   ├── BalanceCard.css
│   │   ├── TransactionList.jsx
│   │   ├── TransactionList.css
│   │   └── index.js
│   │
│   ├── pages/                ← NOVO - FASE 2
│   │   ├── HomePage.jsx
│   │   ├── HomePage.css
│   │   ├── TransactionsPage.jsx
│   │   ├── TransactionsPage.css
│   │   ├── AnalyticsPage.jsx
│   │   ├── AnalyticsPage.css
│   │   └── index.js
│   │
│   ├── common/               ← NOVO - FASE 2
│   │   ├── FilterBar.jsx
│   │   ├── FilterBar.css
│   │   ├── ActionBar.jsx
│   │   ├── ActionBar.css
│   │   ├── BottomNav.jsx
│   │   ├── BottomNav.css
│   │   └── index.js
│   │
│   └── analytics/            ← NOVO - FASE 2
│       ├── CategoryChart.jsx
│       ├── CategoryChart.css
│       ├── TrendChart.jsx
│       ├── TrendChart.css
│       ├── InsightCard.jsx
│       ├── InsightCard.css
│       └── index.js
│
├── styles/                   ← FASE 1
│   ├── theme.js
│   └── globals.css
│
└── App.jsx
    ├── import HomePage
    ├── import TransactionsPage
    └── import AnalyticsPage
```

---

## 📐 Design Tokens (CSS Variables)

### Cores já existem (theme.js + globals.css)
```css
--color-primary: #575ECF
--color-success: #10B981
--color-danger: #EF4444
--color-warning: #F59E0B
```

### Spacing Novo para FASE 2
```css
--space-section-gap: 24px     /* Entre seções */
--space-item-gap: 12px        /* Entre itens na lista */
--page-padding: 16px          /* Padding horizontal padrão */
```

### Breakpoints (já em theme.js)
```css
xs: 320px   /* Mobile pequeno */
sm: 375px   /* Mobile padrão */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
```

---

## ⏱️ Timeline Detalhado FASE 2

### Semana 1 (Dia 1-5)

**Dia 1: Setup + Home**
- Setup pastas + estrutura
- Redesenhar Home.jsx
- Estilizar Home.css
- Gerar dados fake para testes
- ✅ Home funcional + responsiva

**Dia 2-3: Transactions Page**
- Criar FilterBar.jsx
- Criar Transactions.jsx com filtros
- Implementar seleção múltipla
- Criar ActionBar.jsx
- ✅ Transactions com filtros funcionando

**Dia 4-5: Bottom Navigation**
- Criar BottomNav.jsx
- Integrar em 3 páginas
- Teste de navegação
- ✅ Nav entre 3 páginas funciona

### Semana 2 (Dia 6-10)

**Dia 6-7: Analytics Page Parte 1**
- Criar CategoryChart.jsx (gráfico pizza)
- Dados agregados de gastos
- Teste com dados reais/fake
- ✅ Gráfico de categorias funciona

**Dia 8-9: Analytics Page Parte 2**
- Criar TrendChart.jsx (gráfico linha)
- Criar InsightCard.jsx
- Integrar tudo em Analytics.jsx
- ✅ Analytics completa

**Dia 10: Polish + Testes**
- Responsividade final (testar 4 breakpoints)
- Dark mode verificação
- Testes E2E (navegação)
- Performance audit
- ✅ Ready para deploy

---

## 📝 Checklist de Implementação

### Home Page
- [ ] Saldo GRANDE (48px+)
- [ ] Label clara "SALDO ATUAL"
- [ ] Timestamps de atualização
- [ ] Gasto + Receita lado-a-lado (medium)
- [ ] Últimas 3 TX (preview)
- [ ] Link "Ver mais" → Transactions
- [ ] Button "+ Nova Transação"
- [ ] BottomNav com 3 abas
- [ ] Responsivo em 320px-1280px
- [ ] Dark mode funciona
- [ ] Acessibilidade (ARIA labels)

### Transactions Page
- [ ] Sem saldo (evita confusão)
- [ ] FilterBar com período
- [ ] FilterBar com categoria
- [ ] Busca por descrição (opcional)
- [ ] Lista de 30+ transações
- [ ] Checkboxes para seleção
- [ ] Edit/delete buttons em cada item
- [ ] ActionBar com ações em massa
- [ ] Paginação ou "Carregar mais"
- [ ] Responsivo
- [ ] Dark mode
- [ ] ARIA labels

### Analytics Page
- [ ] Category Chart (pizza/donut)
- [ ] Trend Chart (3 meses)
- [ ] FilterBar de período
- [ ] 2-3 Insight Cards
- [ ] Button exportar
- [ ] Sem dados? Empty state
- [ ] Loading state
- [ ] Responsivo
- [ ] Dark mode
- [ ] ARIA labels

### Testes
- [ ] Navegação entre 3 páginas (BottomNav)
- [ ] Filtros realmente filtram
- [ ] Seleção múltipla funciona
- [ ] Ações em massa funcionam
- [ ] Gráficos atualizam com filtros
- [ ] Mobile (320px, 375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)
- [ ] Dark mode em todas as páginas
- [ ] Console sem errors
- [ ] Velocidade aceitável (<2s load)

---

## 🔗 Referências

### Arquivos para revisar
- ✅ WIREFRAMES_MELHORIAS.md (este projeto)
- ✅ FASE1_COMPONENTES/GUIA_IMPLEMENTACAO.md
- ✅ FASE1_COMPONENTES/theme.js (design tokens)

### Dados Fake para Testes
```javascript
const mockTransactions = [
  { id: 1, date: '2026-03-14', desc: 'Ifood', amount: -45, category: 'Comida', icon: '🍔' },
  { id: 2, date: '2026-03-14', desc: 'Banco', amount: +1500, category: 'Salário', icon: '🏦' },
  { id: 3, date: '2026-03-13', desc: 'Energia', amount: -150, category: 'Contas', icon: '⚡' },
  // ... mais 27
];

const mockCategories = [
  'Comida', 'Transporte', 'Saúde', 'Educação', 
  'Lazer', 'Contas', 'Salário', 'Freelance'
];
```

### Bibliotecas Sugeridas
- **Gráficos:** `recharts` ou `chart.js` (leve)
- **Ícones:** `react-icons` (já tem?)
- **Datas:** `date-fns` ou `dayjs`

---

## ✅ Status & Próximos Passos

### Agora (Você está aqui)
- [ ] Revisar este plano
- [ ] Dar feedback
- [ ] Autorizar começar

### Dev começa
- [ ] Criar estrutura de pastas
- [ ] Começar com Home

### Depois de FASE 2
- [ ] Code review
- [ ] Testes + validação
- [ ] Deploy FASE 2
- [ ] 🎯 Começar FASE 3 (Polish & Acessibilidade)

---

## 💡 Dicas Importantes

### 1. Reutilize a máximo da FASE 1
```jsx
// ✅ Assim
import { BalanceCard, TransactionList } from '@/components/financial';
<BalanceCard size="large" ... />  // Novo size

// ❌ Evite
// Criar novo componente BalanceCardLarge
```

### 2. CSS Variables para responsividade
```css
/* ✅ Assim */
@media (max-width: 768px) {
  --space-section-gap: 16px;  /* Espaço menor */
}

/* ❌ Evite */
@media (max-width: 768px) {
  gap: 16px; /* Especificar inline */
}
```

### 3. Testes em Mobile ASAP
- Não deixe para o final
- Testar em 375px (breakpoint crítico)
- Testar com dark mode ON

### 4. IA para Insights
```javascript
// Se tiver API de IA, gere insights assim:
const insights = await generateInsights({
  transactions: arrayDe30Dias,
  previous: arrayDoMesAnterior,
});
// Resultado: ["Você gastou 15% a mais em Comida", ...]
```

---

## 📞 Suporte

**Dúvida sobre arquitetura?**
→ Revisar WIREFRAMES_MELHORIAS.md (visual)

**Dúvida sobre component API?**
→ Revisar FASE1_COMPONENTES/GUIA_IMPLEMENTACAO.md

**Dúvida sobre CSS variables?**
→ Revisar FASE1_COMPONENTES/theme.js

**Com problemas na implementação?**
→ [Me chame para debug]

---

## 🎯 Resultado esperado

```
✨ Após FASE 2:
├─ 3 páginas completamente redesenhadas
├─ Hierarquia visual cristalina
├─ 4 componentes novos + reutilizáveis
├─ Sem redundâncias
├─ Responsivo em 4 breakpoints
├─ Dark mode perfeito
├─ Acessibilidade AA
├─ Pronto para FASE 3
└─ Usuário FELIZ! 😊
```

---

**Próxima ação:** Autorizar implementação de FASE 2 ✅

