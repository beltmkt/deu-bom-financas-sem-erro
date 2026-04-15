import React, { useMemo, useState } from 'react';
import { HomePage } from './HomePage';
import { TransactionsPage } from './TransactionsPage';
import { AnalyticsPage } from './AnalyticsPage';
import './App.css';

const initialTransactions = [
  {
    id: 1,
    description: 'Salario',
    amount: 3000,
    type: 'income',
    category: 'Salario',
    date: '2024-03-15',
    categoryIcon: 'SAL',
  },
  {
    id: 2,
    description: 'Supermercado',
    amount: -150,
    type: 'expense',
    category: 'Comida',
    date: '2024-03-14',
    categoryIcon: 'COM',
  },
  {
    id: 3,
    description: 'Transporte',
    amount: -50,
    type: 'expense',
    category: 'Transporte',
    date: '2024-03-13',
    categoryIcon: 'TRN',
  },
  {
    id: 4,
    description: 'Freelance site',
    amount: 850,
    type: 'income',
    category: 'Freelance',
    date: '2024-02-27',
    categoryIcon: 'FRL',
  },
  {
    id: 5,
    description: 'Academia',
    amount: -120,
    type: 'expense',
    category: 'Saude',
    date: '2024-02-22',
    categoryIcon: 'SAU',
  },
  {
    id: 6,
    description: 'Streaming',
    amount: -39.9,
    type: 'expense',
    category: 'Lazer',
    date: '2024-01-18',
    categoryIcon: 'LAZ',
  },
];

const categories = [
  'Comida',
  'Transporte',
  'Saude',
  'Educacao',
  'Lazer',
  'Contas',
  'Salario',
  'Freelance',
];

function App() {
  const [page, setPage] = useState('home');
  const [transactions, setTransactions] = useState(sortTransactions(initialTransactions));

  const summary = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const handleAddTransaction = (transactionInput) => {
    const amountValue = Number(transactionInput.amount);
    const normalizedAmount =
      transactionInput.type === 'expense' ? -Math.abs(amountValue) : Math.abs(amountValue);

    const newTransaction = {
      id: Date.now(),
      description: transactionInput.description.trim(),
      amount: normalizedAmount,
      type: transactionInput.type,
      category: transactionInput.category,
      date: transactionInput.date,
      categoryIcon: getCategoryIcon(transactionInput.category),
    };

    setTransactions((current) => sortTransactions([newTransaction, ...current]));
    setPage('home');
  };

  const handleDeleteTransactions = (ids) => {
    setTransactions((current) => current.filter((transaction) => !ids.includes(transaction.id)));
  };

  const handleExportTransactions = (items) => {
    const rows = [
      ['data', 'descricao', 'tipo', 'categoria', 'valor'],
      ...items.map((transaction) => [
        transaction.date,
        transaction.description,
        transaction.type,
        transaction.category,
        transaction.amount.toFixed(2),
      ]),
    ];

    const csvContent = rows.map((row) => row.join(',')).join('\n');

    if (typeof window !== 'undefined') {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = `deu-bom-transacoes-${items.length}.csv`;
      window.document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  if (page === 'transactions') {
    return (
      <div className="app">
        <TransactionsPage
          transactions={transactions}
          categories={categories}
          onNavigate={setPage}
          onDeleteTransactions={handleDeleteTransactions}
          onExportTransactions={handleExportTransactions}
        />
      </div>
    );
  }

  if (page === 'analytics') {
    return (
      <div className="app">
        <AnalyticsPage
          transactions={transactions}
          categories={categories}
          onNavigate={setPage}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <HomePage
        transactions={transactions}
        balance={summary.balance}
        expenses={summary.expenses}
        income={summary.income}
        onNavigate={setPage}
        onAddTransaction={handleAddTransaction}
        categories={categories}
      />
    </div>
  );
}

function sortTransactions(transactions) {
  return [...transactions].sort((first, second) => {
    return new Date(second.date).getTime() - new Date(first.date).getTime();
  });
}

function getCategoryIcon(category) {
  const icons = {
    Comida: 'COM',
    Transporte: 'TRN',
    Saude: 'SAU',
    Educacao: 'EDU',
    Lazer: 'LAZ',
    Contas: 'CNT',
    Salario: 'SAL',
    Freelance: 'FRL',
  };

  return icons[category] || 'OUT';
}

export default App;
