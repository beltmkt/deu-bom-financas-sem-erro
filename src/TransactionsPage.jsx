import React, { useState, useMemo } from 'react';
import { FilterBar } from '@/components/common/FilterBar';
import { TransactionList } from '@/components/financial/TransactionList';
import { ActionBar } from '@/components/common/ActionBar';
import { BottomNav } from '@/components/common/BottomNav';
import './TransactionsPage.css';

/**
 * TransactionsPage - Página de TRANSAÇÕES (era Dashboard)
 * 
 * Funcionalidades:
 * - Filtro por período
 * - Filtro por categoria
 * - Busca por descrição
 * - Seleção múltipla
 * - Ações em massa (delete, tag)
 * - Sem redundância de saldo
 */

export function TransactionsPage({ 
  transactions = [],
  categories = ['Comida', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Contas', 'Salário'],
  onNavigate = () => {},
}) {
  const [filter, setFilter] = useState({ period: 'Últimos 30d', categories: [], search: '' });
  const [selectedIds, setSelectedIds] = useState([]);

  // Filtrar transações baseado em filtros
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      // Filtro de categoria
      if (filter.categories.length > 0 && !filter.categories.includes(tx.category)) {
        return false;
      }
      // Filtro de busca
      if (filter.search && !tx.description.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [transactions, filter]);

  // Handle seleção múltipla
  const handleSelectionChange = (ids) => {
    setSelectedIds(ids);
  };

  // Handle ações em massa
  const handleDeleteSelected = () => {
    console.log('Deletar transações:', selectedIds);
    setSelectedIds([]);
    // TODO: Chamar API para deletar
  };

  const handleCategorizeSelected = () => {
    console.log('Categorizar transações:', selectedIds);
    // TODO: Mostrar modal para selecionar categoria
  };

  const handleExport = () => {
    // TODO: Exportar em CSV/Excel
    const csv = filteredTransactions.map(tx => 
      `${tx.date},${tx.description},${tx.amount},${tx.category}`
    ).join('\n');
    console.log('Exportar:', csv);
  };

  return (
    <div className="transactions-page">
      <header className="transactions-page__header">
        <h1>Transações</h1>
        <button 
          className="transactions-page__search-btn"
          aria-label="Abrir busca"
        >
          🔍
        </button>
      </header>

      {/* Filtros */}
      <FilterBar
        periods={['Últimos 30d', 'Este mês', 'Este ano', 'Custom']}
        categories={categories}
        onFilter={setFilter}
        initialPeriod="Últimos 30d"
        showSearch={true}
      />

      <main className="transactions-page__main">
        {/* Status: Quantas transações? */}
        <div className="transactions-page__status">
          <span>{filteredTransactions.length} transações encontradas</span>
          {selectedIds.length > 0 && (
            <span className="transactions-page__selected">
              {selectedIds.length} selecionadas
            </span>
          )}
        </div>

        {/* Lista de Transações */}
        {filteredTransactions.length > 0 ? (
          <>
            <TransactionList
              transactions={filteredTransactions}
              limit={null}
              grouped={false}
              selectable={true}
              editable={true}
              onSelectionChange={handleSelectionChange}
            />
          </>
        ) : (
          <div className="transactions-page__empty">
            <p>📭 Nenhuma transação encontrada</p>
            <small>Tente ajustar os filtros</small>
          </div>
        )}
      </main>

      {/* Ações em Massa */}
      {selectedIds.length > 0 && (
        <ActionBar
          selectedCount={selectedIds.length}
          actions={[
            { label: 'Deletar', icon: '🗑️', handler: handleDeleteSelected, danger: true },
            { label: 'Categorizar', icon: '🏷️', handler: handleCategorizeSelected },
          ]}
        />
      )}

      {/* CTAs Rodapé */}
      <section className="transactions-page__footer">
        <button 
          className="transactions-page__cta-export"
          onClick={handleExport}
        >
          💾 Exportar
        </button>
      </section>

      <BottomNav active="transactions" onNavigate={onNavigate} />
    </div>
  );
}

export default TransactionsPage;
