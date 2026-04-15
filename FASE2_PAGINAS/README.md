# 🎨 FASE 2 - Redesenho de 3 Páginas

> **Status:** ✅ PRONTO PARA IMPLEMENTAÇÃO  
> **Data Criação:** April 14, 2026  
> **Arquivos:** 22 (componentes + páginas)  
> **Linhas de Código:** 3.500+  
> **Tempo Dev:** 20 horas (2 semanas)  

---

## 📖 Comece por aqui

Se você é **novo** nesse projeto, leia nessa ordem:

### 1️⃣ **5 minutos** - Visão Geral
```
Leia: FASE2_VISUAL_SUMMARY.txt (este diretório)
Objetivo: Entender o que vai ser feito
```

### 2️⃣ **20 minutos** - Plano Detalhado
```
Leia: FASE2_PLANO_EXECUCAO.md (este diretório)
Objetivo: Entender como implementar
```

### 3️⃣ **30 minutos** - Revisar Wireframes
```
Leia: ../WIREFRAMES_MELHORIAS.md (nível acima)
Objetivo: Ver antes/depois visual
```

### 4️⃣ **Começar Implementação**
```
Comece pelo: HomePage.jsx (mais simples)
Template: FASE2_PAGINAS/HomePage.jsx
```

---

## 🗂️ Estrutura de Pastas

```
FASE2_PAGINAS/
│
├─ 📄 README.md (você está aqui)
├─ 📄 FASE2_VISUAL_SUMMARY.txt
├─ 📄 FASE2_PLANO_EXECUCAO.md
│
├─ 🔷 COMPONENTES COMUNS
├─ FilterBar.jsx + .css
├─ BottomNav.jsx + .css
├─ ActionBar.jsx + .css
│
├─ 📱 PÁGINA HOME
├─ HomePage.jsx + .css
│
├─ 📋 PÁGINA TRANSACTIONS
├─ TransactionsPage.jsx + .css
│
├─ 📊 PÁGINA ANALYTICS
├─ AnalyticsPage.jsx + .css
│
└─ 📈 COMPONENTES ANALYTICS
   ├─ CategoryChart.jsx + .css
   ├─ TrendChart.jsx + .css
   └─ InsightCard.jsx + .css
```

---

## 🎯 As 3 Páginas

### **HomePage** (5 horas)
Mostra saldo em DESTAQUE + balanceamento + preview de transações recentes.

```jsx
<HomePage
  balance={1500}
  expenses={500}
  income={2000}
  transactions={[...]}
/>
```

**Componentes reutilizados:** BalanceCard (2×) + TransactionList (1×)  
**Novos componentes:** BottomNav  
**Arquivo:** HomePage.jsx

---

### **TransactionsPage** (7 horas)
Página de gerenciamento com filtros, busca e ações em massa.

```jsx
<TransactionsPage
  transactions={[...]}
  categories={['Comida', 'Transporte', ...]}
/>
```

**Componentes reutilizados:** TransactionList (full mode)  
**Novos componentes:** FilterBar, ActionBar, BottomNav  
**Arquivo:** TransactionsPage.jsx

---

### **AnalyticsPage** (8 horas) - NOVA!
Página com gráficos, tendências e insights gerados por IA.

```jsx
<AnalyticsPage
  transactions={[...]}
  categories={['Comida', 'Transporte', ...]}
/>
```

**Componentes reutilizados:** FilterBar  
**Novos componentes:** CategoryChart, TrendChart, InsightCard, BottomNav  
**Arquivo:** AnalyticsPage.jsx

---

## 🔧 Componentes Novos

### **FilterBar** - Reutilizável
Filtros por período, categoria e busca.

```jsx
<FilterBar
  periods={['Últimos 30d', 'Este mês', 'Custom']}
  categories={['Comida', 'Transporte']}
  onFilter={(filter) => {...}}
/>
```

**Usado em:** TransactionsPage, AnalyticsPage  
**Linhas:** 130 (JSX) + 230 (CSS)

---

### **BottomNav** - Navegação
3 abas: Home | Transações | Análise

```jsx
<BottomNav 
  active="home"
  onNavigate={(page) => navigate(`/${page}`)}
/>
```

**Usado em:** HomePage, TransactionsPage, AnalyticsPage  
**Linhas:** 50 (JSX) + 120 (CSS)

