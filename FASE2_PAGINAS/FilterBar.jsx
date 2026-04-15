import React, { useState } from 'react';
import './FilterBar.css';

/**
 * FilterBar - Componente reutilizável para filtros
 * 
 * Usado em: Transactions Page + Analytics Page
 * Props:
 *   - periods: array de períodos (ex: ["Últimos 30d", "Este mês"])
 *   - categories: array de categorias (ex: ["Comida", "Transporte"])
 *   - onFilter: callback (filterObj) => void
 *   - initialPeriod: período inicial selecionado
 *   - showSearch: mostrar busca por descrição? (default: false)
 * 
 * Exemplo:
 * <FilterBar
 *   periods={['Últimos 30d', 'Este mês', 'Custom']}
 *   categories={['Comida', 'Transporte', 'Saúde']}
 *   onFilter={(filter) => console.log(filter)}
 * />
 */

export function FilterBar({
  periods = ['Últimos 30d', 'Este mês', 'Custom'],
  categories = [],
  onFilter = () => {},
  initialPeriod = 'Últimos 30d',
  showSearch = false,
}) {
  // Estado do filtro
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Para dropdown mobile

  // Atualizar período
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    emitFilter(period, selectedCategories, searchText);
  };

  // Toggle categoria
  const handleCategoryToggle = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updated);
    emitFilter(selectedPeriod, updated, searchText);
  };

  // Atualizar busca
  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    emitFilter(selectedPeriod, selectedCategories, text);
  };

  // Emitir evento de filtro
  const emitFilter = (period, cats, search) => {
    onFilter({
      period,
      categories: cats,
      search,
    });
  };

  // Reset filtros
  const handleReset = () => {
    setSelectedPeriod(initialPeriod);
    setSelectedCategories([]);
    setSearchText('');
    emitFilter(initialPeriod, [], '');
  };

  return (
    <div className="filter-bar">
      {/* Botão toggle para mobile */}
      <button 
        className="filter-bar__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir/fechar filtros"
        aria-expanded={isOpen}
      >
        <span>🔽 Filtros</span>
        {selectedCategories.length > 0 && (
          <span className="filter-bar__badge">{selectedCategories.length}</span>
        )}
      </button>

      {/* Container de filtros (visível em desktop ou quando aberto) */}
      <div className={`filter-bar__content ${isOpen ? 'filter-bar__content--open' : ''}`}>
        
        {/* Período */}
        <div className="filter-bar__group">
          <label className="filter-bar__label">Período</label>
          <div className="filter-bar__period-buttons">
            {periods.map(period => (
              <button
                key={period}
                className={`filter-bar__period-btn ${
                  selectedPeriod === period ? 'filter-bar__period-btn--active' : ''
                }`}
                onClick={() => handlePeriodChange(period)}
                aria-pressed={selectedPeriod === period}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Categorias */}
        {categories.length > 0 && (
          <div className="filter-bar__group">
            <label className="filter-bar__label">Categorias</label>
            <div className="filter-bar__categories">
              {categories.map(category => (
                <label key={category} className="filter-bar__category-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="filter-bar__checkbox"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Busca (opcional) */}
        {showSearch && (
          <div className="filter-bar__group">
            <label htmlFor="search-input" className="filter-bar__label">Buscar</label>
            <input
              id="search-input"
              type="text"
              className="filter-bar__search"
              placeholder="Descrição da transação..."
              value={searchText}
              onChange={handleSearchChange}
              aria-label="Buscar transações"
            />
          </div>
        )}

        {/* Botões de ação */}
        <div className="filter-bar__actions">
          <button
            className="filter-bar__reset"
            onClick={handleReset}
            aria-label="Limpar filtros"
          >
            🔄 Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
