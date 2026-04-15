import React from 'react';
import './BalanceCard.css';

export function BalanceCard({
  amount,
  label = 'Saldo',
  variant = 'primary',
  size = 'medium',
  delta = null,
  trend = null,
  loading = false,
  onClick = null,
  className = '',
}) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'SUBIU';
    if (trend === 'down') return 'CAIU';
    return 'ESTAVEL';
  };

  return (
    <div
      className={`balance-card balance-${variant} balance-${size} ${className}`}
      onClick={onClick}
      role="region"
      aria-label={`${label}: ${formatCurrency(amount)}`}
    >
      <div className="card-header">
        <span className="label">{label}</span>
        {loading && <div className="spinner" aria-label="Carregando">Carregando</div>}
      </div>

      <div className="amount" data-testid="amount">
        {formatCurrency(amount)}
      </div>

      {delta !== null && (
        <div className={`delta delta-${trend}`} data-testid="delta">
          <span className="icon">{getTrendIcon()}</span>
          <span className="value">
            {delta > 0 ? '+' : ''}
            {delta}%
          </span>
        </div>
      )}

      <div className="footer">
        <span className="footnote">{loading ? 'Atualizando...' : 'Atualizado agora'}</span>
      </div>
    </div>
  );
}

export default BalanceCard;
