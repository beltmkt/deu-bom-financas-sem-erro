import React, { useState } from 'react';
import { BalanceCard } from '@/components/financial/BalanceCard';
import { TransactionList } from '@/components/financial/TransactionList';
import { BottomNav } from '@/components/common/BottomNav';
import './HomePage.css';

const defaultForm = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'Comida',
  date: '2024-03-15',
};

export function HomePage({
  transactions = [],
  balance = 1500,
  expenses = 500,
  income = 2000,
  onNavigate = () => {},
  onAddTransaction = () => {},
  categories = [],
}) {
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [formData, setFormData] = useState({
    ...defaultForm,
    category: categories[0] || defaultForm.category,
  });
  const [formError, setFormError] = useState('');

  const openNewTransactionModal = () => {
    setFormData({
      ...defaultForm,
      category: categories[0] || defaultForm.category,
    });
    setFormError('');
    setShowNewTransaction(true);
  };

  const closeNewTransactionModal = () => {
    setShowNewTransaction(false);
    setFormError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.description.trim()) {
      setFormError('Informe uma descricao para a transacao.');
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setFormError('Informe um valor maior que zero.');
      return;
    }

    if (!formData.date) {
      setFormError('Informe a data da transacao.');
      return;
    }

    onAddTransaction(formData);
    closeNewTransactionModal();
  };

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__title">DEU BOM!!</h1>
        <div className="home-page__header-actions">
          <button
            className="home-page__header-btn"
            title="Configuracoes"
            aria-label="Abrir configuracoes"
          >
            CFG
          </button>
          <button
            className="home-page__header-btn"
            title="Perfil"
            aria-label="Abrir perfil do usuario"
          >
            PERFIL
          </button>
        </div>
      </header>

      <main className="home-page__main">
        <section className="home-page__section home-page__section--hero">
          <BalanceCard
            amount={balance}
            label="SALDO ATUAL"
            variant="primary"
            size="large"
            subtext="Atualizado agora"
            delta={15}
            trend="up"
          />
        </section>

        <section className="home-page__section">
          <div className="home-page__summary-grid">
            <BalanceCard
              amount={expenses}
              label="Gasto"
              variant="expense"
              size="medium"
              subtext="Este mes"
              delta={-5}
            />
            <BalanceCard
              amount={income}
              label="Receita"
              variant="income"
              size="medium"
              subtext="Este mes"
              delta={10}
            />
          </div>
        </section>

        <section className="home-page__section">
          <div className="home-page__section-header">
            <h2 className="home-page__section-title">Ultimas Transacoes</h2>
          </div>

          <TransactionList
            transactions={transactions.slice(0, 3)}
            limit={3}
            grouped={false}
            selectable={false}
            editable={false}
            emptyText="Nenhuma transacao ainda"
          />

          <button
            className="home-page__cta-secondary"
            onClick={() => onNavigate('transactions')}
          >
            Ver todas {'>'}
          </button>
        </section>

        <section className="home-page__section home-page__section--actions">
          <button className="home-page__cta-primary" onClick={openNewTransactionModal}>
            + Nova Transacao
          </button>
          <button
            className="home-page__cta-secondary"
            onClick={() => onNavigate('analytics')}
          >
            Ver Analises
          </button>
        </section>
      </main>

      {showNewTransaction && (
        <div className="home-page__modal-overlay" onClick={closeNewTransactionModal}>
          <div className="home-page__modal" onClick={(event) => event.stopPropagation()}>
            <h3>Nova Transacao</h3>
            <form className="home-page__form" onSubmit={handleSubmit}>
              <label className="home-page__field">
                <span>Descricao</span>
                <input
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Ex: Mercado, salario, Uber"
                />
              </label>

              <div className="home-page__field-row">
                <label className="home-page__field">
                  <span>Tipo</span>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="expense">Gasto</option>
                    <option value="income">Receita</option>
                  </select>
                </label>

                <label className="home-page__field">
                  <span>Valor</span>
                  <input
                    name="amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </label>
              </div>

              <div className="home-page__field-row">
                <label className="home-page__field">
                  <span>Categoria</span>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="home-page__field">
                  <span>Data</span>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </label>
              </div>

              {formError && <p className="home-page__form-error">{formError}</p>}

              <div className="home-page__form-actions">
                <button type="button" className="home-page__cta-secondary" onClick={closeNewTransactionModal}>
                  Cancelar
                </button>
                <button type="submit" className="home-page__cta-primary">
                  Salvar transacao
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}

export default HomePage;
