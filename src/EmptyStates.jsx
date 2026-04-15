import React from 'react';
import './EmptyStates.css';

/**
 * EmptyStates - Estados vazios informativos
 *
 * Fornece componentes para estados vazios contextuais com ações sugeridas,
 * melhorando a experiência quando não há dados para mostrar.
 */

// Componente base para estado vazio
const EmptyState = ({
  icon,
  title,
  description,
  action,
  variant = 'default'
}) => (
  <div className={`empty-state empty-state--${variant}`}>
    {icon && (
      <div className="empty-state__icon">
        {icon}
      </div>
    )}
    <div className="empty-state__content">
      <h3 className="empty-state__title">{title}</h3>
      {description && (
        <p className="empty-state__description">{description}</p>
      )}
      {action && (
        <div className="empty-state__action">
          {action}
        </div>
      )}
    </div>
  </div>
);

// Estados vazios específicos da aplicação
export const EmptyStates = {
  // Estado vazio genérico
  Default: EmptyState,

  // Estados específicos
  NoTransactions: ({ onAddTransaction }) => (
    <EmptyState
      icon="💳"
      title="Nenhuma transação ainda"
      description="Adicione sua primeira transação para começar a controlar suas finanças."
      action={
        <button
          className="btn btn--primary"
          onClick={onAddTransaction}
          aria-label="Adicionar primeira transação"
        >
          + Nova Transação
        </button>
      }
      variant="primary"
    />
  ),

  NoCategories: ({ onAddCategory }) => (
    <EmptyState
      icon="🏷️"
      title="Nenhuma categoria criada"
      description="Crie categorias para organizar melhor suas transações."
      action={
        <button
          className="btn btn--secondary"
          onClick={onAddCategory}
          aria-label="Criar primeira categoria"
        >
          + Nova Categoria
        </button>
      }
      variant="secondary"
    />
  ),

  NoAnalytics: ({ onAddTransaction }) => (
    <EmptyState
      icon="📊"
      title="Dados insuficientes"
      description="Adicione mais transações para ver análises e insights sobre seus gastos."
      action={
        <button
          className="btn btn--primary"
          onClick={onAddTransaction}
          aria-label="Adicionar transação para ver analytics"
        >
          Adicionar Transação
        </button>
      }
      variant="info"
    />
  ),

  NoSearchResults: ({ searchTerm, onClearSearch }) => (
    <EmptyState
      icon="🔍"
      title="Nenhum resultado encontrado"
      description={`Não encontramos transações para "${searchTerm}". Tente outros termos ou filtros.`}
      action={
        <button
          className="btn btn--outline"
          onClick={onClearSearch}
          aria-label="Limpar busca e mostrar todas as transações"
        >
          Limpar Busca
        </button>
      }
      variant="warning"
    />
  ),

  NoFilteredResults: ({ filters, onClearFilters }) => (
    <EmptyState
      icon="🎯"
      title="Nenhum resultado com esses filtros"
      description="Tente ajustar os filtros para ver mais transações."
      action={
        <button
          className="btn btn--outline"
          onClick={onClearFilters}
          aria-label="Limpar todos os filtros"
        >
          Limpar Filtros
        </button>
      }
      variant="warning"
    />
  ),

  Error: ({ onRetry, error }) => (
    <EmptyState
      icon="⚠️"
      title="Ops! Algo deu errado"
      description={error || "Não conseguimos carregar os dados. Tente novamente."}
      action={
        <button
          className="btn btn--primary"
          onClick={onRetry}
          aria-label="Tentar carregar novamente"
        >
          Tentar Novamente
        </button>
      }
      variant="danger"
    />
  ),

  Offline: ({ onRetry }) => (
    <EmptyState
      icon="📶"
      title="Sem conexão"
      description="Verifique sua conexão com a internet e tente novamente."
      action={
        <button
          className="btn btn--primary"
          onClick={onRetry}
          aria-label="Tentar conectar novamente"
        >
          Tentar Novamente
        </button>
      }
      variant="warning"
    />
  ),

  // Estados menores para componentes específicos
  EmptyChart: ({ type = 'pie' }) => (
    <div className={`empty-chart empty-chart--${type}`}>
      <div className="empty-chart__icon">📈</div>
      <p className="empty-chart__text">
        Adicione transações para ver o gráfico
      </p>
    </div>
  ),

  EmptyList: ({ type = 'transactions' }) => {
    const config = {
      transactions: {
        icon: '💳',
        text: 'Nenhuma transação'
      },
      categories: {
        icon: '🏷️',
        text: 'Nenhuma categoria'
      },
      insights: {
        icon: '💡',
        text: 'Nenhum insight disponível'
      }
    };

    const { icon, text } = config[type] || config.transactions;

    return (
      <div className="empty-list">
        <span className="empty-list__icon">{icon}</span>
        <span className="empty-list__text">{text}</span>
      </div>
    );
  }
};

export default EmptyStates;