# 🎨 Deu Bom!! - Wireframes das Melhorias UX

## 📱 Comparação Visual: ANTES vs DEPOIS

---

## 1️⃣ Página HOME - Hierarquia Visual

### ANTES (Confuso)
```
┌──────────────────────────────┐
│ ← DEU BOM!!          Menu    │ (header pequeno)
├──────────────────────────────┤
│                              │
│ ┌────────────────────────┐   │
│ │  Saldo: R$ 1.500      │   │ ← Pequeno demais
│ └────────────────────────┘   │
│                              │
│ ┌────────────────────────┐   │
│ │ Gasto: R$ 500         │   │
│ │ Receita: R$ 2.000     │   │
│ └────────────────────────┘   │
│                              │
│ ÚLTIMAS TRANSAÇÕES           │
│ ┌────────────────────────┐   │
│ │ 🍔 Ifood     -45   12h │   │
│ │ 🏦 Banco     +1500 10h │   │
│ │ ⚡ Energia   -150   8h │   │
│ │ 🚗 Uber      -50    7h │   │
│ │ 🍕 Pizza     -35    5h │   │
│ └────────────────────────┘   │
│                              │
│ RESUMO DO MÊS                │
│ ┌────────────────────────┐   │
│ │ [Gráfico pizza bem     │   │
│ │  em cima das coisas]   │   │
│ └────────────────────────┘   │
│                              │
│ [Botão] [Botão] [Botão]      │
└──────────────────────────────┘

❌ Visualmente caótico
❌ Saldo não respira
❌ Sobrecarga de informação
❌ Usuário não sabe onde clicar
```

### DEPOIS (Claro & Focado)
```
┌──────────────────────────────┐
│ ← DEU BOM!!          🔧 👤   │ (header minimalista)
├──────────────────────────────┤
│                              │
│                              │
│            R$ 1.500          │ ← DESTAQUE HUGE (H1)
│                              │
│         SALDO ATUAL          │ ← Label inteligível
│                              │
│  (Atualizado agora)          │
│                              │
│────────────────────────────────
│                              │
│  ├─ Gasto mês   R$ 500   │   │ ← 2º nível (H2)
│  └─ Receita     R$ 2.000 │   │
│                              │
│────────────────────────────────
│                              │
│  ÚLTIMAS TRANSAÇÕES          │ ← 3º nível (H3)
│                              │
│  🍔 Ifood              -R$ 45│ ← Minimal info
│  🏦 Banco             +R$1500│
│  ⚡ Energia           -R$150 │
│                              │
│────────────────────────────────
│                              │
│  [+ Nova transação] [Ver más]│ ← CTAs claros
│                              │
│  [Transações] [Análise] [+]  │ ← Bottom nav
└──────────────────────────────┘

✅ Hierarquia cristalina
✅ Saldo respira
✅ Foco direto no número
✅ Usuário sabe primeiros passos
✅ Informação > Decoração
```

---

## 2️⃣ Página TRANSAÇÕES (Era "Dashboard")

### ANTES (Redundante com Home)
```
┌──────────────────────────────┐
│ ←  Dashboard         Menu     │
├──────────────────────────────┤
│                              │
│ Saldo: R$ 1.500             │ ← REPETIDO! (mesmo de Home)
│                              │
│ [Últimas 20 transações      │ ← Listar é OK
│  com 4 colunas]             │
│  🍔 Ifood  -45   12:34  ...  │
│  🏦 Banco  +1500 10:00  ...  │
│                              │
│ [+ Por número de TX]         │
└──────────────────────────────┘

❌ Saldo duplicado (confunde)
❌ Sem opções de filtro
❌ Sem busca
❌ Sem ações em massa
❌ Hard de gerenciar transações
```

