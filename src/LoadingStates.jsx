import React from 'react';
import './LoadingStates.css';

const Spinner = ({ size = 'medium', color = 'primary' }) => (
  <div
    className={`loading-spinner loading-spinner--${size} loading-spinner--${color}`}
    role="status"
    aria-label="Carregando"
  >
    <div className="loading-spinner__dot" />
    <div className="loading-spinner__dot" />
    <div className="loading-spinner__dot" />
  </div>
);

const BalanceCardSkeleton = () => (
  <div className="balance-card-skeleton">
    <div className="balance-card-skeleton__header">
      <div className="skeleton skeleton--text skeleton--title" />
      <div className="skeleton skeleton--text skeleton--subtitle" />
    </div>
    <div className="balance-card-skeleton__amount">
      <div className="skeleton skeleton--text skeleton--large" />
    </div>
    <div className="balance-card-skeleton__footer">
      <div className="skeleton skeleton--button" />
      <div className="skeleton skeleton--button" />
    </div>
  </div>
);

const TransactionListSkeleton = ({ count = 3 }) => (
  <div className="transaction-list-skeleton">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="transaction-item-skeleton">
        <div className="transaction-item-skeleton__icon">
          <div className="skeleton skeleton--circle" />
        </div>
        <div className="transaction-item-skeleton__content">
          <div className="skeleton skeleton--text skeleton--medium" />
          <div className="skeleton skeleton--text skeleton--small" />
        </div>
        <div className="transaction-item-skeleton__amount">
          <div className="skeleton skeleton--text skeleton--medium" />
        </div>
      </div>
    ))}
  </div>
);

const ChartSkeleton = ({ type = 'pie' }) => (
  <div className={`chart-skeleton chart-skeleton--${type}`}>
    <div className="chart-skeleton__canvas">
      <div className="skeleton skeleton--circle skeleton--large" />
    </div>
    <div className="chart-skeleton__legend">
      <div className="skeleton skeleton--text skeleton--small" />
      <div className="skeleton skeleton--text skeleton--small" />
      <div className="skeleton skeleton--text skeleton--small" />
    </div>
  </div>
);

const LoadingStates = {
  Spinner,
  BalanceCard: BalanceCardSkeleton,
  TransactionList: TransactionListSkeleton,
  AnalyticsChart: ChartSkeleton,

  HomePage: () => (
    <div className="page-loading page-loading--home">
      <BalanceCardSkeleton />
      <div className="page-loading__summary">
        <div className="skeleton skeleton--card" />
        <div className="skeleton skeleton--card" />
      </div>
      <TransactionListSkeleton count={3} />
    </div>
  ),

  TransactionsPage: () => (
    <div className="page-loading page-loading--transactions">
      <div className="page-loading__header">
        <div className="skeleton skeleton--text skeleton--large" />
        <div className="skeleton skeleton--button" />
      </div>
      <TransactionListSkeleton count={5} />
    </div>
  ),

  AnalyticsPage: () => (
    <div className="page-loading page-loading--analytics">
      <div className="page-loading__header">
        <div className="skeleton skeleton--text skeleton--large" />
      </div>
      <div className="page-loading__charts">
        <ChartSkeleton type="pie" />
        <ChartSkeleton type="line" />
      </div>
      <div className="page-loading__insights">
        <div className="skeleton skeleton--card" />
        <div className="skeleton skeleton--card" />
      </div>
    </div>
  ),

  Saving: () => (
    <div className="action-loading">
      <Spinner size="small" />
      <span>Salvando...</span>
    </div>
  ),

  Deleting: () => (
    <div className="action-loading">
      <Spinner size="small" color="danger" />
      <span>Excluindo...</span>
    </div>
  ),

  Exporting: () => (
    <div className="action-loading">
      <Spinner size="small" />
      <span>Exportando...</span>
    </div>
  ),
};

export default LoadingStates;
