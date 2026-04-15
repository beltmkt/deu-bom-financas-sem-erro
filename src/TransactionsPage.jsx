import React, { useMemo, useState } from 'react';
import { FilterBar } from '@/components/common/FilterBar';
import { TransactionList } from '@/components/financial/TransactionList';
import { ActionBar } from '@/components/common/ActionBar';
import { BottomNav } from '@/components/common/BottomNav';
import './TransactionsPage.css';

export function TransactionsPage({
  transactions = [],
  categories = ['Comida', 'Transporte', 'Saude', 'Educacao', 'Lazer', 'Contas', 'Salario'],
  onNavigate = () => {},
  onDeleteTransactions = () => {},
  onExportTransactions = () => {},
}) {
  const [filter, setFilter] = useState({ period: 'Ultimos 30d', categories: [], search: '' });
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (filter.categories.length > 0 && !filter.categories.includes(transaction.category)) {
        return false;
      }

      if (
        filter.search &&
        !transaction.description.toLowerCase().includes(filter.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [transactions, filter]);

  const handleSelectionChange = (ids) => {
    setSelectedIds(ids);
  };

  const handleDeleteSelected = () => {
    onDeleteTransactions(selectedIds);
    setSelectedIds([]);
  };

  const handleCategorizeSelected = () => {
    console.log('Categorizar transacoes:', selectedIds);
  };

  const handleExport = () => {
    onExportTransactions(filteredTransactions);
  };

  return (
    <div className="transactions-page">
      <header className="transactions-page__header">
        <h1>Transacoes</h1>
        <button className="transactions-page__search-btn" aria-label="Abrir busca">
          BUSCA
        </button>
      </header>

      <FilterBar
        periods={['Ultimos 30d', 'Este mes', 'Este ano', 'Custom']}
        categories={categories}
        onFilter={setFilter}
        initialPeriod="Ultimos 30d"
        showSearch
      />

      <main className="transactions-page__main">
        <div className="transactions-page__status">
          <span>{filteredTransactions.length} transacoes encontradas</span>
          {selectedIds.length > 0 && (
            <span className="transactions-page__selected">
              {selectedIds.length} selecionadas
            </span>
          )}
        </div>

        {filteredTransactions.length > 0 ? (
          <TransactionList
            transactions={filteredTransactions}
            limit={null}
            grouped={false}
            selectable
            editable={false}
            onSelectionChange={handleSelectionChange}
          />
        ) : (
          <div className="transactions-page__empty">
            <p>Nenhuma transacao encontrada</p>
            <small>Tente ajustar os filtros</small>
          </div>
        )}
      </main>

      {selectedIds.length > 0 && (
        <ActionBar
          selectedCount={selectedIds.length}
          actions={[
            { label: 'Deletar', icon: 'DEL', handler: handleDeleteSelected, danger: true },
            { label: 'Categorizar', icon: 'TAG', handler: handleCategorizeSelected },
          ]}
        />
      )}

      <section className="transactions-page__footer">
        <button className="transactions-page__cta-export" onClick={handleExport}>
          Exportar
        </button>
      </section>

      <BottomNav active="transactions" onNavigate={onNavigate} />
    </div>
  );
}

export default TransactionsPage;