---

### **CategoryChart** - Gráfico Pizza
Visualiza gastos por categoria em SVG.

```jsx
<CategoryChart
  data={[
    { category: 'Comida', amount: 350, color: '#F97316' },
    { category: 'Transporte', amount: 250, color: '#3B82F6' },
  ]}
  type="pie"
/>
```

**Usado em:** AnalyticsPage  
**Linhas:** 120 (JSX) + 140 (CSS)

---

### **TrendChart** - Gráfico Linha
Tendência de 3 meses com informações estatísticas.

```jsx
<TrendChart
  data={[
    { month: 'Jan', gastos: 1500, receita: 3000 },
    { month: 'Fev', gastos: 1750, receita: 3200 },
  ]}
  metric="gastos"
/>
```

**Usado em:** AnalyticsPage  
**Linhas:** 140 (JSX) + 130 (CSS)

---

### **InsightCard** - Insights
Card com insights/dicas/alertas.

```jsx
<InsightCard
  icon="💡"
  text="Você gastou 15% a mais em Comida"
  type="warning"
  action="Revisar"
/>
```

**Usado em:** AnalyticsPage  
**Linhas:** 30 (JSX) + 90 (CSS)

---

### **ActionBar** - Ações em Massa
Barra para executar ações em itens selecionados.

```jsx
<ActionBar
  selectedCount={3}
  actions={[
    { label: 'Deletar', icon: '🗑️', handler: () => {...} },
    { label: 'Categorizar', icon: '🏷️', handler: () => {...} },
  ]}
/>
```

**Usado em:** TransactionsPage  
**Linhas:** 35 (JSX) + 110 (CSS)

---

## 📐 Design System

### Tokens (da FASE 1)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | #575ECF | Botões, links |
| `--color-success` | #10B981 | Receita, positivo |
| `--color-danger` | #EF4444 | Gastos, negativo |
| `--color-warning` | #F59E0B | Alertas |
| `--color-surface` | #1E293B | Cards, containers |
| `--color-bg` | #0F172A | Background geral |

### Breakpoints

| Breakpoint | Resolução | Device |
|-----------|-----------|---------|
| xs | 320px | Mobile pequeno |
| sm | 375px | Mobile padrão |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Desktop grande |

---

## 🚀 Como Implementar

### Passo 1: Setup
```bash
# Criar pastas
mkdir -p src/components/common
mkdir -p src/components/analytics

# Copiar arquivos (automated after)
cp FASE2_PAGINAS/*.jsx src/components/
cp FASE2_PAGINAS/*.css src/components/
```

### Passo 2: Import em App.jsx
```jsx
import HomePage from '@/components/pages/HomePage';
import TransactionsPage from '@/components/pages/TransactionsPage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';

// Em seu router/state:
{currentPage === 'home' && <HomePage />}
{currentPage === 'transactions' && <TransactionsPage />}
{currentPage === 'analytics' && <AnalyticsPage />}
```

### Passo 3: Passar dados
```jsx
<HomePage
  balance={userData.balance}
  expenses={userData.monthExpenses}
  income={userData.monthIncome}
  transactions={transactionsList}
  onNavigate={(page) => setCurrentPage(page)}
/>
```

### Passo 4: Testar
```bash
# Testar responsividade
npm run dev  # Abrir DevTools → F12
# Testar breakpoints: 320px, 375px, 768px, 1024px

# Testar dark mode (via CSS variables)
# Deve usar var(--color-primary), etc.

# Testar acessibilidade
# Verificar ARIA labels em componentes

# Testar navegação
# Clicar nas abas do BottomNav
```

---

## ✅ Checklist Pré-Implementação

- [ ] FASE 1 está 100% implementada
- [ ] BalanceCard funciona (4 variants × 3 sizes)
- [ ] TransactionList funciona (3 modes)
- [ ] theme.js e globals.css estão importados
- [ ] Dark mode funciona em FASE 1
- [ ] Dados de API disponíveis (30+ transações)
- [ ] Pasta src/components/pages/ criada
- [ ] Pasta src/components/analytics/ criada

---

## 🧪 Testes Importantes