### DEPOIS (Página real de Transações)
```
┌──────────────────────────────┐
│ ←  Transações        🔍  ⋯   │ ← Header com search
├──────────────────────────────┤
│                              │
│ Filtros:                     │ ← Aparecem quando relevante
│ ┌─ Período ..................................┐
│ │ [Últimas 30 dias ✓] [Este mês] [Custom]  │
│ └────────────────────────────────────────────┘
│ ┌─ Categoria ................................┐
│ │ [Todos ✓] [Comida] [Transporte] [Saúde]  │
│ └────────────────────────────────────────────┘
│                              │
│ ┌ [Mais recente ▼]  [Selecionar todos] ┐
│                              │
│ 🍔 Ifood           -R$ 45   │ ← Check box p/ select
│ 🏦 Banco          +R$1500   │
│ ⚡ Energia        -R$150    │
│ 🚗 Uber            -R$ 50   │
│ 🍕 Pizza           -R$ 35   │
│                              │
│ └ Fim de transações (5 de ∞)│
│                              │
│ [+ Carregar mais]            │
│                              │
│ ┌─────────────────────────────┐
│ │ [❌ Deletar] [🏷 Categoriz.]│ ← Ações seleção
│ └─────────────────────────────┘
│                              │
│ [💾 Exportar] [📊 Analytics] │ ← CTAs principais
│                              │
│ [Transações] [Análise] [+]   │
└──────────────────────────────┘

✅ Sem redundâncias
✅ Controle total
✅ Filtros inteligentes
✅ Ações em massa
✅ Busca/export
✅ Gerenciar é fácil
```

---

## 3️⃣ Página ANALYTICS (Nova)

### DESIGN (Não existia antes)
```
┌──────────────────────────────┐
│ ←  Análise          📅  ⋯    │
├──────────────────────────────┤
│                              │
│ Período: [Esta semana ▼]     │ ← Timeframe
│         [Este mês] [Ano] [Custom]
│                              │
│ ┌─ GASTOS SEMANA ────────────┐│
│ │                            ││
│ │     GRÁFICO PIE/DONUT      ││ ← Visualização
│ │    Comida: 35%             ││
│ │    Transporte: 25%         ││
│ │    Saúde: 20%              ││
│ │    Outros: 20%             ││
│ │                            ││
│ └────────────────────────────┘│
│                              │
│ ┌─ TENDÊNCIA 3 MESES ────────┐│
│ │                            ││
│ │  Linha chart: ↗️ tendência  ││
│ │  Janeiro: R$ 1.500         ││
│ │  Fevereiro: R$ 1.750       ││
│ │  Março: R$ 2.100           ││
│ │                            ││
│ │  📈 +40% em relação ao     ││
│ │     3 meses atrás          ││
│ │                            ││
│ └────────────────────────────┘│
│                              │
│ ┌─ INSIGHTS COM IA ──────────┐│
│ │ 💡 Você gastou 15% a mais  ││
│ │    em Comida este mês      ││
│ │                            ││
│ │ 📌 Sugestão: Diminua       ││
│ │    gastos em delivery      ││
│ │                            ││
│ │ ⚠️ Alerta: Você não visitou││
│ │    a academia este mês     ││
│ │                            ││
│ └────────────────────────────┘│
│                              │
│ [💾 Exportar] [⏤ Mais dados]│
│                              │
│ [Transações] [Análise] [+]   │
└──────────────────────────────┘

✅ Insights visuais
✅ Tendências claras
✅ IA recomendando mudanças
✅ Sem sobrecarga (1 dimensão por vez)
✅ Timframe flexível
```

---

## 4️⃣ Componentes Reutilizáveis - Exemplos

### BalanceCard em 4 contextos diferentes

```
CONTEXTO 1: Home - Destaque Principal
┌──────────────────────────────────────┐
│                                      │
│           R$ 1.500,00                │ ← GRANDE
│                                      │
│         SALDO ATUAL                  │
│    (Atualizado há 2 min)             │
│                                      │
└──────────────────────────────────────┘

CONTEXTO 2: Dashboard - Resumo
┌──────────────┐  ┌──────────────┐
│ Gasto: R$ 500│  │Receita:      │
│   -R$ 500    │  │  +R$ 2.000   │
│ Este mês     │  │ Este mês     │
└──────────────┘  └──────────────┘

CONTEXTO 3: Analytics - Comparação
┌─────────────────────┐
│ COMPARADO AO MÊS    │
│ PASSADO:            │
│                     │
│ +15% (↑)            │ ← Notação de mudança
│ (Você gastou mais)  │
│                     │
└─────────────────────┘

CONTEXTO 4: Widget Sidebar (se desktop)
┌─────────┐
│ R$1500  │ ← PEQUENO
│ SALDO   │
└─────────┘

✅ MESMO COMPONENTE
✅ 4 TAMANHOS & CONTEXTOS
✅ SEM CÓDIGO DUPLICADO
```

### TransactionList em 3 contextos

