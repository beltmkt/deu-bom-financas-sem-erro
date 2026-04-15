import React from 'react';
import { HomePage } from './HomePage';
import { TransactionsPage } from './TransactionsPage';
import { AnalyticsPage } from './AnalyticsPage';
import './App.css';

// Dados mockados para demonstração
const mockTransactions = [
  {
    id: 1,
    description: 'Salário',
    amount: 3000,
    type: 'income',
    category: 'Salário',
    date: '2024-01-15',
    icon: '💰'
  },
  {
    id: 2,
    description: 'Supermercado',
    amount: -150,
    type: 'expense',
    category: 'Alimentação',
    date: '2024-01-14',
    icon: '🛒'
  },
  {
    id: 3,
    description: 'Transporte',
    amount: -50,
    type: 'expense',
    category: 'Transporte',
    date: '2024-01-13',
    icon: '🚗'
  }
];

function App() {
  return (
    <div className="app">
      <HomePage
        transactions={mockTransactions}
        balance={1500}
        expenses={500}
        income={2000}
      />
    </div>
  );
}

export default App;