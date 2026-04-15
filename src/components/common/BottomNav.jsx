import React from 'react';
import './BottomNav.css';

export function BottomNav({ active = 'home', onNavigate = () => {} }) {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: 'HOME',
      ariaLabel: 'Home - Visao geral',
    },
    {
      id: 'transactions',
      label: 'Transacoes',
      icon: 'MOV',
      ariaLabel: 'Transacoes - Gestao de movimentos',
    },
    {
      id: 'analytics',
      label: 'Analise',
      icon: 'DADOS',
      ariaLabel: 'Analise - Insights e graficos',
    },
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Navegacao principal">
      <div className="bottom-nav__container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`bottom-nav__tab ${active === tab.id ? 'bottom-nav__tab--active' : ''}`}
            onClick={() => onNavigate(tab.id)}
            aria-label={tab.ariaLabel}
            aria-current={active === tab.id ? 'page' : undefined}
            title={tab.label}
          >
            <span className="bottom-nav__icon">{tab.icon}</span>
            <span className="bottom-nav__label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bottom-nav__spacer" />
    </nav>
  );
}

export default BottomNav;