```
CONTEXTO 1: Home - Preview (limit: 3)
────────────────────────────────────────
ÚLTIMAS TRANSAÇÕES

🍔 Ifood            -R$ 45
🏦 Banco          +R$1500
⚡ Energia        -R$150

[Ver mais transações v]

────────────────────────────────────────

CONTEXTO 2: Transações - Full (limit: null)
────────────────────────────────────────
🍔 Ifood            -R$ 45    [✎ ✕]
🏦 Banco          +R$1500    [✎ ✕]
⚡ Energia        -R$150     [✎ ✕]
🚗 Uber            -R$ 50    [✎ ✕]
🍕 Pizza           -R$ 35    [✎ ✕]
📺 Netflix         -R$ 50    [✎ ✕]

[ ✕ Deletar 2 seleções]

────────────────────────────────────────

CONTEXTO 3: Analytics - Agrupado por data
────────────────────────────────────────
HOJE (12 de Março)
🍔 Ifood           -R$ 45
🚗 Uber            -R$ 50

ONTEM (11 de Março)
🏦 Banco         +R$1500
⚡ Energia       -R$150

HÁ 2 DIAS (10 de Março)
🍕 Pizza          -R$ 35
📺 Netflix        -R$ 50

✅ MESMO COMPONENTE
✅ 3 MODOS: preview, edit, grouped
✅ PROPS DEFINEM COMPORTAMENTO
```

---

## 5️⃣ Sistema de Cores - Antes vs Depois

### ANTES (Inconsistente?)
```
Componente A: #575ECF
Componente B: #5b5ecf (ligeiramente diferente)
Componente C: rgb(87, 94, 207) (mesma cor, formato diferente)
Card hover: hardcoded #4f52b8

😵 Qual é a cor certa?
😵 Impossível manter consistência
```

### DEPOIS (System Design)
```
/* Arquivo único: theme.js */

export const colors = {
  // Brand
  primary: "#575ECF",      // Botões, links, highlights
  
  // Semantic (importante para fintech)
  success: "#10B981",      // Receita, transações positivas
  danger: "#EF4444",       // Gastos, transações negativas
  warning: "#F59E0B",      // Alertas, limites próximos
  neutral: "#6B7280",      // Texto secundário
  
  // UI
  bg: "#0F172A",          // Fundo principal (dark)
  surface: "#1E293B",     // Cards, containers
  border: "#334155",      // Borders, dividers
  
  // Text
  text: {
    primary: "#E2E8F0",   // Texto principal
    secondary: "#CBD5E1", // Texto secundário
    tertiary: "#94A3B8",  // Texto terciário
  },
};

/* Uso */
<div style={{ color: colors.text.primary }}>
  Saldo Principal
</div>

<div style={{ background: colors.success }}>
  +R$ 1.500 (receita automática)
</div>

<div style={{ background: colors.danger }}>
  -R$ 150 (gasto)
</div>

✅ Consistência garantida
✅ Fácil manutenção
✅ Dark/Light mode simples
✅ Acessibilidade built-in
```

---

## 6️⃣ Fluxo de Usuário - Melhorias

### Adicionar Transação: Antes vs Depois

```
ANTES:
1. Usuário clica "+"
2. Modal grande abre (confuso)
3. Preenche 5 campos
4. Seleciona categoria
5. Clica criar
6. Volta para Home

⏱️ 45 segundos | 😕 Experiência OK

─────────────────────────────────────

DEPOIS (Com componentes reutilizáveis):
1. Usuário clica "+" na Home
2. Modal minimalista abre
3. Preenche categoria com sugestão IA
4. Digita descrição
5. Valor é preenchido automaticamente
6. Clica criar (ou "+" rápido)
7. Toast de sucesso
8. Fica na Home (não volta)

⏱️ 15 segundos | 😊 Experiência excelente

Técnicas:
├─ Valores padrão inteligentes
├─ Auto-completar com histórico
├─ Sugestão IA de categoria
├─ Validação em tempo real
├─ Feedback visual imediato
└─ Fica no contexto (não navega)
```

---

## 7️⃣ Mobile Layout - Antes vs Depois

### Responsividade (< 375px)

```
ANTES (Quebrado em mobile):
┌─ 375px ─┐
│← Deu   M│ ← Header muito comprado
│ SALDO  │ ← Texto truncado
│ R$ 1.5 │ ← Número cortado
│         │
│ [Grande│ ← Elemento fora view
│  card  │
│ ocup.] │
│         │
│ [Difc.│ ← Difícil tocar
│  btn.] │

❌ Texto truncado
❌ Fora de proporção
❌ Difícil usar
❌ Feio

─────────────────────────────────

DEPOIS (Responsivo real):
┌───────────┐
│ ← DEU BOM!│ ← Legível
│   🔧  👤  │
├───────────┤
│           │
│ R$ 1.500  │ ← GRANDE
│           │
│ SALDO     │
│           │
├───────────┤
│           │
│ Gasto    │ ← Lado-a-lado
│ -R$ 500   │
│  ────────│
│ Receita   │
│ +R$2000  │
│           │
├───────────┤
│ ÚLTIMAS   │
│ TX        │
│           │
│ 🍔 R$-45 │ ← Legível
│ 🏦 R$+15 │
│ ⚡ R$-15 │
│           │
└───────────┘

✅ Totalmente legível
✅ Proporções boas
✅ Fácil tocar
✅ Bonito & funcional
```

