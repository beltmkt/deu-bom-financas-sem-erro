import React from 'react';
import './EmptyStates.css';

const EmptyState = ({ icon, title, description, action, variant = 'default' }) => (
  <div className={`empty-state empty-state--${variant}`}>
    {icon && <div className="empty-state__icon">{icon}</div>}
    <div className="empty-state__content">
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  </div>
);

const EmptyStates = {
  Default: EmptyState,

  NoTransactions: ({ onAddTransaction }) => (
    <EmptyState
      icon="Sem dados"
      title="Nenhuma transacao ainda"
      description="Adicione sua primeira transacao para comecar a controlar suas financas."
      action={
        <button
          className="btn btn--primary"
          onClick={onAddTransaction}
          aria-label="Adicionar primeira transacao"
        >
          + Nova Transacao
        </button>
      }
      variant="primary"
    />
  ),

  NoCategories: ({ onAddCategory }) => (
    <EmptyState
      icon="Categorias"
      title="Nenhuma categoria criada"
      description="Crie categorias para organizar melhor suas transacoes."
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
      icon="Analise"
      title="Dados insuficientes"
      description="Adicione mais transacoes para ver analises e insights sobre seus gastos."
      action={
        <button
          className="btn btn--primary"
          onClick={onAddTransaction}
          aria-label="Adicionar transacao para ver analytics"
        >
          Adicionar Transacao
        </button>
      }
      variant="info"
    />
  ),

  NoSearchResults: ({ searchTerm, onClearSearch }) => (
    <EmptyState
      icon="Busca"
      title="Nenhum resultado encontrado"
      description={`Nao encontramos transacoes para "${searchTerm}". Tente outros termos ou filtros.`}
      action={
        <button
          className="btn btn--outline"
          onClick={onClearSearch}
          aria-label="Limpar busca e mostrar todas as transacoes"
        >
          Limpar Busca
        </button>
      }
      variant="warning"
    />
  ),

  NoFilteredResults: ({ onClearFilters }) => (
    <EmptyState
      icon="Filtro"
      title="Nenhum resultado com esses filtros"
      description="Tente ajustar os filtros para ver mais transacoes."
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
      icon="Erro"
      title="Ops! Algo deu errado"
      description={error || 'Nao conseguimos carregar os dados. Tente novamente.'}
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
      icon="Offline"
      title="Sem conexao"
      description="Verifique sua conexao com a internet e tente novamente."
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

  EmptyChart: ({ type = 'pie' }) => (
    <div className={`empty-chart empty-chart--${type}`}>
      <div className="empty-chart__icon">Grafico</div>
      <p className="empty-chart__text">Adicione transacoes para ver o grafico</p>
    </div>
  ),

  EmptyList: ({ type = 'transactions' }) => {
    const config = {
      transactions: {
        icon: 'Lista',
        text: 'Nenhuma transacao',
      },
      categories: {
        icon: 'Categoria',
        text: 'Nenhuma categoria',
      },
      insights: {
        icon: 'Insight',
        text: 'Nenhum insight disponivel',
      },
    };

    const { icon, text } = config[type] || config.transactions;

    return (
      <div className="empty-list">
        <span className="empty-list__icon">{icon}</span>
        <span className="empty-list__text">{text}</span>
      </div>
    );
  },
};

export default EmptyStates;
