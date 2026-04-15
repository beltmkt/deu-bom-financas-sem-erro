import React, { useState, useMemo } from 'react';
import { FilterBar } from '@/components/common/FilterBar';
import { CategoryChart } from '@/components/analytics/CategoryChart';
import { TrendChart } from '@/components/analytics/TrendChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { BottomNav } from '@/components/common/BottomNav';
import './AnalyticsPage.css';

/**
 * AnalyticsPage - Página ANALYTICS (NOVA)
 * 
 * Mostra:
 * - Gráfico de despesas por categoria (pizza)
 * - Tendência de 3 meses (linha)
 * - Insights gerados por IA
 * - Análises visuais
 */

export function AnalyticsPage({ 
  transactions = [],
  categories = ['Comida', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Contas'],
  onNavigate = () => {},
}) {
  const [filter, setFilter] = useState({ period: 'Este mês', categories: [], search: '' });

  // Dados agregados por categoria
  const categoryData = useMemo(() => {
    const aggregated = {};
    
    transactions.forEach(tx => {
      if (tx.amount < 0) { // Apenas gastos
        const cat = tx.category || 'Outros';
        aggregated[cat] = (aggregated[cat] || 0) + Math.abs(tx.amount);
      }
    });

    return Object.entries(aggregated)
      .map(([name, amount]) => ({
        category: name,
        amount,
        percentage: 0, // Será calculado no componente
        color: getColorForCategory(name),
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  // Dados de tendência (3 meses)
  const trendData = useMemo(() => {
    // Simular dados de 3 meses
    return [
      { month: 'Janeiro', gastos: 1500, receita: 3000 },
      { month: 'Fevereiro', gastos: 1750, receita: 3200 },
      { month: 'Março', gastos: 2100, receita: 3500 },
    ];
  }, [transactions]);

  // Gerar insights
  const insights = generateInsights(transactions, categoryData, trendData);

  const handleExport = () => {
    console.log('Exportar análise...');
    // TODO: Exportar PDF ou Excel
  };

  return (
    <div className="analytics-page">
      <header className="analytics-page__header">
        <h1>Análise</h1>
        <button 
          className="analytics-page__header-btn"
          aria-label="Mais opções"
        >
          ⋯
        </button>
      </header>

      {/* Filtros */}
      <FilterBar
        periods={['Esta semana', 'Este mês', 'Este ano', 'Custom']}
        categories={categories}
        onFilter={setFilter}
        initialPeriod="Este mês"
        showSearch={false}
      />

      <main className="analytics-page__main">
        {/* SEÇÃO 1: Gráfico de Categorias */}
        <section className="analytics-page__section">
          <h2 className="analytics-page__section-title">Gastos por Categoria</h2>
          <div className="analytics-page__chart-container">
            <CategoryChart
              data={categoryData}
              type="pie"
              emptyMessage="Sem dados neste período"
            />
          </div>
        </section>

        {/* SEÇÃO 2: Gráfico de Tendência */}
        <section className="analytics-page__section">
          <h2 className="analytics-page__section-title">Tendência 3 Meses</h2>
          <div className="analytics-page__chart-container">
            <TrendChart
              data={trendData}
              metric="gastos"
              emptyMessage="Sem dados suficientes"
            />
          </div>
        </section>

        {/* SEÇÃO 3: Insights */}
        {insights.length > 0 && (
          <section className="analytics-page__section">
            <h2 className="analytics-page__section-title">💡 Insights</h2>
            <div className="analytics-page__insights">
              {insights.map((insight, idx) => (
                <InsightCard
                  key={idx}
                  icon={insight.icon}
                  text={insight.text}
                  type={insight.type}
                  action={insight.action}
                />
              ))}
            </div>
          </section>
        )}

        {/* SEÇÃO 4: CTAs */}
        <section className="analytics-page__section analytics-page__section--actions">
          <button 
            className="analytics-page__cta"
            onClick={handleExport}
          >
            💾 Exportar Análise
          </button>
          <button 
            className="analytics-page__cta analytics-page__cta--secondary"
            onClick={() => onNavigate('transactions')}
          >
            📋 Ver Transações
          </button>
        </section>
      </main>

      <BottomNav active="analytics" onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* HELPERS */
/* ─────────────────────────────────────────────────────────────────────────── */

function getColorForCategory(category) {
  const colors = {
    'Comida': '#F97316',
    'Transporte': '#3B82F6',
    'Saúde': '#10B981',
    'Educação': '#8B5CF6',
    'Lazer': '#EC4899',
    'Contas': '#EF4444',
    'Salário': '#10B981',
    'Freelance': '#14B8A6',
  };
  return colors[category] || '#6B7280';
}

function generateInsights(transactions, categoryData, trendData) {
  const insights = [];

  // Insight 1: Categoria com maior gasto
  if (categoryData.length > 0) {
    const top = categoryData[0];
    const total = categoryData.reduce((sum, c) => sum + c.amount, 0);
    const percentage = Math.round((top.amount / total) * 100);

    insights.push({
      icon: '📊',
      text: `Você gastou ${percentage}% do total em ${top.category}`,
      type: 'info',
      action: null,
    });
  }

  // Insight 2: Tendência
  if (trendData.length >= 2) {
    const current = trendData[trendData.length - 1].gastos;
    const previous = trendData[trendData.length - 2].gastos;
    const change = Math.round(((current - previous) / previous) * 100);

    if (change > 10) {
      insights.push({
        icon: '📈',
        text: `Seus gastos aumentaram ${change}% em relação ao mês anterior`,
        type: 'warning',
        action: 'Revisar gastos',
      });
    } else if (change < -10) {
      insights.push({
        icon: '✅',
        text: `Excelente! Você gastou ${Math.abs(change)}% a menos que o mês anterior`,
        type: 'success',
        action: null,
      });
    }
  }

  // Insight 3: Padrão (fictício para demo)
  insights.push({
    icon: '💡',
    text: 'Dica: Você gasta mais nos fins de semana. Considere planejamento antecipado.',
    type: 'tip',
    action: null,
  });

  return insights;
}

export default AnalyticsPage;