---

## 8️⃣ Design System - Padrões de Interação

### Estados de Botões

```
DEFAULT:
┌──────────────┐
│ + Transação  │
└──────────────┘

HOVER (Desktop):
┌──────────────┐
│ + Transação  │ ← Sombra aparece
└──────────────┘    ↑ Sobe 2px

ACTIVE/PRESSED:
┌──────────────┐
│ + Transação  │ ← Sombra desaparece
└──────────────┘    ↓ Desce 2px

DISABLED:
┌──────────────┐
│ + Transação  │ ← Transparente 50%
└──────────────┘    Cursor: not-allowed

LOADING:
┌──────────────┐
│ ⟳ Carregando │ ← Ícone de spinner
└──────────────┘

✅ Feedback visual claro
✅ Usuário entende estado
✅ Acessível
```

---

## 9️⃣ Dark Mode Toggle (Já existe, mas melhorar)

### Implementação Recomendada

```
ANTES:
└─ Usuário encontra "Settings"
   └─ Acha toggle de dark mode
      └─ Clica
      └─ UI muda
   
❌ Escondido
❌ Não descoberta
❌ Não é intuitivo

─────────────────────────────────

DEPOIS:
┌─ Header tem ícone 🌙/☀️
│  └─ Um toque muda tema
│     └─ Todos componentes mudam
│        porque usam CSS vars
│
│ OU Sistema detecta preferência OS
│  └─ Dark mode automático à noite
│     └─ Light mode automático dia

✅ Descobrível
✅ Rápido
✅ Automático
✅ Consistente (CSS vars)
```

---

## 🔟 Checklist de Implementação

### Fase 1: Componentes (Semana 1)
```
- [ ] Refatorar BalanceCard
- [ ] Refatorar TransactionList
- [ ] Refatorar CategoryChart
- [ ] Criar componentes base (Button, Card, Modal)
- [ ] Criar theme.js com cores/tipografia
- [ ] Adicionar ao Storybook
- [ ] 100% de cobertura de testes
```

### Fase 2: Páginas (Semana 2)
```
- [ ] Redesenhar Home page
- [ ] Refazer Dashboard → Transactions
- [ ] Criar página Analytics
- [ ] Melhorar hierarquia visual
- [ ] Responsividade em 4 breakpoints
- [ ] Performance audit
```

### Fase 3: Polish (Semana 3)
```
- [ ] Animações suaves
- [ ] Microinterações (feedback visual)
- [ ] Acessibilidade (WCAG 2.1)
- [ ] Dark mode perfeito
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
```

---

## 🎯 Resultado Final Visual

```
HOME:                TRANSAÇÕES:          ANALYTICS:
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │  │                 │
│   R$ 1.500      │  │ Filtros         │  │ Período: Mês    │
│ (Saldo destaque)│  │ ┌─────────────┐ │  │ ┌─────────────┐ │
│                 │  │ │ Últimos 30d │ │  │ │ PIE Chart   │ │
├─────────────────┤  │ └─────────────┘ │  │ │ (Gastos)    │ │
│ Gasto | Receita │  │                 │  │ └─────────────┘ │
│ Info resumida   │  │ [List com       │  │                 │
│                 │  │  seleção em m.] │  │ Tendência       │
├─────────────────┤  │                 │  │ 📈 +15% mês    │
│ Últimas 3 TX    │  │ [Ações em massa]│  │                 │
│ Preview simples │  │                 │  │ 💡 Insights AI │
│                 │  │                 │  │                 │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ [Ver mais]      │  │ [Exportar]      │  │ [+] [Análise]   │
└─────────────────┘  └─────────────────┘  └─────────────────┘

✅ Sem repetições
✅ Cada página com propósito claro
✅ Visual limpo e organizado
✅ UX intuitiva
✅ Pronto para crescer
```

---

*Desenhos criados para DEU BOM!!*  
*Próximo passo: Começar Sprint 1 com refatoração de componentes*
