/**
 * TransactionList Component
 * 
 * Componente reutilizável para exibir lista de transações em diferentes contextos
 * 
 * USO CASOS:
 * - Home: Últimas 3 transações (compact, no actions)
 * - Dashboard: Todas as transações com seleção (full, editable)
 * - Analytics: Agrupadas por data (grouped, view-only)
 * - Mobile: Swipe to edit/delete (touch-friendly)
 * 
 * @component
 * @example
 * // Home - Preview
 * <TransactionList 
 *   transactions={transactions}
 *   limit={3}
 *   compact={true}
 * />
 * 
 * // Dashboard - Full com seleção
 * <TransactionList 
 *   transactions={transactions}
 *   selectable={true}
 *   onDelete={handleDelete}
 *   onEdit={handleEdit}
 * />
 * 
 * // Analytics - Agrupado
 * <TransactionList 
 *   transactions={transactions}
 *   grouped={true}
 *   groupBy="date"
 * />
 */

import React, { useState, useCallback } from 'react';
import './TransactionList.css';

/**
 * TransactionItem - Item individual (reutilizável internamente)
 */
function TransactionItem({
  transaction,
  selectable = false,
  isSelected = false,
  onSelect = null,
  editable = false,
  onEdit = null,
  onDelete = null,
  compact = false
}) {
  const {
    id,
    date,
    description,
    categoryIcon,
    category,
    amount,
    type // 'expense' | 'income'
  } = transaction;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('pt-BR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className={`transaction-item transaction-${type} ${
        isSelected ? 'selected' : ''
      } ${compact ? 'compact' : ''}`}
      role="row"
      data-testid={`transaction-${id}`}
    >
      {/* Checkbox para seleção */}
      {selectable && (
        <div
          className="checkbox-wrapper"
          onClick={() => onSelect && onSelect(id)}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}}
            aria-label={`Selecionar ${description}`}
          />
        </div>
      )}

      {/* Ícone de categoria */}
      <div className="category-icon">{categoryIcon}</div>

      {/* Informações principais */}
      <div className="info">
        <div className="description">{description}</div>
        {!compact && <div className="category-label">{category}</div>}
        {!compact && <div className="date">{formatDate(date)}</div>}
      </div>

      {/* Valor */}
      <div className={`amount amount-${type}`}>
        {type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(amount))}
      </div>

      {/* Ações (edit, delete) */}
      {editable && (
        <div className="actions">
          {onEdit && (
            <button
              className="action-btn edit"
              onClick={() => onEdit(transaction)}
              title="Editar"
              aria-label={`Editar ${description}`}
            >
              ✎
            </button>
          )}
          {onDelete && (
            <button
              className="action-btn delete"
              onClick={() => onDelete(id)}
              title="Deletar"
              aria-label={`Deletar ${description}`}
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * TransactionList - Lista completa
 */
export function TransactionList({
  transactions = [],
  limit = null, // null = mostrar tudo
  compact = false, // true = espaçamento menor
  selectable = false, // true = checkboxes
  editable = false, // true = botões edit/delete
  grouped = false, // true = agrupar por data
  groupBy = 'date', // 'date' | 'category' | 'type'
  onDelete = null,
  onEdit = null,
  onSelectionChange = null,
  loading = false,
  emptyText = 'Nenhuma transação especificada',
  className = ''
}) {
  // Estado de seleção
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Lidar com seleção de item
  const handleSelect = useCallback(
    (id, multi = false) => {
      const newSelected = new Set(selectedIds);
      if (multi) {
        if (newSelected.has(id)) {
          newSelected.delete(id);
        } else {
          newSelected.add(id);
        }
      } else {
        newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
      }
      setSelectedIds(newSelected);
      onSelectionChange && onSelectionChange(Array.from(newSelected));
    },
    [selectedIds, onSelectionChange]
  );

  // Filtrar pelo limite
  let items = transactions;
  if (limit && limit > 0) {
    items = items.slice(0, limit);
  }

  // Agrupar se necessário
  let groupedItems = null;
  if (grouped) {
    groupedItems = items.reduce((acc, tx) => {
      let key;
      if (groupBy === 'date') {
        key = new Date(tx.date).toLocaleDateString('pt-BR');
      } else if (groupBy === 'category') {
        key = tx.category;
      } else if (groupBy === 'type') {
        key = tx.type === 'income' ? 'Receitas' : 'Gastos';
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(tx);
      return acc;
    }, {});
  }

  // Estado vazio
  if (!loading && items.length === 0) {
    return (
      <div className={`transaction-list empty ${className}`}>
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-text">{emptyText}</div>
        </div>
      </div>
    );
  }

  // Renderizar lista
  return (
    <div className={`transaction-list ${className}`}>
      {loading ? (
        <div className="loading" aria-label="Carregando transações">
          <div className="spinner">⟳</div>
          <span>Carregando...</span>
        </div>
      ) : grouped ? (
        // Renderizar agrupado
        <div className="grouped-transactions">
          {Object.entries(groupedItems || {}).map(([groupKey, groupTxs]) => (
            <div key={groupKey} className="transaction-group">
              <div className="group-header">{groupKey}</div>
              <div className="group-items">
                {groupTxs.map((tx) => (
                  <TransactionItem
                    key={tx.id}
                    transaction={tx}
                    selectable={selectable}
                    isSelected={selectedIds.has(tx.id)}
                    onSelect={selectable ? handleSelect : null}
                    editable={editable}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    compact={compact}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Renderizar lista simples
        <div className="simple-list">
          {items.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              selectable={selectable}
              isSelected={selectedIds.has(tx.id)}
              onSelect={selectable ? handleSelect : null}
              editable={editable}
              onEdit={onEdit}
              onDelete={onDelete}
              compact={compact}
            />
          ))}
        </div>
      )}

      {/* Footer com info de seleção */}
      {selectable && selectedIds.size > 0 && (
        <div className="selection-footer">
          <span>{selectedIds.size} selecionado(s)</span>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
