import React, { useState } from 'react';
import './FilterBar.css';

export function FilterBar({
  periods = ['Ultimos 30d', 'Este mes', 'Custom'],
  categories = [],
  onFilter = () => {},
  initialPeriod = 'Ultimos 30d',
  showSearch = false,
}) {
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const emitFilter = (period, selected, search) => {
    onFilter({
      period,
      categories: selected,
      search,
    });
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    emitFilter(period, selectedCategories, searchText);
  };

  const handleCategoryToggle = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updated);
    emitFilter(selectedPeriod, updated, searchText);
  };

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    emitFilter(selectedPeriod, selectedCategories, text);
  };

  const handleReset = () => {
    setSelectedPeriod(initialPeriod);
    setSelectedCategories([]);
    setSearchText('');
    emitFilter(initialPeriod, [], '');
  };

  return (
    <div className="filter-bar">
      <button
        className="filter-bar__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir ou fechar filtros"
        aria-expanded={isOpen}
      >
        <span>Filtros</span>
        {selectedCategories.length > 0 && (
          <span className="filter-bar__badge">{selectedCategories.length}</span>
        )}
      </button>

      <div className={`filter-bar__content ${isOpen ? 'filter-bar__content--open' : ''}`}>
        <div className="filter-bar__group">
          <label className="filter-bar__label">Periodo</label>
          <div className="filter-bar__period-buttons">
            {periods.map((period) => (
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

        {categories.length > 0 && (
          <div className="filter-bar__group">
            <label className="filter-bar__label">Categorias</label>
            <div className="filter-bar__categories">
              {categories.map((category) => (
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

        {showSearch && (
          <div className="filter-bar__group">
            <label htmlFor="search-input" className="filter-bar__label">
              Buscar
            </label>
            <input
              id="search-input"
              type="text"
              className="filter-bar__search"
              placeholder="Descricao da transacao..."
              value={searchText}
              onChange={handleSearchChange}
              aria-label="Buscar transacoes"
            />
          </div>
        )}

        <div className="filter-bar__actions">
          <button
            className="filter-bar__reset"
            onClick={handleReset}
            aria-label="Limpar filtros"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
