import React, { useState } from 'react';
import { BalanceCard } from '@/components/financial/BalanceCard';
import { TransactionList } from '@/components/financial/TransactionList';
import { BottomNav } from '@/components/common/BottomNav';
import './HomePage.css';

/**
 * HomePage - Página HOME do DEU BOM!!
 * 
 * Mostra:
 * - Saldo principal em DESTAQUE (H1)
 * - Gasto + Receita do mês
 * - Últimas 3 transações (preview)
 * - CTAs claras
 */

export function HomePage({ 
  transactions = [],
  balance = 1500,
  expenses = 500,
  income = 2000,
  onNavigate = () => {},
}) {
  const [showNewTransaction, setShowNewTransaction] = useState(false);

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__title">DEU BOM!!</h1>
        <div className="home-page__header-actions">
          <button 
            className="home-page__header-btn"
            title="Configurações"
            aria-label="Abrir configurações"
          >
            🔧
          </button>
          <button 
            className="home-page__header-btn"
            title="Perfil"
            aria-label="Abrir perfil do usuário"
          >
            👤
          </button>
        </div>
      </header>

      <main className="home-page__main">
        {/* SEÇÃO 1: Saldo Principal */}
        <section className="home-page__section home-page__section--hero">
          <BalanceCard
            amount={balance}
            label="SALDO ATUAL"
            variant="primary"
            size="large"
            subtext="Atualizado agora"
            delta={15}  // % de mudança
            trend="up"  // visualizar tendência
          />
        </section>

        {/* SEÇÃO 2: Gasto + Receita */}
        <section className="home-page__section">
          <div className="home-page__summary-grid">
            <BalanceCard
              amount={expenses}
              label="Gasto"
              variant="expense"
              size="medium"
              subtext="Este mês"
              delta={-5}
            />
            <BalanceCard
              amount={income}
              label="Receita"
              variant="income"
              size="medium"
              subtext="Este mês"
              delta={10}
            />
          </div>
        </section>

        {/* SEÇÃO 3: Últimas Transações Preview */}
        <section className="home-page__section">
          <div className="home-page__section-header">
            <h2 className="home-page__section-title">Últimas Transações</h2>
          </div>
          
          <TransactionList
            transactions={transactions.slice(0, 3)}
            limit={3}
            grouped={false}
            selectable={false}
            editable={false}
            emptyText="Nenhuma transação ainda"
          />

          <button
            className="home-page__cta-secondary"
            onClick={() => onNavigate('transactions')}
          >
            Ver todas →
          </button>
        </section>

        {/* SEÇÃO 4: CTAs Principais */}
        <section className="home-page__section home-page__section--actions">
          <button
            className="home-page__cta-primary"
            onClick={() => setShowNewTransaction(true)}
          >
            ➕ Nova Transação
          </button>
          <button
            className="home-page__cta-secondary"
            onClick={() => onNavigate('analytics')}
          >
            📊 Ver Análises
          </button>
        </section>
      </main>

      {/* Modal Nova Transação */}
      {showNewTransaction && (
        <div 
          className="home-page__modal-overlay"
          onClick={() => setShowNewTransaction(false)}
        >
          <div 
            className="home-page__modal"
            onClick={e => e.stopPropagation()}
          >
            <h3>Nova Transação</h3>
            <p style={{ color: '#94A3B8', marginBottom: '16px' }}>
              Recurso será implementado na integração com backend
            </p>
            <button onClick={() => setShowNewTransaction(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}

export default HomePage;
