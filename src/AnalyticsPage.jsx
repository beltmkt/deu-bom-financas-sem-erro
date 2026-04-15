import React, { useMemo, useState } from 'react';
import { FilterBar } from '@/components/common/FilterBar';
import { CategoryChart } from '@/components/analytics/CategoryChart';
import { TrendChart } from '@/components/analytics/TrendChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { BottomNav } from '@/components/common/BottomNav';
import EmptyStates from '@/EmptyStates';
import './AnalyticsPage.css';

export function AnalyticsPage({
  transactions = [],
  categories = ['Comida', 'Transporte', 'Saude', 'Educacao', 'Lazer', 'Contas'],
  onNavigate = () => {},
}) {
  const [filter, setFilter] = useState({ period: 'Este mes', categories: [], search: '' });

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, filter),
    [transactions, filter]
  );

  const categoryData = useMemo(() => {
    const aggregated = {};

    filteredTransactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        const category = transaction.category || 'Outros';
        aggregated[category] = (aggregated[category] || 0) + Math.abs(transaction.amount);
      }
    });

    return Object.entries(aggregated)
      .map(([name, amount]) => ({
        category: name,
        amount,
        percentage: 0,
        color: getColorForCategory(name),
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredTransactions]);

  const trendData = useMemo(() => buildTrendData(filteredTransactions), [filteredTransactions]);

  const insights = useMemo(
    () => generateInsights(categoryData, trendData),
    [categoryData, trendData]
  );

  const handleExport = () => {
    console.log('Exportar analise...', filter);
  };

  return (
    <div className="analytics-page">
      <header className="analytics-page__header">
        <h1>Analise</h1>
        <button className="analytics-page__header-btn" aria-label="Mais opcoes">
          ...
        </button>
      </header>

      <FilterBar
        periods={['Esta semana', 'Este mes', 'Este ano', 'Custom']}
        categories={categories}
        onFilter={setFilter}
        initialPeriod="Este mes"
        showSearch={false}
      />

      <main className="analytics-page__main">
        {filteredTransactions.length === 0 && (
          <section className="analytics-page__section">
            <EmptyStates.NoAnalytics onAddTransaction={() => onNavigate('transactions')} />
          </section>
        )}

        <section className="analytics-page__section">
          <h2 className="analytics-page__section-title">Gastos por Categoria</h2>
          <div className="analytics-page__chart-container">
            <CategoryChart
              data={categoryData}
              type="pie"
              emptyMessage="Sem dados neste periodo"
            />
          </div>
        </section>

        <section className="analytics-page__section">
          <h2 className="analytics-page__section-title">Tendencia 3 Meses</h2>
          <div className="analytics-page__chart-container">
            <TrendChart
              data={trendData}
              metric="gastos"
              emptyMessage="Sem dados suficientes"
            />
          </div>
        </section>

        {filteredTransactions.length > 0 && insights.length > 0 && (
          <section className="analytics-page__section">
            <h2 className="analytics-page__section-title">Insights</h2>
            <div className="analytics-page__insights">
              {insights.map((insight) => (
                <InsightCard
                  key={insight.text}
                  icon={insight.icon}
                  text={insight.text}
                  type={insight.type}
                  action={insight.action}
                />
              ))}
            </div>
          </section>
        )}

        <section className="analytics-page__section analytics-page__section--actions">
          <button className="analytics-page__cta" onClick={handleExport}>
            Exportar Analise
          </button>
          <button
            className="analytics-page__cta analytics-page__cta--secondary"
            onClick={() => onNavigate('transactions')}
          >
            Ver Transacoes
          </button>
        </section>
      </main>

      <BottomNav active="analytics" onNavigate={onNavigate} />
    </div>
  );
}

function filterTransactions(transactions, filter) {
  const referenceDate = getReferenceDate(transactions);

  return transactions.filter((transaction) => {
    if (
      filter.categories.length > 0 &&
      !filter.categories.includes(transaction.category)
    ) {
      return false;
    }

    if (!isTransactionInsidePeriod(transaction.date, filter.period, referenceDate)) {
      return false;
    }

    return true;
  });
}

function getReferenceDate(transactions) {
  const timestamps = transactions
    .map((transaction) => new Date(transaction.date).getTime())
    .filter((timestamp) => Number.isFinite(timestamp));

  return timestamps.length > 0 ? new Date(Math.max(...timestamps)) : new Date();
}

function isTransactionInsidePeriod(date, period, referenceDate) {
  const current = new Date(date);

  if (!Number.isFinite(current.getTime())) {
    return false;
  }

  if (period === 'Este ano') {
    return current.getFullYear() === referenceDate.getFullYear();
  }

  if (period === 'Esta semana') {
    const diffInDays = Math.floor(
      (referenceDate.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffInDays >= 0 && diffInDays < 7;
  }

  if (period === 'Este mes') {
    return (
      current.getMonth() === referenceDate.getMonth() &&
      current.getFullYear() === referenceDate.getFullYear()
    );
  }

  return true;
}

function buildTrendData(transactions) {
  const monthlyTotals = transactions.reduce((acc, transaction) => {
    const current = new Date(transaction.date);

    if (!Number.isFinite(current.getTime())) {
      return acc;
    }

    const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[key]) {
      acc[key] = {
        month: getMonthLabel(current),
        gastos: 0,
        receita: 0,
        sortKey: key,
      };
    }

    if (transaction.amount < 0) {
      acc[key].gastos += Math.abs(transaction.amount);
    } else {
      acc[key].receita += transaction.amount;
    }

    return acc;
  }, {});

  return Object.values(monthlyTotals)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    .slice(-3)
    .map((item) => ({
      month: item.month,
      gastos: item.gastos,
      receita: item.receita,
    }));
}

function getMonthLabel(date) {
  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return labels[date.getMonth()];
}

function getColorForCategory(category) {
  const colors = {
    Comida: '#F97316',
    Transporte: '#3B82F6',
    Saude: '#10B981',
    Educacao: '#8B5CF6',
    Alimentacao: '#F97316',
    Lazer: '#EC4899',
    Contas: '#EF4444',
    Salario: '#10B981',
    Freelance: '#14B8A6',
  };

  return colors[category] || '#6B7280';
}

function generateInsights(categoryData, trendData) {
  const insights = [];

  if (categoryData.length > 0) {
    const top = categoryData[0];
    const total = categoryData.reduce((sum, category) => sum + category.amount, 0);
    const percentage = Math.round((top.amount / total) * 100);

    insights.push({
      icon: 'Grafico',
      text: `Voce gastou ${percentage}% do total em ${top.category}`,
      type: 'info',
      action: null,
    });
  }

  if (trendData.length >= 2) {
    const current = trendData.at(-1).gastos;
    const previous = trendData.at(-2).gastos;
    const change = previous === 0 ? 0 : Math.round(((current - previous) / previous) * 100);

    if (change > 10) {
      insights.push({
        icon: 'Alta',
        text: `Seus gastos aumentaram ${change}% em relacao ao mes anterior`,
        type: 'warning',
        action: 'Revisar gastos',
      });
    } else if (change < -10) {
      insights.push({
        icon: 'Ok',
        text: `Excelente! Voce gastou ${Math.abs(change)}% a menos que o mes anterior`,
        type: 'success',
        action: null,
      });
    }
  }

  insights.push({
    icon: 'Dica',
    text: 'Voce gasta mais nos fins de semana. Considere planejar essas despesas.',
    type: 'tip',
    action: null,
  });

  return insights;
}

export default AnalyticsPage;
