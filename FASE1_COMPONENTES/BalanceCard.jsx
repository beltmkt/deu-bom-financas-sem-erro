/**
 * BalanceCard Component
 * 
 * Componente reutilizável para exibir saldo em diferentes contextos
 * 
 * USO CASOS:
 * - Home: Saldo total destacado (large, primary)
 * - Dashboard: Saldo, gasto, receita (medium, multiple)
 * - Profile: Mini saldo (small)
 * - Analytics: Comparação (medium, com delta)
 * 
 * @component
 * @example
 * // Home - Destaque principal
 * <BalanceCard 
 *   amount={1500} 
 *   label="Saldo Total" 
 *   size="large"
 *   variant="primary"
 * />
 * 
 * // Dashboard - Gasto/Receita
 * <BalanceCard 
 *   amount={500} 
 *   label="Gasto" 
 *   size="medium"
 *   variant="expense"
 * />
 * 
 * // Analytics - Com delta
 * <BalanceCard 
 *   amount={1500} 
 *   label="Saldo" 
 *   delta={+15}
 *   trend="up"
 * />
 */

import React from 'react';
import './BalanceCard.css';

export function BalanceCard({
  amount,
  label = 'Saldo',
  variant = 'primary', // 'primary' | 'income' | 'expense' | 'neutral'
  size = 'medium', // 'small' | 'medium' | 'large'
  delta = null, // % de mudança, Ex: +15, -5
  trend = null, // 'up' | 'down' | 'stable'
  loading = false,
  onClick = null,
  className = ''
}) {
  // Formatar valor como moeda brasileira
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Determinar ícone de tendência
  const getTrendIcon = () => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  return (
    <div
      className={`balance-card balance-${variant} balance-${size} ${className}`}
      onClick={onClick}
      role="region"
      aria-label={`${label}: ${formatCurrency(amount)}`}
    >
      {/* Header com label e spinner */}
      <div className="card-header">
        <span className="label">{label}</span>
        {loading && (
          <div className="spinner" aria-label="Carregando...">
            ⟳
          </div>
        )}
      </div>

      {/* Valor principal (o mais importante) */}
      <div className="amount" data-testid="amount">
        {formatCurrency(amount)}
      </div>

      {/* Delta (mudança %) - opcional */}
      {delta !== null && (
        <div className={`delta delta-${trend}`} data-testid="delta">
          <span className="icon">{getTrendIcon()}</span>
          <span className="value">{delta > 0 ? '+' : ''}{delta}%</span>
        </div>
      )}

      {/* Footer com timestamp */}
      <div className="footer">
        <span className="footnote">
          {loading ? 'Atualizando...' : 'Atualizado agora'}
        </span>
      </div>
    </div>
  );
}

export default BalanceCard;