### Mobile (320px-375px) - CRÍTICO
```
Home:
- [ ] Saldo legível (não truncado)
- [ ] BalanceCards lado-a-lado?
- [ ] Scroll horizontal = 0
- [ ] BottomNav clickável
```

### Tablet (768px)
```
- [ ] Gráficos legíveis
- [ ] FilterBar coluna única
- [ ] Bem espaçado
```

### Responsividade
```
- [ ] 320px - Mobile pequeno
- [ ] 375px - Mobile iPhone
- [ ] 768px - Tablet
- [ ] 1024px - Desktop
```

### Dark Mode
```
- [ ] Cores corretas (CSS vars)
- [ ] Contraste OK (legível)
- [ ] Hover states visíveis
- [ ] Gráficos com background correto
```

### Acessibilidade
```
- [ ] ARIA labels em botões
- [ ] Keyboard navigation funciona
- [ ] Focus indicators visíveis
- [ ] Contraste > 4.5:1 (AA)
```

---

## 📊 Impacto Esperado

```
Antes:     Depois:
┌──────┐  ┌──────┐
│ CAOS │  │CLARO │  Hierarquia visual
├──────┤  ├──────┤
│ +60% │  │ -40% │  Confusão do usuário
├──────┤  ├──────┤
│ 3 TX │  │ 2 TX │  Cliques para info
├──────┤  ├──────┤
│ RED. │  │ OK   │  Redundância
└──────┘  └──────┘
```

---

## 🔗 Referências

| Documento | Onde ler |
|-----------|----------|
| Wireframes | `../WIREFRAMES_MELHORIAS.md` |
| Plano detallhado | `FASE2_PLANO_EXECUCAO.md` |
| Design system | `../FASE1_COMPONENTES/theme.js` |
| Componentes FASE 1 | `../FASE1_COMPONENTES/` |
| Resumo visual | `FASE2_VISUAL_SUMMARY.txt` |

---

## 💡 Dicas para Sucesso

1. **Comece por HomePage** - mais simples, sem filtros
2. **Teste mobile 375px** frequentemente - não deixa para final
3. **Use CSS variables** sempre - não hardcode cores
4. **Reutilize BalanceCard** + TransactionList - já existem
5. **Dark mode automático** - via CSS variables
6. **Commit por página** - não tudo de uma vez

---

## 🆘 Problemas Comuns

### "Gráficos não aparecem"
- Verificar dados mock em [NomeGrafico].jsx
- Verificar se SVG width/height corretos
- Testar em console: `console.log(data)`

### "BottomNav não navega"
- Verificar callback `onNavigate` prop
- Verificar se estado de `currentPage` muda
- Testar em console: `document.querySelector('.bottom-nav')`

### "Mobile truncado"
- Verificar padding/margin (não usar px fixo)
- Verificar grid/flex (não width fixo)
- Verificar word-break em fontes
- Testar com DevTools mobile simulated

### "Dark mode quebrado"
- Verificar se globals.css importado PRIMEIRO
- Verificar se variáveis CSS definidas
- Verificar prefers-color-scheme media query
- Testar em browser: "mode colorida"

---

## 📞 Suporte

Dúvida? Revisar:

1. **Arquitetura?** → FASE2_PLANO_EXECUCAO.md
2. **Component API?** → JSDoc no top de cada .jsx
3. **CSS?** → Revisar [NomeComponente].css
4. **Dados?** → Var mock em [NomeComponente].jsx
5. **Responsividade?** → Media queries ao final

---

## ✨ Timeline

```
Dia 1:  HomePage ready
Dia 2:  FilterBar + TransactionsPage ready
Dia 3:  BottomNav + nav working
Dia 4:  CategoryChart ready
Dia 5:  TrendChart + AnalyticsPage ready
Dia 6-10: Polish + QA + tests
```

---

## 🎯 Objetivo Final

Após 2 semanas:

```
✅ 3 páginas redesenhadas
✅ 22 arquivos implementados
✅ 0 redundâncias
✅ Responsivo em 4 breakpoints
✅ Dark mode perfeito
✅ Acessibilidade AA
✅ Ready para FASE 3
```

---

**Status:** ✅ PRONTO  
**Criado:** April 14, 2026  
**Autor:** AI Copilot (GitHub Copilot)  
**Próximo:** Dev implementation  

🚀 **Vamo que vamo! Let's build FASE 2!**
